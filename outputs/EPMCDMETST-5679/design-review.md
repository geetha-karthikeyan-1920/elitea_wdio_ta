# Design Review: EPMCDMETST-5679

## Review Summary
A session model is the right scope for this repository. The story asks for an address book modal on a shipping screen, and this repo does not contain that screen. The filter, form fill, and step change can still be verified directly.

## Risks and Gaps
- The story does not name the address fields. A guessed form could miss a field the real checkout requires.
- "The next checkout step" is not named.
- The one-second budget is a user-interface requirement. An in-memory filter does not measure a rendered modal or a remote address service.
- Showing another customer's address, or a non-US address, would violate the story. The filter has to apply before the list is returned.
- User profile and address storage are named dependencies and are not implemented here.

## Review Findings
- Opening the book from any step other than shipping should fail.
- Selection before the modal is open should fail.
- A selected address with a blank required field should fail before the form is treated as complete.
- Addresses for other users and non-US addresses must be absent from the modal and must not be selectable by id.

## Agreed Design Decisions
- Use the field set `recipient`, `line1`, `line2`, `city`, `state`, `postalCode`, and `country`.
- Require `line1`, `city`, `state`, and `postalCode` before accepting a selection.
- Treat the next step as `payment`.
- Accept the address book as an input array. Do not add a network client.
- Return a new session from each action.
- Leave the documentation-sync and stays-search code unchanged.

## Architecture Updates
`architecture.md` records the session model, the US-and-owner filter, and the decision not to build a browser modal in this repository.
