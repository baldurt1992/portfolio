<script setup lang="ts">
  import { joinURL, withTrailingSlash } from 'ufo'
  import { showcaseLandings } from '~/data/showcase'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const runtimeConfig = useRuntimeConfig()

  const showcasePath = localePath('/showcase')

  const canonicalUrl = computed(() => {
    const base = String(runtimeConfig.public.siteUrl || '').trim().replace(/\/$/, '')
    return base
      ? withTrailingSlash(joinURL(base, showcasePath.replace(/^\//, '')))
      : undefined
  })

  const landings = computed(() =>
    showcaseLandings.map((landing) => ({
      ...landing,
      url: useShowcaseLandingUrl(landing.slug)
    }))
  )

  useHead(() => ({
    link: canonicalUrl.value
      ? [{ rel: 'canonical', href: canonicalUrl.value, key: 'canonical' }]
      : []
  }))

  useSeoMeta({
    title: () => t('showcase.seo.pageTitle'),
    description: () => t('showcase.seo.pageDescription'),
    ogTitle: () => t('showcase.seo.pageTitle'),
    ogDescription: () => t('showcase.seo.pageDescription'),
    ogUrl: () => canonicalUrl.value
  })
</script>

<template>
  <section class="relative py-16 sm:py-24">
    <UContainer>
      <div class="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <span class="manifest-kicker mb-4 inline-block">{{ t('showcase.eyebrow') }}</span>
        <h1 class="manifest-display-xl mb-6">
          {{ t('showcase.title') }}
        </h1>
        <p class="text-lg text-muted-ink">
          {{ t('showcase.description') }}
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="landing in landings"
          :key="landing.id"
          :href="landing.url"
          target="_blank"
          rel="noopener noreferrer"
          class="manifest-crate group flex flex-col overflow-hidden"
        >
          <div class="manifest-crate-frame h-52 border-b-[3px] border-ink">
            <ShowcaseLandingPreview :preview="landing.preview" />
          </div>
          <div class="flex flex-1 flex-col p-5">
            <span class="manifest-chip mb-3 w-fit">{{ t(landing.categoryKey) }}</span>
            <h2 class="font-display text-2xl font-bold text-ink">
              {{ t(landing.titleKey) }}
            </h2>
            <p class="mb-4 flex-1 text-sm text-muted-ink">
              {{ t(landing.descriptionKey) }}
            </p>
            <div class="flex items-center justify-between">
              <span class="hc-btn hc-btn--sm">{{ t('showcase.viewLanding') }}</span>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-5 text-stencil transition-colors group-hover:text-ink"
              />
            </div>
          </div>
        </a>
      </div>
    </UContainer>
  </section>
</template>
