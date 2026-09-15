#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const instructionsDir = path.join(repoRoot, '.github', 'instructions');
const skillsDir = path.join(repoRoot, '.github', 'skills');
const args = process.argv.slice(2);
const mode = args.find((arg) => !arg.startsWith('--')) || 'help';
const jiraArgIndex = args.findIndex((arg) => arg === '--jira-id' || arg.startsWith('--jira-id='));
const jiraId =
  jiraArgIndex >= 0
    ? args[jiraArgIndex].startsWith('--jira-id=')
      ? args[jiraArgIndex].split('=')[1]
      : args[jiraArgIndex + 1]
    : process.env.JIRA_ID || 'EPMCDMETST-59827';

const modeMap = {
  'jira-mcp': 'jira-mcp-skill.md',
  requirements: 'requirements-skill.md',
  architecture: 'architecture-skill.md',
  review: 'design-review-skill.md',
  plan: 'implementation-plan-skill.md',
  implement: 'implementation-skill.md',
  verify: 'verify-skill.md',
  pr: 'pr-skill.md',
  help: null,
};

if (mode === 'help' || !modeMap[mode]) {
  console.log('Agentic SDLC trigger usage:');
  console.log('  npm run agentic:jira');
  console.log('  npm run agentic:sdlc -- jira-mcp');
  console.log('  npm run agentic:sdlc -- jira-mcp --jira-id EPMCDMETST-59827');
  console.log('  JIRA_ID=EPMCDMETST-59827 npm run agentic:sdlc -- jira-mcp');
  console.log('  npm run agentic:sdlc -- requirements');
  console.log('  npm run agentic:sdlc -- architecture');
  console.log('  npm run agentic:sdlc -- review');
  console.log('  npm run agentic:sdlc -- plan');
  console.log('  npm run agentic:sdlc -- implement');
  console.log('  npm run agentic:sdlc -- verify');
  console.log('  npm run agentic:sdlc -- pr');
  process.exit(0);
}

const skillFile = path.join(skillsDir, modeMap[mode]);
const instructionFile = path.join(instructionsDir, 'agentic-sdlc.instructions.md');

if (!fs.existsSync(skillFile)) {
  console.error(`Skill file not found: ${skillFile}`);
  process.exit(1);
}

if (!fs.existsSync(instructionFile)) {
  console.error(`Instruction file not found: ${instructionFile}`);
  process.exit(1);
}

const skillText = fs.readFileSync(skillFile, 'utf8');
const instructionText = fs.readFileSync(instructionFile, 'utf8');

console.log('=== Agentic SDLC Trigger ===');
console.log(`Mode: ${mode}`);
console.log(`Jira ID: ${jiraId}`);
console.log('--- Instructions ---');
console.log(instructionText.trim());
console.log('--- Skill ---');
console.log(skillText.trim());
console.log('--- Action ---');
console.log(`The workflow for '${mode}' is now ready to be executed by GitHub Copilot Agent Mode.`);
console.log(`Jira story target: ${jiraId}`);
console.log('Use the MCP Jira server for story retrieval when available.');
console.log('If Jira MCP is not connected, ask the user to provide the Jira MCP connection or a PAT/OAuth token at the MCP layer.');
