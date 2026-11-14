# ADR 0008: Enforce the fictional narrative lens at generation time

- Status: Accepted
- Date: 2026-10-22

## Context

The repository README and creator prompt described an unsanitised fictional-writing standard, but the MCP server's runtime system prompt did not explicitly carry that rule. Documentation-only guardrails could therefore drift during generation.

## Decision

Centralise the fictional narrative lens in `lib/narrative-lens.mjs` and prepend it to the MCP generation system prompt. The lens preserves intentional darkness and moral ambiguity without inferring the author's beliefs, while leaving genuinely applicable platform constraints in force.

## Consequences

- Runtime generation now receives the same anti-moralising standard as the authoring documentation.
- The rule is unit-testable and independently reviewable.
- The standalone creator continues to use its existing creator prompt, which already states the same lens; future consolidation can make both entrypoints import the shared constant.
