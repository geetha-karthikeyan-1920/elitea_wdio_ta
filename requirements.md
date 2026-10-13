# Requirements: Stays advanced filters and currency viewing

**Jira Reference:** EPMCDMETST-47868
**Source:** https://jiraeu.epam.com/browse/EPMCDMETST-47868
**Status read from Jira:** Open

## User Story
As a traveler searching for stays, I want to apply advanced stay filters and view all prices in my preferred currency, so that I can quickly find relevant accommodation options and understand costs in a familiar currency.

## Scope
Enhance stays search results with:

1. Advanced filtering beyond the basic filters, so the stay list can be refined.
2. A currency selector that displays prices using the ISO-like codes named in the story.

## Functional Requirements
1. The traveler can open an Advanced filters panel and see filter controls that are not part of the basic filters.
2. Applying one or more advanced filters updates the results to stays that match every selected filter.
3. Applied advanced filters stay visible as active selections.
4. Clear resets advanced filters to the default empty selection and refreshes the results to the unfiltered list.
5. The currency selector offers the codes named in the story: USD (840), EUR (978), GBP (826), AED (784), and JPY (392).
6. After a supported currency is selected, stay prices are shown in that currency.
7. The selected currency remains in effect when the traveler opens a stay details view and when they return to results.

## Acceptance Criteria
1. Opening Advanced filters shows at least one control that is not a basic filter, and those controls can be applied.
2. Applying advanced filters changes the result list to the matching stays and exposes the active selections.
3. Clear removes active advanced filters and restores the unfiltered result list.
4. The traveler can choose USD (840), EUR (978), or GBP (826), and prices render with the selected code and numeric code.
5. The selected currency is still used on the stay details view and after returning to results.
6. A missing result set, unknown filter, empty filter value, unknown currency, missing stay, missing price, or missing conversion rate fails with a clear error and does not emit secrets.

## Non-Functional Requirements
1. The behavior is deterministic for the same stays, filters, currency, and rate table.
2. Generated output does not read or include Jira tokens, GitHub tokens, or other secrets.
3. The module runs in Node.js with no new runtime dependencies.

## Assumptions
The Jira description lists these gaps, and no attachment or comment supplies the missing detail. The implementation uses the following assumptions so the acceptance criteria stay testable:

1. The story does not name the advanced filters. The default catalog treats maximum price and minimum star rating as basic filters, and free cancellation, minimum guest rating, and amenity as advanced filters. The catalog can be replaced without changing the session flow.
2. The currency attachment is not on the ticket. Only the five codes written in the story are supported.
3. Price text uses the form `CODE (numeric) amount`. JPY uses no decimal places. Other supported currencies use two decimal places.
4. Conversion uses a caller-supplied rate table keyed as `FROM->TO`. A missing or non-positive rate is an error. This repository does not call a live foreign-exchange service.
5. The default selected currency is USD until the traveler chooses another code. Persistence is session state shared by results and details, not a user profile.

## Out of Scope
- A browser page or WebdriverIO flow for a stays product. This repository does not contain that application.
- The full ISO 4217 catalog.
- Live exchange rates, rounding policy beyond the display digits above, and profile-level currency defaults.
- The earlier documentation sync utility, which remains unchanged.

## Definition of Done
1. These requirements are stored in `requirements.md` and `outputs/EPMCDMETST-47868/requirements.md`.
2. Architecture, design review, and the implementation plan are documented.
3. Unit tests cover the happy paths and the missing-field / not-found cases.
4. `npm test` passes and the output is recorded for the pull request.
