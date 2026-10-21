import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Heart, Home as HomeIcon, Sparkles } from 'lucide-react'
import { WORKOUTS } from '../data/workouts.js'
import { useWorkoutSession } from '../hooks/useWorkoutSession.js'
import { useWorkoutHistory } from '../hooks/useWorkoutHistory.js'
import { getWeekDates, formatTodayGreeting } from '../utils/dateUtils.js'
import WeekStrip from '../components/calendar/WeekStrip.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'

const MOTIVATION = [
  'Every time you show up for yourself, I fall in love with you all over again. So proud of you, my Sara! 💕',
  'Take your time and breathe, my love. You are capable of amazing things, today and always! 🌸',
  'Working hard for your health and happiness — you inspire me every single day, beautiful. ✨',
  'Drink some water, take it at your own pace, and remember you have my whole heart cheering for you! 💖',
  'You look stunning whether you’re relaxing or crushing a workout. Keep shining, Sara! 🌹',
  'Building a long, healthy, and happy life together starts with days like today. I love you endlessly! 💍',
  'You don’t have to be perfect, Sara — just being you is already everything to me. ❤️',
  'Sending you a warm hug and all my love for today’s session. You’ve got this, gorgeous! 🥰',
]

export default function DashboardPage() {
  const { trainingDatesSet, weeklyGoal } = useWorkoutHistory()
  const day1 = useWorkoutSession('day1')
  const day2 = useWorkoutSession('day2')
  const sessions = { day1, day2 }
  const [showLoveLetter, setShowLoveLetter] = useState(false)

  const weekDates = getWeekDates(new Date(), 0)
  const message = MOTIVATION[new Date().getDate() % MOTIVATION.length]

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink-soft">
            {formatTodayGreeting()}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight">
            Hi, my beautiful Sara 💖
          </h1>
          <p className="mt-0.5 text-xs font-semibold text-primary-dark">
            Forever your biggest cheerleader ✨
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowLoveLetter((prev) => !prev)}
          title="A surprise note from Ali"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white shadow-card transition-transform hover:scale-105 active:scale-95"
          aria-label="Read a surprise note from Ali"
        >
          <Heart size={22} className="fill-white" />
        </button>
      </header>

      {/* Special letter toggle card */}
      <section className="rounded-2xl border border-primary/30 bg-gradient-to-br from-cream via-white to-primary/10 p-4 shadow-soft">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary-dark">
              <Sparkles size={16} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-ink">A note from Ali 💌</h2>
              <p className="text-xs text-ink-soft">Just for you, my love</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowLoveLetter((prev) => !prev)}
            className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary-dark transition-colors hover:bg-primary/25"
          >
            {showLoveLetter ? 'Close note' : 'Open note 💖'}
          </button>
        </div>

        {showLoveLetter && (
          <div className="mt-3.5 border-t border-primary/20 pt-3 text-sm leading-relaxed text-ink">
            <p className="italic">
              &ldquo;Sara, I made this app especially for you with all my love. Your smile, your health, and your happiness mean the entire world to me. Take each workout at your own pace — no pressure, just progress. I will always be by your side, supporting your goals and loving you more every single day. Always yours,&rdquo;
            </p>
            <p className="mt-2 text-right font-extrabold text-primary-dark">
              — Ali ❤️
            </p>
          </div>
        )}
      </section>

      <WeekStrip
        weekDates={weekDates}
        trainingDatesSet={trainingDatesSet}
        weeklyGoal={weeklyGoal}
      />

      <section aria-label="Your workouts" className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
          Your workouts
        </h2>
        {Object.values(WORKOUTS).map((workout) => {
          const {
            stats: { exercisesCompleted, exercisesTotal },
            isActive,
            isComplete,
          } = sessions[workout.id]
          const started = isActive || isComplete
          const ratio = exercisesTotal > 0 ? exercisesCompleted / exercisesTotal : 0

          return (
            <article
              key={workout.id}
              className="rounded-xl border border-line bg-surface p-4 shadow-soft"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-extrabold leading-snug">
                  {workout.shortName}
                </h3>
                <span className="shrink-0 rounded-full bg-cream-deep px-2.5 py-1 text-xs font-bold text-ink-soft">
                  {workout.day}
                </span>
              </div>

              <ul className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
                <li className="rounded-full bg-cream-deep px-2.5 py-1">
                  {workout.level}
                </li>
                <li className="inline-flex items-center gap-1 rounded-full bg-cream-deep px-2.5 py-1">
                  <HomeIcon size={12} aria-hidden="true" /> {workout.location}
                </li>
                <li className="inline-flex items-center gap-1 rounded-full bg-cream-deep px-2.5 py-1">
                  <Clock size={12} aria-hidden="true" /> ~{workout.estimatedMinutes}{' '}
                  min
                </li>
                <li className="rounded-full bg-cream-deep px-2.5 py-1">
                  {workout.exercises.length} exercises
                </li>
              </ul>

              <p className="mt-2 text-sm text-ink-muted">
                {workout.targetMuscles.join(' · ')}
              </p>

              {started && ratio > 0 && (
                <p className="mt-3 text-xs font-semibold text-ink-soft">
                  {isComplete
                    ? 'Last session complete ✔'
                    : `${exercisesCompleted} of ${exercisesTotal} exercises done`}
                </p>
              )}
              {isActive && (
                <div className="mt-2">
                  <ProgressBar
                    ratio={ratio}
                    label={`${workout.shortName} progress`}
                    height={8}
                  />
                </div>
              )}

              <Link
                to={`/workout/${workout.id}`}
              className={`mt-3 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary-dark text-base font-bold text-white transition-transform hover:bg-primary-pressed active:scale-[0.97]`}
              >
                {isActive ? 'Continue Workout' : 'Start Workout'}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </article>
          )
        })}
      </section>

      <section
        aria-label="Daily love and motivation"
        className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-secondary/15 to-primary/5 p-4 shadow-soft"
      >
        <Heart size={22} className="mt-0.5 shrink-0 fill-primary text-primary-dark" aria-hidden="true" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary-dark">
            Today’s love & motivation for Sara ✨
          </p>
          <p className="mt-1 text-sm font-medium leading-relaxed text-ink">{message}</p>
        </div>
      </section>

      <footer className="pt-1 text-center text-xs text-ink-muted">
        <p className="font-semibold text-primary-dark">Made with infinite love for Sara 💖</p>
        <p className="mt-0.5 text-[11px] text-ink-soft">
          Take care of yourself today — you deserve the very best.
        </p>
      </footer>
    </div>
  )
}
