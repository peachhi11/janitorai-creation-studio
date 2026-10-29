---
name: budget-context-and-prompt-priority
description: Allocate limited context and output budgets across system rules, character or persona data, lore, examples, history, tools, and current user input without silently dropping high-value information. Use when a prompt stack truncates, a card becomes inconsistent in long chats, lore competes with character instructions, or a preset needs a model-specific context plan. Do NOT use to invent model limits, guarantee recall, or discard canon, player agency, or privacy-sensitive data without an explicit policy.
---

# Budget context and prompt priority

Treat context as a finite working surface. More text is not automatically more
control.

**Action:** Establish the target budget, classify context by authority and task
value, reserve output space, select the smallest sufficient bundle, and verify
what actually reached the model.

**Key point:** Priority is not the same as recency. A late block can still be
lower authority, irrelevant, or too large to survive truncation.

**Why:** Explicit budgeting reduces silent loss, contradictory instructions,
voice drift, and lore overload.

## Define the budget

Record model/provider, context limit, requested output, tool or media overhead,
history window, tokeniser or estimate method, and safety margin. If limits are
unknown, label the plan provisional rather than guessing.

Reserve output and tool space first. Do not spend the entire context on static
instructions when the task needs a long scene or conversation history.

## Classify and rank context

For each block, record source, authority, scope, size, freshness, and failure cost.
Typical classes are:

- trusted operating rules and platform wiring;
- current task and player request;
- character/persona and active scene state;
- relevant canon, knowledge, and relationship records;
- conditional lore or examples;
- recent history and summaries;
- optional style, research, or background material.

Keep one authoritative copy of each rule. Prefer a compact state record over a
repeated prose biography. Exclude material that cannot change this response.

## Handle pressure

When the bundle is too large, reduce in this order unless the project specifies
otherwise: stale or duplicated material, irrelevant examples, broad background,
older history that has a validated summary, then optional style notes. Never
silently remove a player-controlled fact, an active boundary, a required
knowledge restriction, or a canon change; report the conflict and ask or stop at
the smallest necessary decision.

Dynamic lore activation means available context, not character knowledge or
guaranteed mention. Keep insertion position, recursion, filters, and budget
separate from canon.

## Verify the assembled request

Inspect the final expanded messages, estimated tokens, truncation point, roles,
order, and omitted blocks. Test a normal, long-context, sparse, and adversarial
request. Check character voice, knowledge boundaries, player agency, and whether
the intended state actually survived.

## Fictional genre logic

Genre may intentionally privilege a fragment, dream, unreliable record,
metafictional instruction, or sensory cue over an encyclopaedic canon bundle.
Make that narrative priority explicit. Do not mistake a context budget failure
for an authored mystery or use token pressure to force a player's response.

## Deliverable

Return a budget table, priority policy, assembled-context preview, omitted or
compressed material, truncation risks, and verification results.
