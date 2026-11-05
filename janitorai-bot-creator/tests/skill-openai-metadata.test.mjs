import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const skillsRoot = resolve(process.cwd(), "skills");

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function readInterface(manifestPath) {
  const source = readFileSync(manifestPath, "utf8");
  const fields = Object.fromEntries(
    [...source.matchAll(/^  (display_name|short_description|default_prompt): "(.+)"$/gm)]
      .map(([, key, value]) => [key, value])
  );

  assert.match(source, /^interface:\n/m, manifestPath);
  assert.deepEqual(Object.keys(fields).sort(), [
    "default_prompt",
    "display_name",
    "short_description",
  ], manifestPath);

  return fields;
}

test("every expanded skill has concise OpenAI discovery metadata", () => {
  const skillFiles = walk(skillsRoot).filter((path) => path.endsWith("SKILL.md"));
  const expandedSkills = skillFiles.filter((path) =>
    /^\d\d-/.test(relative(skillsRoot, path).split("/")[0])
  );
  const displayNames = new Set();

  for (const skillPath of expandedSkills) {
    const manifestPath = join(skillPath, "..", "agents", "openai.yaml");
    assert.equal(statSync(manifestPath).isFile(), true, manifestPath);

    const metadata = readInterface(manifestPath);
    assert.ok(metadata.display_name.length <= 80, manifestPath);
    assert.ok(metadata.short_description.length <= 120, manifestPath);
    assert.ok(metadata.default_prompt.length > 24, manifestPath);
    assert.equal(displayNames.has(metadata.display_name), false, metadata.display_name);
    displayNames.add(metadata.display_name);
  }

  assert.equal(expandedSkills.length, 138);
  assert.equal(displayNames.size, expandedSkills.length);
});
