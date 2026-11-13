const { FlatCompat } = require('@eslint/eslintrc');
const globals = require('globals');
const prettierPlugin = require('eslint-plugin-prettier');

/**
 * `eslint-config-airbnb-base` and `eslint-config-airbnb-typescript` only ship legacy
 * (eslintrc) configurations, so they are translated to flat config using `FlatCompat`.
 */
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const TS_FILES = ['**/*.ts'];

module.exports = [
  {
    ignores: [
      '**/dist/',
      '**/coverage/',
      '**/docs/',
      '**/playwright-report/',
      // Auto-generated TypeScript files
      'src/open-api/types/',
    ],
  },
  ...compat.extends('airbnb-base', 'prettier'),
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.amd,
        ...globals.browser,
        ...globals.es2015,
        ...globals.jest,
        ...globals.node,
        globalThis: 'readonly',
      },
      /**
       * `eslint-plugin-import` only forwards `parserOptions` when parsing imported modules,
       * so the language options are mirrored here.
       */
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    settings: {
      // `eslint-plugin-import` cannot infer the parser for JavaScript modules under flat config.
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs'],
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['scripts/**/*.*', 'eslint.config.js'] },
      ],
    },
  },
  ...compat.extends('airbnb-typescript/base', 'prettier').map((config) => ({
    ...config,
    files: TS_FILES,
  })),
  {
    files: TS_FILES,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      'import/prefer-default-export': 'off', // Allowed based on many of our files being early-stage abstractions.
      'func-names': 'off', // Allowed based on our usage of `satisfies`
    },
  },
];
