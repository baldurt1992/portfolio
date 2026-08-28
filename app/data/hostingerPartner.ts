const couponCode = 'BALDURDEV92'

export const HOSTINGER_REFERRAL_REL = 'sponsored noopener noreferrer'

export const hostingerPartner = {
  couponCode,
  referralUrl: `https://www.hostinger.com/co?REFERRALCODE=${couponCode}`,
  discountPercent: 20,
  referralRel: HOSTINGER_REFERRAL_REL,
  badges: {
    light: '/images/partners/hostinger/badge-light.svg',
    dark: '/images/partners/hostinger/badge-dark.svg'
  }
} as const

export type HostingerPartner = typeof hostingerPartner
export type HostingerBadgeVariant = 'compact' | 'wide'
