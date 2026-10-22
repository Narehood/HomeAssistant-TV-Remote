import { readFile } from 'node:fs/promises';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

export const buildOptions = {
  entryPoints: ['src/index.ts'],
  outfile: 'dist/HA-Firemote.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2021'],
  charset: 'utf8',
  minify: true,
  legalComments: 'inline',
  metafile: true,
  define: { __CARD_VERSION__: JSON.stringify(`v${version}`) },
  banner: { js: `/* Home Assistant TV Remote v${version} | Narehood fork of PRProd/HA-Firemote | GPL-3.0 | See LICENSE and THIRD_PARTY_NOTICES.md */` },
};
