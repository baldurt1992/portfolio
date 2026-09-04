import type { ContactApiErrorCode } from './useContactFormApi'
import { ContactApiError, submitContactMessage } from './useContactFormApi'
import { CONTACT_LIMITS } from '../../shared/contact-payload'

export interface ContactFormState {
  name: string
  email: string
  message: string
}

const LOG_TAG = '[ContactForm]'

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

function contactErrorI18n(code: ContactApiErrorCode): {
  titleKey: 'toastCaptchaVerifyTitle' | 'toastErrorTitle'
  descriptionKey: 'toastCaptchaVerifyDescription' | 'toastErrorDescription'
} {
  switch (code) {
    case 'turnstile_failed':
    case 'token_required':
      return {
        titleKey: 'toastCaptchaVerifyTitle',
        descriptionKey: 'toastCaptchaVerifyDescription'
      }
    case 'invalid_payload':
    case 'invalid_json':
    case 'email_send_failed':
    case 'origin_not_allowed':
    case 'server_misconfigured':
    case 'http_error':
      return {
        titleKey: 'toastErrorTitle',
        descriptionKey: 'toastErrorDescription'
      }
    default: {
      const _exhaustive: never = code
      return _exhaustive
    }
  }
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

  const contactApiUrl = computed(
    () =>
      (typeof config.public.contactApiUrl === 'string' && config.public.contactApiUrl.trim()) || ''
  )

  const isContactApiConfigured = computed(() => Boolean(contactApiUrl.value))

  const turnstileSiteKey = computed(
    () =>
      (typeof config.public.turnstileSiteKey === 'string' &&
        config.public.turnstileSiteKey.trim()) ||
      ''
  )

  const isTurnstileConfigured = computed(() => Boolean(turnstileSiteKey.value))

  /**
   * Worker de contacto + Turnstile (lógica de negocio).
   * El DOM del widget no debe depender solo de esto en SSR: ver `showTurnstileWidget`.
   */
  const isTurnstileEnabledForEmail = computed(
    () => isContactApiConfigured.value && isTurnstileConfigured.value
  )

  /**
   * Evita hydration mismatch: en SSR y en el primer paint del cliente el slot del formulario
   * debe coincidir; el captcha solo existe después de onMounted.
   */
  const contactFormMounted = ref(false)
  onMounted(() => {
    contactFormMounted.value = true
  })

  const showTurnstileWidget = computed(
    () => isTurnstileEnabledForEmail.value && contactFormMounted.value
  )

  const turnstile = useTurnstileWidget(() =>
    showTurnstileWidget.value ? turnstileSiteKey.value : ''
  )

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

  async function submitWithContactApi() {
    const token = turnstile.token.value?.trim() ?? ''

    await submitContactMessage(contactApiUrl.value, {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      token
    })

    if (import.meta.dev) {
      console.info(`${LOG_TAG} Contact API OK`)
    }

    toast.add({
      title: t('contactForm.toastSuccessTitle'),
      description: t('contactForm.toastSuccessDescription'),
      color: 'success'
    })
    reset()
    if (isTurnstileConfigured.value) {
      turnstile.reset()
    }
  }

  async function submit() {
    if (loading.value || sent.value) return

    loading.value = true
    try {
      if (!isContactApiConfigured.value) {
        await submitWithMailtoFallback()
        return
      }

      if (isTurnstileConfigured.value) {
        if (turnstile.scriptFailed.value) {
          console.error(`${LOG_TAG} Turnstile script no disponible`)
          toast.add({
            title: t('contactForm.toastErrorTitle'),
            description: t('contactForm.toastCaptchaLoadDescription'),
            color: 'error'
          })
          return
        }
        if (!turnstile.token.value) {
          toast.add({
            title: t('contactForm.toastCaptchaRequiredTitle'),
            description: t('contactForm.toastCaptchaRequiredDescription'),
            color: 'warning'
          })
          return
        }
      }

      await submitWithContactApi()
    } catch (error: unknown) {
      const isApi = error instanceof ContactApiError
      const code = isApi ? error.code : 'http_error'
      const keys = contactErrorI18n(code)

      console.error(`${LOG_TAG} envío fallido`, {
        status: isApi ? error.status : undefined,
        code,
        delivery: isApi && error.code === 'turnstile_failed' ? 'turnstile' : 'contact_api'
      })

      if (isTurnstileConfigured.value) {
        turnstile.reset()
      }

      toast.add({
        title: t(`contactForm.${keys.titleKey}`),
        description: t(`contactForm.${keys.descriptionKey}`),
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
    limits: CONTACT_LIMITS,
    isContactApiConfigured,
    isTurnstileConfigured,
    showTurnstileWidget,
    turnstileContainerRef: turnstile.containerRef,
    submit,
    reset
  }
}
