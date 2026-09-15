# Skill: Review

## Purpose
Review the implementation before verification, ensuring correctness, safety, and quality expectations are met.

## Description
Checks the code for correctness, edge-case handling, readability, maintainability, and dependency safety against the story requirements.

## Trigger
Used by: Code Review Agent - Step 1 (Read the Implementation).

## Requires
- implementation changes
- requirements.md
- architecture.md

## Output Location
`outputs/<JIRA-ID>/code-review.md`

## Template
```markdown
# Code Review

## Summary
- <status>

## Findings
- <finding 1>
- <finding 2>

## Blockers
- <blocker>
```
