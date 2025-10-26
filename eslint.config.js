// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  // Базовая конфигурация JavaScript
  js.configs.recommended,

  // Конфигурация TypeScript
  ...tseslint.configs.recommended,

  // Конфигурация React (заменяем pluginReact.configs.recommended)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules, // Используем только правила из recommended
      ...pluginReactHooks.configs.recommended.rules, // Правила для react-hooks
      'react/react-in-jsx-scope': 'off', // Отключаем для React 19
      'react/prop-types': 'off', // Не нужно в TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      react: {
        version: '19.0', // Явно указываем версию React
      },
    },
  },
  {
    ignores: ['node_modules/*', 'dist/*'],
  },
];
