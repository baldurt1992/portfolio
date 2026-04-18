export interface ContactFormState {
  name: string
  email: string
  message: string
}

const LOG_TAG = '[ContactForm]'

/** Variables que debe usar la plantilla en EmailJS (Content → variables). */
const EMAILJS_TEMPLATE_FIELDS = {
  user_name: 'user_name',
  user_email: 'user_email',
  message: 'message'
} as const

function buildMailtoUrl(to: string, state: ContactFormState) {
  const subject = encodeURIComponent(`Contacto desde el sitio — ${state.name.trim()}`)
  const body = encodeURIComponent(
    `${state.message.trim()}\n\n— ${state.name.trim()}\n${state.email.trim()}`
  )
  return `mailto:${to}?subject=${subject}&body=${body}`
}

function triggerMailto(href: string) {
  const a = document.createElement('a')
  a.href = href
  a.rel = 'noopener noreferrer'
  a.click()
}

export function useContactForm() {
  const toast = useToast()
  const { t } = useI18n()
  const config = useRuntimeConfig()
  const portfolioData = usePortfolioData()

  const form = reactive<ContactFormState>({
    name: '',
    email: '',
    message: ''
  })

  const loading = ref(false)
  const sent = ref(false)

  const isEmailJsConfigured = computed(() => {
    const p = config.public
    return Boolean(
      typeof p.emailjsPublicKey === 'string' &&
      p.emailjsPublicKey.trim() &&
      typeof p.emailjsServiceId === 'string' &&
      p.emailjsServiceId.trim() &&
      typeof p.emailjsTemplateId === 'string' &&
      p.emailjsTemplateId.trim()
    )
  })

  function reset() {
    form.name = ''
    form.email = ''
    form.message = ''
    sent.value = false
  }

  async function submitWithMailtoFallback() {
    const to = portfolioData.value.bio.email?.trim()
    if (!to) {
      console.error(`${LOG_TAG} mailto fallback sin email de destino`)
      toast.add({
        title: t('contactForm.toastErrorTitle'),
        description: t('contactForm.toastErrorDescription'),
        color: 'error'
      })
      return
    }

    triggerMailto(buildMailtoUrl(to, form))
    toast.add({
      title: t('contactForm.toastMailtoTitle'),
      description: t('contactForm.toastMailtoDescription'),
      color: 'primary'
    })
    reset()
  }

  async function submitWithEmailJs() {
    const { emailjsPublicKey, emailjsServiceId, emailjsTemplateId } = config.public
    const { send } = await import('@emailjs/browser')

    const templateParams = {
      [EMAILJS_TEMPLATE_FIELDS.user_name]: form.name.trim(),
      [EMAILJS_TEMPLATE_FIELDS.user_email]: form.email.trim(),
      [EMAILJS_TEMPLATE_FIELDS.message]: form.message.trim()
    }

    const response = await send(
      emailjsServiceId as string,
      emailjsTemplateId as string,
      templateParams,
      { publicKey: emailjsPublicKey as string }
    )

    if (import.meta.dev) {
      console.info(`${LOG_TAG} EmailJS OK`, { status: response.status })
    }

    toast.add({
      title: t('contactForm.toastSuccessTitle'),
      description: t('contactForm.toastSuccessDescription'),
      color: 'success'
    })
    reset()
  }

  async function submit() {
    if (loading.value || sent.value) return

    loading.value = true
    try {
      if (!isEmailJsConfigured.value) {
        await submitWithMailtoFallback()
        return
      }

      await submitWithEmailJs()
    } catch (error: unknown) {
      const err = error as { status?: number; text?: string }
      console.error(`${LOG_TAG} envío fallido`, {
        status: err?.status,
        text: err?.text,
        delivery: 'emailjs'
      })
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
    isEmailJsConfigured,
    submit,
    reset
  }
}
