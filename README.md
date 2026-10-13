# elitea_wdio_ta - Playwright Test Automation Scaffolding

Basic project scaffolding for a Playwright-based test automation repository.

## Prerequisites

- Node.js (20.x LTS recommended for CI)
- npm (bundled with Node.js)

## Setup

1) Install dependencies:

```sh
npm ci
```

2) (first time only) Install Playwright browsers:

```sh
npx playwright install --with-deps
```

## Configuration

The base URL sources from the `BASE_URL` top-level env variable. See `.ov.example` for an example.

## Running tests

Run headless tests:

```sh
npm test
```

Run tests headed (browser visible):

```sh
npm run test:headed
```

Run tests in UI mode:

```sh
npm run test:ui
```

## Viewing the report

After a test run, open the HTML report:

```sh
npm run report
```

The generated report lives in `playwright-report/`.

## CI

GitHub Actions runs Playwright tests on `push` and `pull_request`. The workflow performs:`
- `npm ci`
- `npx playwright install --with-deps`
- `npm test`

Report and test results are uploaded as build artifacts.
