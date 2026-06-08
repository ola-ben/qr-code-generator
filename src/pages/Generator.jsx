import QRGenerator from '../components/QRGenerator.jsx'

export default function Generator() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          QR Generator
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Pick a type, enter your content, and download your QR code.
        </p>
      </header>
      <QRGenerator />
    </div>
  )
}
