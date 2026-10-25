# Domain docs

This repository uses a multi-context documentation layout.

## Before exploring

1. Read `CONTEXT-MAP.md` at the repository root.
2. Identify the context relevant to the task.
3. Read that context’s `CONTEXT.md`.
4. Read system-wide ADRs under `docs/adr/`, if present.
5. Read context-specific ADRs under the relevant context’s `docs/adr/`.

If a referenced file does not exist, proceed without treating its absence as an error.

## Use the glossary vocabulary

When naming domain concepts in issues, refactor proposals, hypotheses, or tests, use the terminology defined by the relevant `CONTEXT.md`. If a needed concept is missing, record the gap rather than silently inventing a competing term.

## Flag ADR conflicts

If proposed work contradicts an existing ADR, identify the conflict explicitly rather than silently overriding the decision.
