---
name: assemble-integrated-character-dossier
description: Use for text-based roleplay when {{char}}’s notes are scattered, the character feels like a checklist, or a roleplay card needs a compact core. Trigger phrases include “assemble {{char}}’s profile,” “connect these character notes,” “make this dossier usable,” and “what holds {{char}} together?”
---

## Steps

1. Record {{char}}’s identity, setting, role, status, resources, and limits.
2. Record formative experiences and the meaning {{char}} made from them.
3. Record {{char}}’s wants, deeper needs, fears, values, beliefs, lies, and contradictions.
4. Turn traits into tendencies with thresholds, contexts, and exceptions.
5. Record each relationship’s history, knowledge, leverage, desire, and unresolved tension.
6. Record {{char}}’s public mask, private nature, and pressure leaks.
7. Record appearance, clothing, objects, habits, voice, and body tells.
8. Record capabilities, blind spots, failure modes, and conditions for change.
9. Separate what the reader, narrator, {{char}}, {{user}}, and other characters know.
10. Keep only details that affect perception, choice, conflict, intimacy, knowledge, or consequences.
11. Mark inferences and open possibilities instead of turning them into canon.
12. Add contradictions, scene hooks, and unresolved choices.

## Decision rules

- Yes: Does a detail affect {{char}}’s perception, choice, conflict, intimacy, knowledge, or consequences? Keep it. No: remove it or mark it as background.
- Yes: Is the detail inferred or still possible? Label it as an inference or open possibility. No: record it as established canon.
- Yes: Does a trait change with pressure, context, information, or stakes? Keep the exception. No: do not make the trait automatic.
- Yes: Is a relationship fact owned by a specific character or access path? Include that access. No: keep it outside their knowledge.
- Yes: Does the dossier decide {{user}}’s feelings, consent, knowledge, or choices? Remove that decision. No: continue.
- Yes: Does the dossier force a healthy, redemptive, or approving outcome? Remove the prescription. No: preserve the selected genre and tone.
- Yes: Are details repeating without changing behavior or story pressure? Stop expanding that section. No: continue.

## Output

- Format: `Integrated character dossier`
- Core: summarize identity, setting, role, status, and central contradiction.
- Causal architecture: connect history, meaning, traits, motives, abilities, and consequences.
- Behavior map: state how {{char}} acts when calm, pressured, intimate, threatened, or uncertain.
- Relationship map: list dispositions, knowledge, history, leverage, desire, and unresolved tension.
- Knowledge boundaries: separate reader, narrator, {{char}}, {{user}}, and other-character access.
- Hooks: list scene hooks and unresolved choices.
- Open questions: list details that still need an author decision.

```text
Integrated character dossier
Core: {{char}} is a guarded archivist who wants control but needs reliable connection.
Causal architecture: A childhood of unstable moves made privacy feel protective; that history helps {{char}} plan ahead and makes spontaneous trust harder.
Behavior map: Calm — precise and observant. Pressured — withholds information. Intimate — offers practical help instead of direct reassurance.
Relationship map: {{char}} trusts {{user}} with access to the archive but not yet with the reason it matters.
Knowledge boundaries: The history is canon; {{char}}’s fear that {{user}} will leave is a hypothesis; {{user}} does not know about the hidden records.
Hooks: A missing file, an unexpected visitor, and a choice between disclosure and concealment.
Open questions: Decide what would make {{char}} hand over the key.
```

## Stop when

- No character notes, dossier request, or integration problem is supplied: return `No character dossier update` and do not invent {{char}}.
