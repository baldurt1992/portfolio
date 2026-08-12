import gsap from 'gsap'

type GsapInViewRevealOptions = {
  y?: number
  duration?: number
  stagger?: number
  logTag?: string
  /** Nodo a observar. Si no se pasa, se observa el primer target (no la sección con padding). */
  triggerRef?: Ref<HTMLElement | null>
}

/**
 * Reveal al acercarse al viewport. IntersectionObserver + gsap.to,
 * sin ScrollTrigger, para no quedar en opacity 0 tras un refresh global.
 */
export function useGsapInViewReveal(
  rootRef: Ref<HTMLElement | null>,
  selector: string,
  options?: GsapInViewRevealOptions
) {
  const logTag = options?.logTag ?? 'GsapInViewReveal'
  let ctx: gsap.Context | null = null
  let io: IntersectionObserver | null = null
  let played = false

  onMounted(async () => {
    await nextTick()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = rootRef.value
    if (!root) {
      console.error(`[${logTag}] No hay nodo raíz para el reveal`, { selector })
      return
    }

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (targets.length === 0) {
      console.error(`[${logTag}] No hay targets para el reveal`, { selector })
      return
    }

    const trigger = options?.triggerRef?.value ?? targets[0]
    if (!trigger) {
      console.error(`[${logTag}] No hay trigger para el reveal`, { selector })
      return
    }

    for (const target of targets) {
      target.style.transition = 'none'
    }

    gsap.set(targets, {
      opacity: 0,
      y: options?.y ?? 20,
      immediateRender: true
    })

    io = new IntersectionObserver(
      (entries) => {
        if (played) return
        if (!entries.some((entry) => entry.isIntersecting)) return

        played = true
        io?.disconnect()
        io = null

        ctx = gsap.context(() => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.5,
            stagger: options?.stagger ?? 0.08,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => {
              gsap.set(targets, { clearProps: 'transform,opacity,transition' })
            }
          })
        }, root)
      },
      {
        threshold: 0,
        // Expande el root hacia abajo para arrancar el tween antes de que el bloque esté en pantalla.
        rootMargin: '0px 0px 18% 0px'
      }
    )

    io.observe(trigger)
  })

  onUnmounted(() => {
    io?.disconnect()
    ctx?.revert()
  })
}
