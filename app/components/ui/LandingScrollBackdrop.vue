<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'

const colorMode = useColorMode()
const reduceMotion = usePreferredReducedMotion()
const { easedProgress } = useLandingScrollProgress()

/**
 * Tras hidratar: leemos tema real y scroll. Antes: misma salida en servidor y en el
 * primer paint del cliente (evita mismatch light vs dark y saltos de scroll).
 */
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/**
 * Familia cyan (primary Nuxt UI) → índigo / violeta al avanzar el scroll.
 * Alphas algo más altas que antes: el fondo sigue siendo decorativo, no texto.
 */
const PALETTE = {
  light: {
    topA: [6, 182, 212, 0.09] as const,
    topB: [67, 56, 202, 0.13] as const,
    botA: [8, 145, 178, 0.065] as const,
    botB: [124, 58, 237, 0.11] as const,
    /** Zinc neutro: profundidad sin salir de la escala del proyecto. */
    wash: [113, 113, 122, 0.045] as const,
    washEnd: [99, 102, 241, 0.04] as const
  },
  dark: {
    topA: [34, 211, 238, 0.11] as const,
    topB: [129, 140, 248, 0.17] as const,
    botA: [6, 182, 212, 0.075] as const,
    botB: [167, 139, 250, 0.14] as const,
    wash: [161, 161, 170, 0.055] as const,
    washEnd: [129, 140, 248, 0.045] as const
  }
} as const

/**
 * Curva con más “cuerpo” a mitad de página: se nota antes que con smoothstep puro.
 */
function scrollBlend(tRaw: number) {
  const t = Math.min(1, Math.max(0, tRaw))
  return 1 - (1 - t) ** 1.45
}

function meshBackground(isDark: boolean, tRaw: number) {
  const t = scrollBlend(tRaw)
  const P = isDark ? PALETTE.dark : PALETTE.light

  const topR = lerp(P.topA[0], P.topB[0], t)
  const topG = lerp(P.topA[1], P.topB[1], t)
  const topBch = lerp(P.topA[2], P.topB[2], t)
  const topAlpha = lerp(P.topA[3], P.topB[3], t)

  const botR = lerp(P.botA[0], P.botB[0], t)
  const botG = lerp(P.botA[1], P.botB[1], t)
  const botBlue = lerp(P.botA[2], P.botB[2], t)
  const botAlpha = lerp(P.botA[3], P.botB[3], t)

  const washR = lerp(P.wash[0], P.washEnd[0], t)
  const washG = lerp(P.wash[1], P.washEnd[1], t)
  const washB = lerp(P.wash[2], P.washEnd[2], t)
  const washA = lerp(P.wash[3], P.washEnd[3], t)

  const topY = lerp(-2, 14, t)
  const botY = lerp(102, 86, t)
  const washY = lerp(45, 62, t)

  return `
      radial-gradient(
        circle clamp(1500px, 85vmin, 920px) at 72% ${topY}%,
        rgb(${topR} ${topG} ${topBch} / ${topAlpha}),
        transparent 62%
      ),
      radial-gradient(
        circle clamp(1350px, 65vmin, 780px) at 18% ${botY}%,
        rgb(${botR} ${botG} ${botBlue} / ${botAlpha}),
        transparent 62%
      ),
      radial-gradient(
        ellipse 130% 90% at 52% ${washY}%,
        rgb(${washR} ${washG} ${washB} / ${washA}),
        transparent 72%
      )
    `
}

const backdropStyle = computed(() => {
  if (!hydrated.value) {
    return { background: meshBackground(false, 0) }
  }
  const tBase = reduceMotion.value === 'reduce' ? 0 : easedProgress.value
  const isDark = colorMode.value === 'dark'
  return { background: meshBackground(isDark, tBase) }
})
</script>

<template>
  <div
    aria-hidden="true"
    class="landing-scroll-backdrop pointer-events-none fixed inset-0 z-0"
    :style="backdropStyle"
  />
</template>
