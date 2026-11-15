---
name: select-psychological-lenses-for-fiction
description: Use for text-based roleplay when a question about {{char}} could be viewed through behavior, cognition, relationships, emotion, development, biology, traits, culture, or environment. Trigger phrases include “what lens fits {{char}},” “analyze this behavior without diagnosing,” “find another explanation,” and “turn this theory into scenes.”
---

## Steps

1. Define the exact target: action, decision, relationship, body state, belief, conflict, or change.
2. State who does what, in which situation, with what variation and consequence.
3. Separate what {{char}} does, what maintains it, how it developed, what it means to {{char}}, and what judgment the story makes.
4. Choose the smallest useful primary lens.
5. Choose a counter-lens when the issue has important consequences.
6. State whether the lenses complement, compete, or answer different levels of the question.
7. Label each claim as story fact, text observation, character belief, theory-guided interpretation, speculation, or disputed historical model.
8. Separate source evidence, popular summaries, clinical claims, historical theory, practical advice, game material, and genre convention.
9. Translate each lens into a question, needed evidence, one or two scene implications, and a limit.
10. Route specialist questions to the relevant character skill.

## Decision rules

- Yes: Does the lens ask a focused writing question? Use it. No: narrow the target.
- Yes: Does the fiction support the lens? Label it as interpretation or speculation. No: do not use it as a fact.
- Yes: Does the first lens leave out meaning, power, context, culture, body, or observable behavior? Add a counter-lens. No: keep the primary lens.
- Yes: Is a source summary being treated as proof? Preserve its evidence label and provenance. No: continue.
- Yes: Is a diagnostic-looking source being treated as hidden truth? Route it through character belief, observer bias, relationship, and context. No: continue.
- Yes: Is a theory being used to diagnose {{char}}, settle moral responsibility, or dictate {{user}}’s feelings, attraction, consent, memories, speech, or choices? Remove that use. No: continue.
- Yes: Do the selected lenses produce scene behavior and consequences? Keep them. No: replace them with a more useful lens.

## Output

- Format: `Psychological lens plan`
- Target: state the exact writing question.
- Primary lens: state the lens, question, evidence, scene implications, and limit.
- Counter-lens: state the second lens and what it adds or challenges.
- Claim status: label each conclusion.
- Source handling: separate evidence, belief, theory, convention, and uncertainty.
- Scene translation: list behavior, interpretation, stakes, consequence, and what remains unknown.
- Next skill: name a specialist skill if one is needed.

```text
Psychological lens plan
Target: Why does {{char}} withdraw after {{user}} offers help?
Primary lens: Learning — past help carried a cost; evidence is repeated refusal after obligation; scene implication is a practical counteroffer; limit — it does not prove the motive.
Counter-lens: Social context — the offer happens in public and threatens status; it complements the learning lens.
Claim status: The withdrawal is observed; the cost of past help is a hypothesis.
Source handling: A popular attachment label is a character belief, not a diagnosis.
Scene translation: {{char}} changes the subject, watches the audience, and accepts help only in private.
Next skill: Use motivation or attachment mapping if the pattern needs expansion.
```

## Stop when

- No behavior, character question, theory choice, or interpretive problem is supplied: return `No psychological lens update` and do not diagnose {{char}}.
