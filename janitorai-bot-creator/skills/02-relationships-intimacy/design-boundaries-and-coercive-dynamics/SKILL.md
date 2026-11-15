---
name: design-boundaries-and-coercive-dynamics
description: Use for fictional text-based roleplay when boundaries, negotiation, emotional blackmail, coercive control, unequal power, leverage, manipulation, or consent pressure need clear behavior and consequences. Trigger phrases include “map the boundary,” “show the coercion,” “what leverage does {{char}} have,” and “make the power dynamic concrete.”
---

## Steps

1. Record the stated, implied, hidden, or missing boundary.
2. Record requests, refusals, pressure, threats, guilt, punishment, monitoring, isolation, financial leverage, sexual leverage, and public exposure.
3. Record what each person knows and believes about the available choice.
4. Record exits, dependencies, witnesses, resources, and risks.
5. Record immediate compliance, resistance, avoidance, or negotiation.
6. Record retaliation, repair, changed access, and power shifts.
7. Record each character’s rationalization separately from the narrator’s evidence.
8. Distinguish persuasion, pressure, hurt, punishment, apology, repair, compromise, surrender, desire, and consent.
9. Keep cause, tactic, impact, and later consequence visible.

## Decision rules

- Yes: Is the boundary concrete about who may do what, when, and with what consequence? Use it. No: specify the limit and enforcement power.
- Yes: Does a tactic reduce another person’s meaningful choice? Label the pressure or coercion. No: keep it as persuasion or negotiation.
- Yes: Does intent erase impact? Preserve the impact. No: record both separately.
- Yes: Is hurt being treated as punishment, or apology as repair? Separate the terms. No: continue.
- Yes: Does communication advice make coercion symmetrical? Remove the symmetry. No: continue.
- Yes: Does the dynamic preserve its selected dark, erotic, toxic, or ambiguous genre? Keep the consequences visible. No: restore the intended power rules.
- Yes: Does the description decide {{user}}’s consent, feelings, speech, or choices? Remove that decision. No: continue.

## Output

- Format: `Boundary and coercive dynamics record`
- Boundary: state the limit, condition, and enforcement power.
- Leverage: list dependencies, resources, secrets, status, threats, monitoring, isolation, and exits.
- Knowledge: state what each person knows, believes, suspects, or misunderstands.
- Choice set: list available choices, risks, and what is removed by pressure.
- Tactic: state request, refusal, persuasion, pressure, punishment, retaliation, repair, or resistance.
- Consequences: list impact, power shifts, changed access, and unresolved danger.

```text
Boundary and coercive dynamics record
Boundary: {{user}} may refuse contact; {{char}} controls access to the shared account and knows refusal could cost {{user}} housing.
Leverage: Money, housing, a secret, and limited exits create pressure; a friend can provide temporary support.
Knowledge: {{char}} knows the dependency; {{user}} knows the request is not freely made; the friend does not know the full risk.
Choice set: Compliance, refusal, delay, outside help, or leaving; each has different costs.
Tactic: {{char}} calls the pressure a favor and threatens to withdraw access.
Consequences: The boundary is crossed, trust narrows, and the housing risk remains unresolved.
```

## Stop when

- No boundary, leverage, unequal power, manipulation, coercion, consent pressure, or relationship limit is supplied: return `No boundary dynamics update` and do not invent {{user}}’s consent or response.
