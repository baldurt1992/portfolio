<script setup lang="ts">
  const appConfig = useAppConfig()
  const portfolioData = usePortfolioData()
  const { t, locale } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const localePath = useLocalePath()
  const menuOpen = ref(false)

  const homePath = computed(() => localePath('/'))

  const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))

  function localeLinkFor(code: 'es' | 'en') {
    return withoutHash(switchLocalePath(code))
  }

  const langOptions = [
    { code: 'es' as const, label: 'ES' },
    { code: 'en' as const, label: 'EN' }
  ]

  // slideover: sin preventDefault en onOpenAutoFocus el foco entra al panel (drawer/vaul fuerza otro comportamiento)
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
      <NuxtLink :to="homePath" class="font-bold text-xl text-highlighted shrink-0">
        {{ portfolioData.bio.brandName ?? portfolioData.bio.name.split(' ')[0] }}
      </NuxtLink>
      <LayoutAppNav class="hidden lg:flex" />
    </template>

    <template #right>
      <div class="hidden sm:flex items-center gap-0.5 rounded-lg border border-default/40 p-0.5" role="group"
        :aria-label="t('languages.switchTo')">
        <UButton v-for="opt in langOptions" :key="opt.code" :to="localeLinkFor(opt.code)" size="xs"
          :variant="locale === opt.code ? 'soft' : 'ghost'" color="neutral"
          class="min-w-9 justify-center font-semibold tabular-nums">
          {{ opt.label }}
        </UButton>
      </div>
      <UButton :to="contactTo" :label="t('header.contact')" color="primary" variant="soft"
        class="hidden sm:inline-flex" />
      <UColorModeButton />
      <UButton v-if="portfolioData.bio.social.github" :to="portfolioData.bio.social.github" target="_blank"
        rel="noopener noreferrer" icon="i-simple-icons-github" :aria-label="t('a11y.github')" color="neutral"
        variant="ghost" />
      <UButton v-if="portfolioData.bio.social.linkedin" :to="portfolioData.bio.social.linkedin" target="_blank"
        rel="noopener noreferrer" icon="i-simple-icons-linkedin" :aria-label="t('a11y.linkedin')" color="neutral"
        variant="ghost" />
    </template>

    <template #content="{ close }">
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between gap-3 border-b border-default/60 px-4 sm:px-6 h-(--ui-header-height)">
          <NuxtLink :to="homePath" class="font-bold text-xl text-highlighted shrink-0" @click="close?.()">
            {{ portfolioData.bio.brandName ?? portfolioData.bio.name.split(' ')[0] }}
          </NuxtLink>

          <div class="flex items-center gap-1.5">
            <UColorModeButton />
            <UButton
              color="neutral"
              variant="ghost"
              :icon="appConfig.ui.icons.close"
              :aria-label="t('header.close')"
              @click="close?.()"
            />
          </div>
        </div>

        <div class="flex flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <div class="flex items-center gap-0.5 rounded-lg border border-default/40 p-0.5 w-fit" role="group"
            :aria-label="t('languages.switchTo')">
            <UButton v-for="opt in langOptions" :key="opt.code" :to="localeLinkFor(opt.code)" size="sm"
              :variant="locale === opt.code ? 'soft' : 'ghost'" color="neutral"
              class="min-w-11 justify-center font-semibold tabular-nums" @click="close?.()">
              {{ opt.label }}
            </UButton>
          </div>

          <UButton :to="contactTo" :label="t('header.contact')" color="primary" variant="soft"
            class="w-full justify-center" @click="close?.()" />

          <div @click="close?.()">
            <LayoutAppNav orientation="vertical" class="-mx-2.5" />
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
