# Modernization implementation status

Implementation date: 22 October 2026. Branch: `feature/modernize-hacs`. Version: `5.0.0-beta.1`. This work follows the [audit and plan](MODERNIZATION_PLAN.md), preserving the original project's history and license.

## HACS installation contract

Home Assistant loads one self-contained JavaScript module, `dist/HA-Firemote.js`. HACS continues using that filename, and card YAML continues using `type: custom:firemote-card`. Lit and the card's data are bundled locally; Home Assistant users do not need Node.js, npm, a CDN, or a separate backend. The 56 inherited device presets and their remote designs are retained.

Existing configurations retain `control_mode: legacy`. Android TV Remote is an explicit opt-in using `control_mode: android-tv-remote`; no existing ADB setup is automatically moved. Keep exactly one Firemote resource registered when migrating. Follow [installation and rollback instructions](INSTALLATION.md).

## Implemented changes

- Source now lives in `src/`, with modules for configuration, actions, input, services, editor, app rendering, layout, translations, and the typed catalog. The retained physical views and legacy device event mappings remain JavaScript; the whole codebase has not been converted to strict TypeScript.
- A locked Node.js 24/npm toolchain builds pinned Lit 3 into a reproducible artifact. ESLint, TypeScript, Vitest, a mock Home Assistant preview, real-browser artifact checks, and SHA-256 verification are available through package scripts.
- Configuration is cloned, validated, and kept immutable. Invalid model/style/entity/action fields produce specific errors. Numeric and quoted zero agree, meaningful false/zero overrides survive, missing associated entities recover, and advanced/sparse YAML survives editor changes.
- Configured labels, input labels, icons, images, and colors use safe template bindings. Trusted packaged artwork has a separate rendering path. ADB text uses literal shell quoting and rejects multiline/NUL input with an actionable message; opt-in Android TV Remote uses structured text commands.
- Controls have accessible names, keyboard and assistive activation, visible focus, hidden-control suppression, and one shared gesture lifecycle. Repeats stop on cancellation, release, focus/window departure, visibility changes, configuration changes, and disconnection. Emitted legacy held keys receive best-effort release.
- Services are awaited through bounded per-target queues, with coalesced repeats, prioritized release, visible failure status, and no automatic toggle retries. User script variables remain service data. Existing custom action targeting precedence is preserved.
- Deterministic dispatch repairs cover singleton custom launchers, names containing `-button`, the documented restart alias, Apple mute fall-through, Toshiba matching, and Homatics capacities. The editor creates launcher fields on demand instead of allocating hundreds by default.
- Layout methods use rendered bounds when available and initial estimates before rendering, account for extra launcher rows, and implement the Sections `getGridOptions` contract. Actual Home Assistant dashboard layout still needs integration validation.
- The catalog contains 487 identities while retaining all 385 original YAML IDs. See the [app status](APP_IMPLEMENTATION_STATUS.md) for 149 patches, 174 supplemented family records, metadata sources, retirement decisions, and the complete 543-row request ledger. Static completeness is distinct from device launch success.
- Documentation, issue forms, runtime help, HACS identity, CI, and manual release preparation target Narehood. Upstream funding/personal promotion has been removed, while original author, contributor, GPL, artwork, and Lit credit remain.

## Validation and evidence

`npm run check` runs lint, incremental strict type checks, regression tests, the production build, and source/artifact/checksum consistency. `npm run test:browser` loads the actual HACS artifact in an isolated browser with simulated Home Assistant entities. It checks all 56 presets, native pointer/Enter/Space activation, cancellation, safe content, editor round trips, both app layouts, opt-in Android TV Remote payloads, and mobile bounds. The catalog/runtime contract checks every one of the 2,052 structurally complete family combinations.

Final local validation: a fresh `npm ci` completed, `npm run check` passed all **117 tests**, and `npm run test:browser` passed, including release after keyboard focus departure and rendered masonry height for all 56 presets. npm's dependency audit reported zero vulnerabilities at the time of that install. These are local checks; hosted Actions and HACS validation have their own results.

The implementation underwent a separate read-only review. Its keyboard focus-departure finding is covered by a regression check. The automated harness records actions locally; it never calls a real Home Assistant installation. Local evidence is written under ignored `.test-results/`; CI repeats the documented commands. See [development](DEVELOPMENT.md) for exact tooling and limitations.

## Fork administration applied

Only `Narehood/HomeAssistant-TV-Remote` has been changed: its issue tracker is enabled, the issue forms' missing labels have been created, and repository description/topics have been updated. The local GitHub CLI default points explicitly to the fork. No upstream issue, PR, comment, reaction, release, workflow, or other repository operation was written.

Branch/tag rules and organization-wide Actions/Dependabot policy remain maintainer administration. The release workflow is manual and can prepare assets or create an optional draft; validation and merges do not publish releases.

## Remaining release gates

1. Install this artifact through HACS in a real Home Assistant instance, then exercise both a clean installation and migration/rollback from the original card with one registered resource.
2. Record supported Home Assistant/frontend, integration, firmware, browser, and companion-app versions. A minimum Home Assistant version has not been established through compatibility testing.
3. Validate representative Fire/ADB, Apple TV, Roku, and opt-in Android TV Remote devices. Check tap/hold/release, text, launches, source feedback, power/volume/input routing, CEC/IR behavior, and Sections/masonry placement.
4. Resolve the catalog's explicit identifier blockers and integration investigations with the installed app/source/activity evidence specified in its ledger. Three open requests remain identifier-blocked, four are partial, and fourteen require investigation. They are not reported as completed device fixes.
5. Review Firefox/WebKit/companion behavior and legacy-panel reports; the real-browser automation currently uses Chromium. Publish a stable release only after the relevant acceptance evidence is recorded.

No stable release or hardware compatibility certification is implied by this beta implementation. The [bug ledger](BUG_IMPLEMENTATION_STATUS.md) keeps unresolved reports visible.
