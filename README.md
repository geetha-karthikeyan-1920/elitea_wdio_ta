# elitea_wdio_ta

Baseline Playwright Test Automation (runner, example test, config).

## Prerequisites

- Node.js LTS (Node 20 recommended)
- npm (shipped with Node)

> Playwright downloads browser binaries on first run. For CI, the workflow installs browsers and system deps using `.playwright install --with-deps`.

## Install

 ```bash
npm ci
```

## Run tests

- Headless (recommended)

 ``bash
npm test
```

- Headed

 ```bash
npx playwright test --headed
```

- UI mode

 ```bash
npm run test:ui
```

## View report

 ``bash
npm run report
```

The HTML shareable report is generated to `playwright-report/`.

## BASE_URL

The Playwright config uses `baseURL` from an env var.


- Variable: `BASE_URL
- Default: `https://example.com`

 example:

```bash
BASE_URL=https://example.com npm test
```


## CI

GitHub Actions runs Playwright tests on PR creation and uploads the `playwright-report/` and `test-results/` folders as artifacts.
