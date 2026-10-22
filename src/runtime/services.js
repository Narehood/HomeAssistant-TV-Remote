// Queue per card and per transport target. Repeats are coalesced; actions are never retried.
export class ServiceExecutor {
  constructor(report) { this.report = report; this.scopes = new Map(); }
  cancelPending() {
    for (const scope of this.scopes.values()) scope.queue = scope.queue.filter(item => {
      if (item.context.release) return true;
      item.resolve({status:'cancelled'}); return false;
    });
  }
  call(hass, domain, service, data = {}, target, context = {}) {
    const payload = { ...data };
    const destination = { ...(target || {}) };
    if (context.extractLegacyTargets && domain !== 'script') for (const key of ['entity_id','device_id','area_id','floor_id','label_id']) if (Object.hasOwn(payload, key)) { destination[key] = payload[key]; delete payload[key]; }
    if (domain === 'remote' && !Object.values(destination).some(value => typeof value === 'string' ? value.length > 0 : Array.isArray(value) && value.length > 0)) {
      this.report('Configure an associated remote entity or an explicit action target.');
      return Promise.resolve({status:'unsupported'});
    }
    if (!Object.keys(destination).length) return this.enqueue(hass, domain, service, payload, undefined, context);
    return this.enqueue(hass, domain, service, payload, destination, context);
  }
  enqueue(hass, domain, service, data, target, context) {
    const key = `${domain}:${JSON.stringify(target || {})}`;
    const scope = this.scopes.get(key) || { active: false, queue: [] };
    this.scopes.set(key, scope);
    if (context.repeat && (scope.active || scope.queue.some(item => item.context.repeat))) return Promise.resolve({ status: 'coalesced' });
    if (scope.queue.length >= 16 && !context.release) { this.report('Too many pending remote actions. Wait for Home Assistant to respond.'); return Promise.resolve({ status: 'dropped' }); }
    return new Promise(resolve => {
      const item = { hass, domain, service, data, target, context, resolve };
      if (context.release) scope.queue.unshift(item); else scope.queue.push(item);
      this.drain(key, scope);
    });
  }
  async drain(key, scope) {
    if (scope.active) return;
    const item = scope.queue.shift();
    if (!item) { this.scopes.delete(key); return; }
    if (item.context.gesture?.cancelled && !item.context.release) { item.resolve({ status: 'cancelled' }); this.drain(key, scope); return; }
    scope.active = true;
    try {
      if (!item.hass?.callService) throw new Error('Home Assistant is not connected');
      const result = await item.hass.callService(item.domain, item.service, item.data, item.target);
      item.resolve({ status: 'success', result });
    } catch (error) {
      // Handle rejected promises locally without logging action or keyboard payloads.
      this.report(`${item.domain}.${item.service} failed. Check the entity, integration and Home Assistant logs.`);
      item.context.gesture?.finish();
      item.resolve({ status: 'error', error });
    } finally { scope.active = false; this.drain(key, scope); }
  }
}
export function customActionArgs(def) {
  if (def.script) return ['script', def.script.replace(/^script\./, ''), { ...(def.data || {}) }, def.target];
  const [domain, service] = (def.action ?? def.service).split('.');
  // Legacy data keys override equal target keys. Other targeting remains separate.
  const data = { ...(def.data || {}) }; const target = { ...(def.target || {}) };
  for (const key of Object.keys(target)) if (Object.hasOwn(data, key)) target[key] = data[key];
  if (domain !== 'script') for (const key of ['entity_id','device_id','area_id','floor_id','label_id']) if (Object.hasOwn(data, key)) { target[key] = data[key]; delete data[key]; }
  return [domain, service, data, target];
}
export function shellQuote(text) { return "'" + text.replace(/'/g, "'\\''") + "'"; }
export function adbTextCommand(text) {
  if (/[\r\n\x00]/.test(text)) throw new Error('ADB text input cannot send newlines or NUL. Use Android TV Remote text input for multiline text.');
  return `input text ${shellQuote(text.replace(/ /g, '%s'))}`;
}
export function resolveSource(name, entry, sources = []) {
  const knownSourceNames = {Photos:['Fotos','Apple Photos','Apple Fotos'], Music:['Musik','Apple Music','Apple Musik'], Search:['Suchen','Suche','Rechercher']};
  const candidates = [name, ...(knownSourceNames[name] || []), ...(entry.sourceAliases || []), ...(entry.aliases || [])].filter(value => typeof value === 'string');
  return candidates.find(value => sources.includes(value)) || sources.find(value => candidates.some(candidate => candidate.toLowerCase() === value.toLowerCase())) || name;
}
