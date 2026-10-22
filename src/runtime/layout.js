import { configuredSlots, deviceAttribute } from './config.js';
export const SLOT_CAPACITY = { AF4:6, AF5:6, AF6:6, AFJTV:6, AFXF2:6, AR1:10, AR2:8, AR3:8, CC1:8, CC2:8, CC3:8, NS2:6, ON1:8, ON2:8, RVRP:10, RHR:10, RTR:8, RWR:10, RVR:10, RSR:10, XM1:10, XM2:10, HO1:6, HO2:8, HO3:6, HO4:6 };
const sizes = { AF1:[588.38,193.97], AF2:[634.08,193.97], AF3:[657.14,193.97], AF4:[715.94,193.97], AF5:[772.94,193.97], AF6:[750.45,193.97], AFJTV:[873.02,193.97], AFXF2:[873.02,193.97], AR1:[747.5,184], AR2:[597,184], AR3:[737,184], CC1:[696.66,203.36], CC2:[696.66,203.36], CC3:[696.66,203.36], NS1:[681.98,137.97], NS2:[681.98,137.97], ON1:[726.39,137.97], ON2:[726.39,137.97], HO1:[726.39,193.97], HO2:[726.39,193.97], HO3:[902.83,193.97], HO4:[902.83,193.97], RVRP:[680.56,184], RVR:[680.56,184], RSR:[680.56,184], RHR:[652.56,184], RWR:[652.56,184], RTR:[680.38,202.02], XM1:[793.98,193.97], XM2:[793.98,193.97] };
export function visibleLaunchers(config, style) {
  const defaults = /^(AF|HO|ON|RV|RH|RW|RS|RT)/.test(style) || style === 'AL1' ? 4 : /^(CC|XM)/.test(style) ? 2 : /^NS/.test(style) ? 1 : 0;
  let count = 0;
  for (let index = 1; index <= configuredSlots(config,defaults); index++) {
    const value = config[`app_launch_${index}`];
    if (value !== 'hidden' && (value || index <= defaults)) count++;
  }
  return count;
}
export function renderedDimensions(root) {
  const body = root?.querySelector('ha-card')?.getBoundingClientRect();
  if (!body?.height || !body.width) return undefined;
  const status = root.querySelector('[data-action-status]:not([hidden])')?.getBoundingClientRect();
  return {height: Math.ceil(Math.max(body.bottom,status?.bottom || body.bottom) - Math.min(body.top,status?.top || body.top)),width:Math.ceil(Math.max(body.width,status?.width || 0))};
}
export function cardDimensions(config, {rootFontSize = 14, availableWidth = 360} = {}) {
  const style = deviceAttribute('defaultRemoteStyle', config);
  const count = visibleLaunchers(config,style);
  let [height, width] = sizes[style] || [500,260];
  const capacity = SLOT_CAPACITY[style];
  if (capacity && count > capacity) {
    const columns = style === 'RTR' ? 1 : /^(AR|CC|NS|RV|RH|RW|RS)/.test(style) ? 2 : 3;
    height += (Math.ceil(count / columns) - Math.ceil(capacity / columns)) * 70;
  }
  if (style === 'AL1' || style === 'AL2') {
    const launcherScale = (config.scale + (style === 'AL2' ? config.app_launcher_relative_size : 0)) / 100 * 2;
    const unit = rootFontSize * launcherScale;
    const padding = rootFontSize * config.scale / 100 * 2 * (2.8 + 0.28);
    const columns = Math.max(1, Math.floor((availableWidth - rootFontSize * config.scale / 100 * 2 * (1.428 + 0.28) + unit * 0.9) / (unit * (5.714 + 0.9))));
    const rows = Math.ceil(count / columns);
    const appHeight = rows * unit * 2 + Math.max(0,rows - 1) * unit * 0.9;
    // AL controls wrap with available width; measured bounds replace this initial estimate.
    const controls = style === 'AL2' ? rootFontSize * config.scale / 100 * (availableWidth < 500 ? 29 : 24) : 0;
    let pixels = padding + appHeight + controls;
    if (config.visible_name_text && ['top','bottom'].includes(config.name_position)) pixels += rootFontSize * 2;
    if (config.show_version_number) pixels += rootFontSize * 1.5;
    return {height:Math.ceil(pixels),width:availableWidth};
  }
  if (['CC1','CC2','CC3'].includes(style) && config.show_media_controls) height += 60;
  if (config.visible_name_text && ['top','bottom'].includes(config.name_position)) height += 30;
  if (config.show_version_number) height += 21;
  // Legacy dimensions use a 14px rem. Empty/sparse slots collapse in the view.
  const scale = config.scale / 100 * rootFontSize / 14;
  return { height: Math.ceil(height * scale), width: Math.ceil(width * scale) };
}
