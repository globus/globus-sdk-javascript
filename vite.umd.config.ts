import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'globus',
      formats: ['iife'],
      fileName: () => 'globus.production.js',
    },
    outDir: 'dist/umd',
    rollupOptions: {
      external: [], // bundle all deps (matches current esbuild config)
    },
  },
});
