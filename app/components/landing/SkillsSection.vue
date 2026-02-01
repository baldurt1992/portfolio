<script setup lang="ts">
const { skills } = usePortfolioData()
</script>

<template>
  <section id="skills" class="py-20 sm:py-28 bg-elevated/30">
    <UContainer>
      <UiScrollReveal>
        <UiSectionHeading
          title="Skills"
          description="Herramientas y tecnologías con las que trabajo."
        />
        <div class="mt-16 flex flex-wrap justify-center gap-3">
          <UBadge
            v-for="skill in skills"
            :key="skill.name"
            size="lg"
            variant="subtle"
            class="gap-2"
          >
            <UIcon v-if="skill.icon" :name="skill.icon" class="size-4" />
            {{ skill.name }}
          </UBadge>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
