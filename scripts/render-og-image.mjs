/**
 * Rasteriza scripts/og-image.html a public/og-image.png (1200×630).
 * Uso: node scripts/render-og-image.mjs
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { writeFileSync } from 'node:fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = join(root, 'scripts', 'og-image.html')
const pngPath = join(root, 'public', 'og-image.png')

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2
})

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

const buffer = await page.screenshot({ type: 'png', omitBackground: false })
await browser.close()

const optimized = await sharp(buffer)
  .resize(1200, 630, { kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toBuffer()

writeFileSync(pngPath, optimized)
console.info('[render-og-image] Escrito', pngPath, `${optimized.length} bytes`)
