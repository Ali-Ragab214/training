// ============================================================
// Canonical workout definitions (IMPLEMENTATION_PLAN.md Section D)
// IDs are stable and must never change (Section F.5 rule 1).
// ============================================================

export const SAFETY_NOTES = [
  'In the first two weeks, the goal is to learn technique — do not train to muscular failure.',
  'Light warm-up sets do not count toward the main exercise sets.',
  'If the repetitions feel easy with proper form, gradually increase reps before adding any resistance.',
  'Stop immediately at sharp pain, especially in the knee or lower back.',
  'An expected session takes approximately 30–40 minutes.',
  'This is general fitness guidance, not individualized medical advice.',
  'No spot fat reduction or guaranteed muscle-growth results are promised — consistency and technique come first.',
]

const day1Exercises = [
  {
    id: 'd1-warmup',
    name: 'Warm-up & Dynamic Mobility',
    order: 1,
    category: 'Warm-up',
    trackByDuration: true,
    targetMuscles: ['Full body (hips, knees, ankles)'],
    secondaryMuscles: [],
    equipment: 'None',
    sets: null,
    reps: null,
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: null,
    durationLabel: '5–7 minutes total',
    instructions: [
      'March in place — 60 seconds.',
      'Arm circles — 30 seconds.',
      'Hip circles — 30 seconds.',
      'Supported leg swings — 10 reps per leg (hold a wall).',
      'Easy bodyweight squats — 8 reps.',
    ],
    commonMistakes: [
      'Using aggressive static stretching before the workout',
      'Rushing through the movements',
    ],
    easierVariation: 'Reduce range of motion on all movements',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'beginner woman dynamic warm up mobility routine at home marching arm circles',
    animationDescription:
      'Show marching in place, gentle arm circles, hip circles, and supported leg swings with controlled movement',
    alt: 'Warm-up and dynamic mobility — front view showing marching, arm circles, and supported leg swings.',
  },
  {
    id: 'd1-bodyweight-squat',
    name: 'Bodyweight Squat',
    order: 2,
    category: 'Compound',
    trackByDuration: false,
    targetMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: 'None; chair may be used as a depth target',
    sets: 2,
    reps: '10–12',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [60, 90],
    durationLabel: null,
    instructions: [
      'Stand with feet approximately shoulder-width apart.',
      'Brace the core and push the hips backward while bending the knees.',
      'Lower to a comfortable depth while keeping the feet grounded.',
      'Keep the knees aligned with the toes.',
      'Push through the feet to return to standing.',
    ],
    commonMistakes: [
      'Knees collapsing inward',
      'Heels lifting',
      'Losing balance',
      'Descending beyond a comfortable range',
    ],
    easierVariation: 'Chair Squat',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'beginner woman bodyweight squat correct form side view home fitness',
    animationDescription:
      'Show standing position, hip hinge and knee bend descent to comfortable depth, then push back up to standing. Side view preferred showing alignment.',
    alt: 'Bodyweight squat — side view showing hips back, knees aligned with toes, feet grounded.',
  },
  {
    id: 'd1-glute-bridge',
    name: 'Glute Bridge',
    order: 3,
    category: 'Glute-focused strength',
    trackByDuration: false,
    targetMuscles: ['Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core'],
    equipment: 'Exercise mat (optional)',
    sets: 3,
    reps: '12–15',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [60, 60],
    durationLabel: null,
    instructions: [
      'Lie on the back with knees bent and feet flat on the floor.',
      'Keep arms relaxed beside the body.',
      'Brace the core and lift the hips by contracting the glutes.',
      'Stop when the torso and thighs form an approximately straight line.',
      'Squeeze the glutes briefly at the top.',
      'Lower the hips slowly with control.',
    ],
    commonMistakes: [
      'Excessively arching the lower back',
      'Pushing through the neck',
      'Lifting the hips too high',
    ],
    easierVariation: 'Short-range Glute Bridge',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman glute bridge exercise lying on back hips raised correct form home workout',
    animationDescription:
      'Show person lying on back with knees bent, lifting hips up to form a straight line from shoulders to knees, then lowering with control.',
    alt: 'Glute bridge — side view lying on back with hips lifted to a straight line from shoulders to knees.',
  },
  {
    id: 'd1-donkey-kicks',
    name: 'Donkey Kicks',
    order: 4,
    category: 'Unilateral glute exercise',
    trackByDuration: false,
    targetMuscles: ['Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: 'Exercise mat (optional)',
    sets: 2,
    reps: '10–12 per leg',
    repsPerSide: true,
    perSideLabel: 'per leg',
    restSeconds: [45, 60],
    durationLabel: null,
    restPerSideNote: 'Rest 45–60 seconds after completing both legs.',
    instructions: [
      'Start on all fours with hands under shoulders and knees under hips.',
      'Keep the core engaged and the spine neutral.',
      'Keep one knee bent and lift that leg backward and upward.',
      'Stop before the lower back starts arching or the pelvis rotates.',
      'Lower the knee slowly and repeat.',
      'Complete all repetitions on one leg, then switch sides.',
    ],
    commonMistakes: [
      'Rotating the pelvis',
      'Swinging the leg',
      'Arching the lower back',
    ],
    easierVariation: 'Smaller range of motion',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman donkey kicks exercise all fours position glute exercise home workout',
    animationDescription:
      'Show quadruped position (hands and knees), lifting one bent leg backward and upward while keeping spine neutral, then lowering slowly.',
    alt: 'Donkey kicks — three-quarter view on all fours with one bent leg lifted backward, spine neutral.',
  },
  {
    id: 'd1-reverse-lunge',
    name: 'Supported Reverse Lunge',
    order: 5,
    category: 'Unilateral compound',
    trackByDuration: false,
    targetMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: 'Stable chair or wall for balance',
    sets: 2,
    reps: '8 per leg',
    repsPerSide: true,
    perSideLabel: 'per leg',
    restSeconds: [60, 90],
    durationLabel: null,
    instructions: [
      'Stand upright and hold a stable support if needed.',
      'Step one foot backward.',
      'Bend both knees slightly and lower only as far as comfortable.',
      'Keep the front foot flat and the front knee aligned with the toes.',
      'Push through the front foot to return to standing.',
      'Alternate legs or complete one side before switching.',
    ],
    commonMistakes: [
      'Losing balance',
      'Taking an excessively long step',
      'Forcing a deep range of motion',
    ],
    easierVariation: 'Supported Split Squat with a short range of motion',
    safetyNote:
      'If the beginner cannot perform this comfortably, replace with Chair Squats.',
    importantNote: null,
    imageSearchQuery:
      'woman supported reverse lunge exercise holding wall for balance home workout',
    animationDescription:
      'Show standing upright with wall support, stepping one foot back and lowering, then returning to standing. Side/three-quarter view.',
    alt: 'Supported reverse lunge — side view holding a wall with one foot stepped back and knees slightly bent.',
  },
  {
    id: 'd1-calf-raises',
    name: 'Standing Calf Raises',
    order: 6,
    category: 'Isolation',
    trackByDuration: false,
    targetMuscles: ['Gastrocnemius', 'Soleus (Calves)'],
    secondaryMuscles: [],
    equipment: 'Stable chair or wall for balance',
    sets: 2,
    reps: '12–15',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [45, 60],
    durationLabel: null,
    instructions: [
      'Stand upright with feet approximately hip-width apart.',
      'Hold the support lightly.',
      'Raise both heels slowly while keeping the body upright.',
      'Pause briefly at the top.',
      'Lower the heels slowly and under control.',
    ],
    commonMistakes: [
      'Bouncing',
      'Rushing repetitions',
      'Leaning heavily on the support',
    ],
    easierVariation: 'Smaller range of motion',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman standing calf raises exercise holding wall support home workout',
    animationDescription:
      'Show standing position near wall, rising onto toes slowly, pausing at top, then lowering heels with control.',
    alt: 'Standing calf raises — side view rising onto the toes with heels elevated near a wall.',
  },
  {
    id: 'd1-dead-bug',
    name: 'Dead Bug',
    order: 7,
    category: 'Core stability',
    trackByDuration: false,
    targetMuscles: ['Abdominals', 'Deep core muscles'],
    secondaryMuscles: ['Hip flexors'],
    equipment: 'Exercise mat (optional)',
    sets: 2,
    reps: '8–10 per side',
    repsPerSide: true,
    perSideLabel: 'per side',
    restSeconds: [45, 60],
    durationLabel: null,
    perSideNote: 'Alternate opposite arm and leg; both sides must be trained.',
    instructions: [
      'Lie on the back with arms extended toward the ceiling.',
      'Raise the legs with hips and knees bent approximately 90 degrees.',
      'Gently brace the abdominal muscles.',
      'Slowly extend one arm and the opposite leg.',
      'Return to the starting position and alternate sides.',
      'Maintain a stable lower back throughout the movement.',
    ],
    commonMistakes: [
      'Arching the lower back',
      'Moving too quickly',
      'Extending limbs beyond available control',
    ],
    easierVariation:
      'Move one heel at a time while keeping the other foot supported',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman dead bug exercise lying on back extending opposite arm and leg core stability',
    animationDescription:
      'Show supine position with arms up and knees at 90°, extending opposite arm and leg, then returning. Low angle or side view showing the back remaining flat.',
    alt: 'Dead bug — side view lying on back with opposite arm and leg extended, lower back flat.',
  },
  {
    id: 'd1-cooldown',
    name: 'Cool-down & Gentle Stretching',
    order: 8,
    category: 'Cool-down',
    trackByDuration: true,
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes (stretching)'],
    secondaryMuscles: [],
    equipment: 'None',
    sets: null,
    reps: null,
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: null,
    durationLabel: '3–5 minutes total',
    instructions: [
      'Slow marching or walking in place.',
      'Gentle quadriceps stretch.',
      'Gentle hamstring stretch.',
      'Gentle glute stretch.',
      'Hold each stretch 15–25 seconds without bouncing.',
    ],
    commonMistakes: [
      'Bouncing in stretches',
      'Forcing beyond comfort',
      'Continuing through pain',
    ],
    easierVariation: 'Reduce hold time; use wall for support',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman gentle cool down stretching quadriceps hamstring glute stretch at home',
    animationDescription:
      'Show slow walking in place, followed by gentle standing or seated stretches held with relaxed breathing.',
    alt: 'Cool-down stretching — front view of gentle, relaxed lower-body stretches.',
  },
]

const day2Exercises = [
  {
    id: 'd2-warmup',
    name: 'Warm-up & Upper-Body Mobility',
    order: 1,
    category: 'Warm-up',
    trackByDuration: true,
    targetMuscles: ['Shoulders', 'Upper back', 'Chest'],
    secondaryMuscles: [],
    equipment: 'None',
    sets: null,
    reps: null,
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: null,
    durationLabel: '5–6 minutes total',
    instructions: [
      'March in place — 60 seconds.',
      'Arm circles — 30 seconds forward, 30 seconds backward.',
      'Shoulder rolls — 30 seconds.',
      'Gentle torso rotations — 30 seconds.',
      'Wall slides — 8–10 reps.',
      'Easy wall push-ups — 8 reps.',
    ],
    commonMistakes: [
      'Aggressive stretching',
      'Forcing shoulders into uncomfortable positions',
    ],
    easierVariation: 'Reduce range of motion on all movements',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'beginner woman performing upper body warm up arm circles and shoulder mobility at home',
    animationDescription:
      'Show gentle arm circles, shoulder rolls, and wall slides with controlled movements',
    alt: 'Upper-body warm-up — front view showing arm circles and shoulder rolls.',
  },
  {
    id: 'd2-wall-pushups',
    name: 'Wall Push-ups',
    order: 2,
    category: 'Chest / Compound',
    trackByDuration: false,
    targetMuscles: ['Chest'],
    secondaryMuscles: ['Triceps', 'Anterior shoulders'],
    equipment: 'Wall',
    sets: 2,
    reps: '8–12',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [60, 90],
    durationLabel: null,
    instructions: [
      "Stand facing a wall, approximately an arm's length away. Place both palms against the wall at chest height, slightly wider than shoulder-width.",
      'Keep the body aligned from head to heels.',
      'Bend the elbows and bring the chest toward the wall.',
      'Keep the elbows at a comfortable angle rather than flaring them excessively.',
      'Push through the palms to return to the starting position.',
    ],
    commonMistakes: [
      'Arching the lower back',
      'Moving only the head toward the wall',
      'Performing reps too quickly',
      'Shoulders shrugging toward ears',
    ],
    easierVariation: 'Stand closer to the wall',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman beginner wall push up exercise correct form side view home fitness',
    animationDescription:
      'Show the woman leaning toward the wall with elbows bending, then pushing away to the starting position. Display both starting and ending positions.',
    alt: 'Wall push-ups — side view leaning toward a wall with hands at chest height, body aligned.',
  },
  {
    id: 'd2-prone-w-raises',
    name: 'Prone W Raises',
    order: 3,
    category: 'Back / Upper-Back Stability',
    trackByDuration: false,
    targetMuscles: ['Mid-back', 'Scapular stabilizers'],
    secondaryMuscles: ['Rear shoulders'],
    equipment: 'Exercise mat (optional)',
    sets: 2,
    reps: '8–12',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [45, 60],
    durationLabel: null,
    instructions: [
      'Lie face down on a comfortable surface. Bend elbows so arms form a W shape beside the head, thumbs pointing upward when comfortable.',
      'Keep the neck neutral and look toward the floor.',
      'Gently draw the shoulder blades together.',
      'Lift the hands and elbows slightly off the floor without forcing the movement.',
      'Hold for approximately one second.',
      'Lower the arms slowly.',
    ],
    commonMistakes: [
      'Lifting the chest excessively',
      'Overarching lower back',
      'Shrugging shoulders',
      'Forcing arms higher than comfortable',
    ],
    easierVariation:
      'Perform without lifting arms off floor; focus on squeezing shoulder blades together',
    safetyNote: null,
    importantNote:
      'This is an upper-back stability exercise, not a substitute for a loaded rowing movement.',
    imageSearchQuery:
      'woman prone W raise exercise lying face down elbows bent upper back strengthening correct form',
    animationDescription:
      'Show a woman lying face down, moving her arms into a W shape and gently lifting them while keeping the torso stable',
    alt: 'Prone W raises — overhead view lying face down with arms in a W shape gently lifted.',
  },
  {
    id: 'd2-reverse-snow-angels',
    name: 'Prone Reverse Snow Angels',
    order: 4,
    category: 'Back / Rear Shoulders',
    trackByDuration: false,
    targetMuscles: ['Rear shoulders', 'Upper-back muscles'],
    secondaryMuscles: ['Scapular stabilizers'],
    equipment: 'Exercise mat (optional)',
    sets: 2,
    reps: '8–10',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [45, 60],
    durationLabel: null,
    instructions: [
      'Lie face down with forehead comfortably supported and arms alongside the body.',
      'Keep the abdomen gently engaged.',
      'Lift the hands slightly if comfortable.',
      'Slowly move the arms outward and upward in a wide arc toward an overhead position.',
      'Reverse the movement and return the arms alongside the body.',
      'Keep the movement small and controlled.',
    ],
    commonMistakes: [
      'Arching the lower back',
      'Shrugging shoulders',
      'Moving too quickly',
      'Forcing arms overhead despite shoulder discomfort',
    ],
    easierVariation:
      'Keep the arms in contact with the floor and slide them through a comfortable range',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman prone reverse snow angel exercise lying face down arms sweeping overhead back shoulders',
    animationDescription:
      'Show the arms sweeping from beside the hips outward toward an overhead position, then returning slowly',
    alt: 'Prone reverse snow angels — overhead view lying face down with arms swept outward in an arc.',
  },
  {
    id: 'd2-wall-slides',
    name: 'Wall Slides',
    order: 5,
    category: 'Shoulders / Mobility and Stability',
    trackByDuration: false,
    targetMuscles: ['Shoulder stabilizers', 'Upper-back muscles'],
    secondaryMuscles: [],
    equipment: 'Wall',
    sets: 2,
    reps: '8–10',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [45, 45],
    durationLabel: null,
    instructions: [
      'Stand with the back near a wall. Position the arms in a comfortable W shape with elbows bent.',
      'Gently engage the core.',
      'Slide the arms upward along or near the wall as far as comfortable.',
      'Keep the ribs from flaring excessively.',
      'Return slowly to the W position.',
      'Repeat without forcing the shoulders.',
    ],
    commonMistakes: [
      'Arching the lower back',
      'Forcing arms to reach overhead',
      'Shrugging shoulders',
      'Continuing despite shoulder pain',
    ],
    easierVariation: 'Use a smaller range of motion',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman performing standing wall slides shoulder mobility exercise correct posture',
    animationDescription:
      'Show the arms sliding upward from a W position and returning downward against the wall',
    alt: 'Wall slides — side view standing near a wall sliding arms from a W position upward.',
  },
  {
    id: 'd2-biceps-curl',
    name: 'Self-Resisted Biceps Curl',
    order: 6,
    category: 'Biceps / Self-Resistance',
    trackByDuration: false,
    targetMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    equipment: 'None',
    sets: 2,
    reps: '8–10 per arm',
    repsPerSide: true,
    perSideLabel: 'per arm',
    restSeconds: [45, 60],
    durationLabel: null,
    perSideNote: 'Both arms must be trained; switch arms after each set.',
    instructions: [
      'Stand or sit comfortably. Keep one elbow close to the torso and place the opposite hand over the working hand or wrist.',
      'Begin with the working arm extended comfortably.',
      'Slowly bend the working elbow as if performing a biceps curl.',
      'Use the opposite hand to provide gentle resistance against the movement.',
      'Control the resistance rather than forcing the working arm.',
      'Lower the arm slowly while maintaining gentle resistance.',
      'Switch arms.',
    ],
    commonMistakes: [
      'Using excessive resistance',
      'Moving the elbow excessively',
      'Holding the breath',
      'Creating wrist or elbow discomfort',
    ],
    easierVariation:
      'Use very light resistance and perform a smaller range of motion',
    safetyNote: null,
    importantNote:
      'This is a no-equipment alternative for introducing biceps work. Resistance cannot be loaded as precisely as conventional curls.',
    imageSearchQuery:
      'woman demonstrating self resisted biceps curl using opposite hand at home no equipment',
    animationDescription:
      'Show one arm performing an elbow curl while the opposite hand gently resists the movement',
    alt: 'Self-resisted biceps curl — front view with one arm curling and the opposite hand resisting.',
  },
  {
    id: 'd2-close-grip-pushups',
    name: 'Close-Grip Wall Push-ups',
    order: 7,
    category: 'Triceps / Compound',
    trackByDuration: false,
    targetMuscles: ['Triceps'],
    secondaryMuscles: ['Chest', 'Anterior shoulders'],
    equipment: 'Wall',
    sets: 2,
    reps: '8–10',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [60, 60],
    durationLabel: null,
    instructions: [
      'Stand facing a wall. Place the hands approximately shoulder-width apart or slightly closer, at chest height.',
      'Keep the body aligned.',
      'Bend the elbows while moving the chest toward the wall.',
      'Keep the elbows relatively close to the torso, without forcing them inward.',
      'Push back to the starting position.',
      'Repeat slowly.',
    ],
    commonMistakes: [
      'Placing hands excessively close together',
      'Allowing hips to sag',
      'Shrugging shoulders',
      'Performing too quickly',
    ],
    easierVariation: 'Stand closer to the wall',
    safetyNote: null,
    importantNote:
      'This is a beginner-friendly triceps exercise, but it also involves the chest and shoulders.',
    imageSearchQuery:
      'woman close grip wall push up exercise emphasizing triceps correct form',
    animationDescription:
      'Show a controlled wall push-up with hands approximately shoulder-width apart and elbows tracking comfortably close to the body',
    alt: 'Close-grip wall push-ups — side view with elbows tracking close to the body.',
  },
  {
    id: 'd2-knee-plank',
    name: 'Knee Plank',
    order: 8,
    category: 'Core Stability',
    trackByDuration: false,
    targetMuscles: ['Abdominals', 'Deep core muscles'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'Exercise mat (optional)',
    sets: 2,
    reps: '15–25 seconds per set',
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: [45, 60],
    durationLabel: '15–25 seconds per set',
    instructions: [
      'Place the forearms on the floor with elbows beneath the shoulders. Rest the knees on the floor and keep the body aligned from head through hips to knees.',
      'Gently tighten the abdominal muscles.',
      'Keep the hips aligned with the torso.',
      'Breathe normally throughout the hold.',
      'Stop the set when proper alignment cannot be maintained.',
      'Lower the body carefully.',
    ],
    commonMistakes: [
      'Letting hips sag',
      'Raising hips too high',
      'Holding the breath',
      'Continuing despite lower-back pain',
    ],
    easierVariation: 'Perform a shorter hold of 10–15 seconds',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'beginner woman knee forearm plank correct alignment side view exercise mat',
    animationDescription:
      'Show the starting position on forearms and knees, maintaining a straight line from head through hips to knees',
    alt: 'Knee plank — side view on forearms and knees in a straight line from head to knees.',
  },
  {
    id: 'd2-cooldown',
    name: 'Cool-down & Gentle Stretching',
    order: 9,
    category: 'Cool-down',
    trackByDuration: true,
    targetMuscles: ['Chest', 'Upper back', 'Shoulders (stretching)'],
    secondaryMuscles: [],
    equipment: 'None',
    sets: null,
    reps: null,
    repsPerSide: false,
    perSideLabel: null,
    restSeconds: null,
    durationLabel: '3–5 minutes total',
    perSideNote: 'Shoulder stretch holds 15–25 seconds per side.',
    instructions: [
      'Slow marching in place — 60 seconds.',
      'Gentle chest stretch — 15–25 seconds.',
      'Gentle upper-back stretch — 15–25 seconds.',
      'Gentle shoulder stretch — 15–25 seconds per side.',
    ],
    commonMistakes: ['Bouncing', 'Forcing stretches', 'Continuing through pain'],
    easierVariation: 'Reduce hold time',
    safetyNote: null,
    importantNote: null,
    imageSearchQuery:
      'woman performing gentle upper body cool down stretches at home chest shoulder upper back',
    animationDescription:
      'Show slow, gentle stretches with comfortable positions and no forced joint movement',
    alt: 'Upper-body cool-down — front view of gentle chest, shoulder, and upper-back stretches.',
  },
]

export const WORKOUTS = {
  day1: {
    id: 'day1',
    name: 'Beginner Legs, Glutes, Calves & Abs',
    shortName: 'Legs, Glutes & Abs',
    day: 'Day 1',
    level: 'Beginner',
    location: 'Home',
    estimatedMinutes: '30–40',
    equipment: 'Exercise mat (optional), stable chair or wall for support',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Core'],
    objective:
      'Learn correct exercise technique, build foundational strength, improve balance, and develop training consistency.',
    exercises: day1Exercises,
  },
  day2: {
    id: 'day2',
    name: 'Beginner Upper Body & Core',
    shortName: 'Upper Body & Core',
    day: 'Day 2',
    level: 'Beginner',
    location: 'Home',
    estimatedMinutes: '30–40',
    equipment: 'No equipment. Optional: exercise mat or carpet, wall for support',
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core'],
    objective:
      'Build foundational strength, learn proper technique, and improve upper-body stability.',
    exercises: day2Exercises,
  },
}

export const WORKOUT_DAY_IDS = ['day1', 'day2']

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

export function getWorkout(dayId) {
  return WORKOUTS[dayId] ?? null
}

export function getExercise(dayId, exerciseId) {
  const workout = getWorkout(dayId)
  if (!workout) return null
  return workout.exercises.find((ex) => ex.id === exerciseId) ?? null
}

export function getTrackableExercises(dayId) {
  const workout = getWorkout(dayId)
  if (!workout) return []
  return workout.exercises.filter((ex) => !ex.trackByDuration)
}

export function formatRestSeconds(restSeconds) {
  if (restSeconds == null) return null
  if (Array.isArray(restSeconds)) {
    const [min, max] = restSeconds
    if (min === max) return `${min}s`
    return `${min}–${max}s`
  }
  return `${restSeconds}s`
}

export function defaultRestDuration(restSeconds) {
  if (restSeconds == null) return null
  if (Array.isArray(restSeconds)) return restSeconds[0]
  return restSeconds
}
