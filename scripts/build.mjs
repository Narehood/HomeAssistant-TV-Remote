import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildOptions } from './build-options.mjs';

const result = await build(buildOptions);
const output = Object.entries(result.metafile.outputs).find(([file]) => file.endsWith('/HA-Firemote.js'));
if (!output || output[1].imports.length) throw new Error('The HACS artifact must be one self-contained module.');
const { readFile } = await import('node:fs/promises');
const bundle = await readFile('dist/HA-Firemote.js');
await mkdir('.test-results', { recursive: true });
await writeFile('.test-results/build-metafile.json', JSON.stringify(result.metafile, null, 2) + '\n');
await writeFile('dist/HA-Firemote.js.sha256', `${createHash('sha256').update(bundle).digest('hex')}  HA-Firemote.js\n`);
console.log(`Built self-contained HACS card: ${bundle.length.toLocaleString()} bytes.`);
