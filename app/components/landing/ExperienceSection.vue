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
  <section id="experience" aria-labelledby="experience-heading" class="py-20 sm:py-28 bg-elevated/30">
    <UContainer>
      <UiScrollReveal>
        <div class="max-w-2xl mx-auto w-full">
          <UiSectionHeading
            id="experience-heading"
            eyebrow="Trayectoria"
            title="Experiencia"
            description="Roles recientes y el tipo de impacto que busco generar."
            :contained="false"
          />
          <div class="mt-16">
            <UTimeline :items="timelineItems" />
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
