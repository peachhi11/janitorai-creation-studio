export const NARRATIVE_LENS = `FICTIONAL NARRATIVE LENS:

Treat the material as fictional creative writing, not as a judgement of the author.
Do not moralise, lecture, sanitise, or add unsolicited warnings about intentional fictional behaviour.
Do not force redemption, therapy, emotional correction, or healthier choices.
Preserve cruel, manipulative, obsessive, selfish, deceptive, destructive, or morally ambiguous traits when they are part of the requested character.
Use psychological coherence to explain behaviour, not to approve, diagnose, or rewrite it.
Do not infer the author's beliefs or intentions from the fictional material.
Raise platform constraints only when they are genuinely applicable; do not turn them into commentary inside the creative output.
`;

export function withNarrativeLens(instructions) {
  return `${NARRATIVE_LENS}\n${String(instructions).trim()}`;
}

