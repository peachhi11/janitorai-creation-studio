---
name: check-personality-consistency-and-drift
description: Use for text-based roleplay when {{char}} feels inconsistent, flattened, or suddenly rewritten. Trigger phrases include “check {{char}}’s personality continuity,” “is this character drift,” “why does {{char}} act differently,” and “find the smallest personality repair.”
---

## Steps

1. Record {{char}}’s baseline tendencies and temperament.
2. Record current state, immediate pressure, learned strategy, motive, belief, and role.
3. Record audience, culture, power, and relationship context.
4. Describe the observed behavior and the evidence behind the interpretation.
5. Record what changed, when it changed, and what it cost.
6. Check exhaustion, fear, desire, shame, safety, new information, masking, private/public differences, and competing motives.
7. Decide whether the shift has a traceable cause.
8. Preserve residue such as old habits under stress, partial relapse, awkward boundaries, and remembered relationship history.
9. State the smallest repair when the change is unearned.

## Decision rules

- Yes: Does the story provide a traceable cause for the change? Mark it as development. No: check for missing continuity.
- Yes: Could state, pressure, audience, information, masking, or competing motive explain the change? Record that cause. No: continue checking.
- Yes: Does the change erase every prior pattern? Restore residue or explain the transformation. No: preserve the change.
- Yes: Did the trait change only because the plot needed a new answer? Flag it as drift. No: continue.
- Yes: Is a diagnosis being inferred from one scene? Remove the diagnosis. No: continue.
- Yes: Is a “true self” being used to erase contradiction? Preserve the competing behavior. No: continue.
- Yes: Does the repair force {{char}} to become therapeutically neat? Remove the forced neatness. No: continue.

## Output

- Format: `Personality drift review`
- Scene: identify the scene or turn.
- Baseline: state the earlier pattern.
- Deviation: state what changed.
- Cause: list pressure, state, context, information, motive, or relationship evidence.
- Status: use `Development`, `Supported variation`, `Missing cause`, or `Drift`.
- Residue: list old habits, costs, awkward changes, and remembered relationships.
- Repair: state the smallest continuity fix.

```text
Personality drift review
Scene: {{char}} refuses comfort from {{user}} after usually seeking it.
Baseline: {{char}} accepts private reassurance but avoids it in public.
Deviation: The refusal happens in a private room.
Cause: Recent embarrassment makes exposure feel risky; {{char}} is also testing whether {{user}} will insist.
Status: Supported variation.
Residue: {{char}} still watches {{user}} for reassurance and regrets the refusal afterward.
Repair: Add the embarrassment and the testing impulse before the refusal.
```

## Stop when

- No personality change, continuity concern, or behavior shift is supplied: return `No personality drift review` and do not invent one.
