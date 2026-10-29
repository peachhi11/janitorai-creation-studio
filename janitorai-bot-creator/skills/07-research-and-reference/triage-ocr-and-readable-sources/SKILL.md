---
name: triage-ocr-and-readable-sources
description: Triage PDFs and other reference files for readable text, OCR need, extraction quality, provenance, and safe downstream use. Use when a source is image-only, browser-shell text, partially extractable, garbled, duplicated, or uncertain and must be made searchable without replacing the original. Do NOT use to silently overwrite originals, treat OCR output as exact transcription, infer missing content, or publish private paths and metadata.
---

# Triage OCR and readable sources

Treat readability as a source-status question, not a binary file property.

**Action:** Inspect the original, test extraction, classify the failure, OCR only
when justified, compare the result against the page image, and record residual
uncertainty before synthesis.

**Key point:** OCR creates a derived reading layer; it does not repair or replace
the source of record.

**Why:** Explicit status prevents blank PDFs, browser shells, hallucinated text,
and false confidence from entering the evidence base.

## Triage the original

Record:

- stable source identifier and original file hash;
- file type, page count, text layer presence, language, and scan quality;
- extraction result: readable, partial, garbled, image-only, browser shell,
  password-protected, corrupt, or unavailable;
- pages or sections affected and whether tables, footnotes, equations, or
  marginalia are important;
- privacy and publication restrictions.

Keep the untouched original. Never use a derived filename or path as the only
provenance.

## Choose the least lossy route

1. Extract the native text layer.
2. If it is incomplete or malformed, try a layout-aware extraction.
3. If the page is image-based, OCR a working copy with language and orientation
   settings appropriate to the document.
4. Inspect representative pages against the image, especially names, numbers,
   negations, tables, dialogue punctuation, and citations.
5. Mark uncertain spans rather than guessing.

Do not OCR a readable source merely to make it look uniform. Do not treat a
browser shell, abstract page, or search snippet as the full document.

## Record quality and limits

Store extraction method, tool/version, date, page range, confidence notes, and
known omissions. Keep native and OCR text separate. A source can be suitable for
keyword search but unsuitable for exact quotation or quantitative extraction.

Before synthesis, report whether claims came from a verified page, OCR-derived
text, metadata, or an unverified lead. Escalate unreadable high-value material
for a better copy rather than inventing a reconstruction.

## Deliverable

Return a readability table, derived-text inventory, OCR quality notes, uncertain
spans, privacy check, and a recommendation: usable, usable with limits, needs a
better copy, or exclude.

## Narrative Intention and fictional genre logic

Treat the skill as a tool inside a chosen fictional genre, not a universal moral or psychological law. Preserve the setting's internal rules, causal consequences, knowledge boundaries, and player sovereignty. Do not turn fictional darkness, eroticism, coercion, obsession, tragedy, comedy, surrealism, or meta-fiction into a real-world manual or an automatic healthy outcome.
