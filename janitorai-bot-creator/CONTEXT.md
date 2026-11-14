# Context

## Domain language

- **Character record:** a persisted JSON document representing a bot or portable persona.
- **Reference:** a local Markdown, text, JSON, or PDF source available for retrieval.
- **Visual model:** a constrained projection of character identity, appearance, outfit, palette, and notes.
- **Tool:** an MCP-facing operation exposed to clients.
- **Application:** the domain-facing module that orchestrates generation, rendering, persistence, retrieval, and visual edits.
- **Adapter:** a transport or storage implementation behind a seam.
- **Scoped file store:** the path-safe file module that owns containment checks, identifier validation helpers, and atomic JSON writes.
- **Generation capability:** the model-facing capability that owns generation schemas, policy composition, output validation, and character rendering.
- **Reference index:** the normalized view of available reference files and manifest metadata used by both browsing and retrieval.
- **Safety guard:** the repository-local command classifier that denies destructive or history-rewriting Git operations before execution.

## Invariants

- Preserve the existing MCP tool names and payload intent.
- Keep generation and rendering behind the application seam; keep model and schema details out of the HTTP adapter.
- Do not claim storage is durable unless the selected storage adapter confirms the write.
- Reject path traversal and unsafe record identifiers before filesystem access.
- Do not introduce a generic adapter interface for a single concrete implementation.
- Treat the reference index as the shared source of reference identity and eligibility.
- Treat denied destructive Git commands as requiring a reversible alternative or explicit human intervention.
