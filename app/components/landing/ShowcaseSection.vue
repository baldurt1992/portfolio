<script setup lang="ts">
  const { t } = useI18n()
  const localePath = useLocalePath()
  const { landings } = useShowcaseLandings()

  const sectionRef = ref<HTMLElement | null>(null)
  const catalogTo = computed(() => localePath('/showcase'))
  const teaserLandings = computed(() => landings.value.slice(0, 2))

  useGsapInViewReveal(sectionRef, '.showcase-teaser-card', {
    logTag: 'ShowcaseSection'
  })
</script>

<template>
  <section id="landings" ref="sectionRef" class="landing-section">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
        <div class="space-y-4">
          <p class="font-mono text-sm font-medium uppercase tracking-widest text-primary">
            {{ t('showcase.teaser.eyebrow') }}
          </p>
          <h2 class="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            {{ t('showcase.teaser.title') }}
          </h2>
          <p class="max-w-2xl text-lg text-text-muted">
            {{ t('showcase.teaser.description') }}
          </p>
        </div>
        <NuxtLink :to="catalogTo"
          class="motion-lift inline-flex w-fit shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text hover:bg-surface-hover">
          {{ t('showcase.teaser.viewCollection') }}
          <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <article v-for="landing in teaserLandings" :key="landing.id" class="showcase-teaser-card h-full">
          <ShowcaseLandingCard :landing="landing" title-tag="h3"
            sizes="(min-width: 640px) calc(50vw - 2.5rem), calc(100vw - 2.5rem)" />
        </article>
      </div>
    </div>
  </section>
</template>
