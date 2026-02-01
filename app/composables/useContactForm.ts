export interface ContactFormState {
  name: string
  email: string
  message: string
}

export function useContactForm() {
  const toast = useToast()

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
        title: 'Mensaje enviado',
        description: 'Te responderé lo antes posible.',
        color: 'success'
      })
      reset()
    } catch (error) {
      console.error('[ContactForm] Error al enviar', { error })
      toast.add({
        title: 'Error al enviar',
        description: 'Intenta de nuevo más tarde.',
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
