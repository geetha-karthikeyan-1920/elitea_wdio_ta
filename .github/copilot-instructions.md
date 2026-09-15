# GitHub Copilot Agentic SDLC Instructions

- Treat every user story as a full SDLC loop: requirements, architecture, design review, planning, implementation, review, verification, and PR preparation.
- Use Jira through an MCP server whenever available. If the MCP server is not configured, ask the user to provide the Jira MCP connection or a PAT/OAuth token at the MCP server layer.
- Execute each phase through a dedicated skill file and a single trigger script.
- Keep artifacts in the repository root: requirements.md, architecture.md, design-review.md, impl-plan.md, PR_DESCRIPTION.md.
- Validate code changes with the repository test command before completion.
- Do not expose secrets or tokens in generated markdown or logs.
