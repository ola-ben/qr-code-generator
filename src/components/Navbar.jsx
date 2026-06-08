import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import InstallButton from './InstallButton.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/generator', label: 'Generate' },
  { to: '/scan', label: 'Scan' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src="/qr.svg" alt="" className="h-8 w-8 transition group-hover:rotate-3" />
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            QR<span className="text-brand-600 dark:text-brand-400">Studio</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <InstallButton />
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile nav row */}
      <div className="flex items-center justify-center gap-1 border-t border-slate-200/70 px-4 py-2 sm:hidden dark:border-slate-800/70">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
