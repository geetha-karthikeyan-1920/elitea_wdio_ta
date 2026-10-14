# elitea_wdio_ta - Playwright test automation scaffolding

Scaffolding for Playwright-basee test automation (Playwright Test runner). This repository contains the basic project structure to author and run end-to-end tests, generate test reports, and run tests in GitHub Actions.

## Project purpose

- Baseline Playwright Test setup (config, example tests, and scripts)
- Local development first: install, run, and view reports
- CI runs on GitHub Actions via workflows under `.github/workflows/`


## Prerequisites

- Node.js: Latest LTS recommended
- npm (bundled with Node)
- A supported operating system for Playwright (Windows/macOS/Linux)

## Setup

Clone the repository and install dependencies:

```sh
npm ci
```

## Configuration

The base URL is read from the top-level environment variable `BASE_URL`.
See `.ov.example` for an example.

## Install/update Playwright browsers

On a fresh machine (or after updating `@playwright/test`), install the browser binaries:

```sh
npx playwright install --with-deps
```

Note: this repo uses Playwright via the `@playwright/test` package (see `package.json`).

## Run tests locally

- Headless tests:

  ```sh
  npm test
  ```

- UI mode:

  ``sh
  npm run test:ui
  ```

## View test reports & artifacts

- Open the Playwright HTML report after a test run:

  ``sh
  npm run report
  ```

- The generated report directory is `playwright-report/` (default Playwright behavior).

## CI (GitHub Actions)

This repository includes GitHub Actions workflows under `.github/workflows/` that run the Playwright tests. CI typically executes the same commands used locally (for example, `npm ci` followed by `npm test`).

If CI uploads artifacts (e.g. Playwright reports), they will be available in the workflow run artifacts section.

