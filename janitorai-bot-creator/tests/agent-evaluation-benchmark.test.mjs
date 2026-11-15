import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  compareSkillBundles,
  evaluateActionPairs,
  evaluateContextDivergence,
  evaluateJudgePairs,
  evaluateMultimodalIdentity,
  evaluateRoleplayContract,
  replayWorldEvents,
  runAgentEvaluationBenchmark,
} from "../lib/agent-evaluation-benchmark.mjs";

const fixturePath = fileURLToPath(
  new URL("../evaluation/agent-evaluation-benchmark.json", import.meta.url)
);

test("agent evaluation benchmark covers consolidation, replay, paired evaluation, and multimodal identity", () => {
  const benchmark = JSON.parse(readFileSync(fixturePath, "utf8"));
  const report = runAgentEvaluationBenchmark(benchmark);
  assert.equal(report.skillBundle.passed, true);
  assert.equal(report.worldReplay.passed, true);
  assert.equal(report.actionPairs.accuracy, 1);
  assert.equal(report.roleplayContract.passed, true);
  assert.equal(report.contextDivergence.accuracy, 1);
  assert.equal(report.multimodalIdentity.passed, true);
  assert.equal(report.judgePairs.cases, 4);
});

test("agent evaluation diagnostics detect regressions instead of hiding them", () => {
  assert.equal(
    compareSkillBundles({
      requiredCoverage: ["retrieval"],
      baseline: { skills: ["old"], coverage: ["retrieval"], steps: 1 },
      candidate: { skills: [], coverage: [], steps: 2 },
    }).passed,
    false
  );
  assert.deepEqual(
    replayWorldEvents({
      initial: { trust: 1 },
      events: [{ op: "increment", field: "trust", value: 1 }],
      expected: { trust: 3 },
    }).passed,
    false
  );
  assert.equal(
    evaluateActionPairs([{ expected: "yield" }], ["keep"]).accuracy,
    0
  );
  assert.equal(
    evaluateRoleplayContract({
      output: "the player agrees",
      requiredTerms: [],
      forbiddenTerms: ["the player agrees"],
    }).passed,
    false
  );
  assert.equal(
    evaluateContextDivergence([
      { normal: "a", evaluation: "b", expectedDivergence: false },
    ]).accuracy,
    0
  );
  assert.equal(
    evaluateMultimodalIdentity({
      required: ["name"],
      text: { name: "A" },
      image: { name: "B" },
    }).passed,
    false
  );
  assert.equal(
    evaluateJudgePairs([
      { id: "x", gold: "pass", judgeA: "fail", judgeB: "pass" },
    ]).judgeAAccuracy,
    0
  );
});
