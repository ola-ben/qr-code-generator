import { useState } from 'react'
import useInstallPrompt from '../hooks/useInstallPrompt.js'
import Tooltip from './Tooltip.jsx'

export default function InstallButton() {
  const { canInstall, isIos, promptInstall } = useInstallPrompt()
  const [showIosHelp, setShowIosHelp] = useState(false)

  if (!canInstall) return null

  const handleClick = () => {
    if (isIos) setShowIosHelp((s) => !s)
    else promptInstall()
  }

  return (
    <div className="relative">
      <Tooltip label="Install QR Studio as an app" side="bottom">
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100 active:scale-95 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span className="hidden sm:inline">Install</span>
        </button>
      </Tooltip>

      {showIosHelp && (
        <div className="absolute right-0 top-full z-40 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          On iPhone/iPad: tap the <span className="font-semibold">Share</span> button, then choose{' '}
          <span className="font-semibold">“Add to Home Screen.”</span>
        </div>
      )}
    </div>
  )
}
