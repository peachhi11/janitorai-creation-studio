import test from "node:test";
import assert from "node:assert/strict";
import { createPromptPresetLibrary } from "../lib/prompt-presets.mjs";

test("prompt presets are opt-in and discoverable", async () => {
  const library = createPromptPresetLibrary();
  assert.deepEqual(library.list(), ["dark-romance"]);
  const preset = await library.get("dark-romance");
  assert.equal(preset.genre, "dark-romance");
  assert.equal(preset.portrayal, "unsanitized");
});

test("unknown prompt presets fail explicitly", async () => {
  await assert.rejects(
    () => createPromptPresetLibrary().get("missing"),
    /Unknown prompt preset/
  );
});
