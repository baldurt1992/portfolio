<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'
  import type { Project } from '~/data/portfolio'

  const props = defineProps<{
    project: Project
    /** Cuando el hero de la card enlaza el CTA (hover en portada). */
    highlightDetailsCta?: boolean
  }>()

  const { t } = useI18n()
  const motion = usePreferredReducedMotion()
  const allowBounce = computed(() => motion.value !== 'reduce')

  const items = computed(() => props.project.mediaModules ?? [])

  /** Encabezados de sección + ítems, para separar provisioning/admin vs app de asistencia. */
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

  const open = ref(false)
  const activeIndex = ref(0)

  const current = computed(() => items.value[activeIndex.value]!)

  watch(open, (isOpen) => {
    if (isOpen) activeIndex.value = 0
  })

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
  <USlideover v-if="items.length > 0" v-model:open="open" side="right" inset :title="project.title"
    :description="t('drawer.description')" :ui="{
      content:
        'w-[calc(100%-1rem)] max-w-3xl! sm:max-w-4xl! md:max-w-5xl! lg:max-w-6xl!',
      header:
        'relative gap-3 pe-14 sm:pe-16',
      wrapper: 'min-w-0 flex-1',
      title: 'text-pretty pr-1',
      description: 'text-pretty',
      close: 'top-4 end-4 z-10 shrink-0',
      body: 'p-0 flex flex-col min-h-0 overflow-hidden',
      footer: 'border-t border-default bg-elevated/30',
    }">
    <UButton size="sm" :color="highlightDetailsCta ? 'info' : 'neutral'"
      :variant="highlightDetailsCta ? 'soft' : 'outline'" icon="i-lucide-panel-right-open" :class="[
        'border-dashed transition-shadow duration-200',
        highlightDetailsCta &&
        'shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_0_20px_rgba(34,211,238,0.22)] dark:shadow-[0_0_0_1px_rgba(34,211,238,0.45),0_0_24px_rgba(34,211,238,0.18)]',
        highlightDetailsCta && allowBounce && 'details-cta-bounce',
        highlightDetailsCta && !allowBounce && 'scale-[1.02]',
      ]">
      {{ t('projectCard.viewDetails') }}
    </UButton>

    <template #body>
      <div class="flex max-h-[min(85dvh,880px)] flex-col overflow-hidden lg:max-h-[min(90dvh,960px)] lg:flex-row">
        <nav :aria-label="t('a11y.productMediaNav')"
          class="shrink-0 border-b border-default bg-elevated/20 lg:w-56 lg:border-e lg:border-b-0">
          <ul class="flex list-none gap-1 overflow-x-auto p-2 lg:flex lg:flex-col lg:gap-0 lg:overflow-y-auto lg:p-3">
            <template v-for="entry in navEntries" :key="entry.kind === 'heading' ? entry.key : `step-${entry.index}`">
              <li v-if="entry.kind === 'heading'" class="mt-0 shrink-0 lg:mt-3 lg:w-full first:lg:mt-0"
                role="presentation">
                <div class="px-2 py-1 lg:px-3">
                  <span
                    class="block max-w-44 text-[0.65rem] leading-tight font-semibold tracking-wide text-muted uppercase sm:max-w-none lg:max-w-none">
                    {{ entry.label }}
                  </span>
                </div>
              </li>
              <li v-else class="shrink-0 lg:w-full">
                <button type="button"
                  class="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-elevated"
                  :class="entry.index === activeIndex
                      ? 'bg-primary/15 text-highlighted ring-1 ring-primary/25'
                      : 'text-muted'
                    " :aria-current="entry.index === activeIndex ? 'true' : undefined"
                  @click="selectModule(entry.index)">
                  <span
                    class="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums"
                    :class="entry.index === activeIndex ? 'bg-primary text-inverted' : 'bg-default ring-1 ring-default'">
                    {{ entry.index + 1 }}
                  </span>
                  <span class="line-clamp-2 lg:line-clamp-3">{{
                    items[entry.index]?.title
                    }}</span>
                </button>
              </li>
            </template>
          </ul>
        </nav>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">
          <p v-if="current.mediaGroupTitle"
            class="mb-1 text-[0.7rem] font-semibold tracking-wide text-primary uppercase">
            {{ current.mediaGroupTitle }}
          </p>
          <h3 class="text-base font-semibold text-highlighted sm:text-lg">
            {{ current.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted text-pretty">
            {{ current.description }}
          </p>

          <div class="mt-4 overflow-hidden rounded-xl bg-black ring-1 ring-default/60 shadow-sm">
            <video :key="current.id" :src="current.videoSrc" controls controlslist="nodownload" autoplay muted
              playsinline preload="auto"
              class="mx-auto max-h-[min(58vh,560px)] w-full object-contain sm:max-h-[min(64vh,640px)] lg:max-h-[min(70vh,720px)]">
              {{ t('drawer.videoFallback') }}
            </video>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full flex-wrap items-center justify-between gap-3">
        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-chevron-left" :disabled="activeIndex === 0"
          @click="goPrev">
          {{ t('drawer.prev') }}
        </UButton>
        <span class="text-muted text-sm tabular-nums">
          {{ activeIndex + 1 }} / {{ items.length }}
        </span>
        <UButton color="neutral" variant="ghost" size="sm" trailing-icon="i-lucide-chevron-right"
          :disabled="activeIndex >= items.length - 1" @click="goNext">
          {{ t('drawer.next') }}
        </UButton>
      </div>
    </template>
  </USlideover>
</template>
