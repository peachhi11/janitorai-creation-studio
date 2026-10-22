import OpenAI from "openai";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
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
  "Advanced Janitor AI Creator Master Guide — Community Edition 1.0",
  "Authentic Cross-Cultural English A Writer's Guide to Accents, Speech Patterns & Linguistic Authenticity Community Edition — Version 1.0",
  "Character Psychology & Human Behavior Comprehensive Character Creator's Reference Guide  Community Edition — Version 1.0",
  "Dark Fiction, Moral Ambiguity & Immersive Consent",
  "Human Sexuality & Intimacy Psychology A Comprehensive Character Creator's Reference Guide Community Edition — Version 1.0",
  "Portable User Persona Architecture The Complete Guide to Reusable Roleplay Identities, Character Bibles & Standalone Bot Conversion JanitorAi Bot Creator — Community Edition, Version 1.0",
  "knowledge-manifest.json",
  "unified-names-and-naming-conventions.csv"
];

const missingReferences = references.filter(
  filename => !existsSync(join(fileURLToPath(knowledgeDirectory), filename))
);

if (missingReferences.length > 0) {
  console.warn(
    `[creator] Missing knowledge reference files: ${missingReferences.join(", ")}`
  );
}

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map(p => p.replace(/\s+/g, " ").trim())
    .filter(p => p.length > 120);
}

function splitLines(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.replace(/\s+/g, " ").trim())
    .filter(line => line.length > 0);
}

// Optional local PDF extraction.
// Requires the Poppler `pdftotext` command.
function getKnowledgeContext(concept) {
  const extracted = [];

  const keywords = concept
    .toLowerCase()
    .match(/[a-z]{5,}/g) ?? [];

  for (const filename of references) {
    const filePath = join(
      fileURLToPath(knowledgeDirectory),
      filename
    );

    if (!existsSync(filePath)) continue;

    try {
      const extension = extname(filename).toLowerCase();
      let paragraphs;

      if (extension === ".pdf") {
        const fullText = execFileSync(
          "pdftotext",
          ["-layout", filePath, "-"],
          {
            encoding: "utf8",
            maxBuffer: 15 * 1024 * 1024
          }
        );
        paragraphs = splitParagraphs(fullText);
      } else if (extension === ".json") {
        const raw = readFileSync(filePath, "utf8");
        let text = raw;
        try {
          text = JSON.stringify(JSON.parse(raw), null, 2);
        } catch {
          // Invalid JSON: fall back to raw text.
        }
        paragraphs = splitLines(text);
      } else if (extension === ".csv") {
        paragraphs = splitLines(readFileSync(filePath, "utf8"));
      } else if (extension === "" || extension === ".md" || extension === ".txt") {
        paragraphs = splitParagraphs(readFileSync(filePath, "utf8"));
      } else {
        continue;
      }

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
