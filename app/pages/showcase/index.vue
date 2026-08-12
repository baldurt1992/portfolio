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
        <p class="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-primary">
          {{ t('showcase.eyebrow') }}
        </p>
        <h1 class="text-4xl font-bold tracking-tight text-text sm:text-5xl text-balance">
          {{ t('showcase.title') }}
        </h1>
        <p class="mt-4 text-lg text-text-muted">
          {{ t('showcase.description') }}
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <a v-for="landing in landings" :key="landing.id" :href="landing.url" target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
          <div class="h-52 overflow-hidden border-b border-border bg-surface">
            <ShowcaseLandingPreview :preview="landing.preview" />
          </div>
          <div class="flex flex-1 flex-col p-5">
            <span class="mb-3 w-fit rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-text-muted">
              {{ t(landing.categoryKey) }}
            </span>
            <h2 class="text-xl font-semibold text-text">
              {{ t(landing.titleKey) }}
            </h2>
            <p class="mb-4 flex-1 text-sm text-text-muted">
              {{ t(landing.descriptionKey) }}
            </p>
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text transition-colors group-hover:bg-surface-hover">
                {{ t('showcase.viewLanding') }}
                <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </UContainer>
  </section>
</template>
