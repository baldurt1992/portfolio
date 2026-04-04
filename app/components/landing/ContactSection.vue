<script setup lang="ts">
  const { form, loading, submit } = useContactForm()
  const { bio } = usePortfolioData()
</script>

<template>
  <section id="contact" aria-labelledby="contact-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <div class="max-w-xl mx-auto w-full">
          <UiSectionHeading
            id="contact-heading"
            eyebrow="Siguiente paso"
            title="Contacto"
            description="Cuéntame el contexto, el plazo y qué éxito significa para ti. Respondo con claridad y sin rodeos."
            :contained="false"
          />
          <div class="mt-16">
          <UCard variant="subtle" class="card-elevated">
            <UForm class="space-y-4" @submit.prevent="submit">
              <UFormField name="name" label="Nombre" required>
                <UInput v-model="form.name" name="name" placeholder="Tu nombre" required class="w-full" />
              </UFormField>
              <UFormField name="email" label="Email" required>
                <UInput v-model="form.email" name="email" type="email" placeholder="tu@email.com" required
                  class="w-full" />
              </UFormField>
              <UFormField name="message" label="Mensaje" required>
                <UTextarea v-model="form.message" name="message" placeholder="Cuéntame sobre tu proyecto..." :rows="4"
                  required class="w-full" />
              </UFormField>
              <UButton type="submit" size="lg" :loading="loading" class="w-full sm:w-auto">
                Enviar mensaje
              </UButton>
            </UForm>
          </UCard>
          <p class="mt-6 text-center text-sm text-muted">
            O escríbeme directamente a
            <UButton :to="`mailto:${bio.email}`" variant="link" color="primary" size="sm" class="p-0 h-auto">
              {{ bio.email }}
            </UButton>
          </p>
        </div>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
