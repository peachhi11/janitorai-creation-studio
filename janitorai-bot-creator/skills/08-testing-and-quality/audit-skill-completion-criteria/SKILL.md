---
name: audit-skill-completion-criteria
description: Check whether every skill has observable, exhaustive completion criteria that prevent premature stopping and incomplete handoffs.
---

# Audit Skill Completion Criteria

Use this skill when reviewing a skill document or when an agent repeatedly stops after producing a partial artifact.

## Process

1. List every ordered action and the artifact it must produce.
2. Write a condition that distinguishes complete from merely attempted.
3. Include exhaustive bounds: every field, source, conflict, branch, validation, or handoff that must be covered.
4. Check that completion does not depend on vague understanding or stylistic satisfaction.
5. Confirm that later steps cannot be mistaken for evidence that the current step is finished.
6. Test the criterion against an intentionally partial output.

## Completion

Stop when every step has a checkable criterion, the final criterion covers all required branches, and a partial artifact fails visibly rather than passing by implication.
