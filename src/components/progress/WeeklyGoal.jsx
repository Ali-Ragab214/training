import { Minus, Plus, Target } from 'lucide-react'

/**
 * Weekly goal display + configuration (Section E.4). Persisted in
 * localStorage by the parent hook.
 */
export default function WeeklyGoal({ weeklyGoal, onChange }) {
  return (
    <section
      aria-label="Weekly goal setting"
      className="rounded-xl border border-line bg-surface p-4 shadow-soft"
    >
      <div className="flex items-center gap-2">
        <Target size={18} className="text-primary-dark" aria-hidden="true" />
        <h2 className="font-bold">Weekly goal</h2>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        How many workouts would you like to aim for each week? Beginners often
        start with three.
      </p>

      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onChange(weeklyGoal - 1)}
          disabled={weeklyGoal <= 1}
          aria-label="Decrease weekly goal"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-line-strong text-ink transition-colors hover:border-primary-light disabled:opacity-40"
        >
          <Minus size={18} aria-hidden="true" />
        </button>

        <div className="flex min-w-[5rem] items-center justify-center gap-1">
          <span className="text-4xl font-extrabold text-ink" aria-live="polite">
            {weeklyGoal}
          </span>
          <span className="text-sm font-semibold text-ink-soft">
            / week
          </span>
        </div>

        <button
          type="button"
          onClick={() => onChange(weeklyGoal + 1)}
          disabled={weeklyGoal >= 7}
          aria-label="Increase weekly goal"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-line-strong text-ink transition-colors hover:border-primary-light disabled:opacity-40"
        >
          <Plus size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
