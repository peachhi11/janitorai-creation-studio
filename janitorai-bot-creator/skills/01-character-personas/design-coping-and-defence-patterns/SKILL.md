---
name: design-coping-and-defence-patterns
description: Use for text-based roleplay when {{char}} responds to stress, shame, grief, anger, fear, desire, or conflict in recurring but changeable ways. Trigger phrases include “how does {{char}} cope,” “show {{char}}’s defense,” “what relief does this behavior give,” and “make the coping pattern conditional.”
---

## Steps

1. Record the stressor and what it means to {{char}}.
2. Record the emotion and action urge.
3. Record the coping or defense response.
4. Record immediate relief, protection, control, or connection.
5. Record the cost to {{char}} and other people.
6. Record what makes the strategy fail, intensify, or become unnecessary.
7. Record a possible alternative without making it mandatory.
8. Add safety behaviors and what danger they are meant to prevent.
9. Set who is present, what is at stake, how much time exists, whether escape is possible, and what {{char}} has learned.
10. Show how the pattern changes across public, family, intimate, grieving, and pressured settings.
11. Let the pattern change through consequences, trust, practice, exhaustion, information, or environment.
12. Keep setbacks, recurrence, and partial changes visible.

## Decision rules

- Yes: Did the strategy once make sense in {{char}}’s situation? Show its original function. No: add the supported reason it developed.
- Yes: Does the strategy provide short-term relief and long-term cost? Record both. No: use the single supported effect.
- Yes: Does the same strategy work differently by setting or relationship? Vary it by context. No: keep the established condition.
- Yes: Is the behavior being treated as a clinical diagnosis? Rewrite it as a craft description. No: continue.
- Yes: Is a healthier response being required? Offer it as one possible choice. No: preserve the selected strategy.
- Yes: Does one setback erase all change? Restore the prior development and record the setback. No: continue.
- Yes: Is a destructive, eroticized, coercive, obsessive, tragic, or absurd strategy intentional? Preserve it with causes and consequences. No: use the selected tone.

## Output

- Format: `Coping and defense record`
- Loop: list stressor, meaning, emotion, urge, response, payoff, cost, failure mode, and adaptation.
- Safety behavior: state what danger {{char}} is trying to prevent and what uncertainty it keeps alive.
- Conditions: list audience, stakes, time, escape, relationship, and learned context.
- Signals: list observable speech, timing, body behavior, avoidance, persistence, or recovery.
- Variation: compare settings where the pattern works, fails, or changes.
- Open questions: list alternatives or changes {{char}} may choose.

```text
Coping and defense record
Loop: {{user}} questions {{char}}’s loyalty; {{char}} reads it as possible abandonment; anger rises; {{char}} jokes and changes the subject; tension drops briefly; trust becomes less clear.
Safety behavior: Humor prevents immediate exposure but keeps {{char}} dependent on avoidance.
Conditions: In public {{char}} performs confidence; in private with {{user}} they may admit fear; escape is possible but costly.
Signals: Faster jokes, practical offers, delayed replies, and a later apology without explanation.
Variation: Direct reassurance may interrupt the loop; public shame may intensify it.
Open questions: Decide whether {{char}} can ask for reassurance directly.
```

## Stop when

- No stress response, coping strategy, defense, recovery pattern, or conflict reaction is supplied: return `No coping and defense update` and do not invent {{char}}’s pattern.
