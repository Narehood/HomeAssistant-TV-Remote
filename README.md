# Home Assistant TV Remote

An independently maintained fork of **PRProd's Firemote**, the Home Assistant dashboard card with remotes designed to resemble your physical controls. Original author: **Doug Nelson ([PRProd](https://github.com/PRProd))** and the [original contributors](https://github.com/PRProd/HA-Firemote/graphs/contributors). See [credits](CREDITS.md) and the preserved [GPL license](LICENSE).

[![HACS Custom Repository](https://img.shields.io/badge/HACS-Custom_Repository-41BDF5.svg)](docs/INSTALLATION.md#install-through-hacs)
[![Fork releases](https://img.shields.io/github/v/release/Narehood/HomeAssistant-TV-Remote?include_prereleases)](https://github.com/Narehood/HomeAssistant-TV-Remote/releases)

## Install through HACS

1. In HACS, open the three-dot menu and choose **Custom repositories**.
2. Add `https://github.com/Narehood/HomeAssistant-TV-Remote`, select **Dashboard** (backend category `plugin`), and add it.
3. Download **Home Assistant TV Remote (Firemote fork)** from this repository and reload the frontend. Enable prereleases in HACS when selecting a beta.
4. Check that there is exactly one JavaScript module resource for `HA-Firemote.js`, using the URL provided by HACS. Add the card in your dashboard, or keep your existing YAML with `type: custom:firemote-card`.

**Migrating from the original Firemote?** Remove the original HACS installation and its resource registration before loading this fork. Both register the same custom element. Keep your existing card YAML; see the [migration steps](docs/INSTALLATION.md#migrate-from-the-original-firemote-card).

Read [installation, device setup, and troubleshooting](docs/INSTALLATION.md) for the full procedure. This fork uses HACS's custom-repository flow; it is not advertised as a HACS default repository. Users install the ready-to-use card without a local build.

## Configure your device

Set up a working Home Assistant integration, then choose its entity, device family, model, and remote style in the card editor. Existing configurations default to `control_mode: legacy`. Compatible Android TV Remote devices can explicitly opt in with `control_mode: android-tv-remote`; see [entity pairing and examples](docs/INSTALLATION.md#opt-in-to-android-tv-remote).

Inherited presets cover Amazon Fire, Apple TV, Chromecast, Homatics, NVIDIA Shield, onn., Roku, Xiaomi, and None / Other. Integration capabilities and firmware determine which controls work. Device presets and historical screenshots do not establish hardware validation for this fork. No minimum Home Assistant version has yet been established by compatibility testing.

Use the [YAML reference](#yaml-card-setup-options), [custom launchers](#launcher-button-customizations), and [button overrides](#button-overrides) below for advanced configuration.

The modernization is prepared as `5.0.0-beta.1`. See [implemented changes and validation limits](docs/IMPLEMENTATION_STATUS.md), [app request outcomes](docs/APP_IMPLEMENTATION_STATUS.md), and [bug status](docs/BUG_IMPLEMENTATION_STATUS.md). A launch preset is candidate metadata until verified on the relevant Home Assistant integration and device.

## Remote designs

These physical remote designs and screenshot references are carried forward from PRProd's Firemote. Image URLs retain their original provenance; see [CREDITS.md](CREDITS.md).

| ![JVC 4K Fire TV Remote](https://github.com/PRProd/HA-Firemote/assets/25486599/d4fac2c4-98ea-45c3-a423-fefb72712b15) | ![Fire TV Remote Style 6](https://github.com/PRProd/HA-Firemote/assets/25486599/fdd569fe-f996-4354-bcfb-187443d9c04b) | ![Fire TV Remote Style 5](https://github.com/PRProd/HA-Firemote/assets/25486599/ad71490b-ded1-457e-8737-86424a69c4a9) | ![Fire TV Remote Style 4](https://github.com/PRProd/HA-Firemote/assets/25486599/86d13dae-3292-4099-a2d9-fa9e24439aae) | ![Fire TV Remote Style 3](https://github.com/PRProd/HA-Firemote/assets/25486599/d2ebc221-8230-43d5-9ace-fb5a69973cc5) | ![Fire TV Remote Style 2](https://github.com/PRProd/HA-Firemote/assets/25486599/03953bf3-e295-4692-8b63-be85658037be) | ![Fire TV Remote Style 1](https://github.com/PRProd/HA-Firemote/assets/25486599/4421a30c-f548-44cd-9f00-443529f6ba49) |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |

| ![Apple TV Remote Style 3](https://github.com/PRProd/HA-Firemote/assets/25486599/af60a8e5-5278-4854-8a3d-622e63e44257) | ![Apple TV Remote Style 2](https://github.com/PRProd/HA-Firemote/assets/25486599/f2913052-62da-43f1-b644-f42efad2cf7a) | ![Apple TV Remote Style 1](https://github.com/PRProd/HA-Firemote/assets/25486599/1b0323af-22d6-42c2-9752-ff8e42a08865) | ![NVIDIA Shield Remote 2](https://github.com/PRProd/HA-Firemote/assets/25486599/6138bef5-5714-4c65-a7c6-e35118c696ca) | ![NVIDIA Shield Remote 1](https://github.com/PRProd/HA-Firemote/assets/25486599/f8c65045-f2e3-4bca-b7f3-f4b11bbd59bc) |
| ------------- | ------------- | ------------- | ------------- | ------------- |

| ![Chromecast Remote](https://github.com/PRProd/HA-Firemote/assets/25486599/36a14224-b46f-4d4c-97ec-b1217e99b272) | ![Xiaomi Mi Remote 2](https://github.com/PRProd/HA-Firemote/assets/25486599/b4c89e40-e80c-4909-9e42-8d77e4e551d2) | ![onn 2](https://github.com/PRProd/HA-Firemote/assets/25486599/eeaf1ffd-0ada-4fa3-b8d3-ae11d6314bff) | ![onn](https://github.com/PRProd/HA-Firemote/assets/25486599/fd2c13a2-d5a6-4173-b324-68bf67c8545d) |
| ------------- | ------------- | ------------- | ------------- |

| ![Homatics Remote HO1](https://github.com/user-attachments/assets/73b09836-2cf9-4747-974b-e8ed5f288e91) | ![Homatics Remote HO2](https://github.com/user-attachments/assets/67efb80a-22b9-4b40-a87f-984c1e4da084) | ![Homatics Remote HO3](https://github.com/user-attachments/assets/c48b125c-2d35-4887-97c6-c8c29d8d974d) | ![Homatics Remote HO4](https://github.com/user-attachments/assets/5a29c1e4-0cad-4bd9-a859-b6328cd48159) |
| ------------- | ------------- | ------------- | ------------- |

| ![Roku Voice Remote Pro](https://github.com/PRProd/HA-Firemote/assets/25486599/cfa82897-1a9c-4361-b9ce-59219fd94ca6) | ![Roku Voice Remote](https://github.com/PRProd/HA-Firemote/assets/25486599/0035d56c-59a7-4c81-8cd4-9cd1a1d10d14) | ![Roku Simple Remote](https://github.com/PRProd/HA-Firemote/assets/25486599/3f0b2def-9ef7-4af5-ab55-d7bda0a195b3) | ![Hisense Roku TV Remote](https://github.com/PRProd/HA-Firemote/assets/25486599/c9e526e2-9acf-4406-ae2d-1a1e8231ef2b) | ![TCL Roku TV Remote](https://github.com/PRProd/HA-Firemote/assets/25486599/1a33a82f-7abc-414a-ac96-1dc63dc73c62) | ![Westinghouse Roku TV Remote](https://github.com/PRProd/HA-Firemote/assets/25486599/4c8748dc-1881-4e33-9d55-d594143ddfeb) |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |

| ![App Launcher 1](https://github.com/PRProd/HA-Firemote/assets/25486599/63cda718-9eed-4259-8071-b272e3091f1d) | ![App Launcher 2](https://github.com/PRProd/HA-Firemote/assets/25486599/9531fd5f-9003-41f1-bc05-a6d3962e346b) |
| ------------- | ------------- |

## YAML card setup options
Examples:
```yaml
type: custom:firemote-card
entity: media_player.fire_tv_192_168_1_30
device_family: amazon-fire
device_type: fire_tv_4_series
compatibility_mode: default
app_launch_1: prime-video
app_launch_2: netflix
app_launch_3: hdmi_1
app_launch_4: youtube
hdmi_1: Cable
scale: 85
```
```yaml
type: custom:firemote-card
entity: media_player.apple_tv_4k_2nd_gen
device_family: apple-tv
device_type: appletv-4k-gen2
compatibility_mode: default
apple_tv_remote_entity: remote.apple_tv_4k_2nd_gen
app_launch_1: apple-appstore
app_launch_2: apple-tv-arcade
app_launch_3: mlb
app_launch_4: nfl
visible_name_text: Game Room
name_position: top
button_overrides:
  mute-button:
    script: receiver_mute_script
```
```yaml
type: custom:firemote-card
entity: media_player.android_tv_192_168_107_209
device_family: nvidia-shield
device_type: shield-tv-pro-2019
compatibility_mode: default
android_tv_remote_entity: remote.shield
scale: '100'
app_launch_1: netflix
app_launch_2: function-find-my-remote
app_launch_3: function-mute
```

Options:
| Name                   | Type   | Required | Options                                                          | Description                            |
| ---------------------- | ------ | -------- | ---------------------------------------------------------------- | -------------------------------------- |
| type                   | string | yes      | custom:firemote-card                                             | Type of the card                       |
| entity                 | string | yes      | any valid media player entity created in the [Android Debug Bridge Integration](https://www.home-assistant.io/integrations/androidtv/), [Apple TV Integration](https://www.home-assistant.io/integrations/apple_tv) or the [Roku Integration](https://www.home-assistant.io/integrations/roku), the Android TV Remote media player in opt-in mode, or [none](docs/INSTALLATION.md#none--other)| entity_id                              |
| control_mode | string | no | legacy (default)<br>android-tv-remote | Preserve existing transport or opt in to [Android TV Remote](docs/INSTALLATION.md#opt-in-to-android-tv-remote) |
| device_family          | string | yes      | amazon-fire<br>apple-tv<br>chromecast<br>nvidia-shield<br>homatics<br>onn<br>roku<br>xiaomi<br>[none](docs/INSTALLATION.md#none--other) | Manufacturer Family            |
|android_tv_remote_entity| string | no       | any valid entity created in the [Android TV Remote Integration](https://www.home-assistant.io/integrations/androidtv_remote/) | Matching remote entity_id; required in android-tv-remote mode. Ignored in Apple TV and Roku configurations |
| apple_tv_remote_entity | string | yes*     | any valid remote entity created in the [Apple TV Integration](https://www.home-assistant.io/integrations/apple_tv)  | entity_id<br>* Required ONLY in Apple TV configurations |
| roku_remote_entity     | string | yes*     | any valid remote entity created in the [Roku Integration](https://www.home-assistant.io/integrations/roku/)  | entity_id<br>* Required ONLY in Roku configurations |
| device_type            | string | yes      | [appletv-4k-gen3](https://support.apple.com/kb/SP886)<br>[appletv-4k-gen2](https://support.apple.com/kb/SP845)<br>[appletv-4k-gen1](https://support.apple.com/kb/SP769)<br>[appletv-gen4](https://support.apple.com/kb/SP724)<br>[appletv-gen3](https://support.apple.com/kb/SP648)<br>[appletv-gen2](https://support.apple.com/kb/SP598)<br>[appletv-gen1](https://support.apple.com/kb/SP19)<br>chromecast-4k<br>[fire_tv_toshiba_v35](docs/INSTALLATION.md#device-families) <br> [fire_tv_4_series](docs/INSTALLATION.md#device-families) <br> fire_tv_jvc-4k-2021 <br> fire_tv_insignia_f20 <br> [fire_tv_cube_third_gen](docs/INSTALLATION.md#device-families) <br> [fire_tv_cube_second_gen](docs/INSTALLATION.md#device-families) <br> [fire_tv_cube_first_gen](docs/INSTALLATION.md#device-families) <br> [fire_tv_stick_4k_max_second_gen](docs/INSTALLATION.md#device-families) <br> [fire_tv_stick_4k_second_gen](docs/INSTALLATION.md#device-families) <br>[fire_tv_stick_4k_max](docs/INSTALLATION.md#device-families) <br> [fire_tv_3rd_gen](docs/INSTALLATION.md#device-families) <br> [fire_tv_stick_lite](docs/INSTALLATION.md#device-families) <br> [fire_stick_4k](docs/INSTALLATION.md#device-families) <br> [fire_stick_second_gen](docs/INSTALLATION.md#device-families) <br> [fire_stick_first_gen](docs/INSTALLATION.md#device-families) <br> [fire_tv_second_gen_2015](docs/INSTALLATION.md#device-families) <br> [box-4-4k-plus](docs/INSTALLATION.md#device-families) <br> dune-hd-box-4-4k-plus <br>  onn-streaming-device-4k-pro <br> [onn-4k-streaming-box](docs/INSTALLATION.md#device-families) <br> onn-full-hd-streaming-stick <br> roku-streambar-pro <br> roku-streambar <br> roku-ultra-lt-2023 <br> roku-ultra-lt <br> roku-ultra-2020 <br> roku-streaming-stick-4k <br> roku-express-4k-plus <br> roku-express-4k <br> roku-express <br> roku-premiere <br> roku-generic-hisense <br> roku-generic-tcl <br> roku-generic-westinghouse <br> shield-tv-2017 <br> shield-tv-pro-2017 <br> shield-tv-2019 <br> shield-tv-pro-2019 <br> mi-box-s <br> xiaomi-tv-stick-4k <br> [other](docs/INSTALLATION.md#none--other)| The type of device you are controlling<br>[Which devices are supported?](docs/INSTALLATION.md#device-families) |
| compatibility_mode | string | no | default <br> strong <br> event0 <br> event1 <br> event2 <br> event3 <br> event4 <br> event5 <br> event6 <br> event7 <br> event8 <br> event9 <br> event10 <br> event11 <br> event12 <br> event13 | Adjust this value only if your buttons are completely unresponsive<br><br>Ignored in Apple TV configurations<br><br>[Troubleshooting](docs/INSTALLATION.md#troubleshooting) |
|defaultRemoteStyle_override | string | no | AF1 <br> AF2 <br> AF3 <br> AF4 <br> AF5 <br> AF6 <br> AFJTV <br> AFXF2 <br> AR1 <br> AR2 <br> AR3 <br> CC1 <br> CC2 <br> CC3 <br> HO1 <br> HO2 <br> HO3 <br> HO4 <br> NS1 <br> NS2 <br> ON1 <br> ON2 <br> RVRP <br> RVR <br> RSR <br> RHR <br> RTR <br> RWR <br> XM1 <br> XM2 <br> AL1 <br> AL2 | Optionally select a style of remote different from the one that shipped with your device |
| app_launch_1<br>app_launch_2<br>app_launch_3<br>app_launch_4<br>app_launch_5<br>etc... | string | no | [App presets](#app-launcher-buttons), custom launcher, or `hidden` | Unset/blank retains physical defaults; `hidden` removes that launcher. Sparse numbered slots are preserved. |
| launcher_slots | integer | no | 0–1000 | Optional number of launcher fields; the editor can also add individual fields on demand. |
|hdmi_1<br>hdmi_2<br>hdmi_3</br>hdmi_4| string | no | Personalized name for this HDMI input | The name entered here will appear on the button (truncated to 8 characters to fit) |
| scale       | integer| no       | Any positive number                                           | Change the size of this card by percentage. The default size is 100 |
| custom_launchers | object | no | Create your own app launcher buttons        | Details are in the [Launcher Button Customizations](#launcher-button-customizations) of the [README.md](README.md) file |
| button_overrides | object | no | Button name and HA script name are required.| Details are in the Button Overrides section of the [README.md](#button-overrides) file |
| visible_name_text       | string | no      | Any text                                                         | Optional device label for your firemote |
| name_position           | string | no      | hidden<br>bottom<br>top<br>                                      | Position for your optional device label |
| visible_name_text_color | hex color value | no | Any hex color value e.g.: #ffffff                            | Optional text color for the device name label |
| show_version_number     | bool   | no      | true<br>false                                                    | Optionally display the Firemote Version number on the card |
| hide_button_highlights  | bool   | no      | true<br>false                                                    | Optionally hide the status higlighting decorations for the power, home, and play/pause buttons |
| use_theme_background    | bool   | no      | true<br>false                                                    | Optionally hide the AL1 or AL2 remote style's background color to let the HA theme color show |
| hide_button_group_frame | bool   | no      | true<br>false                                                    | Optionally hide the frames around the button groups when using AL1 or AL2 |
| useCustomSkin           | bool   | no      | true<br>false                                                    | Toggle a custom background skin color on or off when using AL1 or AL2 |
| show_media_controls     | bool   | no      | true<br>false                                                    | Show additional media control buttons for Chromecast style remotes CC1, CC2, or CC3 |
| skin                    | hex color value | no | Any hex color value e.g.: #ffffff                            | background skin color for AL1 or AL2 |
| dpad_style              | string | no      | amazon-fire<br>apple-tv-black<br>apple-tv-silver<br>chromecast<br>xiaomi<br>minimal | Dpad style options for AL1 or AL2 |


<br>

## App Launcher Buttons

Choose app presets in the card editor or define a [custom launcher](#launcher-button-customizations). Availability depends on platform, installed apps, language, and region. Existing YAML identifiers remain valid for legacy presets; configured retired entries remain available for editing, while new recommendations hide or label them. For a missing or changed app, use the [fork app request form](https://github.com/Narehood/HomeAssistant-TV-Remote/issues/new?template=App_Shortcut_Request.yaml) with [device-observed identifiers](docs/INSTALLATION.md#collect-device-information).

New presets are reviewed as official TV/video services. VPNs, generic players, unofficial clients and unverified new identities are excluded; [the provider review](docs/PROVIDER_REVIEW.md) records every proposed addition. Inherited VPN IDs remain usable in existing YAML and appear only when already configured.

## Launcher Button Customizations
You are not limited to only using the launcher buttons that come with Firemote.  Through YAML, you can define your own working buttons in one of two ways: defining a script or constructing an action call.

Example:
```yaml
type: custom:firemote-card
entity: media_player.fire_tv_192_168_107_88
device_family: amazon-fire
device_type: fire_tv_4_series
compatibility_mode: default
custom_launchers:
  - friendly_name: flash the light
    label: FLASH
    image_path: https://upload.wikimedia.org/wikipedia/commons/2/28/Flash-outlined-thin-circular-button.svg
    color: red
    background: white
    script: flashthelablight
    data:
      color: green
  - friendly_name: Red Lamp
    label: red
    icon: mdi:lamp
    color: red
    background: blue
    action: light.toggle
    target:
      entity_id: light.bedroom_lamp
    data:
      color_name: red
      transition: 2
      brightness_pct: 100
app_launch_1: customlauncher flash the light
app_launch_2: customlauncher Red Lamp
scale: '110'
```
<br>

YAML usage:
| Key           | Value           | Required                  | Description                                                                     |
| ------------- | --------------- | ------------------------- | ------------------------------------------------------------------------------- |
| friendly_name | string          | yes                       | This is the name that will appear in the GUI app selector dropdown              |
| label         | string          | no                        | The text that will appear on the button                                         |
| icon          | mdi icon name   | no                        | a valid mdi icon name<br> ex: mdi:lamp                                          |
| image_path    | url             | no                        | path to an image resource                                                       |
| color         | css color value | no                        | custom color for your text label or your mdi icon<br>ex: white<br>ex: '#ff0000' |
| background    | css color value | no                        | custom color for your button's background<br>ex: green<br>ex: '#ffffff'         |
| script        | string          | yes if calling a script   | The name of your Home Assistant script                                          |
| action        | string          | yes if not using a script | The name of the Home Assistant action you want to call                          |
| target        | object          | yes if not using a script | Define the entity for your action to act upon                                   |
| data          | object          | no                        | optional parameters for your action, or script variables                        |
| hold_action   | object          | no                        | Script or action definition to use on a long press; otherwise no custom hold action runs. |
| repeat        | boolean or number | no                      | Repeat the hold action until release/cancellation. `true` uses 250 ms; a number specifies at least 100 ms. Without `hold_action`, repeats use the regular action. |


Once defined, a custom button can be assigned to a Firemote button location through the YAML config itself, or it can be selected through the Visual Editor dropdown

![image](https://github.com/PRProd/HA-Firemote/assets/25486599/ce6ccb6c-fae1-4757-8ee8-087831e4b5b5)


<br>

## Button Overrides
Button Overrides can be very useful for customization.  These overrides can be used to call a Home Assistant action directly, run a script, or hide a button on your remote.  These options are accomplished through your Firemote's YAML configuration.  Just like launcher button customizations, you can also include a data parameter with your action or for your script.

Consider this example:
```yaml
button_overrides:
  mute-button:
    script: receiver_mute_script
  volume-down-button:
    script: receiver_volume_down_script
  volume-up-button:
    action: light.toggle
    target:
      entity_id: light.bedroom_lamp
    data:
      color_name: red
      transition: 2
      brightness_pct: 100
  power-button:
    hidden: true
```

Overrides and custom launchers can repeat a volume action while held:

```yaml
button_overrides:
  volume-up-button:
    action: media_player.volume_up
    target:
      entity_id: media_player.receiver
    repeat: true
```

A short press runs once. A long press starts after 500 ms and repeats until release or cancellation. Use `hold_action` to give a long press a different script/action. Pending repeats are coalesced while Home Assistant responds; toggles are never automatically retried. Existing `restart-button` overrides also apply to the rendered `reboot-button`.
<details>
  <summary>Valid button names are listed here:</summary>

 - app-switch-button
 - apps-button
 - back-button
 - blue-button
 - center-button
 - channel-down-button
 - channel-up-button
 - down-button
 - fastforward-button
 - green-button
 - hamburger-button
 - headset-button
 - home-button
 - input-button
 - keyboard-button
 - left-button
 - live-button
 - magic-star-button
 - mute-button
 - num1-button
 - num2-button
 - num3-button
 - num4-button
 - num5-button
 - num6-button
 - num7-button
 - num8-button
 - num9-button
 - num0-button
 - options-button
 - patchwall-button
 - playpause-button
 - power-button
 - profile-button
 - programmable-one-button
 - programmable-two-button
 - red-button
 - restart-button
 - replay-button
 - rewind-button
 - right-button
 - search-button
 - settings-button
 - sleep-button
 - subtitle-button
 - tv-button
 - up-button
 - voice-button
 - volume-down-button
 - volume-up-button
 - yellow-button

</details>


<br>

## Troubleshooting and support

See the maintained [installation and troubleshooting guide](docs/INSTALLATION.md#troubleshooting) for missing cards, resource/cache problems, unresponsive buttons, CEC/IR limitations, and app launch information. Submit reports and requests through [Narehood/HomeAssistant-TV-Remote issues](https://github.com/Narehood/HomeAssistant-TV-Remote/issues/new/choose). Include card and Home Assistant versions, integration, device/firmware, minimal YAML, and reproduction steps. Upstream is a read-only historical reference.

## Development and contributions

See [CONTRIBUTING.md](CONTRIBUTING.md) and the [development guide](docs/DEVELOPMENT.md) for local setup, checks, release preparation, and the repository ownership rules. The [modernization plan](docs/MODERNIZATION_PLAN.md) records the audit and implementation requirements; its device reports are not hardware test results.

All contributions and project operations belong to **Narehood/HomeAssistant-TV-Remote**. **PRProd/HA-Firemote is permanently read-only** for this fork's work. Preserve original credit, licensing, and history.

## License and attribution

The existing [GNU GPL version 3 license](LICENSE) is preserved. See [author and contributor credits](CREDITS.md) and [third-party notices](THIRD_PARTY_NOTICES.md), including Lit's BSD license. The [original repository](https://github.com/PRProd/HA-Firemote) and [historical upstream user gallery](https://github.com/PRProd/HA-Firemote/discussions/129) are attribution/history references, rather than this fork's installation or support destinations.
