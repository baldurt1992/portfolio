<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'
  import type { Project } from '~/composables/usePortfolioData'
  import { projectImageSrcset } from '~/utils/responsiveImages'

  const props = defineProps<{
    project: Project
    featured?: boolean
  }>()

  const { t } = useI18n()
  const motion = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => motion.value === 'reduce')
  const showFullDescription = ref(false)
  const descriptionRef = ref<HTMLElement | null>(null)
  const isDescriptionOverflowing = ref(false)

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
  const highlightDetailsCta = ref(false)

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
  <article class="hc-window flex h-full flex-col" :class="featured && 'ring-2 ring-seal'" @mouseenter="onCardEnter"
    @mouseleave="onCardLeave">
    <UiStackTitleBar :title="project.title" :meta="String(project.year)" :credit="featured" />

    <div v-if="!project.image" class="relative aspect-16/10 flex items-center justify-center bg-dock-asphalt"
      aria-hidden="true">
      <UIcon name="i-lucide-layout-template" class="size-12 text-seal/40" />
    </div>

    <UTooltip v-else-if="useHeroHoverVideo" arrow :delay-duration="450" :text="tooltipHeroHover"
      :content="{ side: 'top', align: 'center' }">
      <div class="relative aspect-16/10 overflow-hidden outline-none">
        <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes"
          :alt="projectImageAlt" class="relative z-0 size-full object-cover object-top transition-opacity duration-300"
          :class="highlightDetailsCta ? 'opacity-0' : 'opacity-100'" loading="lazy" decoding="async" />
        <video ref="hoverVideoRef" :src="heroHoverVideoSrc"
          class="pointer-events-none absolute inset-0 z-10 size-full object-cover object-top transition-opacity duration-300"
          :class="highlightDetailsCta ? 'opacity-100' : 'opacity-0'" muted playsinline preload="metadata"
          aria-hidden="true" @loadeddata="enforceMutedHoverVideo" @volumechange="enforceMutedHoverVideo" />
        <span
          class="pointer-events-none absolute inset-e-3 top-3 z-20 inline-flex items-center gap-1 bg-seal px-2 py-1 font-pixel text-[0.6875rem] font-bold uppercase tracking-wide text-seal-ink border-2 border-ink shadow-[2px_2px_0_var(--color-manifest-shadow)] transition-opacity duration-300"
          :class="highlightDetailsCta ? 'opacity-100' : 'opacity-0'" aria-hidden="true">
          <UIcon name="i-lucide-clapperboard" class="size-3.5 shrink-0" />
          {{ t('projectCard.liveBadge') }}
        </span>
      </div>
    </UTooltip>

    <UTooltip v-else-if="project.image && project.mediaModules?.length" arrow :delay-duration="400"
      :text="tooltipHeroStatic" :content="{ side: 'top', align: 'center' }">
      <div class="relative aspect-16/10 overflow-hidden">
        <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes"
          :alt="projectImageAlt" class="size-full object-cover object-top" loading="lazy" decoding="async" />
      </div>
    </UTooltip>

    <div v-else-if="project.image" class="relative aspect-16/10 overflow-hidden">
      <img :src="project.image" :srcset="projectImageResponsiveSrcset" :sizes="projectImageSizes" :alt="projectImageAlt"
        class="size-full object-cover object-top" loading="lazy" decoding="async" />
    </div>

    <div v-if="hasProjectActions" class="flex flex-wrap gap-2 border-y-2 border-ink bg-dock-steel px-3 py-3">
      <ProjectsProjectProductMediaDrawer v-if="project.mediaModules?.length" :project="project"
        :highlight-details-cta="highlightDetailsCta" />
      <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer"
        class="hc-btn hc-btn--ghost hc-btn--sm">
        {{ t('projectCard.viewProject') }}
        <UIcon name="i-lucide-external-link" class="size-3.5" aria-hidden="true" />
      </a>
      <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer"
        class="hc-btn hc-btn--ghost hc-btn--sm" :aria-label="t('a11y.openRepoGithub')">
        <UIcon name="i-simple-icons-github" class="size-4" aria-hidden="true" />
      </a>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-4 sm:p-5 bg-dock-asphalt">
      <p ref="descriptionRef" class="text-muted text-sm/relaxed flex-1 text-pretty"
        :class="!showFullDescription && 'line-clamp-5'">
        {{ project.description }}
      </p>

      <div v-if="isDescriptionOverflowing">
        <button type="button" class="hc-btn hc-btn--ghost hc-btn--sm"
          @click="showFullDescription = !showFullDescription">
          {{ showFullDescription ? t('projectCard.showLess') : t('projectCard.showMore') }}
        </button>
      </div>

      <div class="flex flex-wrap gap-2 pt-1">
        <span v-for="tag in project.tags" :key="tag" class="manifest-chip">
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
