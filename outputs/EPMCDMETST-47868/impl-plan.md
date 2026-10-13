# Implementation Plan: EPMCDMETST-47868

Tasks are ordered by dependency. A task marked blocked cannot start until the task it names is complete.

1. Confirm the Jira story, acceptance criteria, and the five documented gaps. **Blocks:** all later tasks.
2. Write `requirements.md` with the user story, testable criteria, and explicit assumptions. **Blocked by:** task 1.
3. Write `architecture.md` for the session model, catalogs, and price formatting. **Blocked by:** task 2.
4. Record design risks and agreed decisions in `design-review.md`. **Blocked by:** task 3.
5. Add the currency catalog and currency selection in `src/staysSearch.js`. **Blocked by:** task 4.
6. Add advanced-filter open, apply, and clear on top of the session. **Blocked by:** task 5, because result rows must already be able to render a price.
7. Add details navigation that reuses the selected currency. **Blocked by:** task 5.
8. Add `test/staysSearch.test.js` for the happy paths and the not-found / missing-field cases. **Blocked by:** tasks 6 and 7.
9. Include the new test file in the `npm test` script. **Blocked by:** task 8.
10. Add a shell hook that denies commands referencing `JIRA_API_TOKEN` or `GITHUB_TOKEN`. **Blocked by:** task 2's security requirement. Independent of the stays module.
11. Run `npm test` and save the output in the verification note. **Blocked by:** task 9.
12. Write the code review and the pull request description from the verified result. **Blocked by:** task 11.
