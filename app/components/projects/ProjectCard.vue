<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'
  import type { Project } from '~/composables/usePortfolioData'
  import { projectImageSrcset } from '~/utils/responsiveImages'

  const props = defineProps<{
    project: Project
  }>()

  const { t } = useI18n()
  const motion = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => motion.value === 'reduce')
  const showFullDescription = ref(false)
  const descriptionRef = ref<HTMLElement | null>(null)
  const isDescriptionOverflowing = ref(false)

  const isFlagship = computed(() => props.project.prominence === 'flagship')

  const heroHoverVideoSrc = computed(() => {
    const modules = props.project.mediaModules ?? []
    const byId = (id: string) => modules.find((m) => m.id === id)?.videoSrc
    return (
      byId('application-main-navigation') ??
      byId('erp-overview') ??
      modules[0]?.videoSrc
    )
  })

  const useHeroHoverVideo = computed(
    () => !!props.project.image && !!heroHoverVideoSrc.value && !prefersReducedMotion.value
  )

  const hoverVideoRef = ref<HTMLVideoElement | null>(null)
  const isHovering = ref(false)

  function enforceMutedHoverVideo() {
    const el = hoverVideoRef.value
    if (!el) return
    el.defaultMuted = true
    el.muted = true
    el.volume = 0
  }

  function playHeroVideo() {
    const el = hoverVideoRef.value
    if (!el) return
    enforceMutedHoverVideo()
    void el.play().catch(() => { })
  }

  function resetHeroVideo() {
    const el = hoverVideoRef.value
    if (!el) return
    el.pause()
    el.currentTime = 0
  }

  const cardLinksMediaCta = computed(() => (props.project.mediaModules?.length ?? 0) > 0)

  function onCardEnter() {
    if (!cardLinksMediaCta.value || !useHeroHoverVideo.value) return
    isHovering.value = true
    playHeroVideo()
  }

  function onCardLeave() {
    if (!cardLinksMediaCta.value || !useHeroHoverVideo.value) return
    isHovering.value = false
    resetHeroVideo()
  }

  const tooltipHeroHover = computed(() => t('projectCard.tooltipHeroHover'))
  const tooltipHeroStatic = computed(() => t('projectCard.tooltipHeroStatic'))

  const projectImageAlt = computed(() =>
    t('projectCard.projectImageAlt', { title: props.project.title })
  )
  const projectImageResponsiveSrcset = computed(() => projectImageSrcset(props.project.image))
  const projectImageSizes = '(min-width: 1024px) 420px, (min-width: 640px) calc(50vw - 2rem), calc(100vw - 2rem)'

  const hasProjectActions = computed(
    () =>
      !!(props.project.mediaModules?.length || props.project.url || props.project.repo)
  )

  function measureDescriptionOverflow() {
    const el = descriptionRef.value
    if (!el) return

    if (showFullDescription.value) {
      isDescriptionOverflowing.value = true
      return
    }

    isDescriptionOverflowing.value = el.scrollHeight > el.clientHeight + 1
  }

  onMounted(() => {
    enforceMutedHoverVideo()
    nextTick(measureDescriptionOverflow)
  })

  watch(
    () => [props.project.description, showFullDescription.value],
    () => nextTick(measureDescriptionOverflow)
  )
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    @mouseenter="onCardEnter" @mouseleave="onCardLeave">

    <!-- Prominence badge -->
    <div class="absolute start-4 top-4 z-20">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-bg-elevated/90 px-2.5 py-1 text-xs font-medium text-text backdrop-blur-sm border border-border">
        <UIcon name="i-lucide-folder" class="size-3 text-primary" aria-hidden="true" />
        {{ t(`projectCard.prominence.${project.prominence}`) }}
      </span>
    </div>

    <!-- Media -->
    <div v-if="!project.image" class="relative aspect-16/10 flex items-center justify-center bg-surface"
      aria-hidden="true">
      <UIcon name="i-lucide-layout-template" class="size-12 text-text-subtle" />
    </div>

    <UTooltip v-else-if="useHeroHoverVideo" arrow :delay-duration="450" :text="tooltipHeroHover"
      :content="{ side: 'top', align: 'center' }">
      <div class="relative aspect-16/10 overflow-hidden" :class="isFlagship && 'lg:aspect-16/9'">
        <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes"
          :alt="projectImageAlt"
          class="relative z-0 size-full object-cover object-top transition-opacity duration-300"
          :class="isHovering ? 'opacity-0' : 'opacity-100'" loading="lazy" decoding="async" />
        <video ref="hoverVideoRef" :src="heroHoverVideoSrc"
          class="pointer-events-none absolute inset-0 z-10 size-full object-cover object-top transition-opacity duration-300"
          :class="isHovering ? 'opacity-100' : 'opacity-0'" muted playsinline preload="metadata"
          aria-hidden="true" @loadeddata="enforceMutedHoverVideo" @volumechange="enforceMutedHoverVideo" />
        <span
          class="pointer-events-none absolute inset-e-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-bg-elevated/90 px-2.5 py-1 text-xs font-medium text-text backdrop-blur-sm border border-border transition-opacity duration-300"
          :class="isHovering ? 'opacity-100' : 'opacity-0'" aria-hidden="true">
          <UIcon name="i-lucide-clapperboard" class="size-3.5 shrink-0 text-primary" />
          {{ t('projectCard.liveBadge') }}
        </span>
      </div>
    </UTooltip>

    <UTooltip v-else-if="project.image && project.mediaModules?.length" arrow :delay-duration="400"
      :text="tooltipHeroStatic" :content="{ side: 'top', align: 'center' }">
      <div class="relative aspect-16/10 overflow-hidden" :class="isFlagship && 'lg:aspect-16/9'">
        <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes"
          :alt="projectImageAlt" class="size-full object-cover object-top" loading="lazy" decoding="async" />
      </div>
    </UTooltip>

    <div v-else-if="project.image" class="relative aspect-16/10 overflow-hidden" :class="isFlagship && 'lg:aspect-16/9'">
      <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes" :alt="projectImageAlt"
        class="size-full object-cover object-top" loading="lazy" decoding="async" />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 class="text-lg font-semibold text-text text-pretty">
          {{ project.title }}
        </h3>
        <span class="font-mono text-xs font-medium text-text-subtle">
          {{ project.year }}
        </span>
      </div>

      <p ref="descriptionRef" class="text-sm leading-relaxed text-text-muted text-pretty"
        :class="!showFullDescription && (isFlagship ? 'line-clamp-4' : 'line-clamp-3')">
        {{ project.description }}
      </p>

      <button v-if="isDescriptionOverflowing" type="button"
        class="mt-2 self-start text-sm font-medium text-primary hover:text-primary-hover"
        @click="showFullDescription = !showFullDescription">
        {{ showFullDescription ? t('projectCard.showLess') : t('projectCard.showMore') }}
      </button>

      <div class="mt-auto flex flex-col gap-4 pt-5">
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in project.tags.slice(0, isFlagship ? 8 : 5)" :key="tag"
            class="inline-flex rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-text-muted">
            {{ tag }}
          </span>
        </div>

        <div v-if="hasProjectActions" class="flex flex-wrap gap-2">
          <ProjectsProjectProductMediaDrawer v-if="project.mediaModules?.length" :project="project" />
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-hover">
            {{ t('projectCard.viewProject') }}
            <UIcon name="i-lucide-external-link" class="size-3.5" aria-hidden="true" />
          </a>
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-hover"
            :aria-label="t('a11y.openRepoGithub')">
            <UIcon name="i-simple-icons-github" class="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
