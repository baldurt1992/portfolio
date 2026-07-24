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
        <UiSectionHeading id="about-heading" lot="HOME" :eyebrow="t('about.eyebrow')" :title="t('about.title')"
          :description="t('about.description')" :contained="false" />

        <div class="hc-window mt-12">
          <UiStackTitleBar title="ABOUT · BIO CARD" :meta="bio.location" />
          <div class="hc-body">
            <div class="flex flex-col md:flex-row md:items-start gap-8 md:gap-10">
              <div v-if="bio.aboutAvatar" class="shrink-0">
                <img :src="bio.aboutAvatar" :srcset="aboutAvatarSrcset" sizes="(min-width: 640px) 112px, 96px"
                  :alt="t('hero.aboutAvatarAlt', { name: bio.name })" width="128" height="128"
                  class="w-24 h-24 sm:w-28 sm:h-28 object-cover border-[3px] border-ink shadow-[4px_4px_0_var(--color-manifest-shadow)] bg-dock-steel [image-rendering:pixelated]"
                  loading="lazy" decoding="async" />
              </div>
              <div class="min-w-0 flex-1 space-y-5">
                <p class="text-lg text-highlighted leading-relaxed text-pretty">
                  {{ aboutLead }}
                </p>
                <p class="text-muted leading-relaxed text-pretty">
                  {{ aboutMore }}
                </p>
                <div class="manifest-bol-rail justify-start! gap-4 border-b-0 pt-2">
                  <span v-if="bio.location" class="inline-flex items-center gap-2">
                    <UIcon name="i-lucide-map-pin" class="size-3.5 shrink-0 text-seal" aria-hidden="true" />
                    {{ bio.location }}
                  </span>
                  <a v-if="bio.cvHref && bio.cvFileName" :href="bio.cvHref" class="hc-btn" :download="bio.cvFileName"
                    :aria-label="t('hero.downloadCvAria')">
                    {{ t('hero.downloadCv') }}
                    <UIcon name="i-lucide-file-down" class="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
