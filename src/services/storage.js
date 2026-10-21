// Safe localStorage read/write with JSON parse error handling.
// Malformed or missing data never crashes the app (Section F.5 rule 7).

export const STORAGE_KEYS = {
  session: (dayId) => `session_${dayId}`, // session_day1, session_day2
  trainingDates: 'training_dates',
  workoutHistory: 'workout_history',
  weeklyGoal: 'weekly_goal',
}

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw)
    if (parsed === null || parsed === undefined) return fallback
    return parsed
  } catch (error) {
    console.warn(
      `[storage] Could not read "${key}" — using fallback instead.`,
      error,
    )
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`[storage] Could not write "${key}".`, error)
    return false
  }
}

export function readNumber(key, fallback) {
  const value = readJSON(key, fallback)
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

export function removeKey(key) {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`[storage] Could not remove "${key}".`, error)
  }
}
