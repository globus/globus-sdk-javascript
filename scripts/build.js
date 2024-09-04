const { join } = require('node:path');
const fs = require('node:fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { buildSync } = require('esbuild');
const tsconfig = require('../tsconfig.package.json');

const { dependencies, peerDependencies, version } = require('../package.json');

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

const opts = {
  entryPoints: tsconfig.files,
  absWorkingDir: join(__dirname, '..'),
  bundle: true,
  sourcemap: true,
  external: Object.keys({ ...dependencies, ...peerDependencies }),
};

/**
 * The ESM build is currently built by TCS (in order to preserve modules), so we don't need to build it here.
 */
// buildSync({
//   ...opts,
//   bundle: false,
//   platform: 'neutral',
//   format: 'esm',
//   outdir: 'dist/esm',
//   packages: 'external',
//   external: [],
// });

buildSync({
  ...opts,
  platform: 'node',
  format: 'cjs',
  outdir: 'dist/cjs',
});

buildSync({
  ...opts,
  entryPoints: [{ in: 'src/index.ts', out: 'globus.production' }],
  minify: true,
  platform: 'browser',
  format: 'iife',
  globalName: 'globus',
  outdir: 'dist/umd',
  external: [],
});
