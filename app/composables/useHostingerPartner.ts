import { hostingerPartner } from '~/data/hostingerPartner'
import { publicPath } from '~/utils/publicPath'

const LOG_TAG = '[HostingerPartner]'

/**
 * Orquesta el partner Hostinger: assets según tema, copia del cupón y toasts.
 * About / Contact / Footer solo consumen; no conocen URL ni código.
 */
export function useHostingerPartner() {
  const toast = useToast()
  const { t } = useI18n()

  const couponCode = hostingerPartner.couponCode
  const referralUrl = hostingerPartner.referralUrl
  const discountPercent = hostingerPartner.discountPercent

  const badgeSrcLight = computed(() => publicPath(hostingerPartner.badges.light))
  const badgeSrcDark = computed(() => publicPath(hostingerPartner.badges.dark))

  async function copyCoupon(): Promise<boolean> {
    if (!import.meta.client || !navigator.clipboard?.writeText) {
      console.error(`${LOG_TAG} Clipboard no disponible`)
      toast.add({
        title: t('hostingerPartner.toastCopyErrorTitle'),
        description: t('hostingerPartner.toastCopyErrorDescription')
      })
      return false
    }

    try {
      await navigator.clipboard.writeText(couponCode)
      if (import.meta.dev) {
        console.info(`${LOG_TAG} Cupón copiado`)
      }
      toast.add({
        title: t('hostingerPartner.toastCopiedTitle'),
        description: t('hostingerPartner.toastCopiedDescription', { code: couponCode })
      })
      return true
    } catch (error) {
      console.error(`${LOG_TAG} No se pudo copiar el cupón`, { error })
      toast.add({
        title: t('hostingerPartner.toastCopyErrorTitle'),
        description: t('hostingerPartner.toastCopyErrorDescription')
      })
      return false
    }
  }

  return {
    couponCode,
    referralUrl,
    discountPercent,
    badgeSrcLight,
    badgeSrcDark,
    referralRel: hostingerPartner.referralRel,
    copyCoupon
  }
}
