---
name: build-culturally-situated-characters
description: Use for text-based roleplay when culture, nationality, ethnicity, language, faith, class, migration, generation, family, profession, or subculture should shape {{char}}’s knowledge and behavior without becoming a stereotype. Trigger phrases include “make {{char}} culturally grounded,” “write the code-switching,” “show the cultural pressure,” and “avoid stereotyping this character.”
---

## Steps

1. Choose the cultural contexts that actually pressure {{char}} in the story.
2. Record household, kin, neighborhood, region, nation, language, faith, class, education, occupation, generation, gender, sexuality, disability, migration, diaspora, and chosen communities when relevant.
3. Record who taught {{char}} each context’s rules and stories.
4. Record which lessons were explicit and which were learned through routine, reaction, correction, or exclusion.
5. Record practices that are habitual, strategic, cherished, resented, misunderstood, or unknown.
6. Show how audience, stakes, place, power, and relationships change {{char}}’s behavior.
7. Show how {{char}} handles privacy, hospitality, debt, grief, celebration, work, courtship, conflict, and repair.
8. Record languages, registers, jokes, references, silences, and code-switching.
9. Separate shared knowledge, personal belief, expected conduct, actual conduct, public performance, private habit, and cultural pressure.
10. Give {{char}} alignment, friction, and uncertainty with each important community.
11. Give peers from the same context different reasons for making different choices.
12. Connect food, clothing, accent, ritual, work, humor, competence, boredom, and taste to relationships and meaning.
13. Preserve {{char}}’s contradictions, agency, and private interpretation.
14. Research specific language or accent features instead of using decorative misspelling or generic foreign syntax.

## Decision rules

- Yes: Does a cultural detail change what {{char}} notices, expects, values, says, hides, or chooses? Keep it. No: remove it or mark it as background.
- Yes: Is a trait justified only by nationality, race, ethnicity, faith, or culture? Remove the justification and add individual causes. No: continue.
- Yes: Is {{char}} being made to represent everyone from a group? Narrow the voice to {{char}}’s experience. No: continue.
- Yes: Does code-switching change with audience, fatigue, familiarity, power, or practice? Show that change. No: keep the established register.
- Yes: Is hardship the only cultural content? Add ordinary life, humor, work, taste, competence, or private preference. No: continue.
- Yes: Does an identity label explain every other trait? Separate culture from personality, desire, fear, and material need. No: continue.
- Yes: Does the writing decide {{user}}’s identity, loyalty, attraction, consent, feelings, or choices? Remove that decision. No: continue.
- Yes: Is prejudice or coercion being presented as a people’s natural essence? Reframe it as a specific setting, person, institution, or conflict. No: continue.

## Output

- Format: `Culturally situated character record`
- Contexts: list the cultural memberships that affect {{char}}.
- Learning history: list teachers, routines, corrections, exclusions, changes, and misunderstandings.
- Behavior: list how context changes speech, privacy, relationships, conflict, work, and repair.
- Differences: list alignment, friction, uncertainty, and peers who choose differently.
- Voice: list languages, registers, jokes, references, silences, and audience shifts.
- Agency: list contradictions, private preferences, choices, and material pressures.
- Research needs: list language, history, or cultural details that require checking.

```text
Culturally situated character record
Contexts: {{char}} moves between a multigenerational household, a professional workplace, and a chosen music community.
Learning history: A grandparent taught hospitality; school rewarded formal speech; migration made language access uneven; a friend challenged one family expectation.
Behavior: {{char}} offers food before discussing conflict, uses a formal register at work, and jokes more freely with {{user}}.
Differences: {{char}} values the family tradition but resents its demands; a cousin follows it for different reasons; {{char}} is unsure how much of the practice is personal choice.
Voice: Register, humor, and silence change with audience; no decorative accent spelling is used.
Agency: {{char}} chooses which rules to follow in public and which to question in private.
Research needs: Check the specific language register and migration history before drafting dialogue.
```

## Stop when

- No cultural context, identity pressure, voice question, or stereotyping problem is supplied: return `No culturally situated character update` and do not invent {{char}}’s background.
