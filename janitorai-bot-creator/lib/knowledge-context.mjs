import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const knowledgeDirectory = new URL(
  "../knowledge/",
  import.meta.url
);

const textGuideFilenames = [
  "Advanced Janitor AI Creator Master Guide — Community Edition 1.0",
  "Authentic Cross-Cultural English A Writer's Guide to Accents, Speech Patterns & Linguistic Authenticity Community Edition — Version 1.0",
  "Character Psychology & Human Behavior Comprehensive Character Creator's Reference Guide  Community Edition — Version 1.0",
  "Dark Fiction, Moral Ambiguity & Immersive Consent",
  "Human Sexuality & Intimacy Psychology A Comprehensive Character Creator's Reference Guide Community Edition — Version 1.0",
  "Portable User Persona Architecture The Complete Guide to Reusable Roleplay Identities, Character Bibles & Standalone Bot Conversion JanitorAi Bot Creator — Community Edition, Version 1.0",
];

const references = [
  ...textGuideFilenames,
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
export function getKnowledgeContext(concept, {
  directory = knowledgeDirectory,
  filenames = references
} = {}) {
  const extracted = [];

  const keywords = concept
    .toLowerCase()
    .match(/[a-z]{5,}/g) ?? [];

  for (const filename of filenames) {
    const filePath = join(
      typeof directory === "string" ? directory : fileURLToPath(directory),
      filename
    );

    if (!existsSync(filePath)) continue;

    try {
      // These committed plain-text guides have version numbers, not extensions.
      // Do not generalize this to arbitrary .0 or other unknown file formats.
      const extension = textGuideFilenames.includes(filename)
        ? ".txt"
        : extname(filename).toLowerCase();
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

