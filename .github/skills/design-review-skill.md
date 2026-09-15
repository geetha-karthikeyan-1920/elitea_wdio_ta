# Skill: Design Review

## Purpose
Review the proposed architecture and highlight risks, gaps, or incomplete decisions before implementation starts.

## Description
Critically checks the architecture against requirements, maintainability, operational clarity, and delivery risk.

## Trigger
Used by: Design Review Agent - Step 2 (Assess Risks and Gaps).

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
