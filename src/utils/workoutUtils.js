import { getWorkout } from '../data/workouts.js'

/**
 * Compute session stats against a workout definition.
 * Unknown exercise IDs in the session are ignored (Section F.5 rule 9).
 */
export function computeSessionStats(session, workout) {
  if (!session || !workout) {
    return { exercisesCompleted: 0, exercisesTotal: 0, setsCompleted: 0, setsTotal: 0 }
  }

  let exercisesCompleted = 0
  let exercisesTotal = 0
  let setsCompleted = 0
  let setsTotal = 0

  for (const exercise of workout.exercises) {
    exercisesTotal += 1
    if (exercise.trackByDuration || exercise.sets == null) {
      // Duration-based: complete via the completedExercises list.
      if (session.completedExercises?.includes(exercise.id)) {
        exercisesCompleted += 1
      }
      continue
    }
    const completedSets = session.completedSets[exercise.id] ?? []
    setsTotal += exercise.sets
    setsCompleted += completedSets.length
    if (completedSets.length >= exercise.sets) {
      exercisesCompleted += 1
    }
  }

  return { exercisesCompleted, exercisesTotal, setsCompleted, setsTotal }
}

/** Total number of sets in a workout (duration-based exercises excluded). */
export function countWorkoutSets(workout) {
  return workout.exercises.reduce(
    (total, ex) => total + (ex.sets ?? 0),
    0,
  )
}

export function isExerciseComplete(session, exercise) {
  if (!session) return false
  if (exercise.trackByDuration || exercise.sets == null) {
    return session.completedExercises?.includes(exercise.id) ?? false
  }
  const completed = session.completedSets[exercise.id] ?? []
  return completed.length >= exercise.sets
}

export function allExercisesComplete(session, workout) {
  if (!session || !workout) return false
  return workout.exercises.every((ex) => isExerciseComplete(session, ex))
}

/** Distinct count of training dates within an array of ISO dates (Mon–Sun week dates). */
export function countTrainingDatesInWeek(dates, trainingDatesSet) {
  return dates.filter((iso) => trainingDatesSet.has(iso)).length
}

export function getHistoryForDay(history, iso) {
  return history.filter((entry) => entry.date === iso)
}

export function getWorkoutDisplayName(dayId) {
  return getWorkout(dayId)?.shortName ?? dayId
}
