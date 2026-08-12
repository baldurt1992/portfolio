<template>
  <div class="relative isolate min-h-screen flex flex-col bg-bg">
    <EffectsParticleField class="pointer-events-none fixed inset-0 z-0" />
    <div class="relative z-10 flex flex-col pt-(--ui-header-height)">
      <slot />
    </div>
  </div>
</template>
