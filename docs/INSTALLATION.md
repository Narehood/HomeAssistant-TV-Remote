# Install Home Assistant TV Remote

Install this independently maintained Firemote fork through **HACS as a custom Dashboard repository**. It retains `custom:firemote-card`, the `HA-Firemote.js` resource filename, and existing valid card YAML. If you already use the original Firemote card, [migrate it first](#migrate-from-the-original-firemote-card).

## Before installing

You need Home Assistant, [HACS](https://www.hacs.dev/docs/use/), and a working integration for your TV or media player. First verify that the integration can control the device from Home Assistant. The card adds dashboard controls; it cannot supply commands or hardware capabilities missing from the integration.

No minimum Home Assistant version has yet been established by compatibility testing for this fork. A listed device preset describes a configuration, rather than a hardware validation result. Record your Home Assistant, integration, device, and firmware versions when reporting behavior.

## Install through HACS

1. Open **HACS** in Home Assistant. Open its three-dot menu and choose **Custom repositories**.
2. Add `https://github.com/Narehood/HomeAssistant-TV-Remote` and select **Dashboard**. Older HACS versions may call this **Lovelace** or **Plugin**; the HACS backend category is `plugin`.
3. Search for **Home Assistant TV Remote (Firemote fork)** and verify that the repository is **Narehood/HomeAssistant-TV-Remote**. Download the desired published version. For beta releases, enable prerelease versions in the repository's HACS download options if needed. If the fork has no published release, HACS may offer the default branch instead; that is development code.
4. Reload the frontend when prompted. In **Settings → Dashboards → Resources** (enable Advanced mode in your profile if needed), check that HACS registered one resource for this card as a **JavaScript module**. If resources are managed in YAML, check the corresponding `lovelace.resources` entry instead.
5. Use the exact URL supplied by HACS. It will normally resemble `/hacsfiles/HomeAssistant-TV-Remote/HA-Firemote.js`; the folder can vary with HACS versions and migration history. Avoid adding a second resource when one already exists.
6. Edit a dashboard, select **Add card**, and search for **Home Assistant TV Remote**. Existing installations may retain the **Firemote Card** label until the frontend reloads. Configure the device as described below, or use a Manual card with `type: custom:firemote-card`.

HACS downloads the ready-to-use card. You do not need Node.js or a local build on your Home Assistant server. The custom repository procedure follows the [HACS documentation](https://www.hacs.dev/docs/faq/custom_repositories/); HACS calls frontend cards [Dashboard repositories](https://www.hacs.dev/docs/publish/plugin/).

## Migrate from the original Firemote card

Both projects register the same `firemote-card` custom element. Loading both resources can prevent either card from working.

1. Back up your dashboard/card YAML and record the original resource URL and installed version.
2. Remove the original Firemote installation from HACS so that future updates cannot restore its resource. If installed manually, remove its dashboard resource registration. Remove any remaining original resource entries from both UI-managed and YAML-managed resources, including old `/local/` URLs. A cache query string does not make two copies safe to load together.
3. Install this fork through the custom repository steps above. Keep exactly one `HA-Firemote.js` resource, pointing to the fork.
4. Fully reload Home Assistant in every browser and companion app that will use the card. If needed, close and reopen the frontend or clear its cached frontend files.
5. Restore or retain your existing card YAML unchanged. The card type stays `custom:firemote-card`; existing transport behavior defaults to `control_mode: legacy`. Confirm controls and launchers on your own devices.

To roll back, remove the fork resource before restoring the original installation and saved YAML. Never load both versions together.

## Device families

Choose the exact family and model from the card editor. The inherited registry includes Amazon Fire, Apple TV, Chromecast, Homatics, NVIDIA Shield, onn., Roku, Xiaomi, and None / Other. A similar physical remote does not guarantee matching device commands. Use the preset for your device when available and report missing models with their actual firmware and observed commands.

| Family | Typical entity setup | Example model ID |
| --- | --- | --- |
| Amazon Fire | Android Debug Bridge media player | `fire_tv_4_series` |
| Apple TV | Apple TV media player and matching remote | `appletv-4k-gen2` |
| Chromecast | Android Debug Bridge media player; optional matching Android TV Remote | `chromecast-4k` |
| Homatics | Android Debug Bridge media player; optional matching Android TV Remote | `box-4-4k-plus` |
| NVIDIA Shield | Android Debug Bridge media player; optional matching Android TV Remote | `shield-tv-pro-2019` |
| onn. | Android Debug Bridge media player; optional matching Android TV Remote | `onn-4k-streaming-box` |
| Roku | Roku media player and matching remote | `roku-ultra-2020` |
| Xiaomi | Android Debug Bridge media player; optional matching Android TV Remote | `mi-box-s` |
| None / Other | User-defined actions | `other` |

### Amazon Fire and Android TV in legacy mode

The default `control_mode: legacy` preserves existing ADB-based setups. Enable ADB/network debugging on the device, set up the Home Assistant [Android Debug Bridge integration](https://www.home-assistant.io/integrations/androidtv/), and accept any authorization prompt on the TV. On NVIDIA Shield, enable **Network debugging**. Select that integration's `media_player` entity as `entity`.

For compatible non-Fire Android TV devices, you can also pair the [Android TV Remote integration](https://www.home-assistant.io/integrations/androidtv_remote/) and set `android_tv_remote_entity` to its matching remote. Both entities must address the same device. Legacy app launching still uses the existing ADB path. Fire TV devices do not support the Android TV Remote integration.

```yaml
type: custom:firemote-card
entity: media_player.fire_tv
device_family: amazon-fire
device_type: fire_tv_4_series
control_mode: legacy
compatibility_mode: default
app_launch_1: netflix
```

### Opt in to Android TV Remote

For a device supported by the Android TV Remote integration, choose **Android TV Remote** in the editor's control mode selector or set `control_mode: android-tv-remote` in YAML. Set `entity` to the **media player created by Android TV Remote**, and `android_tv_remote_entity` to the remote from the same integration/device. ADB is not required for this mode's supported actions. Keep a valid device family and model to choose the remote design.

```yaml
type: custom:firemote-card
entity: media_player.living_room_google_tv
android_tv_remote_entity: remote.living_room_google_tv
device_family: chromecast
device_type: chromecast-4k
control_mode: android-tv-remote
```

Choose this mode deliberately; an existing configuration is not switched automatically. Available controls, keyboard input, and app launches depend on the integration and device. Some apps need a supported deep link; package identifiers alone do not work universally. Use a custom launcher or action override for a device-specific action when needed. Device behavior requires verification in Home Assistant.

### Apple TV and Roku

Pair the [Apple TV](https://www.home-assistant.io/integrations/apple_tv/) or [Roku](https://www.home-assistant.io/integrations/roku/) integration. Select its media player as `entity`, then select the matching remote as `apple_tv_remote_entity` or `roku_remote_entity`. Do not select a remote belonging to another device. ADB debugging is not needed.

Select app names that the media player's `source_list` actually exposes. Localized names, regions, firmware, and installed apps can change that list. The [README examples and configuration reference](../README.md#yaml-card-setup-options) show the retained YAML keys.

### None / Other

Use this mode to combine the remote designs with scripts, IR blasters, or other Home Assistant actions. It does not discover commands for an unsupported device. Assign each required control using [button overrides](../README.md#button-overrides) and [custom launchers](../README.md#launcher-button-customizations).

```yaml
type: custom:firemote-card
entity: none
device_family: none
device_type: other
defaultRemoteStyle_override: AL2
button_overrides:
  power-button:
    action: script.turn_on
    target:
      entity_id: script.tv_power
```

## App launchers

Use the editor's app selector for available presets or [define a custom launcher](../README.md#launcher-button-customizations). Availability varies by platform and region. Existing YAML identifiers remain usable even when an app has been retired or renamed. A configured retired entry should remain visible for editing; it is labelled as legacy or excluded from new recommendations. A catalog entry alone does not prove that an app still launches on your device.

## Troubleshooting

### Card missing or old version still visible

Check HACS's installed version and the resource URL, confirm the resource type is JavaScript module, and open that resource URL to check that it downloads JavaScript rather than an error page. Keep only one Firemote resource. Hard-refresh the browser; in a companion app, use its frontend cache reset option if available, then reopen the app. Changing card YAML does not reload an already registered JavaScript custom element. Capture browser-console errors if the problem persists.

### Buttons do nothing

Test the corresponding integration action directly in **Developer tools → Actions**. Check entity availability, ADB authorization if used, family/model selection, and whether the associated remote belongs to the same device. On Fire TV after an update or restart, pressing a physical remote button may help re-establish device input.

Start legacy ADB configurations with `compatibility_mode: default`. If integration commands work but input events do not, collect the device input information below before selecting a different event mode. The correct `/dev/input/eventN` is device-dependent and can change; there is no guarantee that cycling through event numbers will find a working configuration. `strong` and `event0` through `event13` are legacy options, not Android TV Remote settings.

### Volume, mute, or power fails

Physical remotes often send infrared commands directly to a TV or receiver. The card cannot transmit that IR signal by itself. HDMI-CEC may provide some controls if both devices and the integration support them; enable CEC on the TV/player and test the action in Home Assistant. Otherwise assign a [button override](../README.md#button-overrides) to a working TV, receiver, or IR-blaster action. Apple TV mute behavior in particular depends on the available integration/device capabilities; configure an override when no supported mute action exists.

### App button launches the wrong app or does nothing

Confirm the app is installed in the relevant device/region and can be opened through the integration. Compare Apple TV/Roku source names with the media player's current `source_list`. For Android TV Remote mode, check whether the app requires a deep link rather than a package ID. Include the exact app name, region, observed identifier, and errors in a [fork app request](https://github.com/Narehood/HomeAssistant-TV-Remote/issues/new?template=App_Shortcut_Request.yaml).

## Collect device information

For any report, include the card/Home Assistant versions, device model/firmware, integration and entity pairing, `control_mode`, minimal card YAML, steps, expected result, actual result, and relevant errors. Remove credentials and personal information.

For an Android/Fire app request with ADB available, open the app, then run `dumpsys window windows` using **Developer tools → Actions → Android Debug Bridge: ADB command** against the device's media player. Read its `adb_response` under **Developer tools → States** and include the focused app's package/activity. On a computer with ADB, the equivalent is `adb shell dumpsys window windows`.

For Apple TV, copy the media player's `source_list`. For Roku, open the app and copy `app_id`, `app_name`, `source`, and the relevant `source_list` entry. Include store URL, country/region, and app version for all platforms.

For an Android device support request, run `dumpsys input` through the ADB action (or `adb shell dumpsys input` from a computer) and copy the relevant input devices and paths from `adb_response`. State which compatibility modes and controls you actually tried; if none work, say so.

## Manual installation

HACS is the recommended installation method. For a manual installation, download **HA-Firemote.js** from a [published fork release](https://github.com/Narehood/HomeAssistant-TV-Remote/releases), along with `LICENSE`, `CREDITS.md`, and `THIRD_PARTY_NOTICES.md`. Verify the download against the release's `SHA256SUMS` if supplied. Place the bundle and notices in `/config/www/HomeAssistant-TV-Remote/` and register `/local/HomeAssistant-TV-Remote/HA-Firemote.js` as a JavaScript module resource. The modern bundle is self-contained; there is no need to install npm packages or copy its source modules.

For YAML-managed resources:

```yaml
lovelace:
  resources:
    - url: /local/HomeAssistant-TV-Remote/HA-Firemote.js
      type: module
```

Use either UI-managed or YAML-managed resources as appropriate for your dashboard. Remove any earlier HACS or manual resource before switching methods. Home Assistant documents [resource registration](https://developers.home-assistant.io/docs/frontend/custom-ui/registering-resources/).

The physical remote designs and essential setup guidance originate in PRProd's Firemote; see [credits and historical source references](../CREDITS.md).
