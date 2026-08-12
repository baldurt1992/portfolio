<script setup lang="ts">
  const localePath = useLocalePath()
  const { t } = useI18n()

  const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))
</script>

<template>
  <div
    class="lg:hidden fixed inset-x-0 bottom-0 z-30 pointer-events-none p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
    <div class="pointer-events-auto mx-auto max-w-md">
      <NuxtLink :to="contactTo"
        class="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-primary-hover hover:-translate-y-0.5"
        :aria-label="t('a11y.contactSection')">
        <UIcon name="i-lucide-mail" class="size-4" aria-hidden="true" />
        {{ t('stickyContact.label') }}
      </NuxtLink>
    </div>
  </div>
</template>
