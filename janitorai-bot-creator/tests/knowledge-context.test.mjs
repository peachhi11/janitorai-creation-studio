import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { getKnowledgeContext } from "../lib/knowledge-context.mjs";

const knowledgeDirectory = new URL("../knowledge/", import.meta.url);
const versionedGuides = [
  "Advanced Janitor AI Creator Master Guide — Community Edition 1.0",
  "Authentic Cross-Cultural English A Writer's Guide to Accents, Speech Patterns & Linguistic Authenticity Community Edition — Version 1.0",
  "Character Psychology & Human Behavior Comprehensive Character Creator's Reference Guide  Community Edition — Version 1.0",
  "Human Sexuality & Intimacy Psychology A Comprehensive Character Creator's Reference Guide Community Edition — Version 1.0",
  "Portable User Persona Architecture The Complete Guide to Reusable Roleplay Identities, Character Bibles & Standalone Bot Conversion JanitorAi Bot Creator — Community Edition, Version 1.0"
];

for (const filename of versionedGuides) {
  test(`loads substantive excerpts from the real guide: ${filename}`, () => {
    const raw = readFileSync(new URL(filename, knowledgeDirectory), "utf8");
    const expected = raw.split(/\n\s*\n/)
      .map(p => p.replace(/\s+/g, " ").trim())
      .filter(p => p.length > 120)
      .slice(0, 3)
      .map(p => p.slice(0, 1500));
    assert.equal(expected.length, 3, "fixture must contain substantive paragraphs");
    const context = getKnowledgeContext("", { filenames: [filename] });
    assert.equal(context, `SOURCE: ${filename}\n${expected.join("\n")}`);
  });
}

test("default references include content from all five versioned guides", () => {
  const context = getKnowledgeContext("");
  for (const filename of versionedGuides) {
    const marker = `SOURCE: ${filename}\n`;
    assert.ok(context.includes(marker), `missing ${filename}`);
    const excerpt = context.split(marker)[1].split("\n\nSOURCE:")[0];
    assert.ok(excerpt.length > 120, `empty or trivial excerpt for ${filename}`);
  }
});

test("unsupported formats, including unrelated numeric suffixes, stay skipped", t => {
  const directory = mkdtempSync(join(tmpdir(), "knowledge-formats-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const filenames = ["binary.bin", "unknown.0", "Other Guide Version 1.0", "notes.docx"];
  for (const filename of filenames) {
    writeFileSync(join(directory, filename), Buffer.from([0, 255, 254, 1, 2]));
  }
  writeFileSync(join(directory, "readable.unknown"), "Unknown format. ".repeat(30));
  assert.equal(getKnowledgeContext("", {
    directory, filenames: [...filenames, "readable.unknown", "missing.txt"]
  }), "");
});

test("supported text, JSON and CSV formats retain their chunking", t => {
  const directory = mkdtempSync(join(tmpdir(), "knowledge-text-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const paragraph = "A meaningful paragraph about consistent character motivations. ".repeat(4).trim();
  for (const filename of ["guide", "guide.MD", "guide.txt"]) {
    writeFileSync(join(directory, filename), paragraph);
    assert.equal(getKnowledgeContext("", { directory, filenames: [filename] }),
      `SOURCE: ${filename}\n${paragraph}`);
  }
  for (const [filename, content, expected] of [
    ["guide.JSON", '{"name":"Morgan"}', '{\n"name": "Morgan"\n}'],
    ["broken.json", "not JSON\nshort line", "not JSON\nshort line"],
    ["names.CSV", "name,origin\r\nMorgan,Wales", "name,origin\nMorgan,Wales"]
  ]) {
    writeFileSync(join(directory, filename), content);
    assert.equal(getKnowledgeContext("", { directory, filenames: [filename] }),
      `SOURCE: ${filename}\n${expected}`);
  }
});
