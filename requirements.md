# Requirements: Automated Documentation Sync

## Summary
A developer should be able to sync Markdown documentation from a source directory into a target directory with a deterministic manifest so that shared documentation stays consistent across environments.

## Functional Requirements
1. The system must accept a source directory and a target directory as input.
2. The system must copy all Markdown files from the source directory into the target directory.
3. The system must preserve the relative directory structure of Markdown files.
4. The system must generate a JSON manifest describing how many files were copied, skipped, and updated.
5. The system must fail clearly when the provided source directory does not exist.

## Non-Functional Requirements
1. The implementation must be simple, testable, and compatible with Node.js.
2. The implementation must avoid leaking secrets or environment-specific values into generated output.
3. The implementation must produce deterministic output for a given input set.
