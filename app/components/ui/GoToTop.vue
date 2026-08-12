<script setup lang="ts">
  const show = ref(false)
  const bottomPx = ref(24)
  const threshold = 400
  const gapAboveFooter = 12
  const { t } = useI18n()

  function baseBottom(): number {
    // Deja espacio a StickyContactBar en viewport < lg
    return window.matchMedia('(min-width: 1024px)').matches ? 24 : 96
  }

  function updatePosition() {
    const y = window.scrollY
    show.value = y > threshold

    const base = baseBottom()
    const footer = document.querySelector<HTMLElement>('[data-site-footer]')
    if (!footer) {
      bottomPx.value = base
      return
    }

    const footerTop = footer.getBoundingClientRect().top
    const overlapFromBottom = window.innerHeight - footerTop

    if (overlapFromBottom > 0) {
      bottomPx.value = Math.max(base, overlapFromBottom + gapAboveFooter)
    } else {
      bottomPx.value = base
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updatePosition)
    window.removeEventListener('resize', updatePosition)
  })
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="pointer-events-none fixed inset-e-4 sm:inset-e-6 z-40" :style="{ bottom: `${bottomPx}px` }">
      <button type="button"
        class="motion-lift pointer-events-auto inline-flex size-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-text shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        :aria-label="t('a11y.scrollTop')" @click="scrollToTop">
        <UIcon name="i-lucide-arrow-up" class="size-5" aria-hidden="true" />
      </button>
    </div>
  </Transition>
</template>
