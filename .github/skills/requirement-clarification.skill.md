# Skill: Requirement Clarification

## Purpose
Identify ambiguity and generate clarifying questions before finalizing requirements.

## Description
Detects gaps, duplicates, or unclear scope in a user story and generates focused clarification questions for the user or orchestrator.

## Trigger
Used by: Requirement Analysis Agent - Step 2 (Validate and Clarify).

## Requires
- Jira story content
- Business context and supporting notes

## Output Location
`outputs/<JIRA-ID>/clarification-questions.md`

## Template
```markdown
# Clarification Questions

1. <question 1>
2. <question 2>
3. <question 3>

## Why this matters
- <reason>
```
