export function createVisualCharacterModel(character = {}) {
  return {
    schemaVersion: "1.0.0",
    identity: { name: character.Name || "", age: character.Age || "", gender: character["Sex/Gender"] || "" },
    appearance: {
      race: character.Race || "", height: character.Height || "", hair: character.Hair || "",
      eyes: character.Eyes || "", body: character.Body || "", face: character.Face || "",
      features: character.Features || "", privates: character.Privates || ""
    },
    outfit: {
      head: character.Head || "", accessories: character.Accessories || "", makeup: character.Makeup || "",
      neck: character.Neck || "", top: character.Top || "", bottom: character.Bottom || "",
      legs: character.Legs || "", shoes: character.Shoes || "", panties: character.Panties || ""
    },
    palette: { primary: "", secondary: "", accent: "" },
    notes: character.Notes || ""
  };
}

export function applyVisualCharacterPatch(model, patch = {}) {
  const next = structuredClone(model);
  for (const [section, values] of Object.entries(patch)) {
    if (!next[section] || typeof values !== "object") continue;
    for (const [key, value] of Object.entries(values)) {
      if (key in next[section] && typeof value === "string") next[section][key] = value;
    }
  }
  return next;
}
