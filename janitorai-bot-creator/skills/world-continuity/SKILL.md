---
name: world-continuity
description: Use for text-based roleplay in a contemporary or contemporary-adjacent setting when technology, communication, institutions, social habits, or daily routines need to affect the scene. Trigger phrases include “make the setting feel current,” “check the world continuity,” “what could {{char}} or {{user}} realistically know,” and “track the setting’s consequences.”
---

## Steps

1. Confirm that the roleplay uses a contemporary or contemporary-adjacent setting.
2. Set the date and time period.
3. Set the location and relevant subculture.
4. Record the available communication systems.
5. Record transport and access limits.
6. Record work, school, household, and institutional routines.
7. Set the boundary between public and private life.
8. Separate project facts from likely defaults.
9. Check how devices, messages, calls, group chats, social media, or silence affect what {{char}} and {{user}} know.
10. Check how battery, connectivity, device access, privacy, and screenshots affect what they can do.
11. Check how travel time, traffic, public transit, rideshare, and location sharing affect timing.
12. Check how work, school, and asynchronous schedules affect availability.
13. Check how reputation, audiences, and information spread affect social pressure.
14. Check whether online presentation differs from in-person behavior.
15. At each scene change, update locations, time passed, records, messages, witnesses, and intervening obligations.
16. Keep institutions, friends, coworkers, family, and strangers active beyond the needs of the immediate scene.

## Decision rules

- Yes: Is the setting contemporary or contemporary-adjacent? Apply this skill. No: stop and use the project’s selected historical, speculative, or culturally specific frame.
- Yes: Does a technology or social system affect knowledge, choice, timing, pressure, or consequences? Include it. No: leave it in the background.
- Yes: Is a detail only present to make the scene feel current? Remove it. No: keep it when it changes the scene.
- Yes: Could the information realistically reach {{char}} or {{user}} by this point? Include it in their knowledge. No: keep it unknown, suspected, or unavailable.
- Yes: Does the selected location or social setting change expected behavior? Apply that change. No: preserve the established behavior.
- Yes: Do institutions or other people have activity outside the current scene? Keep that activity running. No: add an independent priority or routine.
- Yes: Has the author selected a different historical, speculative, or culturally specific frame? Follow that frame. No: use the established contemporary frame.

## Output

- Format: `World continuity record`
- Setting: state the date, location, social frame, and project canon.
- Systems: list communication, transport, institutions, work, school, and household routines.
- Current state: list locations, time passed, devices, records, messages, witnesses, and obligations.
- Knowledge: state what {{char}} and {{user}} know, suspect, or cannot know yet.
- Pressure: list effects on timing, access, privacy, choice, reputation, and consequences.
- Autonomy: list relevant activity continuing outside the immediate scene.
- Open questions: list continuity details that need a decision.

```text
World continuity record
Setting: Contemporary Melbourne, Friday evening; the private apartment and the surrounding transit network are established canon.
Systems: {{char}} has a phone with limited battery; {{user}} can use public transport; both have work obligations the next morning.
Current state: {{char}} is at home; {{user}} is twenty minutes away; one unanswered message exists; no witness has seen the exchange.
Knowledge: {{char}} knows {{user}} is travelling but does not know the exact route; {{user}} knows {{char}} is waiting at home.
Pressure: Travel time limits the conversation; the low battery limits contact; privacy makes the disclosure possible.
Autonomy: Friends and coworkers continue their own evening plans outside the scene.
Open questions: Decide whether the next train is delayed and whether either character shares a screenshot.
```

## Stop when

- No contemporary setting or continuity change is supplied: return `No world continuity update` and do not add present-day details.
