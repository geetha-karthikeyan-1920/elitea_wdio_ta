# Skill: Context Attachment Reader

## Purpose
Read optional files, attachments, and supporting context that help the pipeline understand the story and execution environment.

## Description
Loads external attachments and project context, normalizes the content, and passes the relevant details to the orchestration and analysis stages.

## Trigger
Used by: Orchestration Agent - Step 2 (Build initial pipeline context).

## Requires
- Jira link
- Optional attachment path
- Repository context or supporting files

## Output Location
`outputs/<JIRA-ID>/context-summary.md`

## Template
```markdown
# Context Summary

## Story
- Jira: <JIRA-ID>
- Title: <title>

## Inputs Received
- Attachment: <path or none>
- Supporting metadata: <details>

## Relevant Context
- <context item 1>
- <context item 2>
```
