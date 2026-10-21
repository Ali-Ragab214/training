import { NavLink } from 'react-router-dom'
import { CalendarDays, Dumbbell, House, TrendingUp } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/workout/day1', label: 'Workout', icon: Dumbbell, end: false },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, end: true },
  { to: '/progress', label: 'Progress', icon: TrendingUp, end: true },
]

const baseClass =
  'flex min-h-[56px] min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 text-[11px] font-medium transition-colors'

export default function BottomNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur"
      style={{ paddingBottom: 'var(--safe-area-bottom)' }}
    >
      <ul className="mx-auto flex w-full max-w-md items-stretch gap-1 px-3 py-1.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex flex-1">
            <NavLink
              to={to}
              end={end}
              aria-current={undefined}
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive
                    ? 'bg-primary/10 text-primary-dark'
                    : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
