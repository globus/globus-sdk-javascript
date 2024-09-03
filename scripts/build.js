const { join } = require('node:path');
const fs = require('node:fs');
const { buildSync } = require('esbuild');
const tsconfig = require('../tsconfig.json');

const { dependencies, peerDependencies, version } = require('../package.json');

const opts = {
  entryPoints: tsconfig.files,
  absWorkingDir: join(__dirname, '..'),
  bundle: true,
  sourcemap: true,
  external: Object.keys({ ...dependencies, ...peerDependencies }),
};

// buildSync({
//   ...opts,
//   bundle: false,
//   platform: 'neutral',
//   format: 'esm',
//   outdir: 'dist/esm',
//   packages: 'external',
//   external: [],
// });

fs.writeFileSync(
  'dist/esm/package.json',
  JSON.stringify(
    {
      type: 'module',
      version,
    },
    null,
    2,
  ),
);

buildSync({
  ...opts,
  platform: 'node',
  format: 'cjs',
  outdir: 'dist/cjs',
});

buildSync({
  ...opts,
  minify: true,
  platform: 'browser',
  format: 'iife',
  globalName: 'globus',
  outdir: 'dist/umd',
});
