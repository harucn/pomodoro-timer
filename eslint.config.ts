import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

const TS_FILES = ['**/*.{ts,tsx}']

export default defineConfig(
  { ignores: ['dist', 'eslint.config.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((c) => ({
    ...c,
    files: TS_FILES,
  })),
  { ...reactHooks.configs.flat['recommended-latest'], files: TS_FILES },
  { ...eslintPluginPrettier, files: TS_FILES },
  {
    files: TS_FILES,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
