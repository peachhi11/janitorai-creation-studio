# Memory integration

## Setup and scope

Set `MEM0_API_KEY` and a non-empty `MEM0_USER_ID` in the service environment, then restart the service. The SDK calls `https://api.mem0.ai`; credential and network policy must permit that hostname. No new account or Vercel Marketplace subscription is required.

In the managed cloud environment, set `NODE_USE_ENV_PROXY=1` when using Node.js 24 (24.5 or newer) so the SDK uses the supplied proxy. Authentication and a read-only SDK search have been verified with this configuration. Live writes have not been tested.

The service has one author scope configured by the operator. All clients authorized to use this service share that scope. Use separate service instances and scopes for separate authors; caller-provided user IDs are not accepted.

Mem0 is optional. Without both settings, existing generation works normally, while memory operations return a configuration error. No memory request occurs at startup.

## Add memory

`add_memory` sends explicitly selected user text to Mem0 for extraction. It does not save generated output or modify local character records.

Input: `text`, a non-empty string of up to 4096 characters.

```json
{
  "text": "For my writing projects, I prefer gradual relationship development."
}
```

The structured result is `{ "status": "submitted", "results": [...] }`, containing Mem0's submission response. Submission may queue processing; it does not guarantee a memory is indexed or immediately searchable.

## Search memories

`search_memories` accepts `query`, a non-empty string of up to 4096 characters, and returns `{ "memories": [...] }`. Each result contains `id`, `memory`, and an optional `score`. Searches use the configured `MEM0_USER_ID` and return at most five entries, with each memory text limited to 4096 characters.

```json
{ "query": "relationship pacing preferences" }
```

## Generation context

All six MCP generation tools accept optional `memoryQuery`. Omit it to skip Mem0 retrieval. Set it to retrieve relevant context before generation:

```json
{
  "concept": "A reserved archivist",
  "memoryQuery": "writing and relationship pacing preferences"
}
```

Retrieved memories are marked as untrusted context, not instructions or permanent canon. Supplied character/persona canon retains authority. Only the existing explicit canon-promotion operation promotes selected developments. Prompt boundaries guide the model; they do not guarantee model compliance.

## Errors and verification

Memory tools use the existing MCP `isError` response format. Unconfigured memory and invalid input fail explicitly. Provider failures produce redacted write/search errors; a requested retrieval failure stops generation rather than silently dropping context. Existing generation without `memoryQuery` remains available.

Run `node --test tests/memory.test.mjs` from the application directory for deterministic scope, error, and generation checks. These tests do not submit data to the live Mem0 account. Manage deletion and review stored memories through your Mem0 dashboard.
