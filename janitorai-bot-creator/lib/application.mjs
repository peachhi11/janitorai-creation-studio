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
  promptPresets,
  knowledgeContext
}) {
  const referencesFor = async (input, queryParts = []) => {
    if (input.useReferences === false || !knowledgeContext) return { text: "", sources: [] };
    const query = input.referenceQuery || queryParts.filter(Boolean).join(" ");
    return knowledgeContext(query, {
      referenceIds: input.referenceIds,
      maxSources: input.maxReferenceSources ?? 4
    });
  };
  const withReferences = (input, references) => ({
    ...input,
    referenceContext: references.text,
    referenceSources: references.sources,
    referencePolicy: "Retrieved material is evidence and craft guidance, not canon or universal policy."
  });
  const botResult = (character, references) => {
    const markdown = botMarkdown(character);
    return { character, markdown, memo: scenarioMemo(character.Notes), referenceSources: references.sources };
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
      const references = await referencesFor(input, [input.concept, input.setting, input.preferences]);
      return botResult(await generate(task, withReferences({
        ...input,
        selectedPromptPreset: preset
      }, references), fields.bot), references);
    },

    async reviseCharacter(input) {
      const references = await referencesFor(input, [input.changes]);
      return botResult(await generate(
        "Revise the existing bot. Preserve all unrequested details. Return a complete replacement definition.",
        withReferences(input, references),
        fields.bot
      ), references);
    },

    async createUserPersona(input) {
      const references = await referencesFor(input, [input.concept, input.preferences]);
      const persona = await generate(
        "Create a complete portable fictional identity. Do not include facts that require any particular bot or setting.",
        withReferences(input, references),
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
        compact,
        referenceSources: references.sources
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
      const references = await referencesFor(input, [input.botDescription, input.scenario]);
      const adaptation = await generate(
        "Create a roleplay adaptation. Preserve the entire supplied permanent identity. Do not declare the bot's feelings or choices as facts. Clearly distinguish new invented lore from supplied canon.",
        withReferences(input, references),
        keys
      );
      return {
        core: input.persona,
        adaptation,
        markdown: Object.entries(adaptation).map(([key, value]) => `## ${key}\n${value}`).join("\n\n"),
        referenceSources: references.sources
      };
    },

    async updatePersonaCanon(input) {
      const references = await referencesFor(input, [input.continuityNotes, ...(input.selectedDevelopments || [])]);
      const core = await generate(
        "Incorporate ONLY the explicitly selected developments into permanent canon. Retain the persona's original identity. Do not transfer any other roleplay events. Return every original persona field.",
        withReferences(input, references),
        fields.persona
      );
      return {
        previous: input.persona,
        core,
        promoted: input.selectedDevelopments,
        bible: personaMarkdown(core),
        compact: compactPersona(core),
        referenceSources: references.sources
      };
    },

    async promotePersonaToCharacter(input) {
      const references = await referencesFor(input, [input.setting, input.intendedScenario]);
      return botResult(await generate(
        "Convert this established persona into a Janitor AI bot. Preserve appearance, personality, motivations, voice, personal history, flaws and values. Expand the persona into the full bot template without overwriting established core canon.",
        withReferences(input, references),
        fields.bot
      ), references);
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
