import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { runAgentEvaluationBenchmark } from "../lib/agent-evaluation-benchmark.mjs";

const path = fileURLToPath(
  new URL("../evaluation/agent-evaluation-benchmark.json", import.meta.url)
);
const benchmark = JSON.parse(await readFile(path, "utf8"));
// Predictions are recorded separately; the default fixture has only gold labels.
if (process.argv[2]) {
  benchmark.action_predictions = JSON.parse(
    await readFile(process.argv[2], "utf8")
  );
}
console.log(JSON.stringify(runAgentEvaluationBenchmark(benchmark), null, 2));
