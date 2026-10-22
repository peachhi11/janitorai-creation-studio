import test from "node:test";
import assert from "node:assert/strict";
import { loadRuntimeConfig, isAuthorised } from "../lib/runtime-config.mjs";

test("runtime config applies safe local defaults", () => {
  const config = loadRuntimeConfig({});
  assert.equal(config.nodeEnv, "development");
  assert.equal(config.host, "127.0.0.1");
  assert.equal(config.port, 8787);
  assert.equal(config.model, "gpt-5.5");
});

test("production config requires an API token", () => {
  assert.throws(() => loadRuntimeConfig({ NODE_ENV: "production" }), /MCP_API_TOKEN/);
  const config = loadRuntimeConfig({ NODE_ENV: "production", MCP_API_TOKEN: "secret" });
  assert.equal(config.mcpApiToken, "secret");
});

test("authorisation uses the configured bearer token", () => {
  const config = loadRuntimeConfig({ NODE_ENV: "production", MCP_API_TOKEN: "secret" });
  assert.equal(isAuthorised({ headers: { authorization: "Bearer secret" } }, config), true);
  assert.equal(isAuthorised({ headers: { authorization: "Bearer wrong" } }, config), false);
  assert.equal(isAuthorised({ headers: {} }, config), false);
});
