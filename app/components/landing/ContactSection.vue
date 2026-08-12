<script setup lang="ts">
  const { form, loading, submit, showTurnstileWidget, turnstileContainerRef } = useContactForm()
  const portfolioData = usePortfolioData()
  const { t } = useI18n()
  const bio = computed(() => portfolioData.value.bio)
</script>

<template>
  <section id="contact" aria-labelledby="contact-heading"
    class="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <div class="space-y-4">
            <p class="font-mono text-sm font-medium uppercase tracking-widest text-accent">
              {{ t('contact.eyebrow') }}
            </p>
            <h2 id="contact-heading"
              class="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
              {{ t('contact.title') }}
            </h2>
            <p class="max-w-xl text-lg text-text-muted">
              {{ t('contact.description') }}
            </p>
          </div>

          <div class="mt-8 space-y-4">
            <a :href="`mailto:${bio.email}`"
              class="group flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <span class="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <UIcon name="i-lucide-mail" class="size-5" aria-hidden="true" />
              </span>
              <div>
                <p class="text-sm font-medium text-text-muted">Email</p>
                <p class="font-medium text-text group-hover:text-accent transition-colors">{{ bio.email }}</p>
              </div>
            </a>

            <div class="flex flex-wrap gap-3">
              <a v-if="bio.social.github" :href="bio.social.github" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-hover"
                :aria-label="t('a11y.github')">
                <UIcon name="i-simple-icons-github" class="size-4" aria-hidden="true" /> GitHub
              </a>
              <a v-if="bio.social.linkedin" :href="bio.social.linkedin" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-hover"
                :aria-label="t('a11y.linkedin')">
                <UIcon name="i-simple-icons-linkedin" class="size-4" aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="rounded-2xl border border-border bg-bg-elevated/95 p-5 shadow-lg backdrop-blur-sm sm:p-8">
            <UForm class="space-y-5" @submit.prevent="submit">
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
                  :rows="5" required class="w-full" />
              </UFormField>
              <div v-if="showTurnstileWidget" ref="turnstileContainerRef" class="flex min-h-16 justify-start" />
              <button type="submit"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                :disabled="loading" :aria-busy="loading">
                <UIcon v-if="loading" name="i-lucide-loader-circle" class="size-5 animate-spin" aria-hidden="true" />
                {{ t('contact.submit') }}
              </button>
            </UForm>

            <p class="mt-5 text-sm text-text-muted">
              {{ t('contact.mailFallback') }}
              <a :href="`mailto:${bio.email}`" class="font-medium text-accent hover:text-accent-hover">{{ bio.email
                }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
