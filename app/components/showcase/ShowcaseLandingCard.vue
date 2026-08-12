<script setup lang="ts">
  import type { ShowcaseLandingView } from '~/composables/useShowcaseLandings'

  const props = withDefaults(
    defineProps<{
      landing: ShowcaseLandingView
      /** En la home el título de sección ya es h2; en el catálogo la card es h2. */
      titleTag?: 'h2' | 'h3'
      /**
       * Hint de ancho CSS para srcset. Home: 2 columnas ~620px.
       * Catálogo: 3 columnas ~400px.
       */
      sizes?: string
    }>(),
    {
      titleTag: 'h2',
      sizes: '(min-width: 1024px) 400px, (min-width: 640px) calc(50vw - 2.5rem), calc(100vw - 2.5rem)'
    }
  )

  const { t } = useI18n()
</script>

<template>
  <a :href="props.landing.url" target="_blank" rel="noopener noreferrer"
    class="motion-lift group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm hover:border-accent/30 hover:shadow-md">
    <div class="aspect-16/10 overflow-hidden border-b border-border bg-surface">
      <img :src="props.landing.image" :srcset="props.landing.imageSrcset" :sizes="props.sizes"
        :alt="props.landing.imageAlt" class="size-full object-cover object-top" loading="lazy" decoding="async" />
    </div>
    <div class="flex flex-1 flex-col p-5">
      <span class="mb-3 w-fit rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-text-muted">
        {{ t(props.landing.categoryKey) }}
      </span>
      <component :is="props.titleTag" class="text-xl font-semibold text-text">
        {{ t(props.landing.titleKey) }}
      </component>
      <p class="mb-4 flex-1 text-sm text-text-muted">
        {{ t(props.landing.descriptionKey) }}
      </p>
      <div class="flex items-center justify-between">
        <span
          class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text transition-colors group-hover:bg-surface-hover">
          {{ t('showcase.viewLanding') }}
          <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  </a>
</template>
