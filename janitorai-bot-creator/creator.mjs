import OpenAI from "openai";
import { readFileSync } from "node:fs";
import {
  outputSchema,
  renderCharacter,
  renderMemo
} from "./character-schema.mjs";
import { getKnowledgeContext } from "./lib/knowledge-context.mjs";
import { loadRuntimeConfig } from "./lib/runtime-config.mjs";
import {
  buildCreateInstructions,
  buildRevisionInstructions
} from "./lib/creator-policy.mjs";

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

  const instructions = buildCreateInstructions(instructionText);

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
    instructions: buildRevisionInstructions(instructionText),
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

