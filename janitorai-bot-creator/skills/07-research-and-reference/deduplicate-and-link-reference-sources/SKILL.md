---
name: deduplicate-and-link-reference-sources
description: Deduplicate a research or reference library using content hashes, normalised metadata, and reviewed similarity while preserving originals, provenance, and citation links. Use when batches contain renamed copies, split downloads, OCR derivatives, browser shells, revised editions, or repeated excerpts. Do NOT use to delete sources solely from filenames or similarity scores, merge distinct editions without recording the relationship, or expose private absolute paths in reports or commits.
---

# Deduplicate and link reference sources

Separate exact identity, derivative relationship, and conceptual overlap. They
require different actions.

**Action:** Hash originals, normalise comparison metadata, group exact matches,
review near matches, link derivatives and editions, then archive or exclude only
with a reversible record.

**Key point:** Duplicate content can share one canonical record; overlapping
ideas still need separate evidence and synthesis review.

**Why:** Content-based deduplication reduces clutter without erasing editions,
translations, annotations, OCR corrections, or distinct arguments.

## Build identity records

For each file, record:

- source ID independent of its filename or local path;
- cryptographic content hash of the untouched bytes;
- size, page count, format, title/creator/date metadata, and readable-text hash
  where useful;
- origin batch, derivative status, and access or publication restrictions.

Hash the original bytes before extraction, OCR, renaming, or normalisation. Keep
private local paths out of shareable reports.

## Classify relationships

- **Exact duplicate:** identical bytes; keep one canonical record and link all
  intake appearances.
- **Content duplicate:** different bytes with the same substantive document,
  such as a rewrapped PDF; compare text, pages, metadata, and completeness.
- **Derivative:** OCR, translation, excerpt, annotation, or export of a source;
  retain the parent-child link and quality limits.
- **Edition or revision:** related but potentially changed; keep separate and
  record date and scope.
- **Conceptual overlap:** shared ideas with distinct evidence; do not deduplicate.

Use similarity to propose candidates, never to make the final identity decision.
Manually review changed pages, missing sections, tables, citations, and rights
or provenance before collapsing records.

## Preserve and report

Do not destroy originals as part of routine deduplication. Prefer a reversible
archive or a manifest that names the canonical record, duplicate relation,
reason, reviewer, and date. Update citation links so a synthesis points to the
canonical source while preserving the intake history.

## Deliverable

Return a deduplication manifest, canonical-source map, derivative and edition
links, unresolved near-duplicate queue, and privacy-safe audit summary.

## Narrative Intention and fictional genre logic

Treat the skill as a tool inside a chosen fictional genre, not a universal moral or psychological law. Preserve the setting's internal rules, causal consequences, knowledge boundaries, and player sovereignty. Do not turn fictional darkness, eroticism, coercion, obsession, tragedy, comedy, surrealism, or meta-fiction into a real-world manual or an automatic healthy outcome.
