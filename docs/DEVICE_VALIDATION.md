# Device validation

## Hisense Roku TV — 22 October 2026

Device: Hisense 6Series-58, model G204X, US region. Roku OS 15.3.4, build 2303. The user authorized testing a reachable device. Network address, credentials, serial numbers, MAC addresses, and other device identifiers are excluded from this record.

The production `dist/HA-Firemote.js` artifact ran in isolated Chrome with the `roku-generic-hisense` preset. A restricted local test bridge translated the card's `remote.send_command` and `media_player.select_source` payloads into real Roku External Control Protocol requests. The bridge allowed navigation and two discovered installed apps only. It did not install apps, change accounts/settings, or send power/volume/purchase commands. The originally open app was restored and its foreground identity confirmed afterward.

This is **direct device validation through a test bridge**, rather than a Home Assistant instance or HACS installation test. The bridge follows the reviewed Home Assistant Roku [remote command](https://github.com/home-assistant/core/blob/2026.10.2/homeassistant/components/roku/remote.py) and [source-selection](https://github.com/home-assistant/core/blob/2026.10.2/homeassistant/components/roku/media_player.py) paths for its permitted subset. It does not replace the complete integration, its authentication, entity discovery, polling/coordinator behavior, resource management, or frontend lifecycle. Roku documents the underlying [External Control Protocol](https://developer.roku.com/docs/developer-program/dev-tools/external-control-api.md).

| Check | Observed result | Limit |
| --- | --- | --- |
| Pointer Home / Up / Down / Back | Card emitted the intended payloads; device accepted the ECP commands. | No visual TV-screen or focus-location assertion. |
| Keyboard Enter on Home | One Home action reached the device. | Other assistive technologies were not exercised on hardware. |
| Held Up, then pointer cancellation | Repeated Up requests reached the device; no further requests followed cancellation during the observation interval. | Does not certify every network-failure or firmware path. |
| YouTube, channel 837, app 2.26.95 | Card selected the discovered source, device reported the app in the foreground, card highlighted its button from returned state. | Playback, sign-in, content access, and Home Assistant polling not tested. |
| ZITOTV2GO, channel 578206, app 2.6.73 | New catalog choice selected the discovered source, device reported the expected channel in the foreground, card highlighted its button. | Fire TV metadata remains incomplete; this is not cross-platform or Home Assistant certification. |
| Restore previous app | Original foreground app identity restored after the test. | App-internal navigation/playback position is not preserved by relaunching. |

The default `npm run check` and `npm run test:browser` remain simulated and perform no device actions. To reproduce the optional live check on an authorized Hisense Roku TV with permissive ECP network control:

```sh
npm run test:roku -- --host <Roku-IP-or-hostname>
```

The command changes the foreground app, sends navigation, and restores the previous app afterward. It does not require or use the Roku developer password. Only installed YouTube/ZITOTV2GO fixture apps are tested; absent apps are skipped and the JSON result lists exactly what ran. Results are saved to ignored `.test-results/roku-live.json`, with model/firmware and app versions but no network address or credentials. This live command is excluded from CI.

## Home Assistant instance

The user runs an automatically updated Home Assistant Docker container. No authenticated Home Assistant access was available, so the exact running Core/frontend/HACS versions, actual Roku entity IDs, resource registration, live service delivery, and dashboard behavior have not been read or verified. A clean HACS installation, upgrade/migration, rollback, and actions through the actual Home Assistant integration remain release gates. The direct-device results above must not be presented as those checks.

## Hosted validation

[Validation run 39820406313](https://github.com/Narehood/HomeAssistant-TV-Remote/actions/runs/39820406313) passed for commit `d01c9836484183ab93c3802a1a13851d61aabf72`: locked install, lint, type checks, 117 tests, build/artifact/checksum checks, Linux Chromium artifact checks, and HACS repository metadata validation. HACS metadata validation does not install the card into a Home Assistant instance.
