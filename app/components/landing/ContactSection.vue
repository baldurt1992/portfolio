<script setup lang="ts">
  const { form, loading, submit, showTurnstileWidget, turnstileContainerRef } = useContactForm()
  const portfolioData = usePortfolioData()
  const { t } = useI18n()
  const bio = computed(() => portfolioData.value.bio)
</script>

<template>
  <section id="contact" aria-labelledby="contact-heading" class="py-20 sm:py-28">
    <UContainer>
      <UiScrollReveal>
        <div class="max-w-2xl">
          <UiSectionHeading id="contact-heading" lot="LINK" :eyebrow="t('contact.eyebrow')" :title="t('contact.title')"
            :description="t('contact.description')" :contained="false" />

          <div class="hc-window mt-12">
            <UiStackTitleBar title="CONTACT · GO TO" :meta="bio.email" credit />
            <div class="hc-menubar" aria-hidden="true">
              <strong>Message</strong>
              <span>Send</span>
              <span>Clear</span>
            </div>
            <div class="hc-body">
              <div class="manifest-bol-rail mb-6 justify-start!">
                <span><strong>GO</strong> · CONTACT</span>
                <span>{{ bio.email }}</span>
              </div>

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
                <div v-if="showTurnstileWidget" ref="turnstileContainerRef" class="flex min-h-16.25 justify-start" />
                <button type="submit" class="hc-btn" :disabled="loading" :aria-busy="loading">
                  <UIcon v-if="loading" name="i-lucide-loader-circle" class="size-4 animate-spin" aria-hidden="true" />
                  {{ t('contact.submit') }}
                </button>
              </UForm>
            </div>
          </div>

          <p class="mt-6 text-sm text-muted">
            {{ t('contact.mailFallback') }}
            <a :href="`mailto:${bio.email}`" class="font-pixel text-attract-magenta underline underline-offset-2">
              {{ bio.email }}
            </a>
          </p>
        </div>
      </UiScrollReveal>
    </UContainer>
  </section>
</template>
