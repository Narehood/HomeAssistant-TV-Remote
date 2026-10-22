import { rosettaStone, translationCoverage } from '../language-translations.js';
export function locale(hass) { return (hass?.language || hass?.config?.language || 'en').replace(/_/g, '-'); }
export function translate(hass, key) {
  const language = locale(hass).toLowerCase();
  const exact = Object.keys(rosettaStone).find(key => key.toLowerCase() === language);
  const base = language.split('-')[0];
  return translationCoverage[exact]?.includes(key) ? rosettaStone[exact][key] : translationCoverage[base]?.includes(key) ? rosettaStone[base][key] : rosettaStone.en?.[key] ?? key;
}
export function direction(hass) { return /^(ar|he|fa|ur)(-|$)/i.test(locale(hass)) ? 'rtl' : 'ltr'; }
