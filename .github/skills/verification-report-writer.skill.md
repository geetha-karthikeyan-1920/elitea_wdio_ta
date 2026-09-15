# Skill: Verification Report Writer

## Purpose
Capture fresh validation evidence and report the verification state.

## Description
Runs and records the repository validation result and converts it into a structured verification report.

## Trigger
Used by: Verification Agent - Step 1 (Run Validation).

## Requires
- project verification command
- implementation results

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
- <key output>

## Notes
- <fixes applied>
- <next action>
```
