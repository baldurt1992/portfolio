<script setup lang="ts">
const portfolioData = usePortfolioData()
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()
const menuOpen = ref(false)

const homePath = computed(() => localePath('/'))
const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))
const brandName = computed(() => portfolioData.value.bio.brandName ?? 'BaldurDev')

function localeLinkFor(code: 'es' | 'en') {
  return code === 'en' ? '/en' : '/'
}

const langOptions = [
  { code: 'es' as const, label: 'ES' },
  { code: 'en' as const, label: 'EN' }
]

async function onLocaleClick(code: 'es' | 'en', close?: () => void) {
  try {
    if (locale.value !== code) await setLocale(code)
  } catch (error) {
    console.error('[AppHeader] Error al cambiar idioma', { code, error })
    await navigateTo(localeLinkFor(code))
  } finally {
    close?.()
  }
}

const navLinks = computed(() => [
  { label: t('nav.projects'), to: { path: localePath('/'), hash: '#projects' } },
  { label: t('nav.showcase'), to: localePath('/showcase') },
  { label: t('nav.skills'), to: { path: localePath('/'), hash: '#technologies' } },
  { label: t('nav.about'), to: { path: localePath('/'), hash: '#about' } },
  { label: t('nav.experience'), to: { path: localePath('/'), hash: '#experience' } },
  { label: t('nav.contact'), to: { path: localePath('/'), hash: '#contact' } }
])

const headerMenu = {
  side: 'right' as const,
  content: {
    onOpenAutoFocus: (_e: Event) => {},
    onCloseAutoFocus: (e: Event) => e.preventDefault()
  }
}

const headerUi = {
  container:
    'flex items-center justify-between gap-4 h-(--ui-header-height) w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10',
  left: 'min-w-0 lg:flex-none',
  center: 'hidden lg:flex flex-1 justify-center',
  right: 'flex items-center gap-2 sm:gap-3'
}
</script>

<template>
  <UHeader
    v-model:open="menuOpen"
    mode="slideover"
    :title="brandName"
    :to="homePath"
    :menu="headerMenu"
    :toggle="!menuOpen"
    :ui="headerUi"
  >
    <template #title>
      <span class="font-heading text-lg font-semibold leading-none tracking-tight text-text">
        {{ brandName }}
      </span>
    </template>

    <nav class="flex items-center gap-1" :aria-label="t('header.description')">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.to"
        class="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
        active-class="text-primary"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <template #right>
      <div
        class="hidden sm:flex items-center rounded-lg border border-border bg-bg-elevated p-0.5"
        role="group"
        :aria-label="t('languages.switchTo')"
      >
        <button
          v-for="opt in langOptions"
          :key="opt.code"
          type="button"
          class="min-h-9 min-w-9 px-2.5 text-xs font-medium rounded-md transition-colors"
          :class="
            locale === opt.code
              ? 'bg-accent text-slate-900'
              : 'text-text-muted hover:text-text hover:bg-surface-soft'
          "
          :aria-pressed="locale === opt.code"
          @click="onLocaleClick(opt.code)"
        >
          {{ opt.label }}
        </button>
      </div>

      <NuxtLink
        :to="contactTo"
        class="motion-lift hidden min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-accent-hover hover:shadow-md sm:inline-flex"
      >
        {{ t('header.contact') }}
      </NuxtLink>

      <UColorModeButton color="neutral" variant="ghost" class="rounded-lg" />
    </template>

    <template #content="{ close }">
      <div class="flex h-full flex-col bg-bg-elevated">
        <div
          class="flex items-center justify-between gap-3 border-b border-border px-5 sm:px-6 h-(--ui-header-height)"
        >
          <NuxtLink
            :to="homePath"
            class="font-heading text-base font-semibold text-text"
            @click="close?.()"
          >
            {{ brandName }}
          </NuxtLink>

          <div class="flex items-center gap-1.5">
            <UColorModeButton color="neutral" variant="ghost" class="rounded-lg" />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              :aria-label="t('header.close')"
              class="min-h-11 min-w-11 rounded-lg"
              @click="close?.()"
            />
          </div>
        </div>

        <div class="flex flex-col gap-6 overflow-y-auto p-5 sm:p-6">
          <div
            class="flex items-center rounded-lg border border-border bg-bg p-0.5 w-fit"
            role="group"
            :aria-label="t('languages.switchTo')"
          >
            <button
              v-for="opt in langOptions"
              :key="opt.code"
              type="button"
              class="min-h-9 px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
              :class="
                locale === opt.code
                  ? 'bg-accent text-slate-900'
                  : 'text-text-muted hover:text-text hover:bg-surface-soft'
              "
              :aria-pressed="locale === opt.code"
              @click="onLocaleClick(opt.code, close)"
            >
              {{ opt.label }}
            </button>
          </div>

          <nav class="flex flex-col gap-1" :aria-label="t('header.description')">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.label"
              :to="link.to"
              class="rounded-lg px-3 py-3 text-lg font-medium text-text transition-colors hover:bg-surface-soft"
              active-class="text-primary"
              @click="close?.()"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <NuxtLink
            :to="contactTo"
            class="motion-lift inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-base font-semibold text-slate-900 shadow-sm hover:bg-accent-hover hover:shadow-md"
            @click="close?.()"
          >
            {{ t('header.contact') }}
          </NuxtLink>

          <div class="flex items-center gap-2 pt-2 border-t border-border">
            <UButton
              v-if="portfolioData.bio.social.github"
              :to="portfolioData.bio.social.github"
              target="_blank"
              rel="noopener noreferrer"
              icon="i-simple-icons:github"
              :aria-label="t('a11y.github')"
              color="neutral"
              variant="ghost"
              class="rounded-lg"
              @click="close?.()"
            />
            <UButton
              v-if="portfolioData.bio.social.linkedin"
              :to="portfolioData.bio.social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              icon="i-simple-icons:linkedin"
              :aria-label="t('a11y.linkedin')"
              color="neutral"
              variant="ghost"
              class="rounded-lg"
              @click="close?.()"
            />
          </div>
        </div>
      </div>
    </template>
  </UHeader>
</template>
