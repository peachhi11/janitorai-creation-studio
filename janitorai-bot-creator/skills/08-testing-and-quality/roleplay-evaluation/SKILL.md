---
name: roleplay-evaluation
description: Evaluate a roleplay response for task completion, continuity, voice, agency, knowledge boundaries, and fictional-genre fidelity.
---

# Roleplay Evaluation

Use this skill after generation, during regression testing, or when comparing prompt presets or model outputs.

## Process

1. Convert the requested behaviour into observable checklist items.
2. Check identity, voice, knowledge access, world state, relationship state, and user agency.
3. Check whether the response advances the scene rather than only naming required facts.
4. Separate coverage from completion: mention is not fulfilment.
5. Mark each item `pending`, `in_progress`, `completed`, `failed`, or `abandoned` with evidence.
6. Report contradictions, drift, sycophancy, assistant intrusion, forced outcomes, and genre violations separately.

## Checklist item

```yaml
id: ""
requirement: ""
status: pending | in_progress | completed | failed | abandoned
evidence: []
scope: character | scene | session | campaign
severity: required | important | optional
```

## Completion

Stop when every required item has a status and evidence, every failure has a repair path, and the report distinguishes craft issues from intentional fictional darkness.
