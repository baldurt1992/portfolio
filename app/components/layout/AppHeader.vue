<script setup lang="ts">
  import { withoutHash } from '~/utils/withoutHash'

  const portfolioData = usePortfolioData()
  const { t, locale } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const localePath = useLocalePath()

  const contactTo = computed(() => `${withoutHash(localePath('/'))}#contact`)

  function localeLinkFor(code: 'es' | 'en') {
    return withoutHash(switchLocalePath(code))
  }

  const langOptions = [
    { code: 'es' as const, label: 'ES' },
    { code: 'en' as const, label: 'EN' }
  ]

  /**
   * UHeader por defecto mezcla onOpenAutoFocus → preventDefault (foco en el botón + aria-hidden).
   * vaul-vue (mode drawer) además fuerza .prevent en OpenAutoFocus: no se puede corregir desde fuera.
   * Slideover (Reka Dialog) respeta el foco al panel si no llamamos preventDefault.
   */
  const headerMenu = {
    side: 'right' as const,
    content: {
      onOpenAutoFocus: (_e: Event) => {
        /* sin preventDefault: el foco entra al contenido del slideover */
      },
    },
  }
</script>

<template>
  <UHeader mode="slideover" :menu="headerMenu">
    <template #left>
      <NuxtLink :to="withoutHash(localePath('/'))" class="font-bold text-xl text-highlighted shrink-0">
        {{ portfolioData.bio.brandName ?? portfolioData.bio.name.split(' ')[0] }}
      </NuxtLink>
      <LayoutAppNav class="hidden lg:flex" />
    </template>

    <template #right>
      <div
        class="hidden sm:flex items-center gap-0.5 rounded-lg border border-default/40 p-0.5"
        role="group"
        :aria-label="t('languages.switchTo')"
      >
        <UButton
          v-for="opt in langOptions"
          :key="opt.code"
          :to="localeLinkFor(opt.code)"
          size="xs"
          :variant="locale === opt.code ? 'soft' : 'ghost'"
          color="neutral"
          class="min-w-9 justify-center font-semibold tabular-nums"
        >
          {{ opt.label }}
        </UButton>
      </div>
      <UButton
        :to="contactTo"
        external
        :label="t('header.contact')"
        color="primary"
        variant="soft"
        class="hidden sm:inline-flex"
      />
      <UColorModeButton />
      <UButton
        v-if="portfolioData.bio.social.github"
        :to="portfolioData.bio.social.github"
        target="_blank"
        rel="noopener noreferrer"
        icon="i-simple-icons-github"
        :aria-label="t('a11y.github')"
        color="neutral"
        variant="ghost"
      />
      <UButton
        v-if="portfolioData.bio.social.linkedin"
        :to="portfolioData.bio.social.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        icon="i-simple-icons-linkedin"
        :aria-label="t('a11y.linkedin')"
        color="neutral"
        variant="ghost"
      />
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <div
          class="flex items-center gap-0.5 rounded-lg border border-default/40 p-0.5 w-fit -mx-2.5"
          role="group"
          :aria-label="t('languages.switchTo')"
        >
          <UButton
            v-for="opt in langOptions"
            :key="opt.code"
            :to="localeLinkFor(opt.code)"
            size="sm"
            :variant="locale === opt.code ? 'soft' : 'ghost'"
            color="neutral"
            class="min-w-11 justify-center font-semibold tabular-nums"
          >
            {{ opt.label }}
          </UButton>
        </div>
        <LayoutAppNav orientation="vertical" class="-mx-2.5" />
      </div>
    </template>
  </UHeader>
</template>
