# Architecture

## Overview
This repository is structured as an instruction-first agentic SDLC workflow with agents, prompts, skills, MCP configuration, and orchestration runtime files.

## Components
- Agents: coordinate each lifecycle stage.
- Prompts: define detailed task instructions.
- Skills: encapsulate reusable generation and validation behavior.
- MCP: connects Jira and GitHub runtime access through environment-backed configuration.
- Orchestration: coordinates execution order and state tracking.
