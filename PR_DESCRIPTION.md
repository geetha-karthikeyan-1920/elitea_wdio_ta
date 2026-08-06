## Summary
This change introduces an automated documentation sync utility for Markdown files, along with the required SDLC artifacts for the capstone exercise. The implementation makes it easier to keep documentation aligned across source and target directories while producing a manifest for auditability.

## Changes Made
- Added a documentation sync utility in src/documentationSync.js to copy Markdown files recursively and generate a sync manifest.
- Added regression tests in test/documentationSync.test.js covering successful sync and missing-source error handling.
- Added the capstone requirements, architecture, design review, and implementation plan documents in requirements.md, architecture.md, design-review.md, and impl-plan.md.
- Updated package.json to expose a runnable test script for the new feature.

## Test Evidence
- Verified by running: `npm test`
- Result: 2 tests passed, 0 failed.

## Known Limitations
- The repository still contains the original WebdriverIO example spec, which is not part of the new documentation sync feature.
- The implementation currently focuses on Markdown files and does not yet support other document types.

## Reviewer Checklist
- [ ] The requirements are satisfied by the implementation.
- [ ] The new tests cover the happy path and the missing-source error case.
- [ ] No secrets or sensitive values are emitted in the manifest or logs.
- [ ] The code is clear and easy to follow.
