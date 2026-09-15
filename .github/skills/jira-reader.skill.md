# Skill: Jira Reader

## Purpose
Fetch and parse Jira ticket content required for the SDLC workflow.

## Description
Reads a Jira story by ID or URL and extracts the key user story details, acceptance criteria, and context required for downstream artifact generation.

## Trigger
Used by: Requirement Analysis Agent - Step 1 (Fetch Requirement).

## Requires
- Jira ticket ID or Jira ticket URL.
- MCP Jira server connection.

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
**Context:**
- <key context item>
```
