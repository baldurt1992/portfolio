<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'
  import { avatarImageSrcset, portraitImageSrcset, projectImageSrcset } from '~/utils/responsiveImages'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const portfolioData = usePortfolioData()
  const bio = computed(() => portfolioData.value.bio)
  const featuredProject = computed(() => portfolioData.value.projects[0])

  const motion = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => motion.value === 'reduce')

  const featuredVideoSrc = computed(() => {
    const modules = featuredProject.value?.mediaModules ?? []
    const byId = (id: string) => modules.find((m) => m.id === id)?.videoSrc
    return (
      byId('application-main-navigation') ??
      byId('erp-overview') ??
      modules[0]?.videoSrc
    )
  })

  const useFeaturedVideo = computed(
    () => !!featuredVideoSrc.value && !prefersReducedMotion.value
  )

  const featuredVideoRef = ref<HTMLVideoElement | null>(null)

  function enforceMutedFeaturedVideo() {
    const el = featuredVideoRef.value
    if (!el) return
    el.defaultMuted = true
    el.muted = true
    el.volume = 0
  }

  function playFeaturedVideo() {
    const el = featuredVideoRef.value
    if (!el || !useFeaturedVideo.value) return
    enforceMutedFeaturedVideo()
    void el.play().catch((error) => {
      console.warn('[HeroSection] No se pudo autoplay el video destacado', {
        projectId: featuredProject.value?.id,
        error
      })
    })
  }

  watch(useFeaturedVideo, (enabled) => {
    if (!enabled) return
    nextTick(() => {
      enforceMutedFeaturedVideo()
      playFeaturedVideo()
    })
  })

  onMounted(() => {
    if (!useFeaturedVideo.value) return
    nextTick(() => {
      enforceMutedFeaturedVideo()
      playFeaturedVideo()
    })
  })

  const brandMark = computed(
    () => bio.value.brandName ?? bio.value.name.split(' ')[0] ?? 'BaldurDev'
  )

  const showPortraitFlip = computed(
    () =>
      !!bio.value.avatar &&
      !!bio.value.aboutAvatar &&
      motion.value !== 'reduce'
  )

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
  const portraitSrcset = computed(() => portraitImageSrcset(bio.value.avatar))
  const aboutAvatarSrcset = computed(() => avatarImageSrcset(bio.value.aboutAvatar))
  const featuredImageSrcset = computed(() =>
    featuredProject.value?.image ? projectImageSrcset(featuredProject.value.image) : undefined
  )
  const projectsTo = computed(() => ({ path: localePath('/'), hash: '#projects' }))
  const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))

  const cvHref = computed(() => bio.value.cvHref)
  const cvFileName = computed(() => bio.value.cvFileName)
</script>

<template>
  <section id="hero" aria-labelledby="hero-title" class="relative overflow-x-clip">
    <div class="hc-bezel" aria-hidden="true" />

    <UContainer class="py-8 pb-12 sm:py-12 sm:pb-14 lg:py-14 lg:pb-16">
      <!-- pe/pb reserva hard-shadow del deck dentro del contenedor (sin romper max-width del container) -->
      <div class="min-w-0 pe-2 pb-2 sm:pe-3 sm:pb-3">
        <div class="hc-window hc-window--deck w-full min-w-0">
          <UiStackTitleBar :title="`${brandMark} · HOME CARD`" meta="STACK" credit />

          <div class="hc-menubar" aria-hidden="true">
            <strong>File</strong>
            <span>Edit</span>
            <span>Go</span>
            <span>Tools</span>
            <span>Objects</span>
          </div>

          <div class="hc-body min-w-0" :class="bio.avatar && 'pb-14 sm:pb-16 md:pb-20'">
            <div class="manifest-bol-rail mb-6 sm:mb-8 gap-y-1 min-w-0">
              <span class="min-w-0 break-words"><strong>CARD</strong> · {{ brandMark }}</span>
              <span v-if="bio.location" class="min-w-0 break-words">{{ bio.location }}</span>
              <span>CRAFT · HIRE</span>
            </div>

            <div class="grid min-w-0 max-w-full items-stretch gap-8 lg:grid-cols-12 lg:gap-0">
              <div
                class="flex min-w-0 max-w-full flex-col justify-between gap-6 sm:gap-8 lg:col-span-5 lg:pe-8 lg:border-e-[3px] lg:border-ink xl:col-span-5 xl:pe-10">
                <div class="min-w-0 max-w-full space-y-4 sm:space-y-5">
                  <p class="manifest-kicker break-words text-pretty">{{ bio.title }}</p>

                  <h1 id="hero-title" class="min-w-0 max-w-full space-y-2">
                    <span class="manifest-display-xl block text-balance text-highlighted">
                      {{ brandMark }}
                    </span>
                    <span
                      class="block break-words font-pixel text-sm uppercase tracking-[0.1em] text-stencil text-pretty sm:text-base">
                      {{ bio.name }}
                    </span>
                  </h1>

                  <div class="w-full min-w-0 max-w-full text-base leading-relaxed text-pretty text-muted sm:text-lg">
                    <LandingHeroTaglineTypewriter v-if="showTaglineTypewriter" :prefix="bio.taglinePrefix!"
                      :tokens="bio.taglineRotatingTokens!" :full-tagline="bio.tagline" />
                    <p v-else class="break-words">{{ bio.tagline }}</p>
                  </div>
                </div>

                <div class="min-w-0 max-w-full space-y-4">
                  <!-- pe/pb: sombra del botón no sale del flex track -->
                  <div class="flex min-w-0 max-w-full flex-wrap gap-2 pb-1 pe-1 sm:gap-3 sm:pb-1.5 sm:pe-1.5">
                    <NuxtLink :to="contactTo" class="hc-btn">
                      <span class="min-w-0">{{ t('hero.ctaProject') }}</span>
                      <UIcon name="i-lucide-arrow-right" class="size-4 shrink-0" aria-hidden="true" />
                    </NuxtLink>
                    <NuxtLink :to="projectsTo" class="hc-btn hc-btn--ghost">
                      <span class="min-w-0">{{ t('hero.ctaWork') }}</span>
                    </NuxtLink>
                    <a v-if="cvHref && cvFileName" :href="cvHref" class="hc-btn hc-btn--ghost" :download="cvFileName"
                      :aria-label="t('hero.downloadCvAria')">
                      <span class="min-w-0">{{ t('hero.downloadCv') }}</span>
                      <UIcon name="i-lucide-file-down" class="size-4 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                  <p v-if="bio.heroTrustLine"
                    class="manifest-bol-rail justify-start! break-words border-b-0 pt-2 text-pretty text-muted">
                    {{ bio.heroTrustLine }}
                  </p>
                </div>
              </div>

              <div class="relative min-w-0 max-w-full lg:col-span-7 lg:ps-10 xl:col-span-7"
                :class="bio.avatar && 'mb-10 sm:mb-12'">
                <div v-if="featuredProject && (useFeaturedVideo || featuredProject.image)"
                  class="hc-window hc-window--media w-full max-w-full border-2">
                  <UiStackTitleBar :title="featuredProject.title" :meta="String(featuredProject.year)" />
                  <NuxtLink :to="projectsTo"
                    class="manifest-hero-crate group relative block max-w-full min-w-0 no-underline text-inherit outline-none focus-visible:ring-2 focus-visible:ring-seal"
                    :aria-label="featuredProject.title">
                    <div class="manifest-crate-frame max-w-full min-w-0 border-0 min-h-64 sm:min-h-96">
                      <video v-if="useFeaturedVideo" ref="featuredVideoRef" :src="featuredVideoSrc"
                        :poster="featuredProject.image"
                        class="block h-full min-h-64 w-full max-w-full object-cover object-top sm:min-h-96" muted loop
                        playsinline autoplay preload="metadata" aria-hidden="true" @loadeddata="playFeaturedVideo"
                        @volumechange="enforceMutedFeaturedVideo" />
                      <img v-else-if="featuredProject.image" :src="featuredProject.image" :srcset="featuredImageSrcset"
                        sizes="(min-width: 1024px) 640px, 100vw"
                        :alt="t('projectCard.projectImageAlt', { title: featuredProject.title })"
                        class="block h-full min-h-64 w-full max-w-full object-cover object-top sm:min-h-96"
                        loading="eager" fetchpriority="high" decoding="async" />
                    </div>
                    <span v-if="useFeaturedVideo"
                      class="pointer-events-none absolute inset-e-2 top-2 z-20 inline-flex max-w-[calc(100%-1rem)] items-center gap-1 border-2 border-ink bg-seal px-2 py-1 font-pixel text-[0.6875rem] font-bold uppercase tracking-wide text-seal-ink shadow-[2px_2px_0_var(--color-manifest-shadow)] sm:inset-e-3 sm:top-3"
                      aria-hidden="true">
                      <UIcon name="i-lucide-clapperboard" class="size-3.5 shrink-0" />
                      <span class="truncate">{{ t('projectCard.liveBadge') }}</span>
                    </span>
                    <span
                      class="absolute inset-x-0 bottom-0 z-10 flex max-w-full flex-col items-start gap-2 bg-linear-to-t from-seal-ink via-seal-ink/80 to-transparent px-3 pb-3 pt-16 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:px-5 sm:pb-5 sm:pt-20">
                      <span
                        class="min-w-0 max-w-full font-display text-base font-bold uppercase tracking-tight text-pretty text-media-fg line-clamp-2 sm:text-xl md:text-2xl">
                        {{ featuredProject.title }}
                      </span>
                      <span class="hc-btn hc-btn--ghost hc-btn--sm shrink-0">
                        GO
                      </span>
                    </span>
                  </NuxtLink>
                </div>

                <div v-else class="hc-window flex min-h-64 w-full max-w-full flex-col sm:min-h-96" aria-hidden="true">
                  <UiStackTitleBar title="EMPTY CARD" />
                  <div class="flex flex-1 items-center justify-center">
                    <UIcon name="i-lucide-layout-template" class="size-16 text-seal/50" />
                  </div>
                </div>

                <div v-if="bio.avatar"
                  class="absolute -bottom-2 inset-e-3 z-20 flex flex-col items-center gap-1 sm:-bottom-5 sm:inset-e-8">
                  <NuxtLink v-if="showPortraitFlip" :to="portraitAboutTo"
                    class="group relative shrink-0 cursor-pointer text-inherit no-underline outline-none perspective-[1100px] focus-visible:ring-2 focus-visible:ring-seal"
                    :aria-label="portraitLinkAriaLabel">
                    <span
                      class="manifest-keep-round relative block size-20 transform-3d rounded-full border-[3px] border-ink shadow-[4px_4px_0_var(--color-manifest-shadow)] transition-transform duration-500 ease-in-out will-change-transform sm:size-24 md:size-28"
                      :class="flipInnerClass">
                      <span
                        class="manifest-keep-round absolute inset-0 overflow-hidden rounded-full backface-hidden bg-dock-asphalt">
                        <img :src="bio.avatar" :srcset="portraitSrcset" sizes="112px"
                          :alt="t('hero.portraitAlt', { name: bio.name })" width="112" height="112"
                          class="size-full object-cover" loading="eager" decoding="async" />
                      </span>
                      <span
                        class="manifest-keep-round absolute inset-0 overflow-hidden rounded-full backface-hidden transform-[rotateY(180deg)] bg-dock-asphalt">
                        <img v-if="bio.aboutAvatar" :src="bio.aboutAvatar" :srcset="aboutAvatarSrcset" sizes="112px"
                          :alt="t('hero.illustrationAlt', { name: bio.name })" width="112" height="112"
                          class="size-full scale-110 object-cover object-center" loading="eager" decoding="async" />
                      </span>
                    </span>
                  </NuxtLink>
                  <NuxtLink v-else :to="portraitAboutTo"
                    class="relative inline-flex shrink-0 cursor-pointer text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-seal"
                    :aria-label="t('hero.portraitAriaSimple')">
                    <img :src="bio.avatar" :srcset="portraitSrcset" sizes="112px"
                      :alt="t('hero.portraitAlt', { name: bio.name })" width="112" height="112"
                      class="manifest-keep-round size-20 shrink-0 rounded-full border-[3px] border-ink object-cover shadow-[4px_4px_0_var(--color-manifest-shadow)] sm:size-24 md:size-28"
                      loading="eager" decoding="async" />
                  </NuxtLink>
                  <p
                    class="hero-portrait-tap-hint max-w-32 text-center font-pixel text-[0.6875rem] text-pretty text-muted sm:max-w-36">
                    {{ t('hero.portraitTapHint') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <div class="hc-bezel opacity-80" aria-hidden="true" />
  </section>
</template>
