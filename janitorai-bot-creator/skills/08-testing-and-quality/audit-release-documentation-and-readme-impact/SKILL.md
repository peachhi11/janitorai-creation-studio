---
name: audit-release-documentation-and-readme-impact
description: Audit whether runtime, prompt, skill, configuration, security, workflow, and repository changes have matching user-facing documentation and verification notes.
---

# Audit Release Documentation and README Impact

Use this skill before handoff, commit, release, or pull request when a slice changes the Studio’s behavior or agent-facing library.

## Process

1. Inventory changed files and classify runtime, API, prompt, skill, configuration, security, workflow, and documentation impact.
2. Update the relevant README, skill index, API reference, architecture note, ADR, or release note.
3. Check links, commands, names, schemas, defaults, and examples against the environment and implementation.
4. Record verification commands, expected results, known failures, and unsupported assumptions.
5. Check that documentation does not claim persistence, safety, model behavior, or source support beyond evidence.
6. Return changed documentation, omissions, and release blockers.

## Completion

Stop when every user-facing change has a documentation disposition, links and contracts are verified, and known limitations are visible in the handoff.
