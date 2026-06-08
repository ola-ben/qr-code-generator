import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text font-display text-7xl font-bold text-transparent">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-6 px-5 py-3">
        Back to home
      </Link>
    </div>
  )
}
