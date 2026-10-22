import OpenAI from "openai";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import {
  outputSchema,
  renderCharacter,
  renderMemo
} from "./character-schema.mjs";
import { loadRuntimeConfig } from "./lib/runtime-config.mjs";

const config = loadRuntimeConfig();
const client = new OpenAI();

const instructionText = readFileSync(
  new URL("./prompts/creator.md", import.meta.url),
  "utf8"
);

const knowledgeDirectory = new URL(
  "./knowledge/",
  import.meta.url
);

const references = [
  "ENHANCED Advanced Janitor AI Bot Creator Prompt.pdf",
  "Character Psychology & Human Behavior Guide.pdf",
  "Human Sexuality & Intimacy Psychology: A Character Creator's Comprehensive Database.pdf",
  "Authentic Cross-Cultural English.pdf"
];

// Optional local PDF extraction.
// Requires the Poppler `pdftotext` command.
function getKnowledgeContext(concept) {
  const extracted = [];

  const keywords = concept
    .toLowerCase()
    .match(/[a-z]{5,}/g) ?? [];

  for (const filename of references) {
    const filePath = join(
      knowledgeDirectory.pathname,
      filename
    );

    if (!existsSync(filePath)) continue;

    try {
      const fullText = execFileSync(
        "pdftotext",
        ["-layout", filePath, "-"],
        {
          encoding: "utf8",
          maxBuffer: 15 * 1024 * 1024
        }
      );

      const paragraphs = fullText
        .split(/\n\s*\n/)
        .map(p => p.replace(/\s+/g, " ").trim())
        .filter(p => p.length > 120);

      const selected = paragraphs
        .map(p => ({
          text: p,
          score: keywords.reduce(
            (sum, word) =>
              sum + Number(p.toLowerCase().includes(word)),
            0
          )
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(p => p.text.slice(0, 1500));

      extracted.push(
        `SOURCE: ${filename}\n${selected.join("\n")}`
      );
    } catch {
      // Missing converter: continue without this PDF.
    }
  }

  return extracted.join("\n\n").slice(0, 18000);
}

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
