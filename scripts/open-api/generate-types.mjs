import fs from 'node:fs';
import path from 'node:path';

import openapiTS, { astToString } from 'openapi-typescript';

const OPEN_API_TYPES_DIR = path.resolve(import.meta.dirname, '../../src/open-api/types');

const SCHEMAS = [
  {
    url: 'https://groups.api.globus.org/openapi.json',
    filename: path.join(OPEN_API_TYPES_DIR, `groups.d.ts`),
  },
  {
    url: 'https://timer.automate.globus.org/openapi.json',
    filename: path.join(OPEN_API_TYPES_DIR, `timer.d.ts`),
  },
  {
    url: 'https://api2.funcx.org/openapi.json',
    filename: path.join(OPEN_API_TYPES_DIR, `compute.d.ts`),
  },
  {
    url: 'https://docs.globus.org/globus-connect-server/v5.4/api/api.js',
    filename: path.join(OPEN_API_TYPES_DIR, `gcs/v5.4.d.ts`),
  },
];

function generate() {
  SCHEMAS.forEach(async (schema) => {
    const ast = await openapiTS(new URL(schema.url), {
      emptyObjectsUnknown: true,
      defaultNonNullable: false,
    });
    const contents = astToString(ast);
    fs.writeFileSync(schema.filename, contents);
  });
}

generate();
