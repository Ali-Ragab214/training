import { Clock, Home as HomeIcon, Gauge } from 'lucide-react'
import ProgressBar from '../ui/ProgressBar.jsx'

/**
 * Session header: workout name, metadata chips, progress bar, and the
 * "X/Y exercises completed" readout (Section E.4).
 */
export default function WorkoutHeader({
  name,
  day,
  level,
  estimatedMinutes,
  exercisesCompleted,
  exercisesTotal,
}) {
  return (
    <header className="space-y-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary-dark">
          {day}
        </p>
        <h1 className="mt-0.5 text-2xl font-extrabold leading-tight">{name}</h1>
      </div>

      <ul className="flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
        <li className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-soft">
          <Gauge size={14} aria-hidden="true" /> {level}
        </li>
        <li className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-soft">
          <Clock size={14} aria-hidden="true" /> ~{estimatedMinutes} min
        </li>
        <li className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-soft">
          <HomeIcon size={14} aria-hidden="true" /> Home
        </li>
      </ul>

      <div
        className="rounded-xl border border-line bg-surface p-4 shadow-soft"
        aria-live="polite"
      >
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-ink">Session progress</span>
          <span className="font-semibold text-ink-soft">
            {exercisesCompleted} / {exercisesTotal} exercises
          </span>
        </div>
        <ProgressBar
          ratio={exercisesTotal > 0 ? exercisesCompleted / exercisesTotal : 0}
          label="Workout session progress"
          height={10}
        />
      </div>
    </header>
  )
}
