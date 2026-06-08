import { useState, useEffect } from 'react'

/**
 * A useState wrapper that persists the value to localStorage.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore write errors (e.g. private mode / quota exceeded).
    }
  }, [key, value])

  return [value, setValue]
}
