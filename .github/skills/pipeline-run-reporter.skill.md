# Skill: Pipeline Run Reporter

## Purpose
Record each stage execution result and summarize the run history for state tracking and final reporting.

## Description
Captures stage outcomes, timestamps, produced files, and status transitions so the pipeline can resume cleanly and the final summary stays accurate.

## Trigger
Used by: Orchestration Agent - Step 6 (Record stage result and progress).

## Requires
- Active pipeline state
- Stage output expectations
- Execution result and timestamps

## Output Location
`pipeline-run.json`

## Template
```json
{
  "jiraId": "<JIRA-ID>",
  "startedAt": "<ISO-8601>",
  "completedAt": "<ISO-8601>",
  "stages": [
    {
      "name": "Requirement Analysis Agent",
      "status": "completed",
      "output": "outputs/<JIRA-ID>/requirements.md",
      "timestamp": "<ISO-8601>"
    }
  ]
}
```
