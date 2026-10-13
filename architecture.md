# Architecture: Stays advanced filters and currency viewing

**Jira Reference:** EPMCDMETST-47868

## Overview
The story is implemented as a Node.js session model in `src/staysSearch.js`. A caller supplies the current stay list, an optional filter catalog, and a conversion rate table. The module returns a new session for each action so results, active filters, and the selected currency stay explicit and testable.

This repository is a WebdriverIO test-automation project. It does not host the stays search user interface, so the architecture stops at the session model the UI would call.

## Components and Responsibilities
- **Search session:** holds stays, the filter catalog, rates, the open/closed panel flag, active advanced filters, the selected currency, and whether the traveler is on results or details.
- **Filter catalog:** separates basic controls from advanced controls. Opening the panel rejects a catalog that has no advanced controls or that repeats a basic control id.
- **Filter applicator:** checks each advanced selection against the catalog, drops stays that do not match, and returns the active selections for display.
- **Currency catalog:** exposes the five story codes and numeric codes. Unknown codes are rejected.
- **Price formatter:** converts a stay's base amount with the supplied rate table and formats `CODE (numeric) amount`.
- **Navigation state:** opening details and returning to results keeps the selected currency on the same session.

## Data Flow
1. The caller creates a session with stays and rates.
2. Opening Advanced filters marks the panel open and lists controls that are not basic filters.
3. Apply validates the selection, stores it, and the result query returns only matching stays with prices in the selected currency.
4. Clear removes the advanced selection and the next result query returns the full list.
5. Choosing a currency updates the session. Result rows and the details view both read that currency.
6. Returning from details keeps the currency and clears only the selected stay id.

## Technology Choices
- Node.js built-in modules only. No new package was added for this story.
- Node.js built-in test runner, consistent with `test/documentationSync.test.js`.
- Plain objects for session state so the behavior can be asserted without a browser.

## Existing Repository Context
`src/documentationSync.js` remains the earlier documentation-sync utility. It is not on the data path for stays search.
