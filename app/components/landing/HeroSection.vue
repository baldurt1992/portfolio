<script setup lang="ts">
const { bio } = usePortfolioData()
</script>

<template>
  <section id="hero" class="py-24 sm:py-32">
    <UContainer>
      <UPageHero
        :title="bio.name"
        :description="bio.tagline"
        :headline="bio.title"
        orientation="vertical"
        :links="[
          {
            label: 'Contactar',
            to: '#contact',
            trailingIcon: 'i-lucide-arrow-right',
            size: 'xl'
          },
          {
            label: 'Ver proyectos',
            to: '#projects',
            size: 'xl',
            color: 'neutral',
            variant: 'outline'
          }
        ]"
      >
        <template v-if="bio.avatar" #default>
          <UAvatar :src="bio.avatar" size="3xl" class="ring-4 ring-default" />
        </template>
      </UPageHero>
    </UContainer>
  </section>
</template>
