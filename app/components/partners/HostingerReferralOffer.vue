<script setup lang="ts">
const { t } = useI18n()
const { couponCode, referralUrl, referralRel, discountPercent, copyCoupon } = useHostingerPartner()

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function handleCopy() {
  const ok = await copyCoupon()
  if (!ok) return
  copied.value = true
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 2000)
}

onUnmounted(() => {
  if (copiedTimer) clearTimeout(copiedTimer)
})
</script>

<template>
  <aside
    aria-labelledby="hostinger-offer-title"
    class="rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm sm:p-6"
  >
    <PartnersHostingerPartnerBadge variant="wide" />

    <h3
      id="hostinger-offer-title"
      class="mt-5 font-heading text-xl font-semibold tracking-tight text-text"
    >
      {{ t('hostingerPartner.offerTitle', { percent: discountPercent }) }}
    </h3>
    <p class="mt-1 text-sm text-text-muted">
      {{ t('hostingerPartner.offerHint') }}
    </p>

    <div class="mt-4">
      <p class="text-xs font-medium uppercase tracking-wider text-text-subtle">
        {{ t('hostingerPartner.couponLabel') }}
      </p>
      <div class="mt-2 flex items-stretch gap-2">
        <p
          class="flex min-h-11 flex-1 items-center rounded-xl border border-border-strong bg-bg-elevated px-4 py-2 font-mono text-sm font-semibold tracking-wide text-text"
        >
          {{ couponCode }}
        </p>
        <button
          type="button"
          class="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border-strong bg-bg-elevated px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          @click="handleCopy"
        >
          <UIcon
            :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            class="size-4"
            aria-hidden="true"
          />
          {{ copied ? t('hostingerPartner.copied') : t('hostingerPartner.copy') }}
        </button>
      </div>
    </div>

    <a
      :href="referralUrl"
      target="_blank"
      :rel="referralRel"
      class="motion-lift mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary-soft px-5 py-3 text-sm font-semibold text-primary hover:border-primary/50 hover:bg-primary/15"
    >
      {{ t('hostingerPartner.cta') }}
      <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
    </a>
  </aside>
</template>
