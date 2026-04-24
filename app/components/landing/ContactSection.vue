<script setup lang="ts">
  const { form, loading, submit, showTurnstileWidget, turnstileContainerRef } = useContactForm()
  const portfolioData = usePortfolioData()
  const { t } = useI18n()
  const bio = computed(() => portfolioData.value.bio)
</script>

<template>
  <section id="contact" aria-labelledby="contact-heading" class="py-24 sm:py-32">
    <UContainer>
      <UiScrollReveal>
        <div class="max-w-xl mx-auto w-full">
          <UiSectionHeading id="contact-heading" :eyebrow="t('contact.eyebrow')" :title="t('contact.title')"
            :description="t('contact.description')" :contained="false" />
          <div class="mt-16">
            <UCard variant="subtle" class="card-elevated">
              <UForm class="space-y-4" @submit.prevent="submit">
                <UFormField name="name" :label="t('contact.name')" required>
                  <UInput v-model="form.name" name="name" :placeholder="t('contact.placeholderName')" required
                    class="w-full" />
                </UFormField>
                <UFormField name="email" :label="t('contact.email')" required>
                  <UInput v-model="form.email" name="email" type="email" :placeholder="t('contact.placeholderEmail')"
                    required class="w-full" />
                </UFormField>
                <UFormField name="message" :label="t('contact.message')" required>
                  <UTextarea v-model="form.message" name="message" :placeholder="t('contact.placeholderMessage')"
                    :rows="4" required class="w-full" />
                </UFormField>
                <div v-if="showTurnstileWidget" ref="turnstileContainerRef" class="flex min-h-[65px] justify-center" />
                <UButton type="submit" size="lg" :loading="loading" class="w-full sm:w-auto">
                  {{ t('contact.submit') }}
                </UButton>
              </UForm>
            </UCard>
            <p class="mt-6 text-center text-sm text-muted">
              {{ t('contact.mailFallback') }}
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
