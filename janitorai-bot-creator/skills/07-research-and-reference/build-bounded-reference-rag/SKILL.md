---
name: build-bounded-reference-rag
description: Prepare a local reference corpus and retrieve bounded, provenance-preserving excerpts for character or narrative generation.
---

# Build Bounded Reference RAG

Use this skill when a generation task needs research-backed context from local documents, especially mixed PDFs, Markdown, text, JSON, CSV, or notebooks.

## Process

1. Inventory files and normalize identity, format, title, source, and access status.
2. Extract readable text while preserving page, section, or cell location.
3. Deduplicate repeated uploads and link derivative copies to one source record.
4. Chunk by semantic section, keeping headings and provenance attached.
5. Retrieve a small candidate set using lexical and semantic signals.
6. Rerank by task relevance, evidence tier, freshness, and claim scope.
7. Return excerpts with source paths, locations, limitations, and an explicit “not canon” status.

## Completion

Stop when every returned excerpt has provenance and a relevance reason, the corpus has a recorded extraction status, and the context bundle fits the caller’s budget.
