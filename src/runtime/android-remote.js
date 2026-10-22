// Explicit transport opt-in: legacy ADB configuration never silently changes transport.
const keys = {
  up: 'DPAD_UP', down: 'DPAD_DOWN', left: 'DPAD_LEFT', right: 'DPAD_RIGHT', center: 'DPAD_CENTER', select: 'DPAD_CENTER',
  back: 'BACK', home: 'HOME', hamburger: 'MENU', menu: 'MENU', power: 'POWER',
  'volume-up': 'VOLUME_UP', 'volume-down': 'VOLUME_DOWN', mute: 'VOLUME_MUTE', playpause: 'MEDIA_PLAY_PAUSE',
  rewind: 'MEDIA_REWIND', fastforward: 'MEDIA_FAST_FORWARD', previous: 'MEDIA_PREVIOUS', next: 'MEDIA_NEXT',
  'channel-up': 'CHANNEL_UP', 'channel-down': 'CHANNEL_DOWN', info: 'INFO', guide: 'GUIDE', live: 'TV',
  settings: 'SETTINGS', search: 'SEARCH', profile: 'PROFILE_SWITCH', 'magic-star': '313', subtitle: 'CAPTIONS',
  apps:'ALL_APPS', 'app-switch':'APP_SWITCH', options:'MENU', input:'TV_INPUT', tv:'TV', sleep:'SLEEP',
  red:'PROG_RED',green:'PROG_GREEN',yellow:'PROG_YELLOW',blue:'PROG_BLUE',bookmark:'BOOKMARK',
  num0:'0',num1:'1',num2:'2',num3:'3',num4:'4',num5:'5',num6:'6',num7:'7',num8:'8',num9:'9',
};
export function remoteCapabilities(hass, entity) {
  const state = hass?.states?.[entity];
  const metadata = hass?.entities?.[entity];
  return {
    available: !!state && !['unavailable','unknown'].includes(state.state),
    compatible: !metadata?.platform || metadata.platform === 'androidtv_remote',
    launch: !!(Number(state?.attributes?.supported_features) & 4),
  };
}
export function androidRemoteAction(card, id, type, gesture, call) {
  const config = card._config;
  const entity = config.android_tv_remote_entity;
  const capabilities = remoteCapabilities(card.hass, entity);
  if (!capabilities.available) { card.reportAction(`Android TV Remote entity ${entity} is unavailable. It will recover when Home Assistant reconnects.`); return; }
  if (!capabilities.compatible) { card.reportAction(`${entity} is not an Android TV Remote entity.`); return; }
  const name = id.replace(/-button$/, '');
  if (name === 'keyboard') {
    if (type !== 'click') return;
    const text = prompt('Enter text to send (Android TV Remote IME must be enabled)');
    if (text) call('remote', 'send_command', { command: `text:${text}` }, { entity_id: entity });
    return;
  }
  const key = keys[name];
  if (!key) { card.reportAction(`${name} is unsupported by Android TV Remote. Configure a button override for this action.`); return; }
  if (type === 'click') call('remote', 'send_command', { command: key }, { entity_id: entity });
  else {
    call('remote', 'send_command', { command: key, hold_secs: 0.5 }, { entity_id: entity });
    if (['up','down','left','right','volume-up','volume-down','channel-up','channel-down','rewind','fastforward'].includes(name)) gesture.setInterval(() => call('remote','send_command',{ command: key },{ entity_id: entity }), 250);
  }
}
