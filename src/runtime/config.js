import { devices } from '../supported-devices.js';

export const STYLES = ['AF1','AF2','AF3','AF4','AF5','AF6','AFJTV','AFXF2','AR1','AR2','AR3','CC1','CC2','CC3','HO1','HO2','HO3','HO4','NS1','NS2','ON1','ON2','RVRP','RVR','RSR','RHR','RTR','RWR','XM1','XM2','AL1','AL2'];
export const clone = value => Array.isArray(value) ? value.map(clone) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key,item]) => [key,clone(item)])) : value;
export function freeze(value) {
  if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
}
export function deviceRecord(config) {
  return Object.entries(devices[config.device_family] || {}).filter(([key]) => key !== 'meta').map(([, group]) => group[config.device_type]).find(Boolean);
}
export function deviceAttribute(name, config) {
  const override = config[`${name}_override`];
  if (override !== undefined && override !== null && override !== '' && override !== 'none') return override;
  return deviceRecord(config)?.[name];
}
export function safeColor(value, field = 'color') {
  if (value === undefined || value === '') return '';
  if (typeof value !== 'string' || /[;{}<>"'\\]|url\s*\(|expression\s*\(/i.test(value) || !/^(#[\da-f]{3,8}|[a-z]+|(?:rgb|hsl)a?\([\d.,% /+-]+\)|var\(--[\w-]+(?:,\s*[\w#]+)?\))$/i.test(value)) throw new Error(`${field}: use a CSS color or theme variable`);
  return value;
}
export function safeImage(value) {
  if (typeof value !== 'string' || /[\x00-\x20]/.test(value) || (!/^https?:\/\//i.test(value) && !/^\/(?!\/)/.test(value))) throw new Error('image_path: use an HTTP(S) URL or a local / path');
  return value;
}
export function validateAction(action, field) {
  if (!action || typeof action !== 'object' || Array.isArray(action)) throw new Error(`${field}: expected an action object`);
  if (action.hidden === true && !action.script && !action.action && !action.service) return;
  if (action.script !== undefined) {
    if (typeof action.script !== 'string' || !/^(?:script\.)?[\w]+$/.test(action.script)) throw new Error(`${field}.script: expected a script name`);
  } else if (typeof (action.action ?? action.service) !== 'string' || !/^\w+\.\w+$/.test(action.action ?? action.service)) throw new Error(`${field}: expected script, action or service (domain.name)`);
  for (const key of ['data','target']) if (action[key] !== undefined && (!action[key] || typeof action[key] !== 'object' || Array.isArray(action[key]))) throw new Error(`${field}.${key}: expected an object`);
  if (action.hold_action) validateAction(action.hold_action, `${field}.hold_action`);
  if (action.repeat !== undefined && action.repeat !== false && action.repeat !== true && (!Number.isFinite(Number(action.repeat)) || Number(action.repeat) < 100)) throw new Error(`${field}.repeat: use true, false, or milliseconds >= 100`);
}
export function normalizeConfig(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('configuration: expected an object');
  const config = clone(raw);
  config.device_family ??= 'amazon-fire';
  if (!devices[config.device_family]) throw new Error(`device_family: unknown family "${config.device_family}"`);
  if (config.device_family === 'none') { config.device_type ??= 'other'; config.entity ??= 'none'; }
  if (!deviceRecord(config)) throw new Error(`device_type: unknown model "${config.device_type}" for ${config.device_family}`);
  if (config.defaultRemoteStyle_override != null && config.defaultRemoteStyle_override !== '' && config.defaultRemoteStyle_override !== 'none' && !STYLES.includes(config.defaultRemoteStyle_override)) throw new Error('defaultRemoteStyle_override: unknown remote style');
  config.control_mode ??= 'legacy';
  if (!['legacy','android-tv-remote'].includes(config.control_mode)) throw new Error('control_mode: use legacy or android-tv-remote');
  if (config.control_mode === 'android-tv-remote') {
    if (['amazon-fire','apple-tv','roku','none'].includes(config.device_family)) throw new Error('control_mode: Android TV Remote requires an Android TV device family');
    config.android_tv_remote_entity ||= config.entity?.startsWith('remote.') ? config.entity : '';
    config.entity ||= config.android_tv_remote_entity;
    if (!config.android_tv_remote_entity) throw new Error('android_tv_remote_entity: required for android-tv-remote control_mode');
  }
  if (!config.entity) throw new Error('entity: define a media_player entity, or choose android-tv-remote control_mode');
  for (const key of ['entity','android_tv_remote_entity','apple_tv_remote_entity','roku_remote_entity']) {
    const value = config[key];
    if (value === undefined || value === '' || value === 'none' && key === 'entity') continue;
    if (typeof value !== 'string' || !(key === 'entity' && config.control_mode === 'legacy' ? /^media_player\.[\w]+$/ : key === 'entity' ? /^(media_player|remote)\.[\w]+$/ : /^remote\.[\w]+$/).test(value)) throw new Error(`${key}: invalid entity ID`);
  }
  for (const [key, fallback] of [['scale',100],['app_launcher_relative_size',0]]) {
    if (config[key] !== undefined && config[key] !== null && !['number','string'].includes(typeof config[key])) throw new Error(`${key}: expected a number`);
    const value = Number(config[key] ?? fallback);
    if (!Number.isFinite(value) || key === 'scale' && value <= 0) throw new Error(`${key}: expected a finite ${key === 'scale' ? 'positive ' : ''}number`);
    config[key] = value;
  }
  if (config.scale + config.app_launcher_relative_size <= 0) throw new Error('app_launcher_relative_size: resulting launcher size must be positive');
  for (const key of ['hdmiInputs_override','avInputs_override','launcher_slots']) if (config[key] !== undefined && (!Number.isInteger(Number(config[key])) || Number(config[key]) < 0 || Number(config[key]) > 1000)) throw new Error(`${key}: expected an integer from 0 to 1000`);
  if (config.tuner_override !== undefined && ![true,false,'true','false','none'].includes(config.tuner_override)) throw new Error('tuner_override: expected true or false');
  if (config.compatibility_mode && !/^(default|strong|event\d+)$/.test(config.compatibility_mode)) throw new Error('compatibility_mode: expected default, strong, or eventN');
  if (config.defaultEventListenerBinPath_override && config.defaultEventListenerBinPath_override !== 'none' && !/^\/dev\/input\/event\d+$/.test(config.defaultEventListenerBinPath_override)) throw new Error('defaultEventListenerBinPath_override: expected /dev/input/eventN');
  for (const key of ['skin','visible_name_text_color']) safeColor(config[key], key);
  if (config.button_overrides !== undefined) {
    if (!config.button_overrides || typeof config.button_overrides !== 'object' || Array.isArray(config.button_overrides)) throw new Error('button_overrides: expected a map');
    for (const [key, action] of Object.entries(config.button_overrides)) { if (action !== null) validateAction(action, `button_overrides.${key}`); }
    if (config.button_overrides['restart-button'] && !config.button_overrides['reboot-button']) config.button_overrides['reboot-button'] = clone(config.button_overrides['restart-button']);
  }
  if (config.custom_launchers != null) {
    config.custom_launchers = Array.isArray(config.custom_launchers) ? config.custom_launchers : [config.custom_launchers];
    const names = new Set();
    config.custom_launchers.forEach((launcher, index) => {
      validateAction(launcher, `custom_launchers.${index + 1}`);
      const name = launcher.friendly_name || launcher.label || `customlauncher ${index + 1}`;
      if (typeof name !== 'string' || names.has(name)) throw new Error(`custom_launchers: duplicate or invalid name "${name}"`);
      names.add(name);
      for (const key of ['label','friendly_name','icon']) if (launcher[key] !== undefined && typeof launcher[key] !== 'string') throw new Error(`custom_launchers.${index + 1}.${key}: expected text`);
      safeColor(launcher.color); safeColor(launcher.background, 'background');
      if (launcher.image_path) safeImage(launcher.image_path);
    });
  }
  for (const [key, value] of Object.entries(config)) if (/^app_launch_\d+$/.test(key)) {
    if (Number(key.slice(11)) < 1 || Number(key.slice(11)) > 1000) throw new Error(`${key}: launcher slot must be from 1 to 1000`);
    if (typeof value !== 'string' && value !== null) throw new Error(`${key}: expected a launcher ID or empty string`);
  }
  return freeze(config);
}
export function configuredSlots(config, minimum = 0) {
  return Math.max(minimum, Number(config.launcher_slots) || 0, ...Object.keys(config).filter(key => /^app_launch_[1-9]\d*$/.test(key)).map(key => Number(key.slice(11))));
}
