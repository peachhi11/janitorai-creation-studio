---
name: evaluate-retrieval-grounding
description: Evaluate whether retrieved references are relevant, sufficient, correctly attributed, and used within their evidence scope.
---

# Evaluate Retrieval Grounding

Use this skill when testing reference search, RAG context, source-backed generation, or a claim that cites retrieved material.

## Process

1. Create queries covering direct lookup, paraphrase, multi-hop consequence, distractors, missing evidence, and conflicting sources.
2. Check retrieval relevance, source coverage, provenance retention, chunk locality, and stale/duplicate suppression.
3. Check whether the generated claim is entailed, qualified, unsupported, or contradicted by the retrieved text.
4. Separate retrieval failure from reasoning failure and rendering/provenance failure.
5. Record false positives, false negatives, unsupported certainty, and context-budget omissions.

## Completion

Stop when each test case has expected evidence, observed retrieval, claim disposition, failure class, and a reproducible repair target.
