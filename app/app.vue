<script setup>
  import { en, es } from '@nuxt/ui/locale'
  import { portfolioStructure } from '~/data/portfolio'

  const { locale, t } = useI18n()

  /** Nuxt UI < UHeader usa t('header.title'|'header.description'); el locale base no los define. */
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

  /**
   * SEO: no usar `usePortfolioData().bio` en Unhead — `tm()` devuelve estructuras que a veces
   * no pasan ToPrimitive al serializar. `t('portfolio.bio.*')` + nombre en `portfolioStructure` son strings estables.
   */
  function seoPageTitle() {
    const lead =
      portfolioStructure.bio.brandName ?? portfolioStructure.bio.name ?? ''
    const sub = t('portfolio.bio.title')
    return `${lead} — ${typeof sub === 'string' ? sub : ''}`
  }

  function seoPageDescription() {
    const d = t('portfolio.bio.tagline')
    return typeof d === 'string' ? d : ''
  }

  const htmlLang = computed(() => (locale.value === 'en' ? 'en-US' : 'es-CO'))

  useHead({
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
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
    htmlAttrs: {
      lang: htmlLang
    }
  })

  useSeoMeta({
    title: () => seoPageTitle(),
    description: () => seoPageDescription(),
    ogTitle: () => seoPageTitle(),
    ogDescription: () => seoPageDescription(),
    twitterCard: 'summary_large_image'
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
