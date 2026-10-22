import { afterEach } from 'vitest';

// HA supplies these host elements. Use real DOM nodes while keeping service calls inert.
if (!customElements.get('ha-card')) customElements.define('ha-card', class extends HTMLElement {});
if (!customElements.get('ha-icon')) customElements.define('ha-icon', class extends HTMLElement {});

afterEach(() => {
  document.body.replaceChildren();
});
