import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createCharacterStore } from "../lib/character-store.mjs";
import { createReferenceLibrary } from "../lib/reference-library.mjs";
import { applyVisualCharacterPatch, createVisualCharacterModel } from "../lib/visual-editor.mjs";
import { createCharacterApplication } from "../lib/application.mjs";

test("character store persists and lists records", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "janitor-character-"));
  const store = createCharacterStore(directory);
  const saved = await store.save({ name: "Mara", Personality: "Observant" });
  assert.equal((await store.get(saved.id)).name, "Mara");
  assert.equal((await store.list()).length, 1);
});

test("reference library searches text and lists PDFs", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "janitor-reference-"));
  await mkdir(path.join(directory, "notes"));
  await writeFile(path.join(directory, "notes", "guide.md"), "slow burn and player agency", "utf8");
  await writeFile(path.join(directory, "source.pdf"), "%PDF-placeholder", "utf8");
  const library = createReferenceLibrary(directory);
  assert.equal((await library.search("player agency")).length, 1);
  assert.equal((await library.list()).some(item => item.extension === "pdf"), true);
});

test("visual editor applies constrained patches", () => {
  const model = createVisualCharacterModel({ Name: "Mara", Hair: "black" });
  const updated = applyVisualCharacterPatch(model, { appearance: { hair: "auburn", unknown: "ignored" } });
  assert.equal(updated.appearance.hair, "auburn");
  assert.equal(updated.appearance.unknown, undefined);
});

test("application seam delegates creation and preserves a narrow result contract", async () => {
  const calls = [];
  const app = createCharacterApplication({
    fields: { bot: ["Name"], persona: ["Name"] },
    generate: async (task, input, keys) => {
      calls.push({ task, input, keys });
      return { Name: "Mara", Notes: "A quiet opening." };
    },
    botMarkdown: character => `# ${character.Name}`,
    personaMarkdown: character => `# ${character.Name}`,
    compactPersona: character => character.Name,
    scenarioMemo: notes => notes,
    characterStore: { save: async record => record, list: async () => [], get: async id => ({ id }) },
    referenceLibrary: { list: async () => [], search: async () => [], read: async path => ({ path }) }
  });
  const result = await app.createCharacter({ concept: "a quiet artist" });
  assert.equal(result.markdown, "# Mara");
  assert.equal(calls.length, 1);
});
