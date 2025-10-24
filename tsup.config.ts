import { defineConfig } from 'tsup';
import { readFile } from 'fs/promises';

export default defineConfig(async () => {
  const tsConfig = JSON.parse(
    await readFile('./tsconfig.json', 'utf-8')
  );

  return {
    entry: ['src/index.ts'],
    treeshake: true,
    sourcemap: 'inline',
    minify: true,
    clean: true,
    dts: true,
    splitting: false,
    format: ['cjs', 'esm'],
    external: ['react'],
    injectStyle: true,
    tsconfig: './tsconfig.json',
    alias: tsConfig.compilerOptions.paths ?
      Object.fromEntries(
        Object.entries(tsConfig.compilerOptions.paths).map(([key, value]) => [
          key.replace('/*', ''),
          (Array.isArray(value) ? value[0] : value).replace('/*', '')
        ])
      ) : {},
  };
});
