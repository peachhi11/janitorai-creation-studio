---
name: maintain-recurring-npc-memory-and-voice
description: Use when a recurring fictional NPC returns after an absence, remembers an interaction, changes attitude, or needs distinct dialogue across roleplay turns. Trigger phrases include “bring the NPC back,” “what does the NPC remember?” and “keep the voice consistent without catchphrases.”
---

## Steps

1. Record the NPC’s last appearance, unresolved promise, debt, injury, favour, insult, secret, or changed access.
2. Separate what the NPC witnessed, inferred, was told, forgot, misread, or only believes.
3. Set the current want, pressure, relationship stance, reason for returning, and off-screen changes.
4. Decide what the NPC conceals, tests, forgives, exploits, or pretends not to remember.
5. Define voice through attention, register, rhythm, vocabulary, humour, silence, tactics, warmth, and physical business.
6. Retrieve only facts relevant to this scene; do not give the NPC a god’s-eye summary.
7. Write retrieved memory → present cue → interpretation → tactic → observable response → changed access or relationship → residue.
8. Allow partial recognition, false confidence, strategic forgetting, resentment, affection, and revised meaning.
9. State any supernatural memory rule and keep {{user}}’s thoughts, speech, consent, and action open.

## Decision rules

- Yes: Does the NPC know something without access, witness, report, or a stated fictional rule? Remove the leak. No: continue.
- Yes: Is voice reduced to a catchphrase, accent, or repeated tic? Restore choices, rhythm, and context. No: continue.
- Yes: Does memory need to be supernatural, shared, unreliable, or erased? State its cause, scope, perceiver, and consequence. No: use ordinary memory.
- Yes: Does the draft write {{user}}’s response? Remove that response. No: continue.

## Output

- Format: `Recurring NPC return brief`
- Memory: list relevant facts, gaps, beliefs, and misreadings.
- Voice: list attention, register, rhythm, tactics, and relationship shifts.
- Scene: write the NPC’s response and observable pressure.
- Delta: list changed access, relationship, knowledge, and residue.
- Next action: list one unresolved thread or independent NPC action.

## Stop when

- No recurring NPC or return scene is supplied: return `No recurring NPC update` and do not invent {{user}}’s response.
