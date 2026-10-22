// ?production loads exactly the HACS release artifact for browser smoke checks.
await import(new URLSearchParams(location.search).has('production') ? '/dist/HA-Firemote.js' : './HA-Firemote.js');
import { devices } from '/src/supported-devices.js';

if (!customElements.get('ha-card')) customElements.define('ha-card', class extends HTMLElement {});
if (!customElements.get('ha-icon')) customElements.define('ha-icon', class extends HTMLElement {
  connectedCallback() { this.setAttribute('aria-hidden', 'true'); }
});

const calls = [];
const states = {};
const entities = {};
const models = [];
function collect(value, family) {
  for (const [key, entry] of Object.entries(value)) {
    if (!entry || typeof entry !== 'object') continue;
    if (entry.defaultRemoteStyle) models.push({ family, model: key, ...entry });
    else collect(entry, family);
  }
}
for (const [family, value] of Object.entries(devices)) collect(value, family);
const platform = family => family === 'apple-tv' ? 'apple_tv' : family === 'roku' ? 'roku' : 'androidtv';
for (const entry of models) {
  const id = entry.family.replaceAll('-', '_');
  const player = `media_player.${id}`;
  const remote = `remote.${id}`;
  states[player] = { entity_id: player, state: 'playing', attributes: { friendly_name: entry.friendlyName, app_id: 'com.netflix.ninja', source: 'Netflix', source_list: ['Netflix', 'YouTube', 'Swiftfin tvOS', '5', 'U'], volume_level: 0.4, is_volume_muted: false, supported_features: 152511 } };
  states[remote] = { entity_id: remote, state: 'on', attributes: { friendly_name: `${entry.family} remote`, current_activity: 'com.netflix.ninja' } };
  entities[player] = { entity_id: player, platform: platform(entry.family), device_id: id };
  entities[remote] = { entity_id: remote, platform: entry.family === 'apple-tv' ? 'apple_tv' : entry.family === 'roku' ? 'roku' : 'androidtv_remote', device_id: id };
}

const hass = {
  language: 'en', locale: { language: 'en', isRTL: false }, config: { language: 'en' }, states, entities,
  services: { remote: { send_command: {}, turn_on: {}, turn_off: {} }, media_player: { select_source: {}, play_media: {}, turn_on: {}, turn_off: {}, toggle: {}, volume_up: {}, volume_down: {}, volume_mute: {} }, androidtv: { adb_command: {} }, script: { turn_on: {} } },
  callService: async (domain, service, data, target) => {
    calls.push({ domain, service, data, ...(target ? { target } : {}) });
    document.querySelector('#actions').textContent = JSON.stringify(calls.slice(-20), null, 2);
  },
  localize: key => key,
};

function configFor(entry) {
  const id = entry.family.replaceAll('-', '_');
  return { type: 'custom:firemote-card', entity: entry.family === 'none' ? 'none' : `media_player.${id}`, device_family: entry.family, device_type: entry.model, scale: document.querySelector('#scale').value, compatibility_mode: 'default', ...(entry.family === 'apple-tv' ? { apple_tv_remote_entity: `remote.${id}` } : entry.family === 'roku' ? { roku_remote_entity: `remote.${id}` } : entry.family === 'none' ? {} : { android_tv_remote_entity: `remote.${id}` }) };
}
function createCard(config) {
  const card = document.createElement('firemote-card');
  card.setConfig(config);
  card.hass = hass;
  return card;
}
async function render() {
  const family = document.querySelector('#family').value;
  const seen = new Set();
  const entries = models.filter(entry => (family === 'all' || entry.family === family) && !seen.has(entry.family) && seen.add(entry.family));
  document.querySelector('#cards').replaceChildren(...entries.map(entry => {
    const article = document.createElement('article');
    const title = document.createElement('h2');
    title.textContent = entry.friendlyName || entry.family;
    article.append(title, createCard(configFor(entry)));
    return article;
  }));
}
for (const family of Object.keys(devices)) {
  const option = document.createElement('option');
  option.value = family;
  option.textContent = family;
  document.querySelector('#family').append(option);
}
document.querySelector('#family').addEventListener('change', render);
document.querySelector('#scale').addEventListener('change', render);
document.querySelector('#edit').addEventListener('click', () => {
  const holder = document.querySelector('#editor');
  holder.hidden = !holder.hidden;
  if (holder.hidden) return;
  const entry = models.find(model => model.family === document.querySelector('#family').value) || models[0];
  const editor = document.createElement('firemote-card-editor');
  editor.hass = hass;
  editor.setConfig(configFor(entry));
  editor.addEventListener('config-changed', event => {
    const card = document.querySelector('firemote-card');
    card.setConfig(event.detail.config);
  });
  holder.replaceChildren(editor);
});
window.tvRemoteTest = { hass, calls, models, configFor, createCard };
await render();
