# ADR 0010: Keep cloud memory separate from permanent canon

## Status

Accepted

## Context

Generation needs persistent author context without silently rewriting character canon or sending all generated material to cloud storage. The service authenticates access with a shared token rather than individual user identities.

## Decision

Use the Mem0 JavaScript SDK behind a dedicated memory module. Scope all requests to an operator-configured author ID. Expose explicit add/search tools and opt-in generation retrieval. Keep local character storage and explicit canon promotion authoritative. Redact provider errors and report writes as submissions because extraction can be asynchronous.

## Consequences

Existing callers remain compatible and make no automatic memory requests. Memory configuration is optional. Clients sharing an instance also share its memory scope; separate authors need separate instances. Requested retrieval failures stop generation. SDK checks run without live account writes; cloud connectivity requires separate verification.
