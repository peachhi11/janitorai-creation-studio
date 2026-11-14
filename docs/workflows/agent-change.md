# Agent change workflow

## Trigger

Use this workflow for any agent-initiated repository change that modifies code, tests, documentation, configuration, or Git state.

## Inputs

- The user’s requested outcome.
- `AGENTS.md` and the relevant `CONTEXT.md`.
- Existing architecture decisions and nearby tests.
- The current Git status and branch.

## Mandatory preflight

Before editing, complete and record this short preflight:

1. Read `AGENTS.md`, this workflow, the relevant `CONTEXT.md`, the architecture document, and any nearby ADRs.
2. Run `git status --short --branch`, inspect the current branch and recent history, and identify unrelated work that must be preserved.
3. Name the public seam being changed and classify the change as code, test, documentation, configuration, runtime behaviour, security, or repository convention.
4. Mark README impact before making the edit. Prompt, generation-policy, output-framing, API, security, setup, and workflow changes are user-facing by default and require a same-slice README update.
5. State the focused verification to be added or updated, plus the full-suite command that will be run before commit.

## Actions

1. Classify the request and choose the narrowest applicable specialist workflow.
2. Re-state the intended outcome and identify the public seam that will change.
3. Inspect the relevant code, tests, documentation, and recent history before editing.
4. For behavior changes, write one focused failing test before production code.
5. Make the smallest change that makes the test pass.
6. Assess README impact before committing, then re-check it against the final diff. If the change affects user-facing behavior, setup, configuration, CI, supported runtimes, security expectations, repository conventions, or available features, update `README.md` in the same slice. If it does not, record that no README update is needed in the completion report.
7. Update domain terms, API documentation, and ADRs only when the change resolves a durable concept or boundary.
8. Run targeted checks, then the complete test suite and `git diff --check`.
9. Review the diff for scope, public contract changes, README accuracy, and documentation links.
10. Continue through the complete requested slice; do not stop at an intermediate milestone or ask the user to say “continue.” Stop only for a genuine decision, direction, or external blocker.
11. Use `scripts/git-safe <subcommand> [options]` for routine Git operations. Before any destructive or history-rewriting Git command, run `scripts/block-dangerous-git.sh` and stop on exit code `2`.
12. Present a decision-ready completion report with changed files, verification, open risks, README impact decision, and commit state.
13. After committing, append the ranked three-option `Next steps` addendum described below.

## Completion criteria

- The requested behavior is implemented or the blocker is explicit.
- Tests cover the changed public behavior.
- The full test suite passes.
- `git diff --check` passes.
- No conflict markers or untracked generated artifacts remain unintentionally.
- README impact is addressed: relevant user-facing documentation is updated, or the completion report records why no update is needed.
- Documentation links resolve to existing repository files.
- The preflight and final diff explicitly record the README-impact decision.
- Git status and commit state are reported accurately.

## Next steps addendum

After a successful commit, provide exactly three ranked options:

1. **Recommended: [concrete next slice]** — [scope, value, and trade-off].
2. **[concrete alternative]** — [scope, value, and trade-off].
3. **[concrete alternative]** — [scope, value, and trade-off].

The options must be grounded in the current repository state. Do not use generic suggestions such as “continue improving” or list work that is already complete. If no user decision is required, the agent should proceed with the recommended next slice in the same working session before delivering the addendum.
