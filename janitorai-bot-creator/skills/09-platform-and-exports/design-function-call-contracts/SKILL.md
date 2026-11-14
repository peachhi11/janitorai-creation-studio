---
name: design-function-call-contracts
description: Define safe, narrow tool schemas for retrieval, character generation, state updates, validation, and export.
---

# Design Function-Call Contracts

Use this skill when adding or revising an MCP or model-facing tool.

## Contract

Specify:

- purpose and authority;
- required and optional inputs;
- bounded strings, arrays, numbers, and identifiers;
- read versus mutation behavior;
- response shape and provenance;
- validation errors and retryable errors;
- idempotency and revision behavior;
- what the tool must not infer or mutate.

Keep transport, application, generation, storage, and reference concerns behind their existing seams. Prefer explicit structured results over prose that another tool must parse.

## Completion

Stop when valid, invalid, boundary, repeated, unauthorized, and failed calls each have an observable result and the public name and payload intent are documented.
