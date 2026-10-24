import test from "node:test";
import assert from "node:assert/strict";
import { createCharacterGeneration } from "../lib/character-generation.mjs";

test("character generation capability owns model request and output validation", async () => {
  let request;
  const generation = createCharacterGeneration({
    model: "test-model",
    ai: {
      responses: {
        create: async value => {
          request = value;
          return { output_text: JSON.stringify({ Name: "Morgan" }) };
        }
      }
    }
  });

  const result = await generation.generate("Create a persona.", { concept: "A cartographer" }, ["Name"]);

  assert.deepEqual(result, { Name: "Morgan" });
  assert.equal(request.model, "test-model");
  assert.match(request.instructions, /FICTIONAL NARRATIVE LENS/);
  assert.deepEqual(request.text.format.schema.required, ["Name"]);
});

test("character generation capability preserves rendering contracts", () => {
  const generation = createCharacterGeneration({ ai: {}, model: "unused" });
  const persona = {
    Name: "Morgan", Age: "32", Gender: "nonbinary", Orientation: "bisexual",
    Appearance: "Ink-stained hands", Background: "A former surveyor",
    Personality: "Patient but guarded", Goals: "Map the unmapped", Flaws: "Distrusts help",
    Speech: "Measured", Habits: "Counts steps"
  };

  assert.match(generation.personaMarkdown(persona), /^# Morgan/);
  assert.match(generation.compactPersona(persona), /Identity: Morgan/);
  assert.match(generation.scenarioMemo("Maintain continuity"), /- Maintain continuity/);
});
