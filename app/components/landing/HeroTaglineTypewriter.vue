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
    return `${Math.max(base, 18)}ch`
  })
</script>

<template>
  <div class="w-full text-center">
    <div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-2.5"
      aria-hidden="true">
      <span class="inline text-balance text-base leading-relaxed text-default/88 dark:text-default/85 sm:text-lg">
        {{ prefix }}
      </span>
      <span
        class="box-border inline-flex h-9 max-w-full items-center overflow-hidden rounded-md border border-default/45 bg-elevated/50 px-2.5 py-0 font-medium leading-none text-highlighted shadow-sm ring-1 ring-default/20 backdrop-blur-sm dark:bg-elevated/35 sm:h-10 sm:px-3"
        :style="{ width: `min(100%, ${inputWidthCh})` }" role="presentation">
        <span class="inline-flex min-h-0 min-w-0 max-w-full items-baseline text-left text-base sm:text-lg">
          <span class="max-w-full whitespace-pre text-left tracking-tight">{{ displayed }}</span>
          <span class="-mb-px inline-block h-[1.05em] w-px shrink-0 translate-y-px bg-primary animate-pulse"
            aria-hidden="true" />
        </span>
      </span>
    </div>
    <span class="sr-only">{{ fullTagline }}</span>
  </div>
</template>
