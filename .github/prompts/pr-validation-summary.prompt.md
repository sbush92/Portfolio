---
description: "Prepare a PR-ready validation summary for this Portfolio repo. Use when writing pull request notes, review responses, or validation updates after code changes."
name: "Portfolio PR Validation Summary"
argument-hint: "Describe the change set, for example: frontend blog pagination fix or backend blog endpoint update"
agent: "agent"
---

# Portfolio PR Validation Summary

Use the repository skill [validate-portfolio](../skills/validate-portfolio/SKILL.md) to choose the right validation scope and checks for the described changes.

Follow the repo expectations in [AGENTS.md](../../AGENTS.md) and align the output with the review intent in [pull_request_template.md](../pull_request_template.md).

## What To Do

1. Determine whether the changes are frontend-only, backend-only, or repo-wide.
2. Run or summarize the right validation steps for that scope.
3. State clearly when coverage is partial, especially for backend-only work or frontend-backend integration.

## Output Format

Produce a concise PR-ready section using exactly these headings:

```md
## Validation scope

## Commands and checks

## Result

## Coverage gaps
```

Keep it brief, concrete, and tied to commands or editor validations actually performed.