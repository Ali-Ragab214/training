import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'

/**
 * Shared layout shell: sticky header area, centered responsive main
 * content, and the fixed bottom navigation bar.
 */
export default function Layout() {
  return (
    <div className="min-h-dvh bg-cream text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary-dark focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl px-4 pt-6"
        style={{ paddingBottom: 'calc(5.5rem + var(--safe-area-bottom))' }}
      >
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
