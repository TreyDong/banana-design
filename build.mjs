import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const notices = await readFile(new URL('./THIRD_PARTY_NOTICES.md', import.meta.url), 'utf8');
await build({
  absWorkingDir: fileURLToPath(new URL('.', import.meta.url)),
  entryPoints: ['src/main.js'], outfile: 'main.js', bundle: true,
  platform: 'node', format: 'cjs', target: 'es2022', external: ['obsidian', 'electron'],
  loader: { '.png': 'dataurl', '.svg': 'dataurl' }, minify: false,
  banner: { js: '/*\n' + notices.replaceAll('*/', '* /') + '\n*/' },
  logLevel: 'info',
});
