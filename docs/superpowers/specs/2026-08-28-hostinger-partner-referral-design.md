# Hostinger Partner + referido (enfoque A)

Fecha: 2026-08-28  
Estado: revisado y listo para el plan de implementación.

## Problema

El portafolio debe mostrar la insignia oficial Hostinger Partner (credencial) y, sobre todo, el código de referido para que un visitante ahorre 20%. Eso no puede vivir en el hero: pelea con la marca de ingeniería. Tampoco puede quedar solo en el footer: el cupón no se usa.

## Decisión

Enfoque A: tres superficies, dos jobs.

| Superficie            | Job          | Qué se muestra                                            |
| --------------------- | ------------ | --------------------------------------------------------- |
| Sobre mí (`#about`)   | Credencial   | Bloque de reconocimiento + insignia. Sin “ahorra 20%”.    |
| Contacto (`#contact`) | Conversión   | Card: insignia wide + 20% + cupón + copiar + CTA al link. |
| Footer                | Persistencia | Insignia compacta + cupón clicable para copiar.           |

No hay sección nueva, no hay precios de Hostinger, no hay entrada en nav.

## Datos canónicos

Un solo origen: `app/data/hostingerPartner.ts`. No van a `portfolio.ts`.

| Campo             | Valor                                                  |
| ----------------- | ------------------------------------------------------ |
| `couponCode`      | `BALDURDEV92`                                          |
| `referralUrl`     | Se deriva de `couponCode`; no repite el código a mano. |
| `discountPercent` | `20`                                                   |
| Badge light       | `public/images/partners/hostinger/badge-light.svg`     |
| Badge dark        | `public/images/partners/hostinger/badge-dark.svg`      |

La URL final es `https://www.hostinger.com/co?REFERRALCODE=BALDURDEV92`, pero se construye a partir de `couponCode` para que enlace y cupón no puedan divergir:

```ts
const couponCode = 'BALDURDEV92'

export const hostingerPartner = {
  couponCode,
  referralUrl: `https://www.hostinger.com/co?REFERRALCODE=${couponCode}`,
  discountPercent: 20,
  badges: {
    light: '/images/partners/hostinger/badge-light.svg',
    dark: '/images/partners/hostinger/badge-dark.svg'
  }
} as const
```

Cualquier código distinto de `BALDURDEV92` es obsoleto y no debe aparecer en la aplicación.

Copy (títulos, CTA y toasts) vive en `i18n/locales/es.json` y `en.json`. URL y cupón no se traducen.

## Arquitectura

Bounded context chico: credencial + referido.

| Archivo                                              | Responsabilidad                                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `app/data/hostingerPartner.ts`                       | Cupón canónico, URL derivada, %, rutas de insignia. Sin copy.                       |
| `app/composables/useHostingerPartner.ts`             | Badge según color-mode, `publicPath`, copiar cupón, toast y log técnico de errores. |
| `app/components/partners/HostingerPartnerBadge.vue`  | Insignia oficial. Props: `variant: 'compact' \| 'wide'`. Enlace externo.            |
| `app/components/partners/HostingerReferralOffer.vue` | Card de conversión; consume el composable y no conoce valores hardcodeados.         |
| `public/images/partners/hostinger/`                  | Solo los dos SVG que se sirven.                                                     |

About, Contact y Footer **montan**. No hardcodean URL ni cupón.

Flujo: data → composable → badge u offer → superficies.

### Por qué no entra en `portfolio.ts`

Bio, projects y experience son el perfil profesional. El partner es un programa comercial con URL y cupón que cambian juntos. Un módulo aparte evita mezclar agregados.

## Assets

Fuente (no se sirve): `hostinger/svg/` en la raíz.

Copiar y renombrar (ASCII, sin `×`):

- `hostinger/svg/Badge_light.svg` → `public/images/partners/hostinger/badge-light.svg` (fondo blanco / texto #18181A; encaja con el paper light)
- `hostinger/svg/Badge_dark.svg` → `public/images/partners/hostinger/badge-dark.svg` (fondo #18181A / texto claro; encaja con el dark #05050a)

Ambos son el lockup horizontal oficial 80×30. `compact` y `wide` son el mismo SVG con distinto `max-width` (aprox. 160px / 280px). No se redibuja la insignia. No se copian PNG/WebP ni variantes square.

Color-mode: `useColorMode().value === 'dark'` → badge dark; cualquier otro valor resuelto → badge light. Misma regla que `app.vue` para theme-color. No usar `prefers-color-scheme` suelto.

## Superficies

### Sobre mí

En `AboutSection`, debajo del nombre dentro del `figcaption` (columna del retrato).

- Bloque de reconocimiento profesional con título “Partner de Hostinger” y una frase factual sobre la insignia concedida dentro del programa de partners.
- `HostingerPartnerBadge` `variant="wide"`.
- Click = `referralUrl`.
- Sin texto de descuento. Sin botón copiar.

### Contacto

En `ContactSection`, columna izquierda, **después** de email y GitHub/LinkedIn, **antes** del form (el form sigue a la derecha en `lg`).

Card `HostingerReferralOffer`:

1. Insignia `wide`.
2. Título i18n: ahorra 20% en Hostinger (`discountPercent` interpolado).
3. Texto de apoyo: “Usa este enlace para acceder al 20% o copia el cupón”.
4. Cupón `BALDURDEV92` en `font-mono` + botón Copiar.
5. CTA natural y explícito: “Visitar Hostinger” → `referralUrl`, `target="_blank"`.

La card no sustituye el form ni el sticky de contacto.

### Footer

En `AppFooter`, bloque propio (en `sm+`: identidad | partner | social; en mobile, apilado).

- `HostingerPartnerBadge` `variant="compact"` (el único link a Hostinger en este bloque).
- El cupón `BALDURDEV92` vive en un botón compacto con icono copiar/check a la derecha del badge en `sm+`, debajo en mobile.
- Toda la caja del cupón copia al hacer click; no es un segundo link a Hostinger.

## Enlace y a11y

- Todo link a Hostinger: `target="_blank"`, `rel="sponsored noopener noreferrer"`.
- `alt` / `aria-label` i18n: “Hostinger Partner”.
- El cupón no es el único camino: el CTA también lleva el referido.
- Áreas clickeables ≥ 44px en el botón Copiar y el CTA.
- Contraste: la insignia oficial no se retoca; el texto del cupón usa los tokens `text` / `text-muted`.

## Copiar cupón

1. `navigator.clipboard.writeText(couponCode)`.
2. Éxito: toast i18n (título + que se copió `BALDURDEV92`).
3. Fallo (API ausente, permiso, HTTP inseguro): toast de error. El código sigue visible para copiar a mano.
4. No hay auditoría ni tracking. En caso de fallo se registra un `console.error` técnico con tag `[HostingerPartner]`, sin datos sensibles; cualquier `console.info` de éxito queda limitado a `import.meta.dev`.

No hay e2e del clipboard (frágil entre browsers).

## Copy i18n (claves)

Namespace `hostingerPartner`:

- `badgeAlt` — Hostinger Partner
- `offerTitle` — Ahorra {percent}% en Hostinger
- `offerHint` — Usa este enlace para acceder al 20% o copia el cupón.
- `couponLabel` — Cupón
- `copy` / `copied` — Copiar / Copiado
- `cta` — Visitar Hostinger
- `toastCopiedTitle` / `toastCopiedDescription`
- `toastCopyErrorTitle` / `toastCopyErrorDescription`
- `footerCoupon` — Cupón {code}

ES y EN. `{percent}` y `{code}` se interpolan; el valor de `code` sale de data, no de un string distinto por locale.

## Qué queda fuera

- Hero, sticky bar, skills, nav, experiencia como ítem de timeline.
- Precios, planes o tabla de Hostinger (se vencen).
- Página `/hostinger`.
- Redibujar o recolorizar la insignia.
- Servir la carpeta `hostinger/` completa.
- Tracking extra (UTM, analytics de click) en esta iteración.
- Store Pinia: no hay estado global que sobreviva navegación más allá de color-mode.

## Tests

Extender `tests/e2e/smoke.spec.ts` (ES y EN):

- `#about` y footer: imagen o link con nombre accesible Hostinger Partner.
- `#contact`: texto del cupón `BALDURDEV92`.
- Al menos un link cuyo `href` sea exactamente `https://www.hostinger.com/co?REFERRALCODE=BALDURDEV92`.
- Todo link a Hostinger abre en una pestaña nueva y su `rel` contiene `sponsored`, `noopener` y `noreferrer`.
- Invariante: el valor visible de `couponCode` coincide con el parámetro `REFERRALCODE` del enlace generado.
- La home no contiene ningún código de referido distinto de `BALDURDEV92`.

No se añaden precios al assert.

## Criterio de hecho

Un visitante ve la insignia en el perfil, puede copiar `BALDURDEV92` en Contacto, y el CTA abre el link de referido. El hero no menciona Hostinger.
