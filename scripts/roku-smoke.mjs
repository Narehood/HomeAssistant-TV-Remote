/* global window, document */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';
import { Window } from 'happy-dom';

// Opt-in hardware test. Never called by check, test, browser smoke, or CI.
const rokuAddress = process.argv[process.argv.indexOf('--host') + 1];
if (!process.argv.includes('--host') || !/^[a-z\d.-]+$/i.test(rokuAddress || '')) throw new Error('Usage: npm run test:roku -- --host <Roku-IP-or-hostname>. This test navigates Home, launches installed YouTube/ZITOTV2GO, then restores the previous app.');
const deviceUrl = `http://${rokuAddress}:8060`;
const xmlWindow = new Window();
const parser = new xmlWindow.DOMParser();
const commands = { home: 'Home', up: 'Up', down: 'Down', left: 'Left', right: 'Right', back: 'Back' };
const appCases = [{ id: 'youtube', source: 'YouTube', channel: '837' }, { id: 'zitotv2go', source: 'ZITOTV2GO', channel: '578206' }];
const requests = [];
async function ecp(path, method = 'GET') {
  const response = await fetch(`${deviceUrl}/${path}`, { method, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Roku ${path} returned HTTP ${response.status}`);
  return response.text();
}
const xml = text => parser.parseFromString(text, 'application/xml');
const activeApp = async () => {
  const node = xml(await ecp('query/active-app')).querySelector('app');
  return { id: node?.getAttribute('id') || '', name: node?.textContent || '' };
};
async function waitApp(expected) {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    const active = await activeApp();
    if (active.id === expected) return active;
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  throw new Error(`Roku did not report app ${expected} in the foreground`);
}
const info = xml(await ecp('query/device-info'));
const pick = field => info.querySelector(field)?.textContent || '';
const device = { vendor: pick('vendor-name'), model: pick('model-name'), modelNumber: pick('model-number'), os: pick('software-version'), build: pick('software-build'), region: pick('model-region') };
assert.equal(pick('is-tv'), 'true', 'This fixture uses the generic Hisense Roku TV preset.');
assert.equal(device.vendor, 'Hisense', 'Select a matching preset before testing another Roku model.');
const apps = [...xml(await ecp('query/apps')).querySelectorAll('app')].map(node => ({ id: node.getAttribute('id'), name: node.textContent }));
const installed = appCases.filter(app => apps.some(item => item.id === app.channel && item.name === app.source));
const original = await activeApp();
const assets = new Map([
  ['/dev/', ['dev/index.html', 'text/html']], ['/dev/preview.js', ['dev/preview.js', 'text/javascript']],
  ['/dist/HA-Firemote.js', ['dist/HA-Firemote.js', 'text/javascript']], ['/src/supported-devices.js', ['src/supported-devices.js', 'text/javascript']],
]);
const server = createServer(async (request, response) => {
  try {
    const path = new URL(request.url, 'http://localhost').pathname;
    if (request.method === 'POST' && path === '/roku-service') {
      assert.equal(request.headers['content-type'], 'application/json');
      assert.equal(request.headers.origin, `http://127.0.0.1:${server.address().port}`);
      let input = '';
      for await (const chunk of request) { input += chunk; assert(input.length < 4096); }
      const action = JSON.parse(input);
      if (action.domain === 'remote' && action.service === 'send_command') {
        assert.equal(action.target?.entity_id, 'remote.roku_live');
        assert(Object.hasOwn(commands, action.data.command), 'Only navigation keys are permitted.');
        assert.equal(action.data.num_repeats || 1, 1);
        await ecp(`keypress/${commands[action.data.command]}`, 'POST');
      } else if (action.domain === 'media_player' && action.service === 'select_source') {
        assert.equal(action.target?.entity_id, 'media_player.roku_live');
        const app = installed.find(item => item.source === action.data.source);
        assert(app, 'Only the discovered fixture apps may be launched.');
        await ecp(`launch/${app.channel}`, 'POST');
        await waitApp(app.channel);
      } else throw new Error('Live fixture does not implement that Home Assistant action.');
      requests.push(action);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ active: await activeApp() }));
      return;
    }
    const asset = request.method === 'GET' && assets.get(path);
    if (!asset) { response.writeHead(404); response.end(); return; }
    response.writeHead(200, { 'Content-Type': `${asset[1]}; charset=utf-8` });
    response.end(await readFile(asset[0]));
  } catch (error) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: error.message }));
  }
});
let browser;
let restore;
const results = { device, transport: 'Direct Roku ECP through a restricted test bridge; not a Home Assistant instance', appCases: [], navigation: [], checks: [] };
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const executablePath = process.env.TV_REMOTE_BROWSER_PATH || (process.platform === 'win32' && existsSync(chromePath) ? chromePath : undefined);
  browser = await chromium.launch({ headless: true, executablePath });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/dev/?production`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.tvRemoteTest);
  await page.evaluate(async ({ apps, installed, original }) => {
    const { hass } = window.tvRemoteTest;
    const player = 'media_player.roku_live';
    const remote = 'remote.roku_live';
    const card = document.createElement('firemote-card');
    const attributes = { source_list: ['Home', ...apps.map(app => app.name)], app_name: original.name, app_id: original.id, source: original.name };
    const environment = { ...hass, states: { ...hass.states, [player]: { state: 'on', attributes }, [remote]: { state: 'on', attributes: {} } } };
    window.rokuLive = { card, pending: 0, errors: [] };
    environment.callService = async (domain, service, data, target) => {
      window.rokuLive.pending++;
      try {
        const response = await fetch('/roku-service', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ domain, service, data, target }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        const next = { ...card.hass, states: { ...card.hass.states, [player]: { state: 'on', attributes: { ...attributes, app_name: result.active.name, app_id: result.active.id, source: result.active.name } } } };
        card.hass = next;
      } catch (error) { window.rokuLive.errors.push(error.message); throw error; }
      finally { window.rokuLive.pending--; }
    };
    card.setConfig({ type: 'custom:firemote-card', entity: player, roku_remote_entity: remote, device_family: 'roku', device_type: 'roku-generic-hisense', app_launch_1: installed[0]?.id || 'hidden', app_launch_2: installed[1]?.id || 'hidden', app_launch_3: 'hidden', app_launch_4: 'hidden' });
    card.hass = environment;
    document.querySelector('#cards').replaceChildren(card);
    await card.updateComplete;
  }, { apps, installed, original });
  const idle = () => page.waitForFunction(() => window.rokuLive.pending === 0, undefined, { timeout: 20000 });
  const button = id => page.locator('firemote-card').locator(`#${id}-button`);
  for (const key of ['home', 'up', 'down', 'back']) {
    await button(key).click(); await idle();
    results.navigation.push({ key, accepted: requests.at(-1)?.data.command === key });
  }
  const beforeKeyboard = requests.length;
  await button('home').press('Enter'); await idle();
  assert.equal(requests.length, beforeKeyboard + 1, 'Enter must dispatch once.');
  assert.equal(requests.at(-1).data.command, 'home');
  results.checks.push('Keyboard Enter dispatched Home once');
  const up = button('up');
  const beforeHold = requests.length;
  await up.dispatchEvent('pointerdown', { pointerId: 3, isPrimary: true, button: 0 });
  await page.waitForTimeout(1100);
  await up.dispatchEvent('pointercancel', { pointerId: 3, isPrimary: true, button: 0 });
  await idle();
  const afterCancel = requests.length;
  assert(afterCancel > beforeHold + 1, 'The hardware fixture must dispatch repeats.');
  await page.waitForTimeout(600);
  assert.equal(requests.length, afterCancel, 'Cancelled hold must stop device requests.');
  results.checks.push('Held Up repeated and pointer cancellation stopped all further ECP requests');
  for (const app of installed) {
    await button(app.id).click(); await idle();
    const foreground = await activeApp();
    assert.equal(foreground.id, app.channel);
    const highlighted = await button(app.id).evaluate(element => element.classList.contains('appActive'));
    assert(highlighted, `${app.source} must highlight from reported device state`);
    results.appCases.push({ catalogId: app.id, channelId: app.channel, version: xml(await ecp('query/apps')).querySelector(`app[id="${app.channel}"]`)?.getAttribute('version'), foregroundConfirmed: true, cardHighlighted: true });
  }
  assert(results.navigation.every(item => item.accepted));
  assert.deepEqual(await page.evaluate(() => window.rokuLive.errors), []);
  assert.deepEqual(errors, []);
  results.passed = true;
} finally {
  await browser?.close();
  if (server.listening) await new Promise(resolve => server.close(resolve));
  try {
    if (original.id && !['11', 'Roku'].includes(original.id)) { await ecp(`launch/${encodeURIComponent(original.id)}`, 'POST'); restore = (await waitApp(original.id)).id === original.id; }
    else { await ecp('keypress/Home', 'POST'); restore = true; }
  } finally {
    results.originalAppRestored = restore === true;
    results.requestCount = requests.length;
    await mkdir('.test-results', { recursive: true });
    await writeFile('.test-results/roku-live.json', JSON.stringify(results, null, 2) + '\n');
    await xmlWindow.happyDOM.close();
  }
}
console.log(JSON.stringify(results, null, 2));
