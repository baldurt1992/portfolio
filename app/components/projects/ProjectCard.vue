<script setup lang="ts">
  import type { Project } from '~/composables/usePortfolioData'

  defineProps<{
    project: Project
    featured?: boolean
  }>()
</script>

<template>
  <UCard variant="subtle" :class="[
    'card-elevated h-full flex flex-col overflow-hidden',
    featured && 'ring-1 ring-primary/20'
  ]">
    <template #header>
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-semibold text-highlighted text-lg">
          {{ project.title }}
        </h3>
        <span class="text-sm text-muted shrink-0">{{ project.year }}</span>
      </div>
    </template>

    <p class="text-muted text-sm/relaxed flex-1">
      {{ project.description }}
    </p>

    <div class="flex flex-wrap gap-2 mt-3">
      <UBadge v-for="tag in project.tags" :key="tag" size="xs" color="neutral" variant="subtle">
        {{ tag }}
      </UBadge>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <UButton v-if="project.url" :to="project.url" target="_blank" size="sm" variant="soft"
          trailing-icon="i-lucide-external-link">
          Ver proyecto
        </UButton>
        <UButton v-if="project.repo" :to="project.repo" target="_blank" size="sm" color="neutral" variant="ghost"
          icon="i-simple-icons-github" aria-label="Repositorio" />
      </div>
    </template>
  </UCard>
</template>
