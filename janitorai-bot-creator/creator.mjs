import OpenAI from "openai";
import { readFileSync } from "node:fs";
import {
  outputSchema,
  renderCharacter,
  renderMemo,
} from "./character-schema.mjs";
import { getKnowledgeContext } from "./lib/knowledge-context.mjs";
import { loadRuntimeConfig } from "./lib/runtime-config.mjs";
import {
  buildCreateInstructions,
  buildRevisionInstructions,
} from "./lib/creator-policy.mjs";

const config = loadRuntimeConfig();

const instructionText = readFileSync(
  new URL("./prompts/creator.md", import.meta.url),
  "utf8"
);

function resultFor(
  character,
  renderCharacterFn = renderCharacter,
  renderMemoFn = renderMemo
) {
  return {
    character,
    markdown: renderCharacterFn(character),
    memo: renderMemoFn(
      character.Notes.split("\n")
        .map((s) => s.replace(/^-\s*/, "").trim())
        .filter(Boolean)
    ),
  };
}

export function createStandaloneCreator({
  client: creatorClient,
  model,
  instructionText: creatorInstructionText,
  getContext = getKnowledgeContext,
  outputSchema: creatorOutputSchema = outputSchema,
  renderCharacter: renderCharacterFn = renderCharacter,
  renderMemo: renderMemoFn = renderMemo,
}) {
  return {
    async createCharacter({
      concept,
      setting = "",
      preferences = "",
      matureThemes = false,
    }) {
      if (!concept || !concept.trim())
        throw new Error("A character concept is required.");
      const context = getContext([concept, setting, preferences].join(" "));
      const response = await creatorClient.responses.create({
        model,
        instructions: buildCreateInstructions(creatorInstructionText),
        input: [
          `CONCEPT: ${concept}`,
          `SETTING: ${setting}`,
          `PREFERENCES: ${preferences}`,
          `MATURE THEMES REQUESTED: ${matureThemes}`,
          "",
          "REFERENCE EXCERPTS:",
          context || "No local references loaded.",
        ].join("\n"),
        text: {
          format: {
            type: "json_schema",
            name: "janitor_character",
            strict: true,
            schema: creatorOutputSchema,
          },
        },
      });
      if (!response.output_text)
        throw new Error("Model returned no character content.");
      return resultFor(
        JSON.parse(response.output_text),
        renderCharacterFn,
        renderMemoFn
      );
    },

    async reviseCharacter({ existingCharacter, changes }) {
      if (!existingCharacter || !changes?.trim()) {
        throw new Error("Existing character and changes are required.");
      }
      const response = await creatorClient.responses.create({
        model,
        instructions: buildRevisionInstructions(creatorInstructionText),
        input: JSON.stringify({
          character: existingCharacter,
          requestedChanges: changes,
        }),
        text: {
          format: {
            type: "json_schema",
            name: "revised_janitor_character",
            strict: true,
            schema: creatorOutputSchema,
          },
        },
      });
      if (!response.output_text)
        throw new Error("Revision produced no content.");
      return resultFor(
        JSON.parse(response.output_text),
        renderCharacterFn,
        renderMemoFn
      );
    },
  };
}

let defaultCreator;
function getDefaultCreator() {
  defaultCreator ??= createStandaloneCreator({
    client: new OpenAI(),
    model: config.model,
    instructionText,
  });
  return defaultCreator;
}

export async function createCharacter(input) {
  return getDefaultCreator().createCharacter(input);
}

export async function reviseCharacter(input) {
  return getDefaultCreator().reviseCharacter(input);
}
