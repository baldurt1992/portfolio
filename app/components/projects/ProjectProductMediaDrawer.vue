<script setup lang="ts">
  import type { Project } from '~/data/portfolio'

  const props = defineProps<{
    project: Project
  }>()

  const { t } = useI18n()

  const items = computed(() => props.project.mediaModules ?? [])

  type NavEntry =
    | { kind: 'heading'; label: string; key: string }
    | { kind: 'item'; index: number }

  const navEntries = computed(() => {
    const list = items.value
    const entries: NavEntry[] = []
    let prevGroupTitle: string | undefined
    list.forEach((module, index) => {
      const gt = module.mediaGroupTitle
      if (gt) {
        if (gt !== prevGroupTitle) {
          entries.push({ kind: 'heading', label: gt, key: `group-${gt}-${index}` })
          prevGroupTitle = gt
        }
      } else {
        prevGroupTitle = undefined
      }
      entries.push({ kind: 'item', index })
    })
    return entries
  })

  const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2] as const

  const open = ref(false)
  const activeIndex = ref(0)
  const playbackRate = ref(1)
  const videoRef = ref<HTMLVideoElement | null>(null)

  const current = computed(() => items.value[activeIndex.value]!)

  function enforceMutedPlayback() {
    const el = videoRef.value
    if (!el) return
    el.defaultMuted = true
    el.muted = true
    el.volume = 0
  }

  function applyPlaybackRate() {
    const el = videoRef.value
    if (!el) return
    enforceMutedPlayback()
    el.playbackRate = playbackRate.value
  }

  function formatRateLabel(rate: number) {
    return `${rate}×`
  }

  watch(open, (isOpen) => {
    if (isOpen) {
      activeIndex.value = 0
      playbackRate.value = 1
    }
  })

  watch(playbackRate, () => {
    applyPlaybackRate()
  })

  watch(
    () => current.value.id,
    () => {
      nextTick(() => applyPlaybackRate())
    }
  )

  function selectModule(index: number) {
    activeIndex.value = index
  }

  function goPrev() {
    activeIndex.value = Math.max(0, activeIndex.value - 1)
  }

  function goNext() {
    activeIndex.value = Math.min(items.value.length - 1, activeIndex.value + 1)
  }
</script>

<template>
  <USlideover v-if="items.length > 0" v-model:open="open" side="right" :title="project.title"
    :description="t('drawer.description')" :ui="{
      content: 'w-full max-w-6xl bg-bg-elevated text-text divide-border',
      header: 'border-b border-border bg-bg-elevated',
      body: 'flex min-h-0 flex-1 flex-col overflow-hidden p-0 bg-bg',
      footer: 'border-t border-border bg-bg-elevated',
      title: 'font-heading font-semibold text-text',
      description: 'text-text-muted'
    }">
    <button type="button"
      class="motion-lift inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20"
      @click="open = true">
      <UIcon name="i-lucide-panel-right-open" class="size-4" aria-hidden="true" />
      {{ t('projectCard.viewDetails') }}
    </button>

    <template #body>
      <div class="flex h-full min-h-0 flex-col overflow-hidden lg:flex-row">
        <nav :aria-label="t('a11y.productMediaNav')"
          class="shrink-0 border-b border-border bg-bg-elevated lg:w-64 lg:border-e lg:border-b-0">
          <div class="border-b border-border px-4 py-3 lg:px-5">
            <p class="font-mono text-xs font-medium uppercase tracking-wider text-primary">
              {{ t('drawer.caseStudy') }}
            </p>
            <p class="mt-1 text-xs text-text-muted">
              {{ t('drawer.moduleCount', { count: items.length }) }}
            </p>
          </div>
          <ul
            class="flex list-none gap-1 overflow-x-auto p-2 lg:flex lg:max-h-full lg:flex-col lg:gap-0 lg:overflow-y-auto lg:p-3">
            <template v-for="entry in navEntries" :key="entry.kind === 'heading' ? entry.key : `step-${entry.index}`">
              <li v-if="entry.kind === 'heading'" class="mt-0 shrink-0 lg:mt-3 lg:w-full first:lg:mt-0"
                role="presentation">
                <div class="px-2 py-1 lg:px-3">
                  <span
                    class="block max-w-44 font-mono text-xs font-semibold uppercase tracking-wide text-text-subtle sm:max-w-none">
                    {{ entry.label }}
                  </span>
                </div>
              </li>
              <li v-else class="shrink-0 lg:w-full">
                <button type="button"
                  class="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-soft"
                  :class="entry.index === activeIndex
                    ? 'bg-primary-soft text-primary'
                    : 'text-text-muted'
                    " :aria-current="entry.index === activeIndex ? 'true' : undefined"
                  @click="selectModule(entry.index)">
                  <span
                    class="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums"
                    :class="entry.index === activeIndex ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted'">
                    {{ entry.index + 1 }}
                  </span>
                  <span class="line-clamp-2 lg:line-clamp-3">{{ items[entry.index]?.title }}</span>
                </button>
              </li>
            </template>
          </ul>
        </nav>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
          <div class="mb-4">
            <p v-if="current.mediaGroupTitle"
              class="mb-1 font-mono text-xs font-semibold uppercase tracking-wide text-primary">
              {{ current.mediaGroupTitle }}
            </p>
            <h3 class="text-base font-semibold text-text sm:text-lg">
              {{ current.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-text-muted text-pretty">
              {{ current.description }}
            </p>
          </div>

          <div class="overflow-hidden rounded-2xl border border-border bg-black shadow-lg">
            <video :key="current.id" ref="videoRef" :src="current.videoSrc" controls controlslist="nodownload" autoplay
              muted playsinline preload="auto"
              class="mx-auto max-h-[min(58vh,560px)] w-full object-contain sm:max-h-[min(64vh,640px)] lg:max-h-[min(70vh,720px)]"
              @loadeddata="applyPlaybackRate" @volumechange="enforceMutedPlayback">
              {{ t('drawer.videoFallback') }}
            </video>
            <div class="flex flex-wrap items-center gap-2 border-t border-white/10 bg-zinc-950/95 px-3 py-2.5 sm:gap-3"
              role="group" :aria-label="t('drawer.playbackSpeed')">
              <span class="text-xs font-medium text-white/70 shrink-0">
                {{ t('drawer.playbackSpeed') }}
              </span>
              <div class="flex flex-wrap gap-1">
                <button v-for="rate in PLAYBACK_RATES" :key="rate" type="button"
                  class="min-w-10 cursor-pointer rounded-lg px-2 py-1 text-xs font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  :class="playbackRate === rate
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-white/90 hover:bg-white/15'
                    " :aria-pressed="playbackRate === rate"
                  :aria-label="t('drawer.playbackSpeedAria', { rate: formatRateLabel(rate) })"
                  @click="playbackRate = rate">
                  {{ formatRateLabel(rate) }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full flex-wrap items-center justify-between gap-3">
        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-chevron-left" :disabled="activeIndex === 0"
          class="rounded-lg" @click="goPrev">
          {{ t('drawer.prev') }}
        </UButton>
        <span class="text-sm text-text-muted tabular-nums">
          {{ activeIndex + 1 }} / {{ items.length }}
        </span>
        <UButton color="neutral" variant="ghost" size="sm" trailing-icon="i-lucide-chevron-right" class="rounded-lg"
          :disabled="activeIndex >= items.length - 1" @click="goNext">
          {{ t('drawer.next') }}
        </UButton>
      </div>
    </template>
  </USlideover>
</template>
