<script setup lang="ts">
const portfolioData = usePortfolioData()
const { t } = useI18n()
const { couponCode, copyCoupon } = useHostingerPartner()

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function handleCopyCoupon() {
  if (!(await copyCoupon())) return
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
  <footer data-site-footer class="border-t border-border bg-bg">
    <div class="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:py-8 lg:px-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <p class="text-sm font-medium text-text">
            © {{ new Date().getFullYear() }} · {{ portfolioData.bio.name }}
          </p>
          <p class="text-sm text-text-muted">Full Stack Software Engineer · Remote</p>
        </div>

        <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
          <PartnersHostingerPartnerBadge variant="compact" />
          <button
            type="button"
            data-hostinger-coupon-copy
            class="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 py-2 text-left transition-colors hover:border-primary/30 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            :aria-label="t('hostingerPartner.footerCopyAria', { code: couponCode })"
            @click="handleCopyCoupon"
          >
            <span class="text-xs text-text-subtle">{{ t('hostingerPartner.couponLabel') }}</span>
            <span class="font-mono text-xs font-semibold tracking-wide text-text sm:text-sm">{{
              couponCode
            }}</span>
            <UIcon
              :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              :class="[
                'size-4 transition-colors',
                copied ? 'text-success' : 'text-text-muted group-hover:text-primary'
              ]"
              aria-hidden="true"
            />
          </button>
        </div>

        <div class="flex items-center gap-2">
          <a
            v-if="portfolioData.bio.social.github"
            :href="portfolioData.bio.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
            :aria-label="t('a11y.github')"
          >
            <UIcon name="i-simple-icons-github" class="size-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            v-if="portfolioData.bio.social.linkedin"
            :href="portfolioData.bio.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
            :aria-label="t('a11y.linkedin')"
          >
            <UIcon name="i-simple-icons-linkedin" class="size-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
