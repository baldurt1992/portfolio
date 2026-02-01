<script setup lang="ts">
const portfolioData = usePortfolioData()
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
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
      <UButton
        v-if="portfolioData.bio.social.linkedin"
        :to="portfolioData.bio.social.linkedin"
        target="_blank"
        icon="i-simple-icons-linkedin"
        aria-label="LinkedIn"
        color="neutral"
        variant="ghost"
      />
      <UButton
        v-if="portfolioData.bio.social.twitter"
        :to="portfolioData.bio.social.twitter"
        target="_blank"
        icon="i-simple-icons-x"
        aria-label="X"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
