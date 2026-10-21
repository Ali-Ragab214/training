import { CalendarDays, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrettyDate, timeAgo } from '../../utils/dateUtils.js'
import { getWorkoutDisplayName } from '../../utils/workoutUtils.js'
import EmptyState from '../ui/EmptyState.jsx'

/**
 * Chronological list of completed workout records with an empty state.
 */
export default function HistoryList({ history }) {
  if (!history.length) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No workouts completed yet"
        message="When you finish your first workout, it will show up here with the date, exercises, and sets completed."
      />
    )
  }

  return (
    <ul className="space-y-2.5">
      {history.map((entry) => (
        <li key={entry.id}>
          <Link
            to={`/workout/${entry.dayId}`}
            className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-soft transition-colors hover:border-primary-light"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success-bg text-success-dark">
              <CalendarDays size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold leading-snug">
                {entry.workoutName}
              </p>
              <p className="mt-0.5 text-xs text-ink-soft">
                {formatPrettyDate(entry.date)} ·{' '}
                {entry.exercisesCompleted}/{entry.exercisesTotal} exercises ·{' '}
                {entry.setsCompleted}/{entry.setsTotal} sets ·{' '}
                {timeAgo(entry.completedAt)}
              </p>
            </div>
            <span className="hidden shrink-0 rounded-full bg-cream-deep px-2.5 py-1 text-xs font-semibold text-ink-soft sm:inline">
              {getWorkoutDisplayName(entry.dayId)}
            </span>
            <ChevronRight
              size={18}
              className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary-dark"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
