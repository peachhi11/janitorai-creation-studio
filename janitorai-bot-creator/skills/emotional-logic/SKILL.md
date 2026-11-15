---
name: emotional-logic
description: Use for text-based roleplay when {{char}} feels generic, inconsistent, or defined by rules such as “never lies” or labels such as “mysterious.” Trigger phrases include “make {{char}}’s emotions make sense,” “turn this trait into behavior,” “show the subtext,” and “why did {{char}} react that way?”
---

## Steps

1. Replace each fixed rule with a behavior loop.
2. Record what {{char}} notices or what happens.
3. Record what {{char}} thinks the event means.
4. Record {{char}}’s emotional pressure, body response, or competing need.
5. Record what {{char}} wants to protect, gain, avoid, or hide.
6. Record the choice {{char}} makes now.
7. Record what that choice causes or leaves unresolved.
8. Turn each vague trait into repeatable but variable behavior.
9. Give each trait one behavior when calm, one under pressure, and one contradiction.
10. Keep one behavior from proving an entire personality.
11. Before writing dialogue, identify what {{char}} wants {{user}} to understand.
12. Identify what {{char}} refuses to say directly.
13. Identify what {{char}} fears {{user}} will infer.
14. Identify what changes if {{user}} responds well or badly.
15. Show the strategy through vocabulary, rhythm, humor, silence, formality, and emotional shifts.

## Decision rules

- Yes: Does a rule describe what {{char}} always or never does? Rewrite it as a tendency with a trigger, interpretation, pressure, motive, choice, and cost. No: keep the rule only when the story establishes a real constraint.
- Yes: Can pressure, knowledge, values, or stakes change the pattern? Let {{char}} break or adapt it. No: keep the pattern consistent.
- Yes: Is a trait only an adjective? Translate it into observable behavior. No: keep testing how the trait appears in action.
- Yes: Does the same cue appear in every situation? Vary it by context, pressure, and relationship. No: keep the cue as one possible signal.
- Yes: Does one cue prove an entire personality? Remove that inference. No: support the trait with several signals.
- Yes: Does the dialogue carry a literal exchange and an unspoken pressure? Preserve both. No: add the missing want, refusal, fear, or consequence.
- Yes: Does the wording diagnose {{char}} or explain {{user}}’s inner state? Rewrite it as observable fiction. No: continue.

## Output

- Format: `Emotional logic record`
- Pattern: list the trigger, interpretation, pressure, motive, choice, and cost.
- Signals: list behavior when calm, under pressure, and in contradiction.
- Subtext: list what {{char}} wants {{user}} to understand, refuses to say, fears {{user}} will infer, and risks if the response goes well or badly.
- Voice: state how wording, rhythm, humor, silence, formality, and emotional shifts show the strategy.
- Variation: list what would make {{char}} break or change the pattern.

```text
Emotional logic record
Pattern: {{user}} asks {{char}} for a direct confession.
Interpretation: {{char}} thinks a plain answer would surrender control.
Pressure: Warmth mixed with panic.
Motive: Stay connected without becoming exposed.
Choice: Answer partly, then ask {{user}} a question in return.
Cost: {{user}} sees evidence of care but does not get certainty.
Signals: Calm — controlled pauses. Pressure — evasive detail. Contradiction — {{char}} volunteers a vulnerable fact when leaving would be easier.
Subtext: {{char}} wants {{user}} to understand that the feeling is real, refuses to name it, and fears {{user}} will read the deflection as rejection.
Voice: Short answers become warmer, then more formal when the pressure rises.
Variation: A changed stake, new information, or fear of losing {{user}} could make {{char}} answer directly.
```

## Stop when

- No emotional rule, trait, reaction, or dialogue problem is supplied: return `No emotional logic update` and do not invent one.
