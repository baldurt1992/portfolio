<template>
  <!-- Sin z-index en el root: evita que todo el `<main>` quede por encima del footer (hermano en `app.vue`). -->
  <div class="relative isolate min-h-screen flex flex-col bg-bg">
    <div class="relative z-10 flex flex-col">
      <slot />
    </div>
  </div>
</template>
