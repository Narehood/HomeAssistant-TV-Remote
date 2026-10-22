# App catalog implementation status

Reviewed on 22 October 2026 against the audit snapshot at `b856a45e684775fd477dbcd8d1342ff65bb97e38`. Implementation belongs to `Narehood/HomeAssistant-TV-Remote`; all upstream issue links are read-only evidence.

The catalog retains all **385 original YAML IDs** and contains **436 identities** after the [provider review](PROVIDER_REVIEW.md). Every one of the 102 proposed additions was checked: **51 official TV/video-service identities are retained; 51 utilities, generic/personal-media players, unofficial clients or unverified identities are excluded**. Retained historical services can be legacy-only; identity review is separate from current availability and launch validation. Supplemental data contains 98 patches and 117 platform records, including repairs to inherited presets. New labels use escaped text artwork.

Five inherited VPN IDs, including NordVPN, remain usable in explicit YAML but are hidden from new launcher selections. AdGuard VPN and the other rejected new identities are absent from the shipped catalog. The machine-readable review records every exclusion and its sources; exclusions are not counted as implemented provider requests.

**The catalog-authoring handoff used source checks, without hardware or Home Assistant service execution.** A complete family record means its static launch data resolves and passes the schema checks. All new launch records carry `verification: 'requires-device-validation'`. Unchanged data carries `historical-catalog`. Every manifest entry has `hardwareVerifiedOn: null`, including entries whose issue threads contain reported successes.

That describes the catalog-authoring handoff. Later authorized direct-ECP checks on a Hisense Roku TV confirmed YouTube and ZITOTV2GO launches and card highlighting. Those limited results are recorded separately in [device validation](DEVICE_VALIDATION.md). They do not establish Home Assistant/HACS integration validation or change the metadata-handoff ledger's per-row verification fields.

The entire catalog is imported at build time and bundled into the existing HACS installation artifact by the build. Users install the card in Home Assistant through HACS; this catalog introduces no separate service, package installation, runtime JSON request, or Node requirement for Home Assistant users. `custom:firemote-card` and the `dist/HA-Firemote.js` installation filename remain integration requirements.

## Issue coverage

[APP_IMPLEMENTATION_STATUS.json](APP_IMPLEMENTATION_STATUS.json) contains **543 unique issue records**: 529 app requests and 14 transport, localization, system-function, or UI context requests. It includes every one of the **145 open app requests**, including all **131 labeled requests**, recovered empty titles, unlabeled reports, and all 384 closed app requests. Each row retains its upstream URL, normalized catalog IDs, per-family disposition, evidence identifiers, source/store links, comment URLs, original audit finding, acceptance profiles, and unperformed hardware-verification state. Duplicate issues point to one identity; platform or regional alternatives are identified explicitly rather than treated as missing duplicates.

The 145 open app requests currently have these static implementation dispositions:

| Disposition | Requests | Meaning |
| --- | ---: | --- |
| Candidate metadata implemented | 75 | Package, source, channel, or reported-command evidence exists; device verification remains required. |
| Excluded by provider policy | 47 | Newly proposed identity is outside the user-requested TV/video-provider scope or remains unverified. Evidence remains in the ledger. |
| Investigation required | 13 | Missing device/integration evidence prevents claiming a repair. |
| Existing preset preserved | 4 | Requested family already has inherited metadata. |
| Partially implemented | 3 | At least one family has candidate metadata and another lacks evidence. |
| Mixed provider-policy disposition | 2 | A request includes retained metadata and excluded identities. |
| Branding updated | 1 | MEO branding updated while preserving its YAML ID and launch data. |

All 384 closed app requests and 14 context requests remain in the ledger. The original audit findings and prior implementation dispositions are preserved when provider policy changes a row. The antenna-channel request remains the existing `tuner_input` runtime feature. No upstream issue or comment was modified.

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
| `command` | Use the explicit family ADB command. The BBC Chromecast wrapper has specific source evidence; a foreground activity alone is not sufficient. |
| `remote-command` | Preserve the existing Apple TV/Roku remote-command payload. |
| `deep-link` | Use the family `deepLink` with the integration's documented launch action. No suggested, unconfirmed Discovery+ website URL has been populated as an app deep link. |

For entries without `launchStrategy`, preserve the existing remote-command/ADB/source selection behavior. The optional top-level `lifecycle` values are exactly `active` and `legacy`; absence on original launcher records means active. Manifest entries always contain an explicit lifecycle.

The runtime keeps **`control_mode: legacy` as its default**. **`control_mode: android-tv-remote` is opt-in**, uses the existing `android_tv_remote_entity`, and uses `entity` for the integration's media player. The runtime/editor implements that selector, transport dispatch, configured legacy-entry display, and source-alias use. The catalog supplies metadata without changing the transport default.

## Evidence-based repairs and variants

Inherited SmartTube stable/beta IDs receive `org.smarttube.stable` and `org.smarttube.beta` package repairs for compatibility. The newly proposed old-package variants are excluded as unofficial clients. New package launches avoid manufacturing cold-start activities from a foreground player surface.

Swiftfin selects `Swiftfin tvOS` with its old `Jellyfin` source alias retained. My5's ID stays `my5`, with source `5` and channel 27424 on Roku and source `Channel 5` on Apple TV. UKTV's `uktv-play` retains channel 181173 and selects `U` on Roku; the Roku evidence is not used to invent a new tvOS source. French CANAL+ stays `myCanal`, distinct from the Solocoo Android CANAL+ product. German `Musik`/`Fotos` and French `Musique` are exact device-source aliases.

BBC Chromecast metadata uses the reported working `external.androidtv.psbwrapper.deeplinking.DeepLinkActivity`. NOW UK gains Chromecast and Shield package metadata while `now-tv-it` keeps its distinct Italian package. Plex, Twitch, Channel 4/All4, and Discovery+ receive package-level candidates where obsolete component paths were implicated. These changes do not assert that Sony integration failures, missing app installation, or Apple TV cross-app regressions have been repaired.

Retained provider variants include French versus Israeli Free TV, MagentaTV's first Android generation, official VK and Rutube TV apps, Portuguese Vodafone TV, German O2 TV and SOOP. Request 798's body requests SOOP despite its Coupang title. Plex Preview is an official Plex client supplying Plex programming. Generic IPTV/Plex clients, cameras, personal-media clients and mirroring functions from the proposed additions are excluded; see every decision in the [provider matrix](PROVIDER_REVIEW.md).

The [Home Assistant ADB documentation](https://www.home-assistant.io/integrations/androidtv/#launching-and-stopping-apps) specifies package-level `select_source`. Apple's integration resolves installed source names; a store bundle ID alone does not establish a usable source. NOW's [supported-device list](https://www.nowtv.com/help/article/what-set-top-boxes-streaming-devices-can-i-use-to-watch) includes Shield Android TV, but installed-build and integration behavior still need device evidence.

## Remaining exact blockers

| Request / identity | Remaining evidence or compatibility requirement |
| --- | --- |
| [Vodafone Portugal, request 681](https://github.com/PRProd/HA-Firemote/issues/681) / `vodafone-tv-pt` | Android TV candidates use the observed TV package. Apple TV still needs its actual source/deep link; the mobile store package is not used on tvOS. |
| [ZITOTV2GO, request 754](https://github.com/PRProd/HA-Firemote/issues/754) / `zitotv2go` | Roku channel 578206 is implemented; the requested Fire package/source is absent. |
| [iMPlayer, request 803](https://github.com/PRProd/HA-Firemote/issues/803) / `implayer-tv` | Apple TV source is implemented and existing Chromecast metadata preserved. Roku needs a channel ID or actual installed source. |
| [Tennis Channel content, request 306](https://github.com/PRProd/HA-Firemote/issues/306) / `tennis-channel` | The existing app preset is retained. A specific live-stream URI or supported content launch remains absent. |
| `pathe-thuis` Android families | Baseline advertises Chromecast, Shield, onn, and Xiaomi without launch data. Each remains explicitly incomplete and excluded from new recommendations. The actual Android TV package or supported deep link is still required; the Apple source is preserved. |

The open integration investigations are requests 538, 559, 672, 689, 728, 736, 757, 778, 780, 814, 815, 823, and 836. The ledger preserves their full upstream URLs and specific findings. Direct Home Assistant action results, installed app lists, build identities, or transport diagnostics are still needed before declaring those device failures fixed. Play/GO PLAY and Joyn variants receive branding or separate candidate metadata while their launch investigations remain open.

## Legacy lifecycle and validation

`showtime` and `showtime-anytime` retain their original package/source/channel data and are marked legacy. The provider's [standalone-service notice](https://help.showtime.com/hc/en-us/articles/16694786598043-What-is-happening-to-the-SHOWTIME-streaming-service) and the [SHOWTIME Anytime provider notice](https://d15yx0mnc9teae.cloudfront.net/sites/default/files/2023-10/JIRA%20629%20NYC_SouthManhattan_NY%20.NET%20TEMPLATE.pdf) supply retirement evidence. There is no automatic Paramount+ substitution. The restored `eurosportplayer` package is also a legacy choice; [Eurosport's regional notice](https://help.eurosport.com/gb/Answer/Detail/000004679) does not imply worldwide retirement of the Eurosport brand or successful access to the old Player app.

The old Beeline TV package is retained as legacy following the provider's announced migration to Popcorn Beeline. No new package is inferred. Five inherited VPN utilities are also legacy-only, preserving configured YAML without recommending them as TV providers.

Catalog tests validate baseline IDs, provider-review coverage, rejected additions, mandatory approvals, provenance orphans, source/region repairs, legacy choices and all 543 ledger rows. Runtime tests check explicit VPN compatibility and editor filtering. Catalog/runtime contract tests resolve every structurally complete family into a service payload. Browser validation loads the self-contained HACS artifact. These checks do not establish device launch or Home Assistant/HACS integration success; see [implementation validation](IMPLEMENTATION_STATUS.md) and [device evidence](DEVICE_VALIDATION.md).
