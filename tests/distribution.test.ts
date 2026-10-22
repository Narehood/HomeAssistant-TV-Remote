import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
import { models, modelConfig, mockHass } from './fixtures.js';
import '../dist/HA-Firemote.js';

interface RemoteCard extends HTMLElement {
  hass: ReturnType<typeof mockHass>;
  setConfig(config: Record<string, unknown>): void;
  updateComplete: Promise<boolean>;
}

test('the installed artifact registers the legacy card and editor without external imports', () => {
  expect(customElements.get('firemote-card')).toBeDefined();
  expect(customElements.get('firemote-card-editor')).toBeDefined();
  const bundle = readFileSync('dist/HA-Firemote.js', 'utf8');
  expect(bundle).toContain('Narehood');
  expect(bundle).not.toMatch(/from\s*["'](?:\.\/|https?:)/);
});

test.each(models)('the HACS bundle renders $family / $model with real Lit', async model => {
  const card = document.createElement('firemote-card') as RemoteCard;
  card.hass = mockHass();
  card.setConfig(modelConfig(model));
  document.body.append(card);
  await card.updateComplete;
  expect(card.shadowRoot?.querySelector('ha-card')).not.toBeNull();
  expect(card.shadowRoot?.textContent).not.toContain('Unknown entity');
});
