---
name: prepare-text-corpora-for-analysis
description: Use when preparing, normalising, searching, segmenting, comparing, or deduplicating prose, dialogue, character cards, transcripts, or reference text for narrative analysis. Trigger phrases include “prepare the corpus,” “normalize the text,” and “compare these versions without losing dialect.”
---

## Steps

1. Inventory files, formats, encoding, language, source, version, and intended analysis.
2. Preserve originals and create a reversible working copy.
3. Define normalization for whitespace, punctuation, case, Unicode, markup, speaker labels, and OCR noise.
4. Preserve dialect, spelling, idiolect, code-switching, meaningful punctuation, and authored variation in the source layer.
5. Choose tokenisation, sentence splitting, segmentation, regex, fuzzy matching, or frequency rules for the stated task.
6. Record every transformation, tool, version, parameter, exclusion, and error.
7. Validate samples before running the full corpus and review matches that could be semantically distinct.
8. Keep similarity scores as evidence for review, not proof of identity or meaning.

## Decision rules

- Yes: Would normalization erase voice, dialect, or authored variation? Keep it in the source layer and use a derived layer. No: continue.
- Yes: Is the transformation irreversible? Preserve the original and document the step. No: continue.
- Yes: Is a similarity score being treated as semantic identity? Send it to review. No: continue.
- Yes: Is the corpus scope or encoding unknown? Stop and record the uncertainty before analysis. No: continue.

## Output

- Format: `Text corpus preparation report`
- Inventory: list files, formats, versions, source, and scope.
- Pipeline: list reversible transformations, parameters, tools, and errors.
- Preservation: list dialect, idiolect, markup, and source-copy guarantees.
- Results: list segments, searches, matches, exclusions, and review queue.

## Stop when

- No corpus, text collection, or analysis goal is supplied: return `No corpus-preparation update` and do not alter source text.
