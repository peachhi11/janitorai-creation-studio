---
name: evaluate-ai-narrative-systems
description: Use when designing or running an evidence-grounded evaluation of AI fiction, roleplay, character behaviour, narrative reliability, model drift, or prompt interventions. Trigger phrases include “build a narrative benchmark,” “compare these models,” and “test whether the intervention helps without flattening voice.”
---

## Steps

1. State the decision, artefact, target population, claim, non-claim, and costs of false positives and negatives.
2. Separate continuity, character voice, plot causality, viewpoint, knowledge, player agency, model drift, and runtime cost into dimensions.
3. Define observable anchors, pass criteria, severity, confidence, and evidence requirements for each dimension.
4. Build ordinary, edge, adversarial, long-context, off-target, and multi-turn cases; freeze the evaluation set and record settings.
5. Use paired cases when context changes the correct behaviour and hold related characters or scenarios together in splits.
6. Collect exact units, evidence, impact, severity, confidence, and proposed test or revision.
7. Use blind independent review for consequential or subjective claims and record disagreement and dissent.
8. Compare interventions on target behaviour and protected qualities such as voice, agency, prose, capability, and creativity.
9. Report uncertainty and unresolved differences instead of claiming general performance from a small or unrepresentative sample.

## Decision rules

- Yes: Does one score combine quality, authorship, agency, and reliability? Split the dimensions. No: continue.
- Yes: Is a style signal being used to infer authorship? Reject that inference. No: continue.
- Yes: Is a score difference below the test’s resolution? Report unresolved and design a discriminating test. No: continue.
- Yes: Is a villainous or dark character being penalised for not being healthy? Score role fidelity separately. No: continue.
- Yes: Did an intervention improve one target while damaging a protected quality? Report the trade-off. No: continue.

## Output

- Format: `AI narrative evaluation report`
- Claim: state scope, non-claims, artefacts, population, and decision.
- Design: list dimensions, anchors, sample, splits, settings, paired cases, and reviewers.
- Results: report evidence, scores, uncertainty, disagreement, regressions, and limitations.
- Verdict: state supported claims, unresolved claims, and next test.

## Stop when

- No evaluation claim, artefact, model, prompt, or test set is supplied: return `No narrative-evaluation update` and do not invent results.
