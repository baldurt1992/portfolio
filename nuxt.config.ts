/**
 * URL pública absoluta (sin barra final). Hostinger puede sobreescribirla con
 * `NUXT_PUBLIC_SITE_URL`; el fallback evita generar canonicals/sitemaps localhost
 * si la variable no está presente durante un build de producción.
 */
function normalizedPublicSiteUrl(): string {
  const fromEnv = process.env.NUXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') ?? ''
  return fromEnv || (process.env.NODE_ENV === 'production' ? 'https://baldurdev.com' : '')
}

const publicSiteUrl = normalizedPublicSiteUrl()

const htmlCacheHeaders = {
  'cache-control': 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800'
}

const immutableAssetHeaders = {
  'cache-control': 'public, max-age=31536000, immutable'
}

const longLivedAssetHeaders = {
  'cache-control': 'public, max-age=2592000, stale-while-revalidate=86400'
}

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // @nuxt/fonts (vía @nuxt/ui) descarga las familias en build y las sirve en 1st party.
  // Sin stylesheet de fonts.googleapis.com (era render-blocking ~290 ms).
  fonts: {
    processCSSVariables: true,
    defaults: {
      styles: ['normal'],
      subsets: ['latin']
    },
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700],
        display: 'swap',
        global: true
      },
      {
        name: 'Space Grotesk',
        provider: 'google',
        weights: [400, 500, 600, 700],
        display: 'swap',
        global: true,
        preload: true
      },
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: [400, 500],
        display: 'swap',
        global: true
      }
    ]
  },

  // `classSuffix: ''` → clase `dark` (Tailwind). Declarar `@nuxtjs/color-mode` en modules antes que @nuxt/ui rompe esto (default `-mode`).
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    disableTransition: true
  },

  // Contact Worker: vacío sin secret. Turnstile site key es pública (widget).
  runtimeConfig: {
    public: {
      siteUrl: publicSiteUrl,
      /** URL absoluta del Worker de contacto, ej. https://portfolio-contact.<subcuenta>.workers.dev/ */
      contactApiUrl: '',
      /** Site key pública Turnstile (widget). */
      turnstileSiteKey: ''
    }
  },

  routeRules: {
    '/': { prerender: true, headers: htmlCacheHeaders },
    '/en': { prerender: true, headers: htmlCacheHeaders },
    '/en/': { prerender: true, headers: htmlCacheHeaders },
    '/showcase': { prerender: true, headers: htmlCacheHeaders },
    '/showcase/': { prerender: true, headers: htmlCacheHeaders },
    '/en/showcase': { prerender: true, headers: htmlCacheHeaders },
    '/en/showcase/': { prerender: true, headers: htmlCacheHeaders },
    '/sitemap.xml': { prerender: true },
    '/sitemap_index.xml': { prerender: true },
    '/robots.txt': { prerender: true },
    '/_nuxt/**': { headers: immutableAssetHeaders },
    '/_fonts/**': { headers: immutableAssetHeaders },
    '/images/**': { headers: longLivedAssetHeaders },
    '/videos/**': { headers: longLivedAssetHeaders }
  },

  // https://github.com/nuxt/nuxt/issues/34812 — warning useAppConfig duplicado
  experimental: {
    serverAppConfig: false,
    // El payload de esta app es <1 KiB; extraerlo a _payload.json añade un round-trip
    // de ~5 s en Hostinger y retrasa la hidratación (y el salto de GSAP).
    payloadExtraction: false,
    // /_nuxt/builds/meta/*.json estaba en la critical path (~5.2 s).
    appManifest: false,
    defaults: {
      nuxtLink: {
        prefetch: false
      }
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: ['/robots.txt', '/showcase', '/showcase/', '/en/', '/en/showcase/']
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
    detectBrowserLanguage: false,
    experimental: {
      // Inyecta messages en el HTML y evita /_i18n/.../messages.json (~3.3 s).
      preload: true,
      stripMessagesPayload: false,
      prerenderMessages: true,
      httpCacheDuration: 86400
    }
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
