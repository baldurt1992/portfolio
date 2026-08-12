<script setup lang="ts">
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
  <UHeader v-model:open="menuOpen" mode="slideover" :menu="headerMenu">
    <template #left>
      <NuxtLink :to="homePath" class="flex items-center gap-2 text-base font-semibold text-text hover:text-primary transition-colors">
        <span class="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
          {{ brandMark.charAt(0) }}
        </span>
        <span class="hidden sm:inline">{{ brandMark }}</span>
      </NuxtLink>

      <div class="hidden lg:block ms-4 border-s border-border ps-4">
        <LayoutAppNav />
      </div>
    </template>

    <template #right>
      <div class="hidden sm:flex items-center rounded-lg border border-border bg-bg-elevated p-0.5" role="group" :aria-label="t('languages.switchTo')">
        <button v-for="opt in langOptions" :key="opt.code" type="button"
          class="px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors"
          :class="locale === opt.code ? 'bg-primary text-white' : 'text-text-muted hover:text-text hover:bg-surface-soft'"
          :aria-pressed="locale === opt.code" @click="onLocaleClick(opt.code)">
          {{ opt.label }}
        </button>
      </div>

      <NuxtLink :to="contactTo" class="hidden sm:inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
        {{ t('header.contact') }}
      </NuxtLink>

      <UColorModeButton color="neutral" variant="ghost" class="rounded-lg" />

      <UButton v-if="portfolioData.bio.social.github" :to="portfolioData.bio.social.github" target="_blank"
        rel="noopener noreferrer" icon="i-simple-icons-github" :aria-label="t('a11y.github')" color="neutral"
        variant="ghost" class="rounded-lg hidden sm:inline-flex" />
      <UButton v-if="portfolioData.bio.social.linkedin" :to="portfolioData.bio.social.linkedin" target="_blank"
        rel="noopener noreferrer" icon="i-simple-icons-linkedin" :aria-label="t('a11y.linkedin')" color="neutral"
        variant="ghost" class="rounded-lg hidden sm:inline-flex" />
    </template>

    <template #content="{ close }">
      <div class="flex h-full flex-col bg-bg-elevated">
        <div class="flex items-center justify-between gap-3 border-b border-border px-4 sm:px-6 h-(--ui-header-height)">
          <NuxtLink :to="homePath" class="flex items-center gap-2 text-base font-semibold text-text" @click="close?.()">
            <span class="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              {{ brandMark.charAt(0) }}
            </span>
            {{ brandMark }}
          </NuxtLink>

          <div class="flex items-center gap-1.5">
            <UColorModeButton color="neutral" variant="ghost" class="rounded-lg" />
            <UButton color="neutral" variant="ghost" icon="i-lucide-x" :aria-label="t('header.close')"
              class="rounded-lg" @click="close?.()" />
          </div>
        </div>

        <div class="flex flex-col gap-6 overflow-y-auto p-4 sm:p-6">
          <div class="flex items-center rounded-lg border border-border bg-bg p-0.5 w-fit" role="group" :aria-label="t('languages.switchTo')">
            <button v-for="opt in langOptions" :key="opt.code" type="button"
              class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
              :class="locale === opt.code ? 'bg-primary text-white' : 'text-text-muted hover:text-text hover:bg-surface-soft'"
              :aria-pressed="locale === opt.code" @click="onLocaleClick(opt.code, close)">
              {{ opt.label }}
            </button>
          </div>

          <LayoutAppNav orientation="vertical" @click="close?.()" />

          <NuxtLink :to="contactTo"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-primary-hover"
            @click="close?.()">
            {{ t('header.contact') }}
          </NuxtLink>

          <div class="flex items-center gap-2 pt-2 border-t border-border">
            <UButton v-if="portfolioData.bio.social.github" :to="portfolioData.bio.social.github" target="_blank"
              rel="noopener noreferrer" icon="i-simple-icons-github" :aria-label="t('a11y.github')" color="neutral"
              variant="ghost" class="rounded-lg" @click="close?.()" />
            <UButton v-if="portfolioData.bio.social.linkedin" :to="portfolioData.bio.social.linkedin" target="_blank"
              rel="noopener noreferrer" icon="i-simple-icons-linkedin" :aria-label="t('a11y.linkedin')" color="neutral"
              variant="ghost" class="rounded-lg" @click="close?.()" />
          </div>
        </div>
      </div>
    </template>
  </UHeader>
</template>
