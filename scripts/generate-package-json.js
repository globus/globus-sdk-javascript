// #!/usr/bin/env node

/* eslint-disable */

/**
 * This script generates a publishable package.json file for the SDK from the
 * repository's root package.json file.
 *
 * The generated package.json file differs from the root package.json file in
 * the following ways:
 *
 * - Removes `dist/` from paths to entry points (e.g. main, module, types, exports); Our Lerna publish script
 * will publish the contents of the `dist` folder as the package **not** the directory itself.
 * - Removes unnecessary properties for upstream consumers (e.g. scripts, devDependencies, etc.)
 *
 * These changes can only happen pre-publish because the initial `package.json` property values are required for local development (`nx`)
 */
const fs = require("node:fs");
const path = require("node:path");
const package = require("../package.json");

const { devDependencies } = package;

package.main = package.main.replace("dist/", "");
package.module = package.module.replace("dist/", "");
package.types = package.types.replace("dist/", "");

// @todo - Removed due to TypeScript's spotty ESM support for `types` field.
// Object.keys(package.exports).forEach((entry) => {
//   Object.keys(package.exports[entry]).forEach((ref) => {
//     package.exports[entry][ref] = package.exports[entry][ref].replace(
//       "dist/",
//       ""
//     );
//   });
// });

delete package.lerna;
delete package.scripts;
delete package.devDependencies;
delete package.files;

fs.writeFileSync(
  path.join(__dirname, "../dist/package.json"),
  JSON.stringify(package, null, 2),
  "utf-8"
);

fs.writeFileSync(
  path.join(__dirname, "../dist/esm/package.json"),
  JSON.stringify(
    {
      type: "module",
    },
    null,
    2
  ),
  "utf-8"
);

fs.writeFileSync(
  path.join(__dirname, "../dist/cjs/package.json"),
  JSON.stringify(
    {
      type: "commonjs",
      dependencies: {
        tslib: devDependencies.tslib,
      },
    },
    null,
    2
  ),
  "utf-8"
);
