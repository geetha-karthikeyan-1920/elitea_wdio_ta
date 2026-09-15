# Skill: Architecture

## Purpose
Design a high-level architecture that satisfies the finalized requirements and aligns with the project constraints.

## Description
Creates a clear architecture artifact that explains the domain boundaries, main components, responsibilities, and data flow for the approved story.

## Trigger
Used by: Architecture Agent - Step 1 (Review Requirements and Draft Architecture).

## Requires
- requirements.md
- Jira story and context
- technical constraints

## Output Location
`outputs/<JIRA-ID>/architecture.md`

## Template
```markdown
# Architecture: <Feature/Story Title>

## Goal
<brief architecture goal tied to the requirement>

## System Context
- actors
- systems
- boundaries

## Components
- <component>: <responsibility>

## Data Flow
1. <request flow>
2. <processing>
3. <response or persistence>

## Technology Choices
- <technology>: <rationale>

## Risks / Constraints
- <risk>
- <constraint>
```
