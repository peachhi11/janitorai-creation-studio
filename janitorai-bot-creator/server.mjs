import { createServer } from "node:http";
import OpenAI from "openai";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  StreamableHTTPServerTransport
} from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createCharacterStore } from "./lib/character-store.mjs";
import { createReferenceLibrary } from "./lib/reference-library.mjs";
import { createCharacterApplication } from "./lib/application.mjs";
import { registerMcpTools } from "./lib/mcp-tools.mjs";
import { isAuthorised, loadRuntimeConfig } from "./lib/runtime-config.mjs";
import { rejectOversizedRequest } from "./lib/request-guards.mjs";
import { createRateLimiter } from "./lib/rate-limiter.mjs";
import { createPromptPresetLibrary } from "./lib/prompt-presets.mjs";
import { getKnowledgeContextDetails } from "./lib/knowledge-context.mjs";
import { createCharacterGeneration } from "./lib/character-generation.mjs";

const VERSION = "1.1.0";
const SHUTDOWN_TIMEOUT_MS = 10_000;
const config = loadRuntimeConfig();
const ai = new OpenAI();
const generation = createCharacterGeneration({ ai, model: config.model });
const characterStore = createCharacterStore(config.characterLibraryDir);
const referenceLibrary = createReferenceLibrary(config.referenceLibraryDir);
const rateLimiter = createRateLimiter({
  limit: config.rateLimit,
  windowMs: config.rateWindowMs
});
const promptPresets = createPromptPresetLibrary();

function authorised(req) { return isAuthorised(req, config); }

const application = createCharacterApplication({
  ...generation,
  characterStore,
  referenceLibrary,
  promptPresets,
  knowledgeContext: (query, options = {}) => getKnowledgeContextDetails(query, {
    directory: config.referenceLibraryDir,
    ...options
  })
});

function makeServer() {
  const server = new McpServer({
    name: "janitorai-bot-creator",
    version: VERSION
  });
  registerMcpTools(server, application);
  return server;
}

const { port, host } = config;

const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${host}:${port}`);

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`JanitorAi Bot Creator ${VERSION}`);
    return;
  }

  if (req.method === "GET" && url.pathname === "/healthz") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      status: "ok",
      service: "janitorai-bot-creator",
      version: VERSION
    }));
    return;
  }

  if (req.method !== "POST" || url.pathname !== "/mcp") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  if (!authorised(req)) {
    res.writeHead(401, { "content-type": "text/plain", "www-authenticate": "Bearer" });
    res.end("Unauthorised");
    return;
  }

  if (rejectOversizedRequest(req, res, config.maxRequestBytes)) return;

  const rateKey = req.socket.remoteAddress || "unknown";
  const rate = rateLimiter.check(rateKey);
  if (!rate.allowed) {
    res.writeHead(429, {
      "content-type": "text/plain",
      "retry-after": String(Math.ceil(rate.retryAfterMs / 1000))
    });
    res.end("Too many requests");
    return;
  }

  const server = makeServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end("MCP request failed");
    }
  } finally {
    await transport.close();
    await server.close();
  }
});

let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`${signal} received; shutting down`);
  httpServer.close(() => process.exit(0));
  setTimeout(() => process.exit(1), SHUTDOWN_TIMEOUT_MS).unref();
}

httpServer.on("error", error => {
  console.error("HTTP server error", error);
  if (!httpServer.listening) process.exitCode = 1;
});

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));

httpServer.listen(port, host, () => {
  console.log(`MCP server: http://${host}:${port}/mcp`);
});
