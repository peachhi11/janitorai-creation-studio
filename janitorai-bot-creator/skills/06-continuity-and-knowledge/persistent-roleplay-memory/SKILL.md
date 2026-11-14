---
name: persistent-roleplay-memory
description: Convert roleplay events into compact, retrievable memory that preserves consequences without replaying whole scenes.
---

# Persistent Roleplay Memory

Use this skill after a consequential scene, before a long-context generation, or when a character appears to have forgotten an established bond, promise, conflict, or world condition.

## Process

1. Extract objective events, changed beliefs, revelations, promises, breaches, injuries, and unresolved pressure.
2. Separate durable canon from temporary mood, speculation, and scene texture.
3. Link each durable item to participants, location, time, relationship state, and dependent facts.
4. Supersede stale values rather than appending contradictory duplicates.
5. Retrieve memories by current scene pressure, causal consequence, participant, and knowledge access.
6. Render a short context block containing only relevant active state and necessary provenance.

## Memory record

```yaml
memory:
  event: ""
  participants: []
  world_effects: []
  relationship_effects: []
  knowledge_changes: []
  unresolved: []
  future_hooks: []
  scope: session | campaign | permanent
  status: active | superseded | closed
```

## Completion

Stop when the next scene can recover every consequence it needs without importing obsolete state, private information, or an entire prior transcript.
