<script setup lang="ts">
  import { usePreferredReducedMotion } from '@vueuse/core'
  import { portraitImageSrcset, projectImageSrcset } from '~/utils/responsiveImages'

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

  const portraitSrcset = computed(() => portraitImageSrcset(bio.value.avatar))
  const featuredImageSrcset = computed(() =>
    featuredProject.value?.image ? projectImageSrcset(featuredProject.value.image) : undefined
  )
  const projectsTo = computed(() => ({ path: localePath('/'), hash: '#projects' }))
  const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))
  const aboutTo = computed(() => ({ path: localePath('/'), hash: '#about' }))

  const cvHref = computed(() => bio.value.cvHref)
  const cvFileName = computed(() => bio.value.cvFileName)

  const metaItems = computed(() => [
    t('hero.roleMeta'),
    bio.value.location ?? t('hero.locationMeta'),
    t('hero.stackMeta')
  ])
</script>

<template>
  <section id="hero" aria-labelledby="hero-title" class="relative overflow-x-clip pt-16 sm:pt-20 lg:pt-24">
    <UContainer>
      <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Text -->
        <div class="space-y-6 lg:col-span-5">
          <div class="space-y-3">
            <p class="font-mono text-xs font-medium uppercase tracking-widest text-primary">
              {{ t('hero.roleMeta') }}
            </p>
            <h1 id="hero-title" class="text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl text-balance">
              {{ brandMark }}
            </h1>
            <p class="text-lg text-text-muted">
              {{ bio.name }}
            </p>
          </div>

          <p class="text-lg leading-relaxed text-text-muted text-pretty">
            {{ bio.tagline }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span v-for="item in metaItems" :key="item"
              class="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-xs font-medium text-text-muted">
              <UIcon name="i-lucide-check-circle-2" class="size-3.5 text-primary" aria-hidden="true" />
              {{ item }}
            </span>
          </div>

          <div class="flex flex-wrap gap-3 pt-2">
            <NuxtLink :to="contactTo"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {{ t('hero.ctaProject') }}
              <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink :to="projectsTo"
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-elevated px-5 py-2.5 text-sm font-medium text-text transition-all hover:bg-surface-hover hover:border-border-strong active:bg-surface-soft">
              {{ t('hero.ctaWork') }}
            </NuxtLink>
            <a v-if="cvHref && cvFileName" :href="cvHref" :download="cvFileName"
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-elevated px-5 py-2.5 text-sm font-medium text-text transition-all hover:bg-surface-hover hover:border-border-strong active:bg-surface-soft"
              :aria-label="t('hero.downloadCvAria')">
              {{ t('hero.downloadCv') }}
              <UIcon name="i-lucide-file-down" class="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <!-- Media -->
        <div v-if="featuredProject" class="relative lg:col-span-7">
          <div
            class="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-lg">
            <div class="aspect-16/10 w-full overflow-hidden">
              <video v-if="useFeaturedVideo" ref="featuredVideoRef" :src="featuredVideoSrc"
                :poster="featuredProject.image" muted loop playsinline autoplay preload="metadata"
                class="block h-full w-full object-cover object-top" aria-hidden="true"
                @loadeddata="playFeaturedVideo" @volumechange="enforceMutedFeaturedVideo" />
              <img v-else-if="featuredProject.image" :src="featuredProject.image" :srcset="featuredImageSrcset"
                sizes="(min-width: 1024px) 640px, 100vw"
                :alt="t('projectCard.projectImageAlt', { title: featuredProject.title })"
                class="block h-full w-full object-cover object-top" loading="eager" fetchpriority="high"
                decoding="async" />
              <div v-else class="flex h-full items-center justify-center bg-surface text-text-subtle">
                <UIcon name="i-lucide-layout-template" class="size-12" />
              </div>
            </div>

            <div
              class="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-5 pt-12 sm:flex-row sm:items-end sm:justify-between">
              <div class="min-w-0">
                <p class="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-white/70">
                  {{ t('hero.featuredLabel') }}
                </p>
                <p class="text-lg font-semibold text-white text-pretty sm:text-xl">
                  {{ featuredProject.title }}
                </p>
              </div>
              <NuxtLink :to="projectsTo"
                class="mt-2 inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:mt-0">
                {{ t('hero.ctaWork') }}
                <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>

          <!-- Portrait badge -->
          <NuxtLink v-if="bio.avatar" :to="aboutTo"
            class="absolute -bottom-5 -start-5 sm:-bottom-6 sm:-start-6 z-20 inline-flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated p-2 pr-4 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            :aria-label="t('about.title')">
            <img :src="bio.avatar" :srcset="portraitSrcset" sizes="64px"
              :alt="t('hero.portraitAlt', { name: bio.name })" width="64" height="64"
              class="size-14 rounded-xl object-cover sm:size-16" loading="eager" decoding="async" />
            <div class="hidden sm:block">
              <p class="text-sm font-semibold text-text">{{ bio.name }}</p>
              <p class="text-xs text-text-muted">{{ bio.location }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </section>
</template>
