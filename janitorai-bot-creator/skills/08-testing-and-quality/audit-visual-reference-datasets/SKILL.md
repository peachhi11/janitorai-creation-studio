---
name: audit-visual-reference-datasets
description: Audit visual character-reference, portrait, face, or image-generation datasets for representation gaps, subject leakage, label uncertainty, class imbalance, spurious background cues, and misleading aggregate scores. Use when curating visual references, evaluating skin-tone coverage, comparing full-image and region-focused inputs, preparing train-validation-test splits, or checking whether a visual model learned the intended attribute. Do NOT infer protected or intimate traits from appearance, treat skin tone as identity, claim dataset fairness from aggregate counts alone, or use visual cues to dictate a fictional character's personality or desire.
---

## Narrative Intention and fictional genre logic

Treat the skill as a tool inside a chosen fictional genre, not a universal moral or psychological law. Dark, erotic, coercive, obsessive, tragic, comic, surreal, or unresolved material may be intentional. Preserve causal consequences, character specificity, truth-layer boundaries, and player sovereignty; do not turn a fictional pattern into diagnosis, a healthy-relationship lesson, or a real-world operational manual.

# Audit visual reference datasets

Do NOT use this skill to infer protected or intimate traits, identity, or fictional personality from appearance.

Determine whether the dataset supports the intended visual task without mistaking identity, scenery, lighting, camera style, or source collection for the target attribute. Read [visual-audit-method.md](references/visual-audit-method.md) when choosing splits, metrics, annotation rules, or shortcut tests.

**Action:** Define task, target, population, failure costs, provenance, labels,
splits, and shortcut tests.

**Key point:** Representation counts and model scores are evidence about a
dataset, not proof of fairness or identity.

**Why:** Separating target attributes from proxies prevents visual references
from smuggling unsupported social claims into character design.

## State the intended use

Define:

- the decision the dataset or model will support;
- the target attribute and whether it is categorical, ordinal, continuous, or descriptive;
- the relevant population, image conditions, and failure costs;
- whether the task concerns visual appearance, retrieval, generation, editing, or model evaluation;
- what the target must not be used to infer.

Do not treat skin tone as a proxy for race, ethnicity, nationality, culture, personality, health, or identity. Do not infer protected or intimate traits that the images and task do not establish.

## Inventory people and images separately

Count both unique subjects and images per class. A class with many photographs of a few people is not diverse. Record source dataset, subject identifier, label, lighting, camera or compression conditions, pose, occlusion, crop, background, and image quality where available.

Preserve provenance and permitted use. Do not silently combine collections with incompatible consent, licensing, annotation, or demographic assumptions.

## Design honest annotations

Provide a documented scale, several reference examples under varied conditions, and clear instructions. Allow annotators to select `uncertain` and `unusable` instead of forcing every image into a class.

Measure agreement and inspect class-specific confusion. Record whether labels apply to a person, one image under current lighting, a region, or an appearance estimate. Do not pretend a subjective visual label is immutable biological truth.

## Prevent identity and source leakage

Split by subject identity, not by image. Keep every image of one person in a single partition unless the test explicitly studies repeat recognition. Where several source datasets are merged, also test source-held-out performance.

Check whether class labels correlate with:

- background or location;
- clothing, hair, accessories, or makeup;
- dataset-specific crops, resolution, colour profile, or compression;
- lighting, camera, pose, or blur;
- repeated identities or near-duplicate images.

A random image-level split can produce impressive results by letting the model recognise a person or collection style rather than the intended attribute.

## Compare whole-image and focused inputs

Evaluate the model on both the ordinary input and an appropriately isolated region of interest when the task permits it. A score drop after removing the background may reveal that earlier performance relied on shortcuts.

Region extraction can introduce its own bias. Report segmentation or detection failures by target class and image condition. Do not discard failed cases before calculating coverage.

Use saliency or attribution visualisations as diagnostic clues, not proof of causal reasoning. Confirm suspected shortcuts with controlled crops, background swaps, occlusion tests, or source-held-out evaluation.

## Use metrics that expose the error

Report per-class support and confusion matrices, not accuracy alone. For ordinal labels, include distance-sensitive measures and within-one-class accuracy where appropriate, while retaining exact accuracy. Prefer macro-averaged results when class imbalance matters.

Always include a subject-held-out test. Report uncertainty and sample size. Inspect whether adjacent-class errors dominate or whether predictions jump across the scale. High within-one accuracy can coexist with poor exact classification or severe minority-class failure.

## Test real generalisation

Construct challenge sets that vary one nuisance factor at a time where possible: lighting, exposure, white balance, pose, occlusion, crop, background, makeup, camera, and source collection. Include unseen subjects and underrepresented classes.

Compare performance across these conditions and manually inspect errors. If a model fails on the intended population, do not repair the report by averaging it with easier cases.

## Protect creative use

Use an audit to improve reference coverage and visual reliability, not to dictate a character's identity or worth. Preserve variation within any labelled group. Do not make all characters on one part of a visual scale share facial structure, culture, styling, personality, speech, or narrative role.

When generating or editing character art, compare against the author's stated visual canon. Never use a classifier score to overrule the user's character description or to “correct” an individual person's appearance.

## Deliver the audit

Return:

- intended use and prohibited inferences;
- provenance and rights summary;
- subject and image distributions;
- annotation scale, uncertainty, and agreement;
- split design and leakage checks;
- per-class, macro, ordinal, and challenge-set results as relevant;
- shortcut-learning evidence and controlled tests;
- segmentation or detection coverage;
- limitations and specific curation actions.

Keep findings readable to creators as well as technical reviewers. Explain what each metric means and why it changes the decision.
