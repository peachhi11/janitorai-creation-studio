---
name: triage-ocr-and-readable-sources
description: Use when triaging PDFs or reference files for readable text, OCR need, extraction quality, provenance, and safe downstream use. Trigger phrases include “check whether this PDF needs OCR,” “make the source searchable,” and “audit the extracted text.”
---

## Steps

1. Inventory file type, size, pages, source, date, version, privacy, and expected content.
2. Test whether text is selectable, searchable, complete, ordered, duplicated, garbled, or only a browser shell.
3. Compare extracted text with sampled page images and record missing layout, tables, symbols, footnotes, and languages.
4. Decide whether no OCR, targeted OCR, or full OCR is needed.
5. Preserve the original and create a clearly named derived output.
6. Record OCR engine, language, settings, pages, confidence, errors, and manual corrections.
7. Mark uncertain or missing text instead of guessing or silently filling it.
8. Separate OCR output from verified transcription and cite the original page for claims.
9. Keep private paths and metadata out of published reports.

## Decision rules

- Yes: Is readable text already complete and ordered? Do not OCR it. No: continue.
- Yes: Is the file image-only, garbled, duplicated, or incomplete? OCR the affected pages or file. No: continue.
- Yes: Is OCR output being treated as exact transcription? Mark confidence and verify samples. No: continue.
- Yes: Would a correction alter a claim? Record the correction and page source. No: continue.
- Yes: Is the original at risk of overwrite? Stop and create a derived output. No: continue.

## Output

- Format: `OCR triage report`
- File: list type, pages, source, privacy, and readability status.
- Decision: state no OCR, targeted OCR, or full OCR and why.
- Quality: list samples, missing content, confidence, errors, settings, and corrections.
- Provenance: link derived text to original pages and state what remains unverified.

## Stop when

- No reference file or OCR question is supplied: return `No OCR update` and do not alter the original.
