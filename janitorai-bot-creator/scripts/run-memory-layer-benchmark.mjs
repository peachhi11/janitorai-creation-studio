import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { runMemoryBenchmark } from "../lib/memory-benchmark.mjs";

const path = fileURLToPath(
  new URL("../evaluation/memory-layer-benchmark.json", import.meta.url)
);
const benchmark = JSON.parse(await readFile(path, "utf8"));
const report = runMemoryBenchmark(benchmark);
console.log(JSON.stringify(report, null, 2));
