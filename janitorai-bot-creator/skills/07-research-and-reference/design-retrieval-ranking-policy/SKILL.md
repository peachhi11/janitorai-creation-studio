---
name: design-retrieval-ranking-policy
description: Define a retrieval ranking policy that balances semantic relevance, lexical anchors, provenance, authority, causality, freshness, knowledge access, and context cost.
---

# Design Retrieval Ranking Policy

Use this skill when reference or memory retrieval returns too much, too little, stale state, or plausible but unusable material.

## Process

1. Define query intent and required evidence or memory type.
2. Rank candidates by task fit, authority, causal relevance, scope, freshness, access, locality, and cost.
3. Penalize duplicates, superseded state, inaccessible knowledge, unsupported claims, and decorative similarity.
4. Set candidate, inspection, and output caps.
5. Define tie-breaking, fallback, empty-result, and conflict behavior.
6. Evaluate ranking with direct, paraphrase, multi-hop, distractor, stale, and missing-evidence cases.

## Completion

Stop when ranking factors, caps, fallbacks, access rules, and measurable evaluation cases are explicit.
