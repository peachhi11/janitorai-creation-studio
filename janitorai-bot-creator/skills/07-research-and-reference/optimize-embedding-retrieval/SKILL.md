---
name: optimize-embedding-retrieval
description: Build efficient semantic retrieval for reference and memory search while preserving lexical anchors, provenance, scope, and causal relevance.
---

# Optimize Embedding Retrieval

Use this skill when semantic search misses paraphrases, retrieves semantically similar but unusable passages, or exceeds context or latency budgets.

## Process

1. Define query intent, source scope, knowledge access, freshness, and required evidence type.
2. Normalize and chunk documents without separating headings, tables, examples, or provenance from their content.
3. Combine embedding similarity with lexical anchors, metadata, source tier, section locality, and causal links.
4. Deduplicate near-identical results and cap candidates, inspected text, and returned context.
5. Rerank for task fit and claim scope rather than similarity alone.
6. Evaluate direct, paraphrase, multi-hop, distractor, conflict, and missing-evidence queries.

## Completion

Stop when retrieval has bounded cost, retained provenance, measurable coverage, false-positive and false-negative checks, and a documented fallback when embeddings are unavailable.
