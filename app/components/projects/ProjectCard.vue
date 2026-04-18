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

  function playHeroVideo() {
    const el = hoverVideoRef.value
    if (!el) return
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
    nextTick(measureDescriptionOverflow)
  })

  watch(
    () => [props.project.description, showFullDescription.value],
    () => nextTick(measureDescriptionOverflow)
  )
</script>

<template>
  <UCard variant="subtle" :class="[
    'card-elevated h-full flex flex-col overflow-hidden p-0 gap-0 rounded-xl',
    featured && 'ring-1 ring-primary/15'
  ]" :ui="{
    header: 'p-0 border-b border-default/25',
    body: 'p-4 sm:p-5'
  }" @mouseenter="onCardEnter" @mouseleave="onCardLeave">
    <template #header>
      <div class="space-y-0">
        <div v-if="!project.image"
          class="aspect-21/9 sm:aspect-2/1 bg-linear-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center"
          aria-hidden="true">
          <UIcon name="i-lucide-layout-template" class="size-12 sm:size-14 text-primary/40" />
        </div>

        <UTooltip v-else-if="useHeroHoverVideo" arrow :delay-duration="450" :text="tooltipHeroHover"
          :content="{ side: 'top', align: 'center' }">
          <div class="relative overflow-hidden bg-default/25 border-b border-default/20 outline-none">
            <img :src="project.image" :alt="projectImageAlt"
              class="relative z-0 w-full h-auto block transition-opacity duration-300"
              :class="highlightDetailsCta ? 'opacity-0' : 'opacity-100'" loading="lazy" decoding="async" />
            <video ref="hoverVideoRef" :src="heroHoverVideoSrc"
              class="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover object-top transition-opacity duration-300"
              :class="highlightDetailsCta ? 'opacity-100' : 'opacity-0'" muted playsinline preload="metadata"
              aria-hidden="true" />
            <span
              class="pointer-events-none absolute end-3 top-3 z-20 inline-flex items-center gap-1 rounded-md bg-default/85 px-2 py-1 text-xs font-medium text-highlighted shadow-sm ring-1 ring-default/60 transition-opacity duration-300"
              :class="highlightDetailsCta ? 'opacity-100' : 'opacity-0'" aria-hidden="true">
              <UIcon name="i-lucide-clapperboard" class="size-3.5 shrink-0" />
              {{ t('projectCard.liveBadge') }}
            </span>
          </div>
        </UTooltip>

        <UTooltip v-else-if="project.image && project.mediaModules?.length" arrow :delay-duration="400"
          :text="tooltipHeroStatic" :content="{ side: 'top', align: 'center' }">
          <div class="overflow-hidden bg-default/25 border-b border-default/20">
            <img :src="project.image" :alt="projectImageAlt" class="w-full h-auto block" loading="lazy"
              decoding="async" />
          </div>
        </UTooltip>

        <div v-else-if="project.image" class="overflow-hidden bg-default/25 border-b border-default/20">
          <img :src="project.image" :alt="projectImageAlt" class="w-full h-auto block" loading="lazy"
            decoding="async" />
        </div>

        <div v-if="hasProjectActions"
          class="flex flex-wrap gap-2 border-b border-default/20 bg-elevated/15 px-4 py-3 sm:px-5">
          <ProjectsProjectProductMediaDrawer v-if="project.mediaModules?.length" :project="project"
            :highlight-details-cta="highlightDetailsCta" />
          <UButton v-if="project.url" :to="project.url" target="_blank" rel="noopener noreferrer" size="sm"
            variant="soft" trailing-icon="i-lucide-external-link">
            {{ t('projectCard.viewProject') }}
          </UButton>
          <UButton v-if="project.repo" :to="project.repo" target="_blank" rel="noopener noreferrer" size="sm"
            color="neutral" variant="ghost" icon="i-simple-icons-github" :aria-label="t('a11y.openRepoGithub')" />
        </div>

        <div class="flex items-start justify-between gap-3 p-4 sm:p-5">
          <h3 class="font-semibold text-highlighted text-lg text-pretty">
            {{ project.title }}
          </h3>
          <span class="text-sm text-muted shrink-0 tabular-nums">{{ project.year }}</span>
        </div>
      </div>
    </template>

    <p ref="descriptionRef" class="text-muted text-sm/relaxed flex-1 text-pretty"
      :class="!showFullDescription && 'line-clamp-6'">
      {{ project.description }}
    </p>

    <div v-if="isDescriptionOverflowing" class="mt-3">
      <UButton size="xs" color="neutral" variant="ghost"
        :trailing-icon="showFullDescription ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
        @click="showFullDescription = !showFullDescription">
        {{ showFullDescription ? t('projectCard.showLess') : t('projectCard.showMore') }}
      </UButton>
    </div>

    <div class="flex flex-wrap gap-2.5 sm:gap-3 mt-4">
      <UBadge v-for="tag in project.tags" :key="tag" size="sm" color="primary" variant="subtle"
        class="text-sm sm:text-sm font-medium">
        {{ tag }}
      </UBadge>
    </div>
  </UCard>
</template>
