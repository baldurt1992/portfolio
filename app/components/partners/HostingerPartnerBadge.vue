<script setup lang="ts">
import type { HostingerBadgeVariant } from '~/data/hostingerPartner'

const props = withDefaults(
  defineProps<{
    variant?: HostingerBadgeVariant
  }>(),
  { variant: 'compact' }
)

const { t } = useI18n()
const { referralUrl, referralRel, badgeSrcLight, badgeSrcDark } = useHostingerPartner()

const sizeClass = computed(() => {
  switch (props.variant) {
    case 'compact':
      return 'h-auto w-28 sm:w-32'
    case 'wide':
      return 'h-auto w-40 sm:w-48'
    default: {
      const _exhaustive: never = props.variant
      return _exhaustive
    }
  }
})

const badgeAlt = computed(() => t('hostingerPartner.badgeAlt'))
</script>

<template>
  <a
    :href="referralUrl"
    target="_blank"
    :rel="referralRel"
    class="inline-flex min-h-11 items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    :aria-label="badgeAlt"
  >
    <img
      :src="badgeSrcLight"
      alt=""
      width="80"
      height="30"
      :class="['dark:hidden', sizeClass]"
      decoding="async"
    />
    <img
      :src="badgeSrcDark"
      alt=""
      width="80"
      height="30"
      :class="['hidden dark:block', sizeClass]"
      decoding="async"
    />
  </a>
</template>
