---
name: translate-formative-experience-into-behaviour
description: Use for text-based roleplay when {{char}} has a backstory but its effects on present habits, expectations, decisions, speech, relationships, stress, masks, or failures are unclear. Trigger phrases include “connect {{char}}’s past to behavior,” “show what this history taught {{char}},” and “make the backstory visible in scenes.”
---

## Steps

1. Record the earlier condition.
2. Record what the event meant to {{char}} then.
3. Record the strategy {{char}} tried.
4. Record the short-term result and repeated reinforcement.
5. Record the present trigger.
6. Record current behavior and its cost or benefit.
7. State what the behavior once accomplished.
8. Separate learned skill, repeated habit, expectation, imposed role, copied model, and present choice.
9. Show the pattern through attention, asking, refusal, apology, boasting, concealment, negotiation, trust, praise, error, dependence, play, and uncertainty.
10. Vary it by status pressure, intimacy, conflict, responsibility, relationship, and audience.
11. Include a public mask, private effort, exception, contradiction, and protective learning.
12. Let another person’s behavior calm, provoke, support, control, or confuse the pattern without making every relationship a reenactment.
13. Keep childhood language or “inner child” imagery as optional story metaphor.

## Decision rules

- Yes: Does each link from past to present have support? Keep the chain. No: weaken the claim or add another influence.
- Yes: Is a childhood role being treated as destiny? Reframe it as a learned possibility and current choice. No: continue.
- Yes: Did the strategy make sense in its original setting? Show its usefulness and later cost. No: record the supported origin.
- Yes: Does the present choice resemble the past but serve a new purpose? Keep the new purpose. No: use the established purpose.
- Yes: Is {{char}} diagnosing themself or explaining the childhood mechanism in therapist language? Move that analysis to author notes. No: continue.
- Yes: Does the translation decide {{user}}’s feelings, attraction, consent, memories, motives, speech, or choices? Remove that decision. No: continue.
- Yes: Is a dark, obsessive, manipulative, coercive, dependent, or loyal pattern intentional? Preserve its consequences without moralizing it. No: use the selected tone.

## Output

- Format: `Formative experience translation`
- Chain: list earlier condition, meaning, strategy, reinforcement, present trigger, behavior, cost, and benefit.
- Function: state what the pattern once accomplished.
- Scene behavior: list ordinary, intimate, conflict, and stress expressions.
- Relationships: list how other people calm, provoke, support, control, or confuse the pattern.
- Mask: state public performance, private effort, and what sustains them.
- Exceptions: list contradictions, protective learning, and conditions for change.
- Scene tests: list two or three scenes that show rather than explain the pattern.

```text
Formative experience translation
Chain: Being responsible for a younger sibling → {{char}} learned that usefulness prevents abandonment → plans every detail → receives praise → now panics when {{user}} offers unplanned help → controls the task → loses the chance for mutual care.
Function: The strategy once protected belonging and reduced uncertainty.
Scene behavior: Ordinary — prepares early. Intimate — offers practical help instead of vulnerability. Conflict — refuses assistance and apologizes through action.
Relationships: Consistency calms {{char}}; public correction makes the pattern rigid.
Mask: Competence looks effortless; private effort includes exhaustion and fear.
Exceptions: A trusted friend can make asking for help feel possible.
Scene tests: A missed deadline, a quiet offer from {{user}}, and a crisis where planning fails.
```

## Stop when

- No formative event, backstory pattern, present behavior, or causal translation problem is supplied: return `No formative experience translation` and do not invent {{char}}’s history.
