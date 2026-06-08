/**
 * Returns true when the given string looks like a valid http(s) URL.
 */
export function isValidUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Builds a properly formatted payload for common QR content types.
 */
export function buildPayload(type, fields = {}) {
  switch (type) {
    case 'url':
      return fields.url || ''
    case 'email':
      return `mailto:${fields.email || ''}`
    case 'tel':
      return `tel:${fields.phone || ''}`
    case 'sms':
      return `sms:${fields.phone || ''}`
    case 'wifi':
      return `WIFI:T:${fields.encryption || 'WPA'};S:${fields.ssid || ''};P:${fields.password || ''};;`
    case 'text':
    default:
      return fields.text || ''
  }
}
