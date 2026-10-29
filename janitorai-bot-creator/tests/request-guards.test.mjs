import test from "node:test";
import assert from "node:assert/strict";
import { loadRuntimeConfig } from "../lib/runtime-config.mjs";
import { rejectOversizedRequest } from "../lib/request-guards.mjs";

test("runtime config exposes a bounded request size", () => {
  const config = loadRuntimeConfig({});
  assert.equal(config.maxRequestBytes, 1_048_576);
  assert.equal(
    loadRuntimeConfig({ MAX_REQUEST_BYTES: "2048" }).maxRequestBytes,
    2048
  );
  assert.throws(
    () => loadRuntimeConfig({ MAX_REQUEST_BYTES: "999999999" }),
    /MAX_REQUEST_BYTES/
  );
});

function responseDouble() {
  return {
    headers: null,
    body: null,
    writeHead(status, headers) {
      this.headers = { status, ...headers };
    },
    end(body) {
      this.body = body;
    },
  };
}

test("request guard rejects malformed and oversized content lengths", () => {
  const tooLarge = responseDouble();
  assert.equal(
    rejectOversizedRequest(
      { headers: { "content-length": "2048" } },
      tooLarge,
      1024
    ),
    true
  );
  assert.equal(tooLarge.headers.status, 413);

  const malformed = responseDouble();
  assert.equal(
    rejectOversizedRequest(
      { headers: { "content-length": "not-a-number" } },
      malformed,
      1024
    ),
    true
  );
  assert.equal(malformed.headers.status, 400);

  const acceptable = responseDouble();
  assert.equal(
    rejectOversizedRequest(
      { headers: { "content-length": "512" } },
      acceptable,
      1024
    ),
    false
  );
});

test("request guard rejects chunked bodies after the streaming cap is crossed", () => {
  const listeners = new Map();
  const request = {
    headers: {},
    destroyed: false,
    on(event, listener) {
      listeners.set(event, listener);
      return this;
    },
    once(event, listener) {
      listeners.set(event, listener);
      return this;
    },
    off(event) {
      listeners.delete(event);
      return this;
    },
    destroy() {
      this.destroyed = true;
    },
  };
  const response = responseDouble();

  assert.equal(rejectOversizedRequest(request, response, 4), false);
  listeners.get("data")(Buffer.from("1234"));
  assert.equal(response.body, null);
  listeners.get("data")(Buffer.from("5"));

  assert.equal(response.headers.status, 413);
  assert.equal(response.body, "Request entity too large");
  assert.equal(request.destroyed, true);
});
