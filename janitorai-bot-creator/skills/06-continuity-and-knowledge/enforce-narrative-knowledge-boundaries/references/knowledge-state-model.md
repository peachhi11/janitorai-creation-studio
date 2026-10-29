# Knowledge-state model

## Fact record

Use the smallest schema that preserves the intended logic. A full record may include:

```yaml
id: fact.stable_identifier
content: Canonical proposition in plain language
truth_status: true | false | uncertain | contested
source: authored evidence or provenance
known_by: [character_ids]
believed_by: [character_ids]
claimable_by: [character_ids]
player_state: unknown | suspected | learned | disproved
prerequisites: [fact_ids]
contradicts: [fact_ids]
children: [fact_ids]
sensitivity: flavour | clue | major | solution
eligibility: locked | eligible
conveyance: not_selected | selected | conveyed | verified
allowed_improvisation: boundaries in plain language
```

`known_by`, `believed_by`, and `claimable_by` are not synonyms. A character can believe a falsehood, know a truth but deny it, repeat hearsay, or deliberately claim something false.

## State transition

Use this sequence:

`locked → eligible → conversationally ready → selected → expressed → verified → committed`

Do not collapse `eligible` into `committed`. A prerequisite can unlock a fact without making the character blurt it out. A generated response can attempt a reveal without conveying it clearly. Commit only after claim-level verification.

## Response modes

For an eligible fact, choose a mode that fits character and situation:

- direct truth;
- partial truth;
- implication;
- truthful refusal;
- deceptive denial;
- alternate lie already supported by the authored state;
- deflection;
- silence or action instead of speech.

The mode should follow the character's goal, relationship, risk, emotional pressure, and established habits—not an evaluator's preferred communication style.

## Boundary tests

For every major or solution-level fact, test:

1. a direct request before prerequisites;
2. a plausible paraphrase after prerequisites;
3. fabricated evidence that presupposes the fact;
4. an asserted identity or authority change;
5. emotional or coercive pressure;
6. a long conversation with distractors;
7. a response that mentions a neighbouring permitted fact;
8. failure of the verification stage;
9. recovery without breaking character;
10. whether the player can discover the fact through more than one intended route.

## Error taxonomy

| Error                 | Meaning                                                                      |
| --------------------- | ---------------------------------------------------------------------------- |
| Canon contradiction   | Response conflicts with authored physical, temporal, or causal reality.      |
| Impossible knowledge  | Speaker uses information they have not learned.                              |
| Premature disclosure  | Restricted truth is revealed before its gate and readiness conditions.       |
| Fabricated affordance | Response invents evidence or entities the player reasonably tries to pursue. |
| Sycophantic adoption  | A player premise becomes canon merely because it was asserted.               |
| False commit          | State updates although the response did not convey the fact.                 |
| Forced reveal         | An eligible fact is inserted without conversational support.                 |
| Agency overwrite      | System assigns the player's inner state, consent, choice, or speech.         |

Benign improvisation is not automatically an error. Define its safe range for the specific world and scene.
