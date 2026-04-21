/**
 * Genera WebP optimizados en `public/images/` (ejecutar tras cambiar los PNG/JPG fuente).
 * Uso: node scripts/optimize-public-images.mjs
 */
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public', 'images')
const projects = join(pub, 'projects')

await sharp(join(pub, 'avatar.png'))
  .resize(256, 256, { fit: 'cover', position: 'center' })
  .webp({ quality: 85, effort: 4 })
  .toFile(join(pub, 'avatar.webp'))

await sharp(join(pub, 'avatar.png'))
  .resize(112, 112, { fit: 'cover', position: 'center' })
  .webp({ quality: 82, effort: 4 })
  .toFile(join(pub, 'avatar-112.webp'))

await sharp(join(pub, 'avatar.png'))
  .resize(224, 224, { fit: 'cover', position: 'center' })
  .webp({ quality: 84, effort: 4 })
  .toFile(join(pub, 'avatar-224.webp'))

// Hero: muestra máx ~224px CSS; 640px cubre 2x–3x sin acercarse a los 2.3MB del JPG original.
await sharp(join(pub, 'portrait.jpg'))
  .resize(640, 640, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82, effort: 4 })
  .toFile(join(pub, 'portrait.webp'))

await sharp(join(pub, 'portrait.jpg'))
  .resize(224, 224, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82, effort: 4 })
  .toFile(join(pub, 'portrait-224.webp'))

await sharp(join(pub, 'portrait.jpg'))
  .resize(448, 448, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82, effort: 4 })
  .toFile(join(pub, 'portrait-448.webp'))

const projectImages = [
  'ticador-dashboard',
  'cosmos-erp-dashboard',
  'wordpress-dental-site'
]

for (const name of projectImages) {
  for (const width of [640, 960, 1280]) {
    await sharp(join(projects, `${name}.png`))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(join(projects, `${name}-${width}.webp`))
  }
}

console.log('[optimize-public-images] OK: responsive WebP variants generated')
