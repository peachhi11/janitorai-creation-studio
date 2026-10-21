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

test("character store rejects path traversal and writes valid JSON", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "janitor-character-"));
  const store = createCharacterStore(directory);
  await assert.rejects(() => store.save({ id: "../outside", name: "Unsafe" }), /Invalid record identifier/);
  assert.throws(() => store.get("../outside"), /Invalid record identifier/);
  const saved = await store.save({ id: "safe-id", name: "Safe" });
  assert.equal((await store.get("safe-id")).name, "Safe");
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

test("reference library rejects sibling-prefix escape paths", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "janitor-reference-"));
  const library = createReferenceLibrary(directory);
  await assert.rejects(() => library.read("../"), /Path escapes the configured directory/);
});

test("visual editor applies constrained patches", () => {
  const model = createVisualCharacterModel({ Name: "Mara", Hair: "black" });
  const updated = applyVisualCharacterPatch(model, { appearance: { hair: "auburn", unknown: "ignored" } });
  assert.equal(updated.appearance.hair, "auburn");
  assert.equal(updated.appearance.unknown, undefined);
});

test("application seam creates bot output and scenario memo from the generated character", async () => {
  const calls = [];
  const app = createCharacterApplication({
    fields: { bot: ["Name"], persona: ["Name"] },
    generate: async (task, input, keys) => { calls.push({ task, input, keys }); return { Name: "Mara", Notes: "A quiet opening." }; },
    botMarkdown: character => "# " + character.Name,
    personaMarkdown: character => "# " + character.Name,
    compactPersona: character => character.Name,
    scenarioMemo: notes => `<scenario memo>${notes}</scenario memo>`,
    characterStore: { save: async record => record, list: async () => [], get: async id => ({ id }) },
    referenceLibrary: { list: async () => [], search: async () => [], read: async path => ({ path }) }
  });
  const input = { concept: "a quiet artist" };
  const result = await app.createCharacter(input);

  assert.equal(result.markdown, "# Mara");
  assert.equal(result.memo, "<scenario memo>A quiet opening.</scenario memo>");
  assert.deepEqual(calls[0], {
    task: "Create a full Janitor AI bot definition.",
    input,
    keys: ["Name"]
  });
});

test("application seam delegates bot revisions through the current generation contract", async () => {
  const calls = [];
  const app = createCharacterApplication({
    fields: { bot: ["Name"], persona: ["Name"] },
    generate: async (task, input, keys) => {
      calls.push({ task, input, keys });
      return { Name: "Mara", Notes: "Keep the promise." };
    },
    botMarkdown: character => "# " + character.Name,
    personaMarkdown: character => "# " + character.Name,
    compactPersona: character => character.Name,
    scenarioMemo: notes => notes,
    characterStore: { save: async record => record, list: async () => [], get: async id => ({ id }) },
    referenceLibrary: { list: async () => [], search: async () => [], read: async path => ({ path }) }
  });
  const input = { character: { Name: "Mara" }, changes: "Add a promise" };
  const result = await app.reviseCharacter(input);

  assert.equal(result.markdown, "# Mara");
  assert.equal(result.memo, "Keep the promise.");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].task, "Revise the existing bot. Preserve all unrequested details. Return a complete replacement definition.");
  assert.equal(calls[0].input, input);
  assert.deepEqual(calls[0].keys, ["Name"]);
});
