const POSITIONS = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

const ARROWS = {
  top: 'left-1/2 top-full -translate-x-1/2 -translate-y-1/2',
  bottom: 'left-1/2 bottom-full -translate-x-1/2 translate-y-1/2',
  left: 'top-1/2 left-full -translate-x-1/2 -translate-y-1/2',
  right: 'top-1/2 right-full translate-x-1/2 -translate-y-1/2',
}

/**
 * Accessible, dependency-free tooltip. Shows on hover and keyboard focus
 * (via group-focus-within), animates in, and never blocks pointer events.
 */
export default function Tooltip({ label, side = 'top', className = '', children }) {
  return (
    <span className={`group/tt relative inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-40 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-150 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100 dark:bg-slate-700 ${POSITIONS[side]}`}
      >
        {label}
        <span
          aria-hidden
          className={`absolute h-2 w-2 rotate-45 bg-slate-900 dark:bg-slate-700 ${ARROWS[side]}`}
        />
      </span>
    </span>
  )
}
