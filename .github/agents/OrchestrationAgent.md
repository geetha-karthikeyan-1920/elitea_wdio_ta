# Orchestration Agent

## Purpose
The Orchestration Agent is the entry point for the full Agentic SDLC pipeline. It accepts a Jira ticket link and an optional attachment, executes all agents in sequence, and tracks end-to-end progress with resumable state.

## Identity
- **Name:** Orchestration Agent
- **Role:** Pipeline Conductor
- **Order in pipeline:** 0 (entry point)
- **Previous agent:** None
- **Next agent:** Requirement Analysis Agent

## Inputs
- Jira link (required)
- Attachment file path (optional)
- Repository metadata and current execution context

## Skills Used
- Skills/pipeline-sequencer.skill.md
- Skills/context-attachment-reader.skill.md
- Skills/pipeline-run-reporter.skill.md
- Skills/pipeline-ui-builder.skill.md

## Prompts Used
- Prompts/orchestration.prompt.md

## MCP Servers Used
- MCP Jira server for reading Jira metadata and comments
- MCP GitHub server for repository and PR-related operations as needed

## Execution Entrypoint
- *Cursor in chat alternative:* use this agent directly to scaffold a custom agent flow for your workload.
- script: "orchestration/run-agentic-pipeline.ps1"
- This script is the runtime engine for this agent. It is the single file that executes all 8 pipeline stages, calls Jira/GitHub APIs, runs git operations, and persists resumable state.
- Run command:
  `powershell -NoProfile -ExecutionPolicy Bypass -File "orchestration/run-agentic-pipeline.ps1" -JiraLink "<JIRA-LINK>" -AttachmentPath "<FILE_PATH>" -Resume`

## Pipeline Sequence
1. Requirement Analysis Agent
2. Architecture Agent
3. Design Review Agent
4. Implementation Planning Agent
5. Implementation Agent
6. Code Review Agent
7. Verification Agent
8. PR Agent

## Workflow
1. Parse Jira ID from input link.
2. Build initial pipeline context from Jira metadata and optional attachment.
3. Resolve execution start stage using `-StartFromStage` or saved `pipeline-state.json` when using `-Resume`.
4. Execute each stage in strict order from the resolved start stage.
5. After each stage, verify expected outputs before moving to the next stage.
6. Record stage status, produced files, and timestamps in `pipeline-run.json`.
7. Persist resumable state in `pipeline-state.json` (last completed stage, next stage, history).
8. Publish final summary in `pipeline-summary.md` and generate static demo UI in `pipeline-demo.html`.

## Guardrails
- Do not skip stage order.
- Do not mark a stage complete unless expected output exists.
- Stop on blocking failure and record actionable next steps.
- Preserve artifact traceability under `outputs/<JIRA-ID>/`.
- Do not require manual per-agent execution for normal pipeline runs.

## Outputs
- `pipeline-run.json` for execution history and stage state
- `pipeline-state.json` for resumable progress
- `pipeline-summary.md` for the final orchestrated summary
- `pipeline-demo.html` for static UI/demo publication
- per-stage artifacts under `outputs/<JIRA-ID>/`
