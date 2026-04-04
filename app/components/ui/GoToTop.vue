<script setup lang="ts">
const show = ref(false)
const threshold = 400
const { t } = useI18n()

function checkScroll() {
  show.value = window.scrollY > threshold
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  checkScroll()
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed bottom-24 right-6 sm:bottom-6 z-40"
    >
      <UButton
        as="button"
        icon="i-lucide-arrow-up"
        :aria-label="t('a11y.scrollTop')"
        color="primary"
        variant="soft"
        size="lg"
        class="rounded-full size-12 shadow-lg flex items-center justify-center"
        @click="scrollToTop"
      />
    </div>
  </Transition>
</template>
