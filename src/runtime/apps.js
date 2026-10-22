import {html} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {launcherData} from '../launcher-buttons.js';
import {deviceAttribute} from './config.js';
import {resolveLaunchMetadata} from './launch.js';
import {resolveSource} from './services.js';

export function appIsActive(entry, config, appId) {
  if (typeof appId !== 'string' || !appId) return false;
  const metadata = resolveLaunchMetadata(entry,config.device_family);
  const identities = [metadata.androidName,metadata.androidName2,metadata.appName,metadata['app-id'],...(metadata.sourceAliases || [])].filter(value => value !== undefined).map(String);
  return identities.includes(appId) || !!metadata.appName && resolveSource(metadata.appName,metadata,[appId]) === appId;
}

function truncate(str, length) {
  return str.length > length ? str.substr(0, length) : str;
}




function handlehdmi(appmap, config, inputs = 0) {
  if( inputs > 0 ) {
    for (let i = 1; i <= inputs; i++) {
      var configitem = "hdmi_"+i;
      var inputname = "HDMI "+i;
      var friendlyname = "HDMI "+i;
      if (config[configitem]) {
        inputname = truncate(config[configitem], 8);
        friendlyname = 'HDMI '+i+' - '+inputname;
      }
      if( config.device_type == 'fire_tv_cube_third_gen') {
        appmap.set(configitem, {"button": inputname, "generatedInput": true, "friendlyName": friendlyname, "androidName": "", "adbLaunchCommand": "adb shell am start -n com.amazon.tv.inputpreference.service/com.amazon.tv.inputpreference.player.InputChooserActivity"});
        continue;
      }
      if (config.device_family == "roku") {
        appmap.set(configitem, {"button": inputname, "generatedInput": true, "friendlyName": friendlyname, "appName": "HDMI "+i, "remoteCommand": '{"command": "input_hdmi'+i+'", "num_repeats": 1, "hold_secs": 0}'});
      }
      else {
        appmap.set(configitem, {"button": inputname, "generatedInput": true, "friendlyName": friendlyname, "androidName": "", "adbLaunchCommand": "HDMI"+i});
      }
    }
  }
}


function handlecustomlaunchers(appmap, config) {
  const launchers = config.custom_launchers == null ? [] : Array.isArray(config.custom_launchers) ? config.custom_launchers : [config.custom_launchers];
  launchers.forEach((launcher, index) => {
    const name = launcher.friendly_name || launcher.label || `customlauncher ${index + 1}`;
    appmap.set(`customlauncher ${name}`, { friendlyName: `Custom: ${name}`, custom: launcher });
  });
}
export function renderLauncherFace(entry, face) {
  if (!entry) return '';
  if (entry.custom) {
    const launcher = entry.custom;
    const style = {color: launcher.color, background: launcher.background};
    const label = launcher.label || launcher.friendly_name || entry.friendlyName;
    return html`<div class="customLauncherBackground" style=${styleMap(style)}></div>${launcher.image_path
      ? html`<img src=${launcher.image_path} alt=${label} class="customLauncherImg">`
      : launcher.icon ? html`<ha-icon icon=${launcher.icon} class="customLauncherIcon" style=${styleMap(style)}></ha-icon>`
      : html`<div class="customLauncherTxt" style=${styleMap(style)}>${truncate(label, 10)}</div>`}`;
  }
  // Only controlled catalog artwork passes this boundary. Input labels remain text.
  return entry.generatedInput ? face : unsafeHTML(face || '');
}

function handleAVInputs(appmap, config, avInputs = 0) {
    if (avInputs > 0 && config.device_family == "roku") {
        appmap.set("av1_input", {"button": "AV", "friendlyName": "AV Input", "remoteCommand": '{"command": "input_av1", "num_repeats": 1, "hold_secs": 0}'});
    }
}

function handleTunerInputs(appmap, config, tunerInput) {
    if (config.device_family == "roku" && (tunerInput == true || tunerInput == 'true')) {
        appmap.set("tuner_input", {"button": "TV Tuner", "friendlyName": "TV Tuner", "remoteCommand": '{"command": "input_tuner", "num_repeats": 1, "hold_secs": 0}'});
        //appmap.set("roku-tv-channel", {"button": "Channel", "friendlyName": "Function: Input TV Channel"});
        return;
    }
    if (config.device_family == "amazon-fire" && (tunerInput == true || tunerInput == 'true')) {
        appmap.set("tuner_input", {"button": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="650" height="200" viewBox="0 0 650 200" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" fill="#fff" fill-rule="evenodd"><g stroke="none" fill="#fff" fill-rule="nonzero"><path d="M24.387 146.275l9.642 11.491c.643.766 2.694 1.655 4.226.37l45.963-38.567h0c1.286 1.532 3.46 1.013 4.226.37l17.619-14.784 9.862.863c.766-.643 2.175-.52 2.175-.52l7.66-6.428.643.766c1.286 1.532 2.694 1.655 4.226.37l19.917-16.712c1.532-1.286 1.655-2.694.37-4.226l-10.285-12.257 17.619-14.784c1.532-1.286 3.187-3.98 2.668-6.155s-2.448-4.473-4.5-5.362c-2.694-1.655-5.635-.493-7.167.793l-17.619 14.784-10.285-12.257c-1.286-1.532-2.694-1.655-4.226-.37L97.205 60.37c-1.532 1.286-1.655 2.694-.37 4.226l1.286 1.532-7.66 6.428-1.532 1.286-.863 9.862-17.619 14.784c-.766.643-1.655 2.694-.37 4.226l.643.766-45.963 38.567c-1.532 1.286-1.655 2.694-.37 4.226zm76.288-44.432l-13.789 11.57-10.285-12.257 13.789-11.57zm-64.744 50.41l-5.785-6.894 44.431-37.282 5.785 6.894zm92.375-57.93l-3.214-3.83 16.087-13.499 3.214 3.83zM117.378 81.3l16.087-13.499 3.857 4.596-16.087 13.499zm-7.713-9.193l16.087-13.499 3.857 4.596-16.087 13.499zm43.445-26.011c.766-.643.766-.643 1.409.123s.643.766-.123 1.409l-17.619 14.784-1.286-1.532zm-34.428 4.086l3.857 4.596-16.087 13.499-3.857-4.596zm-16.703 20.543l19.926 23.747-6.894 5.785-8.453-.74L93.7 84.197l1.382-7.687zM249 141l-9-22h-35l-8 22h-12l33-85h9l33 85h-11zm-26-71l-15 40h29l-14-40z"/><use xlink:href="#oVi3"/><path d="M340 63h10v15h12v9h-12v39q0 4 2 6 2 2 5 2 2 0 6-1v9q-5 1-9 1-7 0-11-4-3-5-3-13V87h-12v-9h12V63zm62 80q-13 0-21-9-8-8-8-22v-2q0-10 4-17 3-8 10-12 6-4 14-4 12 0 19 8 7 8 7 23v5h-43q0 9 5 15 6 6 14 6 5 0 9-2 4-3 7-7l7 5q-8 13-24 13zm-1-57q-7 0-11 5-5 4-6 13h32v-1q-1-8-5-13-3-4-10-4z"/><use xlink:href="#oVi3" x="169"/><use xlink:href="#oVi3" x="235"/><path d="M621 142h-11q-1-2-2-7-7 8-18 8-9 0-15-6-6-5-6-13 0-10 8-15 7-6 21-6h10v-5q0-6-3-9-4-3-10-3-6 0-10 3-4 3-4 7h-11q0-5 4-9 3-5 9-7 6-3 12-3 11 0 18 5 6 6 6 16v29q0 8 2 14v1zm-29-9q5 0 10-2 4-3 6-7v-13h-8q-20 0-20 11 0 6 3 8 4 3 9 3z"/></g><defs ><path id="oVi3" d="M270 78h10l1 8q7-9 19-9 20 0 20 23v42h-11v-42q0-7-3-11-3-3-10-3-5 0-9 3-4 3-6 7v46h-11V78z"/></defs></svg>',
                                   "friendlyName": "Antenna",
                                   "androidName": "com.amazon.tv.livetv",
                                   "adbLaunchCommand": "adb shell input keyevent KEYCODE_TV"}
                  );
    }
}


export function createAppMap(config) {
    const appmap = new Map(Object.entries(launcherData));
    handlehdmi(appmap, config, deviceAttribute('hdmiInputs', config));
    handlecustomlaunchers(appmap, config);
    handleAVInputs(appmap, config, deviceAttribute('avInputs', config));
    handleTunerInputs(appmap, config, deviceAttribute('tuner', config));
    return appmap;
}
