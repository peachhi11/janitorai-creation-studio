---
name: commit-scene-state-and-memory
description: Convert a completed fictional scene or roleplay turn into a minimal, auditable state delta for characters, relationships, knowledge, objects, locations, and unresolved threads. Use when runtime memory must carry a scene forward, a parser has extracted events, or continuity breaks because changes are not committed consistently. Do NOT use to invent unplayed actions, overwrite player-owned choices, collapse belief into canon, or store every line as permanent memory.
---

# Commit scene state and memory

Treat a scene commit as a controlled delta, not a transcript dump or a rewrite
of the story's truth.

**Action:** Extract consequential events, classify their truth layer and
confidence, compare them with prior state, commit only supported changes, and
leave ambiguous or player-owned outcomes unresolved.

**Key point:** Memory should preserve what later scenes need, not everything the
model happened to generate.

**Why:** Small, explicit deltas reduce state drift while protecting uncertainty,
improvisation, and player agency.

## Separate the layers

For each candidate update, label:

- world or story canon;
- character observation, memory, belief, inference, or claim;
- narrator or author plan;
- player assertion or player-owned action;
- runtime eligibility and unresolved possibility.

Never promote a character's belief, an NPC rumour, a generated possibility, or a
player bluff into world truth without an authored or played basis.

## Extract the delta

Record only changes to:

- location, time, condition, injury, possession, or access;
- goal, fear, promise, debt, boundary, or relationship state;
- who witnessed, learned, inferred, forgot, believed, or concealed what;
- object, faction, reputation, or institutional state;
- unresolved thread, consequence due, or next pressure.

For each entry include `source_scene`, `subject`, `before`, `after`,
`truth_layer`, `confidence`, `author`, and `reversal_or_revision_path`. If no
material state changed, record a deliberate no-op rather than manufacturing
progress.

## Commit safely

1. Parse events in scene order.
2. Check physical, temporal, knowledge, and ownership constraints.
3. Deduplicate updates that describe the same event.
4. Resolve direct contradictions only when a higher-authority source exists;
   otherwise retain competing claims with confidence and provenance.
5. Apply the smallest delta to the relevant records.
6. Generate a human-readable change summary and regression checks for the next
   scene.

Make commits idempotent: replaying the same scene must not duplicate a debt,
injury, reveal, object, or relationship change.

## Preserve fictional genre logic

A genre may permit prophecy, resurrection, retcons, memory alteration,
metafictional bleed, or deliberately unreliable records. Treat these as
authored state transitions with a stated cause, affected layer, perceivers, and
consequence—not as permission for arbitrary runtime mutation.

## Deliverable

Return a state-delta table, rejected or unresolved candidates, updated memory
records, player-owned boundaries, and a short next-scene continuity checklist.
