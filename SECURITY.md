# Security Policy

If you discover a security vulnerability, please report it privately.

- Email: geetha.karthikeyan@zohomail.in
- Please include clear reproduction steps, affected version(s), and any relevant logs.

## Secrets

- Do not commit secrets (API keys, tokens, credentials, certificates, encryption keys, etc.) into this repository.
- Use environment variables or a `.env` file for local development (a `.env` file is ignored by git in this repo).
- For CI, configure secrets using GitHub Actions Secrets.

# Secret scanning

This repository is configured with GitHub Secret Scanning enabled. Avoid checking in sensitive information.
