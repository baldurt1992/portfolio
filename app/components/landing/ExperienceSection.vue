<script setup lang="ts">
  import type { TimelineItem } from '@nuxt/ui'

  const portfolioData = usePortfolioData()
  const { t } = useI18n()
  const experience = computed(() => portfolioData.value.experience)

  const timelineItems = computed<TimelineItem[]>(() =>
    experience.value.map((exp) => ({
      date: exp.date,
      title: exp.title,
      description: `${exp.company} — ${exp.description}`,
      icon: exp.icon ?? 'i-lucide-briefcase'
    }))
  )
</script>

<template>
  <section id="experience" aria-labelledby="experience-heading" class="py-24 sm:py-32">
    <UContainer>
      <UiScrollReveal>
        <div class="max-w-2xl mx-auto w-full">
          <UiSectionHeading id="experience-heading" :eyebrow="t('experience.eyebrow')" :title="t('experience.title')"
            :description="t('experience.description')" :contained="false" />
          <div class="mt-16">
            <UTimeline
              :items="timelineItems"
              color="primary"
              :ui="{
                date: 'text-primary text-xs/5 font-medium'
              }"
            />
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
