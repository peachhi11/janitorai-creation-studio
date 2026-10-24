import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import net from "node:net";
import { createServer as createHttpServer } from "node:http";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const personaFields = [
  "Name", "Age", "Gender", "Orientation", "Appearance", "Origin", "Residence",
  "Background", "Core Wound", "Personality", "Contradictions", "Values", "Strengths",
  "Flaws", "Fears", "Attachment and Defenses", "Habits", "Likes", "Dislikes", "Speech",
  "Relationships", "Goals", "Secrets", "Intimacy and Boundaries", "Growth Potential"
];

async function availablePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => {
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", resolve);
  });
  const { port } = probe.address();
  await new Promise((resolve, reject) => probe.close(error => error ? reject(error) : resolve()));
  return port;
}

async function waitForHealth(url, child) {
  const deadline = Date.now() + 5_000;
  let lastError;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`server exited before health check: ${child.exitCode}`);
    try {
      const response = await fetch(`${url}/healthz`);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  throw new Error(`server did not become healthy: ${lastError?.message || "unknown error"}`);
}

async function startOpenAIStub(t) {
  const output = Object.fromEntries(personaFields.map(field => [field, `Stub ${field}`]));
  const requests = [];
  const stub = createHttpServer((req, res) => {
    if (req.method !== "POST" || !req.url?.endsWith("/responses")) {
      req.resume();
      res.writeHead(404);
      res.end();
      return;
    }
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      requests.push(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({
        id: "resp_integration_stub",
        object: "response",
        output_text: JSON.stringify(output),
        output: [{
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: JSON.stringify(output), annotations: [] }]
        }]
      }));
    });
  });
  await new Promise((resolve, reject) => {
    stub.once("error", reject);
    stub.listen(0, "127.0.0.1", resolve);
  });
  const { port } = stub.address();
  t.after(() => new Promise(resolve => stub.close(resolve)));
  return { url: `http://127.0.0.1:${port}/v1`, requests };
}

async function startServer(t, { rateLimit = "100", openAIBaseUrl } = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), "janitor-mcp-http-"));
  const characterLibraryDir = path.join(root, "characters");
  const referenceLibraryDir = path.join(root, "references");
  await mkdir(characterLibraryDir);
  await mkdir(referenceLibraryDir);
  await writeFile(path.join(referenceLibraryDir, "agency.md"), "Player agency remains distinct from character autonomy. A roleplay character can initiate actions, disagree, hesitate, or refuse, while the player retains control over their own choices, dialogue, feelings, consent, and future actions. Retrieved guidance should inform craft decisions without becoming canon or overriding established boundaries.", "utf8");

  const port = await availablePort();
  const token = "integration-test-token";
  const environment = {
    ...process.env,
    OPENAI_API_KEY: "sk-integration-test-placeholder",
    NODE_ENV: "production",
    MCP_API_TOKEN: token,
    PORT: String(port),
    HOST: "127.0.0.1",
    CHARACTER_LIBRARY_DIR: characterLibraryDir,
    REFERENCE_LIBRARY_DIR: referenceLibraryDir,
    MCP_RATE_LIMIT: rateLimit,
    MCP_RATE_WINDOW_MS: "60000"
  };
  if (openAIBaseUrl) environment.OPENAI_BASE_URL = openAIBaseUrl;

  const child = spawn(process.execPath, ["server.mjs"], {
    cwd: projectRoot,
    env: environment,
    stdio: ["ignore", "pipe", "pipe"]
  });
  const output = [];
  child.stdout.on("data", chunk => output.push(String(chunk)));
  child.stderr.on("data", chunk => output.push(String(chunk)));

  const baseUrl = `http://127.0.0.1:${port}`;
  const health = await waitForHealth(baseUrl, child);

  t.after(async () => {
    if (child.exitCode === null) child.kill("SIGTERM");
    await new Promise(resolve => child.once("exit", resolve));
    await rm(root, { recursive: true, force: true });
  });

  return { baseUrl, token, child, output, health };
}

test("real MCP HTTP path persists, reads, and restores character revisions", async t => {
  const { baseUrl, token, health } = await startServer(t);
  assert.deepEqual(health, {
    status: "ok",
    service: "janitorai-bot-creator",
    version: "1.1.0"
  });
  const unauthorised = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} })
  });
  assert.equal(unauthorised.status, 401);

  const client = new Client({ name: "integration-test-client", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(new URL(`${baseUrl}/mcp`), {
    requestInit: { headers: { Authorization: `Bearer ${token}` } }
  });
  await client.connect(transport);
  t.after(() => client.close());

  const tools = await client.listTools();
  assert.ok(tools.tools.some(tool => tool.name === "save_character"));
  assert.ok(tools.tools.some(tool => tool.name === "restore_character_revision"));

  const first = await client.callTool({
    name: "save_character",
    arguments: { record: { id: "mara", name: "Mara", details: { hair: "black" } } }
  });
  assert.equal(first.isError, undefined);
  assert.equal(first.structuredContent.name, "Mara");

  await client.callTool({
    name: "save_character",
    arguments: { record: { id: "mara", name: "Mara revised" } }
  });
  const current = await client.callTool({ name: "get_character", arguments: { id: "mara" } });
  assert.equal(current.structuredContent.name, "Mara revised");

  const revisions = await client.callTool({ name: "list_character_revisions", arguments: { id: "mara" } });
  assert.equal(revisions.structuredContent.revisions.length, 1);
  const [revision] = revisions.structuredContent.revisions;

  const restored = await client.callTool({
    name: "restore_character_revision",
    arguments: { id: "mara", revisionId: revision.revisionId }
  });
  assert.equal(restored.structuredContent.name, "Mara");
  assert.deepEqual(restored.structuredContent.details, { hair: "black" });
});

test("real MCP HTTP path lists and searches the configured reference library", async t => {
  const { baseUrl, token } = await startServer(t);
  const client = new Client({ name: "reference-integration-test-client", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(new URL(`${baseUrl}/mcp`), {
    requestInit: { headers: { Authorization: `Bearer ${token}` } }
  });
  await client.connect(transport);
  t.after(() => client.close());

  const listed = await client.callTool({ name: "list_references", arguments: {} });
  assert.ok(listed.structuredContent.references.some(reference => reference.path === "agency.md"));

  const matches = await client.callTool({ name: "search_references", arguments: { query: "player agency" } });
  assert.equal(matches.structuredContent.matches.length, 1);
  assert.equal(matches.structuredContent.matches[0].path, "agency.md");

  const read = await client.callTool({ name: "read_reference", arguments: { path: "agency.md" } });
  assert.match(read.structuredContent.text, /Player agency/);
});

test("real MCP HTTP path runs deterministic generation and renders the persona output", async t => {
  const openAI = await startOpenAIStub(t);
  const { baseUrl, token } = await startServer(t, { openAIBaseUrl: openAI.url });
  const client = new Client({ name: "generation-integration-test-client", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(new URL(`${baseUrl}/mcp`), {
    requestInit: { headers: { Authorization: `Bearer ${token}` } }
  });
  await client.connect(transport);
  t.after(() => client.close());

  const result = await client.callTool({
    name: "create_user_persona",
    arguments: { concept: "a careful archivist", useReferences: false }
  });

  assert.equal(result.isError, undefined, result.content?.[0]?.text);
  assert.equal(result.structuredContent.core.Name, "Stub Name");
  assert.equal(result.structuredContent.core.Personality, "Stub Personality");
  assert.match(result.structuredContent.bible, /# Stub Name/);
  assert.match(result.structuredContent.compact, /Identity: Stub Name, Stub Age, Stub Gender/);
  assert.match(openAI.requests[0].instructions, /FICTIONAL NARRATIVE LENS/);
});

test("real generation path preserves retrieved reference provenance", async t => {
  const openAI = await startOpenAIStub(t);
  const { baseUrl, token } = await startServer(t, { openAIBaseUrl: openAI.url });
  const client = new Client({ name: "provenance-integration-test-client", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(new URL(`${baseUrl}/mcp`), {
    requestInit: { headers: { Authorization: `Bearer ${token}` } }
  });
  await client.connect(transport);
  t.after(() => client.close());

  const result = await client.callTool({
    name: "create_user_persona",
    arguments: { concept: "an archivist who protects player agency" }
  });

  assert.equal(result.isError, undefined, result.content?.[0]?.text);
  assert.ok(result.structuredContent.referenceSources.some(source => source.path === "agency.md"));
});

test("HTTP size guard rejects oversized requests before MCP dispatch", async t => {
  const { baseUrl, token } = await startServer(t);
  const headers = {
    "content-type": "application/json",
    authorization: `Bearer ${token}`
  };

  const oversized = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { ...headers, "content-length": String(2_000_000) },
    body: "x".repeat(2_000_000)
  });
  assert.equal(oversized.status, 413);
  assert.equal(await oversized.text(), "Request entity too large");
});

test("rate limiting is enforced around the real MCP transport", async t => {
  const { baseUrl, token } = await startServer(t, { rateLimit: "1" });
  const request = () => fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: "{}"
  });

  const first = await request();
  assert.notEqual(first.status, 429);
  const second = await request();
  assert.equal(second.status, 429);
  assert.ok(Number(second.headers.get("retry-after")) >= 0);
});
