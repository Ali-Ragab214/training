import { TrendingUp } from 'lucide-react'
import { useWorkoutHistory } from '../hooks/useWorkoutHistory.js'
import { getWeekDates, toISODate } from '../utils/dateUtils.js'
import HistoryList from '../components/progress/HistoryList.jsx'
import WeeklyGoal from '../components/progress/WeeklyGoal.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'

export default function ProgressPage() {
  const {
    history,
    trainingDatesSet,
    weeklyGoal,
    setGoal,
    countCompletedInWeek,
  } = useWorkoutHistory()

  const thisWeek = countCompletedInWeek(new Date(), 0)
  const lastWeek = countCompletedInWeek(new Date(), -1)

  // Full 12-month-style view: goal hit rate for the last 6 weeks.
  const recentWeeks = Array.from({ length: 6 }, (_, i) => {
    const offset = -5 + i
    const dates = getWeekDates(new Date(), offset)
    const count = dates.filter((d) => trainingDatesSet.has(toISODate(d))).length
    return {
      offset,
      label: offset === 0 ? 'This wk' : offset === -1 ? 'Last wk' : `−${Math.abs(offset)} wk`,
      count,
      hit: count >= weeklyGoal,
    }
  })

  const totalTrainingDates = trainingDatesSet.size
  const totalHistory = history.length

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold leading-tight">Sara’s Progress 🌸</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Look at how amazing you are, my love! Every single session proves your strength. Progress, not perfection. 💕
        </p>
      </header>

      {/* Summary stats */}
      <section
        aria-label="Progress summary"
        className="grid grid-cols-3 gap-2.5 text-center"
      >
        <Stat label="Workouts done" value={totalHistory} />
        <Stat label="Training days" value={totalTrainingDates} />
        <Stat label="This week" value={`${thisWeek}/${weeklyGoal}`} />
      </section>

      {/* Weekly goal */}
      <WeeklyGoal weeklyGoal={weeklyGoal} onChange={setGoal} />

      {/* 6-week consistency */}
      <section
        aria-label="Recent weekly consistency"
        className="rounded-xl border border-line bg-surface p-4 shadow-soft"
      >
        <h2 className="font-bold">Weekly consistency</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Sessions counted per week over the past six weeks.
        </p>
        <ul className="mt-4 space-y-2.5">
          {recentWeeks.map((week, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-right text-xs font-semibold text-ink-soft">
                {week.label}
              </span>
              <div className="flex-1">
                <ProgressBar
                  ratio={weeklyGoal > 0 ? Math.min(1, week.count / weeklyGoal) : 0}
                  height={8}
                  label={`${week.label}: ${week.count} of ${weeklyGoal}`}
                />
              </div>
              <span
                className={`w-10 shrink-0 text-right text-xs font-bold ${
                  week.hit ? 'text-success-dark' : 'text-ink-soft'
                }`}
              >
                {week.count}/{weeklyGoal}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink-soft">
          Last week: {lastWeek} session{lastWeek === 1 ? '' : 's'} · this week so
          far: {thisWeek}.
        </p>
      </section>

      {/* Full history */}
      <section aria-label="Workout history">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            Workout history
          </h2>
          <TrendingUp size={16} className="text-primary-dark" aria-hidden="true" />
        </div>
        <HistoryList history={history} />
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3 shadow-soft">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </dt>
      <dd className="mt-0.5 text-xl font-extrabold text-ink">{value}</dd>
    </div>
  )
}
