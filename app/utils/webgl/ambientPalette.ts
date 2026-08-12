import * as THREE from 'three'

export type AmbientPalette = {
  isDark: boolean
  colorA: THREE.Color
  colorB: THREE.Color
  alpha: number
}

function readCssColor(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

export function readAmbientPalette(): AmbientPalette {
  const isDark = document.documentElement.classList.contains('dark')
  const primary = new THREE.Color(readCssColor('--color-primary', isDark ? '#3B82F6' : '#2563EB'))
  const accent = new THREE.Color(readCssColor('--color-accent', isDark ? '#FB923C' : '#F97316'))

  if (isDark) {
    return {
      isDark,
      colorA: primary.clone(),
      colorB: accent.clone(),
      alpha: 0.28
    }
  }

  return {
    isDark,
    colorA: primary.clone(),
    colorB: accent.clone(),
    alpha: 0.22
  }
}
