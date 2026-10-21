import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

/**
 * 404 / unknown-workout-day fallback.
 */
export default function NotFoundPage({ title, message }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
        <Compass size={26} aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-extrabold">
        {title ?? 'Page not found'}
      </h1>
      <p className="max-w-xs text-sm text-ink-soft">
        {message ?? 'The page you are looking for does not exist. Let’s get you back on track.'}
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary-dark px-6 text-base font-bold text-white transition-transform hover:bg-primary-pressed active:scale-[0.97]"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
