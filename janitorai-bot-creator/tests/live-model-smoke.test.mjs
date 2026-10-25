import test from "node:test";
import assert from "node:assert/strict";

import { runLiveModelSmoke } from "../scripts/live-model-smoke.mjs";

test("live model smoke accepts the expected response token", async () => {
  const result = await runLiveModelSmoke({
    model: "test-model",
    client: {
      responses: {
        create: async (request) => {
          assert.equal(request.model, "test-model");
          assert.match(request.input, /LIVE_MODEL_SMOKE_OK/);
          return { output_text: "LIVE_MODEL_SMOKE_OK" };
        },
      },
    },
  });

  assert.deepEqual(result, { model: "test-model", outputLength: 19 });
});

test("live model smoke rejects an unexpected response", async () => {
  await assert.rejects(
    () =>
      runLiveModelSmoke({
        model: "test-model",
        client: {
          responses: { create: async () => ({ output_text: "not the token" }) },
        },
      }),
    /expected token/
  );
});
