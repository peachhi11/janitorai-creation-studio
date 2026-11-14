import { readFileSync } from "node:fs";

const presetFiles = Object.freeze({
  "dark-romance": new URL(
    "../prompts/genre and relationship-intensity preferences",
    import.meta.url
  )
});

export function createPromptPresetLibrary() {
  return {
    list() {
      return Object.keys(presetFiles);
    },

    async get(name) {
      const source = presetFiles[name];
      if (!source) throw new Error(`Unknown prompt preset: ${name}`);
      let value;
      try {
        value = JSON.parse(readFileSync(source, "utf8"));
      } catch (error) {
        throw new Error(`Prompt preset ${name} is invalid: ${error.message}`);
      }
      return Object.freeze({ name, ...value });
    }
  };
}
