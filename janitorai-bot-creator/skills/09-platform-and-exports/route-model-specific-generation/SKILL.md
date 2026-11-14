---
name: route-model-specific-generation
description: Route a generation task through model- or provider-specific prompt, schema, context, and output settings without changing the underlying character intent.
---

# Route Model-specific Generation

Use this skill when a character or persona must be generated across model versions, providers, context limits, structured-output capabilities, or prompt presets.

## Process

1. Identify the target model, provider, API contract, context limit, output limit, and structured-output support.
2. Keep character canon, genre intent, user agency, and source provenance in a model-independent layer.
3. Apply only the target’s adapter-specific message order, schema syntax, token budget, tool contract, and retry behavior.
4. Run a parity check against the reference output contract.
5. Record unsupported features, degraded fields, truncation, and provider-specific assumptions.

## Completion

Stop when the target request is valid, core intent survives the adapter, degraded behavior is disclosed, and the output passes schema, continuity, provenance, and agency checks.
