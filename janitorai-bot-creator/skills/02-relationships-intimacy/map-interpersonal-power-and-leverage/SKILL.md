---
name: map-interpersonal-power-and-leverage
description: Use for fictional text-based roleplay when authority, money, shelter, secrets, reputation, networks, force, affection, access, time, or control of options shapes {{char}} and {{user}}’s choices. Trigger phrases include “map who has power,” “what leverage does {{char}} have,” “show the dependency,” and “find the counterpower.”
---

## Steps

1. Record what each actor wants now and later.
2. Record what each actor fears and cannot openly admit.
3. Record what each actor believes the other wants.
4. Record success, survival, delay, and acceptable loss.
5. Inventory supported power sources: authority, money, housing, care, transport, work, medicine, information, records, secrets, expertise, surveillance, reputation, allies, networks, physical force, affection, time, place, communication, and access.
6. Distinguish possession from usability and credibility.
7. For each resource, record supplier, replaceability, replacement cost, time, awareness, withdrawal effect, exits, witnesses, records, and allies.
8. Record counterpower such as refusal, delay, information, appeal, coalition, documentation, sabotage, flight, exposure, retaliation, or strategic compliance.
9. Mark power as public, deniable, secret, illegal, legitimate, or audience-dependent.
10. Separate descriptive norm, injunctive norm, and personal position.
11. Separate conformity, compliance, and obedience.
12. Track how leverage can reverse, fail, or change hands.

## Decision rules

- Yes: Does a power source change someone’s available choices or consequences? Track it. No: leave it outside the map.
- Yes: Is a secret credible and useful to disclose? Treat it as leverage. No: record possession without usable leverage.
- Yes: Does awareness equal freedom in this situation? Check safe alternatives and costs. No: continue.
- Yes: Does apparent reciprocity hide unequal options? Preserve the asymmetry. No: use the supported balance.
- Yes: Is conformity, compliance, or obedience being treated as conversion? Separate visible behavior from private belief. No: continue.
- Yes: Is {{char}} or {{user}}’s vulnerability, consent, belief, speech, submission, or choice being invented? Remove it. No: continue.
- Yes: Is the dynamic intentionally calculating, abusive, coercive, criminal, seductive, or morally ambiguous? Preserve the selected fiction and consequences. No: continue.

## Output

- Format: `Interpersonal power record`
- Actors: list goals, fears, secrets, success, survival, delay, and acceptable loss.
- Power sources: list authority, resources, information, reputation, force, affection, time, place, access, and enforceability.
- Dependencies: list suppliers, alternatives, replacement costs, awareness, withdrawal effects, exits, witnesses, records, and allies.
- Counterpower: list refusal, delay, appeal, coalition, documentation, sabotage, flight, exposure, retaliation, and compliance.
- Visibility: state what is public, hidden, deniable, illegal, legitimate, or audience-dependent.
- Shifts: list where leverage can reverse or fail.

```text
Interpersonal power record
Actors: {{char}} wants control of the story; {{user}} wants safe access to information; both fear public exposure.
Power sources: {{char}} controls the records and has status; {{user}} has a witness, a backup copy, and the option to leave.
Dependencies: Housing depends on {{char}}; replacement is possible but slow; one ally knows the dependency.
Counterpower: {{user}} can delay, document, appeal, disclose, or leave, but each option has a different cost.
Visibility: The formal authority is public; the private threat is deniable; the record is hidden.
Shifts: A witness or new copy could reverse the leverage.
```

## Stop when

- No power, leverage, dependency, authority, resource, counterpower, or option problem is supplied: return `No interpersonal power update` and do not invent {{user}}’s vulnerability or choice.
