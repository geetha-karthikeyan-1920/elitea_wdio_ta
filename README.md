# Agentic SDLC Capstone

This repository implements a GitHub Copilot-driven agentic SDLC flow for the Automated Documentation Sync use case.

## Jira and MCP Connectivity
The workflow expects Jira access through an MCP server. If the MCP server is not configured in this environment, the agent must ask for a Jira MCP connection or a PAT/OAuth token at the MCP layer before reading the story.

## Agentic Workflow Structure
The SDLC is driven through:
- .github/copilot-instructions.md
- .github/instructions/agentic-sdlc.instructions.md
- .github/skills/*.md
- scripts/run-agentic-sdlc.js

## Jira MCP
Jira access is expected to come through an MCP server, not by hardcoding secrets into repo files.

Configuration options:
- npm run agentic:jira
- npm run agentic:sdlc -- jira-mcp --jira-id EPMCDMETST-59827
- JIRA_ID=EPMCDMETST-59827 npm run agentic:sdlc -- jira-mcp

If the MCP Jira server is not connected, the workflow must stop and ask for:
- the Jira MCP server connection details, or
- a PAT/OAuth token at the MCP layer

Do not store Jira tokens in repository files or logs.

## Bootstrap a New Story
Create a fresh story folder and seed the standard SDLC files with:
- npm run bootstrap:story
- npm run bootstrap:story -- --jira-id EPMCDMETST-59827
- JIRA_ID=EPMCDMETST-59827 npm run bootstrap:story

This creates files in a stories/<jira-id> folder with the usual:
- requirements.md
- architecture.md
- design-review.md
- impl-plan.md
- PR_DESCRIPTION.md

## Trigger Commands
Run the workflow step-by-step using:
- npm run agentic:jira
- npm run agentic:sdlc -- requirements
- npm run agentic:sdlc -- architecture
- npm run agentic:sdlc -- review
- npm run agentic:sdlc -- plan
- npm run agentic:sdlc -- implement
- npm run agentic:sdlc -- verify
- npm run agentic:sdlc -- pr

## Capstone Scope
The project captures the full lifecycle:
- user story and requirements
- architecture and design review
- implementation planning
- implementation and code review
- verification
- pull request preparation

## Validation
The feature is verified with:
- npm test
