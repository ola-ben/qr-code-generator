import { useState, useCallback } from 'react'

export const DEFAULT_OPTIONS = {
  value: '',
  size: 256,
  fgColor: '#0f172a',
  bgColor: '#ffffff',
  level: 'M',
}

/**
 * Centralizes QR option state and exposes simple update helpers.
 */
export default function useQRCode(initial = {}) {
  const [options, setOptions] = useState({ ...DEFAULT_OPTIONS, ...initial })

  const setOption = useCallback((key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => setOptions(DEFAULT_OPTIONS), [])

  return { options, setOption, setOptions, reset }
}
