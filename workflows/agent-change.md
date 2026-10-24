# Agent change workflow

## Trigger

Use this workflow for any agent-initiated repository change that modifies code, tests, documentation, configuration, or Git state.

## Inputs

- The user’s requested outcome.
- `AGENTS.md` and the relevant `CONTEXT.md`.
- Existing architecture decisions and nearby tests.
- The current Git status and branch.

## Actions

1. Classify the request and choose the narrowest applicable specialist workflow.
2. Re-state the intended outcome and identify the public seam that will change.
3. Inspect the relevant code, tests, documentation, and recent history before editing.
4. For behavior changes, write one focused failing test before production code.
5. Make the smallest change that makes the test pass.
6. Update domain terms, API documentation, and ADRs only when the change resolves a durable concept or boundary.
7. Run targeted checks, then the complete test suite and `git diff --check`.
8. Review the diff for scope, public contract changes, and documentation links.
9. Before any destructive or history-rewriting Git command, run `scripts/block-dangerous-git.sh` and stop on exit code `2`.
10. Present a decision-ready completion report with changed files, verification, open risks, and commit state.

## Completion criteria

- The requested behavior is implemented or the blocker is explicit.
- Tests cover the changed public behavior.
- The full test suite passes.
- `git diff --check` passes.
- No conflict markers or untracked generated artifacts remain unintentionally.
- Documentation links resolve to existing repository files.
- Git status and commit state are reported accurately.
