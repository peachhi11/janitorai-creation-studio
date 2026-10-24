# API and MCP tool reference

The service exposes a local Streamable HTTP MCP endpoint and two simple HTTP status routes.

## HTTP endpoints

### GET `/`

Returns the service name and version as plain text.

### GET `/healthz`

Returns a JSON health response:

```json
{
  "status": "ok",
  "service": "janitorai-bot-creator",
  "version": "1.1.0"
}
```

### POST `/mcp`

Handles Streamable HTTP MCP requests. In production, send the configured token:

```http
Authorization: Bearer <MCP_API_TOKEN>
```

Requests over `MAX_REQUEST_BYTES` receive `413`. Requests over the configured rate limit receive `429` with a `Retry-After` header. Invalid or missing production credentials receive `401`.

## MCP tools

### Generation and persona tools

| Tool | Purpose |
| --- | --- |
| `create_character` | Generate a complete Janitor AI bot definition. |
| `revise_character` | Revise an existing bot while preserving unrequested canon. |
| `create_user_persona` | Create an independent reusable persona with full and compact exports. |
| `adapt_persona_to_bot` | Create a setting- and bot-specific adaptation without changing permanent persona canon. |
| `update_persona_canon` | Promote explicitly selected roleplay discoveries into permanent canon. |
| `promote_persona_to_character` | Convert a portable persona into a complete bot definition. |

Generation inputs may select references with `referenceIds`, provide a `referenceQuery`, disable retrieval with `useReferences: false`, and limit retrieved sources with `maxReferenceSources`.

### Persistence tools

| Tool | Purpose |
| --- | --- |
| `save_character` | Persist a character or persona record locally. |
| `list_characters` | List persisted records without exposing secrets. |
| `get_character` | Retrieve one current record by identifier. |
| `list_character_revisions` | List archived versions, oldest first. |
| `get_character_revision` | Read one archived version without changing the current record. |
| `restore_character_revision` | Restore an archived version while preserving the displaced current version. |

Character identifiers and revision identifiers are validated before filesystem access. Records are stored under `CHARACTER_LIBRARY_DIR`.

### Reference tools

| Tool | Purpose |
| --- | --- |
| `list_references` | List supported local references and their manifest metadata. |
| `search_references` | Search references and return excerpts with source paths. |
| `read_reference` | Read a selected reference; PDF extraction uses `pdftotext` when available. |

Reference discovery is centralized in `lib/reference-index.mjs`. A `knowledge-manifest.json` file can define stable IDs, formats, roles, and purposes. Without a manifest, supported files are discovered recursively.

### Visual model tools

| Tool | Purpose |
| --- | --- |
| `create_visual_character_model` | Convert a character record into an editable visual model. |
| `update_visual_character_model` | Apply a constrained visual edit without changing unrelated character fields. |

## Result conventions

Generation results return structured character data plus rendered Markdown or persona exports. Generation results that use references include `referenceSources`, containing source identifiers, paths, roles, purposes, and retrieval scores where available.
