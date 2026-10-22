import { remoteCapabilities } from './android-remote.js';
import { resolveSource, shellQuote } from './services.js';

// Historical dispatch selects an entire family record if it has a route. A root
// Fire TV command must never leak into an Apple/Roku or source-only family route.
export function resolveLaunchMetadata(entry, family) {
  const local = entry[family];
  return local && (local.launchStrategy || local.deepLink || local.adbLaunchCommand || local.appName || local.remoteCommand) ? local : entry;
}
/** @returns {{domain?: string, service?: string, data: Record<string, unknown>, target?: {entity_id: string}, unsupported?: string}} */
export function resolveAppAction(entry, config, hass) {
  const family = config.device_family;
  const metadata = resolveLaunchMetadata(entry, family);
  const entity = config.entity;
  const remote = config.android_tv_remote_entity;
  const action = (domain, service, data, targetEntity = entity) => ({domain,service,data,target:{entity_id:targetEntity}});
  const unsupported = reason => ({unsupported:reason,data:{}});
  if (entry.deviceFamily && !entry.deviceFamily.includes(family)) return unsupported(`This app is not supported on ${family}. Configure a custom launcher.`);
  if (config.control_mode === 'android-tv-remote') {
    const capabilities = remoteCapabilities(hass, remote);
    const activity = metadata.deepLink || metadata.androidName;
    if (!capabilities.available || !capabilities.compatible || !capabilities.launch || !activity) return unsupported('This launcher requires an available Android TV Remote entity with activity support and an app ID or deep link.');
    return action('remote','turn_on',{activity},remote);
  }
  const strategy = metadata.launchStrategy;
  const isAndroid = !['apple-tv','roku','none'].includes(family);
  if (strategy === 'package') {
    const source = metadata.androidName || metadata.appName;
    if (!isAndroid || !/^[A-Za-z][\w]*(?:\.[\w]+)+$/.test(source || '')) return unsupported('This launcher has no valid Android package for this device.');
    return action('media_player','select_source',{source});
  }
  if (strategy === 'deep-link' || !strategy && metadata.deepLink) {
    const url = metadata.deepLink;
    if (typeof url !== 'string' || !/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) return unsupported('This launcher has no valid deep link.');
    if (family === 'apple-tv') return action('media_player','play_media',{media_content_type:'url',media_content_id:url});
    if (!isAndroid) return unsupported('Deep-link launching is unsupported for this integration.');
    const capabilities = remoteCapabilities(hass,remote);
    if (remote && capabilities.available && capabilities.compatible && capabilities.launch) return action('remote','turn_on',{activity:url},remote);
    return action('androidtv','adb_command',{command:`adb shell am start -a android.intent.action.VIEW -d ${shellQuote(url)}`});
  }
  if ((strategy === 'remote-command' || !strategy) && metadata.remoteCommand && ['apple-tv','roku'].includes(family)) {
    const target = family === 'apple-tv' ? config.apple_tv_remote_entity : config.roku_remote_entity;
    if (!target) return unsupported('Configure the associated remote entity to use this button.');
    return action('remote','send_command',JSON.parse(metadata.remoteCommand),target);
  }
  if ((strategy === 'command' || !strategy) && metadata.adbLaunchCommand) {
    if (!isAndroid) return unsupported('ADB commands are unsupported for this integration.');
    return action('androidtv','adb_command',{command:metadata.adbLaunchCommand});
  }
  if (strategy === 'source' || !strategy && metadata.appName) {
    const source = resolveSource(metadata.appName,metadata,hass.states?.[entity]?.attributes?.source_list);
    if (!source) return unsupported('This launcher has no source name for this integration.');
    return action('media_player','select_source',{source});
  }
  return unsupported(`This launcher has no launch strategy for ${family}. Configure a custom launcher.`);
}
