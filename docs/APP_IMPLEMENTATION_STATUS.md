# App catalog implementation status

Reviewed on 22 October 2026 against the audit snapshot at `b856a45e684775fd477dbcd8d1342ff65bb97e38`. Implementation belongs to `Narehood/HomeAssistant-TV-Remote`; all upstream issue links are read-only evidence.

The catalog retains all **385 original YAML IDs** and contains **487 identities**. The 102 additional identities comprise 94 choices with executable candidate metadata and eight entries held as evidence blockers without advertised device support. These counts include explicit legacy package variants and a display-mirroring function; they are not counts of independently tested apps. Supplemental data contains 149 patches and 174 platform records, including changes to existing presets. Existing SVG artwork remains in `src/launcher-buttons.js`; new and rebranded choices use escaped typographic labels or initials.

**No hardware or Home Assistant service launch was performed for this catalog work.** A complete family record means its static launch data resolves and passes the schema checks. All new launch records carry `verification: 'requires-device-validation'`. Unchanged data carries `historical-catalog`. Every manifest entry has `hardwareVerifiedOn: null`, including entries whose issue threads contain reported successes.

The entire catalog is imported at build time and bundled into the existing HACS installation artifact by the parent build. Users install the card in Home Assistant through HACS; this catalog introduces no separate service, package installation, runtime JSON request, or Node requirement for Home Assistant users. `custom:firemote-card` and the `dist/HA-Firemote.js` installation filename remain integration requirements. Distribution generation and HACS verification are owned by the parent task.

## Issue coverage

[APP_IMPLEMENTATION_STATUS.json](APP_IMPLEMENTATION_STATUS.json) contains **543 unique issue records**: 529 app requests and 14 transport, localization, system-function, or UI context requests. It includes every one of the **145 open app requests**, including all **131 labeled requests**, recovered empty titles, unlabeled reports, and all 384 closed app requests. Each row retains its upstream URL, normalized catalog IDs, per-family disposition, evidence identifiers, source/store links, comment URLs, original audit finding, acceptance profiles, and unperformed hardware-verification state. Duplicate issues point to one identity; platform or regional alternatives are identified explicitly rather than treated as missing duplicates.

The 145 open app requests currently have these static implementation dispositions:

| Disposition | Requests | Meaning |
| --- | ---: | --- |
| Candidate metadata implemented | 119 | Supported by package, source, channel, or reported working-command evidence; device verification remains required. |
| Branding updated | 1 | MEO display branding changed with its legacy ID and launch data preserved. |
| Existing preset preserved | 4 | TV 2 Play Denmark, Sting+, Channels DVR, and Legacy Tablo already cover the requested family. |
| Investigation required | 14 | Cross-app integration failures, unresolved installed-build behavior, or a missing actual app identity prevent claiming a device repair. Safe metadata improvements may still be present. |
| Partially implemented | 4 | At least one requested family has candidate metadata and another still lacks evidence. |
| Identifier blocked | 3 | TV Launcher, OPUS IPTV, and Legion Anime Full lack a verified source or usable launch route. |

Closed unresolved requests are included in the same ledger. This includes OQEE Freebox Pop, StbEmu Pro, TinyCam Pro on Fire, the observed NinjaBox build, NOW UK on Shield, Direktesport, Norwegian TV 2 Play, display mirroring, Eurosport Player, and the closed SmartTube package regression. The antenna-channel request is recorded as the existing runtime `tuner_input` feature rather than a fictional native app preset.

## Runtime and editor contract

`src/launcher-buttons.js` continues exporting `launcherData` and `launcherCSS` and additionally exports `catalogManifest`. Its supplemental merge preserves the legacy root and per-family shape, including `button`, `button-round`, `friendlyName`, `className`, `deviceFamily`, `appName`, `androidName`, `adbLaunchCommand`, `remoteCommand`, and Roku `app-id` fields. All original IDs remain addressable.

`src/catalog/index.ts` exports:

- `resolvePlatformLaunch(entry, family)`: selects the **whole family record** when it contains `adbLaunchCommand`, `appName`, `remoteCommand`, an explicit `launchStrategy`, or `deepLink`; otherwise selects the root record. It never fills missing fields from another launch record. This preserves the original dispatcher behavior and prevents the root Fire-specific Twitch command from leaking into a Chromecast source launch.
- `resolveCatalogSource(launch, installedSources)`: returns an exact installed match among `appName` and `sourceAliases`, in that order; returns `undefined` when no known source is installed. UI language is not a substitute for the target device's source list.
- `recommendedCatalogEntries(manifest, family)`: includes only active entries with complete metadata for the selected family. Configured legacy entries must remain visible/addressable in the editor, labeled as legacy, even though new recommendations omit them.
- `resolveCatalogId(manifest, idOrAlias)`: resolves stable aliases such as `mycanal-fr` to the preserved `myCanal` key. Regional or generation variants are separate IDs.
- `augmentLauncherData`, `createCatalogManifest`, `isCompleteLaunch`, `validateCatalogManifest` (also exported as `validateManifest`), and escaped-label helpers for structural checks and tests. `legacy-ids.ts` is the compatibility fixture for the original 385 IDs.

Optional launch fields are `launchStrategy`, `sourceAliases`, `deepLink`, `verification`, and `evidence`. The supported strategies are:

| `launchStrategy` | Runtime meaning |
| --- | --- |
| `package` | Launch the exact `androidName` package through the selected integration. Legacy ADB mode uses `media_player.select_source` with that package. Do not resurrect an old root `adbLaunchCommand`. |
| `source` | Resolve exact installed source aliases, then select the device source. Preserve Roku channel metadata for adapters that support launching by channel ID. |
| `command` | Use the explicit family ADB command. The BBC Chromecast wrapper and Fire display mirroring have specific source evidence; a foreground activity alone is not sufficient. |
| `remote-command` | Preserve the existing Apple TV/Roku remote-command payload. |
| `deep-link` | Use the family `deepLink` with the integration's documented launch action. No suggested, unconfirmed Discovery+ website URL has been populated as an app deep link. |

For entries without `launchStrategy`, preserve the existing remote-command/ADB/source selection behavior. The optional top-level `lifecycle` values are exactly `active` and `legacy`; absence on original launcher records means active. Manifest entries always contain an explicit lifecycle.

The runtime keeps **`control_mode: legacy` as its default**. **`control_mode: android-tv-remote` is opt-in**, uses the existing `android_tv_remote_entity`, and uses `entity` for the integration's media player. The parent runtime/editor implementation owns that selector, transport dispatch, configured legacy-entry display, and source-alias use. The catalog supplies metadata without changing the transport default.

## Evidence-based repairs and variants

SmartTube stable/beta use `org.smarttube.stable` and `org.smarttube.beta`; explicit `smart-tube-next-legacy` and `smart-tube-next-beta-legacy` choices retain the old packages. New package launches avoid manufacturing a cold-start activity from `BrowseActivity` or a player surface.

Swiftfin selects `Swiftfin tvOS` with its old `Jellyfin` source alias retained. My5's ID stays `my5`, with source `5` and channel 27424 on Roku and source `Channel 5` on Apple TV. UKTV's `uktv-play` retains channel 181173 and selects `U` on Roku; the Roku evidence is not used to invent a new tvOS source. French CANAL+ stays `myCanal`, distinct from the Solocoo Android CANAL+ product. German `Musik`/`Fotos` and French `Musique` are exact device-source aliases.

BBC Chromecast metadata uses the reported working `external.androidtv.psbwrapper.deeplinking.DeepLinkActivity`. NOW UK gains Chromecast and Shield package metadata while `now-tv-it` keeps its distinct Italian package. Plex, Twitch, Channel 4/All4, and Discovery+ receive package-level candidates where obsolete component paths were implicated. These changes do not assert that Sony integration failures, missing app installation, or Apple TV cross-app regressions have been repaired.

Distinct identities include French Free TV versus Israeli Free TV, MagentaTV's first Android generation, Emby's unified Android app versus its existing Android TV app, paid IP Cam Viewer versus Free, the installed Immich TV client versus ImmichFrame, VK and Rutube TV builds versus mobile-store packages, Smarters provider builds, Portuguese Vodafone TV, German O₂ TV, and Android IPTV versus the tvOS IPTV+ source `iptv`. Request 798 implements SOOP, as requested in its body, rather than its misleading Coupang title.

Primary lookups supplement the request evidence:

- Playlet channel **693751** comes from the project's [documented ECP launch endpoint](https://github.com/iBicha/playlet/blob/main/docs/README.md#in-case-of-a-softlock).
- Nuvio's separate `com.nuvio.tv` sideloaded and `com.nuvio.app` Play Store identities come from its [build configuration](https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/build.gradle.kts) and [Android manifest](https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/src/main/AndroidManifest.xml).
- Plezy's Google TV package comes from its [build configuration](https://raw.githubusercontent.com/edde746/plezy/main/android/app/build.gradle.kts) and [TV-launcher manifest](https://raw.githubusercontent.com/edde746/plezy/main/android/app/src/main/AndroidManifest.xml). Package launch avoids coupling to its changing activity aliases.
- NOW's [supported-device list](https://www.nowtv.com/help/article/what-set-top-boxes-streaming-devices-can-i-use-to-watch) includes Shield Android TV; its candidate package identity is linked independently to the Chromecast request evidence.
- The [Home Assistant Android Debug Bridge documentation](https://www.home-assistant.io/integrations/androidtv/#launching-and-stopping-apps) specifies package-level `select_source`. Apple TV's [integration implementation](https://raw.githubusercontent.com/home-assistant/core/dev/homeassistant/components/apple_tv/media_player.py) looks up source names in its installed app list; a store bundle ID alone does not establish a usable `select_source` value.

## Remaining exact blockers

| Request / identity | Remaining evidence or compatibility requirement |
| --- | --- |
| [TV Launcher, request 607](https://github.com/PRProd/HA-Firemote/issues/607) / `tvlauncher` | Apple's [lookup](https://itunes.apple.com/lookup?id=1622598042&country=gb) identifies `app.FootWare.LiveTV`, but the supplied tvOS source list omits this app. Obtain its installed source name or a supported deep link. |
| [OPUS, request 721](https://github.com/PRProd/HA-Firemote/issues/721) / `opus-iptv` | Apple's [lookup](https://itunes.apple.com/lookup?id=1592313576&country=de) identifies `com.handy.optus`; the installed tvOS source or a supported deep link is still absent. |
| [Legion Anime Full, request 733](https://github.com/PRProd/HA-Firemote/issues/733) / `legionanimefull` | No verified package or exported launcher. The official APK landing page could not be fetched during implementation. |
| [Vodafone Portugal, request 681](https://github.com/PRProd/HA-Firemote/issues/681) / `vodafone-tv-pt` | Android TV candidates use the observed TV package. Apple TV still needs its actual source/deep link; the mobile store package is not used on tvOS. |
| [ZITOTV2GO, request 754](https://github.com/PRProd/HA-Firemote/issues/754) / `zitotv2go` | Roku channel 578206 is implemented; the requested Fire package/source is absent. |
| [iMPlayer, request 803](https://github.com/PRProd/HA-Firemote/issues/803) / `implayer-tv` | Apple TV source is implemented and existing Chromecast metadata preserved. Roku needs a channel ID or actual installed source. |
| [Plezy, request 861](https://github.com/PRProd/HA-Firemote/issues/861) / `plezy` | Fire and Google TV candidates are present. Apple TV still needs its actual source or supported deep link. |
| [Pooya, request 634](https://github.com/PRProd/HA-Firemote/issues/634) / `pooya-tv` | The custom intent action alone does not identify an app. Obtain its package or a fully specified working custom action. |
| [DIRECTV set-top, request 170](https://github.com/PRProd/HA-Firemote/issues/170) / `directv-set-top` | `com.att.tv.openvideo` is reported, but no supported device family is selected. Resolve the actual adapter/device instead of assigning an arbitrary family or substituting DIRECTV Stream. |
| [Ninja, request 409](https://github.com/PRProd/HA-Firemote/issues/409) / `ninja`, `ninja-ninjabox` | The observed installed `com.ninja.ninjabox` build has its own package candidate. The downloadable APK was identified differently as `com.jlwockee.iMPlayer`; matching that build remains blocked. |
| [MYTVOnline3, request 318](https://github.com/PRProd/HA-Firemote/issues/318) and [MYTVOnline2, request 319](https://github.com/PRProd/HA-Firemote/issues/319) | Formuler-exclusive apps do not establish installation or hardware support on the requested Fire/Chromecast/Shield families. Foreground playback components are retained only as evidence. |
| [Tennis Channel content, request 306](https://github.com/PRProd/HA-Firemote/issues/306) / `tennis-channel` | The existing app preset is retained. A specific live-stream URI or supported content launch remains absent. |
| `pathe-thuis` Android families | Baseline advertises Chromecast, Shield, onn, and Xiaomi without launch data. Each remains explicitly incomplete and excluded from new recommendations. The actual Android TV package or supported deep link is still required; the Apple source is preserved. |

The open integration investigations are requests 538, 559, 634, 672, 689, 728, 736, 757, 778, 780, 814, 815, 823, and 836. The ledger preserves their full upstream URLs and specific findings. Direct Home Assistant action results, installed app lists, build identities, or transport diagnostics are still needed before declaring those device failures fixed. Play/GO PLAY and Joyn variants receive branding or separate candidate metadata while their launch investigations remain open.

## Legacy lifecycle and validation

`showtime` and `showtime-anytime` retain their original package/source/channel data and are marked legacy. The provider's [standalone-service notice](https://help.showtime.com/hc/en-us/articles/16694786598043-What-is-happening-to-the-SHOWTIME-streaming-service) and the [SHOWTIME Anytime provider notice](https://d15yx0mnc9teae.cloudfront.net/sites/default/files/2023-10/JIRA%20629%20NYC_SouthManhattan_NY%20.NET%20TEMPLATE.pdf) supply retirement evidence. There is no automatic Paramount+ substitution. The restored `eurosportplayer` package is also a legacy choice; [Eurosport's regional notice](https://help.eurosport.com/gb/Answer/Detail/000004679) does not imply worldwide retirement of the Eurosport brand or successful access to the old Player app.

Fire display mirroring has an explicit reported working command, but entering Miracast can disconnect ADB/network control. Its label and provenance call out the need for the physical remote to exit. Recovery was not validated.

`tests/catalog.test.ts` checks baseline ID preservation, every advertised family, explicit incompleteness, unique identities/aliases, source provenance, artwork presence, safe typographic markup, historical whole-record launch selection, known package and source repairs, distinct regional/client builds, duplicate-request consolidation, retirement, exact blockers, and all 543 ledger rows. It does not execute Home Assistant services or assert hardware success. The parent owns production bundling, distribution verification, and runtime interaction tests.

Validation at handoff: `npx vitest run tests/catalog.test.ts tests/catalog-runtime.test.ts` passes **18 tests**, including the parent's service-action resolution checks for every structurally complete family. `npx tsc --noEmit` and `npx eslint src/catalog tests/catalog.test.ts src/launcher-buttons.js` also pass. This is source/schema/service-payload validation, with no hardware launch claim.
