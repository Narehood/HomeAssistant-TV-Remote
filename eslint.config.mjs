import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.test-results/**', 'docs/**', '.git/**'] },
  { ...js.configs.recommended, files: ['scripts/**/*.mjs', '*.mjs'], languageOptions: { globals: globals.node } },
  ...tseslint.configs.recommended.map(config => ({ ...config, files: ['**/*.ts'] })),
  { files: ['**/*.ts'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    // Preserve authored legacy artwork/layout while enforcing correctness during extraction.
    files: ['src/**/*.js', 'dev/**/*.js'],
    languageOptions: { globals: { ...globals.browser, __CARD_VERSION__: 'readonly' } },
    rules: {
      'constructor-super': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-duplicate-case': 'error',
      'no-unexpected-multiline': 'error',
      'valid-typeof': 'error',
    },
  },
];
