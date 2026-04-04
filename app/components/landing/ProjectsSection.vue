<script setup lang="ts">
const { t } = useI18n()
const portfolioData = usePortfolioData()
const projects = computed(() => portfolioData.value.projects)
</script>

<template>
  <section id="projects" aria-labelledby="projects-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading
          id="projects-heading"
          :eyebrow="t('projects.eyebrow')"
          :title="t('projects.title')"
          :description="t('projects.description')"
        />
        <div
          class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          <UiScrollReveal
            v-for="(project, i) in projects"
            :key="project.id"
            :class="i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''"
          >
            <ProjectsProjectCard :project="project" :featured="i === 0" />
          </UiScrollReveal>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
