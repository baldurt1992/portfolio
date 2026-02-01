<script setup lang="ts">
  const { projects } = usePortfolioData()
</script>

<template>
  <section id="projects" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading title="Proyectos" description="Algunos de los proyectos en los que he trabajado." />
        <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <UiScrollReveal v-for="(project, i) in projects" :key="project.id"
            :class="i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''">
            <ProjectsProjectCard :project="project" :featured="i === 0" />
          </UiScrollReveal>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
