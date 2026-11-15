---
name: translate-values-into-decisions
description: Use for text-based roleplay when {{char}}’s values, priorities, duties, autonomy, or commitments need to become decisions, boundaries, sacrifices, speech, or contradictions. Trigger phrases include “show what {{char}} values,” “make this value affect the choice,” and “write the conflict between {{char}}’s principles.”
---

## Steps

1. Record {{char}}’s own wording for the value.
2. Record where it came from and who reinforced or threatened it.
3. Record behavior that demonstrates the value.
4. Record behavior that only performs it for an audience.
5. Record what {{char}} will sacrifice to protect it.
6. Record conflict with another value or material survival.
7. Separate autonomous commitment, approval, fear of punishment, habit, and defiance.
8. Record what {{char}} notices in the situation.
9. Record the outcome that would feel like self-betrayal.
10. Record the option that preserves the value at the lowest immediate cost.
11. Record the other value that may matter more urgently.
12. Show the decision through action, timing, refusal, compromise, silence, spending, risk, or who receives the benefit.
13. Record the story {{char}} tells themself afterward.
14. Show change after an event, interpretation, relationship, or repeated consequence.

## Decision rules

- Yes: Does the value change what {{char}} notices, refuses, protects, risks, or sacrifices? Show it. No: keep it as background.
- Yes: Is the value sincere, performed, compromised, or betrayed in this scene? Label the supported state. No: continue.
- Yes: Does material survival conflict with the value? Show the trade-off. No: preserve the value’s current priority.
- Yes: Is {{char}} being forced to act consistently with a stated ideal? Allow contradiction. No: continue.
- Yes: Is the narrator declaring one value morally correct? Replace the verdict with consequences. No: continue.
- Yes: Did the value change after an event, interpretation, relationship, or repeated consequence? Record the cause. No: do not invent a new personality.
- Yes: Does the decision write {{user}}’s identity, feelings, consent, speech, or choice? Remove that decision. No: continue.

## Output

- Format: `Value-to-decision record`
- Value: state {{char}}’s wording, origin, and current priority.
- Evidence: list demonstrated, performed, compromised, or betrayed behavior.
- Decision test: list noticed cue, self-betrayal risk, lowest-cost option, competing value, and material pressure.
- Choice: state the action, refusal, compromise, silence, spending, risk, or beneficiary.
- Self-story: state how {{char}} explains the choice afterward.
- Change: list the event, interpretation, relationship, or consequence that could revise the value.

```text
Value-to-decision record
Value: {{char}} calls loyalty “staying when it costs something”; it came from family duty and now competes with personal safety.
Evidence: {{char}} keeps a promise in private but performs loyalty in public to protect status.
Decision test: Notices {{user}}’s fear; self-betrayal would be abandoning them; the lowest-cost option is a partial disclosure; independence is the competing value.
Choice: {{char}} refuses to lie but withholds one detail.
Self-story: “I protected them without making the situation worse.”
Change: A repeated consequence may show {{char}} that silence also creates harm.
```

## Stop when

- No value, priority, decision, boundary, sacrifice, or moral conflict is supplied: return `No value-to-decision update` and do not invent {{char}}’s values.
