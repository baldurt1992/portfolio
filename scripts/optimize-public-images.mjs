/**
 * Genera WebP optimizados en `public/images/` (ejecutar tras cambiar los PNG/JPG fuente).
 * Uso: node scripts/optimize-public-images.mjs
 */
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public', 'images')

await sharp(join(pub, 'avatar.png'))
  .resize(256, 256, { fit: 'cover', position: 'center' })
  .webp({ quality: 85, effort: 4 })
  .toFile(join(pub, 'avatar.webp'))

// Hero: muestra máx ~224px CSS; 640px cubre 2x–3x sin acercarse a los 2.3MB del JPG original.
await sharp(join(pub, 'portrait.jpg'))
  .resize(640, 640, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82, effort: 4 })
  .toFile(join(pub, 'portrait.webp'))

console.log('[optimize-public-images] OK: avatar.webp, portrait.webp')
