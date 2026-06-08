import QRScanner from '../components/QRScanner.jsx'

export default function Scanner() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Scan a QR Code
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Use your camera or upload an image to read any QR code instantly.
        </p>
      </header>
      <QRScanner />
    </div>
  )
}
