import { createServer } from "node:http";
import OpenAI from "openai";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  StreamableHTTPServerTransport
} from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createCharacterStore } from "./lib/character-store.mjs";
import { createReferenceLibrary } from "./lib/reference-library.mjs";
import { createCharacterApplication } from "./lib/application.mjs";
import { registerMcpTools } from "./lib/mcp-tools.mjs";
import { isAuthorised, loadRuntimeConfig } from "./lib/runtime-config.mjs";
import { rejectOversizedRequest } from "./lib/request-guards.mjs";
import { createRateLimiter } from "./lib/rate-limiter.mjs";
import { createPromptPresetLibrary } from "./lib/prompt-presets.mjs";
import { NARRATIVE_LENS } from "./lib/narrative-lens.mjs";

const VERSION = "1.1.0";
const SHUTDOWN_TIMEOUT_MS = 10_000;
const config = loadRuntimeConfig();
const ai = new OpenAI();
const characterStore = createCharacterStore(config.characterLibraryDir);
const referenceLibrary = createReferenceLibrary(config.referenceLibraryDir);
const rateLimiter = createRateLimiter({
  limit: config.rateLimit,
  windowMs: config.rateWindowMs
});
const promptPresets = createPromptPresetLibrary();

function authorised(req) { return isAuthorised(req, config); }

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

const SYSTEM = `${NARRATIVE_LENS}

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
    model: config.model,
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

const application = createCharacterApplication({
  generate,
  fields,
  personaMarkdown,
  compactPersona,
  botMarkdown,
  scenarioMemo,
  characterStore,
  referenceLibrary,
  promptPresets
});

function makeServer() {
  const server = new McpServer({
    name: "janitorai-bot-creator",
    version: VERSION
  });
  registerMcpTools(server, application);
  return server;
}

const { port, host } = config;

const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${host}:${port}`);

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`JanitorAi Bot Creator ${VERSION}`);
    return;
  }

  if (req.method === "GET" && url.pathname === "/healthz") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      status: "ok",
      service: "janitorai-bot-creator",
      version: VERSION
    }));
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

  if (rejectOversizedRequest(req, res, config.maxRequestBytes)) return;

  const rateKey = req.socket.remoteAddress || "unknown";
  const rate = rateLimiter.check(rateKey);
  if (!rate.allowed) {
    res.writeHead(429, {
      "content-type": "text/plain",
      "retry-after": String(Math.ceil(rate.retryAfterMs / 1000))
    });
    res.end("Too many requests");
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
});

let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`${signal} received; shutting down`);
  httpServer.close(() => process.exit(0));
  setTimeout(() => process.exit(1), SHUTDOWN_TIMEOUT_MS).unref();
}

httpServer.on("error", error => {
  console.error("HTTP server error", error);
  if (!httpServer.listening) process.exitCode = 1;
});

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));

httpServer.listen(port, host, () => {
  console.log(`MCP server: http://${host}:${port}/mcp`);
});
