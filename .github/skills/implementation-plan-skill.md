# Skill: Implementation Planning

## Purpose
Create a dependency-ordered implementation plan for the approved story.

## Description
Breaks the accepted design into stepwise work items, dependencies, validation gates, and delivery checkpoints.

## Trigger
Used by: Implementation Planning Agent - Step 1 (Break Work into Phases).

## Requires
- requirements.md
- architecture.md
- design-review.md

## Output Location
`outputs/<JIRA-ID>/impl-plan.md`

## Template
```markdown
# Implementation Plan

1. Review requirements and the accepted architecture.
2. Implement the minimal domain or service changes.
3. Add or update tests.
4. Run verification and fix any issues.
5. Prepare the PR summary and evidence.
```
