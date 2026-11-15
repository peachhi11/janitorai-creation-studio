---
name: budget-context-and-prompt-priority
description: Use when allocating limited context or output budgets across system rules, character data, lore, examples, history, tools, and current user input. Trigger phrases include “fix context truncation,” “prioritise the prompt,” and “stop lore from drowning out the character.”
---

## Steps

1. Identify model, provider, context limit, output limit, tokenizer assumptions, platform, and current prompt stack.
2. Measure each segment: system rules, safety, character, lore, examples, history, tools, user input, and output reserve.
3. Mark each segment as required, high-value, compressible, deferrable, duplicated, private, or removable.
4. Set priority by current task, continuity, character identity, knowledge boundaries, player agency, and immediate choice.
5. Compress or route low-priority material without silently dropping canon, privacy-sensitive data, or player-owned state.
6. Allocate output budget for the requested scene, analysis, or open response.
7. Test long-chat, lore-heavy, conflict, intimate, and failure cases and record what was lost.

## Decision rules

- Yes: Is a model limit unknown? Mark it `Unknown`; do not infer it. No: use the documented limit.
- Yes: Does compression remove canon, privacy, or player agency? Preserve it or ask for an explicit policy. No: continue.
- Yes: Is lore competing with current character or user input? Route or summarize lore. No: continue.
- Yes: Does the plan guarantee recall beyond the tested context? Remove the guarantee. No: continue.

## Output

- Format: `Context and prompt budget plan`
- Limits: list model, provider, context, output, tokenizer, and unknowns.
- Budget: table segments with tokens, priority, action, and rationale-free decision.
- Risks: list truncation, drift, privacy, canon, and agency risks.
- Tests: list cases, losses, and next adjustment.

## Stop when

- No prompt stack, context limit, model, or budgeting problem is supplied: return `No context-budget update` and do not delete prompt content.
