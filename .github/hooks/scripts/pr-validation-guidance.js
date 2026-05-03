const fs = require("fs");

function readStdin() {
  return fs.readFileSync(0, "utf8");
}

function extractPromptText(payload) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const candidates = [
    payload.prompt,
    payload.userPrompt,
    payload.message,
    payload.text,
    payload.input,
    payload?.session?.prompt,
    payload?.session?.userPrompt,
  ];

  const firstText = candidates.find((value) => typeof value === "string");
  return firstText ?? "";
}

function main() {
  const raw = readStdin().trim();

  if (!raw) {
    return;
  }

  let payload;

  try {
    payload = JSON.parse(raw);
  } catch {
    return;
  }

  const promptText = extractPromptText(payload).toLowerCase();
  const shouldGuide = /(pull request|\bpr\b|review|validation|validate|checks?)/.test(
    promptText,
  );

  if (!shouldGuide) {
    return;
  }

  const response = {
    systemMessage:
      "For Portfolio PR or validation work, prefer the validate-portfolio skill and present results with: Validation scope, Commands and checks, Result, and Coverage gaps.",
  };

  process.stdout.write(`${JSON.stringify(response)}\n`);
}

main();