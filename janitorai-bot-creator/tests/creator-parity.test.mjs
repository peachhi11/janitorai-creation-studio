import test from "node:test";
import assert from "node:assert/strict";

import { fields as standaloneFields } from "../character-schema.mjs";
import { createStandaloneCreator } from "../creator.mjs";
import { createCharacterApplication } from "../lib/application.mjs";
import { createCharacterGeneration } from "../lib/character-generation.mjs";

function completeCharacter(fields, prefix) {
  return Object.fromEntries(
    fields.map((field) => [field, `${prefix} ${field}`])
  );
}

test("standalone and MCP generation paths preserve the same result contract", async () => {
  const standaloneCharacter = completeCharacter(standaloneFields, "Standalone");
  standaloneCharacter.Notes = "Keep continuity\nPreserve agency";
  const botCharacter = completeCharacter(
    createCharacterGeneration({ ai: {}, model: "unused" }).fields.bot,
    "MCP"
  );
  botCharacter.Notes = "Keep continuity\nPreserve agency";
  const requests = [];
  const ai = {
    responses: {
      create: async (request) => {
        requests.push(request);
        return {
          output_text: JSON.stringify(
            request.text.format.name === "janitor_character"
              ? standaloneCharacter
              : botCharacter
          ),
        };
      },
    },
  };

  const standalone = createStandaloneCreator({
    client: ai,
    model: "test-model",
    instructionText: "Standalone creator instructions",
    getContext: () => "Reference evidence",
  });
  const legacyResult = await standalone.createCharacter({
    concept: "an archivist",
  });

  const generation = createCharacterGeneration({ ai, model: "test-model" });
  const application = createCharacterApplication({
    ...generation,
    characterStore: {
      save() {},
      list() {},
      get() {},
      listRevisions() {},
      getRevision() {},
      restoreRevision() {},
    },
    referenceLibrary: { list() {}, search() {}, read() {} },
    promptPresets: { get: async () => null },
    knowledgeContext: async () => ({ text: "", sources: [] }),
  });
  const mcpResult = await application.createCharacter({
    concept: "an archivist",
    useReferences: false,
  });

  assert.deepEqual(Object.keys(legacyResult).sort(), [
    "character",
    "markdown",
    "memo",
  ]);
  assert.deepEqual(Object.keys(mcpResult).sort(), [
    "character",
    "markdown",
    "memo",
    "referenceSources",
  ]);
  assert.match(legacyResult.markdown, /<\{\{char\}\}>/);
  assert.match(mcpResult.markdown, /<\{\{char\}\}>/);
  assert.match(legacyResult.memo, /<scenario memo>/);
  assert.match(mcpResult.memo, /<scenario memo>/);
  assert.ok(
    requests.every((request) =>
      request.instructions.includes("FICTIONAL NARRATIVE LENS")
    )
  );
});
