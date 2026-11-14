export const fields = [
  "Time Period", "World Details", "Character Name", "Overview",
  "Race", "Height", "Age", "Hair", "Eyes", "Body", "Face", "Features", "Privates",
  "Head", "Accessories", "Makeup", "Neck", "Top", "Bottom", "Legs", "Shoes", "Panties",
  "Origin", "Residence", "Connections", "Goal", "Secret",
  "Archetype", "Tags", "Likes", "Dislikes", "Deep-Rooted Fears", "Details",
  "When Safe", "When Alone", "When Cornered", "With {{user}}",
  "Habits", "Sex/Gender", "Sexual Orientation", "Kinks/Preferences", "Sexual Habits",
  "Style", "Quirks", "Ticks",
  "Greeting Example", "Pleas for {something}", "Embarrassed over {something}",
  "Forced to {something}", "Caught {something}", "A memory about {something}",
  "A thought about {something}", "Synonyms", "Notes"
];

export const outputSchema = {
  type: "object",
  properties: Object.fromEntries(fields.map(field => [field, { type: "string" }])),
  required: fields,
  additionalProperties: false
};

function value(character, field) {
  return String(character[field] ?? "").trim();
}

export function validateCharacter(character) {
  for (const field of fields) {
    if (!value(character, field)) throw new Error(`Missing character field: ${field}`);
  }
  return true;
}

function section(title, content) {
  return `## ${title}\n\n${content}\n`;
}

function labelled(character, names) {
  return names.map(name => `- ${name}: ${value(character, name)}`).join("\n");
}

function bullets(text) {
  return text.split("\n")
    .map(line => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .map(line => `- ${line}`)
    .join("\n");
}

export function renderCharacter(character) {
  validateCharacter(character);
  const appearance = ["Race", "Height", "Age", "Hair", "Eyes", "Body", "Face", "Features", "Privates"];
  const outfit = ["Head", "Accessories", "Makeup", "Neck", "Top", "Bottom", "Legs", "Shoes", "Panties"];
  const personality = ["Archetype", "Tags", "Likes", "Dislikes", "Deep-Rooted Fears", "Details", "When Safe", "When Alone", "When Cornered", "With {{user}}"];
  const speech = ["Style", "Quirks", "Ticks"];
  const speechExamples = ["Greeting Example", "Pleas for {something}", "Embarrassed over {something}", "Forced to {something}", "Caught {something}", "A memory about {something}", "A thought about {something}"];

  return [
    "# Setting",
    `- Time Period: ${value(character, "Time Period")}`,
    `- World Details: ${value(character, "World Details")}`,
    "- Main Characters: {{user}}, {{char}}",
    "",
    "## Lore",
    "<{{char}}>",
    "",
    "# {{char}}",
    "",
    section("Overview", value(character, "Overview")),
    section("Appearance Details", labelled(character, appearance)),
    section("Starting Outfit", labelled(character, outfit)),
    section("Origin", value(character, "Origin")),
    section("Residence", value(character, "Residence")),
    section("Connections", value(character, "Connections")),
    section("Goal", value(character, "Goal")),
    section("Secret", value(character, "Secret")),
    section("Personality", labelled(character, personality)),
    section("Behaviour and Habits", bullets(value(character, "Habits"))),
    section("Sexuality", labelled(character, ["Sex/Gender", "Sexual Orientation", "Kinks/Preferences"])),
    section("Sexual Quirks and Habits", bullets(value(character, "Sexual Habits"))),
    section("Speech", labelled(character, speech)),
    "## Speech Examples and Opinions",
    "[Important: Use these examples as reference. Do not repeat them verbatim in chat.]",
    "",
    ...speechExamples.flatMap(field => [field + ":", `"${value(character, field)}"`, ""]),
    "## {{char}} Synonyms",
    "[Important: Substitute naturally; do not repeat the character's name mechanically.]",
    bullets(value(character, "Synonyms")),
    "",
    section("Notes", bullets(value(character, "Notes"))),
    "</{{char}}>"
  ].join("\n");
}

export function renderMemo(notes = []) {
  const lines = Array.isArray(notes) ? notes : String(notes).split("\n");
  return [
    "<scenario memo> (Put into 'Advanced Definitions' > 'Character's Note' depth@4)",
    "",
    "# Memo",
    "[This message is a scenario memo that dictates the following messages in the chat.]",
    "",
    "## Scenario Notes",
    ...lines.map(line => String(line).replace(/^[-*]\s*/, "").trim()).filter(Boolean).map(line => `- ${line}`),
    "",
    "</scenario memo>"
  ].join("\n");
}
