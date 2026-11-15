---
name: translate-dependency-and-boundaries
description: Use for fictional text-based roleplay when {{char}} confuses being needed with being loved, over-functions, retreats from intimacy, hides needs, or needs boundaries that remain dramatic rather than therapeutic. Trigger phrases include “map {{char}}’s dependency,” “what does {{char}} give up,” “show the hidden contract,” and “write the boundary conflict.”
---

## Steps

1. Record what {{char}} believes connection requires.
2. Record what {{char}} gives, monitors, fixes, hides, tolerates, or demands.
3. Record what {{char}} needs but cannot ask for directly.
4. Record the boundary {{char}} states, keeps, or fears enforcing.
5. Record immediate reward such as safety, usefulness, closeness, control, relief, or certainty.
6. Record delayed cost such as resentment, exhaustion, debt, lost self, exposure, loneliness, or retaliation.
7. Record how {{user}} benefits, resists, exploits, misunderstands, or reciprocates without inventing their interiority.
8. Distinguish compromise, self-erasure, privacy, emotional absence, support, rescue, and mutual reliance.
9. Show the pattern through choices, dialogue, omissions, logistics, sex, money, time, and aftermath.
10. Record the moment {{char}} chooses a different response.

## Decision rules

- Yes: Is caretaking, need, privacy, compromise, or dependence being labeled automatically unhealthy? Remove that assumption. No: continue.
- Yes: Can {{char}} be loving and controlling, generous and resentful, or dependent and powerful? Preserve the contradiction. No: use the supported pattern.
- Yes: Is one body cue being used as proof of shame, need, or consent? Remove that inference. No: continue.
- Yes: Does support become making one person responsible for another’s feelings? Record the boundary and cost. No: continue.
- Yes: Is {{char}} being forced to confess, heal, become independent, or reconcile? Remove the forced outcome. No: continue.
- Yes: Does the description decide {{user}}’s feelings, attraction, consent, speech, action, or choice? Remove that decision. No: continue.

## Output

- Format: `Dependency and boundaries record`
- Exchange: list what {{char}} gives, monitors, fixes, hides, tolerates, demands, and needs.
- Contract: state the hidden expectation between {{char}} and {{user}}.
- Boundary: list stated, kept, broken, feared, and enforceable limits.
- Reward and cost: list immediate benefit and delayed consequence.
- Behavior: show choices, dialogue, omissions, logistics, sex, money, time, and aftermath.
- Choice point: state the different response {{char}} could choose and what it risks.

```text
Dependency and boundaries record
Exchange: {{char}} plans everything, offers care, and monitors {{user}}’s mood; {{char}} needs reassurance but asks through practical help.
Contract: “If I remain useful, you will not leave.” Neither person has said it aloud.
Boundary: {{char}} says they need one evening alone but keeps answering messages; the feared consequence is being forgotten.
Reward and cost: Closeness and control now; exhaustion and resentment later.
Behavior: A missed meal, a paid bill, a joke, and a delayed request expose the pattern.
Choice point: {{char}} can state the need directly and risk hearing no.
```

## Stop when

- No dependency, caretaking, hidden contract, boundary, need, or relationship exchange is supplied: return `No dependency and boundaries update` and do not invent {{user}}’s feelings or choice.
