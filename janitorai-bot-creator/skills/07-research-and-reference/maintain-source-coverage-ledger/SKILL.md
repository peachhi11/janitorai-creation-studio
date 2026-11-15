---
name: maintain-source-coverage-ledger
description: Track which gathered sources have been processed, what assets they contributed, where those assets live, and which claims remain unsupported.
---

# Maintain Source Coverage Ledger

Use this skill after source extraction, during research audits, or when deciding whether a new upload adds value.

## Ledger fields

```yaml
source:
  id: ""
  title: ""
  format: ""
  status: unprocessed | partial | extracted | reviewed | archived
  value: core | support | context | flagged | archive
  assets: []
  destinations: []
  claims_supported: []
  claims_unverified: []
  duplicates: []
  limitations: []
  next_action: ""
```

## Process

1. Compare the source against existing titles, hashes, concepts, and extracted assets.
2. Record genuinely new value rather than rewarding repetition.
3. Link each retained asset to its destination skill or document.
4. Record missing pages, inaccessible sources, conflicting claims, and unsupported statistics.
5. Review the ledger before declaring the corpus complete.

## Completion

Stop when every source has a status and value disposition, every retained asset has a destination, and every claimed completion gap is either closed or named.
