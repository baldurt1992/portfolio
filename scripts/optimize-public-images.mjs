/**
 * Genera WebP en `public/images/` y favicons desde el recorte 8-bit.
 * Uso: node scripts/optimize-public-images.mjs
 */
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public', 'images')
const publicRoot = join(root, 'public')
const projects = join(pub, 'projects')
const cutout = join(pub, 'avatar-cutout.png')

const pixelArt = { kernel: sharp.kernel.nearest, fit: 'cover', position: 'center' }
const pixelContain = {
  kernel: sharp.kernel.nearest,
  fit: 'contain',
  background: { r: 0, g: 0, b: 0, alpha: 0 }
}

function pngToIco(pngBuffer) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)

  const entry = Buffer.alloc(16)
  entry.writeUInt8(32, 0)
  entry.writeUInt8(32, 1)
  entry.writeUInt8(0, 2)
  entry.writeUInt8(0, 3)
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(pngBuffer.length, 8)
  entry.writeUInt32LE(22, 12)

  return Buffer.concat([header, entry, pngBuffer])
}

async function pixelPng(size) {
  return sharp(cutout).resize(size, size, pixelContain).png().toBuffer()
}

async function iconOnDark(canvasSize, innerSize, fileName) {
  const inner = await sharp(cutout).resize(innerSize, innerSize, pixelContain).png().toBuffer()
  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: '#05050A'
    }
  })
    .composite([{ input: inner, gravity: 'centre' }])
    .png()
    .toFile(join(publicRoot, fileName))
}

await sharp(join(pub, 'avatar.png'))
  .resize(512, 512, pixelArt)
  .webp({ quality: 100, effort: 4, lossless: true })
  .toFile(join(pub, 'avatar.webp'))

await sharp(join(pub, 'avatar.png'))
  .resize(112, 112, pixelArt)
  .webp({ quality: 100, effort: 4, lossless: true })
  .toFile(join(pub, 'avatar-112.webp'))

await sharp(join(pub, 'avatar.png'))
  .resize(224, 224, pixelArt)
  .webp({ quality: 100, effort: 4, lossless: true })
  .toFile(join(pub, 'avatar-224.webp'))

await sharp(join(pub, 'avatar.png'))
  .resize(448, 448, pixelArt)
  .webp({ quality: 100, effort: 4, lossless: true })
  .toFile(join(pub, 'avatar-448.webp'))

for (const size of [512, 112, 224, 448]) {
  const suffix = size === 512 ? '' : `-${size}`
  await sharp(cutout)
    .resize(size, size, pixelContain)
    .webp({ quality: 100, effort: 4, lossless: true })
    .toFile(join(pub, `avatar-cutout${suffix}.webp`))
}

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

const favicon32 = await pixelPng(32)
writeFileSync(join(publicRoot, 'favicon-32x32.png'), favicon32)
writeFileSync(join(publicRoot, 'favicon.ico'), pngToIco(favicon32))
writeFileSync(join(publicRoot, 'favicon-96x96.png'), await pixelPng(96))

await iconOnDark(180, 140, 'apple-touch-icon.png')
await iconOnDark(192, 134, 'web-app-manifest-192x192.png')
await iconOnDark(512, 358, 'web-app-manifest-512x512.png')

console.log('[optimize-public-images] OK: WebP + favicons 8-bit generated')
