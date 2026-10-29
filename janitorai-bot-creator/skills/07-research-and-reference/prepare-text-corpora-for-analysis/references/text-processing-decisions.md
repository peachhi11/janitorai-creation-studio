# Text-processing decisions

## Choose the representation

| Need                       | Useful representation                               | Main caution                                       |
| -------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| Exact lookup               | Original string or carefully bounded regex          | Case and Unicode variants may be missed.           |
| Patterned extraction       | Regex with tested groups and boundaries             | Regex identifies form, not implied meaning.        |
| Frequency counts           | Task-specific tokens or lemmas                      | The definition of a word changes the count.        |
| Voice or style analysis    | Surface wordforms, punctuation, case, disfluency    | Normalisation can erase the evidence.              |
| Cross-inflection search    | Lemmas                                              | Lemmas may collapse distinctions needed elsewhere. |
| Fast rough retrieval       | Stems                                               | Stemmers over- and under-generalise.               |
| Model context budgeting    | The target model's tokenizer                        | Subword tokens are not words.                      |
| OCR or spelling comparison | Weighted edit distance and alignment                | Surface similarity is not semantic identity.       |
| Near-duplicate review      | Layered normalisation plus metadata and human check | Aggressive cleanup can merge distinct works.       |

## Regex checklist

- Identify the regex engine and flags.
- Separate literal text from operators.
- Check case sensitivity and Unicode character classes.
- Use anchors for whole field or line matching.
- Use explicit word or non-letter boundaries when `\b` semantics are unsuitable.
- Group alternation so it applies to the intended span.
- Test zero-length, greedy, and catastrophic-backtracking cases.
- Keep labelled true matches, false positives, and false negatives.

Precision means the proportion of returned matches that are relevant. Recall means the proportion of relevant cases that were returned. Improving one may worsen the other.

## Normalisation decisions

### Case folding

Useful for broad retrieval, but it can merge names and ordinary words or distinctions such as `US` and `us`. Preserve original case and fold only in an analytical view.

### Lemmatisation and stemming

Lemmatisation maps inflected wordforms to a dictionary-like base form. Stemming uses cruder affix removal and may produce non-words. Use either only when variant collapse benefits the task, and retain the surface form.

### Sentence segmentation

Periods may mark abbreviations, numbers, ellipses, or sentence boundaries. Dialogue, initials, headings, and OCR damage create further ambiguity. Where scenes or speaker turns matter, keep those structural markers alongside sentence spans.

### Dialogue and linguistic variation

Fragments, fillers, punctuation, non-standard spelling, code-switching, dialect features, and emoji can carry timing, identity, stance, relationship, and character voice. Do not classify them as noise by default. Do not “correct” a language variety towards a prestige norm in the canonical text.

## Similarity decisions

Minimum edit distance counts the cheapest sequence of insertions, deletions, and substitutions needed to transform one sequence into another. Alignment shows where those operations occur. Weighting should reflect the error process:

- OCR: common glyph confusions and broken spacing;
- typing: adjacent keys and transpositions;
- filenames: punctuation, numbering, dates, and copy suffixes;
- source texts: paragraph order, headers, footers, and extraction artefacts.

Use thresholds as candidate generators, not final truth. Verify likely duplicates at the byte, text, structural, and provenance levels appropriate to the decision.

## Corpus statement

For a reusable corpus, record:

- why and by whom it was collected;
- source and rights information;
- time, situation, medium, and genre;
- languages and named varieties;
- sampling, filtering, OCR, and preprocessing;
- annotation instructions and reviewer context;
- representation gaps and known biases;
- permitted distribution and downstream use.

This documentation defines where an analysis may generalise and where it may not.
