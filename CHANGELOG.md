# Changelog

## 5.0.0-beta.1 — 2026-10-22

First modernization beta of the independently maintained Narehood fork of PRProd's Firemote. This is a source/artifact validation milestone; Home Assistant installation and hardware acceptance remain required before a stable release.

- Preserve HACS's `HA-Firemote.js` filename, `custom:firemote-card`, original YAML IDs, physical remote designs, GPL, and author/contributor credit.
- Introduce authored source modules, pinned Lit 3, a locked Node.js 24 build, TypeScript catalog contracts, lint/regression checks, real-browser artifact checks, and reproducible checksums.
- Repair configuration validation, missing-state recovery, editor mutation, custom-action dispatch, script variables, markup construction, text quoting, keyboard controls, hidden controls, held-key cleanup, and asynchronous error handling.
- Fix missing Apple play/pause state and reboot confirmation fallback; verify committed distribution before tests rebuild it.
- Add opt-in Android TV Remote control and activity/text paths; retain legacy transport by default.
- Improve Sections/masonry sizing with measured bounds, support extra launcher rows, and create editor fields on demand.
- Expand the catalog from 385 to 436 identities after checking all 102 proposed additions against TV/video-provider scope; retain 51 and exclude 51. Preserve inherited YAML IDs, hide inherited VPNs from new choices, and track exclusions and remaining blockers. Metadata completeness does not establish launch success.
- Remove upstream funding/personal promotion and move installation, support, issue forms, CI, and manual draft-release preparation to the Narehood fork.

See [implementation status](docs/IMPLEMENTATION_STATUS.md), [app outcomes](docs/APP_IMPLEMENTATION_STATUS.md), [bug outcomes](docs/BUG_IMPLEMENTATION_STATUS.md), and [HACS migration/rollback](docs/INSTALLATION.md) for scope and remaining checks.
