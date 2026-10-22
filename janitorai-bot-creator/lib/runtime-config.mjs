import crypto from "node:crypto";

function integer(value, fallback, name, maximum = 65535) {
  const parsed = Number(value ?? fallback);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > maximum) {
    throw new Error(`Invalid ${name}.`);
  }
  return parsed;
}

export function loadRuntimeConfig(env = process.env) {
  const nodeEnv = env.NODE_ENV || "development";
  const mcpApiToken = env.MCP_API_TOKEN || null;
  if (nodeEnv === "production" && !mcpApiToken) {
    throw new Error("MCP_API_TOKEN is required when NODE_ENV=production.");
  }
  return Object.freeze({
    nodeEnv,
    model: env.OPENAI_MODEL || "gpt-5.5",
    port: integer(env.PORT, 8787, "PORT"),
    host: env.HOST || "127.0.0.1",
    mcpApiToken,
    characterLibraryDir: env.CHARACTER_LIBRARY_DIR || "./data/characters",
    referenceLibraryDir: env.REFERENCE_LIBRARY_DIR || "./knowledge",
    maxRequestBytes: integer(
      env.MAX_REQUEST_BYTES,
      1_048_576,
      "MAX_REQUEST_BYTES",
      50 * 1024 * 1024
    )
  });
}

export function isAuthorised(request, config) {
  if (!config.mcpApiToken) return config.nodeEnv !== "production";
  const supplied = request.headers.authorization || "";
  const expected = `Bearer ${config.mcpApiToken}`;
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
