<script setup lang="ts">
  const portfolioData = usePortfolioData()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="font-bold text-xl text-highlighted shrink-0">
        {{ portfolioData.bio.brandName ?? portfolioData.bio.name.split(' ')[0] }}
      </NuxtLink>
      <LayoutAppNav class="hidden lg:flex" />
    </template>

    <template #right>
      <UButton
        to="/#contact"
        label="Contactar"
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
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
      <UButton
        v-if="portfolioData.bio.social.linkedin"
        :to="portfolioData.bio.social.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        icon="i-simple-icons-linkedin"
        aria-label="LinkedIn"
        color="neutral"
        variant="ghost"
      />
    </template>

    <template #body>
      <LayoutAppNav orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
