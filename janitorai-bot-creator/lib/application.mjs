import { createVisualCharacterModel, applyVisualCharacterPatch } from "./visual-editor.mjs";

export function createCharacterApplication({
  generate,
  fields,
  personaMarkdown,
  compactPersona,
  botMarkdown,
  scenarioMemo,
  characterStore,
  referenceLibrary,
  promptPresets
}) {
  const botResult = character => {
    const markdown = botMarkdown(character);
    return { character, markdown, memo: scenarioMemo(character.Notes) };
  };

  return {
    async createCharacter(input) {
      const preset = input.promptPreset
        ? await promptPresets.get(input.promptPreset)
        : null;
      const task = [
        "Create a full Janitor AI bot definition.",
        preset
          ? `Apply this explicitly selected authorial prompt preset without treating it as universal policy: ${JSON.stringify(preset)}`
          : ""
      ].filter(Boolean).join("\n");
      return botResult(await generate(task, {
        ...input,
        selectedPromptPreset: preset
      }, fields.bot));
    },

    async reviseCharacter(input) {
      return botResult(await generate(
        "Revise the existing bot. Preserve all unrequested details. Return a complete replacement definition.",
        input,
        fields.bot
      ));
    },

    async createUserPersona(input) {
      const persona = await generate(
        "Create a complete portable fictional identity. Do not include facts that require any particular bot or setting.",
        input,
        fields.persona
      );
      const bible = personaMarkdown(persona);
      const compact = compactPersona(persona, input.maxChars ?? 2000);
      return {
        schemaVersion: "1.1.0",
        core: persona,
        adaptations: [],
        roleplayHistory: [],
        bible,
        compact
      };
    },

    async adaptPersonaToBot(input) {
      const keys = [
        "Setting", "Occupation", "World Background",
        "Appearance Adjustments", "Abilities and Limits",
        "Reason for Meeting", "First Impressions",
        "Possible Chemistry", "Potential Conflicts",
        "Boundaries", "Story Hooks", "Canon Compatibility Notes"
      ];
      const adaptation = await generate(
        "Create a roleplay adaptation. Preserve the entire supplied permanent identity. Do not declare the bot's feelings or choices as facts. Clearly distinguish new invented lore from supplied canon.",
        input,
        keys
      );
      return {
        core: input.persona,
        adaptation,
        markdown: Object.entries(adaptation).map(([key, value]) => `## ${key}\n${value}`).join("\n\n")
      };
    },

    async updatePersonaCanon(input) {
      const core = await generate(
        "Incorporate ONLY the explicitly selected developments into permanent canon. Retain the persona's original identity. Do not transfer any other roleplay events. Return every original persona field.",
        input,
        fields.persona
      );
      return {
        previous: input.persona,
        core,
        promoted: input.selectedDevelopments,
        bible: personaMarkdown(core),
        compact: compactPersona(core)
      };
    },

    async promotePersonaToCharacter(input) {
      return botResult(await generate(
        "Convert this established persona into a Janitor AI bot. Preserve appearance, personality, motivations, voice, personal history, flaws and values. Expand the persona into the full bot template without overwriting established core canon.",
        input,
        fields.bot
      ));
    },

    saveCharacter: record => characterStore.save(record),
    listCharacters: () => characterStore.list(),
    getCharacter: id => characterStore.get(id),
    listCharacterRevisions: id => characterStore.listRevisions(id),
    getCharacterRevision: (id, revisionId) => characterStore.getRevision(id, revisionId),
    restoreCharacterRevision: (id, revisionId) => characterStore.restoreRevision(id, revisionId),
    listReferences: () => referenceLibrary.list(),
    searchReferences: query => referenceLibrary.search(query),
    readReference: path => referenceLibrary.read(path),
    createVisualCharacterModel: character => Promise.resolve(createVisualCharacterModel(character)),
    updateVisualCharacterModel: (model, patch) => Promise.resolve(applyVisualCharacterPatch(model, patch))
  };
}
