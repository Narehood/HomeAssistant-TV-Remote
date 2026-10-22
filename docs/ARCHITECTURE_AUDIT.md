# Runtime architecture audit

Audit date: 22 October 2026. Baseline: `b856a45e684775fd477dbcd8d1342ff65bb97e38`, Firemote `v4.1.9`. See the [modernization plan](MODERNIZATION_PLAN.md) for the combined implementation sequence.

Evidence labels distinguish source-confirmed findings, additional reproductions in an inert Node VM, inferred risks needing measurement, and physical or live Home Assistant checks. VM templates and mocked services do not establish browser layout or hardware behavior. No Home Assistant commands or upstream mutations were performed.

## Prioritized source findings and acceptance criteria

### A1 — P1 — Gesture lifecycle can leave repeats/key-down active (CONFIRMED, MOCK)

Evidence: dist/HA-Firemote.js:5978-6021 installs button-local mouseup/pointerup/mouseout/touchmove listeners; :6188-6193, :6200-6205, :6230-6234 and the repeated branches install intervals or a separate sendevent down/up pair. No application disconnectedCallback, pointercancel, lostpointercapture, visibility/blur cleanup, or pointer capture exists. Repeat rls functions generally clear their interval without unregistering themselves. There are 38 setInterval calls.

MOCK: Roku up held past 500 ms created one repeat interval. Emitting pointercancel left the interval active. Pointerup cleared it but left a release listener installed. Without pointerup, detachment has no implemented cleanup. Physical stuck-key impact remains HARDWARE; missing cleanup is code-confirmed.

Plan: a per-card input controller owns one interaction per pointer, timers, capture, and cleanup. Pass an explicit semantic button action; use currentTarget during the synchronous event rather than reading clicked.target.id and relying on child pointer-events CSS. Primary-button/isPrimary checks replace deprecated which reliance. Model press, click, hold, repeat, release, and cancel deliberately; keep the legacy 500 ms hold threshold unless intentionally changed.

Acceptance: pointerup outside the button, pointercancel before/after threshold, lost capture, blur, visibility change, config change, and detach stop all repeats; no accumulating listeners across 1,000 interactions; no dispatch on simple focus; one tap produces one action; canceled/released interactions never resume. Pair each successfully emitted key-down with best-effort key-up when the transport is available. Bound queued repeats and give key-up priority; no automatic retry of non-idempotent toggles/scripts.

### A2 — P1 — Configured HTML has an unsafe parsing boundary (CONFIRMED, MOCK)

Evidence: dist/HA-Firemote.js:115-125, :127, :3699, :3711. Label, URL, icon, CSS color/background and alt strings are interpolated through string concatenation, then parsed by unsafeHTML. A malformed image URL can create new HTML attributes. Button-override keys also become raw CSS selectors (:3481); colors/skin become CSS text (:3495-3525).

Plan: ordinary Lit text/property/attribute bindings for configured content; validate URL schemes and declared style values; keep a separately typed trusted artwork path for repository-owned SVG strings. unsafeCSS(launcherCSS) at :3085 receives static repository CSS, a different trust boundary from configured HTML.

Acceptance: quotes, angle brackets, ampersands and event-handler-shaped values remain literal or are rejected with an actionable config error; no injected node, event attribute, or unexpected CSS declaration. Existing safe local/HTTPS image and MDI-icon configurations continue working. Check browser behavior without relying on a deployment-specific CSP as the protection.

### A3 — P1 — Keyboard text reaches an ADB shell with incomplete quoting (CONFIRMED, MOCK)

Evidence: dist/HA-Firemote.js:6144-6151 replaces only double quotes, then puts text inside a shell double-quoted argument. MOCK retained a literal $() expression unchanged in the outgoing command string; no shell or device was invoked. Dollar expansion, backticks, backslash/quote interactions and input-text limitations need explicit handling. Stable HA's ADB command implementation sends unknown named commands to adb_shell.

Plan: prefer a supported structured text route when available, with a tested shell serializer for legacy ADB. Preserve the existing Roku Lit_ path and gate Apple TV keyboard support by its required config-entry/focus capability.

Acceptance: spaces, both quotes, dollar signs, backticks, backslashes, newlines and supported non-ASCII input cannot cause shell expansion or an additional command. Document/report device text limitations. No entered text in debug logging by default. Fire TV users retain a working ADB path.

### A4 — P1 — Core controls lack keyboard activation and names (CONFIRMED; browser measurements pending)

Evidence: dist/HA-Firemote.js:3901-3906, :5345-5350 and repeated icon controls use pointerdown only. Launcher buttons at :3698 and :3710 use click. Icon-only buttons have no authored accessible label; empty D-pad buttons are unambiguously unnamed. Hidden button overrides use opacity:0 plus pointer-events:none (:3481), which does not remove native focusability. Several D-pad styles explicitly remove outlines (:1492, :1499, :1722).

Acceptance: every displayed control has a meaningful localized accessible name; every tap action works once via Enter/Space and assistive activation; hold functionality has a keyboard equivalent; focus is visible; hidden overrides are removed from the accessibility/focus tree and cannot dispatch. State indication is available without color alone. Measure contrast, reduced motion, reflow and target size at supported scales; W3C's 24 CSS-pixel minimum includes spacing/other exceptions, so do not declare every small target a failure without measuring.

### A5 — P1 — Configuration/state contracts are not enforced (CONFIRMED, MOCK)

Evidence: dist/HA-Firemote.js:458-462 checks only truthiness of entity and keeps the caller object. deviceAttributeQuery :39-60 recursively searches across families, returns typed values as strings, and tests overrides by truthiness. getOpenAppID :3433-3440 dereferences entities without guards. Editor :8035-8057 assumes a registry, :8128/:8160/:8185/:8211 assumes every registry entity has a state, and :8450 assumes a valid family.

MOCK: a configured but absent Android remote crashes render with a state dereference even while the main entity exists. A missing device attribute resolves to string "undefined"; an unknown model resolves to an empty string. False tuner_override and numeric-zero hdmiInputs_override are ignored, yielding true/4 for a Fire TV 4-series configuration. Independent VM checks also reproduced unknown-model blank render and missing-registry TypeError.

Plan: separate raw-compatible input, immutable normalized config, resolved device capabilities, and live entity state. Validate identifiers and structural types before rendering/dispatch. Treat unavailable/temporarily absent states as runtime status rather than permanently invalid YAML. Only eligible media_player/remote entities should participate in default pairing; getStubConfig :419-426 currently filters platform without domain, ignores the suggested entity lists, and does not populate required Apple/Roku remote association.

Acceptance: invalid family/model/style/action/scale errors name the offending field; no blank render or unhandled exception. Missing registry or state yields a loading/unknown status and recovers. Existing entity:none mode works without looking up a real state. Do not reject previously accepted numeric-string scales. Paired remotes match the selected device or remain explicitly unselected. Boolean/zero overrides have documented typed semantics.

### A6 — P2 — Editor render mutates inputs and selected values are inconsistent (CONFIRMED, MOCK)

Evidence: dist/HA-Firemote.js:7966-7975, :8093-8095, :8224-8230, :8424-8431. Family changes at :7981 only reset device_type and can retain old integration associations. The caller at :8474 always passes android_tv_remote_entity, but the Apple and Roku selects bind that argument at :8154/:8179. Android blank-option detection checks androidTVRemoteEntity instead of android_tv_remote_entity (:8199). Launcher optionvalue is read before its var assignment (:8336/:8340), so the blank option gets selected markup regardless of the current key; exact browser impact needs DOM verification.

MOCK confirms none/other helper mutations without any config-changed event. Rendering must be side-effect free even when configurations are frozen.

Acceptance: opening, rendering, focusing or canceling the editor never changes supplied YAML; every deliberate edit emits one complete immutable config. Apple/Roku/Android associations display and retain the correct values. Device-family changes remove incompatible associations only as an explicit state transition. Advanced YAML and unknown extension keys survive editor round trips. Fix label-for mismatches (:8391, :8435, :8479) while making form controls accessible.

### A7 — P2 — Numeric string zero changes AL2 size (CONFIRMED, MOCK)

Evidence: dist/HA-Firemote.js:3472 uses parseInt(value) || 100; :7974 writes strings and :8436 exposes the offset slider. Numeric 0 yields no offset, while string "0" becomes +100 percentage points.

Acceptance: 0 and "0" give identical size; positive/negative offset cases normalize once; nonfinite/negative total sizes are rejected clearly; documented positive scale values outside the GUI's 20-120 range are not silently clamped during migration. README.md:170/:249 deliberately uses string scale values.

### A8 — P2 — Dispatch contains isolated wrong-domain and data-routing defects (CONFIRMED, MOCK)

Evidence: dist/HA-Firemote.js:7104-7106 shows the unsupported Apple mute alert without returning. Execution continues to :7114-7115, the undefined-input-path ADB fallback. MOCK: one Apple mute tap emitted one alert and androidtv.adb_command(command:MUTE) against the Apple media_player. This must terminate at the unsupported result unless overridden.

Custom launcher normalization accepts singleton objects at :109-110, but the action-only dispatch path assumes _config.custom_launchers.forEach at :5902. MOCK: singleton script launchers and singleton action launchers follow inconsistent paths; the latter throws. Keys use the first '-button' substring (:5891/:5920); MOCK: friendly_name containing '-button' produced no configured script call. Duplicate friendly names overwrite map entries at :127.

Acceptance: all supported singleton/list script/action forms dispatch exactly once with intact data, or a documented migration normalizes them; IDs do not depend on parsing a user-visible name; collisions are detected. Unsupported actions never fall through to another platform. Preserve legacy script/action/service precedence deliberately; add target-less actions only with an explicit contract.

Additional confirmed discrepancies: :7706 contains fire_tv_toshiba_v35 with an extra quote, so the intended live-button match fails; :4633 uses ON1's eight launcher slots for every Homatics style even though :35 advertises six for HO1/HO3/HO4. MOCK: default HO1 renders eight launcher slots while the editor advertises six. README.md:337 calls the reboot override restart-button, but the rendered/handled key is reboot-button (:5604/:7864); the README also omits info-button/bookmark-button. These deserve fixtures and aliases/documentation, not silent configuration loss.

### A9 — P2 — Service execution has no managed async outcome/backpressure (CONFIRMED; live effects unmeasured)

Evidence: dist/HA-Firemote.js:5868-5878/:5894/:5906 and the remaining calls are not awaited. try/catch cannot catch later promise rejection. The async getActionType promise assigned at :5974 is unused; interval callbacks submit service requests independent of completion. Repeats can be as frequent as 100 ms (:6781/:6890).

Acceptance: rejected services leave no unhandled promise rejection; one useful outcome notification appears; no double notification if HA already handles it; press haptics remain distinct from success/failure. Queue policy is bounded and transport-aware, release is not stranded behind repeat backlog, and non-idempotent actions are never blindly retried. Preserve target/data collisions intentionally when migrating :5836-5854 to the fourth callService target argument.

### A10 — P2 — Layout contract and dimensions are incomplete (CONFIRMED; actual clipping is browser-dependent)

Evidence: dist/HA-Firemote.js:278 exposes getLayoutOptions with grid_rows/grid_columns. Current documented Sections contract is getGridOptions with rows/columns. :210/:280 explicitly omit additional launcher rows. getCardSize :208-275 has no HO1-HO4 or AL1/AL2 case; MOCK returns undefined for HO1. Name/version labels and optional Chromecast controls also alter bounds.

Acceptance: proper getGridOptions output for the supported HA range; preserve a legacy alias only where the selected historical baseline actually needs it. Masonry gets a valid size for every supported style; account for all variable content. Test all style definitions, sparse/high-index slots, both AL layouts, top/bottom names, version labels and optional controls at desktop/mobile/kiosk widths and zoom. Keep SVG viewBox proportions and physical control ordering.

CSS lint should catch ignored declarations including aspect ratio at :642 and invalid box-shadow calc syntax at :1185/:1871. :has selectors at :538/:2416/:2811 require inclusion in the chosen browser/WebView matrix; this audit did not establish a current-client compatibility failure.

### A11 — P2 — App registry mixes command data, artwork, presentation and capability declarations (CONFIRMED; performance impact partly inferred)

Coverage: all 385 entries were evaluated in an inert VM; field/family coverage, absence of obvious active external markup, and every generic/nested remoteCommand JSON string were checked. All remoteCommand JSON parsed. The registry contains 1,414,595 raw bytes (386,171 gzip measured locally), including static SVG and 445 CSS rule blocks. No application fetch/XHR/WebSocket/eval/token-storage code was found. This is not a full supply-chain security certification.

Evidence: dist/launcher-buttons.js:6195-6203 advertises pathe-thuis for Apple plus four Android families, but only the Apple launch metadata exists; :5949 consequently dispatches source undefined on those advertised Android selections. :10739 contains ccom.nes.recents rather than com.nes.recents; the adjacent correct appName can mask the active-state effect, so do not claim that typo alone proves the launcher fails.

appmap is module-global (:28/:69-71); card, editor and button handler rebuild it (:3569/:5799/:8448). Rebuilding at synchronous entry points limits simple cross-card contamination; global state is an isolation/design risk, not a separately reproduced cross-card bug. The click path hardcodes four HDMI/one AV/tuner inputs rather than using resolved capabilities (:5799). AL1/AL2 slot capacity is frozen at initial catalog size (:36), ignoring later custom entries.

Plan: validated typed launch strategies, immutable base catalog and per-config overlays, stable IDs/aliases, capability-specific resolution, trusted artwork resources and separate locale labels. A missing field is an explicit unsupported/incomplete result rather than an undefined service call.

Acceptance: each advertised family resolves to a valid launch strategy; all data parses at build time; no duplicate IDs; custom/input overlays do not mutate the base; every historical alias remains recognized or produces a migration error; registry additions do not change legacy slot interpretation or defaults. Hardware verification remains necessary for actual packages, activities, regions, firmware and app availability.

### A12 — P2 — AL editor cost grows with the catalog rather than configured buttons (CONFIRMED structure; timing inferred)

Evidence: dist/HA-Firemote.js:8318-8359 creates appButtonMax[style] selects, mapping every app into each. AL styles allocate 385 selects. For Shield, the shipped declarations offer 280 applicable entries: 107,800 nonblank option candidates before custom/input overlays, plus 385 blank choices. Render rebuilds the registry each hass update and recursively looks up device attributes. Both hass and _config are reactive (:200-204/:7958-7962), with no application shouldUpdate.

Acceptance: editor DOM grows with configured/edited slots, not all catalog entries squared; add/search/reorder loads only necessary controls and retains app_launch_N semantics. Card rendering depends on relevant states/config/theme/language; unrelated HA updates do not rebuild derived config/catalog or invoke service calls. Establish measurements on a representative mobile WebView before adopting a numeric performance budget. Preserve offline/self-contained resource operation and do not add runtime CDN dependency.

### A13 — P2 — UI localization and device app identity are coupled (CONFIRMED; device effects require verification)

Evidence: dist/HA-Firemote.js:3494/:5824/:8008 reads hass.config.language, while HA documents hass.language for the effective user's language. The 13 dictionaries have 24-48 keys each against a union of 55; all have omissions. Source names are passed through that UI translation table (:5933); AR2 search sends hard-coded Search (:7886). Hebrew-only direction logic is present; guiEditorDirection at :3494 is never consumed. Physical remote direction is deliberately ltr at :477 and should stay semantically stable.

Acceptance: canonical UI keys with documented English fallback and normalized locale/base-language fallback; change one user's language without changing another installation's language or the TV's source identity. Resolve source_list/app IDs from device/integration, retaining curated aliases for older devices. Device app names, UI labels and accessible names are different fields. RTL affects editor text and layout appropriately without swapping physical left/right commands. Native-language review remains necessary; key completeness does not certify translation quality.

### A14 — P2 — Build, dependency and HA integration boundaries need explicit contracts (CONFIRMED risk, not a demonstrated exploit)

Evidence: no package/build/test configuration is tracked. dist/HA-Firemote.js:3-6 eagerly imports four local modules, three with manually synchronized versions. Vendored Lit generation is shown at dist/lit/lit-all.min.js:17/:22. The map has 31 embedded upstream source files. dist/HA-Firemote.js:7941/:8557 registers custom elements unconditionally, so loading fork and upstream resources together collides. .github/workflows/validate.yml:15 uses mutable hacs/action@main without an explicit permission block.

Acceptance: deterministic artifact from a clean lockfile install; own bundled Lit and resolved imports; no new HA server/Node requirement; license notices retained; actual artifact smoke-tested under HACS and manual URLs. Pin validation actions and restrict permissions; no upstream writes. Current two-copy custom-element collision needs one-resource migration instructions, not an attempted silent override.

## README configuration feature coverage and compatibility contract

- Installation/prerequisites/support: README.md:46-113/:364-422. Version and migrate essential knowledge into the fork; retain credits. Default-HACS status must be independently established for the fork. Do not promise event0-event13 always fixes unresponsive devices (:387); firmware, authorization and protocol limitations remain possible.
- Entity/family/model/association/compatibility: :179-187. Preserve all current IDs, entity:none/other and optional Android remote association. The family options table omits homatics (:181), though the registry and walkthrough contain it. Keep unsupported records distinct from verified support: there are 56 records, 52 marked supported including none, and four marked unsupported. A supported:true flag is historical metadata, not fresh hardware certification.
- Style and slots: :187-189. Preserve all remote styles, slot order, HDMI friendly names, blank/default legacy behavior, default-app selection and custom launcher IDs/aliases. Clarify limits per style rather than coupling capacity to catalog length. No silent renumbering of sparse app_launch_N keys.
- Sizing: :190 plus quoted scale examples :170/:249. Normalize compatible numeric strings; document GUI range separately from runtime accepted positive scales. Document app_launcher_relative_size (implemented/editor-visible, missing from the options table) and its AL2-only effects.
- Custom launchers: :191/:216-268. Preserve scripts, action/legacy service aliases, targets/data, image/icon/label precedence and safe visual properties. Normalize singleton/list inputs consistently; ensure names/IDs are unique and delimiter-independent. Repair unsafe parsing without dropping legitimate safe URLs/icons/colors.
- Button overrides: :192/:276-350. Preserve script/action/data and intentional hiding. Honor the actual semantic key regardless of DOM IDs; provide a restart-button alias to reboot-button if accepting the documented spelling. Include omitted Homatics info/bookmark controls. Keep arbitrary unsafe frontend JavaScript templates outside modernization scope.
- Names/version/highlights: :193-197. Preserve visible text, top/bottom/hidden placement, explicit colors, version visibility and status decoration toggle. Test missing/unknown/unavailable state semantics and expose information accessibly.
- AL themes/frames/skins/D-pad: :198-203. Preserve use_theme_background, useCustomSkin, skin and precedence (custom skin currently wins). Frame and D-pad options effectively concern AL2; AL1 has no control group or D-pad, despite the README's broader wording. Correct scope without removing keys from old configurations.
- Chromecast media controls: :201, implemented :3740 and :5369. Retain show_media_controls across CC1/CC2/CC3, ensuring layout/editor accessibility and physical command behavior remain separate.
- Expert *_override fields come from deviceAttributeQuery :41, though most are not in the README table. Inventory existing use before strict unknown-key rejection; validate/alias documented legacy fields and preserve pass-through advanced YAML until a deliberate version boundary.

## Recommended implementation stages

1. Establish semantic fixtures and a reproducible build without simultaneously changing Lit, transport selection or layouts. Use allowJs/checkJs/JSDoc incrementally, with noEmit checks initially where useful. Capture expected calls for every command branch and each catalog family. Keep problematic behavior as a documented failing regression, rather than accidentally enshrining it as the desired contract.
2. Introduce narrow HA boundary types and config normalization, then type registry/resolvers/commands. Distinguish RawConfig, NormalizedConfig, DeviceCapabilities, AppLaunchStrategy, ScriptAction and ServiceAction; keep YAML service data as unknown validated at the boundary. Avoid a broad any-based wholesale rename. Do not import HA frontend source modules into the distributed bundle merely to obtain runtime helpers.
3. Repair P1 input/security/config defects with focused reproductions and browser fixtures. Central service execution and input state machines should be separate from artwork and platform selection. Preserve tap/hold mappings and legacy dispatch unless a repair is explicitly documented.
4. Upgrade the pinned Lit dependency in a separate step. Keep static reactive declarations plus declare-only TypeScript fields initially, with attribute:false for object inputs. Confirm hass/config changes still trigger updates and that no emitted fields shadow accessors. Avoid decorators during this transition unless their compiler/runtime semantics are deliberately selected.
5. Add optional modern transports, data-driven UI and current extension hooks only after determining supported HA/browser floors. Include both the oldest claimed HA version and current stable in tests. Keep manual/HACS installation and no-CDN operation. Retire legacy artifacts only after migration and rollback are exercised.

Compatibility promises: no silent loss of valid v4 YAML, designs, device/model/app IDs, script variables, service targets/data, custom launchers, none mode or event/strong modes; no automatic transport migration for existing cards; aliases for renamed IDs/documented spelling; full editor round-trip preservation; explicit opt-in/version boundary for changed defaults; one loaded firemote-card resource; deterministic artifacts and a last-known-good rollback; clearly stated unverified device status.

## Primary documentation checked

- [HA custom-card API and Sections sizing](https://contributors.home-assistant.io/frontend/custom-ui/card/): — getGridOptions is current, rows/columns keys replace the old draft API, hass updates are frequent.
- [HA editor contracts](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/): — getConfigElement/config-changed remain documented; getConfigForm is a documented schema-driven option for current HA. Gate newer hooks by the chosen support range.
- [HA extension boundary](https://contributors.home-assistant.io/frontend/custom-ui/): — bundle one's own library; no generally stable public ha-* component library. Do not derive a Lit base class from HA's private internals.
- [HA hass reference](https://contributors.home-assistant.io/frontend/reference/hass-object/): — effective user language, registries, promises and separate service target argument; callService defaults to notifyOnError true.
- [Current official frontend types](https://raw.githubusercontent.com/home-assistant/frontend/dev/src/data/entity/entity_registry.ts): — display-entry platform is optional; device_id can assist pairing. This is a moving development snapshot, not a pinned compatibility promise.
- [Android TV Remote](https://www.home-assistant.io/integrations/androidtv_remote/): — current text and directional press/release prefixes, activity launch, Fire TV exception, package-launch Google Play limitation, and no reliable playback-state reporting. Gate new features; native remote state is not interchangeable with a media-player playback state.
- [ADB integration](https://www.home-assistant.io/integrations/androidtv/): and stable source https://raw.githubusercontent.com/home-assistant/core/2026.10.2/homeassistant/components/androidtv/media_player.py — shell-command route, app source IDs, learn_sendevent and app/device-dependent state detection.
- [Roku stable source](https://raw.githubusercontent.com/home-assistant/core/2026.10.2/homeassistant/components/roku/remote.py): — num_repeats loop with remote calls, no hold_secs/delay_secs implementation. Preserve suitable bounded client repeats until an integration version with another contract is verified.
- [Apple TV](https://www.home-assistant.io/integrations/apple_tv/): — source/deep-link and keyboard actions, model-specific commands and IR/CEC constraints. Stable source https://raw.githubusercontent.com/home-assistant/core/2026.10.2/homeassistant/components/apple_tv/media_player.py implements feature-dependent pyatv power calls and resolves select_source from the actual app list. Do not rely on the conflicting FAQ power wording alone.
- [Lit upgrade](https://lit.dev/docs/releases/upgrade/): — Lit 2/3 interoperability, ES2021 publishing and TypeScript/decorator constraints. https://lit.dev/docs/components/properties/#avoiding-issues-with-class-fields-when-declaring-properties documents the reactive-field shadowing issue.
- [Lit unsafeHTML](https://lit.dev/docs/templates/directives/#unsafehtml): — input must remain developer-controlled; regular template bindings provide the correct trust boundary.
- [Incremental JS type checking](https://www.typescriptlang.org/tsconfig/checkJs.html): — checkJs works with allowJs.
- [Companion haptics](https://companion.home-assistant.io/docs/integrations/haptics/): — light is interaction feedback, success is a separate haptic type.
- [Accessibility](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html): ; https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html ; https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html .
- [HACS packaging](https://www.hacs.xyz/docs/publish/plugin/): — distribute installable files rather than source requiring an end-user build; test the actual fork filename/resource tree rather than assuming renamed-fork registration or nested sidecars.
- [GitHub action pinning/permissions](https://docs.github.com/en/actions/reference/security/secure-use): .

## Remaining hardware/browser verification

This audit cannot certify all devices marked supported. Test current/oldest supported HA and Chromium/Firefox/Safari plus actual iOS Companion and Android WebView. Cover Fire TV with/default/strong/custom events (including devices without a sendevent path), Android native-only, mixed native+ADB and ADB-only, Apple generations/source-language mismatch/keyboard focus, Roku TVs and players with actual repeat behavior, CEC/IR limits, firmware changes, app regional/package differences, offline/reconnect, multiple remotes/editors and navigation during an active hold. Browser fixtures must prove real Lit reactivity, focus, CSS/layout, injection safety, dialog behavior and touch cancellation; VM mocks alone do not.

All five shipped JavaScript modules passed node --check with module input. No Home Assistant instance, physical hardware, live service call, package installation, workflow dispatch, push, PR, issue/comment/reaction or upstream write was used for this review.
