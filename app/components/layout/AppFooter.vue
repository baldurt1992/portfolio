<script setup lang="ts">
  const portfolioData = usePortfolioData()
  const { t } = useI18n()
</script>

<template>
  <footer data-site-footer class="border-t border-border bg-bg">
    <UContainer class="py-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <p class="text-sm font-medium text-text">
            © {{ new Date().getFullYear() }} · {{ portfolioData.bio.name }}
          </p>
          <p class="text-sm text-text-muted">
            Full Stack Software Engineer · Remote
          </p>
        </div>

        <div class="flex items-center gap-2">
          <a v-if="portfolioData.bio.social.github" :href="portfolioData.bio.social.github" target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
            :aria-label="t('a11y.github')">
            <UIcon name="i-simple-icons-github" class="size-4" aria-hidden="true" />
            GitHub
          </a>
          <a v-if="portfolioData.bio.social.linkedin" :href="portfolioData.bio.social.linkedin" target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
            :aria-label="t('a11y.linkedin')">
            <UIcon name="i-simple-icons-linkedin" class="size-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
