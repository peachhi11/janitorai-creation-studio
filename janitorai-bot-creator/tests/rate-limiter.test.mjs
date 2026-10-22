import test from "node:test";
import assert from "node:assert/strict";
import { loadRuntimeConfig } from "../lib/runtime-config.mjs";
import { createRateLimiter } from "../lib/rate-limiter.mjs";

test("runtime config exposes configurable rate limits", () => {
  const config = loadRuntimeConfig({});
  assert.equal(config.rateLimit, 60);
  assert.equal(config.rateWindowMs, 60_000);
  assert.equal(loadRuntimeConfig({
    MCP_RATE_LIMIT: "2",
    MCP_RATE_WINDOW_MS: "5000"
  }).rateLimit, 2);
  assert.equal(loadRuntimeConfig({
    MCP_RATE_LIMIT: "2",
    MCP_RATE_WINDOW_MS: "5000"
  }).rateWindowMs, 5000);
});

test("rate limiter blocks a key until its window resets", () => {
  let now = 0;
  const limiter = createRateLimiter({
    limit: 2,
    windowMs: 1000,
    clock: () => now
  });

  assert.equal(limiter.check("client").allowed, true);
  assert.equal(limiter.check("client").allowed, true);
  const blocked = limiter.check("client");
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterMs, 1000);

  now = 1000;
  assert.equal(limiter.check("client").allowed, true);
});

test("rate limiter keeps client buckets independent", () => {
  const limiter = createRateLimiter({
    limit: 1,
    windowMs: 1000,
    clock: () => 0
  });
  assert.equal(limiter.check("one").allowed, true);
  assert.equal(limiter.check("two").allowed, true);
  assert.equal(limiter.check("one").allowed, false);
});
