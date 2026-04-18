// vue-i18n puede arrastrar # del URL en CSR; SSR no tiene fragmento → mismatches de hidratación en href
export function withoutHash(path: string): string {
  const i = path.indexOf('#')
  return i === -1 ? path : path.slice(0, i)
}
