<script setup lang="ts">
  const { t } = useI18n()
  const portfolioData = usePortfolioData()
  const projects = computed(() => portfolioData.value.projects)
</script>

<template>
  <section id="projects" aria-labelledby="projects-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading id="projects-heading" lot="CARD-01" :eyebrow="t('projects.eyebrow')"
          :title="t('projects.title')" :description="t('projects.description')" :contained="false" />

        <div class="hc-window mt-8 mb-10">
          <UiStackTitleBar title="CARD FIELD · WORK SAMPLES" :meta="`${projects.length} CARDS`" />
          <div class="hc-menubar" aria-hidden="true">
            <strong>Browse</strong>
            <span>Open</span>
            <span>Link</span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <UiScrollReveal v-for="(project, i) in projects" :key="project.id" class="h-full">
            <ProjectsProjectCard :project="project" :featured="i === 0" />
          </UiScrollReveal>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
