# Context

## Domain language
- **Character record:** a persisted JSON document representing a bot or portable persona.
- **Reference:** a local Markdown, text, JSON, or PDF source available for retrieval.
- **Visual model:** a constrained projection of character identity, appearance, outfit, palette, and notes.
- **Tool:** an MCP-facing operation exposed to clients.
- **Application:** the domain-facing module that orchestrates generation, rendering, persistence, retrieval, and visual edits.
- **Adapter:** a transport or storage implementation behind a seam.
- **Scoped file store:** the path-safe file module that owns containment checks, identifier validation helpers, and atomic JSON writes.

## Current architecture
- The HTTP server is a transport/configuration adapter.
- MCP tool registration is isolated in `lib/mcp-tools.mjs`.
- Application use cases are exposed through `createCharacterApplication` in `lib/application.mjs`.
- Generation schemas, model calls, shared generation policy, and character renderers are composed through `lib/character-generation.mjs`.
- Manifest loading, file discovery, format inference, and normalized reference descriptors are shared through `lib/reference-index.mjs`.
- Filesystem persistence and reference retrieval use `lib/file-store.mjs` for containment and atomic-write primitives.
- Filesystem remains the concrete storage adapter until a second implementation justifies a generic interface.

## Invariants
- Preserve the existing MCP tool names and payload intent.
- Keep generation and rendering behind the application seam; keep model and schema details out of the HTTP adapter.
- Do not claim storage is durable unless the selected storage adapter confirms the write.
- Reject path traversal and unsafe record identifiers before filesystem access.
- Do not introduce a generic adapter interface for a single concrete implementation.
