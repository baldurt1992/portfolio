<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'

  const { t } = useI18n()
  const { progress } = useLandingScrollProgress()
  const reduceMotion = usePreferredReducedMotion()

  const percent = computed(() =>
    Math.min(100, Math.max(0, Math.round(progress.value * 100)))
  )

  const widthPercent = computed(
    () => `${Math.min(100, Math.max(0, progress.value * 100))}%`
  )

  const barTransitionClass = computed(() =>
    reduceMotion.value === 'reduce' ? '' : 'transition-[width] duration-150 ease-out'
  )
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-55 h-0.5 bg-default/20" role="progressbar"
    :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100" :aria-label="t('a11y.scrollReadingProgress')">
    <div
      class="h-full max-w-full origin-left will-change-[width] bg-linear-to-r from-primary via-teal-400 to-emerald-300 dark:via-teal-500 dark:to-cyan-400/85"
      :class="barTransitionClass" :style="{ width: widthPercent }" />
  </div>
</template>
