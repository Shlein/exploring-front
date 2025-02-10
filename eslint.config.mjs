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
// import reactHooks from 'eslint-plugin-react-hooks'
// import airbnbConfig from 'eslint-config-airbnb'

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
  // { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      tseslint,
      pluginJs,
      react: eslintReact,
      reactRefresh,
      eslintPrettierPlugin,
      '@stylistic': stylistic,
      import: importPlugin
      // "eslint-plugin-react-hooks": "^5.1.0",
      // reactHooks,
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
        sourceType: 'module',
        // поправить, походу не работает
        ignoreAttribute: ['foo']
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // airbnbConfig.config,
  eslintReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-deprecated': 'warn',

      // Правила, близкие к Airbnb

      // Typescript-специфичные правила
      // '@typescript-eslint/explicit-function-return-type': 'error',
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
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      'max-len': ['error', { ignoreComments: true }],

      // Правила импорта
      // 'import/no-unresolved': 'error',
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

      // Правила для функций и классов
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

      // Ограничения на сложность и размер
      complexity: ['warn', 10],
      'max-depth': ['warn', 4],
      'max-lines-per-function': ['warn', 50],
      'max-params': ['warn', 3],

      // Правила безопасности и best practices
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

      // Строгие правила объектов и массивов
      'no-array-constructor': 'error',
      'no-new-object': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-object-spread': 'error',

      // Правила переменных
      'one-var': ['error', 'never'],
      'no-multi-assign': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

      // Правила сравнения
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
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  {
    settings: { react: { version: 'detect' } }
  },
  // {
  //   overrides: [
  //     {
  //       files: ['**/src/**/*.test.{ts,tsx}'],
  //       rules: {
  //         'i18next/no-literal-string': 'off'
  //       }
  //     }
  //   ]
  // }
);
