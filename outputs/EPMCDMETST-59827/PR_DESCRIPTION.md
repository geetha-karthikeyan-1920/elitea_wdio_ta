# Pull Request Description

## Summary
This change restores the instruction-driven Agentic SDLC structure, including agents, skills, prompts, MCP, and orchestration scaffolding.

## Validation
- `npm test -- --test-reporter=spec` passed
- `npm run orchestration:run -- -JiraLink "https://jiraeu.epam.com/browse/EPMCDMETST-59827" -AttachmentPath "./README.md"` succeeded
