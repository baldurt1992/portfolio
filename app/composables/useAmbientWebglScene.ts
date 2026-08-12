import * as THREE from 'three'

/**
 * Fondo WebGL de un quad en NDC: ruido lento + dos manchas de color del tema.
 * Sin meshes 3D. El copy del portafolio sigue siendo el sujeto.
 */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uTheme;
  uniform float uReduced;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform vec3 uBg;
  uniform vec3 uPrimary;
  uniform vec3 uAccent;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * mix(0.035, 0.0, uReduced);
    vec2 drift = vec2(t * 0.12, t * 0.08);
    vec2 mouse = uMouse * mix(0.18, 0.0, uReduced);
    vec2 fieldUv = p * 1.35 + drift + mouse + vec2(0.0, uScroll * 0.22);

    float n = fbm(fieldUv);
    float n2 = fbm(fieldUv * 1.7 + 4.2);

    vec2 primaryPos = vec2(-0.42, 0.28) + mouse * 0.35;
    vec2 accentPos = vec2(0.48, -0.22) + vec2(-mouse.y, mouse.x) * 0.25;
    float primaryBlob = exp(-dot(p - primaryPos, p - primaryPos) * 2.4);
    float accentBlob = exp(-dot(p - accentPos, p - accentPos) * 2.8);

    float wash = mix(0.14, 0.22, uTheme);
    vec3 col = uBg;
    col = mix(col, uPrimary, primaryBlob * wash * (0.55 + n * 0.45));
    col = mix(col, uAccent, accentBlob * wash * 0.72 * (0.5 + n2 * 0.5));

    float grain = (hash(gl_FragCoord.xy + uTime * 12.0) - 0.5) * mix(0.018, 0.028, uTheme);
    col += grain;

    float vignette = smoothstep(1.15, 0.28, length(p * vec2(0.85, 1.0)));
    col = mix(uBg, col, vignette);

    gl_FragColor = vec4(col, 1.0);
  }
`

function readCssColor(name: string, fallback: string) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const color = new THREE.Color()
  try {
    color.set(raw || fallback)
  } catch {
    color.set(fallback)
  }
  return color
}

export function useAmbientWebglScene(canvasRef: Ref<HTMLCanvasElement | null>) {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.OrthographicCamera | null = null
  let material: THREE.ShaderMaterial | null = null
  let mesh: THREE.Mesh | null = null
  let raf = 0
  let running = false
  let startMs = 0
  const mouse = new THREE.Vector2(0, 0)
  const mouseTarget = new THREE.Vector2(0, 0)
  let themeObserver: MutationObserver | null = null

  function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function isDarkTheme() {
    return document.documentElement.classList.contains('dark')
  }

  function syncThemeUniforms() {
    if (!material) return
    const theme = isDarkTheme() ? 1 : 0
    material.uniforms.uTheme!.value = theme
    material.uniforms.uBg!.value = readCssColor('--color-bg', theme ? '#05050a' : '#f7f7f5')
    material.uniforms.uPrimary!.value = readCssColor(
      '--color-primary',
      theme ? '#3b82f6' : '#2563eb'
    )
    material.uniforms.uAccent!.value = readCssColor('--color-accent', theme ? '#fb923c' : '#f97316')
    material.uniforms.uReduced!.value = isReducedMotion() ? 1 : 0
  }

  function resize() {
    if (!renderer || !material || !canvasRef.value) return
    const canvas = canvasRef.value
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height, false)
    material.uniforms.uResolution!.value.set(width * dpr, height * dpr)
  }

  function scrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (max <= 0) return 0
    return window.scrollY / max
  }

  function onPointerMove(event: PointerEvent) {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = -((event.clientY / window.innerHeight) * 2 - 1)
    mouseTarget.set(x, y)
  }

  function tick(now: number) {
    if (!running || !renderer || !scene || !camera || !material) return
    raf = requestAnimationFrame(tick)

    if (document.hidden) return

    const elapsed = (now - startMs) / 1000
    mouse.lerp(mouseTarget, 0.045)
    material.uniforms.uTime!.value = elapsed
    material.uniforms.uMouse!.value.copy(mouse)
    material.uniforms.uScroll!.value = scrollProgress()
    renderer.render(scene, camera)
  }

  function init() {
    const canvas = canvasRef.value
    if (!canvas) {
      console.error('[AmbientWebgl] No hay canvas para el fondo', { hasCanvas: false })
      return
    }
    if (running) return

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power'
      })
      renderer.setClearColor(0x000000, 0)
      scene = new THREE.Scene()
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTheme: { value: 0 },
          uReduced: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
          uBg: { value: new THREE.Color('#f7f7f5') },
          uPrimary: { value: new THREE.Color('#2563eb') },
          uAccent: { value: new THREE.Color('#f97316') }
        },
        vertexShader,
        fragmentShader,
        depthTest: false,
        depthWrite: false
      })
      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
      scene.add(mesh)
      syncThemeUniforms()
      resize()

      window.addEventListener('resize', resize, { passive: true })
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      themeObserver = new MutationObserver(syncThemeUniforms)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })

      running = true
      startMs = performance.now()
      raf = requestAnimationFrame(tick)
    } catch (error) {
      console.error('[AmbientWebgl] No se pudo iniciar el fondo WebGL', { error })
      cleanup()
    }
  }

  function cleanup() {
    running = false
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointerMove)
    themeObserver?.disconnect()
    themeObserver = null
    mesh?.geometry.dispose()
    material?.dispose()
    renderer?.dispose()
    mesh = null
    material = null
    scene = null
    camera = null
    renderer = null
  }

  return { init, cleanup }
}
