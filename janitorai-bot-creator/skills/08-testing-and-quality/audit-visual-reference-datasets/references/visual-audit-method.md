# Visual dataset audit method

## Minimum evidence table

| Question                               | Evidence                                                          |
| -------------------------------------- | ----------------------------------------------------------------- |
| Who is represented?                    | Unique subjects per class, not only image totals.                 |
| Under what conditions?                 | Lighting, pose, crop, occlusion, camera, compression, and source. |
| How was the label assigned?            | Scale, references, instructions, uncertainty option, agreement.   |
| Can identity leak?                     | Subject-disjoint splits and near-duplicate checks.                |
| Can source leak?                       | Source distributions and source-held-out tests.                   |
| Did the model look in the right place? | Focused-input comparison plus controlled shortcut tests.          |
| Who bears the errors?                  | Per-class support, recall, confusion, and challenge-set results.  |
| May the result generalise?             | Explicit population and condition boundaries.                     |

## Split hierarchy

Prefer the strongest split the intended claim requires:

1. **Image-disjoint:** prevents exact-image reuse but not identity leakage.
2. **Subject-disjoint:** all images of one person stay together.
3. **Source-disjoint:** a complete contributing collection is held out.
4. **Condition-disjoint:** a camera, lighting regime, location, or capture style is held out.
5. **Population challenge set:** the intended underrepresented or difficult cases are deliberately sampled.

Use subject-disjoint as the minimum for claims about unseen people. Report when this is impossible.

## Annotation controls

- Define whether the label is categorical, ordered, or continuous.
- Show multiple reference examples rather than one idealised swatch or face.
- Include varied lighting and pose in the guidance.
- Offer `uncertain` and `unusable` responses.
- Preserve every annotator's label before adjudication.
- Report agreement overall and by class.
- Revisit boundary classes with the highest disagreement.
- Do not assign one permanent appearance label to every image of a person without explaining that choice and testing its consequences.

## Metric selection

For any classification task, report a confusion matrix and per-class support. Add:

- exact accuracy for overall correctness;
- macro recall or balanced accuracy for equal class weighting;
- mean absolute error for ordered distance;
- within-one accuracy only as a supplementary tolerance measure;
- calibration when confidence will drive acceptance or rejection;
- coverage when the pipeline can return `uncertain`, `unusable`, or no detection.

An ordinal scale does not justify hiding large errors inside a generous tolerance score.

## Shortcut tests

Use at least two when shortcut learning is plausible:

- crop to the target region;
- mask or replace the background;
- shuffle backgrounds between classes;
- equalise source resolution or compression;
- hold out identities and source datasets;
- stratify by lighting, pose, and camera;
- compare attribution maps, then verify the hypothesis through intervention;
- train a simple baseline on metadata or backgrounds alone.

If the simple or confounded baseline performs strongly, investigate before celebrating the main model.

## Skin-tone-specific boundary

The Monk Skin Tone scale is an ordered visual reference, not a measure of ethnicity, race, health, or character. Illumination, white balance, redness, tanning, makeup, camera response, and anatomical region affect observed colour. State whether labels describe a person-level reference class or the appearance in one image.

The motivating study reported strong ordinary test results but poor performance on a small unseen-person challenge set, and found that a full-image CNN attended to background and identity cues. Treat this as a demonstration of why split design and shortcut tests matter, not as a universal performance benchmark.
