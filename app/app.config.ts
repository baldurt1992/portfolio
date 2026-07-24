const hcFieldBase =
  'rounded-none !ring-0 !outline-none border-2 border-ink bg-dock-void text-ink shadow-[3px_3px_0_var(--color-manifest-shadow)] placeholder:text-stencil focus-visible:!ring-0 focus-visible:!outline-none focus-visible:border-seal focus-visible:bg-dock-asphalt disabled:bg-dock-steel'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'zinc'
    },
    footer: {
      slots: {
        root: 'w-full border-t-[3px] border-ink bg-dock-asphalt'
      }
    },
    button: {
      slots: {
        base: 'rounded-none font-pixel font-bold tracking-wide uppercase text-xs sm:text-sm'
      }
    },
    card: {
      slots: {
        root: 'rounded-none'
      }
    },
    badge: {
      slots: {
        base: 'rounded-none font-display tracking-wide'
      }
    },
    formField: {
      slots: {
        label: 'font-pixel text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink',
        error: 'mt-2 font-pixel text-[0.6875rem] uppercase tracking-wide text-attract-magenta',
        help: 'mt-2 font-pixel text-[0.6875rem] uppercase tracking-wide text-stencil',
        hint: 'font-pixel text-[0.6875rem] uppercase tracking-wide text-stencil'
      }
    },
    input: {
      slots: {
        base: [
          'w-full appearance-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors',
          hcFieldBase
        ].join(' ')
      },
      variants: {
        variant: {
          outline: hcFieldBase,
          soft: 'rounded-none !ring-0 border-2 border-ink bg-dock-asphalt text-ink shadow-[3px_3px_0_var(--color-manifest-shadow)] focus-visible:border-seal',
          subtle: hcFieldBase,
          ghost:
            'rounded-none !ring-0 border-2 border-transparent bg-transparent text-ink focus-visible:border-seal focus-visible:bg-dock-void',
          none: 'rounded-none !ring-0 border-0 bg-transparent shadow-none'
        }
      },
      defaultVariants: {
        color: 'neutral',
        variant: 'outline'
      }
    },
    textarea: {
      slots: {
        base: [
          'w-full appearance-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors',
          hcFieldBase
        ].join(' ')
      },
      variants: {
        variant: {
          outline: hcFieldBase,
          soft: 'rounded-none !ring-0 border-2 border-ink bg-dock-asphalt text-ink shadow-[3px_3px_0_var(--color-manifest-shadow)] focus-visible:border-seal',
          subtle: hcFieldBase,
          ghost:
            'rounded-none !ring-0 border-2 border-transparent bg-transparent text-ink focus-visible:border-seal focus-visible:bg-dock-void',
          none: 'rounded-none !ring-0 border-0 bg-transparent shadow-none'
        }
      },
      defaultVariants: {
        color: 'neutral',
        variant: 'outline'
      }
    }
  }
})
