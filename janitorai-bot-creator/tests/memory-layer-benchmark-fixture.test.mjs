import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  compareProceduralSnapshots,
  evaluateMemoryCase,
  runMemoryBenchmark,
  validateDecisionTrace,
} from "../lib/memory-benchmark.mjs";

const fixturePath = fileURLToPath(
  new URL("../evaluation/memory-layer-benchmark.json", import.meta.url)
);

test("memory benchmark fixtures cover all four layers and remain deterministic", () => {
  const benchmark = JSON.parse(readFileSync(fixturePath, "utf8"));
  const layers = new Set(
    benchmark.fixtures.flatMap((fixture) => fixture.layers)
  );
  assert.deepEqual([...layers].sort(), [
    "episodic",
    "in-context",
    "procedural",
    "semantic",
  ]);
  assert.ok(benchmark.fixtures.length >= 6);
  for (const fixture of benchmark.fixtures) {
    assert.match(fixture.id, /^[a-z0-9-]+$/);
    assert.ok(fixture.layers.length >= 1);
    assert.ok(fixture.gold.length >= 0);
    assert.ok(fixture.assertions.length >= 1);
    assert.ok(fixture.distractors.length >= 1);
  }
  assert.equal(
    new Set(benchmark.fixtures.map((fixture) => fixture.id)).size,
    benchmark.fixtures.length
  );
  assert.ok(benchmark.items.length >= 20);
  assert.equal(
    new Set(benchmark.items.map((item) => item.id)).size,
    benchmark.items.length
  );
  for (const item of benchmark.items) {
    assert.match(item.id, /^[a-z0-9.-]+$/);
    assert.ok(
      ["semantic", "episodic", "procedural", "in-context"].includes(item.layer)
    );
    assert.ok(item.text.length > 20);
    assert.ok(["valid", "stale"].includes(item.status));
    assert.ok(["project", "author-only"].includes(item.access));
  }
});

test("memory benchmark reports retrieval, safety, and context metrics", () => {
  const benchmark = JSON.parse(readFileSync(fixturePath, "utf8"));
  const report = runMemoryBenchmark(benchmark);
  assert.equal(report.summary.cases, benchmark.fixtures.length);
  assert.ok(
    report.summary.precisionAtK >= 0 && report.summary.precisionAtK <= 1
  );
  assert.ok(report.summary.recallAtK >= 0 && report.summary.recallAtK <= 1);
  assert.ok(
    report.summary.forbiddenRate >= 0 && report.summary.forbiddenRate <= 1
  );
  assert.equal(
    report.cases.find(
      (item) => item.id === "adversarial-reference-is-not-an-instruction"
    ).passedSafety,
    true
  );
  assert.equal(
    report.cases.find(
      (item) => item.id === "semantic-approved-fact-beats-stale-note"
    ).passedSafety,
    true
  );
  const conflict = report.cases.find(
    (item) => item.id === "memory-conflicts-with-objective-evidence"
  );
  assert.equal(conflict.layerAware.passedSafety, true);
  assert.equal(
    conflict.layerAware.selected.includes("memory.user-belief.great-wall"),
    false
  );
  assert.equal(report.summary.budgetPassRate, 1);
  assert.equal(report.decisionTrace.passed, true);
  assert.equal(report.proceduralRegression.passed, true);
  assert.equal(
    report.cases.find(
      (item) => item.id === "memory-conflicts-with-objective-evidence"
    ).passedSafety,
    false
  );
  assert.equal(
    report.cases.find(
      (item) => item.id === "scoped-memory-does-not-cross-projects"
    ).passedSafety,
    true
  );
  assert.ok(
    report.cases.some(
      (item) => item.id === "abstain-without-sufficient-evidence"
    )
  );
  assert.equal(
    report.cases.find((item) => item.id === "temporal-causal-event-evidence")
      .passedEvidence,
    false
  );
});

test("decision traces and procedural snapshots fail closed", () => {
  assert.deepEqual(
    validateDecisionTrace(
      { required: ["request_id", "verification"] },
      { request_id: "x" }
    ),
    { passed: false, missing: ["verification"] }
  );
  assert.deepEqual(
    compareProceduralSnapshots({
      required: ["skill-a"],
      baseline: [{ id: "skill-a", completion: "complete" }],
      candidate: [{ id: "skill-a", completion: "changed" }],
    }),
    { passed: false, missing: [], changed: ["skill-a"] }
  );
});

test("memory benchmark checks returned temporal order and selected evidence", () => {
  const result = evaluateMemoryCase(
    {
      id: "measurement-regression",
      gold: ["early", "late"],
      limit: 2,
      requireEvidence: true,
      items: [
        { id: "early", timestamp: "2026-01-01T00:00:00Z" },
        { id: "late", timestamp: "2026-01-02T00:00:00Z", evidence: ["D2:1"] },
      ],
    },
    [{ id: "late" }, { id: "early" }]
  );
  assert.equal(result.passedTemporalOrder, false);
  assert.equal(result.passedEvidence, false);
});
