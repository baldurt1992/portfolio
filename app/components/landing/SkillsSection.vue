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
  <section id="technologies" aria-labelledby="technologies-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading id="technologies-heading" lot="STAGE-02" :eyebrow="t('skills.eyebrow')"
          :title="t('skills.title')" :description="t('skills.description')" :contained="false" />

        <div class="hc-window mt-12">
          <UiStackTitleBar title="SKILLS · TOOLKIT" :meta="`${skills.length} CHIPS`" />
          <div class="hc-body !pt-2">
            <div v-for="[category, list] in skillsByCategory" :key="category"
              class="manifest-row grid-cols-1 sm:grid-cols-[9rem_1fr]">
              <h3 class="manifest-kicker mb-0 self-start pt-1">
                {{ categoryLabels[category] }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in list" :key="skill.name" class="manifest-chip">
                  <UIcon v-if="skill.icon" :name="skill.icon" class="size-4 shrink-0" />
                  {{ skill.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
