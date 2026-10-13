## Summary
This change adds a stays search session model for EPMCDMETST-47868 so advanced filters and ISO currency viewing can be verified in this repository. The Jira story describes a stays results page, and this repo has no stays UI, so the behavior lives in a Node.js module with unit tests. Unspecified filters and the missing currency attachment are recorded as assumptions instead of being treated as confirmed product rules.

## Changes Made
- Added `requirements.md`, `architecture.md`, `design-review.md`, and `impl-plan.md` for the stays story and its agreed assumptions.
- Added `src/staysSearch.js` to open, apply, and clear advanced filters, select a story currency, format prices, and keep that currency across details navigation.
- Added `test/staysSearch.test.js` for the happy paths and the missing-field / not-found cases.
- Updated the `test` script in `package.json` so `npm test` runs the stays tests together with the existing documentation-sync tests.
- Added `.cursor/hooks/block-secret-commands.js` so shell commands that reference Jira or GitHub token variables are denied.
- Corrected orchestration file writing in `orchestration/run-agentic-pipeline.ps1` so pipeline summaries are written as plain lines.
- Added the story evidence under `outputs/EPMCDMETST-47868/`.

## Test Evidence
Command: `npm test -- --test-reporter=spec`

```
✔ syncDocumentation copies markdown files and writes a manifest
✔ syncDocumentation updates nested markdown files while preserving relative paths
✔ syncDocumentation throws a clear error when the source directory is missing
✔ package scripts expose the documented SDLC workflow commands
✔ advanced filters are additional controls and applying them updates results
✔ clearing advanced filters restores the unfiltered result list
✔ currency selection displays story currency codes and persists across details navigation
✔ missing stays, unknown filters, unknown currencies, and missing rates fail clearly
✔ applying filters before the panel is open is rejected
✔ stays search output does not read or echo credentials
ℹ tests 10
ℹ pass 10
ℹ fail 0
```

## Known Limitations
- The advanced filter names are illustrative. Jira does not define the real panel controls.
- The currency attachment was not on the ticket, so only USD (840), EUR (978), GBP (826), AED (784), and JPY (392) are supported.
- Conversion uses a caller-supplied rate table. A missing rate is reported as not found. There is no live exchange-rate source.
- Currency persistence is in-memory session state for results and details. It is not a user profile.
- No stays browser UI or WebdriverIO page is included, because that application is not in this repository.
- `npm audit` reports 23 pre-existing findings in the WebdriverIO dependency tree. This change does not add or upgrade those packages.

## Reviewer Checklist
- [ ] The stays behavior matches `requirements.md`, including the documented assumptions.
- [ ] Tests cover apply, clear, currency display, persistence, and the not-found / missing-field cases.
- [ ] No secrets or tokens appear in source, tests, or the pull request text.
- [ ] The illustrative filter catalog and the five-currency limit are acceptable until product confirms the gaps.
- [ ] Pre-existing WebdriverIO audit findings are understood to be outside this story.
