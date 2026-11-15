---
name: commit-scene-state-and-memory
description: Use when converting a completed fictional scene or roleplay turn into a minimal state delta for characters, relationships, knowledge, objects, locations, and unresolved threads. Trigger phrases include “commit the scene state,” “update memory,” and “what changed this turn?”
---

## Steps

1. Record scene time, location, participants, viewpoint, and source text.
2. Extract only played or explicitly established actions, speech, observations, choices, objects, injuries, promises, and relationship changes.
3. Separate canon fact, character belief, rumour, inference, plan, and unresolved question.
4. Record knowledge changes separately for {{char}}, {{user}}, NPCs, institutions, and narrator.
5. Record object, location, access, resource, and relationship deltas with source and consequence.
6. Preserve player-owned choices and do not infer unplayed action, consent, feeling, memory, or intention.
7. Remove duplicates and reject unsupported or contradicted entries instead of silently canonising them.
8. Add unresolved threads and the next dependency without turning the ledger into a rigid plot.

## Decision rules

- Yes: Was the event played or explicitly established? Commit it. No: mark it as a possibility or omit it.
- Yes: Is a belief being stored as fact? Label the belief. No: continue.
- Yes: Does an entry overwrite {{user}}’s choice or interiority? Remove it. No: continue.
- Yes: Is the entry permanent when it is temporary or scene-local? Add scope and expiry. No: continue.

## Output

- Format: `Scene state delta`
- Scene: list time, place, participants, viewpoint, and source.
- Facts: list committed actions, speech, observations, objects, injuries, promises, and changes.
- Knowledge: list each actor’s new or changed knowledge and belief layers.
- Threads: list unresolved questions, dependencies, scope, and expiry.
- Rejected: list unsupported or player-owned events not committed.

## Stop when

- No completed scene, turn, or state change is supplied: return `No scene-state update` and do not invent an event.
