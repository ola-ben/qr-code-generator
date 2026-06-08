import { useRef, useState, useEffect, useCallback } from 'react'
import jsQR from 'jsqr'

/**
 * Camera-based QR scanner.
 *
 * Attach the returned `videoRef` to a <video> element, then call start().
 * It streams the camera, scans each frame with jsQR, and reports the first
 * decoded value via `result`.
 */
export default function useQRScanner() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const rafRef = useRef(null)

  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setScanning(false)
  }, [])

  const tick = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(tick)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    })

    if (code && code.data) {
      setResult(code.data)
      stop()
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [stop])

  const start = useCallback(async () => {
    setError('')
    setResult('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is not supported in this browser.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      streamRef.current = stream
      const video = videoRef.current
      if (!video) return
      video.srcObject = stream
      video.setAttribute('playsinline', 'true')
      await video.play()
      setScanning(true)
      rafRef.current = requestAnimationFrame(tick)
    } catch (err) {
      if (err?.name === 'NotAllowedError') {
        setError('Camera permission was denied. Please allow access and try again.')
      } else if (err?.name === 'NotFoundError') {
        setError('No camera found on this device.')
      } else {
        setError('Unable to start the camera.')
      }
      stop()
    }
  }, [tick, stop])

  // Decode a QR code from an uploaded image file (no camera needed).
  const scanFile = useCallback(
    (file) => {
      setError('')
      setResult('')
      if (!file) return
      if (!file.type.startsWith('image/')) {
        setError('Please choose an image file.')
        return
      }
      stop()
      const url = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0)
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(data.data, data.width, data.height)
        URL.revokeObjectURL(url)
        if (code && code.data) setResult(code.data)
        else setError('No QR code found in that image.')
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        setError('Could not read that image.')
      }
      img.src = url
    },
    [stop],
  )

  const reset = useCallback(() => {
    setResult('')
    setError('')
  }, [])

  // Clean up the stream when the component unmounts.
  useEffect(() => stop, [stop])

  return { videoRef, canvasRef, scanning, result, error, start, stop, reset, scanFile }
}
