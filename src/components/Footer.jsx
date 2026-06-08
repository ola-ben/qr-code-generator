export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/50 dark:border-slate-800/70 dark:bg-slate-950/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} QR Studio. All rights reserved.</p>
        <p>
          Built by{' '}
          <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text font-semibold text-transparent">
            ben_dev
          </span>{' '}
          with React, Vite &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
