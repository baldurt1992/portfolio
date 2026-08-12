<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import gsap from 'gsap'

  const portfolioData = usePortfolioData()
  const { t } = useI18n()
  const localePath = useLocalePath()

  const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))
  const tokens = computed(() => portfolioData.value.bio.taglineRotatingTokens ?? [])
  const { index: tokenIndex } = useRotatingIndex(() => tokens.value.length, 3000)

  const displayedToken = ref('')
  const outgoingToken = ref('')
  const heroRef = ref<HTMLElement | null>(null)
  const titleRef = ref<HTMLElement | null>(null)
  const subtitleRef = ref<HTMLElement | null>(null)
  const ctaRef = ref<HTMLElement | null>(null)
  const impactRef = ref<HTMLElement | null>(null)
  const incomingRef = ref<HTMLElement | null>(null)
  const outgoingRef = ref<HTMLElement | null>(null)
  const sepAccentRef = ref<HTMLElement | null>(null)

  let tokenTl: gsap.core.Timeline | null = null
  let introCtx: gsap.Context | null = null

  function tokenProgress(i: number) {
    const n = tokens.value.length
    return n > 0 ? (i + 1) / n : 0
  }

  function animateProgressBar(i: number, prev?: number) {
    const el = sepAccentRef.value
    const n = tokens.value.length
    if (!el || n < 1) return

    const wrapped = prev !== undefined && i === 0 && prev === n - 1
    gsap.killTweensOf(el)
    if (wrapped) {
      gsap.set(el, { scaleX: 0 })
    }
    gsap.to(el, {
      scaleX: tokenProgress(i),
      duration: wrapped ? 0.35 : 0.45,
      ease: 'power2.out'
    })
  }

  watch(
    tokens,
    (list) => {
      if (!displayedToken.value && list[0]) displayedToken.value = list[0]
    },
    { immediate: true }
  )

  watch(tokenIndex, async (i, prev) => {
    animateProgressBar(i, prev)

    const next = tokens.value[i]
    if (!next || next === displayedToken.value) return

    outgoingToken.value = displayedToken.value
    displayedToken.value = next
    await nextTick()

    const incoming = incomingRef.value
    const outgoing = outgoingRef.value
    if (!incoming) return

    tokenTl?.kill()
    gsap.set(incoming, {
      yPercent: 40,
      opacity: 0
    })

    tokenTl = gsap.timeline({
      onComplete: () => {
        outgoingToken.value = ''
      }
    })

    if (outgoing) {
      tokenTl.to(
        outgoing,
        {
          yPercent: -40,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        },
        0
      )
    }

    tokenTl.to(
      incoming,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      },
      0.05
    )
  })

  onMounted(() => {
    if (sepAccentRef.value) {
      gsap.set(sepAccentRef.value, { scaleX: tokenProgress(tokenIndex.value) })
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const root = heroRef.value
    const title = titleRef.value
    const subtitle = subtitleRef.value
    const cta = ctaRef.value
    const impact = impactRef.value
    if (!root || !title || !subtitle || !cta || !impact) {
      console.error('[HeroSection] Faltan nodos para la intro GSAP', {
        hasRoot: Boolean(root),
        hasTitle: Boolean(title),
        hasSubtitle: Boolean(subtitle),
        hasCta: Boolean(cta),
        hasImpact: Boolean(impact)
      })
      return
    }

    introCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } })

      tl.from(title, {
        y: 20,
        opacity: 0,
        delay: 0.08
      })
        .from(subtitle, { y: 16, opacity: 0 }, '-=0.32')
        .from(cta, { y: 12, opacity: 0 }, '-=0.28')
        .from(impact, { y: 16, opacity: 0 }, '-=0.32')
    }, root)
  })

  onUnmounted(() => {
    tokenTl?.kill()
    if (sepAccentRef.value) gsap.killTweensOf(sepAccentRef.value)
    introCtx?.revert()
  })
</script>

<template>
  <section id="hero" ref="heroRef"
    class="relative flex min-h-[calc(100dvh-var(--ui-header-height))] items-center overflow-x-clip px-5 pb-20 sm:px-8 lg:px-10 lg:pb-12">
    <div class="mx-auto w-full max-w-7xl">
      <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="space-y-8 lg:col-span-7">
          <div class="space-y-5">
            <p class="font-mono text-sm font-medium uppercase tracking-widest text-accent">
              {{ t('hero.taglinePrefix') }}
            </p>
            <h1 ref="titleRef" class="font-heading text-5xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl">
              {{ portfolioData.bio.brandName }}
            </h1>
            <div ref="subtitleRef" class="space-y-4">
              <p class="font-mono text-lg text-primary sm:text-xl">
                {{ portfolioData.bio.title }}
              </p>
              <p class="max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
                {{ portfolioData.bio.tagline }}
              </p>
              <p class="max-w-2xl text-base text-text-subtle">
                {{ portfolioData.bio.heroTrustLine }}
              </p>
            </div>
          </div>

          <div ref="ctaRef" class="flex flex-wrap items-center gap-4">
            <NuxtLink :to="contactTo"
              class="motion-lift inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-slate-900 shadow-sm hover:bg-accent-hover hover:shadow-md">
              {{ t('hero.ctaPrimary') }}
              <UIcon name="i-lucide-arrow-right" class="size-5" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink :to="localePath({ path: '/', hash: '#projects' })"
              class="motion-lift inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-bg-elevated/80 px-6 py-3 text-base font-medium text-text backdrop-blur-sm hover:border-border-strong hover:bg-surface-hover">
              {{ t('hero.ctaSecondary') }}
            </NuxtLink>
            <a v-if="portfolioData.bio.cvHref" :href="portfolioData.bio.cvHref" :download="portfolioData.bio.cvFileName"
              class="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent">
              <UIcon name="i-lucide-file-down" class="size-4" aria-hidden="true" />
              {{ t('hero.ctaCv') }}
            </a>
          </div>
        </div>

        <div ref="impactRef" class="lg:col-span-5" aria-live="polite">
          <p class="font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
            {{ t('hero.impactLead') }}
          </p>
          <div class="relative mt-5 mb-6 h-px w-full bg-border" aria-hidden="true">
            <span ref="sepAccentRef" class="absolute inset-y-0 left-0 h-full w-full origin-left scale-x-0 bg-accent" />
          </div>
          <div class="hero-token-clip font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <p v-if="outgoingToken" ref="outgoingRef" class="hero-token hero-token-out text-accent">
              {{ outgoingToken }}
            </p>
            <p ref="incomingRef" class="hero-token text-accent">
              {{ displayedToken }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .hero-token-clip {
    position: relative;
    overflow: hidden;
    perspective: none;
    height: 1.2em;
  }

  .hero-token {
    margin: 0;
    font-size: inherit;
    line-height: 1.2;
    white-space: nowrap;
    will-change: transform, opacity;
  }

  .hero-token-out {
    position: absolute;
    inset-inline: 0;
    top: 0;
    pointer-events: none;
  }
</style>
