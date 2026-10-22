import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { buildOptions } from './build-options.mjs';

const expectedRepository = 'https://github.com/Narehood/HomeAssistant-TV-Remote.git';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const hacs = JSON.parse(await readFile('hacs.json', 'utf8'));
assert.equal(pkg.repository.url, expectedRepository, 'Package metadata must target the Narehood fork.');
assert.equal(hacs.filename, 'HA-Firemote.js', 'Keep the existing HACS entry filename.');

const result = await build({ ...buildOptions, write: false });
const rebuilt = result.outputFiles.find(file => file.path.endsWith('HA-Firemote.js'));
assert(rebuilt, 'Build did not produce the HACS module.');
const installed = await readFile('dist/HA-Firemote.js');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
assert.equal(sha256(rebuilt.contents), sha256(installed), 'Committed HACS bundle differs from source. Run npm run build.');
const output = Object.values(result.metafile.outputs)[0];
assert.equal(output.imports.length, 0, 'HACS bundle must not require sidecar imports or CDNs.');
const javascript = (await readdir('dist')).filter(file => file.endsWith('.js'));
assert.deepEqual(javascript, ['HA-Firemote.js'], 'Only the self-contained card should be installed by HACS.');
const checksum = await readFile('dist/HA-Firemote.js.sha256', 'utf8');
assert.equal(checksum, `${createHash('sha256').update(installed).digest('hex')}  HA-Firemote.js\n`);
assert(installed.includes(Buffer.from(`v${pkg.version}`)), 'Bundle must include the release version.');
console.log('HACS metadata, self-contained bundle, source reproducibility, and checksum verified.');
