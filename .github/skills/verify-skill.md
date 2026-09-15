# Skill: Verify

## Purpose
Run the project validation command and report fresh evidence of the outcome.

## Description
Validates the implementation and records whether the project is ready for release or still blocked by issues.

## Trigger
Used by: Verification Agent - Step 1 (Run Validation).

## Requires
- implementation changes
- repository validation command

## Output Location
`outputs/<JIRA-ID>/verification-report.md`

## Template
```markdown
# Verification Report

## Command
- <command used>

## Result
- Passed / Failed

## Evidence
- <test output>

## Notes
- <fix or follow-up>
```
