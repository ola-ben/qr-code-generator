import { useRef } from 'react'
import useQRScanner from '../hooks/useQRScanner.js'
import useToast from '../hooks/useToast.js'
import Toast from './Toast.jsx'
import Tooltip from './Tooltip.jsx'
import { isValidUrl } from '../utils/validate.js'

export default function QRScanner() {
  const { videoRef, canvasRef, scanning, result, error, start, stop, reset, scanFile } = useQRScanner()
  const { toast, showToast } = useToast()
  const fileInputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) scanFile(file)
    e.target.value = '' // allow re-selecting the same file
  }

  const resultIsUrl = result && isValidUrl(result)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      showToast('Copied to clipboard!', 'success')
    } catch {
      showToast('Clipboard not available.', 'error')
    }
  }

  const handleScanAgain = () => {
    reset()
    start()
  }

  return (
    <div className="relative w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/60 dark:backdrop-blur sm:p-8">
      {/* Camera viewport */}
      <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-slate-300 dark:ring-slate-700">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${scanning ? 'block' : 'hidden'}`}
          muted
          playsInline
        />
        <canvas ref={canvasRef} className="hidden" />

        {scanning && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-2/3 w-2/3 rounded-xl shadow-[0_0_0_9999px_rgba(15,23,42,0.5)]">
              {/* animated corner brackets */}
              <span className="absolute left-0 top-0 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-accent-400" />
              <span className="absolute right-0 top-0 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-accent-400" />
              <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-accent-400" />
              <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-accent-400" />
            </div>
          </div>
        )}

        {!scanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 p-6 text-center dark:bg-slate-800">
            <svg className="h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10" />
            </svg>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {result ? 'Scan complete.' : 'Camera is off. Start scanning to read a QR code.'}
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
        {!scanning ? (
          <Tooltip label={result ? 'Scan another code' : 'Allow camera access to scan'}>
            <button type="button" onClick={result ? handleScanAgain : start} className="btn-primary px-5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {result ? 'Scan again' : 'Start camera'}
            </button>
          </Tooltip>
        ) : (
          <Tooltip label="Turn the camera off">
            <button type="button" onClick={stop} className="btn-ghost px-5">
              Stop camera
            </button>
          </Tooltip>
        )}

        <Tooltip label="Decode a QR code from an image file">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-ghost px-5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload image
          </button>
        </Tooltip>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>

      {error && <p className="mt-3 text-center text-sm text-rose-500 dark:text-rose-400">{error}</p>}

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Result</p>
          <p className="break-all text-sm text-slate-900 dark:text-slate-100">{result}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tooltip label="Copy result to clipboard">
              <button type="button" onClick={handleCopy} className="btn-primary">
                Copy
              </button>
            </Tooltip>
            {resultIsUrl && (
              <Tooltip label="Open link in a new tab">
                <a href={result} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Open link ↗
                </a>
              </Tooltip>
            )}
          </div>
        </div>
      )}

      <Toast toast={toast} />
    </div>
  )
}
