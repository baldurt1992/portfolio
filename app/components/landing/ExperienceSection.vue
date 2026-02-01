<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const { experience } = usePortfolioData()

const timelineItems = computed<TimelineItem[]>(() =>
  experience.map((exp) => ({
    date: exp.date,
    title: exp.title,
    description: `${exp.company} — ${exp.description}`,
    icon: exp.icon ?? 'i-lucide-briefcase'
  }))
)
</script>

<template>
  <section id="experience" class="py-20 sm:py-28 bg-elevated/30">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading title="Experiencia" description="Mi trayectoria profesional." />
        <div class="mt-16 max-w-2xl mx-auto">
          <UTimeline :items="timelineItems" />
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
