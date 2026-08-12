<script setup lang="ts">
  import type { Skill, SkillCategory } from '~/composables/usePortfolioData'

  const { t } = useI18n()
  const portfolioData = usePortfolioData()
  const skills = computed(() => portfolioData.value.skills)

  const categoryOrder: SkillCategory[] = ['frontend', 'backend', 'wordpress', 'devops']

  const categoryLabels = computed<Record<SkillCategory, string>>(() => ({
    frontend: t('skills.category.frontend'),
    backend: t('skills.category.backend'),
    wordpress: t('skills.category.wordpress'),
    devops: t('skills.category.devops')
  }))

  const categoryIcons: Record<SkillCategory, string> = {
    frontend: 'i-lucide-layout',
    backend: 'i-lucide-server',
    wordpress: 'i-simple-icons-wordpress',
    devops: 'i-lucide-cloud'
  }

  const skillsByCategory = computed(() => {
    const map = new Map<SkillCategory, Skill[]>()
    for (const s of skills.value) {
      const list = map.get(s.category) ?? []
      list.push(s)
      map.set(s.category, list)
    }
    return categoryOrder
      .map((category) => ({ category, label: categoryLabels.value[category], icon: categoryIcons[category], list: map.get(category) ?? [] }))
      .filter((g) => g.list.length > 0)
  })
</script>

<template>
  <section id="technologies" aria-labelledby="technologies-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading id="technologies-heading" :eyebrow="t('skills.eyebrow')" :title="t('skills.title')"
          :description="t('skills.description')" :contained="false" />

        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="group in skillsByCategory" :key="group.category"
            class="flex flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div class="mb-4 flex items-center gap-3">
              <span class="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <UIcon :name="group.icon" class="size-5" aria-hidden="true" />
              </span>
              <h3 class="text-base font-semibold text-text">
                {{ group.label }}
              </h3>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-for="skill in group.list" :key="skill.name"
                class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-muted">
                <UIcon v-if="skill.icon" :name="skill.icon" class="size-3.5" aria-hidden="true" />
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
