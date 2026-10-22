# ADR 0003: Centralise runtime configuration and authentication

- Status: Accepted
- Date: 2026-10-22

## Context

The HTTP server and standalone creator each read environment variables independently. Production token validation, model selection, host binding, port parsing, and storage-directory defaults were therefore implicit and difficult to test in isolation.

## Decision

Use `lib/runtime-config.mjs` as the runtime configuration seam. It validates numeric ports, applies development defaults, requires `MCP_API_TOKEN` in production, exposes storage directories and model selection, and owns bearer-token comparison. Server and creator code consume the validated configuration.

## Consequences

Positive:
- Startup invariants are explicit and unit-testable.
- Server and creator use the same model and environment semantics.
- Authentication comparison is centralised and timing-safe for equal-length tokens.
- Deployment configuration is visible as one module.

Trade-offs:
- TLS, rate limiting, and request-size limits remain deployment concerns for the next production-hardening pass.
- OpenAI client construction remains in each runtime entrypoint until a second AI adapter justifies a deeper seam.
