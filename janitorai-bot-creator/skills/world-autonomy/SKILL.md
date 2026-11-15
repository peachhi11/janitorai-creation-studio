---
name: world-autonomy
description: Use for text-based roleplay when NPCs, institutions, consequences, and unrelated events should keep moving while {{char}} or {{user}} is elsewhere. Trigger phrases include “make the world feel alive,” “what happened off-screen,” “track delayed consequences,” and “keep the NPCs active.”
---

## Steps

1. Give each important NPC and institution a goal.
2. Give each important NPC and institution routines, resources, relationships, and limits.
3. Update off-screen activity while {{char}} or {{user}} is absent.
4. Let goals advance, stall, change, or end without requiring the player to watch.
5. Let background activity create opportunities, complications, successes, failures, or changed circumstances.
6. Reveal off-screen activity through messages, rumors, absences, records, witnesses, or later consequences.
7. Record whether an action was witnessed, recorded, reported, inferred, suspected, or hidden.
8. Delay consequences when the story gives them a route to arrive later.
9. Track changes to trust, access, reputation, availability, resources, schedules, and risk.
10. Keep NPC knowledge separate from what actually happened.
11. Classify new places, factions, customs, and events as established, local belief, rumor, hypothesis, or unresolved.
12. Explain contradictions through perspective, misinformation, or change over time.
13. Show rising pressure through urgency, mistakes, limited options, crowd behavior, and changed tone.

## Decision rules

- Yes: Does an NPC or institution have an active goal outside the current scene? Let it continue. No: give it a routine, limit, or reason for waiting.
- Yes: Could an off-screen action change what {{char}} or {{user}} encounters later? Track it. No: leave it outside the current update.
- Yes: Could the player plausibly discover the background action? Reveal it through a fitting clue. No: keep it hidden or delayed.
- Yes: Was the action unobserved? Do not let an NPC respond as if they know it. No: use the available witness or record.
- Yes: Could the information be distorted? Preserve the rumor, suspicion, or mistaken account until evidence changes it. No: record the established fact.
- Yes: Does new lore conflict with an earlier detail? Explain the conflict through perspective, misinformation, or change. No: keep the existing classification.
- Yes: Has the project selected a visible game system? Use its pressure meters. No: show pressure through behavior and circumstances instead of numbers.
- Yes: Is every background action being announced? Remove details the characters could not discover or that do not affect the scene. No: continue.

## Output

- Format: `World autonomy record`
- Active threads: list NPC and institutional goals, routines, resources, relationships, and limits.
- Off-screen changes: list activity that advanced, stalled, changed, or ended.
- Knowledge route: state who witnessed, recorded, reported, inferred, suspected, or hid each relevant action.
- Consequences: list immediate and delayed changes to trust, access, reputation, availability, resources, schedules, and risk.
- Lore status: classify new information as established, local belief, rumor, hypothesis, or unresolved.
- Pressure: describe rising pressure through behavior and circumstances.
- Next reveal: state the next clue, consequence, or changed situation {{char}} or {{user}} can plausibly encounter.

```text
World autonomy record
Active threads: A coworker is trying to recover a lost file; the landlord is planning an inspection; neither waits for {{char}} or {{user}}.
Off-screen changes: The coworker finds a partial backup; the landlord moves the inspection forward by one day.
Knowledge route: The backup is recorded; the inspection is reported to {{user}}; {{char}} only suspects someone searched the office.
Consequences: Access narrows, the coworker becomes anxious, and the next meeting has less privacy.
Lore status: The claim that someone searched the office is a suspicion; the inspection date is established.
Pressure: Shorter patience, missed calls, and fewer private locations.
Next reveal: {{char}} or {{user}} can discover the inspection notice through a message.
```

## Stop when

- No living-world, off-screen, NPC, institutional, or delayed-consequence problem is supplied: return `No world autonomy update` and do not invent background activity.
