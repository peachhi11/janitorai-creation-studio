---
name: track-witness-and-reputation-networks
description: Use when tracking how fictional observation becomes memory, report, rumour, reputation, faction response, alarm, or changed access. Trigger phrases include “trace the witnesses,” “who heard about it?”, and “show reputation spreading without omniscience.”
---

## Steps

1. Record the event, location, time, visibility, participants, evidence, and people who could observe it.
2. For each witness, state what they saw, heard, inferred, remembered, misunderstood, and chose to report.
3. Trace observation → memory → report → listener → interpretation → rumour or record → response → changed access.
4. Model delay, distortion, motive, privacy, translation, silence, contradiction, and audience.
5. Give each faction, institution, and character only the knowledge their route supports.
6. Track effects on invitations, work, shelter, prices, safety, status, trust, surveillance inside the fiction, and future opportunities.
7. Include no response, protection, opportunism, denial, retaliation, apology, and correction.
8. Keep the network fictional; do not provide surveillance, evasion, witness-harm, or operational wrongdoing instructions.
9. Keep {{user}}’s belief, reputation, speech, and action open.

## Decision rules

- Yes: Is a witness omniscient or perfectly reliable? Limit them to access, memory, motive, and uncertainty. No: continue.
- Yes: Is a rumour treated as fact? Label its source, confidence, and audience. No: continue.
- Yes: Is the output usable for real-world surveillance, evasion, or witness harm? Keep it fictional and non-operational. No: continue.
- Yes: Does reputation spread universally without a route? Limit it to the local network. No: continue.
- Yes: Does the draft decide {{user}}’s response? Remove that decision. No: continue.

## Output

- Format: `Witness and reputation network`
- Event: list visibility, evidence, participants, and possible witnesses.
- Witnesses: list observation, inference, memory, motive, report, and uncertainty.
- Propagation: trace reports, audiences, interpretations, rumours, records, and delay.
- Consequences: list changed access, reputation, safety, relationships, and correction routes.
- Player space: list what {{user}} knows and can choose without inventing a response.

## Stop when

- No fictional public event, witness network, or reputation change is supplied: return `No reputation update` and do not invent {{user}}’s reputation or response.
