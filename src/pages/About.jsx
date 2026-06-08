export default function About() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        About QR Studio
      </h1>
      <p className="text-slate-600 dark:text-slate-400">
        QR Studio is a lightweight, open web application for generating <em>and</em> scanning QR
        codes. It was built with React, Vite, Tailwind CSS, and React Router as a clean, modern
        starting point for QR-based projects.
      </p>
      <p className="text-slate-600 dark:text-slate-400">
        All QR generation and scanning happens entirely in your browser. No content you enter is
        ever sent to a server, making it a private and secure way to create and read codes for
        URLs, contact details, Wi-Fi credentials, and more.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Created &amp; maintained by{' '}
          <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text font-semibold text-transparent">
            ben_dev
          </span>
          .
        </p>
      </div>
      <h2 className="pt-2 font-display text-xl font-bold text-slate-900 dark:text-white">Tech stack</h2>
      <ul className="list-inside list-disc space-y-1 text-slate-600 dark:text-slate-400">
        <li>React 18 + Vite for a fast development experience</li>
        <li>Tailwind CSS for utility-first styling with light &amp; dark themes</li>
        <li>React Router for client-side navigation</li>
        <li>qrcode.react for QR rendering and jsQR for camera scanning</li>
      </ul>
    </div>
  )
}
