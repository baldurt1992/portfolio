<template>
  <div class="relative isolate min-h-screen flex flex-col bg-bg">
    <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <EffectsAmbientField />
    </div>
    <div class="relative z-10 flex flex-col pt-(--ui-header-height)">
      <slot />
    </div>
  </div>
</template>
