# Develop Home Assistant TV Remote

The card is installed in Home Assistant through HACS. These tools are for contributors preparing the ready-to-use bundle; Home Assistant users do not need a Node.js build environment.

Read [AGENTS.md](../AGENTS.md), [CONTRIBUTING.md](../CONTRIBUTING.md), and the [modernization plan](MODERNIZATION_PLAN.md). All GitHub mutations must explicitly target `Narehood/HomeAssistant-TV-Remote`. Upstream `PRProd/HA-Firemote` is permanently read-only.

## Local setup

Use **Node.js 24** and **npm**, with the committed `package-lock.json`:

```sh
npm ci
npm run dev
```

Open `http://localhost:5173/dev/` for the local mock Home Assistant preview. If that port is occupied, set `TV_REMOTE_PORT` before running the dev script; for example, in PowerShell use `$env:TV_REMOTE_PORT = '5187'` and then `npm run dev`, and open `http://localhost:5187/dev/`. The preview helps check rendering and action payloads; use a real Home Assistant installation for integration/device validation.

## Source and output

Edit authored card, editor, catalog, and device code in `src/`. The esbuild pipeline bundles Lit 3 and the card's modules into the single self-contained browser module `dist/HA-Firemote.js`. Home Assistant loads that file as a JavaScript module, and YAML continues to use `custom:firemote-card`.

`package.json` is the version authority; the build replaces `__CARD_VERSION__`. Do not manually add version strings, import query versions, or CDN runtime dependencies. Rebuild generated files through the package scripts and preserve third-party license comments. Keep existing remote designs and valid legacy YAML compatible.

## Validate changes

```sh
npm run check
npm run test:browser
```

The project also exposes `npm run build`, `npm run test`, `npm run lint`, and `npm run typecheck` for focused work. `npm run test:browser` builds and loads the actual release artifact with mocked Home Assistant, checking device presets and pointer/keyboard activation. On Windows the runner uses installed Chrome with an isolated profile; on other hosts install Chromium first with `npx playwright install --with-deps chromium`. CI and release builds run `npm ci`, `npm run check`, install Chromium, and run `npm run test:browser`. HACS validation is an additional metadata/repository check using category `plugin` (Dashboard in the UI).

Use focused regression cases for configuration normalization, service payloads and failures, safe rendering, launcher selection, and interaction cleanup. Check representative physical remote designs and both app-launcher layouts in the local preview. For prose-only edits, validate changed links and JSON/YAML without adding tests that mirror the prose.

Record real Home Assistant version, integration, device model, firmware, configuration, and observed results when reporting device validation. Automated tests and upstream reports do not establish that a device or launch identifier works. Add a minimum Home Assistant version to `hacs.json` only when supported API requirements and actual compatibility evidence justify it.

## Configuration and catalog contracts

`control_mode` accepts `legacy` (the default) and the explicit opt-in `android-tv-remote`. The latter reuses `android_tv_remote_entity` for the matching remote and `entity` for the media player created by the Android TV Remote integration. Expose this choice in the editor and preserve it through edits; do not silently migrate existing configurations. See the [user setup examples](INSTALLATION.md#opt-in-to-android-tv-remote).

Catalog lifecycle metadata uses `lifecycle: 'active' | 'legacy'`. Legacy entries retain stable YAML IDs. Keep a configured legacy entry visible in the editor, while hiding it from new recommendations or clearly labelling its status. Platform launch data can use optional `deepLink` alongside the existing `androidName`, `appName`, and `adbLaunchCommand` fields. Verify platform/region identifiers before recommending them and keep UI translations separate from integration source names.

## Prepare a release

Release preparation is **manual**. Merging a branch or running validation does not publish anything.

1. Review changes and validation evidence. Set the package version, update the npm lockfile through npm when necessary, run `npm ci`, `npm run check`, and `npm run test:browser`, and review the generated bundle and notices. Commit the reviewed source, lockfile, and distribution through the normal fork contribution process.
2. A maintainer creates the matching version tag, such as `v5.0.0-beta.1`, **only in Narehood/HomeAssistant-TV-Remote**. Verify both owner and repository before any tag push or API write. The workflow requires an existing tag and checks it against `package.json`; it never creates a tag.
3. In this fork's Actions tab, run **Prepare release** from the reviewed workflow and enter the tag. Leave **Also create a draft GitHub release** unchecked to produce only an Actions artifact for review. Check it only when you intend to create a draft in this fork.
4. The workflow installs locked dependencies, runs `npm run check` and `npm run test:browser`, and packages `HA-Firemote.js`, `SHA256SUMS`, `LICENSE`, `CREDITS.md`, and `THIRD_PARTY_NOTICES.md`. The checksums cover the bundle and all attached notices. In the downloaded artifact directory, verify them with `sha256sum --check SHA256SUMS` or compare with PowerShell `Get-FileHash -Algorithm SHA256`.
5. Review the artifacts and validate the card through a clean HACS installation and an upgrade/migration in Home Assistant. Review release notes and label limitations accurately. When the optional draft exists, replace its placeholder notes and deliberately publish it after review, marking beta tags as prereleases. A draft is not available as an ordinary HACS release.

The release bundle is attached as `HA-Firemote.js`, rather than requiring users to build it. The release tag provides the corresponding source. HACS identifies the filename through `hacs.json`; `dist/` also supports default-branch installation before a published release exists. Follow the [HACS plugin distribution rules](https://www.hacs.dev/docs/publish/plugin/).

The workflows use repository guards, explicit repositories for release operations, job-scoped release write permission, nonpersisted checkout credentials, and verified action commit pins. Dependabot proposes npm and action updates weekly. Review action changes before merging; the upstream HACS action itself currently starts a container using its publisher's `main` image tag, so pinning the wrapper commit does not pin that transitive container image.

## Repository administration

These are maintainer settings tasks; adding documentation and workflow files does not apply them:

- Keep **Issues** enabled on `Narehood/HomeAssistant-TV-Remote` (enabled during modernization). Create or verify the labels referenced by the forms: `bug`, `enhancement`, `New App Shortcut`, `New Device Support`, and `Region Issue`.
- Set a useful repository description and topics for HACS discovery, and verify the default branch is the intended maintained branch.
- Verify PR creation defaults to this fork and educate contributors to check the base repository. Fork-network defaults must never direct contributions upstream.
- Enable the fork's Actions as needed, review the permitted action policy, and configure branch/ruleset protection with the validation check names once those checks have run successfully. Keep default workflow token access read-only; only the optional draft-release job needs `contents: write`.
- Review tag protection/release permissions and who may manually dispatch release preparation. Confirm npm and GitHub Actions Dependabot updates are enabled.
- Publish a reviewed fork release when ready and verify HACS custom-repository installation end to end. Inclusion in HACS's default list is a separate future decision; do not advertise default-store status before acceptance.

Do not apply any of these changes to `PRProd/HA-Firemote`.
