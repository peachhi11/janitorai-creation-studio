
import test from "node:test";
import assert from "node:assert/strict";

import {
  fields,
  validateCharacter,
  renderCharacter,
  renderMemo
} from "../character-schema.mjs";

function mockCharacter() {
  const data = Object.fromEntries(
    fields.map(key => [key, `Test ${key}`])
  );

  data["Character Name"] = "Morgan";
  data.Habits = "Counts coins\nCollects postcards";
  data.Synonyms = "The traveler\nMorgan";
  data.Notes = "Never forgets a promise\nFears deep water";

  return data;
}

test("all template fields are required", () => {
  const character = mockCharacter();
  assert.equal(validateCharacter(character), true);

  delete character.Origin;

  assert.throws(
    () => validateCharacter(character),
    /Missing character field/
  );
});

test("character renders expected format", () => {
  const result = renderCharacter(mockCharacter());

  assert.ok(result.startsWith("# Setting"));
  assert.ok(result.includes("## Appearance Details"));
  assert.ok(result.includes("## Sexuality"));
  assert.ok(result.includes("## Speech"));
  assert.ok(result.includes("<{{char}}>"));
  assert.ok(result.endsWith("</{{char}}>"));
});

test("scenario memo has expected markers", () => {
  const memo = renderMemo(["Maintain continuity"]);

  assert.ok(memo.includes("<scenario memo>"));
  assert.ok(memo.includes("depth@4"));
  assert.ok(memo.includes("- Maintain continuity"));
  assert.ok(memo.includes("</scenario memo>"));
});
