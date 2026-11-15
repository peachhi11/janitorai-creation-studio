---
name: build-character-motivation-architecture
description: Use for text-based roleplay when {{char}}’s actions feel arbitrary, goals need more depth, or motives need to change with pressure, relationships, status, or opportunity. Trigger phrases include “why does {{char}} want this,” “build {{char}}’s motivation,” “add competing motives,” and “what would make {{char}} change course?”
---

## Steps

1. Record {{char}}’s immediate want and longer-term aim.
2. Record the need, drive, incentive, curiosity, pleasure, fear, duty, or belonging behind the pursuit.
3. Separate the activity’s intrinsic value from its practical reward.
4. Record the expected outcome, perceived chance of success, and value of the outcome.
5. Record what {{char}} believes they must do to get it.
6. Record competing motives and the cost of choosing one.
7. Record context such as audience, authority, scarcity, opportunity, relationship, culture, and time pressure.
8. Track motive direction, intensity, and persistence separately.
9. Record whether the action feels chosen, pressured, rewarded, shamed, obligated, approved, or defiant.
10. Give each major motive a trigger, strategy, short-term payoff, long-term cost, failure mode, and revision point.
11. Show how autonomy, competence, and connection support or frustrate one another.
12. Record observable behavior and the conditions that could change it.

## Decision rules

- Yes: Does the motive create a choice, cost, conflict, or reversal? Keep it. No: reduce it to background.
- Yes: Do multiple motives operate at once? Preserve the contradiction. No: record the single supported motive.
- Yes: Are direction, intensity, and persistence different? Track them separately. No: keep them aligned only when the story supports it.
- Yes: Is the expected outcome based on {{char}}’s perception? Record that perception, not objective arithmetic. No: use established evidence.
- Yes: Is the action driven by threat, reward, shame, obligation, approval, or defiance? Show the pressure. No: record the choice as integrated and voluntary.
- Yes: Does context change how the motive appears? Update the behavior. No: keep the established expression.
- Yes: Is a motive being reduced to one need or a fixed hierarchy? Add competing causes and context. No: continue.
- Yes: Does the description replace a requested toxic, dark, or ambiguous motive with a healthier one? Restore the selected motive and its consequences. No: continue.

## Output

- Format: `Motivation architecture record`
- Motive: list want, deeper need, direction, intensity, and persistence.
- Meaning: state what the outcome means to {{char}}.
- Context: list audience, authority, scarcity, opportunity, relationship, culture, and time pressure.
- Strategy: list what {{char}} thinks will work.
- Conflict: list competing motives, payoffs, costs, and failure modes.
- Choice: state the observable behavior.
- Change conditions: list what could make {{char}} revise, double down, or reinterpret the goal.

```text
Motivation architecture record
Motive: {{char}} wants recognition and needs proof that they matter; direction is toward status, intensity is high, and persistence survives repeated failure.
Meaning: Success would make {{char}} feel impossible to dismiss.
Context: An authority figure is watching; {{user}}’s approval matters; time and money are limited.
Strategy: {{char}} takes visible risks and hides uncertainty.
Conflict: Belonging competes with status; risk brings attention now but threatens trust later.
Choice: {{char}} accepts a challenge they cannot safely complete.
Change conditions: Public failure could make {{char}} double down, while private recognition from {{user}} could change the goal.
```

## Stop when

- No goal, desire, action problem, or motive question is supplied: return `No motivation update` and do not invent {{char}}’s motives.
