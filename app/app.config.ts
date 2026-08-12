const inputBase =
  'w-full appearance-none rounded-lg border border-border bg-bg-elevated px-4 py-3 text-text placeholder:text-text-subtle transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'zinc'
    },
    footer: {
      slots: {
        root: 'w-full border-t border-border bg-bg'
      }
    },
    button: {
      slots: {
        base: 'motion-lift inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-60'
      },
      variants: {
        variant: {
          solid: 'bg-accent text-slate-900 shadow-sm hover:bg-accent-hover hover:shadow-md',
          outline:
            'border border-border bg-transparent text-text hover:bg-surface-hover hover:border-border-strong active:bg-surface-soft',
          ghost: 'bg-transparent text-text hover:bg-surface-hover active:bg-surface-soft',
          soft: 'bg-accent-soft text-accent hover:bg-accent/20 active:bg-accent/25'
        }
      }
    },
    card: {
      slots: {
        root: 'motion-lift rounded-xl border border-border bg-bg-elevated shadow-sm hover:shadow-md'
      }
    },
    badge: {
      slots: {
        base: 'inline-flex items-center justify-center rounded-full font-mono text-xs font-medium'
      },
      variants: {
        variant: {
          solid: 'bg-accent text-slate-900',
          outline: 'border border-border bg-transparent text-text-muted',
          soft: 'bg-surface-soft text-text-muted',
          subtle: 'bg-accent-soft text-accent'
        }
      }
    },
    formField: {
      slots: {
        label: 'block text-sm font-medium text-text',
        error: 'mt-1.5 text-sm text-danger',
        help: 'mt-1.5 text-sm text-text-muted',
        hint: 'text-sm text-text-muted'
      }
    },
    input: {
      slots: {
        base: inputBase
      },
      variants: {
        variant: {
          outline: inputBase,
          soft: inputBase.replace('bg-bg-elevated', 'bg-surface'),
          subtle: inputBase.replace('border-border', 'border-transparent'),
          ghost: inputBase
            .replace('bg-bg-elevated', 'bg-transparent')
            .replace('border-border', 'border-transparent')
        }
      },
      defaultVariants: {
        color: 'neutral',
        variant: 'outline'
      }
    },
    textarea: {
      slots: {
        base: `${inputBase} resize-y min-h-[6rem]`
      },
      variants: {
        variant: {
          outline: `${inputBase} resize-y min-h-[6rem]`,
          soft: `${inputBase.replace('bg-bg-elevated', 'bg-surface')} resize-y min-h-[6rem]`,
          subtle: `${inputBase.replace('border-border', 'border-transparent')} resize-y min-h-[6rem]`,
          ghost: `${inputBase.replace('bg-bg-elevated', 'bg-transparent').replace('border-border', 'border-transparent')} resize-y min-h-[6rem]`
        }
      },
      defaultVariants: {
        color: 'neutral',
        variant: 'outline'
      }
    },
    tooltip: {
      slots: {
        content:
          'rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text shadow-lg'
      }
    },
    slideover: {
      slots: {
        overlay: 'bg-black/60 backdrop-blur-sm',
        content: 'bg-bg-elevated text-text shadow-xl divide-border',
        header: 'border-b border-border bg-bg-elevated',
        body: 'bg-bg-elevated text-text',
        footer: 'border-t border-border bg-bg-elevated',
        title: 'font-heading font-semibold text-text',
        description: 'text-text-muted'
      }
    },
    modal: {
      slots: {
        overlay: 'bg-black/60 backdrop-blur-sm',
        content: 'rounded-2xl border border-border bg-bg-elevated shadow-xl'
      }
    },
    header: {
      slots: {
        root: 'fixed top-0 start-0 end-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md'
      }
    }
  }
})
