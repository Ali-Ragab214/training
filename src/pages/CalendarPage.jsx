import { useState } from 'react'
import { CalendarDays, Info } from 'lucide-react'
import { useWorkoutHistory } from '../hooks/useWorkoutHistory.js'
import {
  getWeekDates,
  formatPrettyDate,
  formatShortDate,
  toISODate,
  todayISO,
} from '../utils/dateUtils.js'
import WeeklyCalendar from '../components/calendar/WeeklyCalendar.jsx'

export default function CalendarPage() {
  const { trainingDatesSet, toggleTrainingDate, history, weeklyGoal } =
    useWorkoutHistory()
  const [weekOffset, setWeekOffset] = useState(0)

  const weekDates = getWeekDates(new Date(), weekOffset)
  const completedThisWeek = weekDates.filter((d) =>
    trainingDatesSet.has(toISODate(d)),
  ).length

  const weekHistory = history.filter((entry) =>
    weekDates.some((d) => toISODate(d) === entry.date),
  )

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold leading-tight">Sara’s Activity 📅</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Celebrating every single day you show up for yourself. Building our happy, healthy future! 💕
        </p>
      </header>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setWeekOffset((w) => Math.max(w - 1, -52))}
          disabled={weekOffset <= -52}
          className="min-h-[44px] flex-1 rounded-full border-2 border-line-strong bg-white text-sm font-bold text-ink-soft transition-colors hover:border-primary-light disabled:opacity-40"
        >
          ← Earlier
        </button>
        {weekOffset !== 0 && (
          <button
            type="button"
            onClick={() => setWeekOffset(0)}
            className="min-h-[44px] flex-1 rounded-full border-2 border-primary bg-white text-sm font-bold text-primary-dark"
          >
            This week
          </button>
        )}
        <button
          type="button"
          onClick={() => setWeekOffset((w) => Math.min(w + 1, 52))}
          disabled={weekOffset >= 52}
          className="min-h-[44px] flex-1 rounded-full border-2 border-line-strong bg-white text-sm font-bold text-ink-soft transition-colors hover:border-primary-light disabled:opacity-40"
        >
          Later →
        </button>
      </div>

      <WeeklyCalendar
        trainingDatesSet={trainingDatesSet}
        onToggleDate={toggleTrainingDate}
      />

      <section
        aria-label={`Workouts for this week: ${completedThisWeek} of ${weeklyGoal}`}
        className="rounded-xl border border-line bg-surface p-4 shadow-soft"
      >
        <h2 className="font-bold">
          {completedThisWeek} completed workout
          {completedThisWeek === 1 ? '' : 's'} this week
          <span className="ml-1 text-sm font-semibold text-ink-soft">
            (goal: {weeklyGoal}/week)
          </span>
        </h2>

        {weekHistory.length ? (
          <ul className="mt-3 space-y-2">
            {weekHistory.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center gap-3 rounded-lg bg-cream-deep px-3 py-2.5"
              >
                <CalendarDays
                  size={16}
                  className="shrink-0 text-primary-dark"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {entry.workoutName}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {formatPrettyDate(entry.date)} · {entry.exercisesCompleted}/
                    {entry.exercisesTotal} exercises
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 flex items-start gap-2 rounded-lg bg-cream-deep px-3 py-2.5 text-sm text-ink-soft">
            <Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
            No logged workouts in this week. Finish a workout — or tap a past
            date on the calendar — and it will appear here.
          </p>
        )}
      </section>

      <p className="text-center text-xs text-ink-muted">
        {weekOffset === 0
          ? `Showing the current week. Today is ${formatShortDate(todayISO())}.`
          : `Showing ${weekDates[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${weekDates[6].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}.`}
      </p>
    </div>
  )
}
