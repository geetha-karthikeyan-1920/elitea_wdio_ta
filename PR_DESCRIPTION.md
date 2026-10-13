## Summary
This change completes the agentic SDLC for EPMCDMETST-5679, selecting a saved US shipping address from the address book. The pipeline commit had been skipped because `outputs/EPMCDMETST-5679` did not exist, and the stage list was written as a single line. The story is implemented as a checkout session model because this repository has no checkout screen.

## Changes Made
- Fixed `orchestration/run-agentic-pipeline.ps1` so each stage is written on its own line, missing output folders are skipped instead of failing `git add`, and push plus pull-request creation are skipped when there is no new commit.
- Added `requirements.md`, `architecture.md`, `design-review.md`, and `impl-plan.md` for the address-book story and its assumptions.
- Added `src/addressBook.js` to list the signed-in user's saved US addresses, fill the shipping form, and advance checkout to payment.
- Added `test/addressBook.test.js` for both acceptance scenarios, the empty book, and the not-found / missing-field cases.
- Updated the `test` script in `package.json` so `npm test` includes the address-book tests.
- Added the story evidence under `outputs/EPMCDMETST-5679/`.

## Test Evidence
Command: `npm test -- --test-reporter=spec`

```
✔ opening the address book shows only the signed-in user US addresses
✔ selecting a saved address fills the shipping form and advances checkout
✔ an empty address book opens without advancing checkout
✔ missing user, missing book, unknown address, and incomplete address fail clearly
✔ address book lookup stays within the one second budget and does not read credentials
ℹ tests 15
ℹ pass 15
ℹ fail 0
```

The same run also passed the existing documentation-sync and stays-search tests. The full count is 15 passed and 0 failed.

## Known Limitations
- Address fields are an assumption. Jira does not define the schema.
- The next checkout step is recorded as `payment` because the story does not name it.
- The one-second budget is checked for an in-memory lookup. There is no rendered modal and no live address service.
- User profile storage and address storage are inputs, not implementations.
- No checkout browser UI is included, because that application is not in this repository.
- This branch also contains the earlier EPMCDMETST-47868 stays commit, because the pipeline created the branch from that HEAD.

## Reviewer Checklist
- [ ] Address-book behavior matches `requirements.md`, including the documented assumptions.
- [ ] Tests cover opening the US list, selecting an address, the empty book, and the not-found / missing-field cases.
- [ ] No secrets or tokens appear in source, tests, or the pull request text.
- [ ] The pipeline no longer fails the commit when the story output folder is missing.
- [ ] The assumed address fields and the `payment` next step are acceptable until product confirms them.
