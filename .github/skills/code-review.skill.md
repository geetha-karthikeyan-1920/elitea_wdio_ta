# Skill: Code Review

## Purpose
Review the implementation for correctness, quality, and risk before verification.

## Description
Checks code for correctness, maintainability, security, edge cases, dependency safety, and alignment to the story requirements.

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
- <status: approved / requires fixes>

## Findings
- <finding 1>
- <finding 2>

## Blockers
- <blocker>

## Recommendation
- <decision>
```
