import { Check, Circle } from 'lucide-react'
import ProgressBar from '../ui/ProgressBar.jsx'
import { toISODate } from '../../utils/dateUtils.js'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/**
 * Compact, mostly-informational 7-day strip for the dashboard
 * (Section E.4). Shows Mon–Sun of the given week, marks completed
 * training days, and reports "X of Y workouts completed".
 */
export default function WeekStrip({ weekDates, trainingDatesSet, weeklyGoal }) {
  const today = new Date().toDateString()
  const completedCount = weekDates.filter((d) =>
    trainingDatesSet.has(toISODate(d)),
  ).length

  return (
    <section
      aria-label="Weekly consistency"
      className="rounded-xl border border-line bg-surface p-4 shadow-soft"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
          This week
        </h2>
        <span className="text-sm font-bold text-ink">
          {completedCount} of {weeklyGoal}{' '}
          {weeklyGoal === 1 ? 'workout' : 'workouts'} done
        </span>
      </div>

      <ul className="flex items-stretch justify-between gap-1">
        {weekDates.map((date, i) => {
          const iso = toISODate(date)
          const isCompleted = trainingDatesSet.has(iso)
          const isToday = date.toDateString() === today
          return (
            <li
              key={iso}
              className={`relative flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-lg text-center ${
                isCompleted
                  ? 'bg-success-bg'
                  : isToday
                    ? 'bg-primary/10'
                    : 'bg-cream-deep'
              } ${isToday ? 'ring-2 ring-primary' : ''}`}
            >
              <span
                className={`text-[10px] font-semibold uppercase ${
                  isToday ? 'text-primary-dark' : 'text-ink-muted'
                }`}
              >
                {DAY_LABELS[i]}
              </span>
              <span
                className={`text-sm font-bold ${
                  isToday ? 'text-primary-dark' : 'text-ink-soft'
                }`}
                aria-hidden="true"
              >
                {date.getDate()}
              </span>
              {isCompleted ? (
                <Check
                  size={14}
                  className="text-success-dark"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              ) : (
                <Circle
                  size={12}
                  className="text-ink-muted/50"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">
                {DAY_LABELS[i]} {date.getDate()}:
                {isCompleted ? ' training completed' : isToday ? ' today' : ''}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-3">
        <ProgressBar
          value={completedCount}
          total={weeklyGoal}
          label="Weekly workout progress"
        />
      </div>
    </section>
  )
}
