<script setup lang="ts">
const { bio } = usePortfolioData()
</script>

<template>
  <section id="about" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading
          title="Sobre mí"
          description="Un poco de contexto sobre quién soy y qué me motiva."
        />
        <div class="mt-16 max-w-3xl mx-auto text-center">
          <UAvatar v-if="bio.avatar" :src="bio.avatar" size="2xl" class="mx-auto mb-6" />
          <p class="text-lg text-muted leading-relaxed">
            {{ bio.tagline }} Me especializo en experiencias de usuario memorables, código
            mantenible y arquitecturas escalables.
          </p>
          <p v-if="bio.location" class="mt-4 text-muted flex items-center justify-center gap-2">
            <UIcon name="i-lucide-map-pin" class="size-4" />
            {{ bio.location }}
          </p>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
