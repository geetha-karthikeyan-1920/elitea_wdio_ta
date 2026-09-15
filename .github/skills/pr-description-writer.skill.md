# Skill: PR Description Writer

## Purpose
Draft the final PR summary and evidence package for review.

## Description
Creates a concise PR description that summarizes the changes, the validation evidence, and the release readiness statement.

## Trigger
Used by: PR Agent - Step 3 (Prepare PR Description).

## Requires
- verified implementation state
- evidence summary

## Output Location
`PR_DESCRIPTION.md`

## Template
```markdown
## Summary
This change adds ...

## Changes Made
- <change 1>
- <change 2>

## Verification
- <command>
- Result: <pass/fail>

## Reviewer Checklist
- [ ] <check>
- [ ] <check>
```
