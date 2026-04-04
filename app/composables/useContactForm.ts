export interface ContactFormState {
  name: string
  email: string
  message: string
}

export function useContactForm() {
  const toast = useToast()
  const { t } = useI18n()

  const form = reactive<ContactFormState>({
    name: '',
    email: '',
    message: ''
  })

  const loading = ref(false)
  const sent = ref(false)

  function reset() {
    form.name = ''
    form.email = ''
    form.message = ''
    sent.value = false
  }

  async function submit() {
    if (loading.value || sent.value) return

    loading.value = true
    try {
      // Placeholder: integrar con API, Formspree, Resend, etc.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      sent.value = true
      toast.add({
        title: t('contactForm.toastSuccessTitle'),
        description: t('contactForm.toastSuccessDescription'),
        color: 'success'
      })
      reset()
    } catch (error) {
      console.error('[ContactForm] Error al enviar', { error })
      toast.add({
        title: t('contactForm.toastErrorTitle'),
        description: t('contactForm.toastErrorDescription'),
        color: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    sent,
    submit,
    reset
  }
}
