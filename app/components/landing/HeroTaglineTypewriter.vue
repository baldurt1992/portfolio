<script setup lang="ts">
  import { useRotatingInputTypewriter } from '~/composables/useRotatingInputTypewriter'

  const props = defineProps<{
    prefix: string
    tokens: string[]
    fullTagline: string
  }>()

  const { displayed } = useRotatingInputTypewriter(() => props.tokens, {
    typeCharMs: 38,
    deleteCharMs: 28,
    pauseAfterTypedMs: 950,
    pauseAfterClearedMs: 260,
    pauseBetweenCyclesMs: 650
  })

  const inputWidthCh = computed(() => {
    const longest = props.tokens.reduce((max, t) => Math.max(max, t.trim().length), 0)
    const base = longest + 1.25
    return `${Math.max(base, 14)}ch`
  })

  const fieldStyle = computed(() => ({
    '--hc-typewriter-w': inputWidthCh.value
  }))
</script>

<template>
  <div class="w-full min-w-0 max-w-full text-start">
    <div
      class="flex w-full min-w-0 max-w-full flex-col items-stretch gap-y-2 min-[420px]:flex-row min-[420px]:flex-nowrap min-[420px]:items-center min-[420px]:gap-x-2 sm:gap-x-2.5"
      aria-hidden="true">
      <span
        class="min-w-0 break-words text-pretty text-base leading-snug text-muted min-[420px]:flex-1 sm:text-lg sm:leading-relaxed">
        {{ prefix }}
      </span>
      <span
        class="hc-typewriter-field inline-flex h-9 w-full min-w-0 max-w-full shrink items-center overflow-hidden border-2 border-ink bg-dock-void px-2.5 py-0 font-medium leading-none text-ink shadow-[2px_2px_0_var(--color-manifest-shadow)] sm:h-10 sm:px-3 sm:shadow-[3px_3px_0_var(--color-manifest-shadow)]"
        :style="fieldStyle" role="presentation">
        <span class="inline-flex min-h-0 min-w-0 max-w-full items-center text-left text-base sm:text-lg">
          <span class="max-w-full truncate whitespace-pre text-left tracking-tight">{{ displayed }}</span>
          <span class="ms-0.5 inline-block h-[1.05em] w-0.5 shrink-0 bg-seal animate-pulse" aria-hidden="true" />
        </span>
      </span>
    </div>
    <span class="sr-only">{{ fullTagline }}</span>
  </div>
</template>
