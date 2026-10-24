import { withNarrativeLens } from "./narrative-lens.mjs";

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
      keys.map(key => [key, { type: "string" }])
    ),
    required: keys,
    additionalProperties: false
  };
}

const SYSTEM = withNarrativeLens(`You are JanitorAi Bot Creator, an expert creator
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
`);

function createGenerator(ai, model) {
  return async function generate(task, input, keys) {
    const response = await ai.responses.create({
      model,
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
  };
}

function personaMarkdown(persona) {
  return [
    `# ${persona.Name}`,
    "",
    `**Age:** ${persona.Age}`,
    `**Gender:** ${persona.Gender}`,
    `**Orientation:** ${persona.Orientation}`,
    "",
    ...fields.persona
      .filter(key => !["Name", "Age", "Gender", "Orientation"].includes(key))
      .flatMap(key => [`## ${key}`, persona[key], ""])
  ].join("\n");
}

function compactPersona(persona, maxChars = 2000) {
  const priority = [
    ["Identity", `${persona.Name}, ${persona.Age}, ${persona.Gender}`],
    ["Appearance", persona.Appearance],
    ["Personality", persona.Personality],
    ["Background", persona.Background],
    ["Motivations", persona.Goals],
    ["Flaws", persona.Flaws],
    ["Speech", persona.Speech],
    ["Habits", persona.Habits]
  ];

  let output = "";

  for (const [heading, value] of priority) {
    const line = `${heading}: ${value}\n`;
    const remaining = maxChars - output.length;

    if (remaining <= heading.length + 12) break;

    if (line.length <= remaining) {
      output += line;
    } else {
      const allowed = remaining - heading.length - 5;
      const text = value.slice(0, Math.max(0, allowed));
      const end = Math.max(text.lastIndexOf(". "), text.lastIndexOf("; "));
      if (end > 40) output += `${heading}: ${text.slice(0, end + 1)}\n`;
      break;
    }
  }

  return output.trim();
}

function bullets(text) {
  return text.split("\n")
    .map(line => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .map(line => `- ${line}`).join("\n");
}

function botMarkdown(bot) {
  const basic = ["Race", "Height", "Age", "Hair", "Eyes", "Body", "Face", "Features", "Privates"];
  const outfit = ["Head", "Accessories", "Makeup", "Neck", "Top", "Bottom", "Legs", "Shoes", "Panties"];
  const personality = ["Archetype", "Tags", "Likes", "Dislikes", "Deep-Rooted Fears", "Details", "When Safe", "When Alone", "When Cornered", "With {{user}}"];
  const labeled = keys => keys.map(key => `- ${key}: ${bot[key]}`).join("\n");
  const section = (title, value) => `## ${title}\n\n${value}\n`;
  const speechKeys = [
    "Greeting Example", "Pleas for {something}", "Embarrassed over {something}",
    "Forced to {something}", "Caught {something}", "A memory about {something}",
    "A thought about {something}"
  ];

  return [
    "# Setting", `- Time Period: ${bot["Time Period"]}`, `- World Details: ${bot["World Details"]}`,
    "- Main Characters: {{user}}, {{char}}", "", "## Lore", "", "<{{char}}>", "",
    "# {{char}}", "", section("Overview", bot.Overview), section("Appearance Details", labeled(basic)),
    section("Starting Outfit", labeled(outfit)), section("Origin", bot.Origin), section("Residence", bot.Residence),
    section("Connections", bot.Connections), section("Goal", bot.Goal), section("Secret", bot.Secret),
    section("Personality", labeled(personality)), section("Behaviour and Habits", bullets(bot.Habits)),
    section("Sexuality", labeled(["Sex/Gender", "Sexual Orientation", "Kinks/Preferences"])),
    section("Sexual Quirks and Habits", bullets(bot["Sexual Habits"])),
    section("Speech", labeled(["Style", "Quirks", "Ticks"])),
    "## Speech Examples and Opinions",
    "[Important: This section provides {{char}}'s speech examples, memories, thoughts, and {{char}}'s real opinions on subjects. AI must avoid using them verbatim in chat and use them only for reference.]",
    "", ...speechKeys.flatMap(key => [`${key}:`, `"${bot[key]}"`, ""]),
    "## {{char}} Synonyms",
    "[Important: This section lists synonymous phrases to substitute the character's name or pronouns and avoid repetition.]",
    bullets(bot.Synonyms), "", section("Notes", bullets(bot.Notes)), "</{{char}}>"
  ].join("\n");
}

function scenarioMemo(notes) {
  return [
    "<scenario memo> (Put into 'Advanced Definitions' > 'Character's Note' depth@4)", "",
    "# Memo", "[This message is a scenario memo that dictates the following messages in the chat.]",
    "", "## Scenario Notes", bullets(notes), "", "</scenario memo>"
  ].join("\n");
}

export function createCharacterGeneration({ ai, model }) {
  return {
    fields,
    generate: createGenerator(ai, model),
    personaMarkdown,
    compactPersona,
    botMarkdown,
    scenarioMemo
  };
}

export { fields, schemaFor, personaMarkdown, compactPersona, botMarkdown, scenarioMemo };
