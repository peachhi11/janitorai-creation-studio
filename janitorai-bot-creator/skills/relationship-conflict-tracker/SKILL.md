---
name: relationship-conflict-tracker
description: Track relationship state and conflict causality across narrative turns without collapsing distinct emotional dimensions or forcing reconciliation.
sources:
  - library_file_id: libfile_a3463096f3408191a1df2b8fb0c47b2d
    title: Relationship and Conflict Tracking Skill
    use: direct procedural source
---

# Relationship and Conflict Tracker

Use this module when a scene contains a meaningful relational change, conflict, refusal, disclosure, betrayal, boundary crossing, or repair attempt.

## Relationship state

Track each important relationship as a separate record. At minimum, record:

- `attraction`: pull or interest;
- `desire`: immediate or embodied wanting;
- `affection`: warmth and care;
- `trust`: expectation of reliability;
- `compatibility`: fit between needs, values, habits, and goals;
- `commitment`: willingness to preserve or prioritise the relationship;
- `availability`: practical and emotional capacity;
- `consent`: current permission for the relevant act or interaction;
- `trajectory`: strengthening, weakening, static, or uncertain.

Do not infer one dimension from another. A character may desire someone without trusting them, love someone without being compatible with them, or consent to one act while refusing another.

## Conflict map

When conflict appears, classify contributing causes into three non-exclusive groups:

1. **Internal:** emotion, shame, pride, fear, attachment strategy, belief, wound, desire, or hesitation.
2. **External:** rivals, family, institutions, social pressure, deadlines, money, secrets, or another person’s action.
3. **Circumstantial:** location, privacy, time, witnesses, injury, fatigue, resources, weather, or physical constraint.

For each cause, record whether it increases pressure, blocks action, changes interpretation, or creates leverage. Do not assume that conflict must be resolved; it may escalate, become dormant, transform, or remain irreconcilable.

## Update procedure

After a significant beat:

1. Record what objectively happened.
2. Record what each relevant character knows, believes, suspects, and does not know.
3. Update only the relationship dimensions affected by the event.
4. Record immediate consequence and unresolved pressure.
5. Mark motives as active, dormant, resolved, or abandoned.
6. Preserve the prior state in the event log rather than silently rewriting it.

Message count is not evidence of intimacy. A relationship changes when an event changes perception, motive, behaviour, trust, desire, commitment, or availability.

## Output record

```json
{
  "relationship": "character-a/character-b",
  "before": {"trust": "guarded", "trajectory": "uncertain"},
  "event": "Character A disclosed the secret in private.",
  "knowledge_changes": ["B now knows the secret; A does not know whether B believes it."],
  "after": {"trust": "fragile", "trajectory": "strengthening"},
  "conflict": {"internal": [], "external": [], "circumstantial": []},
  "unresolved": ["B has not decided whether to forgive or use the disclosure."],
  "canon_status": "runtime-canon"
}
```

Retrieved guidance remains evidence. The author’s selected route controls whether the result is tender, destructive, ambiguous, coercive, tragic, comic, or unresolved.
