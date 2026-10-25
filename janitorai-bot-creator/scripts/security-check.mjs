import { readFile, readdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const repositoryRoot = path.resolve(import.meta.dirname, "../..");
const packageRoot = path.resolve(repositoryRoot, "janitorai-bot-creator");

const secretPatterns = [
  /sk-[A-Za-z0-9]{20,}/,
  /gh[pousr]_[A-Za-z0-9_]{20,}/,
  /-----BEGIN (?:RSA|OPENSSH|EC|DSA) PRIVATE KEY-----/,
];

async function trackedFiles() {
  const { stdout } = await execFileAsync("git", [
    "-C",
    repositoryRoot,
    "ls-files",
    "-z",
  ]);
  return stdout.split("\0").filter(Boolean);
}

async function checkTrackedFiles(files) {
  const trackedEnvFiles = files.filter(
    (file) =>
      /(^|\/)\.env(?:\.|$)/.test(file) && !/(^|\/)\.env\.example$/.test(file)
  );
  if (trackedEnvFiles.length > 0) {
    throw new Error(
      `Tracked environment files found: ${trackedEnvFiles.join(", ")}`
    );
  }

  for (const file of files) {
    if (/\.(?:png|jpe?g|gif|pdf|ico|woff2?)$/i.test(file)) continue;
    const contents = await readFile(path.join(repositoryRoot, file), "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(contents)) {
        throw new Error(`Secret-like value detected in tracked file: ${file}`);
      }
    }
  }
}

async function checkWorkflowPermissions() {
  const workflowRoot = path.join(repositoryRoot, ".github", "workflows");
  const workflowFiles = (await readdir(workflowRoot))
    .filter((file) => /\.ya?ml$/.test(file))
    .map((file) => path.join(workflowRoot, file));

  for (const file of workflowFiles) {
    const contents = await readFile(file, "utf8");
    const relative = path.relative(repositoryRoot, file);
    if (!/permissions:\s*\n\s+contents:\s+read/.test(contents)) {
      throw new Error(`${relative} must declare read-only contents permission`);
    }
    if (
      /\bcontents:\s+write\b|\bactions:\s+write\b|\bpull-requests:\s+write\b/.test(
        contents
      )
    ) {
      throw new Error(`${relative} grants an unexpected write permission`);
    }
    if (
      relative !== ".github/workflows/ossar.yml" &&
      /\bsecurity-events:\s+write\b/.test(contents)
    ) {
      throw new Error(`${relative} grants security-events write permission`);
    }
  }
}

await checkTrackedFiles(await trackedFiles());
await checkWorkflowPermissions();
await readFile(path.join(packageRoot, "package-lock.json"), "utf8");
console.log("Security checks passed.");
