// Encode a value for use in a URI query string.
const enc = (s = '') => encodeURIComponent(s)
// Escape characters that are special inside Wi-Fi / vCard payloads.
const esc = (s = '') => String(s).replace(/([\\;,:"])/g, '\\$1')

/**
 * Each QR type defines its form fields and a `build(values)` function that
 * turns those values into the final QR payload string. `build` returns ''
 * when the required data is missing.
 */
export const QR_TYPES = [
  {
    key: 'url',
    label: 'Website',
    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.7 2.5-15.3 0-18m0 18c-2.5-2.7-2.5-15.3 0-18M3.5 9h17M3.5 15h17',
    fields: [{ name: 'url', label: 'URL', type: 'text', placeholder: 'https://example.com', required: true }],
    build: (v) => (v.url?.trim() ? v.url.trim() : ''),
  },
  {
    key: 'text',
    label: 'Text',
    icon: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12',
    fields: [{ name: 'text', label: 'Text', type: 'textarea', placeholder: 'Any text you like…', required: true }],
    build: (v) => (v.text?.trim() ? v.text.trim() : ''),
  },
  {
    key: 'email',
    label: 'Email',
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.24a2.25 2.25 0 01-1.07 1.91l-7.5 4.62a2.25 2.25 0 01-2.36 0L3.32 8.9a2.25 2.25 0 01-1.07-1.91V6.75',
    fields: [
      { name: 'to', label: 'To', type: 'email', placeholder: 'hello@example.com', required: true },
      { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Subject (optional)' },
      { name: 'body', label: 'Message', type: 'textarea', placeholder: 'Message (optional)' },
    ],
    build: (v) => {
      if (!v.to?.trim()) return ''
      const params = []
      if (v.subject) params.push(`subject=${enc(v.subject)}`)
      if (v.body) params.push(`body=${enc(v.body)}`)
      return `mailto:${v.to.trim()}${params.length ? `?${params.join('&')}` : ''}`
    },
  },
  {
    key: 'phone',
    label: 'Phone',
    icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.37c0-.52-.35-.97-.85-1.09l-4.42-1.11c-.44-.11-.9.05-1.17.42l-.97 1.29c-.28.38-.77.54-1.21.38a12.04 12.04 0 01-7.14-7.14c-.16-.44 0-.93.38-1.21l1.29-.97c.36-.27.53-.73.42-1.17L6.96 3.1a1.13 1.13 0 00-1.09-.85H4.5A2.25 2.25 0 002.25 4.5v2.25z',
    fields: [{ name: 'phone', label: 'Phone number', type: 'tel', placeholder: '+1 555 123 4567', required: true }],
    build: (v) => (v.phone?.trim() ? `tel:${v.phone.replace(/\s+/g, '')}` : ''),
  },
  {
    key: 'sms',
    label: 'SMS',
    icon: 'M7.5 8.25h9m-9 3.75h6m-9 4.5l3-1.5h7.5a3 3 0 003-3v-4.5a3 3 0 00-3-3h-9a3 3 0 00-3 3v9z',
    fields: [
      { name: 'phone', label: 'Phone number', type: 'tel', placeholder: '+1 555 123 4567', required: true },
      { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Message (optional)' },
    ],
    build: (v) => {
      if (!v.phone?.trim()) return ''
      const num = v.phone.replace(/\s+/g, '')
      return v.message ? `sms:${num}?body=${enc(v.message)}` : `sms:${num}`
    },
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: 'M21 12a9 9 0 01-13.5 7.8L3 21l1.2-4.5A9 9 0 1121 12z',
    fields: [
      { name: 'phone', label: 'Phone number (with country code)', type: 'tel', placeholder: '15551234567', required: true },
      { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Hi there! (optional)' },
    ],
    build: (v) => {
      if (!v.phone?.trim()) return ''
      const digits = v.phone.replace(/\D/g, '')
      if (!digits) return ''
      return v.message ? `https://wa.me/${digits}?text=${enc(v.message)}` : `https://wa.me/${digits}`
    },
  },
  {
    key: 'wifi',
    label: 'Wi-Fi',
    icon: 'M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856a9 9 0 0113.788 0M1.924 8.674a13.5 13.5 0 0120.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z',
    defaults: { encryption: 'WPA' },
    fields: [
      { name: 'ssid', label: 'Network name (SSID)', type: 'text', placeholder: 'MyNetwork', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
      {
        name: 'encryption',
        label: 'Security',
        type: 'select',
        options: [
          { value: 'WPA', label: 'WPA / WPA2' },
          { value: 'WEP', label: 'WEP' },
          { value: 'nopass', label: 'None' },
        ],
      },
      { name: 'hidden', label: 'Hidden network', type: 'checkbox' },
    ],
    build: (v) => {
      if (!v.ssid?.trim()) return ''
      const t = v.encryption || 'WPA'
      const pw = t === 'nopass' ? '' : `P:${esc(v.password)};`
      return `WIFI:T:${t};S:${esc(v.ssid)};${pw}${v.hidden ? 'H:true;' : ''};`
    },
  },
  {
    key: 'vcard',
    label: 'Contact',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.93 17.93 0 0112 21.75c-2.68 0-5.22-.584-7.5-1.632z',
    fields: [
      { name: 'firstName', label: 'First name', type: 'text', placeholder: 'Jane', required: true },
      { name: 'lastName', label: 'Last name', type: 'text', placeholder: 'Doe' },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 555 123 4567' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
      { name: 'org', label: 'Organization', type: 'text', placeholder: 'Acme Inc.' },
      { name: 'url', label: 'Website', type: 'text', placeholder: 'https://example.com' },
    ],
    build: (v) => {
      if (!v.firstName?.trim() && !v.lastName?.trim()) return ''
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${esc(v.lastName)};${esc(v.firstName)};;;`,
        `FN:${esc([v.firstName, v.lastName].filter(Boolean).join(' '))}`,
      ]
      if (v.org) lines.push(`ORG:${esc(v.org)}`)
      if (v.phone) lines.push(`TEL:${v.phone}`)
      if (v.email) lines.push(`EMAIL:${v.email}`)
      if (v.url) lines.push(`URL:${v.url}`)
      lines.push('END:VCARD')
      return lines.join('\n')
    },
  },
  {
    key: 'geo',
    label: 'Location',
    icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    fields: [
      { name: 'lat', label: 'Latitude', type: 'text', placeholder: '37.7749', required: true },
      { name: 'lng', label: 'Longitude', type: 'text', placeholder: '-122.4194', required: true },
    ],
    build: (v) => (v.lat?.trim() && v.lng?.trim() ? `geo:${v.lat.trim()},${v.lng.trim()}` : ''),
  },
]

export function getType(key) {
  return QR_TYPES.find((t) => t.key === key) ?? QR_TYPES[0]
}
