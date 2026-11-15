---
name: audit-persistence-and-revision-history
description: Audit character persistence, archival history, restore behavior, locks, atomic writes, malformed records, and deletion recovery.
---

# Audit Persistence and Revision History

Use this skill when changing the character store, revision flow, filesystem adapter, or recovery behavior.

## Process

1. Test create, replace, read, list, archive, restore, delete, and reopen behavior.
2. Check identifiers, traversal, symlinks, containment, malformed JSON, and untrusted roots.
3. Test concurrent writers, lock contention, stale locks, archive failure, current-write failure, and cleanup failure.
4. Verify revision identity, timestamps, field preservation, and history ordering.
5. Check that success and failure messages describe actual durability and recovery guarantees.
6. Record limitations around power loss, network filesystems, bypass writers, and multi-file transactions.

## Completion

Stop when every mutation path has a recovery result, every safety boundary has a test, and no documentation promises stronger durability than the adapter provides.
