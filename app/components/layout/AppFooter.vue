<script setup lang="ts">
  const portfolioData = usePortfolioData()
  const { t } = useI18n()
</script>

<template>
  <footer data-site-footer class="border-t-[3px] border-ink bg-dock-asphalt">
    <div class="hc-bezel" aria-hidden="true" />
    <UContainer class="py-0">
      <div class="hc-menubar !border-b-0 justify-between gap-3">
        <span>
          © {{ new Date().getFullYear() }} · <strong>{{ portfolioData.bio.name }}</strong>
        </span>
        <span class="flex items-center gap-2">
          <a v-if="portfolioData.bio.social.github" :href="portfolioData.bio.social.github" target="_blank"
            rel="noopener noreferrer" class="hc-nav-link !px-2 !py-1" :aria-label="t('a11y.github')">
            GitHub
          </a>
          <a v-if="portfolioData.bio.social.linkedin" :href="portfolioData.bio.social.linkedin" target="_blank"
            rel="noopener noreferrer" class="hc-nav-link !px-2 !py-1" :aria-label="t('a11y.linkedin')">
            LinkedIn
          </a>
          <a v-if="portfolioData.bio.social.twitter" :href="portfolioData.bio.social.twitter" target="_blank"
            rel="noopener noreferrer" class="hc-nav-link !px-2 !py-1" aria-label="X">
            X
          </a>
        </span>
      </div>
    </UContainer>
  </footer>
</template>
