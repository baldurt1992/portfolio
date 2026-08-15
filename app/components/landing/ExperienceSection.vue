<script setup lang="ts">
  const { t } = useI18n()
  const portfolioData = usePortfolioData()

  const sectionRef = ref<HTMLElement | null>(null)
  const experienceItems = computed(() => portfolioData.value.experience)

  useGsapInViewReveal(sectionRef, '.experience-item', {
    logTag: 'ExperienceSection'
  })
</script>

<template>
  <section id="experience" ref="sectionRef" class="landing-section">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 space-y-4 sm:mb-16">
        <p class="font-mono text-sm font-medium uppercase tracking-widest text-primary">
          {{ t('experience.eyebrow') }}
        </p>
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
          {{ t('experience.title') }}
        </h2>
        <p class="max-w-2xl text-lg text-text-muted">
          {{ t('experience.description') }}
        </p>
      </div>

      <ol class="relative">
        <li v-for="(item, index) in experienceItems" :key="item.title"
          class="experience-item grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] lg:gap-x-0">
          <div class="flex h-full flex-col items-center lg:col-start-2 lg:row-start-1">
            <div
              class="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-bg-elevated">
              <UIcon :name="item.icon || 'i-lucide-briefcase'" class="size-4 text-accent" aria-hidden="true" />
            </div>
            <div v-if="index < experienceItems.length - 1" class="w-px min-h-4 flex-1 bg-border" aria-hidden="true" />
          </div>

          <article
            class="motion-lift rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm hover:border-accent/30 hover:shadow-md sm:p-6"
            :class="[
              index < experienceItems.length - 1 ? 'mb-8' : '',
              index % 2 === 0
                ? 'lg:col-start-1 lg:row-start-1 lg:pe-10'
                : 'lg:col-start-3 lg:row-start-1 lg:ps-10'
            ]">
            <p class="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-primary">
              {{ item.date }}
            </p>
            <h3 class="mb-1 text-lg font-semibold text-text">
              {{ item.title }}
            </h3>
            <p class="mb-3 text-sm font-medium text-text-muted">
              {{ item.company }}
            </p>
            <p class="leading-relaxed text-text-muted">
              {{ item.description }}
            </p>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
