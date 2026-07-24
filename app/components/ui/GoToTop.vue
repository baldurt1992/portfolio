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

  /**
   * Ancla el botón encima del borde superior del footer cuando este entra
   * en viewport; evita overlay sobre el menubar del pie.
   */
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
    console.info('[GoToTop] scrollToTop', { scrollY: window.scrollY })
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
        class="hc-btn hc-btn--sm pointer-events-auto !size-11 !min-h-11 !p-0 justify-center shadow-[4px_4px_0_var(--color-manifest-shadow)]"
        :aria-label="t('a11y.scrollTop')" @click="scrollToTop">
        <UIcon name="i-lucide-arrow-up" class="size-5" aria-hidden="true" />
      </button>
    </div>
  </Transition>
</template>
