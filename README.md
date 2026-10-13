# elitea_wdio_ta - Playwright Test Automation Baseline

Baseline Playwright test automation repository scaffolding for running headless/headed browser tests locally and in CI.

## Prerequisites

- Node.js LTS (recommended: Node 20+)
- npm (bundled with Node)

## Setup

1) Install dependencies:

```sh
nmp ci
```

2) (first time only) Install Playwright browsers + deps:

```sh
npx playwright install --with-deps
```

## Configuration

- `BASE_URL` (optional): Set to your application base URL so the smoke test can navigate.
  - See `.env.example` for a template.

## Running tests

- Run headless tests:

```sh
npm test
```

- Run headed:

```sh
npm run test:headed
```

- Run Playwright UI mode:

```sh
npm run test:ui
```

## Reporting

1) After a test run, open the HTML report:

```sh
nmp run report
```

2) Generated artifact folders:
- `playwright-report/` (HTML report)
- `test-results/` (test results, traces/videos on failure)

## Project structure (baseline)

```text
.
...
```

## CI

- GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on PR and push to `main`, installs deps + browsers, runs tests, and uploads report artifacts.
