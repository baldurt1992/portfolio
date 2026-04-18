export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'zinc'
    },
    footer: {
      slots: {
        root: 'w-full border-t border-default bg-default/75 backdrop-blur'
      }
    },
    pageHero: {
      slots: {
        description:
          'mt-6 w-full text-base sm:text-lg leading-relaxed text-pretty text-balance text-default/88 dark:text-default/85'
      }
    }
  }
})
