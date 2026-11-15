---
name: map-pursue-withdraw-cycles
description: Use for text-based roleplay when {{char}} and {{user}} repeat a pursue–withdraw, protest–retreat, rescue–resistance, or reassurance–doubt cycle. Trigger phrases include “map their repeating conflict,” “why does {{char}} pursue,” “why does {{user}} withdraw,” and “find the interruption point.”
---

## Steps

1. Record the cue or unmet need.
2. Record {{char}} and {{user}}’s interpretations.
3. Record the first move and its intended purpose.
4. Record how the other person reads that move.
5. Record the counter-move, escalation, or silence.
6. Record where the original need becomes hidden behind strategy.
7. Record short-term relief and relational cost.
8. Record interruption, repair, failed repair, or delayed residue.
9. Decide whether pursuit is a request that can be refused or a control pattern that narrows options.
10. Track power, coercion, abuse, incompatibility, surveillance, threats, dependency, isolation, reputation damage, and retaliation.
11. Find the smallest interruption that can alter the next turn.
12. Track changed behavior over time instead of treating one good conversation as transformation.

## Decision rules

- Yes: Does each move make sense from the person’s private prediction? Record that meaning. No: identify the unsupported move.
- Yes: Is the cycle reciprocal? Check power, refusal, options, and retaliation first. No: describe the constrained response.
- Yes: Is pursuit a request that can be refused? Keep it distinct from control. No: label the narrowed choice set.
- Yes: Can a clear request, boundary, timed pause, truthful naming, changed consequence, outside pressure, or decision to leave interrupt the loop? Use the smallest supported change. No: preserve the cycle.
- Yes: Does the repair change later behavior? Record it over time. No: mark the repair as temporary or failed.
- Yes: Does the description decide {{user}}’s reaction, feelings, speech, or choice? Remove that decision. No: continue.
- Yes: Is the cycle being used to diagnose attachment or force a healthy outcome? Remove that use. No: continue.

## Output

- Format: `Pursue and withdraw cycle record`
- Trigger: state cue or unmet need.
- {{char}}: list meaning, move, hidden need, payoff, and cost.
- {{user}}: list meaning, move, hidden need, payoff, and cost without inventing their interiority.
- Escalation: list counter-move, silence, power, coercion, options, and constrained response.
- Interruption: list the smallest change that could alter the next turn.
- Residue: list repair, failed repair, changed behavior, and delayed consequences.

```text
Pursue and withdraw cycle record
Trigger: {{char}} experiences a delayed reply as possible abandonment.
{{char}}: Sends repeated practical questions to regain contact; short-term relief is information; cost is pressure on {{user}}.
{{user}}: The next response remains open; the observable option is to answer, pause, set a boundary, or leave.
Escalation: If {{char}} treats silence as proof and increases monitoring, the cycle becomes control rather than equal pursuit.
Interruption: A clear request and a stated return time could change the next turn.
Residue: One pause does not transform the pattern; later behavior must show whether the interruption holds.
```

## Stop when

- No repeating relationship conflict, pursuit, withdrawal, reassurance, resistance, or escalation pattern is supplied: return `No pursue-and-withdraw update` and do not invent {{user}}’s reaction.
