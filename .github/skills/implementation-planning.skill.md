# Skill: Implementation Planning

## Purpose
Create a dependency-ordered implementation plan from the approved architecture and requirements.

## Description
Transforms the approved architecture into a stepwise implementation plan with ordered tasks, dependencies, and review gates.

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

1. Validate the Jira story and requirements.
2. Implement the minimal data or domain changes.
3. Add/adjust tests for the behavior.
4. Run verification and fix issues.
5. Prepare the PR summary and evidence.
```
