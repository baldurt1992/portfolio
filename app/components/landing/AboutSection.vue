<script setup lang="ts">
const { bio, aboutLead, aboutMore } = usePortfolioData()
</script>

<template>
  <section id="about" aria-labelledby="about-heading" class="pt-10 sm:pt-12 pb-20 sm:pb-28">
    <UContainer>
      <UiScrollReveal>
        <!-- Misma columna max-w-3xl para título y cuerpo: evita “encabezado angosto” vs texto ancho. -->
        <div class="max-w-3xl mx-auto w-full">
          <UiSectionHeading
            id="about-heading"
            eyebrow="Perfil"
            title="Sobre mí"
            description="Contexto breve: enfoque, stack y cómo suelo colaborar."
            :contained="false"
            align="start"
          />
          <div class="mt-10 md:mt-14">
            <div
              class="flex flex-col md:flex-row md:items-start gap-8 md:gap-10 text-center md:text-left"
            >
            <div
              v-if="bio.aboutAvatar"
              class="flex justify-center md:justify-start shrink-0 md:pt-0.5"
            >
              <img
                :src="bio.aboutAvatar"
                :alt="`Avatar ilustrado de ${bio.name}`"
                width="128"
                height="128"
                class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-default/50 shadow-md bg-elevated [image-rendering:pixelated]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="min-w-0 flex-1 space-y-6">
              <p class="text-lg text-highlighted leading-relaxed text-pretty">
                {{ aboutLead }}
              </p>
              <p class="text-muted leading-relaxed text-pretty">
                {{ aboutMore }}
              </p>
              <p
                v-if="bio.location"
                class="text-muted flex items-center gap-2 text-sm justify-center md:justify-start"
              >
                <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" aria-hidden="true" />
                {{ bio.location }}
              </p>
            </div>
          </div>
        </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
