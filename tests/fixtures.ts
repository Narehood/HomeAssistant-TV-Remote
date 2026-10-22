import { vi } from 'vitest';
import { devices } from '../src/supported-devices.js';

export interface DeviceModel {
  family: string;
  model: string;
  friendlyName: string;
  defaultRemoteStyle: string;
}

const models: DeviceModel[] = [];
function visit(value: Record<string, unknown>, family: string) {
  for (const [model, item] of Object.entries(value)) {
    if (!item || typeof item !== 'object') continue;
    const entry = item as Record<string, unknown>;
    if (entry.defaultRemoteStyle) models.push({ ...entry, family, model } as DeviceModel);
    else visit(entry, family);
  }
}
for (const [family, entries] of Object.entries(devices)) visit(entries, family);
export { models };

export function mockHass() {
  const states: Record<string, { entity_id: string; state: string; attributes: Record<string, unknown> }> = {};
  const entities: Record<string, { entity_id: string; platform: string; device_id: string }> = {};
  for (const { family } of models) {
    const name = family.replaceAll('-', '_');
    const player = `media_player.${name}`;
    const remote = `remote.${name}`;
    const platform = family === 'apple-tv' ? 'apple_tv' : family === 'roku' ? 'roku' : 'androidtv';
    states[player] = { entity_id: player, state: 'playing', attributes: { friendly_name: family, source: 'Netflix', app_name: 'Netflix', app_id: 'com.netflix.ninja', source_list: ['Netflix', 'YouTube', 'Swiftfin tvOS', '5', 'U'], volume_level: 0.4, supported_features: 152511 } };
    states[remote] = { entity_id: remote, state: 'on', attributes: { current_activity: 'com.netflix.ninja' } };
    entities[player] = { entity_id: player, platform, device_id: name };
    entities[remote] = { entity_id: remote, platform: ['apple-tv', 'roku'].includes(family) ? platform : 'androidtv_remote', device_id: name };
  }
  return {
    states, entities,
    language: 'en', locale: { language: 'en', isRTL: false }, config: { language: 'en' },
    services: { remote: { send_command: {}, turn_on: {}, turn_off: {} }, media_player: { play_media: {}, select_source: {} }, androidtv: { adb_command: {} } },
    callService: vi.fn().mockResolvedValue(undefined),
    localize: (key: string) => key,
  };
}

export function modelConfig(model: DeviceModel) {
  const name = model.family.replaceAll('-', '_');
  return {
    type: 'custom:firemote-card',
    entity: model.family === 'none' ? 'none' : `media_player.${name}`,
    device_family: model.family,
    device_type: model.model,
    scale: '85',
    ...(model.family === 'apple-tv' ? { apple_tv_remote_entity: `remote.${name}` } : model.family === 'roku' ? { roku_remote_entity: `remote.${name}` } : model.family === 'none' ? {} : { android_tv_remote_entity: `remote.${name}` }),
  };
}
