export const backdropVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

export const backdropFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uProgress;
  uniform float uSection;
  uniform float uReduced;
  uniform float uAlpha;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
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

  float sectionWeight(float index) {
    return clamp(1.0 - abs(uSection - index), 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    p += uMouse * 0.035 * (1.0 - uReduced);

    float t = uTime * (0.035 + (1.0 - uReduced) * 0.02);
    float n = fbm(p * 1.35 + vec2(t, uProgress * 0.8));

    float wHero = sectionWeight(0.0);
    float wAbout = sectionWeight(1.0);
    float wSkills = sectionWeight(2.0);
    float wProjects = sectionWeight(3.0);
    float wExperience = sectionWeight(4.0);
    float wContact = sectionWeight(5.0);

    float radial = 1.0 - smoothstep(0.15, 1.15, length(p));
    float organic = fbm(p * 2.1 + t * 0.6);
    float skillsField = fbm(p * 0.95 + vec2(-t * 0.18, t * 0.07));
    float skillsWash = smoothstep(-0.35, 0.7, p.x * 0.5 + p.y * 0.18 + skillsField * 0.22);
    float energy = 0.5 + 0.5 * sin((p.x * 1.2 + p.y) * 5.5 + t * 1.6 + uProgress * 4.0);
    float bands = 0.5 + 0.5 * sin(p.y * 7.0 + uProgress * 3.2);
    float calm = fbm(p * 0.9 + vec2(0.0, t * 0.25));

    float motif =
      radial * wHero * 1.0 +
      organic * wAbout * 1.0 +
      mix(skillsField, skillsWash, 0.55) * wSkills * 1.0 +
      energy * wProjects * 0.95 +
      bands * wExperience * 0.9 +
      calm * wContact * 0.95;

    vec3 color = mix(uColorA, uColorB, clamp(n * 0.45 + motif * 0.55, 0.0, 1.0));
    float falloff = mix(0.55, 1.0, smoothstep(1.35, 0.15, length(p)));
    float alpha = uAlpha * (0.45 + motif * 0.4 + n * 0.2) * falloff;

    gl_FragColor = vec4(color, clamp(alpha, 0.12, 0.72));
  }
`
