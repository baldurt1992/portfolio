<script setup lang="ts">
  import type { Project } from '~/composables/usePortfolioData'

  const { t } = useI18n()
  const portfolioData = usePortfolioData()
  const projects = computed(() => portfolioData.value.projects)

  function gridClassFor(project: Project): string {
    switch (project.prominence) {
      case 'flagship':
        return 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
      case 'large':
        return 'sm:col-span-2 lg:col-span-2'
      case 'medium':
      default:
        return 'sm:col-span-2 lg:col-span-1'
    }
  }
</script>

<template>
  <section id="projects" aria-labelledby="projects-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading id="projects-heading" :eyebrow="t('projects.eyebrow')" :title="t('projects.title')"
          :description="t('projects.description')" :contained="false" />

        <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <UiScrollReveal v-for="project in projects" :key="project.id" class="h-full" :class="gridClassFor(project)">
            <ProjectsProjectCard :project="project" />
          </UiScrollReveal>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
