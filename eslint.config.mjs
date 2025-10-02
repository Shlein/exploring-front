import globals from 'globals';
import js from '@eslint/js';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintPrettierPlugin from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import i18next from 'eslint-plugin-i18next';
import foldersControlFsdPlugin from 'eslint-plugin-folders-control-fsd';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    name: 'eslint flat config'
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      ...eslintConfigPrettier.rules
    }
  },
  {
    plugins: {
      // Правильное подключение плагинов
      '@typescript-eslint': tseslint.plugin,
      react: eslintReact,
      'react-refresh': reactRefresh,
      prettier: eslintPrettierPlugin,
      '@stylistic': stylistic,
      import: importPlugin,
      // i18next: i18next,
      'folders-control-fsd': foldersControlFsdPlugin // ← исправлено имя
    }
  },
  {
    ignores: ['node_modules/**/*', 'build/**/*', '.config/*']
  },
  js.configs.recommended,
  i18next.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2025
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module'
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-deprecated': 'warn',

      // Правильное имя правила для вашего плагина
      'folders-control-fsd/path-checker': 'error', // ← исправлено имя правила

      // Typescript-специфичные правила
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: { delimiter: 'semi', requireLast: true },
          singleline: { delimiter: 'semi', requireLast: false }
        }
      ],
      '@stylistic/type-annotation-spacing': 'error',

      // Стилистические правила
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/max-len': [
        'error',
        {
          code: 100,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreComments: false
        }
      ],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/comma-spacing': [
        'error',
        { before: false, after: true }
      ],
      'max-len': ['error', { ignoreComments: true }],

      // Правила импорта
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always'
        }
      ],

      // Остальные правила...
      'class-methods-use-this': 'error',
      'no-useless-constructor': 'error',
      'no-empty-function': [
        'error',
        {
          allow: ['constructors']
        }
      ],
      'prefer-arrow-callback': 'error',
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      complexity: ['warn', 10],
      'max-depth': ['warn', 4],
      'max-lines-per-function': ['warn', 50],
      'max-params': ['warn', 3],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-param-reassign': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true
        }
      ],
      'no-array-constructor': 'error',
      'no-new-object': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-object-spread': 'error',
      'one-var': ['error', 'never'],
      'no-multi-assign': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      eqeqeq: ['error', 'always'],
      'no-eq-null': 'error'
    }
  },

  // Исключения для определенных типов файлов
  {
    files: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/jest.config.ts',
      '**/eslint.config.ts'
    ],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'folders-control-fsd/path-checker': 'off' // ← отключаем правило для тестов
    }
  },

  {
    settings: { react: { version: 'detect' } }
  }
);
