---
name: deduplicate-and-link-reference-sources
description: Use when deduplicating a fictional research library while preserving originals, provenance, editions, derivatives, and citation links. Trigger phrases include “deduplicate the sources,” “find renamed copies,” and “link the OCR derivative to the original.”
---

## Steps

1. Inventory files with stable identifiers, hashes, normalized metadata, format, size, date, and source location.
2. Group exact duplicates by content hash.
3. Group likely duplicates by normalized title, creator, edition, excerpt, OCR text, and reviewed similarity.
4. Distinguish originals, revised editions, excerpts, translations, OCR derivatives, browser shells, and renamed copies.
5. Preserve every original and record the relationship instead of deleting from a filename or score alone.
6. Choose a canonical reference only when identity, version, and intended use are clear.
7. Link citations and downstream notes to the canonical item while retaining alternate provenance.
8. Keep private absolute paths out of reports and commits.

## Decision rules

- Yes: Do hashes match? Mark exact duplicate and retain one canonical link. No: continue.
- Yes: Are items similar but from different editions, translations, or excerpts? Keep them distinct and link the relationship. No: continue.
- Yes: Is identity uncertain? Mark for review; do not merge. No: continue.
- Yes: Does deduplication require deleting an original? Preserve it unless deletion is explicitly requested. No: continue.

## Output

- Format: `Reference deduplication report`
- Inventory: list stable ID, type, version, provenance, and hash.
- Groups: list exact duplicates, likely matches, distinct editions, derivatives, and unresolved pairs.
- Canonical links: state selected canonical item and retained alternates.
- Privacy: confirm that reports contain no private absolute paths.

## Stop when

- No reference collection or duplicate question is supplied: return `No deduplication update` and do not change files.
