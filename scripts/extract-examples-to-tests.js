/**
 * This script parses our `examples` directory and extracts the code examples
 * for use in our tests.
 *
 * This ensures that our examples are always up-to-date with our codebase.
 */
const fs = require('node:fs');
const path = require('node:path');

const EXAMPLES_DIR = path.join(__dirname, '../examples');
const E2E_TEST_DIR = path.join(__dirname, '../e2e/www');

const E2E_TESTS = [
  {
    name: 'basic',
    path: path.join(EXAMPLES_DIR, 'basic/index.html'),
  },
];

export default function extract() {
  E2E_TESTS.forEach((test) => {
    const content = fs
      .readFileSync(test.path, 'utf-8')
      /**
       * Replace the CDN-loaded script with the local script.
       */
      .replace(
        '<script src="https://unpkg.com/@globus/sdk/dist/umd/globus.production.js"></script>',
        `
        <script src="../../dist/umd/globus.production.js"></script>
        <script>globalThis.GLOBUS_SDK_ENVIRONMENT = 'preview';</script>
        `,
      )
      .replace('COLLECTION_ID', 'dc20d9c0-1fb7-4aee-91e9-2d301197d126')
      /**
       * @see https://app.preview.globus.org/settings/developers/projects/920de059-1f67-42e5-a70f-aef148ad4efe/apps
       */
      .replace('GLOBUS_APPLICATION_ID', 'cae06dd5-6db5-4013-a7e0-b5b2dc4d5fa9');
    fs.writeFileSync(path.join(E2E_TEST_DIR, `examples/${test.name}.html`), content);
  });
}
