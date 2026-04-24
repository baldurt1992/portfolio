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
  <section id="about" aria-labelledby="about-heading" class="pt-14 sm:pt-18 pb-24 sm:pb-32">
    <UContainer>
      <UiScrollReveal>
        <!-- Misma columna max-w-3xl para título y cuerpo: evita “encabezado angosto” vs texto ancho. -->
        <div class="max-w-3xl mx-auto w-full">
          <UiSectionHeading id="about-heading" :eyebrow="t('about.eyebrow')" :title="t('about.title')"
            :description="t('about.description')" :contained="false" align="start" />
          <div class="mt-10 md:mt-14">
            <div class="flex flex-col md:flex-row md:items-start gap-8 md:gap-10 text-center md:text-left">
              <div v-if="bio.aboutAvatar" class="flex justify-center md:justify-start shrink-0 md:pt-0.5">
                <img :src="bio.aboutAvatar" :srcset="aboutAvatarSrcset" sizes="(min-width: 640px) 112px, 96px"
                  :alt="t('hero.aboutAvatarAlt', { name: bio.name })" width="128" height="128"
                  class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover ring-1 ring-default/35 shadow-md bg-elevated [image-rendering:pixelated]"
                  loading="lazy" decoding="async" />
              </div>
              <div class="min-w-0 flex-1 space-y-6">
                <p class="text-lg text-highlighted leading-relaxed text-pretty">
                  {{ aboutLead }}
                </p>
                <p class="text-muted leading-relaxed text-pretty">
                  {{ aboutMore }}
                </p>
                <p v-if="bio.location"
                  class="text-muted flex items-center gap-2 text-sm justify-center md:justify-start">
                  <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" aria-hidden="true" />
                  {{ bio.location }}
                </p>
                <div v-if="bio.cvHref && bio.cvFileName"
                  class="flex justify-center md:justify-start pt-2">
                  <UButton :href="bio.cvHref" external :download="bio.cvFileName" color="primary" variant="soft"
                    size="lg" trailing-icon="i-lucide-file-down" :aria-label="t('hero.downloadCvAria')"
                    :label="t('hero.downloadCv')" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
