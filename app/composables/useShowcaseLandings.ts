import { showcaseLandings, type ShowcaseLanding } from '~/data/showcase'
import { publicPath } from '~/utils/publicPath'
import { showcaseImageSrcset } from '~/utils/responsiveImages'

export type ShowcaseLandingView = ShowcaseLanding & {
  url: string
  imageSrcset: string | undefined
  imageAlt: string
}

/**
 * View-model de las landings del showcase: URL pública, srcset y alt i18n.
 */
export function useShowcaseLandings() {
  const { t } = useI18n()

  const landings = computed<ShowcaseLandingView[]>(() =>
    showcaseLandings.map((landing) => {
      const image = publicPath(landing.image)
      return {
        ...landing,
        image,
        url: useShowcaseLandingUrl(landing.slug),
        imageSrcset: showcaseImageSrcset(image),
        imageAlt: t('showcase.landingImageAlt', { title: t(landing.titleKey) })
      }
    })
  )

  return { landings }
}
