---
name: audit-relational-pattern-continuity
description: Use when auditing fictional attachment, dependency, boundaries, pursue-withdraw cycles, closeness, distance, or relationship change across scenes and roleplay turns. Trigger phrases include “check the relationship continuity,” “why did they pull away?”, and “show the pattern instead of a label.”
---

## Steps

1. List the relationship’s history, current state, wants, fears, boundaries, dependencies, resources, and risks.
2. Trace each change through cue → interpretation → feeling or need → action → response → consequence.
3. Separate attachment language, observed behaviour, character belief, narrator claim, and diagnosis.
4. Check whether closeness, distance, pursuit, withdrawal, repair, or rupture has a cause and residue.
5. Preserve asymmetry: {{char}} and {{user}} may read the same event differently.
6. Mark repeated patterns, exceptions, adaptations, failed repairs, and changed options.
7. Repair abrupt changes by adding evidence, time, pressure, choice, or an explicit break in pattern.
8. Do not replace toxic, coercive, unresolved, or dark fiction with a healthy outcome.
9. Keep {{user}}’s attachment, boundary, feeling, speech, and choice open.

## Decision rules

- Yes: Is a type label replacing evidence? Show the cue, interpretation, action, and consequence. No: continue.
- Yes: Does the relationship change without a cause or residue? Add one or mark it deliberate. No: continue.
- Yes: Is the audit diagnosing a partner or enforcing secure attachment? Describe fiction-specific behaviour instead. No: continue.
- Yes: Does the draft decide {{user}}’s feeling or response? Remove that decision. No: continue.

## Output

- Format: `Relational continuity audit`
- Baseline: list history, current state, wants, fears, boundaries, and risks.
- Pattern: trace cues, interpretations, actions, responses, and consequences.
- Findings: list supported changes, gaps, repetitions, exceptions, and asymmetries.
- Repairs: list added causes, evidence, time, pressure, or open ambiguity.

## Stop when

- No relationship continuity problem or scene sequence is supplied: return `No relational-continuity update` and do not invent {{user}}’s attachment.
