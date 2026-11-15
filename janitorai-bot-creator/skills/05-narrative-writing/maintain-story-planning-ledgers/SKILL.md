---
name: maintain-story-planning-ledgers
description: Use when maintaining compact fictional story or roleplay ledgers for appearances, knowledge, goals, relationships, objects, promises, injuries, locations, unresolved threads, and state change. Trigger phrases include “update the ledger,” “what does each character know?”, and “track continuity.”
---

## Steps

1. Record the current scene, participants, location, time, viewpoint, and open player-owned choices.
2. Update only supported facts about appearances, knowledge, goals, relationships, objects, promises, injuries, and access.
3. Separate established fact, character belief, rumour, inference, plan, and unresolved question.
4. Record what {{char}}, {{user}}, NPCs, institutions, and the narrator know separately.
5. Add state changes with source, time, consequence, and next dependency.
6. Keep unresolved threads, debts, boundaries, injuries, secrets, and promises visible.
7. Remove stale, duplicated, contradicted, or unsupported entries instead of silently reconciling them.
8. Never use the ledger to force reconciliation, certainty, or {{user}}’s thoughts, speech, consent, or action.

## Decision rules

- Yes: Is a ledger entry unsupported by the scene or source? Mark it uncertain or remove it. No: continue.
- Yes: Do two characters have different knowledge? Keep separate entries. No: continue.
- Yes: Is the ledger becoming a rigid plot plan? Keep branches and unresolved questions. No: continue.
- Yes: Does an entry decide {{user}}’s response? Delete or reframe it as an open option. No: continue.

## Output

- Format: `Story planning ledger`
- Scene state: list time, place, participants, viewpoint, and current pressure.
- Character state: list goals, knowledge, relationships, objects, injuries, promises, and access.
- Truth layers: separate facts, beliefs, rumours, inferences, plans, and unknowns.
- Delta: list changes, source, consequence, and next dependency.
- Open threads: list unresolved questions and player-owned choices.

## Stop when

- No story state, continuity problem, or ledger update is supplied: return `No ledger update` and do not invent {{user}}’s state.
