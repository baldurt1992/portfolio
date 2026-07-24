<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'

  /**
   * Escritorio HyperCard × cabinet arcade (paleta DESIGN.md).
   * Baja intensidad: atmósfera temática, no competidor del contenido.
   */
  const colorMode = useColorMode()
  const reduceMotion = usePreferredReducedMotion()
  const { progress, easedProgress } = useLandingScrollProgress()

  const hydrated = ref(false)
  onMounted(() => {
    hydrated.value = true
  })

  // DESIGN.md tokens → RGB
  const C = {
    cream: [239, 230, 213] as const,
    sand: [226, 214, 194] as const,
    panel: [212, 196, 168] as const,
    bezel: [26, 26, 46] as const,
    amber: [240, 162, 2] as const,
    cyan: [0, 183, 198] as const,
    magenta: [232, 62, 140] as const,
    void: [13, 13, 20] as const,
    asphalt: [22, 22, 34] as const,
    crtPanel: [34, 34, 51] as const
  }

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  function rgb(c: readonly [number, number, number], a: number) {
    return `rgb(${c[0]} ${c[1]} ${c[2]} / ${a})`
  }

  function smoothScroll01(easedT: number, linearP: number): number {
    const u = lerp(easedT, linearP, 0.5)
    return u * u * (3 - 2 * u)
  }

  function deskBackground(isDark: boolean, easedT: number, linearP: number) {
    const s = reduceMotion.value === 'reduce' ? 0 : smoothScroll01(easedT, linearP)
    const layers: string[] = []
    const stackY = lerp(18, 62, s)
    const glowShift = lerp(0, 12, s)

    if (isDark) {
      // CRT night: amber titlebar wash + cyan/magenta corner attract + vignette
      layers.push(
        `radial-gradient(ellipse 120% 70% at 50% ${lerp(-8, 8, s)}%, ${rgb(C.amber, lerp(0.09, 0.04, s))} 0%, transparent 55%)`
      )
      layers.push(
        `radial-gradient(ellipse 70% 55% at ${88 - glowShift}% 18%, ${rgb(C.cyan, 0.07)} 0%, transparent 62%)`
      )
      layers.push(
        `radial-gradient(ellipse 65% 50% at ${12 + glowShift}% 78%, ${rgb(C.magenta, 0.06)} 0%, transparent 60%)`
      )
      layers.push(
        `radial-gradient(ellipse 90% 60% at 50% ${stackY}%, ${rgb(C.crtPanel, 0.45)} 0%, transparent 70%)`
      )
      layers.push(
        `radial-gradient(ellipse 140% 90% at 50% 50%, transparent 42%, ${rgb(C.void, 0.55)} 100%)`
      )
      layers.push(
        `linear-gradient(180deg, ${rgb(C.asphalt, 0.35)} 0%, transparent 28%, transparent 72%, ${rgb(C.void, 0.4)} 100%)`
      )
    } else {
      // Cream blotter day: stack shadow + soft coin/attract pinches
      layers.push(
        `radial-gradient(ellipse 110% 80% at 50% 0%, ${rgb(C.cream, 0.85)} 0%, transparent 55%)`
      )
      layers.push(
        `radial-gradient(ellipse 85% 55% at 50% ${stackY}%, ${rgb(C.panel, 0.5)} 0%, transparent 68%)`
      )
      layers.push(
        `radial-gradient(ellipse 55% 40% at ${82 - glowShift}% 22%, ${rgb(C.amber, 0.08)} 0%, transparent 70%)`
      )
      layers.push(
        `radial-gradient(ellipse 48% 36% at ${16 + glowShift}% 72%, ${rgb(C.cyan, 0.07)} 0%, transparent 68%)`
      )
      layers.push(
        `radial-gradient(ellipse 42% 32% at 72% ${lerp(68, 78, s)}%, ${rgb(C.magenta, 0.05)} 0%, transparent 65%)`
      )
      layers.push(
        `radial-gradient(ellipse 140% 95% at 50% 50%, transparent 48%, ${rgb(C.panel, 0.28)} 100%)`
      )
      layers.push(
        `linear-gradient(180deg, ${rgb(C.sand, 0.4)} 0%, transparent 22%, transparent 78%, ${rgb(C.panel, 0.3)} 100%)`
      )
    }

    return layers.join(', ')
  }

  function deskBaseColor(isDark: boolean) {
    return isDark ? 'rgb(13, 13, 20)' : 'rgb(239, 230, 213)'
  }

  const backdropStyle = computed(() => {
    const easedT =
      !hydrated.value || reduceMotion.value === 'reduce' ? 0 : easedProgress.value
    const linearP =
      !hydrated.value || reduceMotion.value === 'reduce' ? 0 : progress.value
    const isDark = colorMode.value === 'dark'
    return {
      backgroundColor: deskBaseColor(isDark),
      backgroundImage: deskBackground(isDark, easedT, linearP)
    }
  })
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
    <div class="landing-nebula-bg absolute inset-0 min-h-dvh" :style="backdropStyle" />
  </div>
</template>
