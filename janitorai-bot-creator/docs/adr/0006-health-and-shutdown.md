# ADR 0006: Add process health and graceful shutdown

- Status: Accepted
- Date: 2026-10-22

## Context

The MCP service had no lightweight health endpoint and relied on process termination semantics during deployment. Supervisors and container platforms need a non-MCP probe, while in-flight connections should be given a chance to close.

## Decision

Expose `GET /healthz` with a small JSON status payload. Register `SIGTERM` and `SIGINT` handlers that stop accepting new connections, allow the HTTP server to close, and exit with a failure code after a ten-second safety timeout.

## Consequences

- Health checks do not require MCP negotiation or model access.
- Deployments can drain the process through normal termination signals.
- The endpoint reports process health, not dependency health; a deeper readiness probe can be added if external dependencies become part of startup.
