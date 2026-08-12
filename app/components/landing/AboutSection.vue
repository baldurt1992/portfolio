<script setup lang="ts">
  import { avatarImageSrcset } from '~/utils/responsiveImages'

  const { t } = useI18n()
  const portfolioData = usePortfolioData()
  const bio = computed(() => portfolioData.value.bio)
  const aboutLead = computed(() => portfolioData.value.aboutLead)
  const aboutMore = computed(() => portfolioData.value.aboutMore)
  const aboutAvatarSrcset = computed(() => avatarImageSrcset(bio.value.aboutAvatar))
</script>

<template>
  <section id="about" aria-labelledby="about-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading id="about-heading" :eyebrow="t('about.eyebrow')" :title="t('about.title')"
          :description="t('about.description')" :contained="false" />

        <div class="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div v-if="bio.aboutAvatar" class="lg:col-span-4">
            <div class="relative">
              <img :src="bio.aboutAvatar" :srcset="aboutAvatarSrcset" sizes="(min-width: 1024px) 384px, 100vw"
                :alt="t('hero.aboutAvatarAlt', { name: bio.name })" width="384" height="384"
                class="aspect-square w-full rounded-2xl border border-border bg-surface object-cover shadow-lg"
                loading="lazy" decoding="async" />
              <div
                class="absolute -bottom-4 -end-4 hidden rounded-xl border border-border bg-bg-elevated px-4 py-3 shadow-md lg:block">
                <p class="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                  {{ bio.location }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-center lg:col-span-8">
            <div class="space-y-6">
              <p class="text-xl leading-relaxed text-text text-pretty sm:text-2xl">
                {{ aboutLead }}
              </p>
              <p class="leading-relaxed text-text-muted text-pretty">
                {{ aboutMore }}
              </p>

              <div v-if="bio.cvHref && bio.cvFileName"
                class="flex flex-wrap items-center gap-4 border-t border-border pt-6">
                <a :href="bio.cvHref" :download="bio.cvFileName"
                  class="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  :aria-label="t('hero.downloadCvAria')">
                  {{ t('hero.downloadCv') }}
                  <UIcon name="i-lucide-file-down" class="size-4" aria-hidden="true" />
                </a>
                <span class="flex items-center gap-2 text-sm text-text-muted">
                  <UIcon name="i-lucide-map-pin" class="size-4 text-primary" aria-hidden="true" />
                  {{ bio.location }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
