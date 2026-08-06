# Architecture: Automated Documentation Sync

## Overview
The solution is a small Node.js utility that reads Markdown files from a source tree and writes them to a target tree. It is intentionally dependency-light so it can be tested locally and used in CI without additional services.

## Components
- Source Reader: scans the source directory for Markdown files.
- File Syncer: copies files into the target directory while preserving the directory structure.
- Manifest Writer: emits a JSON manifest capturing copy and skip counts.

## Data Flow
1. A caller provides a source directory and target directory.
2. The sync utility validates the source directory.
3. Markdown files are discovered and copied into the target tree.
4. A manifest is written to the target directory.

## Technology Choices
- Node.js runtime for portability.
- Built-in fs/promises module for file system operations.
- Node's built-in test runner for automated verification.
