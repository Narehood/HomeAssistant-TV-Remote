/* global window, document, PointerEvent, KeyboardEvent, MouseEvent, innerWidth */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const root = resolve('.');
const allowed = ['/dev/index.html', '/dev/preview.js', '/dist/HA-Firemote.js', '/src/supported-devices.js'];
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const pathname = url.pathname === '/dev/' ? '/dev/index.html' : url.pathname;
  if (!allowed.includes(pathname)) { response.writeHead(404); response.end(); return; }
  const file = resolve(root, '.' + pathname);
  if (!file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
  try {
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type': extname(file) === '.html' ? 'text/html; charset=utf-8' : 'text/javascript; charset=utf-8' });
    response.end(data);
  } catch { response.writeHead(404); response.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const executablePath = process.env.TV_REMOTE_BROWSER_PATH || (process.platform === 'win32' && existsSync(chromePath) ? chromePath : undefined);
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${address.port}/dev/?production`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.tvRemoteTest);
  const results = await page.evaluate(async () => {
    const { models, configFor, createCard, calls } = window.tvRemoteTest;
    const rows = [];
    document.querySelector('#cards').replaceChildren();
    for (const model of models) {
      const card = createCard(configFor(model));
      document.querySelector('#cards').append(card);
      await card.updateComplete;
      const body = card.shadowRoot?.querySelector('ha-card');
      const bounds = body?.getBoundingClientRect();
      rows.push({ model: model.model, family: model.family, rendered: !!body, height: bounds?.height || 0, buttons: body?.querySelectorAll('button').length || 0, masonryUnits: card.getCardSize(), grid: card.getGridOptions() });
      card.remove();
    }
    const model = models.find(item => item.family === 'roku');
    const card = createCard(configFor(model));
    document.querySelector('#cards').append(card);
    await card.updateComplete;
    calls.length = 0;
    const button = card.shadowRoot.querySelector('#up-button');
    if (!button) throw new Error('Roku fixture is missing its D-pad.');
    button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true, pointerId: 1, isPrimary: true, button: 0 }));
    button.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true, pointerId: 1, isPrimary: true, button: 0 }));
    await new Promise(resolve => setTimeout(resolve, 50));
    const clickCalls = calls.splice(0);
    button.focus();
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    button.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, composed: true }));
    await new Promise(resolve => setTimeout(resolve, 50));
    return { rows, clickCalls, keyboardCalls: calls.splice(0) };
  });
  assert(results.rows.length >= 56, 'The browser must cover every existing device model.');
  for (const row of results.rows) {
    assert(row.rendered && row.height > 0, `Empty browser rendering for ${row.model}`);
    assert(row.buttons > 0, `No controls rendered for ${row.model}`);
    assert(row.masonryUnits * 50 >= row.height && row.masonryUnits * 50 < row.height + 51, `${row.model} must reserve its rendered height in masonry.`);
  }
  assert.equal(results.clickCalls.length, 1, 'A D-pad tap must dispatch once.');
  assert.equal(results.keyboardCalls.length, 1, 'Enter must activate the D-pad once.');
  assert.equal(results.keyboardCalls[0].domain, 'remote');
  assert.equal(results.keyboardCalls[0].data.command, 'up');
  // Native events include the browser's generated click after pointer/keyboard activation.
  await page.evaluate(() => { window.tvRemoteTest.calls.length = 0; });
  const up = page.locator('firemote-card').locator('#up-button');
  await up.click();
  await up.press('Enter');
  await up.press('Space');
  await page.waitForTimeout(50);
  const nativeCalls = await page.evaluate(() => window.tvRemoteTest.calls.splice(0));
  assert.equal(nativeCalls.length, 3, 'Native pointer, Enter, and Space must each dispatch once.');
  assert(nativeCalls.every(call => call.domain === 'remote' && call.data.command === 'up'));
  // A held control must stop on cancellation, even without pointerup on the button.
  await up.dispatchEvent('pointerdown', { pointerId: 7, isPrimary: true, button: 0 });
  await page.waitForTimeout(800);
  await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 7 })));
  const heldCount = await page.evaluate(() => window.tvRemoteTest.calls.length);
  assert(heldCount > 0, 'The held-control fixture must actually begin dispatching.');
  await page.waitForTimeout(400);
  assert.equal(await page.evaluate(() => window.tvRemoteTest.calls.length), heldCount, 'Cancelled hold must stop dispatching.');

  const configuration = await page.evaluate(async () => {
    const { models, configFor, createCard, hass, calls } = window.tvRemoteTest;
    const host = document.querySelector('#cards');
    const fire = models.find(model => model.family === 'amazon-fire');
    const hostile = '<img src=x onerror="window.__injected=true">';
    const raw = {
      ...configFor(fire), app_launch_1: `customlauncher ${hostile}`, app_launch_2: 'hidden',
      custom_launchers: { friendly_name: hostile, label: hostile, icon: 'mdi:home" onerror="window.__injected=true', script: 'movie' },
      button_overrides: { 'power-button': { hidden: true } },
    };
    const card = createCard(raw); host.replaceChildren(card); await card.updateComplete;
    const launcher = [...card.shadowRoot.querySelectorAll('button')].find(button => button.id === `customlauncher ${hostile}-button`);
    const safe = !!launcher && !card.shadowRoot.querySelector('[onerror],script,img') && !window.__injected;
    const hidden = card.shadowRoot.querySelector('#power-button');
    const hiddenCannotActivate = hidden.disabled && hidden.tabIndex === -1;
    calls.length = 0;
    launcher.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
    await new Promise(resolve => setTimeout(resolve, 50));
    const customCalls = calls.splice(0);
    const editorConfig = Object.freeze({ ...configFor(fire), app_launch_99: 'netflix', app_launch_2: '', extension: Object.freeze({ keep: 42 }) });
    const editor = document.createElement('firemote-card-editor');
    editor.hass = hass; editor.setConfig(editorConfig);
    let changes = 0, changed;
    editor.addEventListener('config-changed', event => { changes++; changed = event.detail.config; });
    host.append(editor); await editor.updateComplete;
    const untouched = changes === 0 && editorConfig.extension.keep === 42;
    const selectors = editor.shadowRoot.querySelectorAll('select[name^="app_launch_"]').length;
    const name = editor.shadowRoot.querySelector('#visible_name_text');
    name.value = 'Living room'; name.dispatchEvent(new Event('change', { bubbles: true })); await editor.updateComplete;
    const preserved = changes === 1 && changed.extension.keep === 42 && changed.app_launch_99 === 'netflix' && changed.app_launch_2 === '';
    editor.remove();
    const dimensions = [];
    for (const style of ['AL1', 'AL2']) {
      for (const slot of [4, 30]) {
        const apps = Object.fromEntries(Array.from({ length: slot }, (_, index) => [`app_launch_${index + 1}`, 'netflix']));
        const appCard = createCard({ ...configFor(fire), defaultRemoteStyle_override: style, ...apps });
        host.replaceChildren(appCard); await appCard.updateComplete;
        dimensions.push({ style, slot, height: appCard.shadowRoot.querySelector('ha-card').getBoundingClientRect().height, grid: appCard.getGridOptions(), masonry: appCard.getCardSize() });
      }
    }
    const android = models.find(model => model.family === 'nvidia-shield' && model.defaultRemoteStyle === 'NS2');
    const androidConfig = { ...configFor(android), control_mode: 'android-tv-remote', app_launch_1: 'nuvio' };
    const remote = hass.states[androidConfig.android_tv_remote_entity];
    const previousFeatures = remote.attributes.supported_features;
    remote.attributes.supported_features = 4;
    const modern = createCard(androidConfig); host.replaceChildren(modern); await modern.updateComplete;
    calls.length = 0;
    for (const id of ['up-button', 'center-button', 'nuvio-button']) {
      modern.shadowRoot.getElementById(id).click();
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    const originalPrompt = window.prompt;
    try {
      window.prompt = () => 'literal "$() text';
      modern.shadowRoot.getElementById('keyboard-button').click();
      await new Promise(resolve => setTimeout(resolve, 10));
    } finally { window.prompt = originalPrompt; remote.attributes.supported_features = previousFeatures; }
    const modernCalls = calls.splice(0);
    const roku = models.find(model => model.family === 'roku');
    host.replaceChildren(createCard(configFor(roku)));
    return { safe, hiddenCannotActivate, customCalls, untouched, selectors, preserved, dimensions, modernCalls };
  });
  assert(configuration.safe, 'Hostile configured text must not become markup or event attributes.');
  assert(configuration.hiddenCannotActivate, 'Hidden controls must be disabled and unfocusable.');
  assert.equal(configuration.customCalls.length, 1, 'Assistive click must activate a custom launcher once.');
  assert.equal(configuration.customCalls[0].domain, 'script');
  assert(configuration.untouched && configuration.preserved, 'Editor must preserve advanced and sparse YAML through an intentional edit.');
  assert(configuration.selectors > 0 && configuration.selectors < 30, 'Editor must create configured fields on demand.');
  for (const style of ['AL1', 'AL2']) {
    const small = configuration.dimensions.find(item => item.style === style && item.slot === 4);
    const large = configuration.dimensions.find(item => item.style === style && item.slot === 30);
    assert(large.height > small.height && large.grid.rows > small.grid.rows && large.masonry > small.masonry, `${style} must account for added app rows: ${JSON.stringify({ small, large })}`);
  }
  assert.deepEqual(configuration.modernCalls.map(call => [call.domain, call.service, call.data.command || call.data.activity]), [
    ['remote', 'send_command', 'DPAD_UP'],
    ['remote', 'send_command', 'DPAD_CENTER'],
    ['remote', 'turn_on', 'com.nuvio.tv'],
    ['remote', 'send_command', 'text:literal "$() text'],
  ], 'Opt-in Android TV Remote must navigate, launch a new catalog app, and send structured text without ADB.');
  results.nativeCalls = nativeCalls;
  results.cancelledHoldCalls = heldCount;
  results.configuration = configuration;
  await page.evaluate(() => { window.tvRemoteTest.calls.length = 0; });
  await up.focus();
  await page.keyboard.down('Space');
  await page.waitForTimeout(750);
  await page.locator('#edit').focus();
  await page.keyboard.up('Space');
  const focusDepartureCalls = await page.evaluate(() => window.tvRemoteTest.calls.length);
  assert(focusDepartureCalls > 0, 'Keyboard focus test must begin a held action.');
  await page.waitForTimeout(400);
  assert.equal(await page.evaluate(() => window.tvRemoteTest.calls.length), focusDepartureCalls, 'Moving keyboard focus outside the card must stop the held action.');
  results.keyboardFocusDepartureCalls = focusDepartureCalls;
  assert.deepEqual(errors, [], 'Browser must have no unhandled runtime errors.');
  await page.setViewportSize({ width: 390, height: 844 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert.equal(overflow, false, 'The mobile fixture must not overflow horizontally.');
  await mkdir('.test-results', { recursive: true });
  await page.screenshot({ path: '.test-results/card-mobile.png', fullPage: true });
  await writeFile('.test-results/browser-smoke.json', JSON.stringify(results, null, 2) + '\n');
  console.log(`Browser verified ${results.rows.length} presets, native pointer/keyboard input, hold cancellation, safe rendering, editor preservation, launcher sizing, and mobile bounds.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
