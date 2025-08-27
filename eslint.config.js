import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import simpleImports from 'eslint-plugin-simple-import-sort';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      'simple-import-sort': simpleImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react$', '^next', '^[a-z]'],
            ['^@'],
            ['^~'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
            ['^\\u0000'],
          ],
        },
      ],
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'error',
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],

      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  }
);
