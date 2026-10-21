import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { toISODate, todayISO } from '../../utils/dateUtils.js'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/**
 * Full interactive weekly calendar (Section E.4):
 * - Mon–Sun grid for the selected week (offset navigation).
 * - Today highlighted with a ring.
 * - Completed training days show a success check.
 * - Tapping a past or current date manually toggles completion.
 * - Future days are non-interactive.
 */
export default function WeeklyCalendar({
  trainingDatesSet,
  onToggleDate,
}) {
  const [weekOffset, setWeekOffset] = useState(0)
  const today = todayISO()

  const baseDate = new Date()
  const anchor = new Date(baseDate)
  anchor.setDate(anchor.getDate() + weekOffset * 7)
  const monday = new Date(anchor)
  const dow = monday.getDay() === 0 ? -6 : 1 - monday.getDay()
  monday.setDate(monday.getDate() + dow)

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })

  const weekLabel = `${monday.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })} – ${new Date(monday.getTime() + 6 * 86400000).toLocaleDateString(
    undefined,
    { month: 'short', day: 'numeric', year: 'numeric' },
  )}`

  const completedCount = days.filter((d) =>
    trainingDatesSet.has(toISODate(d)),
  ).length

  return (
    <section
      aria-label="Weekly training calendar"
      className="rounded-xl border border-line bg-surface p-4 shadow-soft"
    >
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setWeekOffset((w) => Math.max(w - 1, -52))}
          aria-label="Previous week"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-colors hover:border-primary-light hover:text-primary-dark"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <div className="text-center">
          <p className="text-sm font-bold text-ink">{weekLabel}</p>
          <p className="text-xs text-ink-soft">
            {completedCount} training{' '}
            {completedCount === 1 ? 'day' : 'days'} this week
          </p>
        </div>
        <button
          type="button"
          onClick={() => setWeekOffset((w) => Math.min(w + 1, 52))}
          aria-label="Next week"
          disabled={weekOffset >= 52}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-colors hover:border-primary-light hover:text-primary-dark disabled:opacity-40"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <ul className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((date, i) => {
          const iso = toISODate(date)
          const isCompleted = trainingDatesSet.has(iso)
          const isToday = iso === today
          const isPastOrToday = iso <= today
          const interactive = isPastOrToday

          const classes = isCompleted
            ? 'border-success bg-success-bg text-success-dark'
            : isToday
              ? 'ring-2 ring-primary border-transparent bg-primary/10 text-primary-dark'
              : isPastOrToday
                ? 'border-line bg-cream-deep text-ink-soft'
                : 'border-transparent text-ink-muted'

          return (
            <li key={iso} className="flex flex-col items-center">
              <span
                className={`mb-1 text-[10px] font-semibold uppercase text-ink-muted`}
                aria-hidden="true"
              >
                {DAY_LABELS[i]}
              </span>
              {interactive ? (
                <button
                  type="button"
                  onClick={() => onToggleDate(iso)}
                  aria-pressed={isCompleted}
                  aria-label={`${date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}. ${isCompleted ? 'Marked as training day. Tap to unmark.' : 'Tap to mark as training day.'}`}
                  className={`relative flex h-12 w-full flex-col items-center justify-center rounded-lg border font-bold text-sm transition-transform active:scale-95 ${classes}`}
                >
                  <span>{date.getDate()}</span>
                  <span className="h-3">
                    {isCompleted && (
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    )}
                  </span>
                </button>
              ) : (
                <div
                  className={`relative flex h-12 w-full flex-col items-center justify-center rounded-lg border font-bold text-sm ${classes}`}
                  aria-label={`${date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })} (future date)`}
                >
                  <span>{date.getDate()}</span>
                  <span className="h-3">
                    <Lock size={10} className="text-ink-muted/60" aria-hidden="true" />
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <p className="mt-3 text-center text-xs text-ink-soft">
        Tap a past or current date to manually mark or unmark a training day.
        Future days unlock as they come.
      </p>
    </section>
  )
}
