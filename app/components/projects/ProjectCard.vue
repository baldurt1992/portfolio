<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'
  import type { Project } from '~/composables/usePortfolioData'

  const props = defineProps<{
    project: Project
    featured?: boolean
  }>()

  const { t } = useI18n()
  const motion = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => motion.value === 'reduce')

  const heroHoverVideoSrc = computed(
    () => props.project.mediaModules?.find((m) => m.id === 'main-navigation')?.videoSrc
  )

  const useHeroHoverVideo = computed(
    () => !!props.project.image && !!heroHoverVideoSrc.value && !prefersReducedMotion.value
  )

  const hoverVideoRef = ref<HTMLVideoElement | null>(null)

  /** Encadena hover del hero con el CTA «Ver detalles» (resaltado cian). */
  const highlightDetailsCta = ref(false)

  function playHeroVideo() {
    const el = hoverVideoRef.value
    if (!el) return
    void el.play().catch(() => {
      /* autoplay política: ignorar */
    })
  }

  function resetHeroVideo() {
    const el = hoverVideoRef.value
    if (!el) return
    el.pause()
    el.currentTime = 0
  }

  const cardLinksMediaCta = computed(() => (props.project.mediaModules?.length ?? 0) > 0)

  function onCardEnter() {
    if (!cardLinksMediaCta.value) return
    highlightDetailsCta.value = true
    playHeroVideo()
  }

  function onCardLeave() {
    if (!cardLinksMediaCta.value) return
    highlightDetailsCta.value = false
    resetHeroVideo()
  }

  const tooltipHeroHover = computed(() => t('projectCard.tooltipHeroHover'))
  const tooltipHeroStatic = computed(() => t('projectCard.tooltipHeroStatic'))

  const projectImageAlt = computed(() =>
    t('projectCard.projectImageAlt', { title: props.project.title })
  )
</script>

<template>
  <UCard variant="subtle" :class="[
    'card-elevated h-full flex flex-col overflow-hidden p-0 gap-0',
    featured && 'ring-1 ring-primary/20'
  ]" :ui="{ header: 'p-0 border-b border-default/40', body: 'p-4 sm:p-5', footer: 'p-4 sm:p-5 pt-0' }"
    @mouseenter="onCardEnter"
    @mouseleave="onCardLeave">
    <template #header>
      <div class="space-y-0">
        <div v-if="!project.image"
          class="aspect-21/9 sm:aspect-2/1 bg-linear-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center"
          aria-hidden="true">
          <UIcon name="i-lucide-layout-template" class="size-12 sm:size-14 text-primary/40" />
        </div>

        <UTooltip
          v-else-if="useHeroHoverVideo"
          arrow
          :delay-duration="450"
          :text="tooltipHeroHover"
          :content="{ side: 'top', align: 'center' }"
        >
          <div class="relative overflow-hidden bg-default/25 border-b border-default/30 outline-none">
            <img :src="project.image" :alt="projectImageAlt"
              class="relative z-0 w-full h-auto block transition-opacity duration-300"
              :class="highlightDetailsCta ? 'opacity-0' : 'opacity-100'" loading="lazy" decoding="async" />
            <video
              ref="hoverVideoRef"
              :src="heroHoverVideoSrc"
              class="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover object-top transition-opacity duration-300"
              :class="highlightDetailsCta ? 'opacity-100' : 'opacity-0'"
              muted
              playsinline
              preload="metadata"
              aria-hidden="true"
            />
            <span
              class="pointer-events-none absolute end-3 top-3 z-20 inline-flex items-center gap-1 rounded-md bg-default/85 px-2 py-1 text-xs font-medium text-highlighted shadow-sm ring-1 ring-default/60 transition-opacity duration-300"
              :class="highlightDetailsCta ? 'opacity-100' : 'opacity-0'"
              aria-hidden="true">
              <UIcon name="i-lucide-clapperboard" class="size-3.5 shrink-0" />
              {{ t('projectCard.liveBadge') }}
            </span>
          </div>
        </UTooltip>

        <UTooltip
          v-else-if="project.image && project.mediaModules?.length"
          arrow
          :delay-duration="400"
          :text="tooltipHeroStatic"
          :content="{ side: 'top', align: 'center' }"
        >
          <div class="overflow-hidden bg-default/25 border-b border-default/30">
            <img :src="project.image" :alt="projectImageAlt"
              class="w-full h-auto block" loading="lazy" decoding="async" />
          </div>
        </UTooltip>

        <div v-else-if="project.image" class="overflow-hidden bg-default/25 border-b border-default/30">
          <img :src="project.image" :alt="projectImageAlt"
            class="w-full h-auto block" loading="lazy" decoding="async" />
        </div>

        <div class="flex items-start justify-between gap-3 p-4 sm:p-5">
          <h3 class="font-semibold text-highlighted text-lg text-pretty">
            {{ project.title }}
          </h3>
          <span class="text-sm text-muted shrink-0 tabular-nums">{{ project.year }}</span>
        </div>
      </div>
    </template>

    <p class="text-muted text-sm/relaxed flex-1 text-pretty">
      {{ project.description }}
    </p>

    <div class="flex flex-wrap gap-2.5 sm:gap-3 mt-4">
      <UBadge v-for="tag in project.tags" :key="tag" size="sm" color="neutral" variant="subtle"
        class="text-sm sm:text-sm font-medium">
        {{ tag }}
      </UBadge>
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2">
        <ProjectsProjectProductMediaDrawer
          v-if="project.mediaModules?.length"
          :project="project"
          :highlight-details-cta="highlightDetailsCta"
        />
        <UButton v-if="project.url" :to="project.url" target="_blank" rel="noopener noreferrer" size="sm" variant="soft"
          trailing-icon="i-lucide-external-link">
          {{ t('projectCard.viewProject') }}
        </UButton>
        <UButton v-if="project.repo" :to="project.repo" target="_blank" rel="noopener noreferrer" size="sm"
          color="neutral" variant="ghost" icon="i-simple-icons-github" :aria-label="t('a11y.openRepoGithub')" />
      </div>
    </template>
  </UCard>
</template>
