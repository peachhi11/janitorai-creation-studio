# ADR 0005: Add a configurable in-memory MCP rate limit

- Status: Accepted
- Date: 2026-10-22

## Context

Each MCP request can invoke model-backed generation. Without a request-rate policy, a local client or accidental retry loop can create an avoidable burst of expensive work.

## Decision

Add a small in-memory fixed-window limiter keyed by the connecting IP address. Defaults are 60 requests per 60 seconds and are configurable through `MCP_RATE_LIMIT` and `MCP_RATE_WINDOW_MS`. Rejected requests receive HTTP 429 and a `Retry-After` header.

## Consequences

- Bursty callers receive a deterministic back-pressure response.
- The limiter is isolated, deterministic, and unit-testable.
- State is process-local; multi-instance deployments must use an edge proxy or shared store for a global limit.
- IP identity may be obscured by proxies unless deployment forwarding rules are configured deliberately.
