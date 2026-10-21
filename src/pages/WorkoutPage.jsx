import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  Dumbbell,
  Flag,
  Heart,
  Play,
  Trash2,
  TriangleAlert,
} from 'lucide-react'
import { WORKOUTS, defaultRestDuration, getWorkout } from '../data/workouts.js'
import { useWorkoutSession } from '../hooks/useWorkoutSession.js'
import { useWorkoutHistory } from '../hooks/useWorkoutHistory.js'
import { useRestTimer } from '../hooks/useRestTimer.js'
import WorkoutHeader from '../components/workout/WorkoutHeader.jsx'
import ExerciseCard from '../components/workout/ExerciseCard.jsx'
import CompletionScreen from '../components/workout/CompletionScreen.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { formatPrettyDate } from '../utils/dateUtils.js'

export default function WorkoutPage() {
  const { dayId } = useParams()
  const workout = getWorkout(dayId)

  const sessionStore = useWorkoutSession(dayId)
  const {
    session,
    isActive,
    isComplete,
    allComplete,
    stats: { exercisesCompleted, exercisesTotal, setsCompleted, setsTotal },
    toggleSet,
    toggleDurationComplete,
    start,
    reset,
    finish,
  } = sessionStore

  const { recordWorkout } = useWorkoutHistory()

  // Session lookups for the OTHER day stay untouched — days are independent.

  const [timerExerciseId, setTimerExerciseId] = useState(null)
  const [finishedRecord, setFinishedRecord] = useState(null)
  const [confirmingDiscard, setConfirmingDiscard] = useState(false)

  const restTimer = useRestTimer(null)

  const handleToggleSet = useCallback(
    (exercise, setIndex) => {
      const wasCompleted = (session?.completedSets[exercise.id] ?? []).includes(
        setIndex,
      )
      toggleSet(exercise.id, setIndex, exercise.sets)
      // Auto-open the rest timer only when a set is NEWLY completed
      // (not on undo). There is exactly one timer slot (timerExerciseId),
      // so a second timer can never run simultaneously.
      if (!wasCompleted) {
        const duration = defaultRestDuration(exercise.restSeconds)
        if (duration != null) {
          setTimerExerciseId(exercise.id)
          restTimer.start(duration)
        }
      }
    },
    [session, toggleSet, restTimer],
  )

  const handleFinish = useCallback(() => {
    const record = finish()
    if (record) {
      recordWorkout(record)
      setFinishedRecord(record)
      setTimerExerciseId(null)
    }
  }, [finish, recordWorkout])

  const handleStartAgain = useCallback(() => {
    setFinishedRecord(null)
    start()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [start])

  if (!workout) {
    return <NotFoundPage message={`No workout found for "${dayId}".`} />
  }

  // -------------------------------- Completion view
  if (finishedRecord && !isActive) {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CompletionScreen record={finishedRecord} onStartAgain={handleStartAgain} />
        </motion.div>
        <p className="text-center">
          <Link
            to="/calendar"
            className="text-sm font-semibold text-primary-dark underline"
          >
            View your calendar
          </Link>
        </p>
      </div>
    )
  }

  // -------------------------------- No active session yet
  if (!session && !isComplete) {
    return (
      <div className="space-y-4">
        <BackLink />
        <WorkoutHeader
          name={workout.name}
          day={workout.day}
          level={workout.level}
          estimatedMinutes={workout.estimatedMinutes}
          exercisesCompleted={0}
          exercisesTotal={workout.exercises.length}
        />
        <section className="rounded-xl border border-line bg-surface p-4 shadow-soft">
          <h2 className="font-bold">About this session</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            {workout.objective} Equipment needed: {workout.equipment}.
          </p>
          <ul className="mt-2 space-y-1 text-sm text-ink-soft">
            {workout.targetMuscles.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <Dumbbell size={13} aria-hidden="true" /> {m}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary-dark">
            <Heart size={14} className="fill-primary shrink-0" />
            <span>You’ve got this, Sara! Ali is rooting for you every step 💕</span>
          </div>

          <button
            type="button"
            onClick={() => {
              start()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary-dark text-base font-bold text-white transition-transform hover:bg-primary-pressed active:scale-[0.97]"
          >
            <Play size={18} aria-hidden="true" /> Start Workout
          </button>
        </section>
        <DaySwitcher currentDayId={dayId} />
      </div>
    )
  }

  // -------------------------------- Finished previously (persisted)
  if (isComplete) {
    return (
      <div className="space-y-4">
        <BackLink />
        <WorkoutHeader
          name={workout.name}
          day={workout.day}
          level={workout.level}
          estimatedMinutes={workout.estimatedMinutes}
          exercisesCompleted={exercisesCompleted}
          exercisesTotal={exercisesTotal}
        />
        <section className="rounded-xl border border-success/50 bg-success-bg p-5 text-center shadow-soft">
          <h2 className="text-lg font-extrabold text-success-dark">
            {completedLabel()} logged ({exercisesCompleted}/{exercisesTotal}{' '}
            exercises) ✔
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {exercisesCompleted}/{exercisesTotal} exercises ·{' '}
            {setsCompleted}/{setsTotal} sets ·{' '}
            {session ? formatPrettyDate(sessionDate(session)) : ''}
          </p>
          <button
            type="button"
            onClick={() => {
              reset()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary-dark px-6 text-base font-bold text-white transition-transform hover:bg-primary-pressed active:scale-[0.97]"
          >
            <Play size={18} aria-hidden="true" /> Start New Workout
          </button>
        </section>
        <ExerciseList
          workout={workout}
          session={session}
          timerExerciseId={null}
          onToggleSet={() => {}}
          onToggleDuration={() => {}}
          restTimer={null}
          readOnly
        />

        <DaySwitcher currentDayId={dayId} />
      </div>
    )
  }

  // -------------------------------- Active session
  return (
    <div className="space-y-4">
      <BackLink />

      <WorkoutHeader
        name={workout.name}
        day={workout.day}
        level={workout.level}
        estimatedMinutes={workout.estimatedMinutes}
        exercisesCompleted={exercisesCompleted}
        exercisesTotal={exercisesTotal}
      />

      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary-dark">
        <Heart size={14} className="fill-primary text-primary shrink-0" />
        <span>Take your time and rest when needed, Sara — you are doing wonderful! 🌸</span>
      </div>

      <ExerciseList
        workout={workout}
        session={session}
        timerExerciseId={timerExerciseId}
        onToggleSet={handleToggleSet}
        onToggleDuration={toggleDurationComplete}
        restTimer={restTimer}
      />

      <FinishBar
        allComplete={allComplete}
        exercisesCompleted={exercisesCompleted}
        exercisesTotal={exercisesTotal}
        onFinish={handleFinish}
        onDiscard={() => setConfirmingDiscard(true)}
        confirmingDiscard={confirmingDiscard}
        onConfirmDiscard={() => {
          setConfirmingDiscard(false)
          reset()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        onCancelDiscard={() => setConfirmingDiscard(false)}
      />

      <DaySwitcher currentDayId={dayId} />
    </div>
  )
}

function completedLabel() {
  return 'Previous workout'
}

function sessionDate(session) {
  return session?.startedAt ?? new Date().toISOString()
}

function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"
    >
      <ArrowLeft size={16} aria-hidden="true" /> Back to dashboard
    </Link>
  )
}

function DaySwitcher({ currentDayId }) {
  return (
    <nav aria-label="Switch workout day" className="flex gap-2">
      {Object.entries(WORKOUTS).map(([id, def]) => (
        <Link
          key={id}
          to={`/workout/${id}`}
          aria-current={id === currentDayId ? 'page' : undefined}
          className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border-2 px-3 text-sm font-bold transition-colors ${
            id === currentDayId
              ? 'border-primary bg-primary/10 text-primary-dark'
              : 'border-line-strong bg-white text-ink-soft hover:border-primary-light'
          }`}
        >
          <Dumbbell size={15} aria-hidden="true" />
          {def.day}: {def.shortName}
        </Link>
      ))}
    </nav>
  )
}

function ExerciseList({
  workout,
  session,
  timerExerciseId,
  onToggleSet,
  onToggleDuration,
  restTimer,
  readOnly = false,
}) {
  return (
    <ol className="space-y-4">
      {workout.exercises.map((exercise) => {
        const completedSets = session?.completedSets[exercise.id] ?? []
        const isDurationBased =
          exercise.trackByDuration || exercise.sets == null
        const isComplete = isDurationBased
          ? (session?.completedExercises.includes(exercise.id) ?? false)
          : completedSets.length >= exercise.sets

        const showTimer =
          !readOnly && timerExerciseId === exercise.id && restTimer?.isActive

        return (
          <li key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              completedSets={completedSets}
              isComplete={isComplete}
              onToggleSet={
                readOnly
                  ? null
                  : (setIndex) => onToggleSet(exercise, setIndex)
              }
              onToggleDuration={readOnly ? null : () => onToggleDuration(exercise.id)}
              timerProps={
                showTimer
                  ? {
                      remaining: restTimer.remaining,
                      duration: restTimer.duration,
                      isRunning: restTimer.isRunning,
                      onPause: restTimer.pause,
                      onResume: restTimer.resume,
                      onReset: () => restTimer.start(restTimer.duration),
                      onSkip: restTimer.skip,
                    }
                  : null
              }
            />
          </li>
        )
      })}
    </ol>
  )
}

function FinishBar({
  allComplete,
  exercisesCompleted,
  exercisesTotal,
  onFinish,
  onDiscard,
  confirmingDiscard,
  onConfirmDiscard,
  onCancelDiscard,
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
      {confirmingDiscard ? (
        <div role="dialog" aria-label="Confirm discard" className="space-y-3">
          <p className="flex items-start gap-2 text-sm font-semibold text-ink">
            <TriangleAlert size={18} className="mt-0.5 shrink-0 text-warning" aria-hidden="true" />
            Discard this session? Your set progress for today will be erased —
            this cannot be undone.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirmDiscard}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-error text-sm font-bold text-white transition-transform active:scale-[0.97]"
            >
              <Trash2 size={15} aria-hidden="true" /> Yes, discard
            </button>
            <button
              type="button"
              onClick={onCancelDiscard}
              className="flex min-h-[44px] flex-1 items-center justify-center rounded-full border-2 border-line-strong text-sm font-bold text-ink"
            >
              Keep training
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onFinish}
            disabled={!allComplete}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-primary-dark text-base font-bold text-white transition-transform hover:bg-primary-pressed active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Flag size={17} aria-hidden="true" /> Finish Workout
          </button>
          <button
            type="button"
            onClick={onDiscard}
            aria-label="Discard workout progress"
            className="flex min-h-[48px] w-12 items-center justify-center rounded-full border-2 border-line-strong text-ink-soft transition-colors hover:border-error hover:text-error"
          >
            <Trash2 size={17} aria-hidden="true" />
          </button>
        </div>
      )}
      {!allComplete && (
        <p className="mt-2 text-center text-xs text-ink-soft">
          Finish unlocks when all {exercisesTotal} exercises are complete (
          {exercisesCompleted} so far). You can leave and resume anytime —
          progress is saved automatically.
        </p>
      )}
    </div>
  )
}
