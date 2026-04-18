<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'

  const colorMode = useColorMode()
  const reduceMotion = usePreferredReducedMotion()
  const { progress, easedProgress } = useLandingScrollProgress()

  const hydrated = ref(false)
  onMounted(() => {
    hydrated.value = true
  })

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  function lerpRgb(
    a: readonly [number, number, number],
    b: readonly [number, number, number],
    t: number
  ): [number, number, number] {
    return [
      Math.round(lerp(a[0], b[0], t)),
      Math.round(lerp(a[1], b[1], t)),
      Math.round(lerp(a[2], b[2], t))
    ]
  }

  // Una sola curva a partir de eased + lineal (dos “relojes” distintos si no se mezclan)
  function smoothScroll01(easedT: number, linearP: number): number {
    const u = lerp(easedT, linearP, 0.5)
    return u * u * (3 - 2 * u)
  }

  const PALETTE_DARK: ReadonlyArray<readonly [number, number, number]> = [
    [7, 12, 18],
    [9, 26, 32],
    [11, 38, 42],
    [14, 32, 48],
    [12, 44, 46],
    [16, 40, 50],
    [12, 30, 40],
    [8, 18, 26]
  ]

  const PALETTE_LIGHT: ReadonlyArray<readonly [number, number, number]> = [
    [250, 250, 249],
    [238, 246, 244],
    [228, 236, 242],
    [220, 232, 238],
    [232, 242, 238],
    [218, 234, 230],
    [206, 226, 224],
    [245, 250, 248]
  ]

  function colorAt(isDark: boolean, u: number): [number, number, number] {
    const stops = isDark ? PALETTE_DARK : PALETTE_LIGHT
    const x = Math.min(1, Math.max(0, u)) * (stops.length - 1)
    const i = Math.min(Math.floor(x), stops.length - 2)
    const f = x - i
    return lerpRgb(stops[i]!, stops[i + 1]!, f)
  }

  function layerU(globalS: number, layerIndex: number, totalLayers: number): number {
    const spread = 0.1
    const center = (layerIndex / Math.max(1, totalLayers - 1) - 0.5) * spread
    return Math.min(1, Math.max(0, globalS + center))
  }

  function meshBackground(isDark: boolean, easedT: number, linearP: number) {
    const s = reduceMotion.value === 'reduce' ? 0 : smoothScroll01(easedT, linearP)

    const heroPresence = Math.max(0, 1 - s / 0.42)

    const layers: string[] = []

    const [hr1, hg1, hb1] = colorAt(isDark, 0.03)
    const [hr2, hg2, hb2] = colorAt(isDark, 0.1)
    const aHeroMain = (isDark ? 0.48 : 0.26) * heroPresence
    const aHeroSide = (isDark ? 0.3 : 0.175) * heroPresence

    layers.push(
      `radial-gradient(ellipse 125% 58% at 50% 10%, rgb(${hr1} ${hg1} ${hb1} / ${aHeroMain}) 0%, transparent 54%)`
    )
    layers.push(
      `radial-gradient(ellipse 85% 48% at 72% 24%, rgb(${hr2} ${hg2} ${hb2} / ${aHeroSide}) 0%, transparent 50%)`
    )
    layers.push(
      `radial-gradient(ellipse 70% 42% at 22% 20%, rgb(${hr1} ${hg1} ${hb1} / ${aHeroSide * 0.85}) 0%, transparent 48%)`
    )

    const n = 6
    for (let i = 0; i < n; i++) {
      const uLayer = layerU(s, i, n)
      const [r, g, b] = colorAt(isDark, uLayer)

      const alpha = isDark
        ? lerp(0.13, 0.3, s) * lerp(0.75, 1, i / (n - 1))
        : lerp(0.078, 0.195, s) * lerp(0.72, 1, i / (n - 1))

      const x = lerp(20, 74, s) + (i / (n - 1)) * 14 - 7
      const y = lerp(14, 80, s) + i * 5.5

      const rx = lerp(58, 88, s) + i * 3
      const ry = lerp(42, 72, s) + (i % 3) * 5
      const fadeEnd = lerp(48, 58, s) + i * 1.2

      layers.push(
        `radial-gradient(ellipse ${rx}% ${ry}% at ${Math.min(92, Math.max(8, x))}% ${Math.min(92, Math.max(8, y))}%, rgb(${r} ${g} ${b} / ${alpha}) 0%, transparent ${fadeEnd}%)`
      )
    }

    const [cr, cg, cb] = colorAt(isDark, s)
    const coreAlpha =
      (isDark ? lerp(0.14, 0.255, s) : lerp(0.09, 0.175, s)) *
      (0.88 + 0.12 * heroPresence)
    const cx = lerp(42, 58, s)
    const cy = lerp(22, 64, s)
    layers.push(
      `radial-gradient(ellipse 92% 78% at ${cx}% ${cy}%, rgb(${cr} ${cg} ${cb} / ${coreAlpha * 0.92}) 0%, transparent 56%)`
    )

    const [vr, vg, vb] = colorAt(isDark, Math.min(1, s + 0.06))
    const vinA =
      (isDark ? lerp(0.17, 0.38, s) : lerp(0.08, 0.175, s)) +
      (isDark ? 0.07 : 0.048) * heroPresence
    layers.push(
      `linear-gradient(${lerp(168, 198, s)}deg, rgb(${vr} ${vg} ${vb} / ${vinA}) 0%, transparent 52%)`
    )

    const voidRgb = isDark ? [4, 10, 18] : [248, 252, 251]
    const voidA = isDark ? lerp(0.18, 0.08, s) : lerp(0.025, 0.008, s)
    layers.push(
      `radial-gradient(ellipse 130% 95% at ${lerp(48, 55, s)}% ${lerp(98, 92, s)}%, rgb(${voidRgb[0]} ${voidRgb[1]} ${voidRgb[2]} / ${voidA}) 0%, transparent 46%)`
    )
    const [d1r, d1g, d1b] = colorAt(isDark, lerp(0.35, 0.55, s))
    const [d2r, d2g, d2b] = colorAt(isDark, lerp(0.5, 0.72, s))
    layers.push(
      `radial-gradient(ellipse 95% 70% at ${lerp(12, 28, s)}% ${lerp(72, 88, s)}%, rgb(${d1r} ${d1g} ${d1b} / ${isDark ? 0.15 : 0.1}) 0%, transparent 58%)`
    )
    layers.push(
      `radial-gradient(ellipse 85% 60% at ${lerp(88, 78, s)}% ${lerp(18, 32, s)}%, rgb(${d2r} ${d2g} ${d2b} / ${isDark ? 0.12 : 0.085}) 0%, transparent 62%)`
    )

    return layers.join(', ')
  }

  function meshBaseColor(isDark: boolean) {
    return isDark ? 'rgb(7, 12, 18)' : 'rgb(250, 250, 249)'
  }

  const backdropStyle = computed(() => {
    const easedT =
      !hydrated.value || reduceMotion.value === 'reduce' ? 0 : easedProgress.value
    const linearP =
      !hydrated.value || reduceMotion.value === 'reduce' ? 0 : progress.value
    const isDark = colorMode.value === 'dark'
    return {
      backgroundColor: meshBaseColor(isDark),
      backgroundImage: meshBackground(isDark, easedT, linearP)
    }
  })
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
    <div class="landing-nebula-bg absolute inset-0 min-h-dvh" :style="backdropStyle" />
  </div>
</template>
