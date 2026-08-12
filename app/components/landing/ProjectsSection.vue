<script setup lang="ts">
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  const { t } = useI18n()
  const portfolioData = usePortfolioData()

  const sectionRef = ref<HTMLElement | null>(null)

  const flagshipProject = computed(
    () => portfolioData.value.projects.find((project) => project.prominence === 'flagship')
  )

  const otherProjects = computed(() =>
    portfolioData.value.projects.filter((project) => project.prominence !== 'flagship')
  )

  let revealCtx: gsap.Context | null = null

  onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const root = sectionRef.value
    if (!root) {
      console.error('[ProjectsSection] No hay nodo de sección para GSAP')
      return
    }

    revealCtx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 64,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      })
    }, root)
  })

  onUnmounted(() => {
    revealCtx?.revert()
  })
</script>

<template>
  <section id="projects" ref="sectionRef" class="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 space-y-4 sm:mb-16">
        <p class="font-mono text-sm font-medium uppercase tracking-widest text-accent">
          {{ t('projects.eyebrow') }}
        </p>
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
          {{ t('projects.title') }}
        </h2>
        <p class="max-w-2xl text-lg text-text-muted">
          {{ t('projects.description') }}
        </p>
      </div>

      <div class="space-y-5">
        <article v-if="flagshipProject"
          class="project-card overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-xl">
          <ProjectsProjectCard :project="flagshipProject" variant="featured" />
        </article>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <article v-for="project in otherProjects" :key="project.id"
            class="project-card overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl">
            <ProjectsProjectCard :project="project" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
