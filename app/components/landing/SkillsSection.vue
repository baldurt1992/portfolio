<script setup lang="ts">
  import type { Skill } from '~/composables/usePortfolioData'

  const { t } = useI18n()
  const portfolioData = usePortfolioData()
  const skills = computed(() => portfolioData.value.skills)

  const categoryLabels = computed<Record<Skill['category'], string>>(() => ({
    frontend: t('skills.category.frontend'),
    backend: t('skills.category.backend'),
    tools: t('skills.category.tools'),
    devops: t('skills.category.devops')
  }))

  const skillsByCategory = computed(() => {
    const map = new Map<Skill['category'], Skill[]>()
    for (const s of skills.value) {
      const list = map.get(s.category) ?? []
      list.push(s)
      map.set(s.category, list)
    }
    return Array.from(map.entries()).filter(([, list]) => list.length > 0)
  })
</script>

<template>
  <section id="skills" aria-labelledby="skills-heading" class="py-24 sm:py-32">
    <UContainer>
      <UiScrollReveal>
        <div class="max-w-4xl mx-auto w-full">
          <UiSectionHeading id="skills-heading" :eyebrow="t('skills.eyebrow')" :title="t('skills.title')"
            :description="t('skills.description')" :contained="false" />
          <div class="mt-16 space-y-12">
            <div v-for="[category, list] in skillsByCategory" :key="category">
              <h3 class="text-sm font-semibold text-muted uppercase tracking-wider text-center mb-5">
                {{ categoryLabels[category] }}
              </h3>
              <div class="flex flex-wrap justify-center gap-3">
                <UBadge v-for="skill in list" :key="skill.name" size="lg" variant="subtle" class="gap-2">
                  <UIcon v-if="skill.icon" :name="skill.icon" class="size-4 shrink-0" />
                  {{ skill.name }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
