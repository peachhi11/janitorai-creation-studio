---
name: design-relationship-update-transaction
description: Apply a scene’s relationship changes atomically enough to preserve before-state, event evidence, affected dimensions, world coupling, and recoverable history.
---

# Design Relationship Update Transaction

Use this skill when a scene changes a bond and the result must be persisted or compared with prior state.

## Process

1. Snapshot the relationship and coupled world state before the event.
2. Record the objective event, participants, witnesses, knowledge changes, and source.
3. Calculate only the affected relationship dimensions and derived status.
4. Validate constraints, dependencies, consent scope, and contradictions.
5. Commit the new state with event history, provenance, unresolved pressure, and revision identity.
6. On failure, preserve the before-state and return a retryable or review-required result.

## Completion

Stop when before-state, event, after-state, affected dimensions, coupled updates, validation, and recovery behavior are all recorded.
