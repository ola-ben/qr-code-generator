/**
 * Triggers a browser download for a given data URL.
 */
export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Finds the <canvas> rendered by qrcode.react inside a container and
 * downloads it as a PNG.
 */
export function downloadCanvasAsPng(container, filename = 'qr-code.png') {
  const canvas = container?.querySelector('canvas')
  if (!canvas) return false
  downloadDataUrl(canvas.toDataURL('image/png'), filename)
  return true
}
