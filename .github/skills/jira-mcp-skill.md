# Skill: Jira MCP

## Purpose
Connect to the Jira MCP server and retrieve the story metadata needed for requirement analysis.

## Description
Uses the configured Jira connection to fetch the issue summary, description, comments, and acceptance criteria for downstream workflow stages.

## Trigger
Used by: Requirement Analysis Agent - Step 1 (Fetch Requirement).

## Requires
- Jira ticket ID or URL
- MCP Jira server configuration

## Output Location
`outputs/<JIRA-ID>/requirements.md`

## Template
```markdown
# Jira Story: <Title>

**JIRA ID:** <JIRA-ID>
**URL:** <ticket-url>
**Summary:** <short summary>
**Acceptance Criteria:**
- <criterion 1>
- <criterion 2>
```
