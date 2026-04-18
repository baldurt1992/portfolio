<script setup lang="ts">
  const localePath = useLocalePath()
  const { resolve } = useAppBasePath()
  const { t } = useI18n()

  const contactTo = computed(() => `${resolve(localePath('/'))}#contact`)
</script>

<template>
  <div
    class="lg:hidden fixed inset-x-0 bottom-0 z-30 pointer-events-none p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
    <div
      class="pointer-events-auto mx-auto max-w-md rounded-full border border-default/50 bg-default/85 backdrop-blur-md shadow-lg">
      <UButton :to="contactTo" external block size="lg" icon="i-lucide-mail" class="rounded-full justify-center"
        :aria-label="t('a11y.contactSection')">
        {{ t('stickyContact.label') }}
      </UButton>
    </div>
  </div>
</template>
