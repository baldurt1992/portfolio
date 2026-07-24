<script setup lang="ts">
  const portfolioData = usePortfolioData()
  const { t } = useI18n()
  const experience = computed(() => portfolioData.value.experience)
</script>

<template>
  <section id="experience" aria-labelledby="experience-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading id="experience-heading" lot="STAGE-03" :eyebrow="t('experience.eyebrow')"
          :title="t('experience.title')" :description="t('experience.description')" :contained="false" />

        <div class="hc-window mt-12">
          <UiStackTitleBar title="EXPERIENCE · STAGE" :meta="`${experience.length} ROWS`" />
          <div class="hc-menubar" aria-hidden="true">
            <strong>Jobs</strong>
            <span>Date</span>
            <span>Role</span>
          </div>
          <div class="overflow-hidden">
            <div v-for="exp in experience" :key="`${exp.title}-${exp.date}`"
              class="manifest-row grid-cols-1 md:grid-cols-[8.5rem_1fr] px-4 sm:px-6">
              <div class="font-pixel text-[0.6875rem] font-bold tracking-widest uppercase text-seal">
                {{ exp.date }}
              </div>
              <div class="min-w-0 space-y-1.5">
                <h3 class="font-display text-lg font-bold uppercase tracking-tight text-highlighted text-pretty">
                  {{ exp.title }}
                </h3>
                <p class="manifest-kicker text-stencil! mb-0">
                  {{ exp.company }}
                </p>
                <p class="text-sm sm:text-base text-muted text-pretty leading-relaxed">
                  {{ exp.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
