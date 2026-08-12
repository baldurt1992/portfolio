<script setup lang="ts">
  /**
   * Rollcard 8-bit → retrato. Frente: avatar pixel; dorso: foto real al hover/focus.
   */
  const props = defineProps<{
    avatarSrc: string
    portraitSrc: string
    alt: string
  }>()
</script>

<template>
  <div class="rollcard group relative aspect-3/4 w-full outline-none" tabindex="0" role="img" :aria-label="props.alt">
    <div class="rollcard-inner relative size-full">
      <div class="rollcard-face absolute inset-0 overflow-hidden">
        <img :src="props.avatarSrc" alt="" width="512" height="512"
          class="size-full object-cover object-center [image-rendering:pixelated]" decoding="async" />
      </div>
      <div class="rollcard-face rollcard-back absolute inset-0 overflow-hidden">
        <img :src="props.portraitSrc" alt="" width="640" height="800" class="size-full object-cover object-top"
          loading="lazy" decoding="async" />
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
