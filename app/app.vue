<script setup lang="ts">
  import { toValue } from 'vue'
  import { joinURL, withTrailingSlash } from 'ufo'
  import { en, es } from '@nuxt/ui/locale'
  import { portfolioStructure } from '~/data/portfolio'
  import { normalizeAppRouterPath } from '~/utils/normalizeAppRouterPath'
  import { withoutHash } from '~/utils/withoutHash'

  const { locale, locales, defaultLocale, t } = useI18n()
  const localePath = useLocalePath()
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  const colorMode = useColorMode()

  /** `seo: false`: canonical/hreflang se controlan aquí para soportar base paths de GitHub Pages. */
  const i18nHead = useLocaleHead({ seo: false })

  function assetHref(path: string) {
    return joinURL(runtimeConfig.app.baseURL, path.replace(/^\/+/, ''))
  }

  const siteBase = computed(() => {
    const fromEnv = (runtimeConfig.public.siteUrl as string | undefined)?.trim()
    if (fromEnv) return fromEnv.replace(/\/$/, '')
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

  const currentContentPath = computed(() => {
    const withoutLocale = route.path.replace(/^\/en(?=\/|$)/, '') || '/'
    return withoutLocale.startsWith('/showcase') ? '/showcase' : '/'
  })

  function seoKey(scope: 'pageTitle' | 'pageDescription') {
    return currentContentPath.value === '/showcase'
      ? `showcase.seo.${scope}`
      : `portfolio.seo.${scope}`
  }

  function seoPageTitle() {
    const title = t(seoKey('pageTitle'))
    return typeof title === 'string' ? title : ''
  }

  function seoPageDescription() {
    const description = t(seoKey('pageDescription'))
    return typeof description === 'string' ? description : ''
  }

  function portfolioSeoDescription() {
    const description = t('portfolio.seo.pageDescription')
    return typeof description === 'string' ? description : ''
  }

  function routerPathToAbsoluteSiteUrl(pathFromLocalePath: string) {
    const base = siteBase.value
    if (!base) return undefined

    const appBase = runtimeConfig.app.baseURL || '/'
    const norm = normalizeAppRouterPath(withoutHash(pathFromLocalePath), appBase)
    const trimmed = norm.replace(/\/$/, '') || '/'
    const pathUrl = trimmed === '/'
      ? joinURL(base, '/')
      : joinURL(base, trimmed.replace(/^\//, ''))

    return withTrailingSlash(pathUrl)
  }

  type AppLocale = 'es' | 'en'

  function isAppLocale(code: string): code is AppLocale {
    return code === 'es' || code === 'en'
  }

  function localizedCurrentPath(code?: AppLocale) {
    return code
      ? localePath(currentContentPath.value, code)
      : localePath(currentContentPath.value)
  }

  const canonicalPageUrl = computed(() => routerPathToAbsoluteSiteUrl(localizedCurrentPath()))

  const hreflangHeadLinks = computed(() => {
    if (!siteBase.value) {
      return [] as { rel: 'alternate'; href: string; hreflang: string; key: string }[]
    }

    const raw = locales.value ?? []
    const links: { rel: 'alternate'; href: string; hreflang: string; key: string }[] = []

    for (const entry of raw) {
      const code = typeof entry === 'string' ? entry : entry.code
      if (!isAppLocale(code)) continue
      const href = routerPathToAbsoluteSiteUrl(localizedCurrentPath(code))
      if (!href) continue

      const hreflang = typeof entry === 'string' ? code : (entry.language ?? code)
      links.push({
        rel: 'alternate',
        href,
        hreflang,
        key: `hreflang-${hreflang}`
      })
    }

    const def = toValue(defaultLocale)
    if (def && isAppLocale(def)) {
      const defHref = routerPathToAbsoluteSiteUrl(localizedCurrentPath(def))
      if (defHref) {
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

  const defaultOgImagePath = 'brand/og/baldurdev-og-dark.png'
  const ogImageUrl = computed(() => siteBase.value ? joinURL(siteBase.value, defaultOgImagePath) : undefined)

  const jsonLdGraph = computed(() => {
    const bio = portfolioData.value.bio
    const base = siteBase.value
    if (!base) return []

    const pageUrl = canonicalPageUrl.value ?? withTrailingSlash(joinURL(base, '/'))
    const name = bio.name
    const brand = bio.brandName ?? name
    const sameAs = [bio.social.github, bio.social.linkedin].filter(Boolean) as string[]
    const imagePath = (bio.avatar ?? `/${defaultOgImagePath}`).replace(/^\//, '')
    const image = joinURL(base, imagePath)
    const pageDesc = seoPageDescription()
    const personDesc = portfolioSeoDescription()
    const knowsAbout = [
      'Laravel',
      'Vue.js',
      'Nuxt',
      'Full-stack web development',
      'SaaS',
      'Multi-tenant ERP',
      'REST APIs',
      'WordPress',
      'Docker',
      'CI/CD'
    ]

    return [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: withTrailingSlash(joinURL(base, '/')),
        name: brand,
        description: personDesc,
        inLanguage: locale.value === 'en' ? 'en-US' : 'es-CO',
        publisher: { '@id': `${base}/#person` }
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: seoPageTitle(),
        description: pageDesc,
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': `${base}/#person` },
        inLanguage: locale.value === 'en' ? 'en-US' : 'es-CO'
      },
      {
        '@type': 'Person',
        '@id': `${base}/#person`,
        name,
        url: withTrailingSlash(joinURL(base, '/')),
        image,
        description: personDesc,
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
        { rel: 'icon', href: assetHref('favicon.ico'), sizes: 'any' },
        {
          rel: 'icon',
          type: 'image/png',
          href: assetHref(
            colorMode.value === 'dark'
              ? 'brand/favicon/favicon-dark-32x32.png'
              : 'brand/favicon/favicon-light-32x32.png'
          ),
          sizes: '32x32',
          key: 'theme-favicon'
        },
        {
          rel: 'apple-touch-icon',
          href: assetHref(
            colorMode.value === 'dark'
              ? 'brand/favicon/apple-touch-icon-dark.png'
              : 'brand/favicon/apple-touch-icon-light.png'
          ),
          sizes: '180x180'
        },
        { rel: 'manifest', href: assetHref('site.webmanifest') }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'light dark' },
        {
          name: 'theme-color',
          content: colorMode.value === 'dark' ? '#05050a' : '#f7f7f5'
        },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        },
        {
          name: 'google-site-verification',
          content: 'Cyzuutc_r90SjHWcmCtKJykH06_Ae7bC6Pos30HBHaE'
        },
        ...(h.meta ?? [])
      ],
      script: jsonLdGraph.value.length > 0
        ? [
          {
            key: 'portfolio-jsonld',
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
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
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogImageAlt: () =>
      `${portfolioStructure.bio.brandName ?? 'BaldurDev'} — ${portfolioData.value.bio.title}`,
    ogLocale: () => (locale.value === 'en' ? 'en_US' : 'es_CO'),
    twitterCard: 'summary_large_image',
    twitterTitle: () => seoPageTitle(),
    twitterDescription: () => seoPageDescription(),
    twitterImage: () => ogImageUrl.value,
    twitterImageAlt: () =>
      `${portfolioStructure.bio.brandName ?? 'BaldurDev'} — ${portfolioData.value.bio.title}`
  })
</script>

<template>
  <UApp :locale="nuxtUiLocale">
    <a href="#main-content"
      class="skip-link bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
      {{ t('a11y.skipToMain') }}
    </a>

    <LayoutAppHeader />
    <UiScrollReadingBar />

    <UMain id="main-content" class="bg-transparent" tabindex="-1">
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
