import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { runAgentEvaluationBenchmark } from "../lib/agent-evaluation-benchmark.mjs";

const path = fileURLToPath(
  new URL("../evaluation/agent-evaluation-benchmark.json", import.meta.url)
);
const benchmark = JSON.parse(await readFile(path, "utf8"));
console.log(JSON.stringify(runAgentEvaluationBenchmark(benchmark), null, 2));
