const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const EDIT_TOOL_NAMES = new Set([
  "apply_patch",
  "create_file",
  "edit_notebook_file",
]);

const PRETTIER_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);

function readStdin() {
  return fs.readFileSync(0, "utf8");
}

function parseJson(raw) {
  if (!raw.trim()) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function pickFirstString(values) {
  return values.find((value) => typeof value === "string") ?? "";
}

function extractToolName(payload) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  return pickFirstString([
    payload.toolName,
    payload.tool,
    payload.name,
    payload.tool_name,
    payload?.toolCall?.toolName,
    payload?.toolCall?.name,
    payload?.hookSpecificInput?.toolName,
    payload?.hookSpecificInput?.tool,
  ]);
}

function extractToolInput(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  return (
    payload.input ??
    payload.arguments ??
    payload.params ??
    payload.toolInput ??
    payload?.toolCall?.input ??
    payload?.toolCall?.arguments ??
    payload?.hookSpecificInput?.input ??
    payload?.hookSpecificInput?.arguments ??
    null
  );
}

function normalizePath(filePath) {
  if (typeof filePath !== "string" || !filePath.trim()) {
    return null;
  }

  return path.isAbsolute(filePath)
    ? path.normalize(filePath)
    : path.normalize(path.join(process.cwd(), filePath));
}

function extractPatchPaths(patchText) {
  if (typeof patchText !== "string") {
    return [];
  }

  const matches = patchText.matchAll(/^\*\*\* (?:Add|Update|Delete) File: (.+)$/gm);
  const paths = [];

  for (const match of matches) {
    const normalized = normalizePath(match[1].trim());

    if (normalized) {
      paths.push(normalized);
    }
  }

  return paths;
}

function extractFilesFromInput(toolInput) {
  if (!toolInput) {
    return [];
  }

  if (typeof toolInput === "string") {
    return extractPatchPaths(toolInput);
  }

  if (typeof toolInput !== "object") {
    return [];
  }

  const collected = [];
  const directPaths = [
    toolInput.filePath,
    ...(Array.isArray(toolInput.filePaths) ? toolInput.filePaths : []),
    toolInput.path,
  ];

  for (const filePath of directPaths) {
    const normalized = normalizePath(filePath);

    if (normalized) {
      collected.push(normalized);
    }
  }

  if (typeof toolInput.input === "string") {
    collected.push(...extractPatchPaths(toolInput.input));
  }

  return collected;
}

function uniqueExistingFiles(filePaths) {
  return [...new Set(filePaths)].filter((filePath) => {
    try {
      return fs.statSync(filePath).isFile();
    } catch {
      return false;
    }
  });
}

function runCommand(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  return {
    command: `${command} ${args.join(" ")}`.trim(),
    status: result.status ?? 1,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim(),
  };
}

function toRelative(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join("/");
}

function shouldFormat(filePath) {
  return PRETTIER_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function classifyValidationScope(relativePaths) {
  const touchesFrontend = relativePaths.some(
    (filePath) =>
      filePath.startsWith("frontend/src/") ||
      filePath.startsWith("frontend/public/") ||
      filePath === "frontend/vite.config.ts",
  );

  const touchesBackend = relativePaths.some((filePath) => filePath.startsWith("backend/"));
  const touchesInfra = relativePaths.some((filePath) =>
    [
      "docker-compose.yml",
      "Dockerfile.front",
      "backend/Dockerfile.back",
      "Jenkinsfile",
    ].includes(filePath),
  );

  if ((touchesFrontend && touchesBackend) || touchesInfra) {
    return {
      scope: "repo-wide",
      commands: [
        ["npx", ["eslint", "frontend/src", "--ext", ".ts,.tsx", "--config", "frontend/eslint.config.js"]],
        ["npx", ["vite", "build", "frontend", "--config", "frontend/vite.config.ts"]],
      ],
      note: "Repo-wide validation in this checkout falls back to direct frontend lint/build because the documented npm workspace scripts are not currently executable here, and there is no focused backend test suite.",
    };
  }

  if (touchesFrontend) {
    return {
      scope: "frontend-only",
      commands: [
        ["npx", ["eslint", "frontend/src", "--ext", ".ts,.tsx", "--config", "frontend/eslint.config.js"]],
        ["npx", ["vite", "build", "frontend", "--config", "frontend/vite.config.ts"]],
      ],
    };
  }

  if (touchesBackend) {
    const backendChecks = relativePaths
      .filter((filePath) => filePath.startsWith("backend/") && filePath.endsWith(".js"))
      .map((filePath) => ["node", ["--check", filePath]]);

    return {
      scope: "backend-only",
      commands: backendChecks,
      note: "Backend-only changes have no focused backend test suite in this repo; this hook runs Node syntax checks for touched backend JavaScript files.",
    };
  }

  return { scope: "non-code", commands: [] };
}

function buildSystemMessage(formattedFiles, validationScope, results) {
  const parts = [];

  if (formattedFiles.length > 0) {
    parts.push(`Prettier formatted ${formattedFiles.length} file(s).`);
  }

  if (validationScope.scope === "non-code") {
    parts.push("No repo validation command was required for the touched files.");
  } else if (results.length > 0) {
    const failed = results.filter((result) => result.status !== 0);

    if (failed.length === 0) {
      parts.push(
        `Post-change validation passed for ${validationScope.scope} changes: ${results
          .map((result) => result.command)
          .join(", ")}.`,
      );
    } else {
      parts.push(
        `Post-change validation found failures for ${validationScope.scope} changes: ${failed
          .map((result) => result.command)
          .join(", ")}.`,
      );
    }
  }

  if (validationScope.note) {
    parts.push(validationScope.note);
  }

  return parts.join(" ");
}

function main() {
  const payload = parseJson(readStdin());
  const toolName = extractToolName(payload);

  if (!EDIT_TOOL_NAMES.has(toolName)) {
    return;
  }

  const touchedFiles = uniqueExistingFiles(extractFilesFromInput(extractToolInput(payload)));

  if (touchedFiles.length === 0) {
    return;
  }

  const formatTargets = touchedFiles.filter(shouldFormat);
  const commandResults = [];

  if (formatTargets.length > 0) {
    commandResults.push(runCommand("npx", ["prettier", "--write", ...formatTargets]));
  }

  const relativePaths = touchedFiles.map(toRelative);
  const validationScope = classifyValidationScope(relativePaths);

  for (const [command, args] of validationScope.commands) {
    commandResults.push(runCommand(command, args));
  }

  const failedResults = commandResults.filter((result) => result.status !== 0);
  const systemMessage = buildSystemMessage(formatTargets, validationScope, commandResults);
  const response = { systemMessage };

  if (failedResults.length > 0) {
    response.decision = "block";
    response.stopReason = failedResults
      .map((result) => `${result.command}: ${result.stderr || result.stdout || "failed"}`)
      .join("\n");
  }

  process.stdout.write(`${JSON.stringify(response)}\n`);
}

main();