---
name: audit-visual-reference-datasets
description: Use when auditing fictional visual character-reference, portrait, face, or image-generation datasets for representation gaps, subject leakage, label uncertainty, imbalance, background shortcuts, or misleading aggregate scores. Trigger phrases include “audit the image dataset,” “check subject leakage,” and “test whether the model learned the intended visual attribute.”
---

## Steps

1. Define task, target attribute, population, image conditions, failure costs, provenance, and prohibited inferences.
2. Count unique subjects and images separately by class, source, label, lighting, pose, crop, background, and quality.
3. Record rights, consent, annotation scope, uncertainty, unusable cases, and label agreement.
4. Split by subject identity and test source-held-out performance where collections are merged.
5. Check leakage from identity, background, clothing, hair, makeup, crop, resolution, compression, lighting, pose, and source.
6. Compare whole-image and focused inputs; report segmentation or detection failures instead of discarding them.
7. Report per-class support, confusion, macro results, ordinal measures where relevant, uncertainty, and challenge-set results.
8. Do not infer protected or intimate traits, treat skin tone as identity, or use appearance to dictate {{char}}’s personality or desire.

## Decision rules

- Yes: Are repeated images of a few people counted as broad representation? Count subjects separately. No: continue.
- Yes: Are labels forced when uncertain or unusable is valid? Add those options. No: continue.
- Yes: Does an aggregate score hide minority or source failure? Report per-class and held-out results. No: continue.
- Yes: Is a protected, intimate, cultural, or personality trait inferred from appearance? Stop that inference. No: continue.

## Output

- Format: `Visual reference dataset audit`
- Use: state target, prohibited inferences, population, and failure costs.
- Data: report provenance, subjects, images, labels, uncertainty, rights, and splits.
- Leakage: report identity, source, background, condition, and shortcut tests.
- Results: report per-class metrics, uncertainty, challenge sets, failures, and curation actions.

## Stop when

- No visual dataset, reference set, or model task is supplied: return `No visual-dataset findings`.
