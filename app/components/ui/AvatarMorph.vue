<script setup lang="ts">
  import { avatarDisplaySrc, avatarImageSrcset, portraitImageSrcset } from '~/utils/responsiveImages'

  /**
   * Rollcard 8-bit → retrato. Frente: avatar pixel; dorso: foto real al hover/focus.
   */
  const props = withDefaults(
    defineProps<{
      avatarSrc: string
      portraitSrc: string
      alt: string
      sizes?: string
    }>(),
    {
      sizes: '(min-width: 1024px) 28rem, calc(100vw - 2.5rem)'
    }
  )

  const avatarDisplay = computed(() => avatarDisplaySrc(props.avatarSrc))
  const avatarSrcset = computed(() => avatarImageSrcset(props.avatarSrc))
  const portraitSrcset = computed(() => portraitImageSrcset(props.portraitSrc))
</script>

<template>
  <div class="rollcard group relative aspect-3/4 w-full outline-none" tabindex="0" role="img" :aria-label="props.alt">
    <div class="rollcard-inner relative size-full">
      <div class="rollcard-face absolute inset-0 overflow-hidden">
        <img :src="avatarDisplay" :srcset="avatarSrcset" :sizes="props.sizes" alt="" width="448" height="448"
          class="size-full object-cover object-center [image-rendering:pixelated]" loading="lazy" decoding="async"
          fetchpriority="low" />
      </div>
      <div class="rollcard-face rollcard-back absolute inset-0 overflow-hidden">
        <img :src="props.portraitSrc" :srcset="portraitSrcset" :sizes="props.sizes" alt="" width="640" height="800"
          class="size-full object-cover object-top" loading="lazy" decoding="async" fetchpriority="low" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .rollcard {
    perspective: 1000px;
  }

  .rollcard-inner {
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .rollcard:hover .rollcard-inner,
  .rollcard:focus-visible .rollcard-inner {
    transform: rotateY(180deg);
  }

  .rollcard-face {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .rollcard-back {
    transform: rotateY(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .rollcard-inner {
      transition: none;
    }

    .rollcard:hover .rollcard-inner,
    .rollcard:focus-visible .rollcard-inner {
      transform: none;
    }

    .rollcard:hover .rollcard-back,
    .rollcard:focus-visible .rollcard-back {
      opacity: 1;
      z-index: 1;
    }
  }
</style>
