import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { readAmbientPalette } from '~/utils/webgl/ambientPalette'
import { backdropFragmentShader, backdropVertexShader } from '~/utils/webgl/ambientShaders'

gsap.registerPlugin(ScrollTrigger)

const SECTION_SELECTORS = [
  '#hero',
  '#about',
  '#technologies',
  '#projects',
  '#experience',
  '#contact'
] as const

/**
 * Fondo de capítulo: plano a pantalla completa + shader.
 * ScrollTrigger escribe progreso y sección; el RAF interpola.
 */
export function useAmbientWebglScene(canvasRef: Ref<HTMLCanvasElement | null>) {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.OrthographicCamera | null = null
  let mesh: THREE.Mesh | null = null
  let rafId: number | null = null
  let startedAt = 0
  let themeObserver: MutationObserver | null = null
  let isVisible = true
  let prefersReducedMotion = false
  let material: THREE.ShaderMaterial | null = null
  const triggers: ScrollTrigger[] = []

  const mouse = { x: 0, y: 0 }
  const mouseTarget = { x: 0, y: 0 }
  let progressTarget = 0
  let progressCurrent = 0
  let sectionTarget = 0
  let sectionCurrent = 0

  function applyTheme() {
    if (!material) return
    const palette = readAmbientPalette()
    const uColorA = material.uniforms.uColorA
    const uColorB = material.uniforms.uColorB
    const uAlpha = material.uniforms.uAlpha
    if (uColorA) uColorA.value.copy(palette.colorA)
    if (uColorB) uColorB.value.copy(palette.colorB)
    if (uAlpha) uAlpha.value = palette.alpha
  }

  function bindScroll() {
    triggers.forEach((trigger) => trigger.kill())
    triggers.length = 0

    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        scrub: prefersReducedMotion ? false : 0.7,
        onUpdate: (self) => {
          progressTarget = self.progress
        }
      })
    )

    SECTION_SELECTORS.forEach((selector, index) => {
      const element = document.querySelector(selector)
      if (!element) {
        console.error('[AmbientScene] No se encontró la sección para el fondo', { selector })
        return
      }

      triggers.push(
        ScrollTrigger.create({
          trigger: element,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            sectionTarget = index
          },
          onEnterBack: () => {
            sectionTarget = index
          }
        })
      )
    })

    ScrollTrigger.refresh()
  }

  function init() {
    const canvas = canvasRef.value
    if (!canvas) return

    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
      })
    } catch (error) {
      console.error('[AmbientScene] No se pudo inicializar WebGL', { error })
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uProgress: { value: 0 },
        uSection: { value: 0 },
        uReduced: { value: prefersReducedMotion ? 1 : 0 },
        uAlpha: { value: 0.16 },
        uColorA: { value: new THREE.Color('#94A3B8') },
        uColorB: { value: new THREE.Color('#2563EB') }
      },
      vertexShader: backdropVertexShader,
      fragmentShader: backdropFragmentShader,
      transparent: true,
      depthWrite: false
    })

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    applyTheme()
    bindScroll()

    startedAt = performance.now()
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('pointermove', handlePointer, { passive: true })
    window.addEventListener('resize', resize)

    themeObserver = new MutationObserver(() => applyTheme())
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    if (prefersReducedMotion) {
      renderFrame(0)
      return
    }

    animate()
  }

  function handleVisibility() {
    isVisible = document.visibilityState === 'visible'
  }

  function handlePointer(event: PointerEvent) {
    mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1
    mouseTarget.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  function renderFrame(elapsed: number) {
    if (!renderer || !scene || !camera || !material) return

    const ease = prefersReducedMotion ? 1 : 0.06
    progressCurrent += (progressTarget - progressCurrent) * ease
    sectionCurrent += (sectionTarget - sectionCurrent) * ease
    mouse.x += (mouseTarget.x - mouse.x) * 0.05
    mouse.y += (mouseTarget.y - mouse.y) * 0.05

    const uTime = material.uniforms.uTime
    const uMouse = material.uniforms.uMouse
    const uProgress = material.uniforms.uProgress
    const uSection = material.uniforms.uSection
    if (!uTime || !uMouse || !uProgress || !uSection) return

    uTime.value = prefersReducedMotion ? 0 : elapsed
    uMouse.value.set(mouse.x, mouse.y)
    uProgress.value = progressCurrent
    uSection.value = sectionCurrent

    renderer.render(scene, camera)
  }

  function animate() {
    rafId = requestAnimationFrame(animate)
    if (!isVisible) return
    renderFrame((performance.now() - startedAt) / 1000)
  }

  function resize() {
    if (!renderer || !material) return
    renderer.setSize(window.innerWidth, window.innerHeight)
    const uResolution = material.uniforms.uResolution
    if (uResolution) uResolution.value.set(window.innerWidth, window.innerHeight)
  }

  function cleanup() {
    if (rafId) cancelAnimationFrame(rafId)
    themeObserver?.disconnect()
    document.removeEventListener('visibilitychange', handleVisibility)
    window.removeEventListener('pointermove', handlePointer)
    window.removeEventListener('resize', resize)
    triggers.forEach((trigger) => trigger.kill())
    triggers.length = 0

    mesh?.geometry.dispose()
    material?.dispose()
    renderer?.dispose()
    renderer?.forceContextLoss()
    renderer = null
    scene = null
    camera = null
  }

  return { init, cleanup }
}
