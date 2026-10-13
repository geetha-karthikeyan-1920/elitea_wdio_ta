# Requirements: Select shipping address from address book

**Jira Reference:** EPMCDMETST-5679
**Source:** https://jiraeu.epam.com/browse/EPMCDMETST-5679
**Status read from Jira:** Open

## User Story
As a returning customer, I want to select a previously saved address from my address book so that I can complete checkout faster without re-entering information.

## Scope
On the shipping address screen, a signed-in customer can open an address book modal, see previously saved US addresses, and choose one. The chosen address fills the shipping form and checkout moves to the next step.

## Functional Requirements
1. The customer must be signed in before the address book can be opened.
2. From the shipping address screen, "Select from address book" opens a modal.
3. The modal lists every saved US address that belongs to the signed-in customer.
4. Addresses for another customer, and addresses outside the US, are not listed.
5. Choosing a listed address fills the shipping form with that address and closes the modal.
6. After a successful selection, checkout advances from shipping to the next step.
7. An empty address book still opens the modal and does not advance checkout.

## Acceptance Criteria
1. Given saved addresses and the shipping screen, opening the address book shows all saved US addresses for the signed-in user.
2. Selecting a saved address auto-populates the shipping form and proceeds to the next checkout step.
3. A missing signed-in user, a missing address book, a closed modal, a non-shipping screen, an unknown address, or a saved address with a blank required field fails with a clear error.
4. The modal listing does not include secrets.

## Non-Functional Requirements
1. The address book listing is available within one second for an in-memory book of the signed-in user's saved addresses.
2. The module does not call a network service and does not read credential environment variables.
3. The same user and address book produce the same visible list.

## Assumptions
The Jira story does not define these details. They are assumptions so the acceptance criteria can be tested in this repository:

1. A saved US address has `id`, `userId`, `country` of `US`, `line1`, `city`, `state`, and `postalCode`. `recipient` and `line2` are optional.
2. The next checkout step after a selection is `payment`.
3. User profile and address storage are inputs to the module. This repository does not implement those systems.
4. There is no checkout user interface here, so the modal is a session state change rather than a browser dialog.

## Out of Scope
- Adding, editing, or deleting addresses.
- Non-US address selection.
- A WebdriverIO page for a checkout application that is not in this repository.
- The earlier documentation-sync and stays-search utilities.

## Definition of Done
1. Requirements, architecture, design review, and the implementation plan are documented.
2. Unit tests cover both acceptance scenarios and the not-found / missing-field cases.
3. `npm test` passes and the result is recorded for the pull request.
