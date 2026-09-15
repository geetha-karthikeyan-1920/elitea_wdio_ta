# Agentic SDLC Workflow Instructions

Use this workflow for each new Jira story.

1. Read the Jira story through the configured MCP Jira server.
2. Confirm the story, scope, and acceptance criteria with the user if anything is ambiguous.
3. Update requirements.md with the final user story and acceptance criteria.
4. Create the architecture.md based on the requirements and document the components and data flow.
5. Conduct a design review and save findings in design-review.md.
6. Generate a dependency-ordered implementation plan in impl-plan.md.
7. Implement the approved changes.
8. Perform a structured peer review against correctness, security, error handling, test coverage, clarity, DRY, and dependency safety.
9. Run the verification suite and capture the evidence.
10. Prepare the PR description in PR_DESCRIPTION.md and create the pull request.

Trigger this workflow by running:
- npm run agentic:sdlc -- requirements
- npm run agentic:sdlc -- architecture
- npm run agentic:sdlc -- review
- npm run agentic:sdlc -- verify
- npm run agentic:sdlc -- pr
