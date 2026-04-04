// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  /** Por defecto oscuro; el usuario puede cambiar con UColorModeButton y se persiste en localStorage. */
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    /** Español por defecto; no redirigir según Accept-Language (muchas máquinas en EN verían /en sin querer). */
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'es', language: 'es-CO', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: false
  },
})
