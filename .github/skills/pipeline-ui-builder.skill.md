# Skill: Pipeline UI Builder

## Purpose
Generate a static UI artifact that summarizes the orchestration outcome and pipeline progress.

## Description
Builds a review-friendly HTML dashboard for the final pipeline run by summarizing state, files created, and the completed stage sequence.

## Trigger
Used by: Orchestration Agent - Step 8 (Publish final summary and UI artifact).

## Requires
- Final pipeline state
- Completed stage summary
- Final artifact list

## Output Location
`pipeline-demo.html`

## Template
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Pipeline Demo</title>
  </head>
  <body>
    <h1>Agentic SDLC Pipeline Summary</h1>
    <ul>
      <li>Jira ID: <JIRA-ID></li>
      <li>Status: Complete</li>
      <li>Stages: <stage-list></li>
    </ul>
  </body>
</html>
```
