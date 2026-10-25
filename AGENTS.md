# Agent contribution rules

## Documentation format

Use the repository documentation structure defined in `README.md` and `janitorai-bot-creator/docs/`.

Read `workflows/agent-change.md` for the default change lifecycle. Read `janitorai-bot-creator/CONTEXT.md` for domain terms and invariants; read `janitorai-bot-creator/docs/architecture.md` for implementation boundaries.

Continue autonomously through the complete requested slice. Do not stop at an intermediate milestone or ask the user to say “continue.” Stop only when the slice is complete, a genuine user decision or direction is required, or an external blocker prevents safe progress after available alternatives have been checked.

### README files

Keep the root README task-oriented and scannable. Use this section order unless the project has a documented reason to differ:

1. Title and one-line purpose
2. Quick start
3. Features
4. Configuration
5. Documentation links
6. Architecture
7. Verification
8. Contributing
9. License

Put detailed API behavior, architecture decisions, and long creative guidance in linked documents rather than expanding the README into a catch-all file.

Before committing, assess README impact. Changes to user-facing behavior, setup, configuration, CI, supported runtimes, security expectations, repository conventions, or available features require a README update in the same slice; otherwise record why no README update is needed.

### API documentation

Document each HTTP endpoint or MCP capability under a clear heading. State its purpose, inputs or parameters, response or result shape, errors, and one concise example when an example makes the contract clearer. Keep API names and payload terminology identical to the implementation.

### Architecture decision records

Use `janitorai-bot-creator/docs/adr/` for durable architecture decisions. Each record must contain `Status`, `Context`, `Decision`, and `Consequences`, and must explain the boundary being protected and the trade-offs accepted.

### AI-friendly documentation

Use clear H1-H3 headings, short paragraphs, tables for repeated fields, fenced JSON or YAML for structured data, and Mermaid diagrams only when they materially clarify a flow or relationship. Prefer progressive detail: working instructions first, then reference material.

### Code comments

Comment why a non-obvious rule exists, especially for security boundaries, persistence behavior, retrieval limits, or protocol contracts. Do not add comments that merely restate self-explanatory code.

## Code and verification rules

- Preserve public MCP tool names and payload intent unless the change explicitly updates the contract and its documentation.
- Keep transport, application, generation, storage, and reference concerns behind their existing seams.
- Add or update focused tests for changed behavior.
- Run `npm test` from `janitorai-bot-creator/` before committing.
- Run `git diff --check` before committing.
- Do not claim a change is complete until the relevant tests and documentation links have been verified.

## Git safety

This repository uses an agent-agnostic safety classifier at `scripts/block-dangerous-git.sh`. Before executing a Git command supplied by an agent or automation, pass the command as JSON on standard input to this classifier. A return code of `2` is an explicit denial; do not retry the command by changing its spelling or bypassing the classifier. Use reversible alternatives such as a branch, stash, revert, or explicit file-level edit when a command is denied.

For routine Git operations, use `scripts/git-safe <subcommand> [options]`. It validates the command before executing Git directly without a shell. The classifier and wrapper are repository-local conventions available to any agent, not host-specific Claude configuration.

After a successful commit, the final response must include a `Next steps` addendum with exactly three ranked, concrete options for continued work. Rank the recommended option first and include the expected scope or trade-off for each. Do not stop merely because the commit succeeded; complete the requested slice first, then provide the addendum.
