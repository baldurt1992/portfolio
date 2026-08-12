<script setup lang="ts">
  const portfolioData = usePortfolioData()
  const { t } = useI18n()
  const experience = computed(() => portfolioData.value.experience)
</script>

<template>
  <section id="experience" aria-labelledby="experience-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading id="experience-heading" :eyebrow="t('experience.eyebrow')" :title="t('experience.title')"
          :description="t('experience.description')" :contained="false" />

        <div class="mt-12 space-y-6">
          <div v-for="(exp, index) in experience" :key="`${exp.title}-${exp.date}`"
            class="group relative rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 sm:p-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div class="flex items-center gap-3 sm:w-48 sm:flex-col sm:items-start sm:gap-1">
                <span
                  class="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary shrink-0">
                  <UIcon v-if="exp.icon" :name="exp.icon" class="size-5" aria-hidden="true" />
                </span>
                <div class="sm:pt-1">
                  <p class="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                    {{ exp.date }}
                  </p>
                </div>
              </div>

              <div class="min-w-0 flex-1 space-y-2">
                <h3 class="text-lg font-semibold text-text text-pretty">
                  {{ exp.title }}
                </h3>
                <p class="text-sm font-medium text-text-muted">
                  {{ exp.company }}
                </p>
                <p class="leading-relaxed text-text-muted text-pretty">
                  {{ exp.description }}
                </p>
              </div>
            </div>

            <div v-if="index < experience.length - 1"
              class="absolute -bottom-3 left-6 right-6 hidden h-px bg-border sm:block" aria-hidden="true" />
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
