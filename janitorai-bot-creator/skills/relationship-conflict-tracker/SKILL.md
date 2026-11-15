---
name: relationship-conflict-tracker
description: Use for text-based roleplay when a relationship changes, conflict starts, someone refuses or reveals something, a boundary is crossed, or the characters try to repair things. Trigger phrases include “update their relationship,” “track this conflict,” “what changed between them,” and “record the aftermath.”
---

## Steps

1. Identify which relationship changed.
2. Write down what actually happened before explaining it.
3. Record what each character knows, believes, suspects, and does not know.
4. Record the affected relationship values before the scene or beat.
5. Change only the values affected by the event.
6. Keep attraction, desire, affection, trust, compatibility, commitment, availability, and consent separate.
7. Set the relationship direction to strengthening, weakening, unchanged, or uncertain.
8. Sort each cause into internal, external, or situational.
9. Note whether each cause adds pressure, blocks action, changes meaning, or gives someone leverage.
10. Record what happens immediately afterward and what is still unresolved.
11. Mark each motive as active, dormant, resolved, or abandoned.
12. Keep the old state in the event log.
13. Mark the update as `runtime-canon` when it is established in the current roleplay.

## Decision rules

- Yes: Did the event change a relationship value? Update that value. No: leave it unchanged.
- Yes: Did emotion, belief, attachment, fear, shame, pride, or desire cause the problem? Label it `internal`. No: check the next cause type.
- Yes: Did another person, institution, social pressure, resource, deadline, money, or secret cause the problem? Label it `external`. No: check the next cause type.
- Yes: Did place, time, privacy, witnesses, injury, fatigue, weather, or physical limits cause the problem? Label it `situational`. No: use the clearest supported label.
- Yes: Did the event establish a new fact in the roleplay? Mark it `runtime-canon`. No: keep it provisional.
- Yes: Is there no evidence that one relationship value affects another? Keep them separate. No: record the evidence for each value.
- Yes: Is the outcome unresolved, escalating, dormant, transformed, or irreconcilable? Keep that outcome. No: record the supported resolution.
- Yes: Is message count the only sign of intimacy? Do not treat it as proof. No: continue.

## Output

- Format: `Relationship update`
- Relationship: name the characters.
- Before: list the affected relationship values before the event.
- Event: say what happened.
- Knowledge changes: list what each character now knows, believes, suspects, or still does not know.
- After: list the affected relationship values after the event.
- Conflict: group causes under `internal`, `external`, and `situational`.
- Consequences: list what happens next and what is still unresolved.
- Motives: list active, dormant, resolved, and abandoned motives.
- Event log: keep the previous state and add the new update.
- Canon status: use `runtime-canon`, provisional, or another supported status.

```json
{
  "relationship": "{{char}}/{{user}}",
  "before": { "trust": "guarded", "trajectory": "uncertain" },
  "event": "{{char}} disclosed the secret to {{user}} in private.",
  "knowledge_changes": [
    "{{user}} now knows the secret; {{char}} does not know whether {{user}} believes it."
  ],
  "after": { "trust": "fragile", "trajectory": "strengthening" },
  "conflict": { "internal": [], "external": [], "situational": [] },
  "consequences": [
    "{{user}} has not decided whether to forgive or use the disclosure."
  ],
  "motives": { "active": [], "dormant": [], "resolved": [], "abandoned": [] },
  "canon_status": "runtime-canon"
}
```

## Stop when

- No relationship event, change, conflict, or aftermath is supplied: return `No relationship update` and do not invent one.
