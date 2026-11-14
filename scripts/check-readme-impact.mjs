#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const README = "README.md";
const IMPACT_PATTERNS = [
  /^AGENTS\.md$/,
  /^\.github\//,
  /^docs\/workflows\//,
  /^scripts\//,
  /^janitorai-bot-creator\/(?:server\.mjs|creator\.mjs|character-schema\.mjs)$/,
  /^janitorai-bot-creator\/(?:lib|prompts|skills)\//,
  /^janitorai-bot-creator\/package(?:-lock)?\.json$/,
  /^janitorai-bot-creator\/\.env\.example$/,
  /^janitorai-bot-creator\/FEATURES\.md$/,
];

export function readmeImpactPaths(paths) {
  return paths.filter((path) =>
    IMPACT_PATTERNS.some((pattern) => pattern.test(path))
  );
}

export function checkReadmeImpact(paths) {
  const changed = [...new Set(paths)];
  const impacted = readmeImpactPaths(changed);
  const readmeChanged = changed.includes(README);
  return {
    changed,
    impacted,
    readmeChanged,
    required: impacted.length > 0 && !readmeChanged,
    ok: impacted.length === 0 || readmeChanged,
  };
}

function changedPaths(revisionArgs) {
  const output = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMR", ...revisionArgs, "--"],
    { encoding: "utf8" }
  );
  return output
    .split(/\r?\n/)
    .map((path) => path.trim())
    .filter(Boolean);
}

function cliPaths() {
  const args = process.argv.slice(2);
  if (args.length === 0 || (args.length === 1 && args[0] === "--staged")) {
    return changedPaths(["--cached"]);
  }
  if (args[0] === "--range" && args.length === 3) {
    return changedPaths([`${args[1]}...${args[2]}`]);
  }
  throw new Error(
    "Usage: node scripts/check-readme-impact.mjs [--staged | --range <base> <head>]"
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = checkReadmeImpact(cliPaths());
  if (result.required) {
    console.error(
      "README impact check failed: user-facing or repository-convention changes require README.md in the same commit."
    );
    for (const path of result.impacted) console.error(`  - ${path}`);
    console.error(
      "Add or update README.md, or classify the change before committing as non-impacting and keep it outside the protected paths."
    );
    process.exitCode = 1;
  } else if (result.changed.length > 0) {
    console.log(
      result.readmeChanged
        ? "README impact check passed: README.md is included."
        : "README impact check passed: no protected README-impact paths changed."
    );
  }
}
