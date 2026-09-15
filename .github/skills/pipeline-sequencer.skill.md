# Skill: Pipeline Sequencer

## Purpose
Determine the correct pipeline sequence and execution boundaries for the Agentic SDLC flow.

## Description
Calculates the starting stage, validates execution order, and keeps the run aligned to the configured agent chain and stage dependencies.

## Trigger
Used by: Orchestration Agent - Step 4 (Resolve start stage and sequence).

## Requires
- Jira link or issue ID
- Saved pipeline state when resuming
- Current execution context

## Output Location
`pipeline-state.json`

## Template
```json
{
  "jiraId": "<JIRA-ID>",
  "startStage": "Requirement Analysis Agent",
  "nextStage": "Architecture Agent",
  "completedStages": ["Requirement Analysis Agent"],
  "history": [
    {
      "stage": "Requirement Analysis Agent",
      "status": "completed",
      "timestamp": "<ISO-8601>"
    }
  ]
}
```
