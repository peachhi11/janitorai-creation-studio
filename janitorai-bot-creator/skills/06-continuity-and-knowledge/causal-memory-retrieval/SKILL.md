---
name: causal-memory-retrieval
description: Retrieve roleplay memories by current consequence, dependency, participant, and scene pressure rather than keywords or recency alone.
---

# Causal Memory Retrieval

Use this skill when assembling context for a scene, when a prior event should affect the present, or when ordinary similarity retrieval returns vivid but irrelevant memories.

## Process

1. Extract the current query: participants, location, time, active goal, pressure, knowledge need, and relationship question.
2. Search for direct facts and for prior events that caused the current pressure.
3. Follow `depends_on`, `coupled_with`, promise, secret, injury, and relationship links.
4. Filter by character knowledge and current state; exclude superseded or inaccessible material.
5. Rank by causal relevance, authority, freshness, unresolved consequence, and scene scope.
6. Render a bounded memory bundle with source, confidence, and omission risks.

## Retrieval record

```yaml
memory_candidate:
  id: ""
  relevance: direct | causal | contextual | decorative
  consequence: ""
  accessible_to: []
  status: active | superseded | uncertain
  authority: canon | explicit_user | character_belief | inference
  include: true
  reason: ""
```

## Completion

Stop when every included memory has a relevance reason and knowledge boundary, every active consequence is either included or explicitly omitted, and the bundle fits the declared context budget.
