# Code Review: EPMCDMETST-47868

## Correctness
`src/staysSearch.js` matches `requirements.md` for the agreed assumptions. Advanced controls are disjoint from basic controls. Apply narrows the stay list and `activeFilterSelections` exposes the chosen values. Clear restores the full list. Currency labels use the five story codes, and the selected code remains on the session through details and back to results.

## Security
The stays module does not read `process.env` and does not reference `JIRA_API_TOKEN` or `GITHUB_TOKEN`. A test asserts both the source and a serialized price result. `.cursor/hooks/block-secret-commands.js` denies a shell command that references those variables. Filter ids, empty values, and currency codes are validated before use.

## Error Handling
Missing stays, an unknown filter, a blank filter value, an unknown currency, a missing stay id, a missing price, and a missing rate each throw a specific error. Apply is rejected when the advanced panel is closed.

## Test Coverage
`test/staysSearch.test.js` covers apply, clear, currency display, persistence, and the not-found / missing-field cases. `npm test` also still runs the documentation-sync tests.

## Code Clarity
Session actions are named for the story steps: `openAdvancedFilters`, `applyAdvancedFilters`, `clearAdvancedFilters`, `selectCurrency`, `openStayDetails`, and `backToResults`.

## DRY
Currency lookup, price conversion, and session copying are shared helpers. Filter matching lives in one function.

## Dependency Safety
This change adds no package. `npm audit` reports 23 existing findings (22 high, 1 moderate) in the WebdriverIO development tree, including `@wdio/cli`, `webdriverio`, and `undici`. `fixAvailable` is true for those advisory chains. They were not introduced by the stays module, and this change does not upgrade them.

## Review Result
No blocking defect in the stays session model. The remaining product gaps are the unnamed filter catalog, the missing currency attachment, and the absence of a stays UI in this repository.
