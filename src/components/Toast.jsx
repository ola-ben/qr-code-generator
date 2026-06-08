const STYLES = {
  success: 'bg-emerald-600 border-emerald-400/40',
  error: 'bg-rose-600 border-rose-400/40',
  info: 'bg-brand-600 border-brand-400/40',
}

const ICONS = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 18L18 6M6 6l12 12',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

/**
 * Fixed-position toast notification. Renders nothing when `toast` is null.
 */
export default function Toast({ toast }) {
  if (!toast) return null
  const style = STYLES[toast.type] ?? STYLES.info

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <div
        className={`pointer-events-auto flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium text-white shadow-lg ${style} animate-[fadeIn_0.2s_ease-out]`}
      >
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[toast.type] ?? ICONS.info} />
        </svg>
        {toast.message}
      </div>
    </div>
  )
}
