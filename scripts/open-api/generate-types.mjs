// @ts-check
import fs from 'node:fs';
import path from 'node:path';

import openapiTS, { astToString } from 'openapi-typescript';

const OPEN_API_TYPES_DIR = path.resolve(import.meta.dirname, '../../src/open-api/types');

/**
 * @type {{ url: string; filename: string }[]}
 */
const SCHEMAS = [
  {
    url: 'https://globusonline.github.io/globus-flows/flows.openapi.yaml',
    filename: path.join(OPEN_API_TYPES_DIR, `flows.ts`),
  },
  {
    url: 'https://groups.api.globus.org/openapi.json',
    filename: path.join(OPEN_API_TYPES_DIR, `groups.ts`),
  },
  {
    url: 'https://timer.automate.globus.org/openapi.json',
    filename: path.join(OPEN_API_TYPES_DIR, `timers.ts`),
  },
  {
    url: 'https://compute.api.globus.org/openapi.json',
    filename: path.join(OPEN_API_TYPES_DIR, `compute.ts`),
  },
  {
    url: 'https://docs.globus.org/globus-connect-server/v5.4/api/api.js',
    filename: path.join(OPEN_API_TYPES_DIR, `gcs/v5.4.ts`),
  },
  {
    url: 'https://search.api.globus.org/autodoc/openapi.json',
    filename: path.join(OPEN_API_TYPES_DIR, `search.ts`),
  },
];

function generate() {
  SCHEMAS.forEach(async (schema) => {
    const ast = await openapiTS(new URL(schema.url), {
      emptyObjectsUnknown: true,
      /**
       * We're still using the `defaultNonNullable` option to stay compatible with the
       * types in `@globus/types`. The "gotcha" here is that many of the services use
       * `@default` to specify values that are not required (e.g., in update payloads).
       * For these cases, we'll override the type at the resource request level.
       * @since 5.x.x
       */
      defaultNonNullable: true,
    });
    const contents = astToString(ast);
    fs.writeFileSync(schema.filename, contents);
  });
}

generate();
