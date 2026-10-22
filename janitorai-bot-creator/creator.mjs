import OpenAI from "openai";
import { readFileSync } from "node:fs";
import {
  outputSchema,
  renderCharacter,
  renderMemo
} from "./character-schema.mjs";
import { getKnowledgeContext } from "./lib/knowledge-context.mjs";
import { loadRuntimeConfig } from "./lib/runtime-config.mjs";

const config = loadRuntimeConfig();
const client = new OpenAI();

const instructionText = readFileSync(
  new URL("./prompts/creator.md", import.meta.url),
  "utf8"
);

export async function createCharacter({
  concept,
  setting = "",
  preferences = "",
  matureThemes = false
}) {
  if (!concept || !concept.trim()) {
    throw new Error("A character concept is required.");
  }

  const context = getKnowledgeContext(
    [concept, setting, preferences].join(" ")
  );

  const instructions = [
    instructionText,
    "Generate a complete character object.",
    "All fields must contain meaningful content.",
    "All main characters must be adults.",
    "Use {{char}} and {{user}} literally where relevant.",
    "List fields must contain newline-separated items.",
    "For Notes, include continuity and scenario anchors.",
    "For Sexually themed fields, remain within applicable",
    "platform policy and the requested content rating."
  ].join("\n");

  const response = await client.responses.create({
    model: config.model,
    instructions,
    input: [
      `CONCEPT: ${concept}`,
      `SETTING: ${setting}`,
      `PREFERENCES: ${preferences}`,
      `MATURE THEMES REQUESTED: ${matureThemes}`,
      "",
      "REFERENCE EXCERPTS:",
      context || "No local references loaded."
    ].join("\n"),
    text: {
      format: {
        type: "json_schema",
        name: "janitor_character",
        strict: true,
        schema: outputSchema
      }
    }
  });

  if (!response.output_text) {
    throw new Error(
      "Model returned no character content."
    );
  }

  const character = JSON.parse(response.output_text);

  return {
    character,
    markdown: renderCharacter(character),
    memo: renderMemo(
      character.Notes
        .split("\n")
        .map(s => s.replace(/^-\s*/, "").trim())
        .filter(Boolean)
    )
  };
}

export async function reviseCharacter({
  existingCharacter,
  changes
}) {
  if (!existingCharacter || !changes?.trim()) {
    throw new Error(
      "Existing character and changes are required."
    );
  }

  const response = await client.responses.create({
    model: config.model,
    instructions: [
      instructionText,
      "Revise this existing character object.",
      "Change only requested details and their",
      "necessary continuity dependencies.",
      "Preserve all required fields.",
      "Return the complete updated character object."
    ].join("\n"),
    input: JSON.stringify({
      character: existingCharacter,
      requestedChanges: changes
    }),
    text: {
      format: {
        type: "json_schema",
        name: "revised_janitor_character",
        strict: true,
        schema: outputSchema
      }
    }
  });

  if (!response.output_text) {
    throw new Error("Revision produced no content.");
  }

  const character = JSON.parse(response.output_text);

  return {
    character,
    markdown: renderCharacter(character),
    memo: renderMemo(
      character.Notes
        .split("\n")
        .map(s => s.replace(/^-\s*/, "").trim())
        .filter(Boolean)
    )
  };
}

