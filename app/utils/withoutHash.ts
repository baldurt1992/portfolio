/**
 * Quita `#fragment` de una ruta.
 * vue-i18n puede conservar el hash del URL actual en CSR; en SSR no hay fragmento → hidratación rota.
 */
export function withoutHash(path: string): string {
  const i = path.indexOf('#')
  return i === -1 ? path : path.slice(0, i)
}
