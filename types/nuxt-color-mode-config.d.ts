import type { ModuleOptions as ColorModeModuleOptions } from '@nuxtjs/color-mode'

/** @nuxt/ui carga color-mode sin listarlo en `modules` → los tipos base no incluyen `colorMode`. */
declare module 'nuxt/schema' {
  interface InputConfig {
    colorMode?: Partial<ColorModeModuleOptions>
  }
}

export {}
