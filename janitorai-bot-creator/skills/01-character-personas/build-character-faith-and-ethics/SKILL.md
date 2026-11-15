---
name: build-character-faith-and-ethics
description: Use for text-based roleplay when {{char}}’s faith, doubt, moral reasoning, rituals, conscience, responsibility, or ideas about fate need to shape behavior. Trigger phrases include “build {{char}}’s beliefs,” “show {{char}}’s faith,” “write this moral conflict,” and “make the ethics specific.”
---

## Steps

1. Record who taught {{char}} and which stories, rituals, rules, and examples shaped them.
2. Record what {{char}} practiced before they could explain it.
3. Record experiences that confirmed, complicated, or damaged {{char}}’s trust.
4. Record which authorities {{char}} respects, fears, resents, imitates, or ignores.
5. Record what belonging gives {{char}} and what it costs.
6. Separate inherited identity, current conviction, public affiliation, and private practice.
7. Record what {{char}} notices first in a difficult choice.
8. Show beliefs through ordinary choices, speech, rituals, limits, exceptions, apologies, and responses to temptation.
9. Separate foreknowledge, causation, constraint, luck, divine permission, destiny, and fatalism.
10. Put two genuine commitments under pressure.
11. Record what {{char}} owes, what each option protects or harms, and what information is uncertain.
12. Record the consequences {{char}} expects and what they acknowledge, hide, repair, harden, or rethink afterward.
13. Use family sayings, prayers, jokes, remembered teachings, ritual language, silence, and disagreement in {{char}}’s voice.
14. Check that faith or unbelief does not determine {{char}}’s intelligence, kindness, cruelty, sexuality, or personality.

## Decision rules

- Yes: Is the belief inherited, practiced, interpreted, or personally chosen? Record which one. No: mark the belief as uncertain.
- Yes: Does {{char}}’s belief change a choice, obligation, relationship, or consequence? Show that change. No: keep it as background identity.
- Yes: Are two commitments in conflict? Preserve both pressures. No: do not manufacture a moral dilemma.
- Yes: Does {{char}} use fate or destiny to avoid responsibility? Show that strategy without proving the theology false. No: keep responsibility and belief separate.
- Yes: Is the narrator settling a live theological dispute? Remove the verdict unless the fictional canon establishes it. No: preserve the dispute.
- Yes: Is an inconsistency caused by fatigue, danger, love, shame, status, audience, or access? Show the condition. No: do not label it hypocrisy automatically.
- Yes: Does the writing force conversion, redemption, reform, or ethical consistency? Remove the force. No: preserve the selected outcome.
- Yes: Is a religious or ethical claim being presented as a clinical fact? Mark it as a character or source claim. No: continue.

## Output

- Format: `Faith and ethics record`
- History: list teaching, practice, authority, belonging, doubt, and present conviction.
- Moral attention: list what {{char}} notices first and what they overlook.
- Practice: list ordinary behaviors, rituals, limits, exceptions, and language.
- Conflict: list the competing commitments, uncertain information, expected consequences, and choice.
- Responsibility: state how {{char}} understands fate, causation, constraint, luck, permission, or responsibility.
- Aftermath: list repair, concealment, punishment, hardening, doubt, or changed practice.
- Voice: list phrases, silences, jokes, teachings, and disagreements that sound like {{char}}.
- Open questions: list belief or ethical details that still need an author decision.

```text
Faith and ethics record
History: {{char}} learned the tradition from a grandmother, practiced its hospitality rules early, and now doubts its authority while keeping its rituals.
Moral attention: {{char}} notices loyalty and preventable harm before law or abstract fairness.
Practice: {{char}} shares food, avoids one oath, and uses an old prayer when afraid.
Conflict: Protecting {{user}} would require hiding a betrayal; {{char}} expects social exile but does not know whether the betrayal was intentional.
Responsibility: {{char}} believes fate sets conditions but choices remain accountable.
Aftermath: {{char}} confesses part of the truth and treats the silence afterward as a new moral burden.
Voice: Family sayings appear as fragments, not lectures; doubt comes out as a joke when {{char}} is afraid.
Open questions: Decide whether {{char}} seeks forgiveness, restitution, or only recognition of the harm.
```

## Stop when

- No belief, ritual, moral conflict, ethical choice, or fate question is supplied: return `No faith and ethics update` and do not invent {{char}}’s beliefs.
