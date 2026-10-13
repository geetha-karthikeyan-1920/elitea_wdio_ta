# Design Review: EPMCDMETST-47868

## Review Summary
The session model is a suitable design for this repository. The Jira story describes a stays results page, and this repo has no stays UI to attach that page to. Keeping the behavior in a pure function module lets the acceptance criteria be verified without inventing a front end.

## Risks and Gaps
- The story does not name the advanced filters. A hard-coded product catalog could be wrong once the real panel exists.
- The currency attachment is missing, so any catalog larger than the five named codes would be invented.
- Conversion rules are unspecified. Embedding market rates in the module would become stale and could be mistaken for a pricing service.
- Session persistence covers results and details only. It does not survive a new browser session or a profile setting, which the story does not require.
- Pre-existing WebdriverIO dependencies have `npm audit` findings. This story does not add a dependency, and those findings are outside the stays change.

## Review Findings
- Filter ids must be validated. An unknown id or a blank value should fail before the result list changes.
- Advanced controls must be disjoint from basic controls, otherwise the "beyond basic filters" criterion cannot be demonstrated.
- Price formatting must fail when the stay has no price or the rate table has no entry, instead of rendering a blank or a secret-bearing message.
- Currency selection must live on the session object that both results and details read.

## Agreed Design Decisions
- Use an illustrative, replaceable filter catalog and document it as an assumption.
- Support only USD (840), EUR (978), GBP (826), AED (784), and JPY (392).
- Require the caller to pass rates. Do not call an external exchange-rate API.
- Format prices as `CODE (numeric) amount`.
- Return a new session from each action so tests can compare before and after without hidden mutation.
- Leave the documentation-sync utility and the WebdriverIO sample spec unchanged.

## Architecture Updates
`architecture.md` records the session model, the catalog split, and the decision not to build a browser page in this repository.
