# Skill: Design Review Checklist

## Purpose
Perform a design review against correctness, quality, and delivery risk.

## Description
Checks the proposed design for correctness, security, maintainability, testability, and operational clarity before implementation begins.

## Trigger
Used by: Design Review Agent - Step 2 (Check Risks and Gaps).

## Requires
- architecture.md
- requirements.md

## Output Location
`outputs/<JIRA-ID>/design-review.md`

## Template
```markdown
# Design Review

## Review Summary
- <summary>

## Risks and Gaps
- <risk 1>
- <risk 2>

## Findings
- <finding>

## Decisions
- <decision>
```
