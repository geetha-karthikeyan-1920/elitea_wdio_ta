# Skill: Implementation Executor

## Purpose
Execute the implementation plan while preserving quality, clarity, and traceability.

## Description
Builds the approved solution, adds or updates tests, and keeps implementation aligned with the requirements and architecture.

## Trigger
Used by: Implementation Agent - Step 2 (Implement the Solution).

## Requires
- impl-plan.md
- requirements.md
- architecture.md

## Output Location
`outputs/<JIRA-ID>/implementation-summary.md`

## Template
```markdown
# Implementation Summary

## Changes Made
- <change 1>
- <change 2>

## Test Coverage
- <test updated>

## Notes
- <implementation note>
```
