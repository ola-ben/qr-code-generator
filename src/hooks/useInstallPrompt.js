import { useState, useEffect, useCallback } from 'react'

/**
 * Tracks PWA installability.
 *
 * - Captures the `beforeinstallprompt` event (Chrome/Edge/Android) so we can
 *   trigger the native install dialog on demand.
 * - Detects iOS Safari, which has no such event and requires the manual
 *   "Share → Add to Home Screen" flow.
 * - Hides everything once the app is already running installed (standalone).
 */
export default function useInstallPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [installed, setInstalled] = useState(false)

  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true)

  const isIos =
    typeof window !== 'undefined' &&
    /iphone|ipad|ipod/i.test(window.navigator.userAgent) &&
    !/crios|fxios/i.test(window.navigator.userAgent)

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferred) return null
    deferred.prompt()
    const { outcome } = await deferred.userChoice
    if (outcome === 'accepted') setDeferred(null)
    return outcome
  }, [deferred])

  // Whether the browser's native install prompt is ready to fire.
  const canPrompt = Boolean(deferred)

  // Hide the control entirely only once the app is actually installed/running
  // standalone. Otherwise we always surface an install affordance so users know
  // the app can be downloaded — falling back to manual instructions when the
  // native prompt isn't available yet.
  const isInstalled = isStandalone || installed

  return { canPrompt, isIos, isInstalled, promptInstall }
}
