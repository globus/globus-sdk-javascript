const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import-x');
const globals = require('globals');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = tseslint.config(
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
  js.configs.recommended,
  {
    linterOptions: {
      // Matches ESLint v8 behavior; ESLint v9+ defaults to "warn".
      reportUnusedDisableDirectives: 'off',
    },
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
    },
    plugins: {
      // Registered as `import` so existing `eslint-disable` directives continue to apply.
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import-x/resolver-next': [importPlugin.createNodeResolver()],
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'scripts/**/*.*',
            '**/__tests__/**',
            '**/__mocks__/**',
            '**/*.spec.ts',
            'eslint.config.js',
            'jest.config.ts',
            'jest.setup.ts',
          ],
          optionalDependencies: false,
        },
      ],
      /**
       * Rules (and options) carried over from `eslint-config-airbnb-base`.
       */
      'class-methods-use-this': 'error',
      'no-await-in-loop': 'error',
      'no-underscore-dangle': [
        'error',
        {
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true,
        },
      ],
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', caughtErrors: 'none', ignoreRestSiblings: true },
      ],
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
      /**
       * Rules from `@eslint/js` (recommended) that were not enforced previously.
       */
      'no-useless-assignment': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended],
    rules: {
      /**
       * Rules (and options) carried over from `eslint-config-airbnb-typescript`.
       */
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', caughtErrors: 'none', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: true, classes: true, variables: true },
      ],
      /**
       * Rules from `typescript-eslint` (recommended) that were not enforced previously.
       */
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
    },
  },
  prettierConfig,
);
