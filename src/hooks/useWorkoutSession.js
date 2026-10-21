import { useCallback, useMemo } from 'react'
import { getWorkout } from '../data/workouts.js'
import { useLocalStorage } from './useLocalStorage.js'
import { STORAGE_KEYS } from '../services/storage.js'
import { todayISO, toISODate } from '../utils/dateUtils.js'
import { allExercisesComplete, computeSessionStats } from '../utils/workoutUtils.js'

function validateSession(stored) {
  return (
    stored &&
    typeof stored === 'object' &&
    typeof stored.startedAt === 'string' &&
    typeof stored.completedSets === 'object' &&
    stored.completedSets !== null &&
    Array.isArray(stored.completedExercises)
  )
}

/**
 * Per-day workout session state (persisted in localStorage under
 * `session_<dayId>`). Day 1 and Day 2 are fully independent.
 */
export function useWorkoutSession(dayId) {
  const workout = getWorkout(dayId)
  const key = STORAGE_KEYS.session(dayId)

  const [session, setSession] = useLocalStorage(key, null, validateSession)

  const isComplete = Boolean(session?.isComplete)
  const isActive = Boolean(session) && !isComplete

  const stats = useMemo(
    () => computeSessionStats(session, workout),
    [session, workout],
  )
  const allComplete = allExercisesComplete(session, workout)

  const start = useCallback(() => {
    setSession({
      dayId,
      startedAt: new Date().toISOString(),
      completedSets: {},
      completedExercises: [],
      isComplete: false,
      completedAt: null,
    })
  }, [dayId, setSession])

  const toggleSet = useCallback(
    (exerciseId, setIndex, totalSets) => {
      if (!session || session.isComplete) return
      setSession((prev) => {
        if (!prev) return prev
        const current = prev.completedSets[exerciseId] ?? []
        const has = current.includes(setIndex)
        const next = has
          ? current.filter((i) => i !== setIndex)
          : [...current, setIndex].filter((i) => i >= 0 && i < totalSets)
        return {
          ...prev,
          completedSets: { ...prev.completedSets, [exerciseId]: next },
        }
      })
    },
    [session, setSession],
  )

  const toggleDurationComplete = useCallback(
    (exerciseId) => {
      if (!session || session.isComplete) return
      setSession((prev) => {
        if (!prev) return prev
        const done = prev.completedExercises.includes(exerciseId)
        // Once marked complete, the exercise stays complete until it is
        // explicitly unmarked — supports undo for duration-based moves.
        const nextExercises = done
          ? prev.completedExercises.filter((id) => id !== exerciseId)
          : [...prev.completedExercises, exerciseId]
        return { ...prev, completedExercises: nextExercises }
      })
    },
    [session, setSession],
  )

  const reset = useCallback(() => {
    setSession(null)
  }, [setSession])

  /**
   * Finish the workout: mark the session complete and return the summary
   * record for the caller to persist into history. Only allowed when the
   * workout has actually been started.
   */
  const finish = useCallback(() => {
    if (!session || session.isComplete) return null
    const workoutDef = getWorkout(dayId)
    if (!workoutDef) return null
    const statsAtFinish = computeSessionStats(session, workoutDef)
    const completedAt = new Date().toISOString()
    setSession({ ...session, isComplete: true, completedAt })
    return {
      id: `session_${Date.now()}`,
      dayId,
      workoutName: workout.name,
      // A session is associated with the date it was STARTED (Section F.5 rule 2).
      date: session?.startedAt ? toISODate(new Date(session.startedAt)) : todayISO(),
      completedAt,
      exercisesCompleted: statsAtFinish.exercisesCompleted,
      exercisesTotal: statsAtFinish.exercisesTotal,
      setsCompleted: statsAtFinish.setsCompleted,
      setsTotal: statsAtFinish.setsTotal,
    }
  }, [dayId, session, setSession, workout.name])

  return {
    session,
    isComplete,
    isActive,
    allComplete,
    stats,
    start,
    toggleSet,
    toggleDurationComplete,
    reset,
    finish,
  }
}
