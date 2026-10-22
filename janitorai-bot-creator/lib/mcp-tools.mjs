import { z } from "zod";

function result(payload, display = JSON.stringify(payload, null, 2)) {
  return { content: [{ type: "text", text: display }], structuredContent: payload };
}

function errorResult(error) {
  return {
    isError: true,
    content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }]
  };
}

function tool(server, name, description, inputSchema, fn) {
  server.registerTool(
    name,
    { title: name.replaceAll("_", " "), description, inputSchema },
    async args => {
      try {
        const value = await fn(args);
        return result(value.payload ?? value, value.display);
      } catch (error) {
        return errorResult(error);
      }
    }
  );
}

export function registerMcpTools(server, app) {
  tool(server, "create_character", "Generate a complete Janitor AI bot character sheet.", {
    concept: z.string().min(1), setting: z.string().optional(), preferences: z.string().optional(),
    promptPreset: z.string().optional()
  }, async input => {
    const value = await app.createCharacter(input);
    return { payload: value, display: value.markdown };
  });

  tool(server, "revise_character", "Revise an existing bot while preserving established canon.", {
    character: z.record(z.string()), changes: z.string().min(1)
  }, async input => {
    const value = await app.reviseCharacter(input);
    return { payload: value, display: value.markdown };
  });

  tool(server, "create_user_persona", "Create an independent reusable roleplay persona with full biography and compact export.", {
    concept: z.string().min(1), preferences: z.string().optional(),
    maxChars: z.number().int().min(300).max(10000).optional()
  }, async input => {
    const value = await app.createUserPersona(input);
    return { payload: value, display: `# Character Bible\n\n${value.bible}\n\n# Compact Persona\n\n${value.compact}` };
  });

  tool(server, "adapt_persona_to_bot", "Create a world-specific and bot-specific adaptation without altering permanent persona canon.", {
    persona: z.record(z.string()), botDescription: z.string().min(1), scenario: z.string().optional()
  }, async input => {
    const value = await app.adaptPersonaToBot(input);
    return { payload: value, display: value.markdown };
  });

  tool(server, "update_persona_canon", "Promote explicitly selected roleplay discoveries into a persona's permanent character bible.", {
    persona: z.record(z.string()), selectedDevelopments: z.array(z.string()).min(1),
    continuityNotes: z.string().optional()
  }, async input => {
    const value = await app.updatePersonaCanon(input);
    return { payload: value, display: value.bible };
  });

  tool(server, "promote_persona_to_character", "Convert a portable user persona into a complete Janitor AI bot definition.", {
    persona: z.record(z.string()), setting: z.string().optional(), intendedScenario: z.string().optional()
  }, async input => {
    const value = await app.promotePersonaToCharacter(input);
    return { payload: value, display: value.markdown };
  });

  tool(server, "save_character", "Persist a complete character or persona record in the local character library.", {
    record: z.record(z.unknown())
  }, async ({ record }) => {
    const value = await app.saveCharacter(record);
    return { payload: value, display: JSON.stringify(value, null, 2) };
  });

  tool(server, "list_characters", "List persisted character records without exposing secrets.", {}, async () => {
    const records = await app.listCharacters();
    return { payload: { records: records.map(({ id, name, Name, updatedAt, createdAt }) => ({ id, name: name || Name, updatedAt, createdAt })) }, display: JSON.stringify(records, null, 2) };
  });

  tool(server, "get_character", "Retrieve one persisted character record by ID.", {
    id: z.string().min(1)
  }, async ({ id }) => {
    const value = await app.getCharacter(id);
    return { payload: value, display: JSON.stringify(value, null, 2) };
  });

  tool(server, "list_references", "List local Markdown, text, JSON, and PDF references available to the creator.", {}, async () => {
    const value = await app.listReferences();
    return { payload: { references: value }, display: JSON.stringify(value, null, 2) };
  });

  tool(server, "search_references", "Search the configured reference library and return excerpts with source paths.", {
    query: z.string().min(1)
  }, async ({ query }) => {
    const value = await app.searchReferences(query);
    return { payload: { query, matches: value }, display: JSON.stringify(value, null, 2) };
  });

  tool(server, "read_reference", "Read a selected reference. PDF extraction uses pdftotext when installed.", {
    path: z.string().min(1)
  }, async ({ path }) => {
    const value = await app.readReference(path);
    return { payload: value, display: value.text || value.message || JSON.stringify(value) };
  });

  tool(server, "create_visual_character_model", "Convert a character record into an editable visual-character model.", {
    character: z.record(z.unknown())
  }, async ({ character }) => {
    const value = await app.createVisualCharacterModel(character);
    return { payload: value, display: JSON.stringify(value, null, 2) };
  });

  tool(server, "update_visual_character_model", "Apply a constrained visual edit without changing unrelated character fields.", {
    model: z.record(z.unknown()), patch: z.record(z.unknown())
  }, async ({ model, patch }) => {
    const value = await app.updateVisualCharacterModel(model, patch);
    return { payload: value, display: JSON.stringify(value, null, 2) };
  });
}
