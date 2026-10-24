# Retrospective: architecture and agent workflow work

## What happened

The repository began with a server hotspot and documentation spread across a large README. Two architecture passes separated generation/rendering and reference indexing, then the documentation-template pass split operational, API, architecture, and creative guidance into linked documents.

The pre-commit setup initially assumed the package was the Git root. Husky initialization failed from the nested package, and lint-staged failed when invoked from the repository root because the installed binaries lived in the package directory. The final setup keeps the hook at the repository root and changes into `janitorai-bot-creator/` before invoking package-local tools.

## What worked

- Existing application and MCP seams provided stable boundaries for both architecture extractions.
- Real MCP-over-HTTP tests caught integration behavior that unit tests alone would not cover.
- The documentation skill produced a clearer README and dedicated reference documents.
- Test-first safety coverage caught both a missing guard implementation and an incorrect test assumption before completion.

## Improvements now encoded

- `AGENTS.md` points agents to the domain glossary, architecture document, and repeatable change workflow.
- `workflows/agent-change.md` makes the lifecycle and completion criteria explicit.
- `scripts/block-dangerous-git.sh` and `scripts/classify_git_command.py` provide an agent-agnostic destructive-Git denial seam.
- `.husky/pre-commit` runs staged formatting and the full test suite from the correct package directory.
- `CONTEXT.md` is now glossary and invariant material; implementation architecture lives in `docs/architecture.md`.

## Open follow-up

The package audit reported dependency vulnerabilities during installation. They were not changed as part of this workflow; a separate dependency-audit task should inspect the advisories, compatibility, and upgrade path before applying fixes.
