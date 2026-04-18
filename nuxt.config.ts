// https://nuxt.com/docs/api/configuration/nuxt-config
// baseURL: en CI (GitHub Pages) exporta `NUXT_APP_BASE_URL` (p. ej. `/repo/` o `/` para usuario.github.io). Nuxt lo fusiona con `app` sin usar `process` aquí.
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

  /**
   * EmailJS: vacío por defecto para que CI / GitHub Pages construyan sin secretos.
   * En producción, define NUXT_PUBLIC_EMAILJS_PUBLIC_KEY, NUXT_PUBLIC_EMAILJS_SERVICE_ID,
   * NUXT_PUBLIC_EMAILJS_TEMPLATE_ID en el entorno de build (por ejemplo secrets del workflow).
   */
  runtimeConfig: {
    public: {
      emailjsPublicKey: '',
      emailjsServiceId: '',
      emailjsTemplateId: ''
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true }
  },

  /**
   * Mitiga el warning "Duplicated imports useAppConfig" (nitropack vs @nuxt/nitro-server).
   * En un sitio como este no necesitas app config distinto por request en el servidor.
   * @see https://github.com/nuxt/nuxt/issues/34812
   */
  experimental: {
    serverAppConfig: false
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
