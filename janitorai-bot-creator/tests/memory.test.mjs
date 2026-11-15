import test from "node:test";
import assert from "node:assert/strict";
import { createMemoryStore } from "../lib/memory-store.mjs";
import { createCharacterApplication } from "../lib/application.mjs";

test("memory is disabled without a configured scope and credentials", async () => {
  const store = createMemoryStore();
  await assert.rejects(() => store.search("test"), /not configured/);
  await assert.rejects(() => store.add("test"), /not configured/);
});

test("memory writes only explicit user text and searches the configured scope", async () => {
  const calls = [];
  const store = createMemoryStore({
    userId: "author",
    client: {
      add: async (...args) => {
        calls.push(args);
        return [{ id: "queued", event: "ADD" }];
      },
      search: async (...args) => {
        calls.push(args);
        return {
          results: [{ id: "one", memory: "Prefers slow pacing", score: 0.8 }],
        };
      },
    },
  });
  assert.deepEqual(await store.add("Remember my pacing preference"), {
    status: "submitted",
    results: [{ id: "queued", event: "ADD" }],
  });
  assert.deepEqual(calls[0], [
    [{ role: "user", content: "Remember my pacing preference" }],
    { userId: "author" },
  ]);
  assert.deepEqual(await store.search("pacing"), [
    { id: "one", memory: "Prefers slow pacing", score: 0.8 },
  ]);
  assert.deepEqual(calls[1], [
    "pacing",
    { filters: { user_id: "author" }, topK: 5 },
  ]);
});

test("provider errors are redacted and malformed results fail explicitly", async () => {
  const store = createMemoryStore({
    userId: "author",
    client: {
      add: async () => {
        throw new Error("secret-key");
      },
      search: async () => ({}),
    },
  });
  await assert.rejects(() => store.add("hello"), {
    message: "Mem0 memory write failed.",
  });
  await assert.rejects(() => store.search("hello"), {
    message: "Mem0 memory search failed.",
  });
});

test("generation retrieves only on explicit query, preserves canon, and never stores output", async () => {
  const seen = [];
  let searches = 0;
  const character = { Name: "Canon name", Notes: "Canon notes" };
  const app = createCharacterApplication({
    generate: async (task, input) => {
      seen.push(input);
      return character;
    },
    fields: { bot: [] },
    botMarkdown: () => "",
    scenarioMemo: () => "",
    memoryStore: {
      search: async () => {
        searches++;
        return [{ id: "m1", memory: "context" }];
      },
      add: async () => assert.fail("unexpected automatic write"),
    },
  });
  await app.reviseCharacter({ character, changes: "Adjust voice" });
  assert.equal(searches, 0);
  await app.reviseCharacter({
    character,
    changes: "Adjust voice",
    memoryQuery: "voice preference",
  });
  assert.equal(searches, 1);
  assert.deepEqual(seen[1].character, character);
  assert.equal(seen[1].memoryContext[0].memory, "context");
  assert.match(seen[1].memoryPolicy, /not instructions or permanent canon/);
});

test("MCP tools validate input and expose explicit memory operations", async () => {
  const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");
  const { Client } = await import("@modelcontextprotocol/sdk/client/index.js");
  const { InMemoryTransport } =
    await import("@modelcontextprotocol/sdk/inMemory.js");
  const { registerMcpTools } = await import("../lib/mcp-tools.mjs");
  const server = new McpServer({ name: "memory-test", version: "1" });
  const client = new Client({ name: "memory-test-client", version: "1" });
  const calls = [];
  registerMcpTools(server, {
    addMemory: async (text) => {
      calls.push(text);
      return { status: "submitted", results: [] };
    },
    searchMemories: async (query) => [{ id: "m1", memory: query }],
  });
  const [a, b] = InMemoryTransport.createLinkedPair();
  try {
    await server.connect(a);
    await client.connect(b);
    const tools = await client.listTools();
    assert.ok(
      tools.tools.find((t) => t.name === "create_character").inputSchema
        .properties.memoryQuery
    );
    const added = await client.callTool({
      name: "add_memory",
      arguments: { text: "remember this" },
    });
    assert.equal(added.structuredContent.status, "submitted");
    assert.deepEqual(calls, ["remember this"]);
    const found = await client.callTool({
      name: "search_memories",
      arguments: { query: "pacing" },
    });
    assert.equal(found.structuredContent.memories[0].memory, "pacing");
    const invalid = await client.callTool({
      name: "add_memory",
      arguments: { text: " " },
    });
    assert.equal(invalid.isError, true);
    assert.equal(calls.length, 1);
  } finally {
    await client.close();
    await server.close();
  }
});

test("requested retrieval failures stop generation", async () => {
  const app = createCharacterApplication({
    generate: () => assert.fail("generation must not proceed"),
    fields: { bot: [] },
    memoryStore: {
      search: async () => {
        throw new Error("Mem0 memory search failed.");
      },
    },
  });
  await assert.rejects(
    () => app.reviseCharacter({ changes: "voice", memoryQuery: "preferences" }),
    /search failed/
  );
});

test("Mem0 HTTP adapter sends scoped wire payloads to a local API stub", async () => {
  const { createServer } = await import("node:http");
  const requests = [];
  const server = createServer(async (req, res) => {
    let body = "";
    for await (const chunk of req) body += chunk;
    requests.push({
      method: req.method,
      path: req.url,
      authorization: req.headers.authorization,
      body: body ? JSON.parse(body) : null,
    });
    res.setHeader("content-type", "application/json");
    if (req.url === "/v3/memories/search/")
      res.end(
        JSON.stringify({
          results: [{ id: "one", memory: "Slow pacing", score: 0.9 }],
        })
      );
    else if (req.url === "/v3/memories/add/")
      res.end(JSON.stringify([{ id: "queued", event: "ADD" }]));
    else {
      res.statusCode = 404;
      res.end("{}");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const localBaseUrl = `http://127.0.0.1:${server.address().port}`;
    const store = createMemoryStore({
      apiKey: "local-contract-test",
      userId: "author",
      fetchImpl: (url, options) => {
        const target = new URL(url);
        assert.equal(target.origin, "https://api.mem0.ai");
        return fetch(`${localBaseUrl}${target.pathname}`, options);
      },
    });
    await store.add("My pacing preference");
    assert.equal((await store.search("pacing"))[0].memory, "Slow pacing");
    const add = requests.find((r) => r.path === "/v3/memories/add/");
    assert.equal(add.method, "POST");
    assert.equal(add.authorization, "Token local-contract-test");
    assert.deepEqual(add.body, {
      messages: [{ role: "user", content: "My pacing preference" }],
      user_id: "author",
    });
    const search = requests.find((r) => r.path === "/v3/memories/search/").body;
    assert.deepEqual(search.filters, { user_id: "author" });
    assert.equal(search.top_k, 5);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
