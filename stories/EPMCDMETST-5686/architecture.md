# Architecture: Automated Documentation Sync

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
