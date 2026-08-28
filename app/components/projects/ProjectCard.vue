<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'
  import type { Project } from '~/composables/usePortfolioData'
  import { projectImageSrcset } from '~/utils/responsiveImages'

  const props = withDefaults(
    defineProps<{
      project: Project
      variant?: 'grid' | 'featured'
    }>(),
    { variant: 'grid' }
  )

  const { t } = useI18n()
  const motion = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => motion.value === 'reduce')

  const isFlagship = computed(
    () => props.variant === 'featured' || props.project.prominence === 'flagship'
  )

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

  const useVideoOnlyPreview = computed(
    () => !props.project.image && !!heroHoverVideoSrc.value && !prefersReducedMotion.value
  )

  const hoverVideoRef = ref<HTMLVideoElement | null>(null)
  const mediaRootRef = ref<HTMLElement | null>(null)
  const isHovering = ref(false)
  const hoverVideoArmed = ref(false)
  let videoIo: IntersectionObserver | null = null

  const resolvedHoverVideoSrc = computed(() =>
    hoverVideoArmed.value ? heroHoverVideoSrc.value : undefined
  )

  function armHoverVideo() {
    if (!heroHoverVideoSrc.value || hoverVideoArmed.value) return
    hoverVideoArmed.value = true
  }

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

  function onCardEnter() {
    if (!useHeroHoverVideo.value && !useVideoOnlyPreview.value) return
    isHovering.value = true
    armHoverVideo()
    nextTick(() => playHeroVideo())
  }

  function onCardLeave() {
    if (!useHeroHoverVideo.value && !useVideoOnlyPreview.value) return
    isHovering.value = false
    resetHeroVideo()
  }

  const projectImageAlt = computed(() =>
    t('projectCard.projectImageAlt', { title: props.project.title })
  )
  const projectImageResponsiveSrcset = computed(() => projectImageSrcset(props.project.image))
  const projectImageSizes = computed(() =>
    props.variant === 'featured'
      ? '(min-width: 1024px) 640px, 100vw'
      : '(min-width: 1024px) 420px, (min-width: 640px) calc(50vw - 2rem), calc(100vw - 2rem)'
  )

  const hasProjectActions = computed(
    () =>
      !!(props.project.mediaModules?.length || props.project.url || props.project.repo)
  )

  const descriptionExpanded = ref(false)

  function toggleDescription() {
    descriptionExpanded.value = !descriptionExpanded.value
  }

  onMounted(() => {
    enforceMutedHoverVideo()

    if (!useVideoOnlyPreview.value || !mediaRootRef.value) return

    videoIo = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        armHoverVideo()
        videoIo?.disconnect()
        videoIo = null
      },
      { rootMargin: '200px 0px' }
    )
    videoIo.observe(mediaRootRef.value)
  })

  onUnmounted(() => {
    videoIo?.disconnect()
    videoIo = null
  })
</script>

<template>
  <article class="group relative flex h-full overflow-hidden"
    :class="props.variant === 'featured' ? 'flex-col lg:flex-row' : 'flex-col'" @mouseenter="onCardEnter"
    @mouseleave="onCardLeave">

    <!-- Prominence badge -->
    <div class="absolute inset-s-4 top-4 z-20">
      <span
        class="inline-flex items-center gap-1.5 rounded-full bg-bg-elevated/90 px-2.5 py-1 text-xs font-medium text-text backdrop-blur-sm border border-border">
        <UIcon name="i-lucide-folder" class="size-3 text-accent" aria-hidden="true" />
        {{ t(`projectCard.prominence.${project.prominence}`) }}
      </span>
    </div>

    <!-- Media -->
    <div v-if="useVideoOnlyPreview" ref="mediaRootRef" class="relative aspect-16/10 overflow-hidden bg-black"
      :class="props.variant === 'featured' ? 'lg:aspect-auto lg:min-h-88 lg:w-[58%] lg:shrink-0' : isFlagship && 'lg:aspect-video'">
      <video ref="hoverVideoRef" :src="resolvedHoverVideoSrc"
        class="pointer-events-none size-full object-cover object-top" muted playsinline preload="metadata"
        aria-hidden="true" @loadeddata="enforceMutedHoverVideo" @volumechange="enforceMutedHoverVideo" />
      <span
        class="pointer-events-none absolute inset-e-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-bg-elevated/90 px-2.5 py-1 text-xs font-medium text-text backdrop-blur-sm border border-border transition-opacity duration-300"
        :class="isHovering ? 'opacity-100' : 'opacity-0'" aria-hidden="true">
        <UIcon name="i-lucide-clapperboard" class="size-3.5 shrink-0 text-accent" />
        {{ t('projectCard.liveBadge') }}
      </span>
    </div>

    <div v-else-if="!project.image" class="relative aspect-16/10 flex items-center justify-center bg-surface"
      aria-hidden="true">
      <UIcon name="i-lucide-layout-template" class="size-12 text-text-subtle" />
    </div>

    <div v-else-if="useHeroHoverVideo" class="relative aspect-16/10 overflow-hidden"
      :class="props.variant === 'featured' ? 'lg:aspect-auto lg:min-h-88 lg:w-[58%] lg:shrink-0' : isFlagship && 'lg:aspect-video'">
      <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes" :alt="projectImageAlt"
        class="relative z-0 size-full object-cover object-top transition-opacity duration-300"
        :class="isHovering ? 'opacity-0' : 'opacity-100'" loading="lazy" decoding="async" />
      <video ref="hoverVideoRef" :src="resolvedHoverVideoSrc"
        class="pointer-events-none absolute inset-0 z-10 size-full object-cover object-top transition-opacity duration-300"
        :class="isHovering ? 'opacity-100' : 'opacity-0'" muted playsinline preload="none" aria-hidden="true"
        @loadeddata="enforceMutedHoverVideo" @volumechange="enforceMutedHoverVideo" />
      <span
        class="pointer-events-none absolute inset-e-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-bg-elevated/90 px-2.5 py-1 text-xs font-medium text-text backdrop-blur-sm border border-border transition-opacity duration-300"
        :class="isHovering ? 'opacity-100' : 'opacity-0'" aria-hidden="true">
        <UIcon name="i-lucide-clapperboard" class="size-3.5 shrink-0 text-accent" />
        {{ t('projectCard.liveBadge') }}
      </span>
    </div>

    <div v-else-if="project.image" class="relative aspect-16/10 overflow-hidden"
      :class="props.variant === 'featured' ? 'lg:aspect-auto lg:min-h-88 lg:w-[58%] lg:shrink-0' : isFlagship && 'lg:aspect-video'">
      <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes" :alt="projectImageAlt"
        class="size-full object-cover object-top" loading="lazy" decoding="async" />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-5" :class="props.variant === 'featured' && 'lg:p-8'">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 class="text-lg font-semibold text-text text-pretty">
          {{ project.title }}
        </h3>
        <span class="font-mono text-xs font-medium text-text-subtle">
          {{ project.year }}
        </span>
      </div>

      <div class="text-start">
        <p class="text-sm leading-relaxed text-text-muted text-pretty"
          :class="descriptionExpanded ? undefined : isFlagship ? 'line-clamp-4' : 'line-clamp-3'">
          {{ project.description }}
        </p>
        <button type="button"
          class="mt-1 inline-flex cursor-pointer text-sm font-medium text-primary hover:text-primary-hover"
          :aria-expanded="descriptionExpanded" @click="toggleDescription">
          {{ descriptionExpanded ? t('projectCard.showLess') : t('projectCard.showMore') }}
        </button>
      </div>

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
            class="motion-lift inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text hover:bg-surface-hover">
            {{ t('projectCard.viewProject') }}
            <UIcon name="i-lucide-external-link" class="size-3.5" aria-hidden="true" />
          </a>
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer"
            class="motion-lift inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text hover:bg-surface-hover"
            :aria-label="t('a11y.openRepoGithub')">
            <UIcon name="i-simple-icons-github" class="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
