export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'zinc'
    },
    /** Misma fórmula que `header`: vidrio suave sobre la nebulosa (`bg-default/75 backdrop-blur`). */
    footer: {
      slots: {
        root: 'w-full border-t border-default bg-default/75 backdrop-blur'
      }
    },
    /**
     * Hero: tipografía más ligera que `text-xl`; ancho alineado al `h1` (misma columna, sin `max-w-prose`).
     */
    pageHero: {
      slots: {
        description:
          'mt-6 w-full text-base sm:text-lg leading-relaxed text-pretty text-balance text-default/88 dark:text-default/85'
      }
    }
  }
})
