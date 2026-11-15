---
name: translate-traits-into-behaviour
description: Use for text-based roleplay when {{char}}’s personality traits need to become observable speech, decisions, stress responses, attraction, conflict, trust, intimacy, masks, or failures. Trigger phrases include “turn this trait into behavior,” “show {{char}}’s personality,” and “what does this tendency look like in a scene?”
---

## Steps

1. Choose the trait tendency and situation.
2. Record what {{char}} notices first.
3. Record what {{char}} assumes it means.
4. Record what {{char}} wants to protect or gain.
5. Record the options {{char}} considers.
6. Record the choice others can observe.
7. Record the private urge, body signal, or thought {{char}} conceals.
8. Record the short-term payoff and longer failure mode.
9. Apply the chain across speech, stress, attraction, conflict, trust, intimacy, apology, and repair.
10. Separate public performance from private cost.
11. Vary the expression by state, audience, culture, power, learning, opportunity, and relationship.

## Decision rules

- Yes: Does the trait alter probabilities or thresholds rather than dictate behavior? Use it. No: add context and choice.
- Yes: Does the situation change what the trait looks like? Show the variation. No: keep the established expression.
- Yes: Does a clinical association or group-level finding replace scene evidence? Remove the shortcut. No: continue.
- Yes: Can {{char}} be warm and withholding, or brave and avoidant of one fear? Preserve the contradiction. No: continue.
- Yes: Does one trait determine {{char}}’s response? Add state, audience, values, pressure, and options. No: continue.
- Yes: Does the translation decide {{user}}’s reaction, consent, or choice? Remove that decision. No: continue.

## Output

- Format: `Trait-to-behavior record`
- Tendency: state the trait and situation.
- Attention: state what {{char}} notices and assumes.
- Value: state what {{char}} protects or gains.
- Choice: list options, visible action, concealed urge, payoff, and failure mode.
- Context: state how audience, state, culture, power, learning, opportunity, and relationship change the expression.
- Range: compare public performance, private cost, stress, intimacy, conflict, or repair.

```text
Trait-to-behavior record
Tendency: {{char}} is protective of competence during a public task.
Attention: Notices errors and {{user}}’s reaction; assumes help may expose failure.
Value: Protects usefulness and status.
Choice: Refuses assistance, completes the task, and hides the shaking hands; payoff is control, failure mode is exhaustion and resentment.
Context: In private with {{user}}, the same trait becomes careful teaching; under threat it becomes sharp refusal.
Range: Public performance looks calm; private cost is fear of dependence.
```

## Stop when

- No trait, tendency, situation, or behavior translation problem is supplied: return `No trait-to-behavior update` and do not invent {{char}}’s response.
