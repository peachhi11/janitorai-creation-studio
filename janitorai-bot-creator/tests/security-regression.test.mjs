import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { isAuthorised, loadRuntimeConfig } from "../lib/runtime-config.mjs";
import { rejectOversizedRequest } from "../lib/request-guards.mjs";

test("production MCP access remains closed without the exact bearer token", () => {
  const config = loadRuntimeConfig({
    NODE_ENV: "production",
    MCP_API_TOKEN: "secret-token",
  });
  assert.equal(isAuthorised({ headers: {} }, config), false);
  assert.equal(
    isAuthorised({ headers: { authorization: "Bearer wrong-token" } }, config),
    false
  );
  assert.equal(
    isAuthorised(
      { headers: { authorization: "Bearer secret-token-extra" } },
      config
    ),
    false
  );
  assert.equal(
    isAuthorised({ headers: { authorization: "Bearer secret-token" } }, config),
    true
  );
});

test("request-size validation rejects unsafe numeric input before dispatch", () => {
  const response = {
    status: null,
    body: null,
    writeHead(status) {
      this.status = status;
    },
    end(body) {
      this.body = body;
    },
  };
  assert.equal(
    rejectOversizedRequest(
      { headers: { "content-length": "9007199254740992" } },
      response,
      1_024
    ),
    true
  );
  assert.equal(response.status, 400);
});

test("security workflow keeps write permissions limited to SARIF upload", () => {
  const securityWorkflow = readFileSync(
    resolve(process.cwd(), "../.github/workflows/security.yml"),
    "utf8"
  );
  assert.match(securityWorkflow, /permissions:\s*\n\s+contents: read/);
  assert.doesNotMatch(securityWorkflow, /contents:\s+write/);
  assert.doesNotMatch(securityWorkflow, /security-events:\s+write/);
});
