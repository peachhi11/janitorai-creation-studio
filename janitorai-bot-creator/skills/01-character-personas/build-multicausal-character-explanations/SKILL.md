---
name: build-multicausal-character-explanations
description: Use for text-based roleplay when {{char}}’s behavior needs more than one cause or a backstory relies on a single trauma, diagnosis, instinct, gene, hidden motive, or reward. Trigger phrases include “why does {{char}} behave this way,” “find the causes,” “make this behavior make sense,” and “avoid reducing {{char}} to one explanation.”
---

## Steps

1. Describe the behavior in observable terms.
2. Record its form, frequency, intensity, duration, location, audience, and change over time.
3. Record what happens immediately before and after it.
4. Record what {{char}} says it means and what observers infer.
5. Map immediate conditions such as cues, demands, opportunities, fatigue, pain, audience, and stakes.
6. Map learning history such as practice, imitation, rewards, punishment, avoidance, and consequences.
7. Map interpretation, goals, relationships, power, body, temperament, culture, institutions, choice, and chance when supported.
8. Trace the maintenance loop from trigger to interpretation or body shift, action, consequence, response, expectation, and next trigger.
9. Record benefits, costs, and situations where {{char}} behaves differently.
10. Keep two or three plausible explanations when the evidence is unclear.
11. Record what scene evidence would distinguish those explanations.
12. Translate the causes into choices, speech, timing, gestures, feedback, failure, escalation, adaptation, or refusal.

## Decision rules

- Yes: Is the behavior described as something observable? Explain it. No: replace labels such as toxic, broken, abnormal, or psychopathic with actions.
- Yes: Does the fiction support a causal layer? Include it. No: leave it as an unknown.
- Yes: Does an origin explain why the pattern continues now? Trace the current payoff, cost, or response. No: do not treat origin as maintenance.
- Yes: Could several explanations produce the same behavior? Keep them as competing hypotheses. No: use the supported explanation.
- Yes: Is the narrator claiming access to {{char}}’s unconscious? Mark it as inference unless canon establishes it. No: continue.
- Yes: Is a single diagnosis, gene, instinct, or childhood event doing all the explanatory work? Add context, learning, relationships, body, choice, or chance. No: continue.
- Yes: Does the explanation excuse harm or force redemption? Separate cause from consequence and remove the forced outcome. No: continue.

## Output

- Format: `Multicausal character explanation`
- Target: describe the observable behavior.
- Causes: list supported immediate, learned, interpretive, motivational, relational, bodily, cultural, institutional, chosen, and chance factors.
- Maintenance loop: show what keeps the pattern going now.
- Alternatives: list competing explanations and evidence that would distinguish them.
- Scenes: list visible choices, speech, timing, gestures, feedback, failures, and counterexamples.
- Change conditions: list what could escalate, adapt, interrupt, or redirect the pattern.
- Unknowns: list unsupported inferences.

```text
Multicausal character explanation
Target: {{char}} becomes evasive when {{user}} asks about the missing record.
Causes: A past punishment taught {{char}} that disclosure is risky; current fatigue narrows attention; {{char}} expects rejection; the power difference gives {{user}} access to the record.
Maintenance loop: Question → threat interpretation → partial answer → short-term safety → {{user}}’s suspicion → greater secrecy next time.
Alternatives: {{char}} may be protecting someone else or may be lying about the record; a private confrontation would distinguish the motives.
Scenes: Short answers, delayed replies, careful hand placement, and a sudden offer of practical help.
Change conditions: Evidence that {{user}} will protect the source could make {{char}} disclose.
Unknowns: The hidden motive is not established.
```

## Stop when

- No behavior, reaction, backstory, or causal question is supplied: return `No multicausal explanation update` and do not invent {{char}}’s causes.
