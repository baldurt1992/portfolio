<template>
  <div
    class="lg:hidden fixed inset-x-0 bottom-0 z-30 pointer-events-none p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
  >
    <div
      class="pointer-events-auto mx-auto max-w-md rounded-full border border-default/50 bg-default/85 backdrop-blur-md shadow-lg"
    >
      <UButton
        to="#contact"
        block
        size="lg"
        icon="i-lucide-mail"
        class="rounded-full justify-center"
        aria-label="Ir a la sección de contacto"
      >
        Contactar
      </UButton>
    </div>
  </div>
</template>
