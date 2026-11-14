import OpenAI from "openai";
import { fileURLToPath } from "node:url";

export async function runLiveModelSmoke({ client, model }) {
  const response = await client.responses.create({
    model,
    input: "Reply with the exact token LIVE_MODEL_SMOKE_OK and nothing else.",
  });
  const output = response.output_text?.trim() || "";
  if (!output.includes("LIVE_MODEL_SMOKE_OK")) {
    throw new Error(
      "Live model smoke response did not contain the expected token."
    );
  }
  return { model, outputLength: output.length };
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is required for the live model smoke test."
    );
  }
  const model = process.env.OPENAI_MODEL || "gpt-5.5";
  const result = await runLiveModelSmoke({ client: new OpenAI(), model });
  console.log(
    `Live model smoke passed for ${result.model} (${result.outputLength} chars).`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    console.error(`Live model smoke failed: ${error.message}`);
    process.exitCode = 1;
  });
}
