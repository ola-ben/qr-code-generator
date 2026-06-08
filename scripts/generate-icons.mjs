import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
mkdirSync(publicDir, { recursive: true })

const svg = readFileSync(join(__dirname, 'icon-source.svg'))

// Standard (transparent-corner) icons used as "any" purpose.
const standard = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32x32.png', size: 32 },
]

// Maskable icon: the source already has a full-bleed gradient background,
// so it is safe inside the platform's safe zone.
const maskable = [{ name: 'maskable-512x512.png', size: 512 }]

for (const { name, size } of [...standard, ...maskable]) {
  await sharp(svg).resize(size, size).png().toFile(join(publicDir, name))
  console.log('generated', name)
}

console.log('Done.')
