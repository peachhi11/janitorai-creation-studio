# ADR 0009: Keep standalone generation compatible with MCP generation

## Status

Accepted

## Context

The repository has two character-generation entry points. `creator.mjs` is a standalone compatibility adapter with an established character schema, while the MCP server uses the application-owned generation capability in `lib/character-generation.mjs`.

The paths cannot be compared field-for-field because their schemas and renderer ownership are intentionally different. They still need a shared behavioral contract so a caller receives a complete character, rendered markdown, and a scenario memo, with the narrative policy applied to both model requests.

## Decision

Keep the standalone schema and MCP schema separate. Make the standalone adapter dependency-injectable and protect parity at the result and policy boundaries with deterministic tests.

Parity means equivalent result semantics and shared narrative-policy coverage, not identical field names or identical prompt text.

## Consequences

- Legacy standalone callers keep their existing schema and exports.
- MCP callers keep the application-owned generation and rendering seam.
- Future schema changes must update the relevant path without silently breaking the other path.
- The parity test gives a fast, network-free signal when either path stops returning the expected contract.
