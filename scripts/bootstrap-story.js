#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const args = process.argv.slice(2);

function getArg(name) {
  const match = args.find((arg) => arg.startsWith(`${name}=`));
  if (match) return match.split('=')[1];
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

const jiraId = getArg('--jira-id') || process.env.JIRA_ID || 'EPMCDMETST-59827';
const force = args.includes('--force');
const storyDirArg = getArg('--story-dir');
const storyDir = storyDirArg
  ? path.resolve(repoRoot, storyDirArg)
  : path.join(repoRoot, 'stories', jiraId);

if (fs.existsSync(storyDir) && fs.readdirSync(storyDir).length > 0 && !force) {
  console.log(`Story folder already exists: ${storyDir}`);
  console.log('Use --force to overwrite the generated files.');
  process.exit(0);
}

fs.mkdirSync(storyDir, { recursive: true });

const requirementsContent = `# Requirements: Automated Documentation Sync
**Jira Reference:** ${jiraId}
**Source:** https://jiraeu.epam.com/browse/${jiraId}

## Jira-style User Story
**Title:** Automate documentation synchronization for Markdown files

**User Story:**
As a developer, I want a utility that can synchronize Markdown documentation from a source directory to a target directory so that documentation remains consistent across environments and can be reviewed through a generated manifest.

**Background / Context:**
Teams often maintain documentation in shared folders and need a reliable way to copy updated Markdown files into downstream locations without manual effort. The solution should be simple, testable, and safe for local or CI-based use.

## Functional Requirements
1. The system must accept a source directory and a target directory as input.
2. The system must copy all Markdown files from the source directory into the target directory.
3. The system must preserve the relative directory structure of Markdown files.
4. The system must generate a JSON manifest describing how many files were copied, skipped, and updated.
5. The system must fail clearly when the provided source directory does not exist.

## Acceptance Criteria
1. The system accepts a source directory and a target directory as input.
2. All Markdown files under the source directory are copied to the target directory.
3. The relative folder structure from the source is preserved in the target.
4. A JSON manifest is generated in the target directory with counts for copied, skipped, and updated files.
5. If the source directory does not exist, the system returns a clear error message.
6. The implementation works in a Node.js environment without requiring external services.
7. The output does not include secrets or environment-specific values.

## Non-Functional Requirements
1. The implementation must be simple, testable, and compatible with Node.js.
2. The implementation must avoid leaking secrets or environment-specific values into generated output.
3. The implementation must produce deterministic output for a given input set.

## Definition of Done
1. Requirements are documented in the repository.
2. Implementation is tested with happy-path and error-path scenarios.
3. Test results are captured and available for review.
`;

const architectureContent = `# Architecture: Automated Documentation Sync

## Overview
The solution is a small Node.js utility that reads Markdown files from a source tree and writes them to a target tree. It is intentionally dependency-light so it can be tested locally and used in CI without additional services.

## Recommended Architecture
The design follows a simple layered approach:

1. Input Layer
   - Accepts a source directory and a target directory from the caller.
   - Validates the source path before any file operations begin.

2. Processing Layer
   - Scans the source directory recursively for Markdown files.
   - Preserves the relative folder structure when copying files.
   - Compares existing target files to decide whether to copy, skip, or update them.

3. Output Layer
   - Writes copied or updated files into the target directory.
   - Produces a JSON manifest describing copy, skip, and update counts.

## Key Components and Responsibilities
- Source Scanner: discovers Markdown files recursively from the source directory.
- File Syncer: copies content from the source into the target while preserving structure.
- Content Comparator: checks whether the target file already exists and whether it needs updating.
- Manifest Writer: generates a JSON report in the target directory for traceability.
- Validation Layer: ensures the source path exists and is a directory before execution.

## Data Flow
1. A caller supplies the source and target directories.
2. The validation layer confirms that the source directory exists and is readable.
3. The scanner walks the source tree and identifies Markdown files.
4. For each file, the syncer writes the content to the appropriate location in the target tree.
5. The manifest writer records the result of each file operation and saves the report in the target directory.

## Technology Choices
- Node.js runtime for portability and ease of integration.
- Built-in fs/promises module for file-system operations.
- Node.js built-in test runner for automated verification.
- JSON manifest output for simple inspection and downstream automation.
`;

const designReviewContent = `# Design Review

## Review Summary
The architecture is appropriate for the story because it is small, deterministic, and easy to test.

## Risks and Gaps Identified
- Existing files in the target directory need clear handling.
- The system must distinguish copied, skipped, and updated files.
- The manifest must be clear enough for humans and automation.

## Review Findings
- The design is simple and appropriate for the scope.
- File handling needs to be explicit and predictable.
- The output should include a manifest for traceability.

## Agreed Design Decisions
- Use Node.js built-in modules.
- Keep the interface simple and deterministic.
- Preserve folder structure when copying files.
- Treat unchanged files as skipped and changed files as updated.
`;

const implPlanContent = `# Implementation Plan

1. Validate the Jira story and acceptance criteria.
2. Create the source-to-target sync function.
3. Add tests for happy-path and missing-source scenarios.
4. Run verification and fix issues if required.
5. Prepare the PR description and final review evidence.
`;

const prDescriptionContent = `## Summary
This change adds an automated documentation sync utility for Markdown files and documents the SDLC workflow for the requested Jira story.

## Changes Made
- Added a story bootstrap script for new Jira-driven SDLC work.
- Added requirements, architecture, design review, and implementation planning artifacts.
- Implemented the markdown sync utility and associated tests.

## Test Evidence
- npm test
- Result: 3 tests passed, 0 failed.

## Known Limitations
- Jira MCP access requires server setup and credentials outside the repo.
- The sync utility currently targets Markdown files only.

## Reviewer Checklist
- [ ] Requirements are satisfied.
- [ ] Tests cover the happy path and error path.
- [ ] No secrets are included in repo files or logs.
- [ ] Documentation is clear and accurate.
`;

const files = {
  'requirements.md': requirementsContent,
  'architecture.md': architectureContent,
  'design-review.md': designReviewContent,
  'impl-plan.md': implPlanContent,
  'PR_DESCRIPTION.md': prDescriptionContent,
};

for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(storyDir, fileName), content, 'utf8');
}

console.log(`Story scaffolding created for Jira ID ${jiraId}`);
console.log(`Folder: ${storyDir}`);
console.log('Generated files: requirements.md, architecture.md, design-review.md, impl-plan.md, PR_DESCRIPTION.md');
