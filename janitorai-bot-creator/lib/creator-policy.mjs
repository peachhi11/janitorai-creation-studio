import { withNarrativeLens } from "./narrative-lens.mjs";

export function buildCreateInstructions(instructionText) {
  return withNarrativeLens([
    instructionText,
    "Generate a complete character object.",
    "All fields must contain meaningful content.",
    "All main characters must be adults.",
    "Use {{char}} and {{user}} literally where relevant.",
    "List fields must contain newline-separated items.",
    "For Notes, include continuity and scenario anchors.",
    "For Sexually themed fields, remain within applicable",
    "platform policy and the requested content rating."
  ].join("\n"));
}

export function buildRevisionInstructions(instructionText) {
  return withNarrativeLens([
    instructionText,
    "Revise this existing character object.",
    "Change only requested details and their",
    "necessary continuity dependencies.",
    "Preserve all required fields.",
    "Return the complete updated character object."
  ].join("\n"));
}
