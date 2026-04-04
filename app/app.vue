<script setup>
  const portfolioData = usePortfolioData()
  const { bio } = portfolioData
  const titleLead = bio.brandName ?? bio.name
  const title = `${titleLead} — ${bio.title}`
  const description = portfolioData.bio.tagline

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
      lang: 'es'
    }
  })

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterCard: 'summary_large_image'
  })
</script>

<template>
  <UApp>
    <LayoutAppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <USeparator class="h-px" />

    <LayoutAppFooter />

    <UiStickyContactBar />
    <UiGoToTop />
  </UApp>
</template>
