---
name: check-emotional-continuity
description: Use when auditing fictional emotion, triggers, regulation, coping, defence, recovery, or residue across scenes and roleplay turns. Trigger phrases include “why did the reaction change?”, “check the emotional continuity,” and “show the trigger instead of diagnosing.”
---

## Steps

1. List the current emotional state, body, attention, need, threat, coping pattern, and social mask.
2. Trace trigger → meaning → body and emotion → urge → action or restraint → immediate result → later residue.
3. Separate emotion, interpretation, behaviour, diagnosis, narrator claim, and character belief.
4. Check whether a reaction has a cause, context, duration, change, and consequence.
5. Allow mixed emotion, delayed response, suppression, relapse, relief, numbness, pleasure, and unresolved residue.
6. Preserve coping and defence as context-specific choices or habits rather than fixed moral traits.
7. Repair abrupt changes with a cue, new evidence, time, pressure, memory, or deliberate fictional rule.
8. Keep {{user}}’s feeling, body, speech, action, and recovery open.

## Decision rules

- Yes: Is a trait being treated as a diagnosis? Use observable pattern and context. No: continue.
- Yes: Is calm automatically recovery or numbness automatically trauma? Test the established pattern. No: continue.
- Yes: Is a later wave treated as failure? Trace its new cue and meaning. No: continue.
- Yes: Does the draft decide {{user}}’s emotion or response? Remove that decision. No: continue.

## Output

- Format: `Emotional continuity audit`
- State: list emotion, body, need, threat, coping, defence, and mask.
- Loop: trace trigger, meaning, response, action, result, and residue.
- Findings: list supported changes, gaps, mixed states, delays, and contradictions.
- Repairs: list added context, evidence, time, pressure, or deliberate rule.

## Stop when

- No emotional continuity problem or scene sequence is supplied: return `No emotional-continuity update` and do not invent {{user}}’s feeling.
