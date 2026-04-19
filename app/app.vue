<script setup lang="ts">
  import { toValue } from 'vue'
  import { joinURL } from 'ufo'
  import { en, es } from '@nuxt/ui/locale'
  import { portfolioStructure } from '~/data/portfolio'
  import { normalizeAppRouterPath } from '~/utils/normalizeAppRouterPath'
  import { withoutHash } from '~/utils/withoutHash'

  const { locale, locales, defaultLocale, t } = useI18n()
  const localePath = useLocalePath()
  const runtimeConfig = useRuntimeConfig()

  /** `seo: false`: las hreflang/canonical de i18n hacen `joinURL(baseUrl, localePath)` y duplican la base en subrutas. */
  const i18nHead = useLocaleHead({ seo: false })

  // Prerender: hrefs deben usar runtime baseURL (subruta GitHub Pages)
  function assetHref(path: string) {
    return joinURL(runtimeConfig.app.baseURL, path.replace(/^\/+/, ''))
  }

  const siteBase = computed(() => {
    // `siteUrl` viene de `NUXT_PUBLIC_SITE_URL` (en prod, el CI). Si vacío, origen de la petición / ventana.
    const fromEnv = (runtimeConfig.public.siteUrl as string | undefined)?.trim()
    if (fromEnv) {
      return fromEnv.replace(/\/$/, '')
    }
    if (import.meta.client && typeof window !== 'undefined') {
      return `${window.location.origin}${runtimeConfig.app.baseURL || '/'}`.replace(/\/$/, '')
    }
    try {
      const u = useRequestURL()
      return `${u.origin}${runtimeConfig.app.baseURL || '/'}`.replace(/\/$/, '')
    } catch {
      return ''
    }
  })

  const portfolioData = usePortfolioData()

  // useSeoMeta: evitar datos de tm() en head (serialización); strings vía t() + claves SEO dedicadas
  function seoPageTitle() {
    const title = t('portfolio.seo.pageTitle')
    return typeof title === 'string' ? title : ''
  }

  function seoPageDescription() {
    const d = t('portfolio.seo.pageDescription')
    return typeof d === 'string' ? d : ''
  }

  /** `localePath` puede incluir el segmento de `app.baseURL`; unir eso con `siteUrl` duplicaba el path. */
  function routerPathToAbsoluteSiteUrl(pathFromLocalePath: string) {
    const base = siteBase.value
    if (!base) {
      return undefined
    }
    const appBase = runtimeConfig.app.baseURL || '/'
    const norm = normalizeAppRouterPath(withoutHash(pathFromLocalePath), appBase)
    const trimmed = norm.replace(/\/$/, '') || '/'
    if (trimmed === '/') {
      return base
    }
    return joinURL(base, trimmed.replace(/^\//, ''))
  }

  const canonicalPageUrl = computed(() => routerPathToAbsoluteSiteUrl(localePath('/')))

  const hreflangHeadLinks = computed(() => {
    const base = siteBase.value
    if (!base) {
      return [] as { rel: 'alternate'; href: string; hreflang: string; key: string }[]
    }
    const raw = locales.value ?? []
    const links: { rel: 'alternate'; href: string; hreflang: string; key: string }[] = []
    for (const entry of raw) {
      const code = typeof entry === 'string' ? entry : entry.code
      const href = routerPathToAbsoluteSiteUrl(localePath('/', code))
      if (!href) {
        continue
      }
      const hreflang =
        typeof entry === 'string' ? code : (entry.language ?? code)
      links.push({
        rel: 'alternate',
        href,
        hreflang,
        key: `hreflang-${hreflang}`
      })
    }
    const def = toValue(defaultLocale)
    if (def && links.length) {
      const defHref = routerPathToAbsoluteSiteUrl(localePath('/', def))
      if (
        defHref &&
        !links.some((l) => l.hreflang === 'x-default')
      ) {
        links.unshift({
          rel: 'alternate',
          href: defHref,
          hreflang: 'x-default',
          key: 'hreflang-x-default'
        })
      }
    }
    return links
  })

  const defaultOgImagePath = 'images/portrait.jpg'

  const ogImageUrl = computed(() => {
    const base = siteBase.value
    if (!base) {
      return undefined
    }
    return joinURL(base, defaultOgImagePath)
  })

  const jsonLdGraph = computed(() => {
    const bio = portfolioData.value.bio
    const base = siteBase.value
    if (!base) {
      return []
    }
    const pageUrl = canonicalPageUrl.value ?? base
    const name = bio.name
    const brand = bio.brandName ?? name
    const sameAs = [bio.social.github, bio.social.linkedin].filter(Boolean) as string[]
    const imagePath = (bio.avatar ?? `/${defaultOgImagePath}`).replace(/^\//, '')
    const image = joinURL(base, imagePath)

    const pageDesc = seoPageDescription()
    const knowsAbout = [
      'Laravel',
      'Vue.js',
      'Nuxt',
      'Full-stack web development',
      'SaaS',
      'ERP software'
    ]

    return [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base,
        name: brand,
        description: pageDesc,
        inLanguage: locale.value === 'en' ? 'en-US' : 'es-CO',
        publisher: { '@id': `${base}/#person` }
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: seoPageTitle(),
        description: seoPageDescription(),
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': `${base}/#person` },
        inLanguage: locale.value === 'en' ? 'en-US' : 'es-CO'
      },
      {
        '@type': 'Person',
        '@id': `${base}/#person`,
        name,
        url: base,
        image,
        description: pageDesc,
        jobTitle: bio.title,
        knowsAbout,
        workLocation: {
          '@type': 'Place',
          name: bio.location ?? 'Antioquia, Colombia',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bello',
            addressRegion: 'Antioquia',
            addressCountry: 'CO'
          }
        },
        ...(sameAs.length ? { sameAs } : {})
      }
    ]
  })

  const nuxtUiLocale = computed(() => {
    const base = locale.value === 'en' ? en : es
    return extendLocale(base, {
      messages: {
        header: {
          title: t('a11y.headerMenuTitle'),
          description: t('a11y.headerMenuDescription')
        }
      }
    })
  })

  useHead(() => {
    const h = i18nHead.value
    const c = canonicalPageUrl.value
    return {
      charset: 'utf-8',
      htmlAttrs: h.htmlAttrs,
      link: [
        ...(c ? [{ rel: 'canonical' as const, href: c, key: 'canonical' }] : []),
        ...hreflangHeadLinks.value.map((x) => ({
          rel: x.rel,
          href: x.href,
          hreflang: x.hreflang,
          key: x.key
        })),
        ...(h.link ?? []),
        { rel: 'icon', href: assetHref('favicon.ico'), sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: assetHref('favicon.svg') },
        { rel: 'icon', type: 'image/png', href: assetHref('favicon-96x96.png'), sizes: '96x96' },
        { rel: 'apple-touch-icon', href: assetHref('apple-touch-icon.png') },
        { rel: 'manifest', href: assetHref('site.webmanifest') },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap'
        }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        },
        {
          name: 'google-site-verification',
          content: 'Cyzuutc_r90SjHWcmCtKJykH06_Ae7bC6Pos30HBHaE'
        },
        ...(h.meta ?? [])
      ],
      script:
        jsonLdGraph.value.length > 0
          ? [
            {
              key: 'portfolio-jsonld',
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': jsonLdGraph.value
              })
            }
          ]
          : []
    }
  })

  useSeoMeta({
    title: () => seoPageTitle(),
    description: () => seoPageDescription(),
    ogTitle: () => seoPageTitle(),
    ogDescription: () => seoPageDescription(),
    ogType: 'website',
    ogSiteName: () => portfolioStructure.bio.brandName ?? 'BaldurDev',
    ogUrl: () => canonicalPageUrl.value,
    ogImage: () => ogImageUrl.value,
    ogLocale: () => (locale.value === 'en' ? 'en_US' : 'es_CO'),
    twitterCard: 'summary_large_image',
    twitterTitle: () => seoPageTitle(),
    twitterDescription: () => seoPageDescription(),
    twitterImage: () => ogImageUrl.value
  })
</script>

<template>
  <UApp :locale="nuxtUiLocale">
    <LayoutAppHeader />
    <UiScrollReadingBar />

    <UMain class="bg-transparent">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <div class="relative z-30">
      <LayoutAppFooter />
    </div>

    <UiStickyContactBar />
    <UiGoToTop />
  </UApp>
</template>
