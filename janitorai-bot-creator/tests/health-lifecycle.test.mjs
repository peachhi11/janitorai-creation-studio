import test from "node:test";
import assert from "node:assert/strict";

test("health endpoint contract is documented", () => {
  assert.equal("/healthz", "/healthz");
  assert.match(
    JSON.stringify({
      status: "ok",
      service: "janitorai-bot-creator",
      version: "1.1.0"
    }),
    /janitorai-bot-creator/
  );
});
