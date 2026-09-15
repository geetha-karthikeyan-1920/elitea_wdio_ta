# Skill: PR

## Purpose
Prepare a concise pull request summary with validation evidence and reviewer-ready notes.

## Description
Creates the final PR summary and evidence package from the implemented and verified solution.

## Trigger
Used by: PR Agent - Step 3 (Prepare PR Description).

## Requires
- verified implementation state
- validation evidence

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
