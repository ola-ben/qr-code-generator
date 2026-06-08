import { useState, useCallback, useRef } from 'react'

/**
 * Minimal toast manager. Returns the current toast (or null) plus a
 * showToast(message, type) helper. Toasts auto-dismiss after `duration` ms.
 */
export default function useToast(duration = 2500) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const showToast = useCallback(
    (message, type = 'success') => {
      if (timer.current) clearTimeout(timer.current)
      setToast({ message, type, id: Date.now() })
      timer.current = setTimeout(() => setToast(null), duration)
    },
    [duration],
  )

  return { toast, showToast }
}
