# Contributing

Thanks for your interest in improving this repository! This is a small baseline scaffolding project for Playwright test automation.

## Development setup

1. Install dependencies:

```sh
npm ci
```
2. Install browsers (first time only):

```sh
npx playwright install --with-deps
```
3. Run the test suite:

```sh
npm test
```


## Proposing changes

- Create a feature branch from `main`.
- Keep pull requests focused and small.

- Make sure the CI workflow passes. For example, run `npm test` before submitting.

## Coding conventions

- Formatting: follow the existing style.
- Tests: new tests should be deterministic and CI-friendly.
- Documentation: update README if changes affect usage.
