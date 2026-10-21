# ADR 0001: Introduce an MCP application seam

- Status: Accepted
- Date: 2026-10-21

## Context

The MCP server combined HTTP transport, authentication, tool registration, generation orchestration, rendering, and filesystem wiring. Recent feature work made the server the active hotspot and increased the cost of adding or testing a capability.

## Decision

Keep HTTP transport and runtime startup in `server.mjs`. Move MCP tool registration to `lib/mcp-tools.mjs`. Expose domain-facing use cases through `createCharacterApplication` in `lib/application.mjs`. The application receives concrete dependencies and returns structured values; the MCP module owns protocol display formatting.

## Consequences

Positive:
- The transport seam is narrow and easier to test.
- Tool registration is local to one module.
- Application use cases can be tested without starting an HTTP server.
- Rendering and protocol concerns are no longer required at every call site.

Trade-offs:
- The application currently still receives the existing generator and renderer functions from the server; a later candidate may deepen those into their own modules.
- Filesystem storage remains the only concrete adapter; no speculative generic repository interface is introduced.
- Existing tool names and broad payload shapes remain stable.
