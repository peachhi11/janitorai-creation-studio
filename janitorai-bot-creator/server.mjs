import { createServer } from "node:http";
import OpenAI from "openai";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  StreamableHTTPServerTransport
} from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createCharacterStore } from "./lib/character-store.mjs";
import { createReferenceLibrary } from "./lib/reference-library.mjs";
import { applyVisualCharacterPatch, createVisualCharacterModel } from "./lib/visual-editor.mjs";

const VERSION = "1.1.0";
const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";
const ai = new OpenAI();
const characterStore = createCharacterStore();
const referenceLibrary = createReferenceLibrary();

function authorised(req) {
  const configured = process.env.MCP_API_TOKEN;
  if (!configured) return process.env.NODE_ENV !== "production";
  return req.headers.authorization === `Bearer ${configured}`;
}

const fields = {
  persona: [
    "Name", "Age", "Gender", "Orientation",
    "Appearance", "Origin", "Residence",
    "Background", "Core Wound",
    "Personality", "Contradictions", "Values",
    "Strengths", "Flaws", "Fears",
    "Attachment and Defenses", "Habits",
    "Likes", "Dislikes", "Speech",
    "Relationships", "Goals", "Secrets",
    "Intimacy and Boundaries", "Growth Potential"
  ],
  bot: [
    "Time Period", "World Details", "Overview",
    "Race", "Height", "Age", "Hair", "Eyes",
    "Body", "Face", "Features", "Privates",
    "Head", "Accessories", "Makeup", "Neck",
    "Top", "Bottom", "Legs", "Shoes", "Panties",
    "Origin", "Residence", "Connections",
    "Goal", "Secret", "Archetype", "Tags",
    "Likes", "Dislikes", "Deep-Rooted Fears",
    "Details", "When Safe", "When Alone",
    "When Cornered", "With {{user}}",
    "Habits", "Sex/Gender", "Sexual Orientation",
    "Kinks/Preferences", "Sexual Habits",
    "Style", "Quirks", "Ticks",
    "Greeting Example", "Pleas for {something}",
    "Embarrassed over {something}",
    "Forced to {something}", "Caught {something}",
    "A memory about {something}",
    "A thought about {something}",
    "Synonyms", "Notes"
  ]
};

function schemaFor(keys) {
  return {
    type: "object",
    properties: Object.fromEntries(
      keys.map(k => [k, { type: "string" }])
    ),
    required: keys,
    additionalProperties: false
  };
}

const SYSTEM = `
You are JanitorAi Bot Creator, an expert creator
of immersive fictional characters and user personas.

VOICE:
Witty, creative, meticulous, collaborative.
Use dry humor appropriately and take character
psychology seriously.

PSYCHOLOGICAL APPROACH:
Use psychologically coherent formative experiences,
contradictions, attachment patterns, defense mechanisms,
cognitive biases, emotional regulation, personal values,
vulnerabilities and growth opportunities.

Avoid stereotyping, superficial perfection, generic
personality labels, and unnecessary trauma.

VOICE ARCHITECTURE:
Develop distinctive vocabulary, sentence rhythms,
subtext, emotional speech shifts, and culturally
authentic communication.

Respect individual linguistic variation.

INTIMACY:
When relevant, include adult relationship psychology,
romantic preferences, consent, communication,
boundaries, and mature themes within platform policy.

Do not assume particular desires from a character's
gender, orientation, ethnicity, or trauma history.

PERSONA ARCHITECTURE:
Create an independent fictional person, not a
supporting accessory to another character.

Separate permanent core identity from setting-specific
adaptations and bot-specific relationship overlays.

Preserve core identity between roleplays.
Never automatically merge incompatible timelines.

Do not preordain the feelings or decisions of {{char}}.
Do not write {{user}}'s future actions as established facts.

The persona must possess independent goals, relationships,
limitations, emotional conflicts, and agency.

CHARACTER BOT ARCHITECTURE:
Write distinctive, multidimensional characters
capable of sustaining extended roleplay.

Maintain the exact required output fields and
provide substantial content for every field.

Never assume the user and character automatically
love, trust, or obey one another.

All characters participating in adult intimacy must
be adults.

Produce complete, specific, internally coherent work.
`;

async function generate(task, input, keys) {
  const response = await ai.responses.create({
    model: MODEL,
    instructions: SYSTEM + "\nTASK:\n" + task,
    input: JSON.stringify(input),
    text: {
      format: {
        type: "json_schema",
        name: "character_output",
        strict: true,
        schema: schemaFor(keys)
      }
    }
  });

  if (!response.output_text) {
    throw new Error("No generation output was returned.");
  }

  const data = JSON.parse(response.output_text);

  for (const key of keys) {
    if (typeof data[key] !== "string" || !data[key].trim()) {
      throw new Error(`Missing required output: ${key}`);
    }
  }

  return data;
}

function personaMarkdown(p) {
  return [
    `# ${p.Name}`,
    "",
    `**Age:** ${p.Age}`,
    `**Gender:** ${p.Gender}`,
    `**Orientation:** ${p.Orientation}`,
    "",
    ...fields.persona
      .filter(k => !["Name", "Age", "Gender", "Orientation"].includes(k))
      .flatMap(k => [`## ${k}`, p[k], ""])
  ].join("\n");
}

function compactPersona(p, maxChars = 2000) {
  const priority = [
    ["Identity", `${p.Name}, ${p.Age}, ${p.Gender}`],
    ["Appearance", p.Appearance],
    ["Personality", p.Personality],
    ["Background", p.Background],
    ["Motivations", p.Goals],
    ["Flaws", p.Flaws],
    ["Speech", p.Speech],
    ["Habits", p.Habits]
  ];

  let output = "";

  for (const [heading, value] of priority) {
    const line = `${heading}: ${value}\n`;
    const remaining = maxChars - output.length;

    if (remaining <= heading.length + 12) break;

    if (line.length <= remaining) {
      output += line;
    } else {
      // Cut at a sentence boundary when possible.
      const allowed = remaining - heading.length - 5;
      const text = value.slice(0, Math.max(0, allowed));
      const end = Math.max(
        text.lastIndexOf(". "),
        text.lastIndexOf("; ")
      );
      if (end > 40) {
        output += `${heading}: ${text.slice(0, end + 1)}\n`;
      }
      break;
    }
  }

  return output.trim();
}

function bullets(text) {
  return text.split("\n")
    .map(s => s.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .map(s => `- ${s}`).join("\n");
}

function botMarkdown(b) {
  const basic = [
    "Race", "Height", "Age", "Hair", "Eyes",
    "Body", "Face", "Features", "Privates"
  ];

  const outfit = [
    "Head", "Accessories", "Makeup", "Neck",
    "Top", "Bottom", "Legs", "Shoes", "Panties"
  ];

  const personality = [
    "Archetype", "Tags", "Likes", "Dislikes",
    "Deep-Rooted Fears", "Details", "When Safe",
    "When Alone", "When Cornered", "With {{user}}"
  ];

  const labeled = keys => keys
    .map(k => `- ${k}: ${b[k]}`).join("\n");

  const section = (title, value) =>
    `## ${title}\n\n${value}\n`;

  const speechKeys = [
    "Greeting Example", "Pleas for {something}",
    "Embarrassed over {something}",
    "Forced to {something}", "Caught {something}",
    "A memory about {something}",
    "A thought about {something}"
  ];

  return [
    "# Setting",
    `- Time Period: ${b["Time Period"]}`,
    `- World Details: ${b["World Details"]}`,
    "- Main Characters: {{user}}, {{char}}",
    "",
    "## Lore",
    "",
    "<{{char}}>",
    "",
    "# {{char}}",
    "",
    section("Overview", b.Overview),
    section("Appearance Details", labeled(basic)),
    section("Starting Outfit", labeled(outfit)),
    section("Origin", b.Origin),
    section("Residence", b.Residence),
    section("Connections", b.Connections),
    section("Goal", b.Goal),
    section("Secret", b.Secret),
    section("Personality", labeled(personality)),
    section("Behaviour and Habits", bullets(b.Habits)),
    section("Sexuality", labeled([
      "Sex/Gender", "Sexual Orientation",
      "Kinks/Preferences"
    ])),
    section("Sexual Quirks and Habits", bullets(b["Sexual Habits"])),
    section("Speech", labeled(["Style", "Quirks", "Ticks"])),
    "## Speech Examples and Opinions",
    "[Important: This section provides {{char}}'s speech examples, memories, thoughts, and {{char}}'s real opinions on subjects. AI must avoid using them verbatim in chat and use them only for reference.]",
    "",
    ...speechKeys.flatMap(k => [
      `${k}:`, `"${b[k]}"`, ""
    ]),
    "## {{char}} Synonyms",
    "[Important: This section lists synonymous phrases to substitute the character's name or pronouns and avoid repetition.]",
    bullets(b.Synonyms),
    "",
    section("Notes", bullets(b.Notes)),
    "</{{char}}>"
  ].join("\n");
}

function scenarioMemo(notes) {
  return [
    "<scenario memo> (Put into 'Advanced Definitions' > 'Character's Note' depth@4)",
    "",
    "# Memo",
    "[This message is a scenario memo that dictates the following messages in the chat.]",
    "",
    "## Scenario Notes",
    bullets(notes),
    "",
    "</scenario memo>"
  ].join("\n");
}

function result(payload, display) {
  return {
    content: [{ type: "text", text: display }],
    structuredContent: payload
  };
}

function errorResult(error) {
  return {
    isError: true,
    content: [{
      type: "text",
      text: error instanceof Error ? error.message : String(error)
    }]
  };
}

function tool(server, name, description, inputSchema, fn) {
  server.registerTool(
    name,
    { title: name.replaceAll("_", " "), description, inputSchema },
    async args => {
      try {
        return await fn(args);
      } catch (error) {
        return errorResult(error);
      }
    }
  );
}

function makeServer() {
  const server = new McpServer({
    name: "janitorai-bot-creator",
    version: VERSION
  });

  tool(
    server,
    "create_character",
    "Generate a complete Janitor AI bot character sheet.",
    {
      concept: z.string().min(1),
      setting: z.string().optional(),
      preferences: z.string().optional()
    },
    async input => {
      const character = await generate(
        "Create a full Janitor AI bot definition.",
        input,
        fields.bot
      );
      const markdown = botMarkdown(character);
      return result(
        { character, markdown, memo: scenarioMemo(character.Notes) },
        markdown
      );
    }
  );

  tool(
    server,
    "revise_character",
    "Revise an existing bot while preserving established canon.",
    {
      character: z.record(z.string()),
      changes: z.string().min(1)
    },
    async input => {
      const character = await generate(
        "Revise the existing bot. Preserve all unrequested details. Return a complete replacement definition.",
        input,
        fields.bot
      );
      const markdown = botMarkdown(character);
      return result({ character, markdown }, markdown);
    }
  );

  tool(
    server,
    "create_user_persona",
    "Create an independent reusable roleplay persona with full biography and compact export.",
    {
      concept: z.string().min(1),
      preferences: z.string().optional(),
      maxChars: z.number().int().min(300).max(10000).optional()
    },
    async input => {
      const persona = await generate(
        "Create a complete portable fictional identity. Do not include facts that require any particular bot or setting.",
        input,
        fields.persona
      );

      const bible = personaMarkdown(persona);
      const compact = compactPersona(persona, input.maxChars ?? 2000);

      const payload = {
        schemaVersion: VERSION,
        core: persona,
        adaptations: [],
        roleplayHistory: [],
        bible,
        compact
      };

      return result(
        payload,
        `# Character Bible\n\n${bible}\n\n# Compact Persona\n\n${compact}`
      );
    }
  );

  tool(
    server,
    "adapt_persona_to_bot",
    "Create a world-specific and bot-specific adaptation without altering permanent persona canon.",
    {
      persona: z.record(z.string()),
      botDescription: z.string().min(1),
      scenario: z.string().optional()
    },
    async input => {
      const keys = [
        "Setting", "Occupation", "World Background",
        "Appearance Adjustments", "Abilities and Limits",
        "Reason for Meeting",
        "First Impressions", "Possible Chemistry",
        "Potential Conflicts", "Boundaries",
        "Story Hooks", "Canon Compatibility Notes"
      ];

      const overlay = await generate(
        "Create a roleplay adaptation. Preserve the entire supplied permanent identity. Do not declare the bot's feelings or choices as facts. Clearly distinguish new invented lore from supplied canon.",
        input,
        keys
      );

      const markdown = Object.entries(overlay)
        .map(([k, v]) => `## ${k}\n${v}`)
        .join("\n\n");

      return result({
        core: input.persona,
        adaptation: overlay,
        markdown
      }, markdown);
    }
  );

  tool(
    server,
    "update_persona_canon",
    "Promote explicitly selected roleplay discoveries into a persona's permanent character bible.",
    {
      persona: z.record(z.string()),
      selectedDevelopments: z.array(z.string()).min(1),
      continuityNotes: z.string().optional()
    },
    async input => {
      const updated = await generate(
        "Incorporate ONLY the explicitly selected developments into permanent canon. Retain the persona's original identity. Do not transfer any other roleplay events. Return every original persona field.",
        input,
        fields.persona
      );

      const bible = personaMarkdown(updated);
      return result({
        previous: input.persona,
        core: updated,
        promoted: input.selectedDevelopments,
        bible,
        compact: compactPersona(updated)
      }, bible);
    }
  );

  tool(
    server,
    "promote_persona_to_character",
    "Convert a portable user persona into a complete Janitor AI bot definition.",
    {
      persona: z.record(z.string()),
      setting: z.string().optional(),
      intendedScenario: z.string().optional()
    },
    async input => {
      const character = await generate(
        "Convert this established persona into a Janitor AI bot. Preserve appearance, personality, motivations, voice, personal history, flaws and values. Expand the persona into the full bot template without overwriting established core canon.",
        input,
        fields.bot
      );

      const markdown = botMarkdown(character);
      return result({
        character,
        markdown,
        memo: scenarioMemo(character.Notes)
      }, markdown);
    }
  );

  tool(
    server,
    "save_character",
    "Persist a complete character or persona record in the local character library.",
    { record: z.record(z.unknown()) },
    async ({ record }) => {
      const saved = await characterStore.save(record);
      return result(saved, JSON.stringify(saved, null, 2));
    }
  );

  tool(
    server,
    "list_characters",
    "List persisted character records without exposing secrets.",
    {},
    async () => {
      const records = await characterStore.list();
      return result({ records: records.map(({ id, name, Name, updatedAt, createdAt }) => ({ id, name: name || Name, updatedAt, createdAt })) }, JSON.stringify(records, null, 2));
    }
  );

  tool(
    server,
    "get_character",
    "Retrieve one persisted character record by ID.",
    { id: z.string().min(1) },
    async ({ id }) => {
      const record = await characterStore.get(id);
      return result(record, JSON.stringify(record, null, 2));
    }
  );

  tool(
    server,
    "list_references",
    "List local Markdown, text, JSON, and PDF references available to the creator.",
    {},
    async () => {
      const references = await referenceLibrary.list();
      return result({ references }, JSON.stringify(references, null, 2));
    }
  );

  tool(
    server,
    "search_references",
    "Search the configured reference library and return excerpts with source paths.",
    { query: z.string().min(1) },
    async ({ query }) => {
      const matches = await referenceLibrary.search(query);
      return result({ query, matches }, JSON.stringify(matches, null, 2));
    }
  );

  tool(
    server,
    "read_reference",
    "Read a selected reference. PDF extraction uses pdftotext when installed.",
    { path: z.string().min(1) },
    async ({ path }) => {
      const reference = await referenceLibrary.read(path);
      return result(reference, reference.text || reference.message || JSON.stringify(reference));
    }
  );

  tool(
    server,
    "create_visual_character_model",
    "Convert a character record into an editable visual-character model.",
    { character: z.record(z.unknown()) },
    async ({ character }) => {
      const model = createVisualCharacterModel(character);
      return result(model, JSON.stringify(model, null, 2));
    }
  );

  tool(
    server,
    "update_visual_character_model",
    "Apply a constrained visual edit without changing unrelated character fields.",
    { model: z.record(z.unknown()), patch: z.record(z.unknown()) },
    async ({ model, patch }) => {
      const updated = applyVisualCharacterPatch(model, patch);
      return result(updated, JSON.stringify(updated, null, 2));
    }
  );

  return server;
}

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";

if (process.env.NODE_ENV === "production" && !process.env.MCP_API_TOKEN) {
  throw new Error("MCP_API_TOKEN is required when NODE_ENV=production.");
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${host}:${port}`);

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`JanitorAi Bot Creator ${VERSION}`);
    return;
  }

  if (req.method !== "POST" || url.pathname !== "/mcp") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  if (!authorised(req)) {
    res.writeHead(401, { "content-type": "text/plain", "www-authenticate": "Bearer" });
    res.end("Unauthorised");
    return;
  }

  const server = makeServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end("MCP request failed");
    }
  } finally {
    await transport.close();
    await server.close();
  }
}).listen(port, host, () => {
  console.log(`MCP server: http://${host}:${port}/mcp`);
});
