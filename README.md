# Agentic SDIC Capstone

[HACTIONS_STATUS](https://github.com/geetha-karthikeyan-1920/elitea_wdio_ta/actions/workflows/ci.yml)

## CI quality gates (run locally)

- Install dependencies:

  ```bash
  npm ci
  ```

- Run the existing Node test (the same one that runs in CI):

  ```bash
  npm test
  ```

- Run the WebdriverIO smoke suite (same command as CI): 

  ```bash
  npm run wdio
  ```

## Reports and artifacts

- WDIO logs are written to: ```outputs/``` (see outputDir in ```wdio.conf.js```).
- WDIO JUnit report (if enabled) is written to: ```reports/junit.report.xml```.

- GitHub Actions uploads only these folders as implementation artifacts:
  - ```reports/```
  - ```outputs/```
