// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  {
    name: 'local/ignores',
    ignores: [
      '.agents/**',
      '.codegraph/**',
      '.codex/**',
      '.cursor/**',
      '.github/skills/**',
      '.impeccable/**',
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**'
    ]
  },
  {
    name: 'local/nuxt-config',
    files: ['nuxt.config.ts'],
    rules: {
      'nuxt/nuxt-config-keys-order': 'off'
    }
  },
  {
    name: 'local/vue-rules',
    files: ['**/*.vue'],
    rules: {
      '@stylistic/indent': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/member-delimiter-style': 'off',
      'vue/script-indent': 'off',
      'vue/html-indent': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/html-closing-bracket-newline': 'off'
    }
  },
  eslintConfigPrettier
)
