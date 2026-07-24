<script setup lang="ts">
  const appConfig = useAppConfig()
  const portfolioData = usePortfolioData()
  const { t, locale, setLocale } = useI18n()
  const localePath = useLocalePath()
  const menuOpen = ref(false)

  const homePath = computed(() => localePath('/'))

  const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))

  const brandMark = computed(
    () =>
      portfolioData.value.bio.brandName
      ?? portfolioData.value.bio.name.split(' ')[0]
      ?? 'BaldurDev'
  )

  /**
   * Paths de router (sin app.baseURL). Con `prefix_except_default`,
   * `switchLocalePath` / `localePath('/', 'es')` pueden resolver ES→`/en` si ya estás en EN.
   */
  function localeLinkFor(code: 'es' | 'en') {
    return code === 'en' ? '/en' : '/'
  }

  const langOptions = [
    { code: 'es' as const, label: 'ES' },
    { code: 'en' as const, label: 'EN' }
  ]

  async function onLocaleClick(code: 'es' | 'en', close?: () => void) {
    try {
      if (locale.value !== code) {
        await setLocale(code)
      }
    } catch (error) {
      console.error('[AppHeader] Error al cambiar idioma', { code, error })
      await navigateTo(localeLinkFor(code))
    } finally {
      close?.()
    }
  }

  const headerMenu = {
    side: 'right' as const,
    content: {
      onOpenAutoFocus: (_e: Event) => { },
      onCloseAutoFocus: (e: Event) => e.preventDefault()
    }
  }
</script>

<template>
  <UHeader v-model:open="menuOpen" mode="slideover" :menu="headerMenu" :ui="{
    root: 'border-b-[3px] border-ink bg-dock-asphalt/95 backdrop-blur-sm shadow-[0_4px_0_var(--color-manifest-shadow)]'
  }">
    <template #left>
      <NuxtLink :to="homePath" class="manifest-brand text-sm sm:text-base text-highlighted shrink-0">
        {{ brandMark }}
      </NuxtLink>
      <div class="hidden lg:block ms-2 border-s-2 border-ink ps-2">
        <LayoutAppNav />
      </div>
    </template>

    <template #right>
      <div class="hidden sm:flex items-center gap-0.5 border-2 border-ink bg-dock-steel p-px" role="group"
        :aria-label="t('languages.switchTo')">
        <button v-for="opt in langOptions" :key="opt.code" type="button" class="hc-lang-chip"
          :class="locale === opt.code && 'is-active'" :aria-pressed="locale === opt.code"
          @click="onLocaleClick(opt.code)">
          {{ opt.label }}
        </button>
      </div>
      <NuxtLink :to="contactTo" class="hc-btn hc-btn--sm hidden sm:inline-flex">
        {{ t('header.contact') }}
      </NuxtLink>
      <UColorModeButton />
      <UButton v-if="portfolioData.bio.social.github" :to="portfolioData.bio.social.github" target="_blank"
        rel="noopener noreferrer" icon="i-simple-icons-github" :aria-label="t('a11y.github')" color="neutral"
        variant="ghost" />
      <UButton v-if="portfolioData.bio.social.linkedin" :to="portfolioData.bio.social.linkedin" target="_blank"
        rel="noopener noreferrer" icon="i-simple-icons-linkedin" :aria-label="t('a11y.linkedin')" color="neutral"
        variant="ghost" />
    </template>

    <template #content="{ close }">
      <div class="flex h-full flex-col bg-dock-asphalt">
        <UiStackTitleBar :title="`${brandMark} · MENU`" meta="NAV" />

        <div class="flex items-center justify-between gap-3 border-b-2 border-ink px-4 sm:px-6 h-(--ui-header-height)">
          <NuxtLink :to="homePath" class="manifest-brand text-base text-highlighted shrink-0" @click="close?.()">
            {{ brandMark }}
          </NuxtLink>

          <div class="flex items-center gap-1.5">
            <UColorModeButton />
            <UButton color="neutral" variant="ghost" :icon="appConfig.ui.icons.close" :aria-label="t('header.close')"
              @click="close?.()" />
          </div>
        </div>

        <div class="flex flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <div class="flex items-center gap-0.5 border-2 border-ink bg-dock-steel p-px w-fit" role="group"
            :aria-label="t('languages.switchTo')">
            <button v-for="opt in langOptions" :key="opt.code" type="button" class="hc-lang-chip"
              :class="locale === opt.code && 'is-active'" :aria-pressed="locale === opt.code"
              @click="onLocaleClick(opt.code, close)">
              {{ opt.label }}
            </button>
          </div>

          <NuxtLink :to="contactTo" class="hc-btn w-full justify-center" @click="close?.()">
            {{ t('header.contact') }}
          </NuxtLink>

          <div class="hc-window border-2" @click="close?.()">
            <div class="hc-menubar">
              <strong>Go</strong>
              <span>Cards</span>
            </div>
            <div class="p-2">
              <LayoutAppNav orientation="vertical" />
            </div>
          </div>

          <div class="flex items-center gap-1.5 pt-2">
            <UButton v-if="portfolioData.bio.social.github" :to="portfolioData.bio.social.github" target="_blank"
              rel="noopener noreferrer" icon="i-simple-icons-github" :aria-label="t('a11y.github')" color="neutral"
              variant="ghost" @click="close?.()" />
            <UButton v-if="portfolioData.bio.social.linkedin" :to="portfolioData.bio.social.linkedin" target="_blank"
              rel="noopener noreferrer" icon="i-simple-icons-linkedin" :aria-label="t('a11y.linkedin')" color="neutral"
              variant="ghost" @click="close?.()" />
          </div>
        </div>
      </div>
    </template>
  </UHeader>
</template>
