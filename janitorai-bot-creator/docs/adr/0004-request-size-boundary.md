# ADR 0004: Bound inbound MCP request sizes

- Status: Accepted
- Date: 2026-10-22

## Context

The MCP endpoint accepted requests without an explicit application-level size policy. The transport SDK handles protocol parsing, but deployment configuration still needs a clear limit before a request is handed to the MCP server.

## Decision

Expose `MAX_REQUEST_BYTES` through the runtime configuration seam, defaulting to 1 MiB and refusing values above 50 MiB. Reject malformed `Content-Length` values with 400 and declared bodies over the limit with 413 before creating an MCP transport.

## Consequences

- Oversized declared requests fail predictably and do not reach model generation.
- The limit is testable without starting the HTTP server.
- Chunked requests remain governed by the HTTP server and MCP SDK streaming behaviour; a future streaming limiter can deepen this seam if untrusted chunked clients become a deployment concern.
