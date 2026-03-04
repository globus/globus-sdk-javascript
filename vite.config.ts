import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pkg from './package.json';

const external = Object.keys({ ...pkg.dependencies, ...(pkg.peerDependencies ?? {}) });

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      exclude: [
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/__utils__/**',
      ],
      outDir: 'dist/esm',
      tsconfigPath: './tsconfig.package.json',
    }),
    {
      // Write dist/esm/package.json after build (was done in scripts/build.js)
      name: 'write-esm-package-json',
      apply: 'build' as const,
      closeBundle() {
        const dir = resolve(__dirname, 'dist/esm');
        mkdirSync(dir, { recursive: true });
        writeFileSync(
          resolve(dir, 'package.json'),
          JSON.stringify({ type: 'module', version: pkg.version }, null, 2),
        );
      },
    },
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
        constants: resolve(__dirname, 'src/constants.ts'),
        'services/globus-connect-server/client': resolve(
          __dirname,
          'src/services/globus-connect-server/client.ts',
        ),
        'core/info/index': resolve(__dirname, 'src/core/info/index.ts'),
        'core/authorization/index': resolve(__dirname, 'src/core/authorization/index.ts'),
      },
      external,
      preserveEntrySignatures: 'strict',
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].js',
        },
      ],
    },
  },
});
