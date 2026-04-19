<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const portfolioData = usePortfolioData()
  const bio = computed(() => portfolioData.value.bio)

  const motion = usePreferredReducedMotion()

  const showPortraitFlip = computed(
    () =>
      !!bio.value.avatar &&
      !!bio.value.aboutAvatar &&
      motion.value !== 'reduce'
  )

  // group-hover/focus no alteran el DOM hasta interacción → sin mismatch de hidratación
  const flipInnerClass = computed(() =>
    showPortraitFlip.value
      ? 'group-hover:transform-[rotateY(180deg)] group-focus-visible:transform-[rotateY(180deg)]'
      : ''
  )

  const portraitLinkAriaLabel = computed(() =>
    showPortraitFlip.value ? t('hero.portraitAriaFlip') : t('hero.portraitAriaSimple')
  )

  const showTaglineTypewriter = computed(
    () =>
      !!bio.value.taglinePrefix &&
      Array.isArray(bio.value.taglineRotatingTokens) &&
      bio.value.taglineRotatingTokens.length > 0
  )

  const portraitAboutTo = computed(() => ({ path: localePath('/'), hash: '#about' }))

  const heroLinks = computed(() => {
    const home = localePath('/')
    return [
      {
        label: t('hero.ctaProject'),
        to: { path: home, hash: '#contact' },
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl' as const
      },
      {
        label: t('hero.ctaWork'),
        to: { path: home, hash: '#projects' },
        size: 'xl' as const,
        color: 'neutral' as const,
        variant: 'outline' as const
      }
    ]
  })
</script>

<template>
  <section id="hero" aria-labelledby="hero-title">
    <UPageHero :title="bio.name" :description="showTaglineTypewriter ? undefined : bio.tagline" :headline="bio.title"
      orientation="vertical" :links="heroLinks">
      <template #title>
        <span id="hero-title" class="text-pretty">{{ bio.name }}</span>
      </template>

      <template v-if="showTaglineTypewriter" #description>
        <LandingHeroTaglineTypewriter :prefix="bio.taglinePrefix!" :tokens="bio.taglineRotatingTokens!"
          :full-tagline="bio.tagline" />
      </template>

      <template v-if="bio.avatar" #body>
        <div class="flex flex-col items-center justify-center w-full gap-2 sm:gap-3">
          <NuxtLink v-if="showPortraitFlip" :to="portraitAboutTo"
            class="group relative shrink-0 rounded-full no-underline text-inherit cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default perspective-[1100px]"
            :aria-label="portraitLinkAriaLabel">
            <span
              class="relative block w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 transform-3d transition-transform duration-500 ease-in-out will-change-transform rounded-full ring-4 ring-default shadow-lg"
              :class="flipInnerClass">
              <span class="absolute inset-0 overflow-hidden rounded-full backface-hidden bg-default">
                <img :src="bio.avatar" :alt="t('hero.portraitAlt', { name: bio.name })" width="224" height="224"
                  class="size-full object-cover" loading="eager" fetchpriority="high" decoding="async" />
              </span>
              <span
                class="absolute inset-0 overflow-hidden rounded-full backface-hidden transform-[rotateY(180deg)] bg-default">
                <img v-if="bio.aboutAvatar" :src="bio.aboutAvatar" :alt="t('hero.illustrationAlt', { name: bio.name })"
                  width="224" height="224" class="size-full object-cover object-center scale-110" loading="eager"
                  decoding="async" />
              </span>
            </span>
          </NuxtLink>
          <NuxtLink v-else :to="portraitAboutTo"
            class="relative shrink-0 inline-flex rounded-full no-underline text-inherit cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default"
            :aria-label="t('hero.portraitAriaSimple')">
            <img :src="bio.avatar" :alt="t('hero.portraitAlt', { name: bio.name })" width="224" height="224"
              class="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 object-cover rounded-full ring-4 ring-default shadow-lg shrink-0"
              loading="eager" fetchpriority="high" decoding="async" />
          </NuxtLink>
          <p v-if="bio.avatar" class="hero-portrait-tap-hint text-center text-xs text-muted max-w-[16rem] text-pretty">
            {{ t('hero.portraitTapHint') }}
          </p>
        </div>
      </template>

      <!-- Misma columna y padding que el resto del hero: evita el “salto” de espacio del slot #bottom fuera del UContainer. -->
      <template #links>
        <div class="flex w-full max-w-2xl mx-auto flex-col items-center gap-5">
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <UButton v-for="(link, index) in heroLinks" :key="index" v-bind="link" />
          </div>
          <p v-if="bio.heroTrustLine"
            class="w-full border-t border-default/25 pt-5 text-center text-xs text-muted leading-relaxed text-pretty sm:text-sm">
            {{ bio.heroTrustLine }}
          </p>
        </div>
      </template>
    </UPageHero>
  </section>
</template>
