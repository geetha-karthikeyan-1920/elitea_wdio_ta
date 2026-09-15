# Skill: Requirements

## Purpose
Analyze the Jira story and produce a clear, testable requirements artifact.

## Description
Translates the Jira story into a structured requirements document with scope, user story, acceptance criteria, and definition of done.

## Trigger
Used by: Requirement Analysis Agent - Step 3 (Write Requirements).

## Requires
- Jira story details
- clarifying context or assumptions

## Output Location
`outputs/<JIRA-ID>/requirements.md`

## Template
```markdown
# Requirements: <Feature/Story Title>

## Jira Reference
- <JIRA-ID>

## User Story
As a <role>, I want <goal> so that <benefit>.

## Functional Requirements
1. <requirement 1>
2. <requirement 2>

## Acceptance Criteria
1. <criterion 1>
2. <criterion 2>

## Non-Functional Requirements
- <nfr>

## Definition of Done
- <done condition>
```
