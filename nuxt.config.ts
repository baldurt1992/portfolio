/**
 * URL pública absoluta (sin barra final), desde `NUXT_PUBLIC_SITE_URL`.
 * En producción el workflow de GitHub Actions la define; en local tu `.env` puede ser localhost.
 */
function normalizedPublicSiteUrl(): string {
  return process.env.NUXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') ?? ''
}

const publicSiteUrl = normalizedPublicSiteUrl()

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Evitamos que @nuxt/fonts (traído por @nuxt/ui) escanee las variables CSS y genere requests a Google Fonts.
  // Cargamos Inter y JetBrains Mono manualmente desde el <head>.
  fonts: {
    processCSSVariables: false
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ]
    }
  },

  // `classSuffix: ''` → clase `dark` (Tailwind). Declarar `@nuxtjs/color-mode` en modules antes que @nuxt/ui rompe esto (default `-mode`).
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    disableTransition: true
  },

  // EmailJS: vacíos sin secrets.
  runtimeConfig: {
    public: {
      siteUrl: publicSiteUrl,
      /** URL base del showcase (dominio separado). En local http://localhost:5500; en prod la URL de GitHub Pages. */
      showcaseUrl: process.env.NUXT_PUBLIC_SHOWCASE_URL?.trim().replace(/\/$/, '') || '',
      emailjsPublicKey: '',
      emailjsServiceId: '',
      emailjsTemplateId: '',
      /** Site key pública Turnstile (widget). */
      turnstileSiteKey: '',
      /** URL absoluta del verificador (Pages Function), ej. https://tu-proyecto.pages.dev/api/verify-turnstile */
      turnstileVerifyUrl: ''
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
    '/showcase': { prerender: true },
    '/en/showcase': { prerender: true },
    '/sitemap.xml': { prerender: true },
    '/sitemap_index.xml': { prerender: true },
    '/robots.txt': { prerender: true }
  },

  // https://github.com/nuxt/nuxt/issues/34812 — warning useAppConfig duplicado
  experimental: {
    serverAppConfig: false
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: ['/robots.txt', '/showcase']
    }
  },

  // Sin `debug.hooks`: con `DEBUG` en el entorno (std-env `isDebug`) Nuxt inyecta
  // `plugins/debug-hooks` → `console.time('[nuxt-app] i18n:beforeLocaleSwitch')` puede
  // repetirse si el hook se anida/paraleliza antes del `timeEnd` (hookable createDebugger).
  debug: {
    hooks: {
      client: false,
      server: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'es', language: 'es-CO', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    baseUrl: publicSiteUrl || 'http://localhost:3000',
    // Sin redirect por Accept-Language (evita /en no deseado)
    detectBrowserLanguage: false
  },

  // Estático: sin servidor Nitro para `/api/_nuxt_icon` — Iconify en cliente
  icon: {
    provider: 'iconify',
    clientBundle: {
      scan: true
    },
    serverBundle: {
      collections: ['lucide', 'simple-icons']
    }
  }
})
