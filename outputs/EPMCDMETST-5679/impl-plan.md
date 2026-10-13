# Implementation Plan: EPMCDMETST-5679

Tasks are ordered by dependency. A later task stays blocked until the task it names is finished.

1. Read the Jira story and record the unspecified address fields and next checkout step. **Blocks:** all later tasks.
2. Write `requirements.md`. **Blocked by:** task 1.
3. Write `architecture.md` for the checkout session, filter, and form fill. **Blocked by:** task 2.
4. Record design risks and decisions in `design-review.md`. **Blocked by:** task 3.
5. Fix orchestration file writing so each pipeline stage is one line, and fix auto-commit so a missing `outputs/<JiraId>` path does not abort the commit. **Blocked by:** task 1. Independent of the address module.
6. Add `src/addressBook.js` for open and select. **Blocked by:** task 4.
7. Add `test/addressBook.test.js` for both acceptance scenarios, the empty book, and the not-found / missing-field cases. **Blocked by:** task 6.
8. Include the new test in the `npm test` script. **Blocked by:** task 7.
9. Run `npm test` and save the output. **Blocked by:** task 8.
10. Write the code review and pull request description from that result. **Blocked by:** task 9.
