<script setup lang="ts">
  const { t } = useI18n()
  const portfolioData = usePortfolioData()

  const sectionRef = ref<HTMLElement | null>(null)

  useGsapInViewReveal(sectionRef, '.experience-item', {
    y: 32,
    duration: 0.65,
    logTag: 'ExperienceSection'
  })
</script>

<template>
  <section id="experience" ref="sectionRef" class="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 space-y-4 sm:mb-16">
        <p class="font-mono text-sm font-medium uppercase tracking-widest text-accent">
          {{ t('experience.eyebrow') }}
        </p>
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
          {{ t('experience.title') }}
        </h2>
        <p class="max-w-2xl text-lg text-text-muted">
          {{ t('experience.description') }}
        </p>
      </div>

      <ol class="relative space-y-6 lg:space-y-0">
        <div class="absolute start-5 top-2 bottom-2 w-px bg-border lg:start-1/2 lg:-translate-x-1/2"
          aria-hidden="true" />

        <li v-for="(item, index) in portfolioData.experience" :key="item.title"
          class="experience-item relative ps-14 lg:grid lg:grid-cols-2 lg:ps-0 lg:py-5">
          <div
            class="absolute inset-s-0 top-1 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-bg-elevated lg:inset-s-1/2 lg:top-8 lg:-translate-x-1/2">
            <UIcon :name="item.icon || 'i-lucide-briefcase'" class="size-4 text-accent" aria-hidden="true" />
          </div>

          <article
            class="rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md sm:p-6"
            :class="index % 2 === 0 ? 'lg:col-start-1 lg:pe-12' : 'lg:col-start-2 lg:ps-12'">
            <p class="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-accent">
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
