<script setup lang="ts">
const portfolioData = usePortfolioData()
const { t } = useI18n()
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} {{ portfolioData.bio.name }}
      </p>
    </template>

    <template #right>
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
      <UButton
        v-if="portfolioData.bio.social.twitter"
        :to="portfolioData.bio.social.twitter"
        target="_blank"
        rel="noopener noreferrer"
        icon="i-simple-icons-x"
        aria-label="X"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
