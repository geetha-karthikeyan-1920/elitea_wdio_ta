# Skill: Requirements Doc Writer

## Purpose
Generate the `requirements.md` file from the finalized requirement specification.

## Description
Creates `requirements.md` using a standard template based on the Jira story and clarified requirements.

## Trigger
Used by: Requirement Analysis Agent - Step 3 (Write Requirements).

## Requires
- Finalized user story and acceptance criteria.
- Clarified business scope and constraints.

## Output Location
`outputs/<JIRA-ID>/requirements.md`

## Template
```markdown
# Requirements: <Feature/Story Title>
**Jira Reference:** <JIRA-ID>
**Source:** <ticket-url>

## Jira-style User Story
**Title:** <title>
**User Story:**
As a <role>, I want <goal> so that <benefit>.

## Functional Requirements
1. <requirement 1>
2. <requirement 2>

## Acceptance Criteria
1. <criterion 1>
2. <criterion 2>

## Non-Functional Requirements
1. <nfr>
2. <nfr>

## Definition of Done
1. <done condition>
2. <done condition>
```
