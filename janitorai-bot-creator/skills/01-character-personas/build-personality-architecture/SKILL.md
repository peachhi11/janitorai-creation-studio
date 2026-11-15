---
name: build-personality-architecture
description: Use for text-based roleplay when {{char}} needs a behavioral foundation instead of a personality label. Trigger phrases include “build {{char}}’s personality,” “make this personality specific,” “show how {{char}} behaves under pressure,” and “turn this trait into scenes.”
---

## Steps

1. Record {{char}}’s stable tendencies and temperament.
2. Record learned strategies, values, fears, and expectations.
3. Record {{char}}’s self-story, social roles, culture, and material limits.
4. Record the current state, including sleep, stress, grief, illness, intoxication, excitement, and safety.
5. Record {{char}}’s public mask, private self-story, and what each protects.
6. Record contradictions, thresholds, triggers, costs, and exceptions.
7. Use trait or assessment models as descriptive prompts, not scripts or diagnoses.
8. For each broad tendency, name its object, trigger, cost, and exception.
9. Let culture and relationships change the expression without replacing the personality.
10. Record behavioral examples, mask/private contrast, uncertainty, and conditions for change.

## Decision rules

- Yes: Does a tendency predict conditional behavior? Keep it. No: add a context, threshold, exception, or choice.
- Yes: Does a score or type label replace scene evidence? Remove the shortcut. No: use it only as a prompt.
- Yes: Is a body type, face, handwriting style, or physical feature being treated as personality evidence? Remove that inference. No: continue.
- Yes: Does the current state change how a tendency appears? Show the state. No: keep the stable tendency visible.
- Yes: Does culture or a relationship change the expression? Show the context. No: preserve the established expression.
- Yes: Is {{char}} being given one fixed “true” reaction? Add alternatives and conditions. No: continue.
- Yes: Does the writing diagnose {{char}} or make the personality a moral verdict? Rewrite it as fictional behavior. No: continue.

## Output

- Format: `Personality architecture record`
- Tendencies: list stable patterns, objects, triggers, costs, and exceptions.
- Learning: list strategies, values, fears, expectations, and self-story.
- State: list current conditions that change expression.
- Mask: contrast public presentation, private self-story, and pressure leaks.
- Contradictions: list competing patterns and thresholds.
- Examples: show behavior in at least three contexts.
- Change conditions: list what could reinforce, interrupt, or redirect the pattern.
- Uncertainty: list inferences that are not established facts.

```text
Personality architecture record
Tendencies: {{char}} seeks unfamiliar ideas when safe, but becomes rigid when novelty threatens belonging.
Learning: Praise for competence made {{char}} hide confusion; loyalty became a way to secure connection.
State: Sleep loss makes {{char}} less patient and more literal.
Mask: Publicly confident; privately worried about being replaceable; pressure leaks through over-explaining.
Contradictions: {{char}} wants intimacy but tests whether {{user}} will stay.
Examples: Calm — asks curious questions. Pressured — controls the conversation. Safe with {{user}} — admits uncertainty.
Change conditions: Direct reassurance may reduce testing; public humiliation may increase it.
Uncertainty: The fear of replacement is an inference, not a diagnosis.
```

## Stop when

- No personality label, trait, behavior problem, or character foundation is supplied: return `No personality architecture update` and do not invent {{char}}’s personality.
