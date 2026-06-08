import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <div className="app-bg relative flex min-h-screen flex-col">
      {/* Decorative brand glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl dark:bg-brand-600/20" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl dark:bg-accent-600/10" />
      </div>

      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
