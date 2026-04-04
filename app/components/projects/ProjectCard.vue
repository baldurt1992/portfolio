<script setup lang="ts">
  import type { Project } from '~/composables/usePortfolioData'

  defineProps<{
    project: Project
    featured?: boolean
  }>()
</script>

<template>
  <UCard variant="subtle" :class="[
    'card-elevated h-full flex flex-col overflow-hidden p-0 gap-0',
    featured && 'ring-1 ring-primary/20'
  ]" :ui="{ header: 'p-0 border-b border-default/40', body: 'p-4 sm:p-5', footer: 'p-4 sm:p-5 pt-0' }">
    <template #header>
      <div class="space-y-0">
        <div v-if="!project.image"
          class="aspect-21/9 sm:aspect-2/1 bg-linear-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center"
          aria-hidden="true">
          <UIcon name="i-lucide-layout-template" class="size-12 sm:size-14 text-primary/40" />
        </div>
        <div v-else class="overflow-hidden">
          <img :src="project.image" :alt="`Captura o vista del proyecto ${project.title}`"
            class="w-full aspect-video object-cover" loading="lazy" decoding="async" />
        </div>
        <div class="flex items-start justify-between gap-3 p-4 sm:p-5">
          <h3 class="font-semibold text-highlighted text-lg text-pretty">
            {{ project.title }}
          </h3>
          <span class="text-sm text-muted shrink-0 tabular-nums">{{ project.year }}</span>
        </div>
      </div>
    </template>

    <p class="text-muted text-sm/relaxed flex-1 text-pretty">
      {{ project.description }}
    </p>

    <div class="flex flex-wrap gap-2 mt-3">
      <UBadge v-for="tag in project.tags" :key="tag" size="xs" color="neutral" variant="subtle">
        {{ tag }}
      </UBadge>
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2">
        <UButton v-if="project.url" :to="project.url" target="_blank" rel="noopener noreferrer" size="sm" variant="soft"
          trailing-icon="i-lucide-external-link">
          Ver proyecto
        </UButton>
        <UButton v-if="project.repo" :to="project.repo" target="_blank" rel="noopener noreferrer" size="sm"
          color="neutral" variant="ghost" icon="i-simple-icons-github" aria-label="Abrir repositorio en GitHub" />
      </div>
    </template>
  </UCard>
</template>
