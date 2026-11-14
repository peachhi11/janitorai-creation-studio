import test from "node:test";
import assert from "node:assert/strict";
import { createCharacterApplication } from "../lib/application.mjs";

function appWith(retrieve) {
  return createCharacterApplication({
    generate: async (task, input) => ({ Notes: task + "\n" + input.referenceContext }),
    fields: { bot: ["Notes"], persona: ["Name"] },
    personaMarkdown: () => "",
    compactPersona: () => "",
    botMarkdown: character => character.Notes,
    scenarioMemo: notes => notes,
    characterStore: {},
    referenceLibrary: {},
    promptPresets: { get: async () => null },
    knowledgeContext: retrieve
  });
}

test("active character generation receives manifest-backed context and provenance", async () => {
  const calls = [];
  const app = appWith(async (query, options) => {
    calls.push({ query, options });
    return { text: "SOURCE: guide.txt\nA grounded excerpt.", sources: [{ id: "guide", path: "guide.txt" }] };
  });
  const result = await app.createCharacter({ concept: "a forensic archivist", setting: "modern London" });
  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /forensic archivist/);
  assert.match(result.character.Notes, /grounded excerpt/);
  assert.deepEqual(result.referenceSources, [{ id: "guide", path: "guide.txt" }]);
});

test("reference retrieval can be disabled explicitly", async () => {
  let called = false;
  const app = appWith(async () => { called = true; return { text: "unexpected", sources: [] }; });
  const result = await app.createCharacter({ concept: "a chef", useReferences: false });
  assert.equal(called, false);
  assert.equal(result.referenceSources.length, 0);
});
