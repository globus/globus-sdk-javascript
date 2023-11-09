// #!/usr/bin/env node

/* eslint-disable */

/**
 * This script generates a publishable package.json file for the SDK from the
 * repository's root package.json file.
 *
 * The generated package.json file differs from the root package.json file in
 * the following ways:
 *
 * - Sets `private` to `false`
 * - Removes `dist/` from paths to entry points (e.g. main, module, types, exports).
 * - Removes unnecessary properties for upstream consumers (e.g. scripts, devDependencies, etc.).
 */
const fs = require('node:fs');
const path = require('node:path');
const pkg = require('../package.json');

const { devDependencies } = pkg;

pkg.private = false;
pkg.main = pkg.main.replace('dist/', '');
pkg.module = pkg.module.replace('dist/', '');
pkg.types = pkg.types.replace('dist/', '');

delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.files;

fs.writeFileSync(
  path.join(__dirname, '../dist/package.json'),
  JSON.stringify(pkg, null, 2),
  'utf-8',
);

fs.writeFileSync(
  path.join(__dirname, '../dist/esm/package.json'),
  JSON.stringify(
    {
      type: 'module',
    },
    null,
    2,
  ),
  'utf-8',
);

fs.writeFileSync(
  path.join(__dirname, '../dist/cjs/package.json'),
  JSON.stringify(
    {
      type: 'commonjs',
      dependencies: {
        tslib: devDependencies.tslib,
      },
    },
    null,
    2,
  ),
  'utf-8',
);
