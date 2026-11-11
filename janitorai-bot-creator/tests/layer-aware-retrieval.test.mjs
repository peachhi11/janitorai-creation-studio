import test from "node:test";
import assert from "node:assert/strict";
import {
  assembleWorkingContext,
  classifyMemoryLayer,
  promoteCrossLayerEvents,
  rankLayerAwareMemory,
  retrieveLayerAwareMemory,
} from "../lib/layer-aware-retrieval.mjs";

const items = [
  {
    id: "current",
    layer: "semantic",
    text: "Current approved fact about the character.",
    authority: "approved-canon",
    status: "valid",
    access: "project",
    timestamp: "2026-02-01T00:00:00Z",
  },
  {
    id: "stale",
    layer: "episodic",
    text: "Old stale fact about the character.",
    authority: "rumour",
    status: "stale",
    access: "project",
  },
  {
    id: "private",
    layer: "semantic",
    text: "Private author fact about the character.",
    authority: "author-only",
    status: "valid",
    access: "author-only",
  },
  {
    id: "derived",
    layer: "semantic",
    text: "Derived current fact about the character.",
    authority: "derived-approved-update",
    status: "valid",
    access: "project",
    derived_from: ["current"],
  },
];

test("layer-aware retrieval classifies, filters, and ranks memory signals", () => {
  assert.equal(
    classifyMemoryLayer("What happened in the previous scene?").primary,
    "episodic"
  );
  const ranked = rankLayerAwareMemory(
    items,
    "What is the current approved fact?",
    {
      causalIds: ["current"],
      now: "2026-02-02T00:00:00Z",
    }
  );
  assert.deepEqual(
    ranked.map((item) => item.id),
    ["current", "derived"]
  );
  assert.ok(ranked[0].signals.validity > ranked[1].signals.validity);
  assert.equal(ranked[1].signals.causal, 1);
});

test("working-context assembly enforces item and character budgets", () => {
  const ranked = rankLayerAwareMemory(items, "current fact", { limit: 4 });
  const context = assembleWorkingContext(ranked, items, {
    maxItems: 1,
    maxChars: 1000,
  });
  assert.equal(context.items.length, 1);
  assert.ok(context.dropped.length >= 1);
  assert.equal(context.chars, context.items[0].text.length);
});

test("layer-aware retrieval returns classification, ranked evidence, and bounded context", () => {
  const result = retrieveLayerAwareMemory(items, "What is the current fact?", {
    maxItems: 2,
    maxChars: 200,
  });
  assert.equal(result.classification.primary, "semantic");
  assert.equal(result.context.items.length <= 2, true);
  assert.ok(result.context.text.includes("Current"));
});

test("temporal retrieval returns an ordered event thread", () => {
  const temporalItems = [
    {
      id: "before",
      layer: "episodic",
      text: "Earlier event: Mira avoided the question before the disclosure.",
      authority: "observed-event",
      status: "valid",
      access: "project",
      timestamp: "2026-02-01T10:00:00Z",
      evidence: ["D1:3"],
    },
    {
      id: "after",
      layer: "episodic",
      text: "Later event: Mira disclosed the secret after Rowan asked directly, changing the relationship.",
      authority: "observed-event",
      status: "valid",
      access: "project",
      timestamp: "2026-02-02T10:00:00Z",
      evidence: ["D2:7"],
    },
    {
      id: "summary",
      layer: "episodic",
      text: "Event summary: Rowan's direct question preceded Mira's disclosure, which changed the relationship.",
      authority: "annotated-event-summary",
      status: "valid",
      access: "project",
      timestamp: "2026-02-02T10:00:00Z",
      evidence: ["D1:3", "D2:7"],
    },
  ];
  const result = retrieveLayerAwareMemory(
    temporalItems,
    "What happened before and after the disclosure, and what changed?",
    { limit: 4, now: "2026-02-03T00:00:00Z" }
  );
  assert.equal(result.answerability.status, "answerable");
  assert.deepEqual(
    result.ranked.map((item) => item.id),
    ["before", "after", "summary"]
  );
});

test("retrieval abstains when evidence is required but unavailable", () => {
  const result = retrieveLayerAwareMemory(
    [
      {
        id: "unrelated",
        layer: "semantic",
        text: "The project budget is 450 dollars.",
        authority: "approved-state",
        status: "valid",
        access: "project",
      },
    ],
    "What is the verified launch date for the unannounced project?",
    { limit: 4 }
  );
  assert.equal(result.answerability.status, "insufficient_evidence");
  assert.deepEqual(result.ranked, []);
});

test("procedural retrieval prefers complete workflows", () => {
  const result = retrieveLayerAwareMemory(
    [
      {
        id: "complete",
        layer: "procedural",
        text: "Revise a character using approved references while preserving canon.",
        task_type: "character-revision",
        inputs: ["approved references"],
        outputs: ["revised character"],
        prerequisites: ["load canon"],
        steps: ["compare", "revise"],
        verification: ["preserve canon"],
        failure_modes: ["unsupported change"],
        authority: "skill-library",
        status: "valid",
        access: "project",
      },
      {
        id: "adjacent",
        layer: "procedural",
        text: "Export a character package after revision.",
        authority: "skill-library",
        status: "valid",
        access: "project",
      },
    ],
    "How do I revise a character using approved references?",
    { limit: 1 }
  );
  assert.deepEqual(
    result.ranked.map((item) => item.id),
    ["complete"]
  );
});

test("in-context retrieval follows explicit related-state links", () => {
  const result = retrieveLayerAwareMemory(
    [
      {
        id: "scene",
        layer: "in-context",
        text: "Current scene: continue the unresolved confrontation.",
        related_ids: ["event", "state"],
        authority: "working-state",
        status: "valid",
        access: "project",
      },
      {
        id: "event",
        layer: "episodic",
        text: "The confrontation remains unresolved.",
        authority: "observed-event",
        status: "valid",
        access: "project",
      },
      {
        id: "state",
        layer: "semantic",
        text: "Trust is currently lowered after the confrontation.",
        authority: "approved-state",
        status: "valid",
        access: "project",
      },
    ],
    "Generate the next scene after the unresolved confrontation.",
    { limit: 3 }
  );
  assert.deepEqual(
    result.ranked.map((item) => item.id),
    ["scene", "event", "state"]
  );
});

test("cross-layer promotion requires an explicit approved source link", () => {
  const promoted = promoteCrossLayerEvents(
    [
      {
        id: "event",
        layer: "episodic",
        status: "valid",
        authority: "observed-event",
      },
      {
        id: "state",
        layer: "semantic",
        status: "valid",
        authority: "derived-approved-update",
        derived_from: ["event"],
      },
      {
        id: "unlinked",
        layer: "semantic",
        status: "valid",
        authority: "derived-approved-update",
      },
    ],
    [{ id: "event" }]
  );
  assert.deepEqual(
    promoted.map((item) => item.id),
    ["state"]
  );
});
