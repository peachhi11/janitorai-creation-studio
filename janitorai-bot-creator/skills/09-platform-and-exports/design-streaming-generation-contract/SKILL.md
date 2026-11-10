---
name: design-streaming-generation-contract
description: Design streaming generation that preserves structured output, cancellation, partial-result semantics, provenance, and character-state integrity.
---

# Design Streaming Generation Contract

Use this skill when generation or roleplay responses stream incrementally to a client.

## Process

1. Define event types for start, content delta, tool activity, validation, completion, cancellation, and error.
2. Keep partial text distinct from committed character or relationship state.
3. Buffer or validate structured fields before exposing them as durable canon.
4. Preserve source provenance and prompt/model metadata through the stream.
5. Define reconnect, timeout, cancellation, malformed output, and provider failure behavior.
6. Verify that a partial response cannot silently overwrite a complete prior record.

## Completion

Stop when every stream event has a schema and lifecycle rule, partial state is non-canonical, cancellation is safe, and completed output passes the same validation as non-streaming generation.
