# Architecture: Select shipping address from address book

**Jira Reference:** EPMCDMETST-5679

## Overview
Checkout address selection is a Node.js session model in `src/addressBook.js`. The caller supplies the signed-in user id and the saved address list from the profile and address-storage dependencies. The module filters that list, fills the shipping form, and advances the checkout step.

This repository has no checkout user interface, so the architecture stops at the session model a modal would call.

## Components and Responsibilities
- **Checkout session:** holds the user id, the address book, the current step, whether the modal is open, the visible address list, and the shipping form.
- **Address filter:** keeps addresses whose `userId` matches the signed-in user and whose country is `US`.
- **Modal opener:** requires the shipping step, then publishes the filtered list.
- **Address selector:** requires an open modal, rejects unknown or incomplete addresses, copies the address into the shipping form, closes the modal, and sets the step to `payment`.

## Data Flow
1. Profile and address storage provide `userId` and `addresses`.
2. On the shipping screen, open builds the visible US list for that user.
3. Select finds the chosen id in that user's US addresses.
4. The shipping form receives recipient, line1, line2, city, state, postal code, and country.
5. The session step becomes `payment`.

## Technology Choices
- Node.js built-ins only. No new package was added.
- The Node.js test runner, consistent with the existing unit tests.
- Plain session objects so the acceptance criteria can be asserted without a browser.

## Existing Repository Context
`src/documentationSync.js` and `src/staysSearch.js` stay on their own paths. They are not used by address selection.
