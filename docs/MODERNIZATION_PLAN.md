# Home Assistant TV Remote modernization plan

Audit date: 22 October 2026. Fork: [Narehood/HomeAssistant-TV-Remote](https://github.com/Narehood/HomeAssistant-TV-Remote). Baseline commit: `b856a45e684775fd477dbcd8d1342ff65bb97e38`, advertising Firemote `v4.1.9`.

The project needs a maintainable build and test foundation, repairs to device and app dispatch, and a complete refresh of the app catalog. Preserve the existing remote designs, working device support, and YAML configurations while making those changes in stages. Retain Lit and native web components; a framework replacement would add migration cost without addressing the reported failures.

This document records the original audit and implementation sequence. Implementation is now in progress on `feature/modernize-hacs`; see [implementation status](IMPLEMENTATION_STATUS.md), the [app implementation ledger](APP_IMPLEMENTATION_STATUS.md), and [bug implementation status](BUG_IMPLEMENTATION_STATUS.md). Baseline findings below describe the audited commit, rather than the current working tree. Hardware behavior requires validation in Home Assistant before a device repair can be called complete.

## Fork ownership and attribution

All contributions and project operations belong to **Narehood/HomeAssistant-TV-Remote**. Upstream **PRProd/HA-Firemote is a read-only reference**: never push, open or modify a PR, post a comment, create or modify an issue, add a reaction, dispatch a workflow, or perform any other write there. Refer to upstream issues with full URLs; track and resolve the work in this fork. The local checkout has only the Narehood `origin` remote. This permanent boundary is recorded in [AGENTS.md](../AGENTS.md).

Keep the existing GPL license, original author and contributor credit, Git history, and third-party notices, including Lit's BSD notices. Explain prominently that this is an independently maintained fork of PRProd's Firemote. Attribution links are appropriate; upstream funding, installation, release, and support destinations must stop appearing as this fork's destinations.

## Baseline and review coverage

- The workspace was empty and was cloned from the Narehood fork for this review.
- Five shipped JavaScript modules parse successfully, including the vendored Lit module. There is no package manifest, lockfile, source directory, development server, lint configuration, test suite, or reproducible build.
- `dist/HA-Firemote.js` is 397,208 bytes and 8,558 lines. It combines rendering, CSS, input gestures, service dispatch, configuration, and editor logic.
- `dist/launcher-buttons.js` is 1,414,595 bytes and 12,590 lines, with **385 catalog entries**, including apps and remote functions. Registry data and SVG artwork are mixed together.
- The device registry has nine family groups, including `none`, and 56 records with default remote styles. The translation registry has 13 locales; comparing their key sets shows incomplete coverage in every locale.
- The vendored bundle identifies `lit-html 2.7.1`, `lit-element 3.3.1`, and `@lit/reactive-element 1.6.1`, the Lit 2 generation. The names have different major versions; `lit-element 3.3.1` does not mean this project is using Lit 3.
- The only workflow runs HACS metadata validation using `hacs/action@main`. It does not build the card or validate runtime behavior.
- Upstream open issues were enumerated across three REST pages: **208 records = 189 issues + 19 pull requests**. Labels identify 124 new app shortcut issues and seven shortcut update issues. Unlabeled reports were also reviewed. Counts are a dated snapshot, not a live tracker.
- The fork has no releases, and GitHub reports its issue tracker disabled. Upstream's latest release is `v4.1.9`, published 22 October 2025; the checked-out branch includes a later NOW Italy launcher change. A release badge that points upstream does not describe this fork.

The [issue index](UPSTREAM_ISSUE_INDEX.md) preserves the complete open issue and PR inventory. The [app request audit](APP_SHORTCUT_AUDIT.md), [closed app history](APP_SHORTCUT_HISTORY.md), [bug audit](BUG_AUDIT.md), and [architecture audit](ARCHITECTURE_AUDIT.md) provide implementation dispositions, source evidence, and verification requirements. The app review screened all 706 actual issues and retrieved 2,063 comments, covering 145 open and 384 closed app-related issues. The bug review identifies 45 distinct open bug/support reports in 39 rows and 23 relevant feature requests, including 18 additional issues outside that bug/support set. These categories overlap app updates and are not additional issue totals.

## Priority findings

| Priority | Finding and evidence | Required outcome |
| --- | --- | --- |
| P0 | Fork destinations are still upstream: README funding at lines 8 and 421–422; `.github/FUNDING.yml`; upstream assignees in five issue forms; upstream release, install, support, wiki, and runtime help links. | Remove donation and wish-list promotion; replace operational destinations; preserve author credit. |
| P1 | No reproducible build or automated behavior checks; distribution files serve as source. | Establish a repeatable build and focused regression suite before large refactors. |
| P1 | `setConfig` only checks for an entity, while device lookup requires exact keys and `render` branches by resolved style (`HA-Firemote.js:41`, `:458`, `:3456`). Invalid devices can render blank. | Validate family, model, style, entities, scales, and custom actions; show actionable errors. |
| P1 | App launch handling routes through ADB or `select_source`, with no Android TV Remote app launch path (`HA-Firemote.js:5918`). Some special buttons also bypass the associated remote. | Introduce explicit capability-based adapters and support remote-only Android TV where feasible. |
| P1 | App launch identifiers and names have drifted. Reports include SmartTube, Plex, BBC iPlayer, Discovery+, Swiftfin, and others. | Resolve requests by platform and region; prefer discovered names or verified launch metadata. |
| P1 | Gesture handling installs local release listeners and repeat timers (`HA-Firemote.js:5974`, `:6189` and repeated branches). | Centralize pointer and keyboard handling, capture release, and cancel on pointer cancellation, blur, and disconnect. |
| P1 | Override/custom-action calls use synchronous `try/catch` without awaiting service promises (`HA-Firemote.js:5868`, `:5876`, `:5906`). | Manage request promises and failures; distinguish immediate haptic input acknowledgement from confirmed action completion. |
| P1 | Custom launcher labels, icons, image paths, and styles are concatenated into HTML before `unsafeHTML` rendering (`HA-Firemote.js:113`, `:3699`, `:3711`). This is a configuration-to-markup trust boundary. | Render configured text and attributes through safe templates; reserve trusted markup for controlled artwork. |
| P1 | ADB keyboard input escapes double quotes but builds a shell command from the entered text (`HA-Firemote.js:6150`). | Prefer structured integration text actions; test correct shell quoting in the ADB fallback. |
| P2 | Editor entity discovery assumes `hass.entities` and filters exact integration platform names (`HA-Firemote.js:8035`). | Guard missing registry data, discover capabilities, and support paired entities from modern integrations. |
| P2 | Fixed dimensions, heuristic heights, and the older `getLayoutOptions` API instead of `getGridOptions`; both layout methods explicitly omit added app rows (`HA-Firemote.js:208`, `:278`). | Correct Sections and masonry sizing and responsive app/logo scaling. |
| P1 | Core controls are pointer-only with no accessible names for many icon controls; launcher buttons already support `click`. | Add keyboard activation and accessible names to the shared input controller; remove hidden controls from focus and dispatch. |
| P2 | Editor rendering mutates supplied configuration without dispatching an edit, and some association selectors use the wrong value (`HA-Firemote.js:8226`, `:8474`). | Make rendering pure, preserve advanced YAML, and emit immutable configuration only after deliberate edits. |
| P2 | Numeric zero and quoted zero produce different launcher sizes (`HA-Firemote.js:3472`); isolated dispatch and catalog gaps are detailed in the architecture audit. | Normalize accepted numeric forms and fix the deterministic dispatch/capacity defects with regression coverage. |
| P2 | The editor can create up to the entire catalog's worth of launcher fields; the catalog is eagerly imported. | Render configuration fields on demand and avoid unrelated entity updates redoing expensive work. |
| P2 | Locale lookup uses installation language and a fixed Hebrew RTL check (`HA-Firemote.js:3494`, `:5824`, `:8008`). UI translations and app source names share a lookup. | Use user locale with fallback, complete keys, general RTL, and separate display labels from launch identifiers. |
| P2 | App data, generated inputs, and custom launchers use a mutable module-global `appmap` (`HA-Firemote.js:30`, `:154`). | Give each card an immutable derived catalog and verify multiple cards/editors together. |

These priorities distinguish source-level defects from reports that still need a reproduction. An app or device report is not proof that the card alone is at fault.

## Implementation sequence

### Phase 0 Establish the fork boundary

1. Extend the audit's `AGENTS.md` ownership rule into contribution instructions and automated publishing checks. Every publishing script and workflow must explicitly target `Narehood/HomeAssistant-TV-Remote`; release jobs must check `github.repository` and use job-scoped permissions.
2. Remove `.github/FUNDING.yml`, both README coffee buttons, PayPal promotion, and Amazon wish lists. Do not substitute a new donation destination.
3. Give the README, HACS display metadata, and card picker an explicit fork identity while preserving the initial YAML type and filename. Replace release/download/HACS/support links, runtime console/help URLs, and issue-template assignments. Correct the assumption that the fork is already a HACS default repository. Use its custom repository installation flow initially.
4. Move essential setup and troubleshooting material into versioned repository documentation with attribution. Do not change wiki URLs to a fork wiki that does not contain those pages. Keep historical references clearly labeled until their useful content has been migrated.
5. Add an author/contributor acknowledgment and third-party notices; preserve existing licensing and history. Copy useful screenshots into maintained assets only with their provenance and required credits.
6. Enable the fork's issue tracker, create its labels, and configure its default PR destination during implementation. No upstream issues will be closed or commented on when the fork fixes them.

Acceptance: all mutation destinations are the Narehood fork; funding promotion is absent; author and dependency credit remain; installation and support paths work for a first-time fork user.

### Phase 1 Capture behavior and build reproducibly

1. Use Node.js 24 LTS for development and CI initially, with one package manager and a committed lockfile. Node is a development dependency, not a new server requirement for Home Assistant users. [Node release status](https://nodejs.org/en/about/previous-releases).
2. Move authored code into `src/` with initially equivalent behavior; add a small bundle pipeline, TypeScript, linting, consistent file formatting, and a local mock-Home-Assistant harness. The implementation uses esbuild for the self-contained artifact. Adopt strict types module by module. Preserve Lit's reactive accessors with `declare`-only typed fields initially or deliberately compatible field semantics; emitted `hass`/`_config` fields must not shadow them.
3. Split configuration normalization, device metadata, launch metadata, artwork, platform adapters, input handling, card views, and editor views into separate modules. Keep the physical remote artwork and designs.
4. Add meaningful tests for service payloads, invalid configurations, custom actions, per-platform app resolution, multiple card instances, locale fallback, and press/hold/release cancellation. Capture representative visual fixtures across remote styles and both app-launcher views.
5. Build a single browser ES module containing the card and its runtime dependencies. Preserve `HA-Firemote.js` as the initial installation filename and `custom:firemote-card` as the YAML type. Derive the displayed version from release metadata, replacing manually synchronized import query strings.
6. Replace the unmanaged Lit bundle with a pinned supported Lit package after baseline tests are in place; target Lit 3 using its upgrade guide. Import only needed directives, retain notices, and validate supported browsers. [Lit upgrade guide](https://lit.dev/docs/releases/upgrade/), [production build guidance](https://lit.dev/docs/tools/production/).
7. CI must run clean install, type checks, lint, regression tests, production build, and a smoke load of the actual artifact. Keep HACS validation as an additional check. Pin external actions to reviewed commit SHAs and automate update proposals; use read-only permissions for validation. [GitHub workflow security guidance](https://docs.github.com/en/actions/reference/security/secure-use).

Acceptance: a fresh checkout can produce the installable artifact with documented commands; CI exercises the artifact; existing valid YAML and representative devices retain their behavior.

### Phase 2 Repair dispatch and confirmed regressions

1. Introduce validated normalized configuration with explicit legacy aliases, helpful errors for unknown identifiers, and stable model IDs. Preserve meaningful `false` and `0` expert overrides instead of replacing them with defaults through truthiness checks. Avoid silently guessing a different device when a typo is ambiguous.
2. Introduce adapters for Android TV Remote, ADB/Fire TV, Apple TV, Roku, and user-defined actions. Model media-player, remote, and optional volume/input entities separately. Select actions by available integration capabilities, with documented fallbacks.
3. Support Android TV Remote without mandatory ADB for controls it can provide. Investigate its documented text and separate press/release commands, gated by the chosen Home Assistant support range. Prefer supported deep links for app launches; package launches need fallback because Home Assistant currently documents a Google Play limitation. Fire TV remains an important exception to Android TV Remote availability. [Android TV Remote documentation](https://www.home-assistant.io/integrations/androidtv_remote/).
4. Preserve ADB and `sendevent` modes for existing Fire TV/device configurations. Treat input event paths as device-dependent overrides rather than universal constants; investigate dynamic discovery only with device fixtures and rollback.
5. Resolve Apple TV source names against the device's sources, with explicit aliases and region handling. Keep UI translation independent from source identity. Support its documented launch/deep-link and keyboard paths where available. [Apple TV documentation](https://www.home-assistant.io/integrations/apple_tv/).
6. Keep supplied configuration immutable and editor rendering pure. Opening, focusing, rendering, or canceling the editor must not rewrite an entity or remove associations. Recover from temporarily absent associated remote state and display the correct Apple/Roku/Android selector values. Keep service `target` separate from `data`, preserving documented legacy collision behavior; existing merged `entity_id` payloads are not inherently invalid.
7. Repair deterministic dispatch defects from architecture finding A8: Apple mute must not fall through to ADB; accepted singleton custom actions must work; display names containing `-button` must not break dispatch; Homatics slot capacities must agree; Toshiba matching must remove the stray quote; and documented `restart-button` must have a compatible route to `reboot-button`. Normalize numeric and quoted zero identically and validate advertised catalog coverage, including Pathé Thuis platform gaps.
8. Replace configuration-derived HTML concatenation with safe template bindings and separate trusted SVG artwork. Repair ADB keyboard quoting with punctuation, shell-expansion, backslash, and newline cases; use structured text actions where supported.
9. Centralize gestures, keyboard activation, accessible names, and bounded repeat actions. Handle `pointercancel`, release outside the button, lost pointer capture, visibility/blur, disconnect, and multi-touch cases. Hidden controls must not remain focusable. Stop timers and remove listeners on every termination path, and prioritize key-up over queued repeats. Retain bounded Roku repeat emulation until a replacement is verified; generic hold parameters alone are not sufficient.
10. Repair the app regressions and bug clusters in the bug appendix, including source lookup, hidden launcher behavior, and asynchronous error handling. Preserve immediate haptic acknowledgement, and handle confirmed completion and errors separately. Integration and hardware limits need a tested workaround, explicit unsupported state, or diagnosis; they must not be dismissed merely because they are external dependencies.

Acceptance: each code repair has a failing reproduction and a passing regression check; integration/device reports carry actual Home Assistant validation evidence before they are marked resolved.

### Phase 3 Complete the app shortcut backlog

Every app shortcut request in the reviewed backlog belongs in scope, including unlabeled requests, requests with empty titles, platform extensions, regional variants, renames, and package changes. The app appendix is the implementation ledger. Merge duplicate requests into one implementation while retaining a reference to every original issue.

The 145 open app-related issues divide into 81 missing-preset reports, 10 missing-platform reports, 11 missing-variant reports, nine requiring verified identifiers, 19 regressions or renames, seven integration/dispatch investigations, seven with an existing preset, and one visual update. These are issue counts, not unique new apps or completed fixes. In particular, existing Roku presets in #422/#423 still need source-name repairs to `5`/`U`, and duplicate brands can represent distinct regional products. The review recovered app names from all 12 empty-title requests and found that #798 requests SOOP despite its Coupang Play title.

1. Define a typed catalog with stable IDs, aliases, display names, artwork references, supported families, region, launch strategy, verification date, source links, and lifecycle state. Validate duplicate IDs, missing artwork, and inconsistent family declarations in CI. Mark genuinely retired apps as legacy choices with an explanation and preserve existing YAML IDs instead of advertising them as working new choices.
2. Separate SVG artwork from launch metadata. Generate repeated Android family entries where their behavior is actually identical; preserve differing Fire TV, Apple TV, Roku, and regional behavior.
3. Implement missing apps and requested family coverage in batches by launch strategy. Apply verified app updates and preserve old YAML IDs as aliases when an app is renamed. For Roku, evaluate using the catalog's evidenced channel IDs rather than branding-sensitive source names, with integration tests against the supported Home Assistant version.
4. Resolve incomplete requests through official app metadata, existing issue comments, repository manifests, or local device discovery. Do not invent package, activity, channel, or source identifiers, and do not contact upstream reporters. Any remaining missing evidence becomes an explicit fork-local task, with the exact metadata needed.
5. Keep custom launchers available for sideloaded, regional, and private apps; allow existing catalog artwork with a user-defined action so an app need not enter the public registry just to be usable.
6. Check relevant unmerged upstream PRs as reference material for existing app fixes and additions, with attribution if code is reused. Review their behavior and tests independently; no upstream PR operations are part of this work.

Acceptance: every request has a documented outcome and every requested supported-platform combination has verified launch metadata and regression coverage. A duplicate, an already-supported request, or a request awaiting identifiers must retain its disposition; an unverified launcher is not considered completed merely because its logo appears.

Retirement needs service-specific and regional evidence. The catalog still includes `showtime`; its provider says the standalone app ended on 30 April 2024, so this is a concrete legacy/deprecation candidate, with an explicit migration explanation rather than an automatic subscription or app substitution. [SHOWTIME service notice](https://help.showtime.com/hc/en-us/articles/16694786598043-What-is-happening-to-the-SHOWTIME-streaming-service). Closed requests for Eurosport must also be rechecked before restoration: its brand changed to TNT Sports in the UK and Ireland while continuing in other countries. [Eurosport regional notice](https://help.eurosport.com/gb/Answer/Detail/000004679).

### Phase 4 Modernize layout and configuration

1. Replace the older `getLayoutOptions()` Sections contract with `getGridOptions()` and reliable masonry height that includes custom/app rows. Use responsive layout and measured bounds where needed; remove redundant per-style size heuristics only after visual comparisons. [Home Assistant custom card API](https://contributors.home-assistant.io/frontend/custom-ui/card/).
2. Replace the hundreds of preallocated launcher controls with an ordered add/remove/reorder list, searchable catalog, and explicit app count. Preserve the existing `app_launch_N` configuration through an adapter.
3. Make buttons reachable and usable with keyboard and screen readers. Preserve remote appearance while adding labels, visible focus, larger usable targets, and reduced-motion support.
4. Improve entity discovery and pairing with useful empty/error states and matching entity domains/devices. Use documented extension points; evaluate `getConfigForm` where the supported Home Assistant range allows it and retain `getConfigElement` compatibility as needed. Isolate any necessary `ha-*` components or registry assumptions behind compatibility checks because frontend implementation elements are not stable public APIs.
5. Complete translations using a canonical key set and locale fallbacks; review the Portuguese request and German Apple TV source report. Support RTL beyond Hebrew without reversing physical remote key meanings.
6. Include improvements directly related to reported usability problems: hiding any launcher, scaling directional controls, optional input switching via a script/action, separate volume target, keyboard action as a launcher, configurable launcher limits, and reusable icon/artwork overrides.
7. Defer expansion into new device ecosystems, arbitrary frontend JavaScript templates, advanced swipe gestures, and additional cosmetic skins until the correctness and catalog work ships. Keep these requests in the ledger rather than promising them as necessary modernization.

Acceptance: editor round trips retain advanced YAML; both dashboards lay out correctly on mobile, desktop, and kiosk widths; accessibility and repeat-input behavior pass browser checks; editor work grows with configured buttons rather than all catalog entries.

### Phase 5 Release and maintain the fork

1. Validate installation from the Narehood HACS custom repository and a manual download in a clean Home Assistant instance. HACS installs published files rather than building source; ship the completed bundle as a release asset and verify its filename/configuration. [Dashboard packaging guide](https://contributors.home-assistant.io/marketplace/guides/dashboard/).
2. Document migration from the upstream repository, changed resource paths, browser cache reload, and rollback. Remove the old upstream resource before loading this fork: two modules registering `firemote-card` cannot safely coexist without deliberate element-name isolation.
3. Publish fork-specific versions, release notes, checksums, supported Home Assistant/browser ranges, and a tested device matrix. Start with the current stable Home Assistant release and a stated previous version range; define the exact minimum through validation rather than guessing it now.
4. Use a prerelease for the migration, then a stable release after hardware smoke tests across Fire TV, Android TV Remote without ADB, Android with ADB, Apple TV, Roku TV and Roku streaming players. Distinguish TV volume support from IR-only control on streaming remotes.
5. Add dependency update automation, app metadata verification dates, regression fixtures for newly fixed reports, and issue templates that request versions, YAML, integration types, device/firmware, logs, and direct action results. Redact personal/network details from published fixtures.

Acceptance: reproducible release artifacts install successfully through both paths, migration preserves YAML behavior, and all catalog and bug ledger entries have an honest implementation/validation state.

## Deprecation and compatibility policy

| Retire or discourage | Replacement and compatibility |
| --- | --- |
| Editing `dist` as the development workflow | Authored modules and generated release artifacts. |
| Manually vendored `lit-all` and its manually synchronized import versions | Locked npm dependency and reproducible bundle; retain license notices. |
| Mandatory ADB for every Android device | Capability-based Android TV Remote path; retain ADB where required. |
| Platform-wide hard-coded launch activities or English source names | Verified per-platform identifiers, discovered sources, deep links, and aliases. |
| Global mutable app catalog and opaque JSON strings for remote commands | Per-card normalized data and typed command structures. |
| Pointer-only handlers, repeated local timers, and blocking alerts/prompts | Shared input controller and accessible dialogs/error states. |
| Raw configured labels passed through SVG/HTML rendering | Text rendering for user labels; tightly controlled trusted artwork rendering. |
| Hundreds of empty editor fields | Dynamic configured-button list with legacy YAML conversion. |
| Upstream donations, assignees, support and installation links | Fork-owned operational destinations and explicit original-author attribution. |
| Maintenance badge as evidence of compatibility | Versioned support matrix, passing CI, release notes, and tested artifacts. |

Do not silently drop existing device families, remote designs, `custom:firemote-card`, `entity: none`, sparse `app_launch_N` slots, custom launchers, service/script overrides, or compatibility modes. Preserve blank/default launcher meanings and historical app IDs where possible. Existing cards retain transport selection until an intentional, documented migration; new automatic selection must not silently replace working ADB behavior. Any unavoidable breaking change requires a documented migration and version boundary.

## Completion criteria

- All GitHub writes and release operations target the Narehood fork; upstream has received no write actions.
- Upstream funding promotion is removed while author, contributor, and dependency credit remain.
- Existing valid configurations migrate with documented compatibility guarantees.
- Every reviewed app shortcut request has an implemented or explicitly evidenced disposition, and missing identifiers remain visible until resolved.
- Every bug report is traced to a regression repair, validated integration/device workaround, duplicate with a verified resolution, or a specific remaining reproduction requirement.
- Fresh build, meaningful automated tests, browser layout/accessibility checks, clean installation, and the hardware validation matrix pass before stable release.

No calendar estimate is assigned before device access and incomplete launch metadata are resolved. The phases form the dependency order: fork boundary and baseline first, then dispatch/catalog work, then broader UI work and release validation. Large catalog updates and general framework changes should not land in the same unreviewable change.

## Audit validation

The audit checked JavaScript syntax for the five shipped modules and inspected the device, app, and translation registries. A Node VM harness running the actual card source with minimal DOM/Lit stubs reproduced two failures: an unknown model passes `setConfig` and makes `render()` return `undefined`, while the known `fire_stick_4k` model returns a template; and an editor without `hass.entities` throws a `TypeError` during platform filtering. This establishes those source behaviors without claiming browser layout or hardware validation. Service delivery, current app identifiers, CEC/IR, integration recovery, and physical device behavior remain acceptance checks for implementation.

## Provider scope clarification, 22 October 2026

The user's follow-up narrows new launcher additions to actual TV/video providers. This supersedes the original general-app backlog scope: review every request, preserve its evidence, and exclude utilities, generic or personal-media players, unofficial clients and unverified identities from additions. The [102-entry provider review](PROVIDER_REVIEW.md) retains 51 and excludes 51. All 385 inherited YAML IDs remain addressable, while inherited VPNs become legacy-only in new-choice menus. Exclusion is recorded separately from implementation or device validation.
