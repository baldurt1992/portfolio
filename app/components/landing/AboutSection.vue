<script setup lang="ts">
  import { publicPath } from '~/utils/publicPath'

  const { t } = useI18n()
  const portfolioData = usePortfolioData()

  const sectionRef = ref<HTMLElement | null>(null)
  const portraitSrc = computed(() => portfolioData.value.bio.avatar || '/images/portrait.webp')
  const avatarSrc = computed(() => publicPath('/images/avatar.webp'))

  useGsapInViewReveal(sectionRef, '.about-reveal', { logTag: 'AboutSection' })
</script>

<template>
  <section id="about" ref="sectionRef"
    class="relative border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
    <div class="mx-auto max-w-7xl">
      <header class="about-reveal mb-12 max-w-2xl lg:mb-16">
        <p class="font-mono text-xs font-medium uppercase tracking-widest text-primary">
          {{ t('about.eyebrow') }}
        </p>
        <h2 class="mt-3 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
          {{ t('about.title') }}
        </h2>
      </header>

      <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12">
        <article class="about-reveal space-y-5 lg:col-span-7">
          <p class="max-w-prose text-xl leading-relaxed text-text">
            {{ portfolioData.aboutLead }}
          </p>
          <p class="max-w-prose text-lg leading-relaxed text-text-muted">
            {{ portfolioData.aboutMore }}
          </p>
        </article>

        <aside class="about-reveal lg:col-span-5 lg:self-start">
          <figure>
            <UiAvatarMorph :avatar-src="avatarSrc" :portrait-src="portraitSrc" :alt="portfolioData.bio.name" />
            <figcaption class="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-3">
              <span class="text-sm font-medium text-text">{{ portfolioData.bio.name }}</span>
              <span class="font-mono text-xs text-text-muted">{{ t('about.flipHint') }}</span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </div>
  </section>
</template>
