# Evaluation evidence and cautions

## Evidence map

### Persona Vectors

Supports cautious, model-internal monitoring and intervention for specified prompt-inducible behaviours. In the reported experiments, activation projections tracked conspicuous prompting and fine-tuning shifts, while within-condition discrimination was more modest. Large steering coefficients could harm general capability. The work covers two mid-sized chat models and a limited trait set, with automated single-turn evaluation.

Use it to justify model-specific calibration, causal tests, behavioural regression suites, and collateral-damage checks. Do not use it to reduce fictional personality to a linear vector or to make claims about people.

### StoryScope

Supports discourse-level evaluation dimensions and corpus comparisons. It reports a 61,608-story parallel corpus, 304 induced narrative features, prompt-grouped splits, 0.90 assignment repeatability, and 0.84 mean human-model agreement on a validation sample. Narrative features achieved 93.2% macro-F1 for that corpus's human/AI task and 68.4% for six-way source attribution.

The results are dataset- and model-bound. The human material came from Books3; prompts were inferred from those stories; feature induction and assignment used LLMs. Treat reported tendencies as aggregate observations, not individual proof or a universal quality hierarchy.

### Reasoning Jury

Supports independent first-pass review, addressable evidence, defect-specific rationales, and explicit consensus. On its reasoning benchmarks, pooling independent samples mainly improved recall; consolidation was more conservative and deliberation more expensive. Moderator choice mattered. The benchmark directly scored step localisation, not the truth of every explanation, severity calibration, or narrative quality.

Transfer the evaluation procedure, not its mathematics-specific scores. Never demand hidden chain-of-thought; use visible passages, turns, claims, or supplied rationale artefacts.

### Structured Knowledge Trees

Supports an authored-state definition of narrative error and separation of fact selection, dialogue generation, and verification. In one 33-person detective-game study, the structured condition reduced the response-level critical-hallucination ratio from 17.80% to 6.27% and prevented premature confession within the sessions. It also produced forced-reveal and interface-friction complaints.

The architecture, UI, alternate story conditions, and phase gates were evaluated together. Generalise the principles cautiously and test each component in the target experience.

## Minimum useful rubric

For each dimension define:

| Field         | Question                                 |
| ------------- | ---------------------------------------- |
| Construct     | What exactly is being judged?            |
| Unit          | What can a reviewer point to?            |
| Evidence      | What supports the finding?               |
| Anchors       | What do low, medium, and high look like? |
| Exceptions    | When is the apparent defect intentional? |
| Harm          | What intended experience does it damage? |
| Countermetric | What might improve while this worsens?   |

## Evaluation safeguards

- Blind source labels when they are not required for the judgement.
- Randomise presentation order where feasible.
- Keep prompt or scenario families within one split.
- Report per-group results as well as aggregates.
- Sample false positives and false negatives for human review.
- Separate detection, diagnosis, and recommended revision.
- Preserve dissent instead of forcing false certainty.
- Version the benchmark, rubric, prompts, models, and generation settings.
- Do not convert corpus correlations into aesthetic commandments.
