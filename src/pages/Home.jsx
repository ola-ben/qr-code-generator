import { Link } from 'react-router-dom'
import QRGenerator from '../components/QRGenerator.jsx'

const FEATURES = [
  {
    title: 'Instant & live',
    desc: 'Your QR code renders the moment you type — no waiting, no refreshes.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: '100% private',
    desc: 'Everything runs locally in your browser. Nothing is ever uploaded.',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Scan too',
    desc: 'Read any QR code with your camera, then copy or open the result.',
    icon: 'M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10',
  },
]

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          Turn any link into a{' '}
          <span className="bg-gradient-to-r from-brand-600 via-accent-500 to-brand-600 bg-clip-text text-transparent">
            QR code
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Generate and scan QR codes for websites, WhatsApp, phone, SMS, and email — customized
          and processed entirely in your browser.
        </p>
      </section>

      {/* Generator */}
      <section className="mx-auto max-w-xl">
        <QRGenerator />
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Got a code to read?{' '}
          <Link to="/scan" className="font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
            Open the scanner →
          </Link>
        </p>
      </section>

      {/* Features */}
      <section className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900/60"
          >
            <span className="icon-chip h-10 w-10 transition group-hover:scale-105">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
              </svg>
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-slate-900 dark:text-white">
              {f.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
