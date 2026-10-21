import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import { STORAGE_KEYS } from '../services/storage.js'
import {
  isValidISODate,
  startOfWeek,
  toISODate,
  todayISO,
} from '../utils/dateUtils.js'

const DEFAULT_GOAL = 3

function isTrainingDateArray(stored) {
  return (
    Array.isArray(stored) &&
    stored.every((d) => typeof d === 'string' && isValidISODate(d))
  )
}

function isHistoryArray(stored) {
  return (
    Array.isArray(stored) &&
    stored.every(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        typeof entry.id === 'string' &&
        typeof entry.dayId === 'string' &&
        typeof entry.date === 'string',
    )
  )
}

/**
 * Shared persistence for training dates, workout history, and the weekly goal.
 * Every page reads the same localStorage keys, so cross-page state stays
 * consistent without a global state library.
 */
export function useWorkoutHistory() {
  const [trainingDates, setTrainingDates, resetTrainingDates] =
    useLocalStorage(STORAGE_KEYS.trainingDates, [], isTrainingDateArray)
  const [history, setHistory, resetHistory] = useLocalStorage(
    STORAGE_KEYS.workoutHistory,
    [],
    isHistoryArray,
  )
  const [weeklyGoal, setWeeklyGoal, resetGoal] = useLocalStorage(
    STORAGE_KEYS.weeklyGoal,
    DEFAULT_GOAL,
    (v) => Number.isFinite(Number(v)) && Number(v) >= 1 && Number(v) <= 7,
  )

  /** Dedup on read so a date is never double-counted (Section F.5 rule 8). */
  const uniqueDates = useMemo(() => [...new Set(trainingDates)], [trainingDates])

  const trainingDatesSet = useMemo(
    () => new Set(uniqueDates),
    [uniqueDates],
  )

  /** Add a training date (idempotent — sets deduplicate). */
  const addTrainingDate = useCallback(
    (iso) => {
      if (!isValidISODate(iso)) return
      setTrainingDates((prev) =>
        prev.includes(iso) ? prev : [...prev, iso].sort(),
      )
    },
    [setTrainingDates],
  )

  /** Remove a training date (calendar undo / manual unmark). */
  const removeTrainingDate = useCallback(
    (iso) => {
      setTrainingDates((prev) => prev.filter((d) => d !== iso))
    },
    [setTrainingDates],
  )

  /** Toggle manual marking on the calendar (prevents removing future dates). */
  const toggleTrainingDate = useCallback(
    (iso) => {
      if (!isValidISODate(iso)) return false
      if (iso > todayISO()) return false // future days are non-interactive
      setTrainingDates((prev) =>
        prev.includes(iso) ? prev.filter((d) => d !== iso) : [...prev, iso].sort(),
      )
      return true
    },
    [setTrainingDates],
  )

  /** Record a completed workout: history entry first, then the date. */
  const recordWorkout = useCallback(
    (record) => {
      if (!record) return false
      setHistory((prev) => [record, ...prev])
      // Use the START date of the session, matching Section F.5 rule 2.
      addTrainingDate(record.date)
      return true
    },
    [setHistory, addTrainingDate],
  )

  const clearTrainingDate = useCallback(
    (iso) => removeTrainingDate(iso),
    [removeTrainingDate],
  )

  /** Count of distinct training dates in the week containing `referenceDate`. */
  const countCompletedInWeek = useCallback(
    (referenceDate, weekOffset = 0) => {
      const start = startOfWeek(referenceDate)
      start.setDate(start.getDate() + weekOffset * 7)
      let count = 0
      for (let i = 0; i < 7; i += 1) {
        const d = new Date(start)
        d.setDate(start.getDate() + i)
        if (trainingDatesSet.has(toISODate(d))) count += 1
      }
      return count
    },
    [trainingDatesSet],
  )

  const goal = useMemo(() => {
    const n = Number(weeklyGoal)
    return Number.isFinite(n) && n >= 1 && n <= 7 ? n : DEFAULT_GOAL
  }, [weeklyGoal])

  const setGoal = useCallback(
    (value) => {
      const n = Number(value)
      if (Number.isFinite(n) && n >= 1 && n <= 7) setWeeklyGoal(Math.round(n))
    },
    [setWeeklyGoal],
  )

  return {
    trainingDates: uniqueDates,
    trainingDatesSet,
    history,
    recordWorkout,
    addTrainingDate,
    removeTrainingDate,
    toggleTrainingDate,
    clearTrainingDate,
    countCompletedInWeek,
    weeklyGoal: goal,
    setGoal,
    resetAll: () => {
      resetTrainingDates()
      resetHistory()
      resetGoal()
    },
  }
}
