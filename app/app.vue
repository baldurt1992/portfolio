<script setup>
  const portfolioData = usePortfolioData()
  const title = `${portfolioData.bio.name} — ${portfolioData.bio.title}`
  const description = portfolioData.bio.tagline

  useHead({
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
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
    <ClientOnly>
      <LayoutAppHeader />
      <template #fallback>
        <header class="bg-default/75 backdrop-blur border-b border-default h-16 sticky top-0 z-50" />
      </template>
    </ClientOnly>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <USeparator class="h-px" />

    <LayoutAppFooter />

    <UiGoToTop />
  </UApp>
</template>
