import {LitElement,html,css} from 'lit';
import {clone,freeze,STYLES,deviceAttribute} from './config.js';
import {devices} from '../supported-devices.js';
import {translate,direction} from './locale.js';
import {createAppMap} from './apps.js';
import {SLOT_CAPACITY as appButtonMax} from './layout.js';
import {catalogManifest} from '../launcher-buttons.js';
const devicemap = new Map(Object.entries(devices));
const catalogStatus = new Map(catalogManifest.entries.map(entry => [entry.id,entry.families]));

// The editor stores a private immutable copy. Rendering and focus never rewrite YAML.
export class FiremoteCardEditor extends LitElement {
  static properties = {hass: {}, _config: {}, _extraSlots: {state:true}};
  static styles = css`
    :host { display: block; }
    label { display: grid; gap: .35rem; margin: .8rem 0; }
    select, input { font: inherit; padding: .6em; max-width: 100%; box-sizing: border-box; }
    button { font: inherit; padding: .5em 1em; }
    .check { display: flex; align-items: center; }
    input[type=checkbox] { margin-inline-end: .5rem; }
  `;
  setConfig(config) {
    this._config = freeze(clone(config));
    this._appmap = createAppMap({...config, device_family: config.device_family || 'amazon-fire'});
    this._extraSlots = [];
  }
  updated() {
    // Native select.value must be applied after its dynamic options have been committed.
    this.renderRoot.querySelectorAll('select').forEach(select => {
      const defaults = {device_family:'amazon-fire',control_mode:'legacy',compatibility_mode:'default',name_position:'hidden',dpad_style:'amazon-fire'};
      select.value = String(this._config[select.name] ?? defaults[select.name] ?? '');
    });
  }
  translateToUsrLang(key) { return translate(this.hass, key); }
  shouldUpdate(changed) {
    if (!this.hasUpdated || changed.has('_config') || changed.has('_extraSlots') || !changed.has('hass')) return true;
    const previous = changed.get('hass');
    if (!previous || previous.entities !== this.hass.entities || previous.language !== this.hass.language || previous.config?.language !== this.hass.config?.language) return true;
    const signature = states => Object.entries(states || {}).filter(([id]) => /^(media_player|remote)\./.test(id)).map(([id,state]) => `${id}:${state.attributes?.friendly_name || ''}`).join('|');
    return signature(previous.states) !== signature(this.hass.states);
  }
  configChanged(event) {
    const input = event.currentTarget || event.target;
    const name = input.name;
    if (!name) return;
    let value = input.type === 'checkbox' ? input.checked : input.value;
    if (value === this._config[name] || String(value) === String(this._config[name]) && input.type !== 'checkbox') return;
    const config = clone(this._config);
    config[name] = value;
    if (name === 'device_family') {
      delete config.apple_tv_remote_entity; delete config.roku_remote_entity; delete config.android_tv_remote_entity;
      config.device_type = value === 'none' ? 'other' : '';
      config.entity = value === 'none' ? 'none' : '';
      config.control_mode = 'legacy';
    }
    this._config = freeze(config);
    this._appmap = createAppMap(config);
    this.dispatchEvent(new CustomEvent('config-changed', {detail:{config:clone(config)}, bubbles:true, composed:true}));
  }
  getEntitiesByType(domain) { return Object.keys(this.hass?.states || {}).filter(id => id.startsWith(`${domain}.`)); }
  getEntitiesByPlatform(platform) { return Object.keys(this.hass?.entities || {}).filter(id => this.hass.entities[id].platform === platform); }
  entities(domain, platform, selected) {
    const registry = this.hass?.entities || {};
    const ids = new Set([...this.getEntitiesByType(domain), ...this.getEntitiesByPlatform(platform).filter(id => id.startsWith(`${domain}.`))]);
    // Prefer metadata matches but retain states whose registry has not arrived yet.
    const result = [...ids].filter(id => !registry[id]?.platform || registry[id].platform === platform);
    if (selected && !result.includes(selected)) result.unshift(selected);
    return result;
  }
  select(name, label, value, choices, blank = true) {
    return html`<label for=${name}>${translate(this.hass,label)}
      <select id=${name} name=${name} .value=${String(value ?? '')} @change=${this.configChanged}>
        ${blank ? html`<option value="">—</option>` : ''}
        ${choices.map(choice => html`<option value=${choice.value} ?selected=${choice.value === String(value ?? '')} ?disabled=${choice.disabled}>${translate(this.hass,choice.label)}</option>`)}
      </select></label>`;
  }
  entitySelect(name, label, platform, domain) {
    const value = this._config[name];
    const entities = this.entities(domain, platform, value);
    return this.select(name,label,value,entities.map(id => ({value:id,label:this.hass.states?.[id]?.attributes?.friendly_name || id})));
  }
  input(name, label, type = 'text', fallback = '') {
    return html`<label for=${name} class=${type === 'checkbox' ? 'check' : ''}>${translate(this.hass,label)}
      <input id=${name} name=${name} type=${type} .value=${String(this._config[name] ?? fallback)} ?checked=${this._config[name] === true} @change=${this.configChanged}>
    </label>`;
  }
  launcherFields(style) {
    if (this._config.device_family === 'none') return '';
    const flexible = ['AL1','AL2'].includes(style);
    const requested = Math.max(0, Math.min(1000, Number(this._config.launcher_slots) || 0));
    const count = flexible ? Math.max(6, requested) : Math.max(appButtonMax[style] || 0, requested);
    const slots = new Set(Array.from({length:count}, (_,index) => index + 1));
    if (count) {
      for (const key of Object.keys(this._config)) if (/^app_launch_[1-9]\d*$/.test(key)) slots.add(Number(key.slice(11)));
      for (const slot of this._extraSlots || []) slots.add(slot);
    }
    const family = this._config.device_family;
    const options = [...this._appmap].filter(([id, entry]) => (!entry.deviceFamily || entry.deviceFamily.includes(family)) && catalogStatus.get(id)?.[family]?.status !== 'incomplete');
    return html`${[...slots].sort((a,b) => a-b).map(slot => {
      const name = `app_launch_${slot}`;
      const selected = this._config[name] || '';
      const choices = options.filter(([id,entry]) => entry.lifecycle !== 'legacy' || id === selected).map(([id,entry]) => ({value:id,label:`${entry.friendlyName}${entry.legacyReason ? ` (${entry.legacyReason}; existing configuration)` : entry.lifecycle === 'legacy' ? ' (legacy)' : ''}`}));
      if (selected && selected !== 'hidden' && !choices.some(choice => choice.value === selected)) choices.unshift({value:selected,label:`${selected} (configured)`});
      return this.select(name,`${translate(this.hass,'App Launch Button')} ${slot}`,selected,[{value:'',label:'Default (empty)'},{value:'hidden',label:'hidden'},...choices],false);
    })}${count ? html`<button type="button" @click=${() => { this._extraSlots = [...(this._extraSlots || []), Math.max(...slots,0) + 1]; }}>${translate(this.hass,'Add launcher')}</button>` : ''}`;
  }
  render() {
    if (!this.hass || !this._config) return html``;
    const config = this._config;
    const family = config.device_family || 'amazon-fire';
    const model = deviceAttribute('friendlyName',{...config,device_family:family});
    const style = deviceAttribute('defaultRemoteStyle',{...config,device_family:family});
    const groups = Object.entries(devices[family] || {}).filter(([key]) => key !== 'meta');
    const platform = family === 'apple-tv' ? 'apple_tv' : family === 'roku' ? 'roku' : config.control_mode === 'android-tv-remote' ? 'androidtv_remote' : 'androidtv';
    const remoteField = family === 'apple-tv' ? 'apple_tv_remote_entity' : family === 'roku' ? 'roku_remote_entity' : 'android_tv_remote_entity';
    const canRemote = !['none','amazon-fire','apple-tv','roku'].includes(family);
    return html`<div dir=${direction(this.hass)}>
      ${this.select('device_family','Device Family',family,[...devicemap].map(([id,entry]) => ({value:id,label:entry.meta.friendlyName,disabled:!entry.meta.supported})),false)}
      ${family !== 'none' ? html`<label for="device_type">${translate(this.hass,'Device Model')}
        <select id="device_type" name="device_type" .value=${config.device_type || ''} @change=${this.configChanged}>
          <option value="">—</option>
          ${groups.map(([group,entries]) => html`<optgroup label=${group}>${Object.entries(entries).map(([id,entry]) => html`<option value=${id} ?selected=${id === config.device_type} ?disabled=${!entry.supported && id !== config.device_type}>${entry.friendlyName}</option>`)}</optgroup>`)}
        </select></label>` : ''}
      ${canRemote ? this.select('control_mode','Control mode',config.control_mode || 'legacy',[{value:'legacy',label:'Legacy (ADB)'},{value:'android-tv-remote',label:'Android TV Remote'}],false) : ''}
      ${family !== 'none' ? this.entitySelect('entity','Entity',platform,'media_player') : ''}
      ${!['none','amazon-fire'].includes(family) ? this.entitySelect(remoteField,'Associated remote entity',family === 'apple-tv' ? 'apple_tv' : family === 'roku' ? 'roku' : 'androidtv_remote','remote') : ''}
      ${!this.hass.entities ? html`<p>${translate(this.hass,'Entity registry is loading. Existing entity selections are retained.')}</p>` : ''}
      ${config.control_mode === 'android-tv-remote' ? html`<p>${translate(this.hass,'App launch needs activity support; text needs Android TV Remote IME enabled. App feedback may be unavailable.')}</p>` : ''}
      <hr>
      ${this.input('scale','Scale','number',100)}
      ${this.select('defaultRemoteStyle_override','Remote Style',config.defaultRemoteStyle_override || '',[{value:'',label:`${translate(this.hass,'Default for')} ${model || family}`},...STYLES.map(id => ({value:id,label:id}))],false)}
      ${['CC1','CC2','CC3'].includes(style) ? this.input('show_media_controls','Show Media Controls','checkbox') : ''}
      ${['amazon-fire','xiaomi'].includes(family) ? this.select('compatibility_mode','Compatibility Mode',config.compatibility_mode || 'default',[{value:'default',label:'Default'},{value:'strong',label:'Strong (Slower)'},...Array.from({length:14},(_,index) => ({value:`event${index}`,label:`event${index}`}))],false) : ''}
      ${this.launcherFields(style)}
      ${['AL1','AL2'].includes(style) ? html`${this.input('launcher_slots','Launcher slots','number',6)}${this.input('useCustomSkin','Custom Remote Skin','checkbox')}${this.input('skin','Skin color','color','#4682b4')}` : ''}
      ${style === 'AL2' ? html`${this.input('app_launcher_relative_size','App Launcher Relative Scale','number',0)}${this.input('hide_button_group_frame','Hide frames around button groups','checkbox')}${this.select('dpad_style','DPad Style',config.dpad_style || 'amazon-fire',['amazon-fire','apple-tv-black','apple-tv-silver','chromecast','xiaomi','minimal'].map(id => ({value:id,label:id})),false)}` : ''}
      <hr>
      ${this.input('visible_name_text','Visible Device Name')}
      ${this.select('name_position','Name Position',config.name_position || 'hidden',['hidden','top','bottom'].map(id => ({value:id,label:id})),false)}
      ${this.input('visible_name_text_color','Device Name Text Color','color','#000000')}
    </div>`;
  }
}
