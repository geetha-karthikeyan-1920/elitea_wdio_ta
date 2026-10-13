# elitea_wdio_ta - Playwright Test Automation Scaffolding

This repository provides a minimal, CI-friendly baseline setup for Playwright test automation.

## Prerequisites

- Node.js 20 (LTS)
- npm (ships with Node)

> Note: A GitHub Actions workflow is provided to run tests on every pull request.

## Install

1) Install dependencies:

```sh
npm ci
```

2) (first time only) Install Playwright browsers and system deps:

```sh
npx playwright install --with-deps
```

## Configuration

- The base url is read from the `ENV.BASE_URL` variable.
- See `.env.example` for an example.


## Running tests

- Headless tests:

```sh
npm test
```

- UI Mode:
```sh
npm run test:ui
```


## Reports

- After a test run, open the HTML report:

```sh
npm run report
```

- Report output location: `playwright-report/`.

## Project structure

```
tests/               # Playwright tests (example: tests/example.spec.ts)
playwright.config.ts    # Playwright config
github/workflows/    # CI workflows (includes playwright workflow)
```

## CI

- On pull requests, GitHub Actions runs:
  - `npm ci`
  - `npx playwright install --with-deps`
  - `npx playwright test`
