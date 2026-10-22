import { context } from 'esbuild';
import { buildOptions } from './build-options.mjs';

const ctx = await context({ ...buildOptions, outfile: 'dev/HA-Firemote.js', minify: false });
await ctx.watch();
const port = Number(process.env.TV_REMOTE_PORT || 5173);
await ctx.serve({ servedir: '.', host: '127.0.0.1', port });
console.log(`Card preview: http://127.0.0.1:${port}/dev/`);
const shutdown = async () => { await ctx.dispose(); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
