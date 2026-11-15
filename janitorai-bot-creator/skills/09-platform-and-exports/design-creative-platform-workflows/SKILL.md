---
name: design-creative-platform-workflows
description: Use when designing reusable workflows for long-form fiction, character projects, story bibles, codices, prompt libraries, scene pipelines, revision passes, snippets, lifecycle states, context routing, or approval gates. Trigger phrases include “design the writing workflow,” “organise the story project,” and “add a review gate.”
---

## Steps

1. Define project goal, users, source-of-truth files, platform, collaborators, and approval boundaries.
2. Map intake, canon, planning, drafting, roleplay, revision, export, archive, and recovery states.
3. Assign each artifact an owner, format, version, lifecycle, privacy level, and next consumer.
4. Define context routing for character, lore, scene, history, tools, and current input.
5. Add human review gates before destructive edits, canon changes, publication, or export.
6. Preserve drafts, provenance, player-owned choices, unresolved questions, and rollback paths.
7. Test a normal project, long project, conflict, import, export, failure, and recovery path.

## Decision rules

- Yes: Does the workflow have no source of truth? Name one. No: continue.
- Yes: Can a step overwrite or publish without approval? Add a gate and recovery path. No: continue.
- Yes: Does a platform assumption make the workflow non-portable? Mark it. No: continue.
- Yes: Does context routing drop {{char}}’s canon or {{user}}’s choices? Preserve or explicitly defer them. No: continue.

## Output

- Format: `Creative platform workflow`
- Goal: state project, users, platform, source of truth, and approval boundaries.
- Flow: list states, artifacts, owners, formats, lifecycle, and transitions.
- Routing: list context inputs, priorities, and privacy boundaries.
- Tests: list normal, long, import, export, failure, and recovery cases.

## Stop when

- No project, platform, or workflow problem is supplied: return `No platform-workflow update` and do not apply changes.
