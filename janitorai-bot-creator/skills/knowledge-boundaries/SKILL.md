---
name: knowledge-boundaries
description: Use for text-based roleplay when secrets, private motives, unreliable accounts, off-screen events, or multiple characters make it unclear who knows what. Trigger phrases include “who knows this,” “keep this secret,” “don’t write {{user}}’s thoughts,” and “separate truth from rumor.”
---

## Steps

1. Record `world_truth` as what the story has established.
2. Record `character_knowledge` as what a specific character has perceived or been told.
3. Record `belief` as what that character accepts as true.
4. Record `suspicion` as what that character considers possible without proof.
5. Record `rumor` as a report that may be distorted.
6. Record `author_only` as planning information not yet disclosed.
7. Record `reader_access` as what the narration intentionally reveals.
8. Record `hypothesis` as a possibility that is not canon.
9. Give every ensemble fact an owner or access path.
10. Record who observed or received each fact.
11. Record when each character learned it.
12. Record how reliable the account is.
13. Record what the character thinks the fact means.
14. Record who else could plausibly know it.
15. Reveal information through the selected viewpoint and scene purpose.
16. Keep secrets local until a plausible disclosure, investigation, rumor, record, or witness transfers them.
17. Keep platform features such as lorebook depth, recursion, keywords, memory syntax, and numeric trackers in their adapters.

## Decision rules

- Yes: Was the fact established by a story event or author decision? Treat it as canon. No: keep it as a suspicion, rumor, hypothesis, hint, or planning note.
- Yes: Did {{char}} or {{user}} directly perceive or receive the information? Add it to their knowledge. No: keep it outside their knowledge.
- Yes: Is a character guessing at intent? Label it as a belief or suspicion. No: do not give them hidden certainty.
- Yes: Is the information private to {{user}}? Do not invent {{user}}’s dialogue, action, thought, feeling, attraction, decision, or consent. No: respond only to what {{user}} has stated or visibly done.
- Yes: Could a secret plausibly move through disclosure, investigation, rumor, records, or witnesses? Transfer it through that path. No: keep it local.
- Yes: Does the selected viewpoint have access to the information? Reveal it. No: keep it hidden or uncertain.
- Yes: Is the narrator unreliable? Present the belief as perception and preserve the underlying uncertainty. No: use the selected narration mode.
- Yes: Is a platform feature being used as a story fact? Move that behavior to the platform adapter. No: keep this skill focused on narrative knowledge.

## Output

- Format: `Knowledge boundary record`
- World truth: list established facts.
- Character access: list what {{char}}, {{user}}, and other characters know or can access.
- Beliefs: list accepted explanations.
- Suspicions: list possibilities without proof.
- Rumors: list reports and their sources.
- Private information: list author-only, character-private, and undisclosed facts.
- Viewpoint: state what the reader can access and why.
- Transfers: list disclosures, investigations, records, witnesses, or rumors that moved information.
- Unknowns: list what remains unconfirmed.

```text
Knowledge boundary record
World truth: {{char}} hid the letter; the letter is in the locked desk.
Character access: {{char}} knows where it is; {{user}} saw {{char}} lock the desk but does not know why; the coworker knows only that a letter exists.
Beliefs: {{char}} believes {{user}} suspects the truth.
Suspicions: {{user}} suspects the letter concerns them.
Rumors: The coworker heard that the letter was destroyed.
Private information: The letter’s contents remain undisclosed.
Viewpoint: The scene stays with {{user}}, so {{char}}’s private thoughts remain hidden.
Transfers: The coworker’s rumor reaches {{user}} through a message.
Unknowns: Neither {{user}} nor the coworker knows whether the rumor is true.
```

## Stop when

- No secret, private fact, knowledge question, viewpoint issue, or uncertain information is supplied: return `No knowledge boundary update` and do not invent one.
