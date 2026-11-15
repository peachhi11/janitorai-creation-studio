---
name: check-motivation-consistency
description: Use for text-based roleplay when {{char}}’s goal, value, self-image, or behavior seems inconsistent across scenes. Trigger phrases include “check {{char}}’s motivation,” “why did {{char}} change goals,” “is this behavior out of character,” and “find the smallest continuity fix.”
---

## Steps

1. Record {{char}}’s immediate goal and longer motive for each important action.
2. Record the options {{char}} perceived and the outcomes they expected.
3. Record what {{char}} valued in that moment.
4. Record whether the action felt chosen, pressured, compliant, or defiant.
5. Record context, relationship pressure, payoff, cost, and new information.
6. Compare motive direction, intensity, and persistence separately.
7. Keep temporary state, learned motive, bodily need, and enduring value separate.
8. Check competing motives, changed meaning, blocked competence, altered opportunity, audience effects, shame, and exhaustion.
9. Decide whether the contradiction is deliberate, supported, or an unearned rewrite.
10. Identify the smallest repair when continuity is missing.

## Decision rules

- Yes: Is there a supported change in goal, value, context, information, pressure, payoff, or meaning? Treat the shift as consistent. No: continue checking.
- Yes: Are competing motives active? Record the conflict instead of flagging an error. No: continue checking.
- Yes: Did energy, access, audience, or payoff change only one motive dial? Update that dial only. No: keep direction, intensity, and persistence unchanged.
- Yes: Does {{char}} act against a stated goal for a shown reason? Preserve the contradiction. No: flag the missing cause.
- Yes: Did self-concept change after an event or reinterpretation? Record the change. No: flag the unsupported shift.
- Yes: Did achieving the goal change what it means to {{char}}? Update the motive. No: keep the previous meaning.
- Yes: Is a reward or threat being treated as permanent motivation? Limit it to the supported context. No: continue.
- Yes: Does the narrator claim more motive certainty than the evidence allows? Mark it as inference. No: continue.

## Output

- Format: `Motivation consistency review`
- Scene: identify the scene or roleplay turn.
- Action: state what {{char}} did.
- Motive: list the immediate, competing, and longer motives.
- Context: list pressure, options, audience, relationship, state, and new information.
- Evidence: cite the fact or event supporting the interpretation.
- Status: use `Consistent`, `Supported contradiction`, `Missing cause`, or `Unclear`.
- Repair: state the smallest change needed.

```text
Motivation consistency review
Scene: {{char}} refuses {{user}}’s offer after asking for help earlier.
Action: {{char}} refuses and claims they can manage alone.
Motive: Immediate — preserve control. Competing — accept care. Longer — avoid becoming dependent.
Context: Public setting, recent embarrassment, and new information that {{user}} is worried.
Evidence: {{char}} accepts private help but rejects it in front of others.
Status: Supported contradiction.
Repair: Add one line showing that public exposure changed the pressure.
```

## Stop when

- No action, goal change, motivation question, or continuity concern is supplied: return `No motivation consistency review` and do not invent an inconsistency.
