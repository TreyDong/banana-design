import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const notices = await readFile(new URL('../THIRD_PARTY_NOTICES.md', import.meta.url), 'utf8');
await build({
  absWorkingDir: fileURLToPath(new URL('..', import.meta.url)),
  entryPoints: ['src/main.js'], outfile: 'main.js', bundle: true,
  platform: 'node', format: 'cjs', target: 'es2022',
  // ssh2 的可选原生加速模块（cpu-features、sshcrypto.node）不打进包；缺失时 ssh2 自动回退纯 JS 实现。
  external: ['obsidian', 'electron', 'cpu-features', '*.node'],
  plugins: [{
    name: 'node-es2022-compatibility',
    setup(bundler) {
      bundler.onLoad({ filter: /node_modules[/\\]ssh2[/\\]lib[/\\]protocol[/\\]node-fs-compat\.js$/ }, async ({ path }) => {
        const source = await readFile(path, 'utf8');
        // The ES2022 host supports BigInt directly. Avoid ssh2's legacy dynamic
        // syntax probe, without changing its error handling or SSH behavior.
        const probe = "return new Function('return 2n ** 32n')();";
        if (source.split(probe).length !== 2) throw new Error('Review ssh2 BigInt compatibility shim after dependency changes');
        return { contents: source.replace(probe, 'return 2n ** 32n;'), loader: 'js' };
      });
      bundler.onLoad({ filter: /node_modules[/\\]core-js[/\\]modules[/\\]_global\.js$/ }, async ({ path }) => {
        const source = await readFile(path, 'utf8');
        // globalThis is available in the ES2022 host; no dynamic global lookup is needed.
        const probe = "Function('return this')()";
        if (source.split(probe).length !== 2) throw new Error('Review core-js global lookup after dependency changes');
        return { contents: source.replace(probe, 'globalThis'), loader: 'js' };
      });
    },
  }],
  loader: { '.png': 'dataurl', '.svg': 'dataurl', '.webp': 'dataurl' }, minify: false,
  banner: { js: '/*\n' + notices.replaceAll('*/', '* /') + '\n*/' },
  logLevel: 'info',
});
