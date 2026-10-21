# IMPLEMENTATION_PLAN.md — Beginner Fitness & Workout Web App

> **This document is written for a coding agent. Read it completely before making any changes.**

---

## Section A — Mission and Execution Rules

### What This Application Is

A polished, production-quality, mobile-first fitness web application for a beginner female user who exercises at home. The app provides two structured bodyweight workout days — Day 1 (Legs, Glutes, Calves & Abs) and Day 2 (Upper Body & Core) — with exercise demonstrations, set/rep tracking, rest timers, a weekly calendar, workout history, and persistent progress tracking.

### Who Will Use It

A female beginner who is new to resistance training, exercising at home with no gym equipment. The interface must be encouraging, nonjudgmental, and beginner-friendly.

### Expected Final Result

A fully functional single-page React application (not a mockup, not a static landing page, not a collection of decorative cards) that:

- Provides a welcoming dashboard with today's workout and weekly consistency.
- Allows navigating between two workout days.
- Displays exercise cards with images, instructions, set tracking, and rest timers.
- Tracks individual set completion, exercise completion, and session progress.
- Records completed workouts on a weekly calendar.
- Persists all progress in localStorage across page refreshes.
- Works correctly and looks professional on mobile devices from 320px width up.

### Execution Rules

1. **Read this entire implementation plan before making any changes.**
2. **Inspect the existing codebase** and reuse working components, configuration, and conventions.
3. **Implement the actual working application.** Do not stop after generating a plan or a partial UI skeleton.
4. **Mobile usability is the highest UI priority.** Design for 320–375px first, then enhance for wider screens.
5. **Do not modify** `AGENTS.MD` or `Exercices.md`.
6. **Install only necessary dependencies.** The project already uses React 19 + Vite 8. Add React Router, Tailwind CSS (Vite-compatible), Lucide React, and optionally Framer Motion / Motion.
7. **After implementing**, run `npm run build` and `npm run lint` and fix all errors.
8. **Test the application** at multiple viewport widths.
9. **Report results**: files created/modified, commands run, functionality completed, and any remaining limitations.

---

## Section B — Repository Audit

### Verified Facts

| Item | Finding |
|---|---|
| **Project location** | `/home/ali/projects/training/training/` |
| **Framework** | React 19.3.1 with JavaScript (JSX) |
| **Build tool** | Vite 8.3.4 with `@vitejs/plugin-react` 6.1.2 |
| **React Compiler** | Enabled via `babel-plugin-react-compiler` and `@rolldown/plugin-babel` |
| **Package manager** | npm (package-lock.json present) |
| **Language** | JavaScript (`.jsx` files, no TypeScript source files) |
| **Available scripts** | `dev`, `build`, `lint`, `preview` |
| **Installed dependencies** | `react`, `react-dom` only (no router, no Tailwind, no icon library, no animation library) |
| **Dev dependencies** | Babel, ESLint (with react-hooks and react-refresh plugins), Vite |
| **Entry point** | `index.html` → `src/main.jsx` → `src/App.jsx` |
| **Existing routes** | None — no React Router installed, single `App` component |
| **Existing components** | Only `App.jsx` — the default Vite+React starter template (counter demo) |
| **Styling system** | Plain CSS with CSS custom properties in `src/index.css` and `src/App.css`; Vite default dark/light theme colors |
| **Existing CSS variables** | `--text`, `--text-h`, `--bg`, `--border`, `--code-bg`, `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow`, font families |
| **Existing assets** | `src/assets/hero.png` (Vite logo, 343×361 PNG), `src/assets/react.svg`, `src/assets/vite.svg`, `public/favicon.svg`, `public/icons.svg` |
| **Exercise images** | None — no exercise images exist in the project |
| **Data persistence** | None implemented |
| **Test infrastructure** | None — no test runner or test files |
| **Workout data** | None implemented |
| **Calendar** | None implemented |

### Current State Summary

The project is a **fresh Vite + React 19 starter template** with zero fitness-app functionality. Everything in the specification must be built from scratch. The existing `App.jsx`, `App.css`, and `index.css` contain only the Vite welcome-page demo content and will be replaced entirely.

### What Must Be Installed

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing between pages |
| `tailwindcss` + `@tailwindcss/vite` | Utility-first CSS framework (Vite 8 plugin) |
| `lucide-react` | Icon library |
| `motion` | Animation library (Motion for React, the Framer Motion successor compatible with React 19) |

### What Must NOT Be Installed

- No backend, database, or authentication libraries
- No complex state management (Redux, Zustand, etc.)
- No CSS-in-JS libraries (the spec says Tailwind CSS)
- No testing framework (none exists; focus on build/lint validation)

---

## Section C — Final Product Requirements

### C.1 Dashboard (Home Page — route: `/`)

- Friendly greeting with current date.
- Optional avatar/profile element.
- **Today's Workout Card** showing:
  - Workout name (alternating Day 1 / Day 2, or user-selectable).
  - Difficulty: Beginner.
  - Location: Home.
  - Duration: ~30–40 minutes.
  - Number of exercises.
  - "Start Workout" or "Continue Workout" button that navigates to the workout page.
- **Weekly Consistency Strip**:
  - Seven-day row for the current week (Mon–Sun).
  - Current day highlighted.
  - Completed training days marked with a check.
  - Progress text: "X of Y workouts completed" (Y = configurable weekly goal, default 3).
  - Progress bar derived from actual saved data, not hardcoded.
- **Motivational Message**: Short, supportive, encouraging. Never shaming.

### C.2 Workout Navigation

- Two workout days accessible from the dashboard and navigation:
  - Day 1: Legs, Glutes, Calves & Abs
  - Day 2: Upper Body & Core
- Each day is a separate data-driven workout rendered by the same shared workout session page.
- Route: `/workout/:dayId` (e.g., `/workout/day1`, `/workout/day2`).

### C.3 Workout Session Page

- **Header**: Workout name, difficulty, estimated duration, progress bar, exercises completed vs. total.
- **Exercise Cards** (one per exercise, in specified order):
  - Exercise number, name, image/illustration, target muscles.
  - Sets × reps (or duration for warm-up/cool-down/plank).
  - Rest interval.
  - Step-by-step instructions (expandable/collapsible).
  - Common mistakes.
  - Easier variation.
  - Unilateral indicator for per-leg/per-arm exercises.
- **Set Tracking**:
  - Individual checkboxes/buttons per set.
  - Visual distinction between completed and incomplete sets.
  - Undo capability.
  - Exercise auto-completes when all sets are done (or manual completion).
  - For unilateral exercises: clearly state both sides must be trained; display reps per side.
- **Rest Timer**:
  - Uses the configured rest duration from the exercise data.
  - Start, Pause, Resume, Reset, Skip controls.
  - Remaining time displayed clearly.
  - Only one timer active at a time.
  - Cleans up intervals on unmount.
  - Uses timestamps for accuracy (not just setInterval counting).
- **Session Controls**:
  - Start / Resume / Finish workout.
  - Confirmation before discarding progress.
  - Unfinished sessions can be resumed after navigating away or refreshing.
- **Completion Screen**:
  - Shows exercises and sets completed.
  - Records training date.
  - Updates weekly progress and workout history.
  - Option to return to dashboard.

### C.4 Weekly Calendar Page (route: `/calendar`)

- Seven-day calendar for the selected week.
- Navigate to previous/next weeks.
- Highlight today's date.
- Mark/unmark days as completed training days.
- Display completed workout count for the selected week.
- Prevent duplicate date counting (same date marked twice counts once).
- Allow undo (unmark a completion).
- Past weeks remain accessible.
- Calendar changes persist in localStorage.
- A training day is only marked completed when the user explicitly finishes a workout or manually marks the day.

### C.5 Progress / History Page (route: `/progress`)

- Workout history: list of completed workouts with dates, workout type, exercises completed.
- Weekly goals: configurable target (default 3 per week).
- Weekly consistency tracking.
- Empty states when no history exists.

### C.6 Navigation

- Bottom navigation bar on mobile: Home, Workout, Calendar, Progress.
- Appropriate desktop navigation on wider screens.
- All links lead to real, functional pages (never dead links or empty pages).

### C.7 Cross-Feature Interactions

1. **Completing a workout** → updates the calendar (marks the date), updates the dashboard weekly strip, adds to workout history.
2. **Marking an exercise/set complete** → updates session progress bar and exercise count.
3. **Page refresh** → preserves unfinished sessions and saved completion data.
4. **Same date, same workout twice** → store separate session records if desired, but count only one distinct training date in the weekly consistency metric.
5. **Day 1 and Day 2** → have completely independent exercise and session state.
6. **Weekly goal** → configurable; default 3; persisted in localStorage.

---

## Section D — Canonical Workout Content

### D.1 Day 1: Beginner Legs, Glutes, Calves & Abs

**Workout Metadata:**
- Name: Beginner Legs, Glutes, Calves & Abs
- Day: Day 1
- Level: Beginner
- Target Audience: Female beginner
- Location: Home
- Equipment: Exercise mat (optional), stable chair or wall for support
- Estimated Duration: 30–40 minutes
- Main Muscle Groups: Quadriceps, hamstrings, gluteus maximus, gluteus medius, calves, abdominals/core
- Objective: Learn correct exercise technique, build foundational strength, improve balance, develop training consistency

#### Exercise 1: Warm-up & Dynamic Mobility

| Field | Value |
|---|---|
| **ID** | `d1-warmup` |
| **Display Name** | Warm-up & Dynamic Mobility |
| **Order** | 1 |
| **Workout Day** | Day 1 |
| **Category** | Warm-up |
| **Primary Muscles** | Full body (hips, knees, ankles) |
| **Secondary Muscles** | — |
| **Equipment** | None |
| **Sets** | N/A (duration-based) |
| **Rep Range / Duration** | 5–7 minutes total |
| **Per-Side** | Leg Swings: 10 per leg |
| **Rest** | N/A |
| **Instructions** | 1. March in Place — 60 seconds. 2. Arm Circles — 30 seconds. 3. Hip Circles — 30 seconds. 4. Supported Leg Swings — 10 reps per leg (hold wall). 5. Easy Bodyweight Squats — 8 reps. |
| **Common Mistakes** | Using aggressive static stretching before the workout; rushing through movements |
| **Easier Variation** | Reduce range of motion on all movements |
| **Image Search Query** | "beginner woman dynamic warm up mobility routine at home marching arm circles" |
| **Animation Description** | Show marching in place, gentle arm circles, hip circles, and supported leg swings with controlled movement |

#### Exercise 2: Bodyweight Squat

| Field | Value |
|---|---|
| **ID** | `d1-bodyweight-squat` |
| **Display Name** | Bodyweight Squat |
| **Order** | 2 |
| **Workout Day** | Day 1 |
| **Category** | Compound |
| **Primary Muscles** | Quadriceps, Glutes |
| **Secondary Muscles** | Hamstrings, Core |
| **Equipment** | None; chair may be used as a depth target |
| **Sets** | 2 |
| **Rep Range** | 10–12 |
| **Per-Side** | No |
| **Rest** | 60–90 seconds |
| **Instructions** | 1. Stand with feet approximately shoulder-width apart. 2. Brace the core and push the hips backward while bending the knees. 3. Lower to a comfortable depth while keeping the feet grounded. 4. Keep the knees aligned with the toes. 5. Push through the feet to return to standing. |
| **Common Mistakes** | Knees collapsing inward; heels lifting; losing balance; descending beyond a comfortable range |
| **Easier Variation** | Chair Squat |
| **Image Search Query** | "beginner woman bodyweight squat correct form side view home fitness" |
| **Animation Description** | Show standing position, hip hinge and knee bend descent to comfortable depth, then push back up to standing. Side view preferred showing alignment. |

#### Exercise 3: Glute Bridge

| Field | Value |
|---|---|
| **ID** | `d1-glute-bridge` |
| **Display Name** | Glute Bridge |
| **Order** | 3 |
| **Workout Day** | Day 1 |
| **Category** | Glute-focused strength |
| **Primary Muscles** | Glutes, Hamstrings |
| **Secondary Muscles** | Core |
| **Equipment** | Exercise mat (optional) |
| **Sets** | 3 |
| **Rep Range** | 12–15 |
| **Per-Side** | No |
| **Rest** | 60 seconds |
| **Instructions** | 1. Lie on the back with knees bent and feet flat on the floor. 2. Keep arms relaxed beside the body. 3. Brace the core and lift the hips by contracting the glutes. 4. Stop when the torso and thighs form an approximately straight line. 5. Squeeze the glutes briefly at the top. 6. Lower the hips slowly with control. |
| **Common Mistakes** | Excessively arching the lower back; pushing through the neck; lifting the hips too high |
| **Easier Variation** | Short-range Glute Bridge |
| **Image Search Query** | "woman glute bridge exercise lying on back hips raised correct form home workout" |
| **Animation Description** | Show person lying on back with knees bent, lifting hips up to form a straight line from shoulders to knees, then lowering with control. |

#### Exercise 4: Donkey Kicks

| Field | Value |
|---|---|
| **ID** | `d1-donkey-kicks` |
| **Display Name** | Donkey Kicks |
| **Order** | 4 |
| **Workout Day** | Day 1 |
| **Category** | Unilateral glute exercise |
| **Primary Muscles** | Glutes |
| **Secondary Muscles** | Hamstrings, Core |
| **Equipment** | Exercise mat (optional) |
| **Sets** | 2 |
| **Rep Range** | 10–12 per leg |
| **Per-Side** | Yes — both legs must be trained |
| **Rest** | 45–60 seconds after completing both legs |
| **Instructions** | 1. Start on all fours with hands under shoulders and knees under hips. 2. Keep the core engaged and the spine neutral. 3. Keep one knee bent and lift that leg backward and upward. 4. Stop before the lower back starts arching or the pelvis rotates. 5. Lower the knee slowly and repeat. 6. Complete all repetitions on one leg, then switch sides. |
| **Common Mistakes** | Rotating the pelvis; swinging the leg; arching the lower back |
| **Easier Variation** | Smaller range of motion |
| **Image Search Query** | "woman donkey kicks exercise all fours position glute exercise home workout" |
| **Animation Description** | Show quadruped position (hands and knees), lifting one bent leg backward and upward while keeping spine neutral, then lowering slowly. |

#### Exercise 5: Supported Reverse Lunge

| Field | Value |
|---|---|
| **ID** | `d1-reverse-lunge` |
| **Display Name** | Supported Reverse Lunge |
| **Order** | 5 |
| **Workout Day** | Day 1 |
| **Category** | Unilateral compound |
| **Primary Muscles** | Quadriceps, Glutes |
| **Secondary Muscles** | Hamstrings, Core |
| **Equipment** | Stable chair or wall for balance |
| **Sets** | 2 |
| **Rep Range** | 8 per leg |
| **Per-Side** | Yes — both legs must be trained |
| **Rest** | 60–90 seconds |
| **Instructions** | 1. Stand upright and hold a stable support if needed. 2. Step one foot backward. 3. Bend both knees slightly and lower only as far as comfortable. 4. Keep the front foot flat and the front knee aligned with the toes. 5. Push through the front foot to return to standing. 6. Alternate legs or complete one side before switching. |
| **Common Mistakes** | Losing balance; taking an excessively long step; forcing a deep range of motion |
| **Easier Variation** | Supported Split Squat with a short range of motion |
| **Safety Note** | If the beginner cannot perform this comfortably, replace with Chair Squats |
| **Image Search Query** | "woman supported reverse lunge exercise holding wall for balance home workout" |
| **Animation Description** | Show standing upright with wall support, stepping one foot back and lowering, then returning to standing. Side/three-quarter view. |

#### Exercise 6: Standing Calf Raises

| Field | Value |
|---|---|
| **ID** | `d1-calf-raises` |
| **Display Name** | Standing Calf Raises |
| **Order** | 6 |
| **Workout Day** | Day 1 |
| **Category** | Isolation |
| **Primary Muscles** | Gastrocnemius, Soleus (Calves) |
| **Secondary Muscles** | — |
| **Equipment** | Stable chair or wall for balance |
| **Sets** | 2 |
| **Rep Range** | 12–15 |
| **Per-Side** | No |
| **Rest** | 45–60 seconds |
| **Instructions** | 1. Stand upright with feet approximately hip-width apart. 2. Hold the support lightly. 3. Raise both heels slowly while keeping the body upright. 4. Pause briefly at the top. 5. Lower the heels slowly and under control. |
| **Common Mistakes** | Bouncing; rushing repetitions; leaning heavily on the support |
| **Easier Variation** | Smaller range of motion |
| **Image Search Query** | "woman standing calf raises exercise holding wall support home workout" |
| **Animation Description** | Show standing position near wall, rising onto toes slowly, pausing at top, then lowering heels with control. |

#### Exercise 7: Dead Bug

| Field | Value |
|---|---|
| **ID** | `d1-dead-bug` |
| **Display Name** | Dead Bug |
| **Order** | 7 |
| **Workout Day** | Day 1 |
| **Category** | Core stability |
| **Primary Muscles** | Abdominals, Deep core muscles |
| **Secondary Muscles** | Hip flexors |
| **Equipment** | Exercise mat (optional) |
| **Sets** | 2 |
| **Rep Range** | 8–10 per side |
| **Per-Side** | Yes — alternating sides |
| **Rest** | 45–60 seconds |
| **Instructions** | 1. Lie on the back with arms extended toward the ceiling. 2. Raise the legs with hips and knees bent approximately 90 degrees. 3. Gently brace the abdominal muscles. 4. Slowly extend one arm and the opposite leg. 5. Return to the starting position and alternate sides. 6. Maintain a stable lower back throughout the movement. |
| **Common Mistakes** | Arching the lower back; moving too quickly; extending limbs beyond available control |
| **Easier Variation** | Move one heel at a time while keeping the other foot supported |
| **Image Search Query** | "woman dead bug exercise lying on back extending opposite arm and leg core stability" |
| **Animation Description** | Show supine position with arms up and knees at 90°, extending opposite arm and leg, then returning. Low angle or side view showing the back remaining flat. |

#### Exercise 8: Cool-down & Gentle Stretching

| Field | Value |
|---|---|
| **ID** | `d1-cooldown` |
| **Display Name** | Cool-down & Gentle Stretching |
| **Order** | 8 |
| **Workout Day** | Day 1 |
| **Category** | Cool-down |
| **Primary Muscles** | Quadriceps, Hamstrings, Glutes (stretching) |
| **Secondary Muscles** | — |
| **Equipment** | None |
| **Sets** | N/A (duration-based) |
| **Rep Range / Duration** | 3–5 minutes total |
| **Per-Side** | N/A |
| **Rest** | N/A |
| **Instructions** | 1. Slow marching or walking in place. 2. Gentle quadriceps stretch. 3. Gentle hamstring stretch. 4. Gentle glute stretch. Hold each stretch 15–25 seconds without bouncing. |
| **Common Mistakes** | Bouncing in stretches; forcing beyond comfort; continuing through pain |
| **Easier Variation** | Reduce hold time; use wall for support |
| **Image Search Query** | "woman gentle cool down stretching quadriceps hamstring glute stretch at home" |
| **Animation Description** | Show slow walking in place, followed by gentle standing or seated stretches held with relaxed breathing. |

---

### D.2 Day 2: Beginner Upper Body & Core

**Workout Metadata:**
- Name: Beginner Upper Body & Core
- Day: Day 2
- Level: Beginner
- Target Audience: Female beginner
- Location: Home
- Equipment: No exercise equipment whatsoever. Optional: clean exercise mat or carpet for comfort. A wall may be used for support.
- Estimated Duration: 30–40 minutes
- Training Style: Bodyweight exercises and controlled self-resistance
- Primary Goal: Build foundational strength, learn proper technique, and improve upper-body stability
- Target Muscles: Chest, back, shoulders, biceps, triceps, and core

**Important Constraints** (from source):
- Do not use dumbbells, resistance bands, barbells, gym machines, or other exercise equipment.
- Do not use chairs, tables, door frames, or other furniture as exercise anchors.
- Use beginner-friendly variations.
- Do not train to muscular failure.
- Preserve correct form and a comfortable range of motion.

#### Exercise 1: Warm-up & Upper-Body Mobility

| Field | Value |
|---|---|
| **ID** | `d2-warmup` |
| **Display Name** | Warm-up & Upper-Body Mobility |
| **Order** | 1 |
| **Workout Day** | Day 2 |
| **Category** | Warm-up |
| **Primary Muscles** | Shoulders, upper back, chest |
| **Secondary Muscles** | — |
| **Equipment** | None |
| **Sets** | N/A (duration-based) |
| **Rep Range / Duration** | 5–6 minutes total |
| **Per-Side** | N/A |
| **Rest** | N/A |
| **Instructions** | 1. March in Place — 60 seconds. 2. Arm Circles — 30 seconds forward, 30 seconds backward. 3. Shoulder Rolls — 30 seconds. 4. Gentle Torso Rotations — 30 seconds. 5. Wall Slides — 8–10 reps. 6. Easy Wall Push-ups — 8 reps. |
| **Common Mistakes** | Aggressive stretching; forcing shoulders into uncomfortable positions |
| **Easier Variation** | Reduce range of motion on all movements |
| **Image Search Query** | "beginner woman performing upper body warm up arm circles and shoulder mobility at home" |
| **Animation Description** | Show gentle arm circles, shoulder rolls, and wall slides with controlled movements |

#### Exercise 2: Wall Push-ups

| Field | Value |
|---|---|
| **ID** | `d2-wall-pushups` |
| **Display Name** | Wall Push-ups |
| **Order** | 2 |
| **Workout Day** | Day 2 |
| **Category** | Chest / Compound |
| **Primary Muscles** | Chest |
| **Secondary Muscles** | Triceps, Anterior shoulders |
| **Equipment** | Wall |
| **Sets** | 2 |
| **Rep Range** | 8–12 |
| **Per-Side** | No |
| **Rest** | 60–90 seconds |
| **Instructions** | 1. Stand facing a wall, approximately an arm's length away. Place both palms against the wall at chest height, slightly wider than shoulder-width. 2. Keep the body aligned from head to heels. 3. Bend the elbows and bring the chest toward the wall. 4. Keep the elbows at a comfortable angle rather than flaring them excessively. 5. Push through the palms to return to the starting position. |
| **Common Mistakes** | Arching the lower back; moving only the head toward the wall; performing reps too quickly; shoulders shrugging toward ears |
| **Easier Variation** | Stand closer to the wall |
| **Image Search Query** | "woman beginner wall push up exercise correct form side view home fitness" |
| **Animation Description** | Show the woman leaning toward the wall with elbows bending, then pushing away to the starting position. Display both starting and ending positions. |

#### Exercise 3: Prone W Raises

| Field | Value |
|---|---|
| **ID** | `d2-prone-w-raises` |
| **Display Name** | Prone W Raises |
| **Order** | 3 |
| **Workout Day** | Day 2 |
| **Category** | Back / Upper-Back Stability |
| **Primary Muscles** | Mid-back, Scapular stabilizers |
| **Secondary Muscles** | Rear shoulders |
| **Equipment** | Exercise mat (optional) |
| **Sets** | 2 |
| **Rep Range** | 8–12 |
| **Per-Side** | No |
| **Rest** | 45–60 seconds |
| **Instructions** | 1. Lie face down on a comfortable surface. Bend elbows so arms form a W shape beside the head, thumbs pointing upward when comfortable. 2. Keep the neck neutral and look toward the floor. 3. Gently draw the shoulder blades together. 4. Lift the hands and elbows slightly off the floor without forcing the movement. 5. Hold for approximately one second. 6. Lower the arms slowly. |
| **Common Mistakes** | Lifting the chest excessively; overarching lower back; shrugging shoulders; forcing arms higher than comfortable |
| **Easier Variation** | Perform without lifting arms off floor; focus on squeezing shoulder blades together |
| **Important Note** | This is an upper-back stability exercise, not a substitute for a loaded rowing movement |
| **Image Search Query** | "woman prone W raise exercise lying face down elbows bent upper back strengthening correct form" |
| **Animation Description** | Show a woman lying face down, moving her arms into a W shape and gently lifting them while keeping the torso stable |

#### Exercise 4: Prone Reverse Snow Angels

| Field | Value |
|---|---|
| **ID** | `d2-reverse-snow-angels` |
| **Display Name** | Prone Reverse Snow Angels |
| **Order** | 4 |
| **Workout Day** | Day 2 |
| **Category** | Back / Rear Shoulders |
| **Primary Muscles** | Rear shoulders, Upper-back muscles |
| **Secondary Muscles** | Scapular stabilizers |
| **Equipment** | Exercise mat (optional) |
| **Sets** | 2 |
| **Rep Range** | 8–10 |
| **Per-Side** | No |
| **Rest** | 45–60 seconds |
| **Instructions** | 1. Lie face down with forehead comfortably supported and arms alongside the body. 2. Keep the abdomen gently engaged. 3. Lift the hands slightly if comfortable. 4. Slowly move the arms outward and upward in a wide arc toward an overhead position. 5. Reverse the movement and return the arms alongside the body. 6. Keep the movement small and controlled. |
| **Common Mistakes** | Arching the lower back; shrugging shoulders; moving too quickly; forcing arms overhead despite shoulder discomfort |
| **Easier Variation** | Keep the arms in contact with the floor and slide them through a comfortable range |
| **Image Search Query** | "woman prone reverse snow angel exercise lying face down arms sweeping overhead back shoulders" |
| **Animation Description** | Show the arms sweeping from beside the hips outward toward an overhead position, then returning slowly |

#### Exercise 5: Wall Slides

| Field | Value |
|---|---|
| **ID** | `d2-wall-slides` |
| **Display Name** | Wall Slides |
| **Order** | 5 |
| **Workout Day** | Day 2 |
| **Category** | Shoulders / Mobility and Stability |
| **Primary Muscles** | Shoulder stabilizers, Upper-back muscles |
| **Secondary Muscles** | — |
| **Equipment** | Wall |
| **Sets** | 2 |
| **Rep Range** | 8–10 |
| **Per-Side** | No |
| **Rest** | 45 seconds |
| **Instructions** | 1. Stand with the back near a wall. Position the arms in a comfortable W shape with elbows bent. 2. Gently engage the core. 3. Slide the arms upward along or near the wall as far as comfortable. 4. Keep the ribs from flaring excessively. 5. Return slowly to the W position. 6. Repeat without forcing the shoulders. |
| **Common Mistakes** | Arching the lower back; forcing arms to reach overhead; shrugging shoulders; continuing despite shoulder pain |
| **Easier Variation** | Use a smaller range of motion |
| **Image Search Query** | "woman performing standing wall slides shoulder mobility exercise correct posture" |
| **Animation Description** | Show the arms sliding upward from a W position and returning downward against the wall |

#### Exercise 6: Self-Resisted Biceps Curl

| Field | Value |
|---|---|
| **ID** | `d2-biceps-curl` |
| **Display Name** | Self-Resisted Biceps Curl |
| **Order** | 6 |
| **Workout Day** | Day 2 |
| **Category** | Biceps / Self-Resistance |
| **Primary Muscles** | Biceps |
| **Secondary Muscles** | Forearms |
| **Equipment** | None |
| **Sets** | 2 |
| **Rep Range** | 8–10 per arm |
| **Per-Side** | Yes — both arms must be trained |
| **Rest** | 45–60 seconds |
| **Instructions** | 1. Stand or sit comfortably. Keep one elbow close to the torso and place the opposite hand over the working hand or wrist. 2. Begin with the working arm extended comfortably. 3. Slowly bend the working elbow as if performing a biceps curl. 4. Use the opposite hand to provide gentle resistance against the movement. 5. Control the resistance rather than forcing the working arm. 6. Lower the arm slowly while maintaining gentle resistance. 7. Switch arms. |
| **Common Mistakes** | Using excessive resistance; moving the elbow excessively; holding the breath; creating wrist or elbow discomfort |
| **Easier Variation** | Use very light resistance and perform a smaller range of motion |
| **Important Note** | This is a no-equipment alternative for introducing biceps work. Resistance cannot be loaded as precisely as conventional curls. |
| **Image Search Query** | "woman demonstrating self resisted biceps curl using opposite hand at home no equipment" |
| **Animation Description** | Show one arm performing an elbow curl while the opposite hand gently resists the movement |

#### Exercise 7: Close-Grip Wall Push-ups

| Field | Value |
|---|---|
| **ID** | `d2-close-grip-pushups` |
| **Display Name** | Close-Grip Wall Push-ups |
| **Order** | 7 |
| **Workout Day** | Day 2 |
| **Category** | Triceps / Compound |
| **Primary Muscles** | Triceps |
| **Secondary Muscles** | Chest, Anterior shoulders |
| **Equipment** | Wall |
| **Sets** | 2 |
| **Rep Range** | 8–10 |
| **Per-Side** | No |
| **Rest** | 60 seconds |
| **Instructions** | 1. Stand facing a wall. Place the hands approximately shoulder-width apart or slightly closer, at chest height. 2. Keep the body aligned. 3. Bend the elbows while moving the chest toward the wall. 4. Keep the elbows relatively close to the torso, without forcing them inward. 5. Push back to the starting position. 6. Repeat slowly. |
| **Common Mistakes** | Placing hands excessively close together; allowing hips to sag; shrugging shoulders; performing too quickly |
| **Easier Variation** | Stand closer to the wall |
| **Important Note** | This is a beginner-friendly triceps exercise, but it also involves the chest and shoulders |
| **Image Search Query** | "woman close grip wall push up exercise emphasizing triceps correct form" |
| **Animation Description** | Show a controlled wall push-up with hands approximately shoulder-width apart and elbows tracking comfortably close to the body |

#### Exercise 8: Knee Plank

| Field | Value |
|---|---|
| **ID** | `d2-knee-plank` |
| **Display Name** | Knee Plank |
| **Order** | 8 |
| **Workout Day** | Day 2 |
| **Category** | Core Stability |
| **Primary Muscles** | Abdominals, Deep core muscles |
| **Secondary Muscles** | Shoulders |
| **Equipment** | Exercise mat (optional) |
| **Sets** | 2 |
| **Duration** | 15–25 seconds per set |
| **Rep Range** | N/A (duration-based hold) |
| **Per-Side** | No |
| **Rest** | 45–60 seconds |
| **Instructions** | 1. Place the forearms on the floor with elbows beneath the shoulders. Rest the knees on the floor and keep the body aligned from head through hips to knees. 2. Gently tighten the abdominal muscles. 3. Keep the hips aligned with the torso. 4. Breathe normally throughout the hold. 5. Stop the set when proper alignment cannot be maintained. 6. Lower the body carefully. |
| **Common Mistakes** | Letting hips sag; raising hips too high; holding the breath; continuing despite lower-back pain |
| **Easier Variation** | Perform a shorter hold of 10–15 seconds |
| **Image Search Query** | "beginner woman knee forearm plank correct alignment side view exercise mat" |
| **Animation Description** | Show the starting position on forearms and knees, maintaining a straight line from head through hips to knees |

#### Exercise 9: Cool-down & Gentle Stretching

| Field | Value |
|---|---|
| **ID** | `d2-cooldown` |
| **Display Name** | Cool-down & Gentle Stretching |
| **Order** | 9 |
| **Workout Day** | Day 2 |
| **Category** | Cool-down |
| **Primary Muscles** | Chest, Upper back, Shoulders (stretching) |
| **Secondary Muscles** | — |
| **Equipment** | None |
| **Sets** | N/A (duration-based) |
| **Rep Range / Duration** | 3–5 minutes total |
| **Per-Side** | Shoulder stretch: yes (15–25 seconds per side) |
| **Rest** | N/A |
| **Instructions** | 1. Slow marching in place — 60 seconds. 2. Gentle chest stretch — 15–25 seconds. 3. Gentle upper-back stretch — 15–25 seconds. 4. Gentle shoulder stretch — 15–25 seconds per side. |
| **Common Mistakes** | Bouncing; forcing stretches; continuing through pain |
| **Easier Variation** | Reduce hold time |
| **Image Search Query** | "woman performing gentle upper body cool down stretches at home chest shoulder upper back" |
| **Animation Description** | Show slow, gentle stretches with comfortable positions and no forced joint movement |

### D.3 Beginner Safety Notes (apply to both days)

These notes come from the source specification and should be displayed somewhere accessible:

1. First two weeks: the goal is to learn technique, not reach muscular failure.
2. Light warm-up sets do not count toward the main exercise sets.
3. If the prescribed repetitions are easy with proper form, increase reps gradually before adding resistance.
4. Stop at sharp pain, especially in the knee or back.
5. Expected session duration: approximately 30–40 minutes.
6. Present this as general fitness guidance, not individualized medical advice.
7. Do not promise spot fat reduction or guaranteed muscle-growth results.

### D.4 Source-Data Observations

1. **Day 2 has 9 exercises** (including warm-up and cool-down) while **Day 1 has 8**. This is correct per the source.
2. **Knee Plank** uses duration (15–25 seconds) rather than reps. The UI must display a duration field and ideally let the user start a set-length timer.
3. **Self-Resisted Biceps Curl** is per-arm; the source explicitly notes resistance cannot be standardized.
4. **Prone W Raises and Reverse Snow Angels** are upper-back stability exercises, not substitutes for loaded rows — this honesty note should appear in the UI.
5. **Wall Push-ups (Ex 2) and Close-Grip Wall Push-ups (Ex 7)** train overlapping muscle groups — this is intentional per the source and should not be flagged as an error.

---

## Section E — Technical Architecture

### E.1 Entry Points

| File | Responsibility |
|---|---|
| `index.html` | HTML shell, viewport meta, root div, favicon |
| `src/main.jsx` | React root render with StrictMode, imports global CSS |
| `src/App.jsx` | Root component, sets up Router and Layout |

### E.2 Pages and Routes

| Route | Page Component | Purpose |
|---|---|---|
| `/` | `DashboardPage` | Home dashboard |
| `/workout/:dayId` | `WorkoutPage` | Workout session (day1 or day2) |
| `/calendar` | `CalendarPage` | Weekly calendar with training-day tracking |
| `/progress` | `ProgressPage` | Workout history and weekly goals |

### E.3 Recommended File Tree

```
src/
├── App.jsx                    # Router + Layout shell
├── main.jsx                   # React root (keep existing)
├── index.css                  # Tailwind directives + CSS custom properties (design tokens)
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx         # Shared layout: header area + main + bottom nav
│   │   └── BottomNav.jsx      # Mobile bottom navigation bar
│   │
│   ├── workout/
│   │   ├── ExerciseCard.jsx   # Single exercise card (image, info, set tracker)
│   │   ├── SetTracker.jsx     # Set checkboxes for an exercise
│   │   ├── RestTimer.jsx      # Rest countdown timer
│   │   ├── WorkoutHeader.jsx  # Session header with progress bar
│   │   ├── CompletionScreen.jsx # Workout completion summary
│   │   └── UnilateralBadge.jsx # "Per leg" / "Per arm" indicator
│   │
│   ├── calendar/
│   │   ├── WeeklyCalendar.jsx # Full weekly calendar with navigation
│   │   └── WeekStrip.jsx      # Compact 7-day strip for dashboard
│   │
│   ├── progress/
│   │   ├── HistoryList.jsx    # List of completed workouts
│   │   └── WeeklyGoal.jsx     # Weekly goal display and configuration
│   │
│   └── ui/
│       ├── ProgressBar.jsx    # Reusable progress bar
│       ├── Button.jsx         # Styled button component (optional)
│       └── ExerciseImage.jsx  # Image with loading/fallback states
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── WorkoutPage.jsx
│   ├── CalendarPage.jsx
│   └── ProgressPage.jsx
│
├── data/
│   └── workouts.js            # All workout definitions (Day 1 + Day 2)
│
├── hooks/
│   ├── useWorkoutSession.js   # Session state management (sets, progress, completion)
│   ├── useWorkoutHistory.js   # History & calendar data from localStorage
│   ├── useRestTimer.js        # Timer logic with timestamp-based accuracy
│   └── useLocalStorage.js     # Generic localStorage hook with error handling
│
├── services/
│   └── storage.js             # localStorage read/write/migrate utilities
│
└── utils/
    ├── dateUtils.js           # Date formatting, week boundaries, YYYY-MM-DD
    └── workoutUtils.js        # Completion calculations, session helpers

public/
├── favicon.svg                # Keep existing
├── icons.svg                  # Keep existing (may not be needed)
└── images/
    └── exercises/             # Exercise images (SVG placeholders or sourced assets)
```

### E.4 Component Responsibilities

#### `Layout.jsx`
- Wraps all pages with consistent padding, max-width, and background color.
- Renders `BottomNav` on mobile.
- Receives `children` and renders them in a `<main>` element.

#### `BottomNav.jsx`
- Fixed bottom bar with 4 nav items: Home, Workout, Calendar, Progress.
- Uses `NavLink` from React Router for active state.
- Icons from Lucide React.
- Touch-friendly (min 44×44px tap targets).
- On desktop (≥768px): could transition to a top/side nav, or remain as bottom nav.

#### `ExerciseCard.jsx`
- Props: exercise definition object, session state for this exercise, callbacks for set completion.
- Displays: image, name, muscles, sets/reps (or duration), rest time.
- Contains expandable instructions section.
- Contains `SetTracker` (for set-based exercises) or duration display (for warm-up/cool-down/plank).
- Shows unilateral badge when `repsPerSide` is true.
- Shows completion state.

#### `SetTracker.jsx`
- Props: total sets, completed sets array, onToggleSet callback.
- Renders a row of set buttons/checkboxes.
- Each set shows: set number, target reps, completed state.
- Tap to complete, tap again to undo.
- When all sets complete → exercise is marked complete.

#### `RestTimer.jsx`
- Props: duration in seconds, onComplete callback.
- State: running/paused/idle, remaining time.
- Controls: Start, Pause/Resume, Reset, Skip.
- Uses `Date.now()` timestamps for accuracy.
- Cleans up `setInterval` on unmount.
- Only one instance should run at a time (enforced by parent).

#### `WorkoutHeader.jsx`
- Props: workout name, difficulty, duration, completed exercises, total exercises.
- Displays progress bar and "X/Y exercises completed".

#### `CompletionScreen.jsx`
- Props: workout summary data.
- Shows celebration message, exercises completed, sets completed.
- "Return to Dashboard" button.
- Triggers training-date recording.

#### `WeeklyCalendar.jsx`
- Props: training dates, onToggleDate callback.
- State: selected week offset (0 = current week).
- Shows Mon–Sun with day names and dates.
- Previous/Next week navigation.
- Highlights today.
- Completed days have a check/filled indicator.
- Clicking a past or current date toggles completion (for manual marking).

#### `WeekStrip.jsx`
- Simplified version of WeeklyCalendar for dashboard.
- Shows only the current week, non-interactive (or lightly interactive).
- Shows weekly progress text.

### E.5 State Architecture

**Local component state** (useState):
- Rest timer: running, paused, remaining time.
- Expanded/collapsed instruction panels.
- UI transitions and animation state.
- Week navigation offset in calendar.

**Shared state via hooks** (persisted in localStorage):
- `useWorkoutSession(dayId)`: Current session progress for a specific workout day. Returns completed sets per exercise, overall progress, session start time, whether session is active/complete.
- `useWorkoutHistory()`: Array of completed workout records and set of training dates. Returns training dates, workout history, weekly goal, and mutation functions.

**No global state library needed.** Each page reads from localStorage via hooks. Cross-page consistency is achieved by reading from the same localStorage keys.

---

## Section F — Data Models and State Transitions

### F.1 Workout Definition (static, in `data/workouts.js`)

```javascript
// data/workouts.js
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
    exercises: [ /* array of exercise objects */ ],
  },
  day2: {
    id: 'day2',
    name: 'Beginner Upper Body & Core',
    shortName: 'Upper Body & Core',
    day: 'Day 2',
    level: 'Beginner',
    location: 'Home',
    estimatedMinutes: '30–40',
    equipment: 'No equipment. Optional: exercise mat, wall for support',
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core'],
    exercises: [ /* array of exercise objects */ ],
  },
};
```

### F.2 Exercise Definition (static, within workout)

```javascript
{
  id: 'd1-bodyweight-squat',      // Stable, unique, never changes
  name: 'Bodyweight Squat',
  slug: 'bodyweight-squat',
  order: 2,
  category: 'Compound',
  difficulty: 'Beginner',
  targetMuscles: ['Quadriceps', 'Glutes'],
  secondaryMuscles: ['Hamstrings', 'Core'],
  equipment: 'None; chair may be used as a depth target',
  sets: 2,                        // null for duration-based exercises
  reps: '10–12',                  // String to preserve range; null for duration-based
  repsPerSide: false,             // true for Donkey Kicks, Dead Bug, Biceps Curl, etc.
  restSeconds: [60, 90],          // [min, max] or single number; null for warm-up/cool-down
  durationSeconds: null,          // For warm-up, cool-down, or plank: [min, max] in seconds
  instructions: [
    'Stand with feet approximately shoulder-width apart.',
    'Brace the core and push the hips backward while bending the knees.',
    // ...
  ],
  commonMistakes: [
    'Knees collapsing inward',
    'Heels lifting',
    // ...
  ],
  easierVariation: 'Chair Squat',
  safetyNote: null,               // Optional; string if present
  importantNote: null,            // Optional; string if present (for accuracy caveats)
  imageSearchQuery: 'beginner woman bodyweight squat correct form side view home fitness',
  animationDescription: 'Show standing position, hip hinge and knee bend descent...',
  imageSrc: '/images/exercises/d1-bodyweight-squat.svg', // Local asset path
}
```

### F.3 Workout Session State (persisted in localStorage)

```javascript
// localStorage key: `session_day1` or `session_day2`
{
  dayId: 'day1',
  startedAt: '2026-10-21T10:30:00.000Z',  // ISO timestamp
  completedSets: {
    // exerciseId → array of completed set indices (0-based)
    'd1-bodyweight-squat': [0, 1],
    'd1-glute-bridge': [0],
    // ...
  },
  completedExercises: ['d1-warmup', 'd1-bodyweight-squat'],  // exercise IDs
  isComplete: false,
  completedAt: null,
}
```

### F.4 Training Dates and History (persisted in localStorage)

```javascript
// localStorage key: `training_dates`
// A Set serialized as an array of YYYY-MM-DD strings
['2026-10-15', '2026-10-17', '2026-10-19']

// localStorage key: `workout_history`
// An array of completed workout records (most recent first)
[
  {
    id: 'session_1729500000000',  // unique session ID (e.g., timestamp-based)
    dayId: 'day1',
    workoutName: 'Beginner Legs, Glutes, Calves & Abs',
    date: '2026-10-21',           // YYYY-MM-DD local date
    completedAt: '2026-10-21T11:15:00.000Z',
    exercisesCompleted: 8,
    exercisesTotal: 8,
    setsCompleted: 15,
    setsTotal: 15,
  },
  // ...
]

// localStorage key: `weekly_goal`
3  // number, default 3
```

### F.5 State Transition Rules

1. **Stable IDs**: Exercise IDs use the format `d{day}-{slug}` and never change. This ensures localStorage data remains valid across code updates.

2. **Session progress ↔ date association**: A session is associated with the date it was *started*. If a workout is started at 11:50 PM and finished at 12:10 AM, the training date uses the *start* date.

3. **Completion calculation**: An exercise is "complete" when:
   - For set-based exercises: all sets are in `completedSets[exerciseId]`.
   - For duration-based exercises (warm-up, cool-down, plank): the user manually marks them complete.
   - A workout is "complete" when the user explicitly finishes it (not auto-complete when all exercises are done; show a "Finish Workout" button that becomes enabled).

4. **Completed vs. unfinished**: `isComplete === true` and `completedAt !== null` = completed workout. Otherwise, unfinished (can be resumed).

5. **Session resume**: On loading the workout page, check localStorage for an existing session for this `dayId`. If `isComplete === false`, restore the session state. If `isComplete === true`, show a "Start New Workout" option.

6. **Data save**: Save to localStorage on every set toggle, exercise completion, and session status change. Use the `storage.js` utility.

7. **Data restore**: On page load, read from localStorage. If data is missing, start with empty state. If data is malformed (JSON parse error, wrong shape), log a warning and start with empty state (do not crash).

8. **Duplicate training dates**: When recording a completion, add the date string to the `training_dates` Set. Since it's a Set (serialized as array with deduplication on load), the same date is never counted twice.

9. **Invalid/outdated data**: If localStorage contains exercise IDs that no longer exist in the workout definition, those IDs are ignored. If it's missing exercises that now exist, those exercises start as incomplete.

10. **Day 1 and Day 2 independence**: Use separate localStorage keys: `session_day1` and `session_day2`. Their completion states are entirely independent.

---

## Section G — Mobile-First Design System

### G.1 Color Tokens (from AGENTS.MD specification)

```css
:root {
  /* Primary palette */
  --color-primary: #E879A9;           /* Soft rose pink */
  --color-primary-light: #F4A7C6;     /* Lighter tint for hover/active */
  --color-primary-dark: #D45A8A;      /* Darker shade for pressed states */
  --color-secondary: #B9A6E8;         /* Lavender */
  --color-secondary-light: #D4C9F2;
  --color-accent: #FFC6A8;            /* Peach */
  --color-accent-light: #FFE0CC;

  /* Backgrounds */
  --color-bg: #FFF9FC;                /* Warm off-white */
  --color-bg-card: #FFFFFF;           /* Card background */
  --color-bg-card-hover: #FFF5F9;     /* Subtle hover on cards */

  /* Text */
  --color-text-primary: #34243B;      /* Deep plum */
  --color-text-secondary: #7A6B82;    /* Muted mauve-gray */
  --color-text-muted: #A89BB2;        /* Even more muted */
  --color-text-inverse: #FFFFFF;

  /* Semantic */
  --color-success: #22C55E;           /* Accessible green */
  --color-success-bg: #F0FDF4;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* Borders */
  --color-border: #F3E8EF;            /* Very light pink-gray */
  --color-border-strong: #E8D5E0;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(52, 36, 59, 0.05);
  --shadow-md: 0 4px 6px rgba(52, 36, 59, 0.07);
  --shadow-lg: 0 10px 15px rgba(52, 36, 59, 0.1);

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
}
```

### G.2 Tailwind CSS Configuration

Use `@tailwindcss/vite` plugin for Vite 8 integration. Extend the Tailwind theme with the design tokens above. The `index.css` should use `@import "tailwindcss"` (Tailwind v4 syntax) or `@tailwind base; @tailwind components; @tailwind utilities;` (v3 syntax) depending on which version is installed.

### G.3 Typography

- Body: 16px base, system sans-serif stack (Inter preferred if loading a web font).
- Headings: semibold to bold, using the primary text color.
- Exercise instructions: 14–16px, relaxed line height (1.5–1.6).
- Labels/badges: 12–14px, uppercase or small-caps for categories.

### G.4 Card Styles

- White background, `--radius-md` (12px) corner radius.
- `--shadow-sm` default, `--shadow-md` on hover/focus.
- Padding: 16px mobile, 20–24px desktop.
- Full width on mobile (minus page padding).
- Max width ~600px on wider screens.

### G.5 Buttons

- Primary: `--color-primary` background, white text, `--radius-full` (pill shape), min 44px height.
- Secondary: outline style with `--color-primary` border and text.
- Set-complete toggles: circular or square checkboxes, 44×44px minimum tap target.
- Pressed state: scale(0.97) + slightly darker color.
- Disabled state: reduced opacity.

### G.6 Completion Indicators

- Incomplete set: outlined circle/square, border color.
- Completed set: filled circle/square with check icon, `--color-success` or `--color-primary`.
- Completed exercise: card border or background changes subtly, check badge visible.
- Do not use color alone — always include a check icon or text change.

### G.7 Progress Bars

- Height: 8px mobile, 10px desktop.
- Background: `--color-border`.
- Fill: gradient from `--color-primary` to `--color-secondary`.
- Animated fill transitions (200–300ms ease).
- Rounded ends (`--radius-full`).

### G.8 Calendar States

| State | Visual |
|---|---|
| Normal day | Light background, regular text |
| Today | Primary color ring/border, bold text |
| Completed training day | Success color fill or check badge |
| Today + completed | Primary ring + success check |
| Past empty day | Muted text |
| Future day | Light text, non-interactive |

### G.9 Exercise Images

- Aspect ratio: 16:9 or 4:3, consistent across all exercise cards.
- `object-fit: cover` with center positioning.
- Rounded top corners matching card radius.
- Loading skeleton: pulsing gray rectangle.
- Fallback: colored placeholder with exercise name and muscle icon.

### G.10 Navigation

- **Mobile (< 768px)**: Fixed bottom bar, 56–64px height, respects safe-area-inset-bottom. 4 items evenly spaced. Active item highlighted with primary color. Body has `padding-bottom` to account for nav height.
- **Desktop (≥ 768px)**: Can remain as bottom bar or transform to a top horizontal bar. Simpler to keep bottom bar for consistency.

### G.11 Responsive Verification Checklist

Test at these widths:
- 320px (iPhone SE)
- 375px (iPhone 12 mini)
- 390px (iPhone 14)
- 430px (iPhone 14 Pro Max)
- 768px (iPad)
- 1024px+ (desktop)

Requirements at all widths:
- No horizontal overflow (`overflow-x` must never scroll).
- Touch targets ≥ 44×44px.
- No hover-only functionality.
- Readable font sizes (≥ 14px for body text).
- Accessible contrast (WCAG AA: 4.5:1 for normal text).
- Consistent image aspect ratios (no stretched or squished images).
- `prefers-reduced-motion` support: skip or reduce all animations.
- No layout shifts from image loading (use aspect-ratio or fixed-dimension containers).

---

## Section H — Exercise Image and Animation Strategy

### H.1 Approach

The project has **zero exercise images** currently. The implementation agent must provide visuals for every exercise.

**Recommended approach:**

1. **Create simple, clean SVG placeholder illustrations** for each exercise. These should:
   - Use a consistent stick-figure or simplified-body style.
   - Show the correct body position for the exercise.
   - Use the app's color palette (primary/secondary colors).
   - Be lightweight and guaranteed to load.

2. **Store SVGs in `public/images/exercises/`** with filenames matching exercise IDs:
   - `d1-warmup.svg`, `d1-bodyweight-squat.svg`, etc.

3. **Alternative**: Use a single fallback component (`ExerciseImage.jsx`) that:
   - Attempts to load from the local path.
   - On error, renders a styled placeholder with the exercise name, primary muscle icon, and category color.
   - Never shows a broken image icon.

### H.2 Per-Exercise Visual Requirements

| Exercise ID | Movement to Depict | Critical Body Positions | Preferred View |
|---|---|---|---|
| `d1-warmup` | Marching, arm circles, leg swings | Standing, arms moving | Front/three-quarter |
| `d1-bodyweight-squat` | Squat descent and ascent | Feet grounded, knees aligned with toes, hip hinge | Side view |
| `d1-glute-bridge` | Lying on back, hips raised | Back on floor, knees bent, hips at top | Side view |
| `d1-donkey-kicks` | Quadruped, lifting one leg | Hands under shoulders, knees under hips, one leg raised | Three-quarter/side |
| `d1-reverse-lunge` | Stepping back, lowering | One foot forward, one back, holding wall | Side view |
| `d1-calf-raises` | Standing, rising on toes | Heels elevated, body upright | Side/rear view |
| `d1-dead-bug` | Supine, extending opposite limbs | Back flat, one arm + opposite leg extended | Angled overhead |
| `d1-cooldown` | Gentle stretching | Relaxed, comfortable positions | Front/three-quarter |
| `d2-warmup` | Arm circles, shoulder rolls | Standing, arms moving | Front/three-quarter |
| `d2-wall-pushups` | Leaning into wall, pushing away | Hands on wall, body aligned | Side view |
| `d2-prone-w-raises` | Face-down, arms in W, lifting | Lying prone, elbows bent upward | Three-quarter overhead |
| `d2-reverse-snow-angels` | Face-down, arms sweeping | Lying prone, arms arc overhead | Overhead/three-quarter |
| `d2-wall-slides` | Standing at wall, sliding arms up | Back near wall, arms W → overhead | Side/rear view |
| `d2-biceps-curl` | Self-resisted curl | One arm curling, other hand resisting | Front/three-quarter |
| `d2-close-grip-pushups` | Close-grip wall push-up | Hands shoulder-width on wall, elbows close | Side view |
| `d2-knee-plank` | Forearm plank on knees | Forearms down, knees down, body aligned | Side view |
| `d2-cooldown` | Upper body stretches | Chest/shoulder/back stretches | Front/three-quarter |

### H.3 Image Search Queries (preserved from source)

These are preserved verbatim for each exercise in Section D tables above. The implementation agent may use them if sourcing external images, but **must not hotlink to external URLs without verification**. Prefer generating local SVG assets.

### H.4 Important Distinctions

- **CSS hover animation ≠ exercise demonstration.** A card that lifts on hover is not showing the user how to do a Glute Bridge. Exercise images must depict the actual movement.
- **Generic fitness image ≠ exercise-specific image.** A photo of someone running is not valid for Dead Bug. Each exercise needs its own relevant visual.
- **Placeholder with exercise name > broken image link.** If a proper illustration cannot be provided, use a styled placeholder that clearly names the exercise and shows the target muscles. This is more useful than a broken `<img>`.

### H.5 Aspect Ratios and Loading

- Container: use `aspect-ratio: 16/9` or `aspect-ratio: 4/3` CSS on the image container.
- This prevents layout shifts.
- Loading state: show a pulsing skeleton rectangle.
- Error state: show the placeholder component.
- Alt text: descriptive, e.g., "Bodyweight Squat — Side view showing proper form with feet shoulder-width apart".

---

## Section I — Implementation Phases

### Phase 1: Repository Preparation

**Objective:** Install dependencies, configure Tailwind CSS, set up routing, replace starter template.

**Files involved:**
- `package.json` (add dependencies)
- `vite.config.js` (add Tailwind plugin)
- `src/index.css` (replace with Tailwind directives + design tokens)
- `src/App.jsx` (replace with Router setup)
- `src/App.css` (delete or empty — use Tailwind instead)
- `index.html` (update title to "FitFlow — Home Workout Tracker" or similar)

**Tasks:**
1. `npm install react-router-dom lucide-react motion`
2. `npm install -D tailwindcss @tailwindcss/vite`
3. Add `tailwindcss()` to Vite config plugins.
4. Replace `index.css` with Tailwind directives and CSS custom properties for design tokens.
5. Replace `App.jsx` with `BrowserRouter` + `Routes` + `Layout`.
6. Create `pages/DashboardPage.jsx` as a minimal placeholder ("Dashboard coming soon").
7. Create `components/layout/Layout.jsx` and `components/layout/BottomNav.jsx`.
8. Verify the app launches with `npm run dev`.

**Dependencies:** None (first phase).

**Acceptance criteria:**
- `npm run dev` starts successfully.
- App renders at `/` with the layout shell and bottom nav.
- Navigation links exist for all 4 tabs.
- Tailwind classes work.
- No console errors.

---

### Phase 2: Workout Data Models

**Objective:** Create the canonical workout data module with all Day 1 and Day 2 exercises.

**Files involved:**
- `src/data/workouts.js`

**Tasks:**
1. Create `src/data/workouts.js` with the `WORKOUTS` object containing `day1` and `day2`.
2. Populate all exercise objects per Section D of this plan.
3. Ensure all IDs are stable and unique.
4. Ensure all fields match the schema in Section F.2.
5. Export helper functions: `getWorkout(dayId)`, `getExercise(dayId, exerciseId)`, `getTrackableExercises(dayId)` (excludes warm-up/cool-down from set tracking).

**Dependencies:** None.

**Acceptance criteria:**
- Data module imports without errors.
- Both workouts have the correct number of exercises (Day 1: 8, Day 2: 9).
- Every exercise has all required fields.
- Exercise order matches the source specification.
- No duplicate IDs.

---

### Phase 3: Application Layout, Navigation, and Design System

**Objective:** Build the responsive layout shell, navigation, and global styles.

**Files involved:**
- `src/components/layout/Layout.jsx`
- `src/components/layout/BottomNav.jsx`
- `src/index.css`
- `src/App.jsx`

**Tasks:**
1. Implement `Layout.jsx` with responsive container (max-width, padding, background).
2. Implement `BottomNav.jsx` with 4 navigation items, active state highlighting, Lucide icons.
3. Set up all routes in `App.jsx`.
4. Ensure bottom nav is fixed, doesn't overlap content (add bottom padding to main).
5. Ensure responsive behavior at all checkpoint widths.
6. Configure the CSS design tokens from Section G.1.

**Dependencies:** Phase 1.

**Acceptance criteria:**
- Navigation works between all 4 pages (even if pages are placeholders).
- Active nav item is highlighted.
- Layout is centered, responsive, no horizontal overflow.
- Bottom nav is fixed and visible on mobile.
- Touch targets are ≥ 44px.

---

### Phase 4: Dashboard Page

**Objective:** Build the home dashboard with workout cards and weekly strip.

**Files involved:**
- `src/pages/DashboardPage.jsx`
- `src/components/calendar/WeekStrip.jsx`
- `src/components/ui/ProgressBar.jsx`

**Tasks:**
1. Implement greeting header with current date.
2. Implement workout cards for Day 1 and Day 2 with "Start Workout" buttons.
3. Show workout metadata (name, difficulty, location, duration, exercise count).
4. Implement `WeekStrip.jsx` showing the current week (Mon–Sun).
5. Implement `ProgressBar.jsx` for weekly progress.
6. Show weekly consistency: "X of Y workouts completed."
7. Add a motivational message section.
8. "Start Workout" navigates to `/workout/day1` or `/workout/day2`.

**Dependencies:** Phase 2, Phase 3.

**Acceptance criteria:**
- Dashboard renders with real workout data from `workouts.js`.
- Both workout days are accessible.
- Weekly strip shows the correct current week.
- Progress reflects actual localStorage data (empty initially).
- Navigation to workout pages works.

---

### Phase 5: Workout Session Page and Exercise Cards

**Objective:** Build the core workout experience with exercise cards and set tracking.

**Files involved:**
- `src/pages/WorkoutPage.jsx`
- `src/components/workout/WorkoutHeader.jsx`
- `src/components/workout/ExerciseCard.jsx`
- `src/components/workout/SetTracker.jsx`
- `src/components/workout/UnilateralBadge.jsx`
- `src/components/ui/ExerciseImage.jsx`
- `src/hooks/useWorkoutSession.js`

**Tasks:**
1. `WorkoutPage.jsx`: reads `dayId` from URL params, loads workout from data, renders header + exercise list.
2. `useWorkoutSession.js`: manages session state (completed sets, exercises), persists to localStorage.
3. `WorkoutHeader.jsx`: displays workout name, progress bar, "X/Y exercises".
4. `ExerciseCard.jsx`: renders exercise info, image, instructions (collapsible), set tracker.
5. `SetTracker.jsx`: renders per-set buttons, handles toggle/undo.
6. `UnilateralBadge.jsx`: shows "per leg" / "per arm" / "per side" badge.
7. `ExerciseImage.jsx`: loads image with fallback placeholder.
8. For duration-based exercises (warm-up, cool-down, plank): show a "Mark Complete" button instead of set tracker.
9. For the Knee Plank: show the duration (15–25 seconds) and a "Mark Complete" per set.

**Dependencies:** Phase 2, Phase 3.

**Acceptance criteria:**
- Both Day 1 and Day 2 workout pages render with all exercises.
- Exercise cards display correct data from `workouts.js`.
- Sets can be marked complete and undone.
- Progress bar updates immediately on set completion.
- Unilateral exercises show both-sides indicator.
- Exercise instructions expand/collapse.
- Session state persists across page navigation and refresh.
- Day 1 and Day 2 have independent session state.

---

### Phase 6: Rest Timer

**Objective:** Implement the rest timer component.

**Files involved:**
- `src/components/workout/RestTimer.jsx`
- `src/hooks/useRestTimer.js`

**Tasks:**
1. `useRestTimer.js`: implements timer logic using timestamps.
2. `RestTimer.jsx`: renders the timer UI with Start, Pause/Resume, Reset, Skip buttons.
3. Integrate into `ExerciseCard.jsx` — show rest timer after completing a set.
4. Display the configured rest duration (handle ranges by defaulting to the lower value or showing both).
5. Prevent multiple timers from running simultaneously.
6. Clean up intervals on unmount.

**Dependencies:** Phase 5.

**Acceptance criteria:**
- Timer counts down correctly from the configured rest duration.
- Pause, Resume, Reset, Skip all work.
- Timer is readable on mobile (large digits).
- Only one timer runs at a time.
- Timer cleans up on unmount (no memory leaks).

---

### Phase 7: Workout Completion, Calendar, and History

**Objective:** Connect workout completion to calendar tracking and history.

**Files involved:**
- `src/components/workout/CompletionScreen.jsx`
- `src/pages/CalendarPage.jsx`
- `src/pages/ProgressPage.jsx`
- `src/components/calendar/WeeklyCalendar.jsx`
- `src/components/progress/HistoryList.jsx`
- `src/components/progress/WeeklyGoal.jsx`
- `src/hooks/useWorkoutHistory.js`
- `src/services/storage.js`
- `src/utils/dateUtils.js`

**Tasks:**
1. `useWorkoutHistory.js`: reads/writes training dates, workout history, weekly goal from localStorage.
2. `CompletionScreen.jsx`: shown when all exercises are complete and user clicks "Finish Workout." Records training date and history entry.
3. `CalendarPage.jsx`: full weekly calendar with week navigation, training-day display, manual toggle.
4. `WeeklyCalendar.jsx`: renders 7-day calendar, highlights today, marks completed days.
5. `ProgressPage.jsx`: shows workout history list, weekly goal setting.
6. `HistoryList.jsx`: lists completed workouts with dates.
7. `WeeklyGoal.jsx`: displays and allows editing the weekly goal (default 3).
8. `dateUtils.js`: functions for week boundaries, YYYY-MM-DD formatting, week-of calculations.
9. `storage.js`: safe localStorage read/write with JSON parse error handling.

**Dependencies:** Phase 5.

**Acceptance criteria:**
- Completing a workout records the training date and adds a history entry.
- Calendar shows completed training days.
- Calendar navigation (prev/next week) works.
- Duplicate dates are not double-counted.
- Weekly progress displays correctly: "X of Y workouts completed."
- Undoing a calendar date works (manual toggle).
- History persists after refresh.
- Weekly goal is configurable and persisted.
- Empty states shown when no data exists.
- Dashboard weekly strip updates after completing a workout.

---

### Phase 8: Exercise Imagery and Visual Polish

**Objective:** Add exercise visuals and polish the UI.

**Files involved:**
- `public/images/exercises/*.svg` (create placeholder SVGs)
- `src/components/ui/ExerciseImage.jsx`
- All component files (visual refinement)

**Tasks:**
1. Create SVG placeholder illustrations for all 17 exercises. Each SVG should:
   - Be unique to the exercise.
   - Use a simplified figure showing the correct position.
   - Use the app's color palette.
   - Be ≤ 5KB each.
   - If creating 17 distinct SVGs is impractical, create styled placeholder components showing exercise name, category icon, and target muscle.
2. Update `ExerciseImage.jsx` to load from `/images/exercises/{exerciseId}.svg` with fallback.
3. Add Framer Motion / Motion animations:
   - Page transitions (fade/slide).
   - Card entrance animations (stagger).
   - Set completion feedback (scale bounce).
   - Progress bar fill animation.
   - Calendar selection animation.
4. Ensure `prefers-reduced-motion` disables animations.
5. Polish typography, spacing, colors across all pages.

**Dependencies:** Phases 5, 7.

**Acceptance criteria:**
- Every exercise has a visual (SVG illustration or styled placeholder) — no broken images.
- Animations are smooth and not distracting.
- Reduced-motion preference is respected.
- Visual design matches the specification's premium, feminine, clean aesthetic.
- No layout shifts from image loading.

---

### Phase 9: Accessibility, Responsive Verification, and Production Build

**Objective:** Final polish, accessibility, responsive testing, and build validation.

**Files involved:** All files.

**Tasks:**
1. Semantic HTML: use `<main>`, `<nav>`, `<section>`, `<button>`, `<h1>`–`<h3>` appropriately.
2. All icon-only buttons have `aria-label`.
3. Keyboard navigation works: Tab, Enter, Space, Escape.
4. Visible focus indicators on all interactive elements.
5. Color contrast meets WCAG AA (4.5:1 for text).
6. Screen-reader labels for set completion state changes.
7. Test at all 6 viewport widths (320, 375, 390, 430, 768, 1024+).
8. Fix any horizontal overflow issues.
9. Ensure no hover-only interactions.
10. Run `npm run build` — fix any errors.
11. Run `npm run lint` — fix any errors.
12. Test the production build with `npm run preview`.
13. Verify all workflows:
    - Start a workout → complete sets → complete workout → see calendar/history update.
    - Refresh mid-session → session resumes.
    - Complete same workout on same day → no double count.
    - Navigate between Day 1 and Day 2 → independent state.

**Dependencies:** All previous phases.

**Acceptance criteria:** See Section J.

---

## Section J — Acceptance Criteria

The implementation agent must verify every item below before declaring the project complete. Mark each as ✅ when verified.

### Core Functionality

- [ ] The app launches successfully with `npm run dev`.
- [ ] `npm run build` succeeds without errors.
- [ ] `npm run lint` passes (or all lint errors are resolved).
- [ ] Both Day 1 and Day 2 workouts are accessible from the dashboard and navigation.
- [ ] Exercise details (name, sets, reps, rest, muscles, instructions) match the source specification in Section D.
- [ ] Every exercise has a relevant visual or a clearly designed placeholder fallback (no broken images).
- [ ] Sets can be marked complete by tapping/clicking.
- [ ] Completed sets can be undone (toggled back to incomplete).
- [ ] Unilateral exercises clearly indicate "per leg" / "per arm" / "per side."
- [ ] Session progress bar and exercise count update correctly when sets are completed.
- [ ] The rest timer starts, pauses, resumes, resets, and can be skipped.
- [ ] Only one rest timer runs at a time.
- [ ] Unfinished workouts can be resumed after navigating away or refreshing the page.
- [ ] Completing a workout updates the weekly calendar and workout history.
- [ ] Calendar shows the current week with correct days.
- [ ] Calendar navigation (previous/next week) works.
- [ ] Completing the same workout twice on the same day does not double-count the training date in weekly progress.
- [ ] Workout history persists after page refresh.
- [ ] Weekly goals are configurable (default: 3).
- [ ] Day 1 and Day 2 session state are independent.
- [ ] Warm-up and cool-down exercises are displayed (not omitted).
- [ ] Duration-based exercises (warm-up, cool-down, Knee Plank) have appropriate completion controls.

### Responsive & Mobile

- [ ] The interface is usable at 320px width.
- [ ] The interface is usable at 375px width.
- [ ] The interface is usable at 390px width.
- [ ] The interface is usable at 430px width.
- [ ] The interface is usable at 768px width.
- [ ] The interface is usable at 1024px+ (desktop).
- [ ] No horizontal scrollbar/overflow at any tested width.
- [ ] All buttons and interactive controls have ≥ 44×44px tap targets.
- [ ] Bottom navigation does not overlap main content.

### Accessibility & Quality

- [ ] All navigation links work (no dead links or empty pages).
- [ ] No core features are left as placeholders or TODOs.
- [ ] Semantic HTML elements are used (buttons, headings, nav, main).
- [ ] Icon-only buttons have accessible labels.
- [ ] Focus indicators are visible.
- [ ] Color is not the only indicator of completion (icons/text are also used).
- [ ] `prefers-reduced-motion` reduces or disables animations.
- [ ] No hover-only functionality.
- [ ] Empty states are handled (no data, no history, no completed workouts).

### Data Integrity

- [ ] localStorage data survives page refresh.
- [ ] Malformed or missing localStorage data does not crash the app.
- [ ] Training dates use YYYY-MM-DD format.
- [ ] Session data is associated with the correct workout day.

### Honestly Reported

- [ ] Any verification that could not actually be performed is documented.
- [ ] Any remaining limitations are listed.

---

## Section K — Final Handoff Instructions

### For the Implementation Agent:

1. **Read this `IMPLEMENTATION_PLAN.md` completely** before making any changes.

2. **Inspect the actual codebase** at `/home/ali/projects/training/training/`. The project is a fresh Vite + React 19 starter. The `App.jsx`, `App.css`, and `index.css` contain only demo content and should be replaced.

3. **Implement the application in phase order** (Phase 1 → Phase 9). Each phase builds on the previous one. Do not skip ahead.

4. **Reuse the existing technology stack**: React 19, Vite 8, JavaScript (JSX), the existing `vite.config.js` (add Tailwind plugin), and the existing `eslint.config.js`.

5. **Do not modify** `AGENTS.MD` or `Exercices.md`. These are source specifications, not application code.

6. **Install only these additional packages:**
   - `react-router-dom`
   - `tailwindcss` and `@tailwindcss/vite`
   - `lucide-react`
   - `motion` (Framer Motion for React 19)

7. **Run build and lint after implementation:**
   ```bash
   npm run build
   npm run lint
   ```
   Fix any errors before declaring completion.

8. **Fix any errors introduced by your changes.** Do not leave broken imports, missing components, or console errors.

9. **Verify important workflows:**
   - Start workout → complete sets → complete workout → check calendar/history.
   - Refresh during a session → session resumes.
   - Complete workout twice on same day → one training date counted.
   - Switch between Day 1 and Day 2 → independent state.

10. **Test responsive layouts** at 320px, 375px, 390px, 430px, 768px, and desktop widths. Fix any horizontal overflow or unusable controls.

11. **Summarize your work**: list files created/modified, functionality completed, commands run and their results, and any remaining limitations.

**You must implement the application. Do not rewrite this plan or return another proposal. Build it.**

---

## Appendix: Specification Conflict Resolution

| Topic | AGENTS.MD says | Exercices.md says | Resolution |
|---|---|---|---|
| **Number of workout days** | Mentions one workout (Day 1: legs/glutes/calves/abs) in Section 9 | Defines Day 1 AND Day 2 (upper body & core) | **Both days must be implemented.** AGENTS.MD Section 9 is the initial/example content; Exercices.md expands to include Day 2. |
| **Exercise images** | Use real, accurate exercise visuals; prefer local assets | Provides image search queries and embedded OpenAI URLs | **Use local SVG illustrations or styled placeholders.** Do not hotlink to the OpenAI image URLs from the Exercices.md (they are illustrative, not guaranteed stable). Preserve the imageSearchQuery field for reference. |
| **Tailwind CSS** | Specifies Tailwind CSS | Not mentioned | **Use Tailwind CSS.** It must be installed since it's not in the current dependencies. |
| **Rest duration representation** | Not specified | Some exercises use ranges (e.g., "60–90 seconds") | **Store as array `[min, max]`.** Display as "60–90s" in UI. Timer defaults to the lower bound or lets user choose. |
| **Rep range representation** | Not specified | Uses ranges like "10–12" | **Store as string `"10–12"`.** Display the range. Do not display a single number as if it's the only target. |
| **Warm-up/cool-down tracking** | Implies these are exercises that can be completed | Defined as duration-based exercises | **Show as exercise cards with a "Mark Complete" button** instead of set tracking. |
| **Weekly goal default** | "sensible beginner default such as three days per week" | Not specified | **Default to 3.** |
| **Day 2 equipment** | Section 9 lists "chair or wall for support" for Day 1 | Day 2 explicitly states "No exercise equipment whatsoever" — no chairs as anchors | **Day 1 allows chair/wall support. Day 2 allows only wall (for wall push-ups/slides) and mat. Follow each day's constraints independently.** |
