# AGENTS.md — Beginner Fitness & Workout Web App

## 1. Your Role and Mission

Act as a senior frontend engineer, UI/UX designer, and product-minded React developer.

Your mission is to build a polished, production-quality, mobile-first fitness web application designed primarily for a beginner female user who exercises at home.

The application helps the user:
- Follow a structured home workout for legs, glutes, calves, and abs.
- Understand how to perform each exercise using clear visual demonstrations.
- Track sets, repetitions, rest periods, and exercise completion.
- Record which days she trained during each week.
- Monitor weekly workout consistency and overall progress.

This must be a real, functional application, not just a static landing page, mockup, or collection of decorative cards.

Before making changes:
1. Inspect the existing project structure and read the current source code.
2. Identify the installed dependencies, routing setup, styling approach, existing components, and available assets.
3. Preserve working functionality and follow the conventions already established in the project.
4. Do not replace the existing project architecture or configuration without a good reason.
5. Create an implementation plan, then implement the complete experience.
6. Do not stop after creating a plan or a basic UI skeleton.

If the project is empty, initialize a clean React application using the stack below.

## 2. Technology Stack

Preferred stack:
- React with JavaScript.
- Vite, if the project already uses Vite or needs initialization.
- Tailwind CSS, using the version and configuration compatible with the existing project.
- React Router for navigation when multiple pages are needed.
- Lucide React for icons.
- Framer Motion or Motion for React animations, if compatible with the project.
- React hooks for local UI state.

Architecture guidelines:
- Use reusable functional components.
- Separate UI components, pages, hooks, data, utilities, and styles logically.
- Keep workout content in structured data objects rather than hardcoding repeated markup.
- Avoid oversized components that mix unrelated responsibilities.
- Use semantic HTML and accessible interactive controls.
- Use JavaScript unless the existing project explicitly uses TypeScript.
- Do not install redundant libraries when equivalent dependencies already exist.

For persistence:
- Use localStorage for workout completion, training dates, and user preferences if no backend exists.
- Store dates in a consistent local-calendar format such as YYYY-MM-DD.
- Persist changes immediately and restore saved data after refreshing the page.
- Handle missing, malformed, or outdated stored data safely.
- Keep the data layer structured so localStorage can later be replaced by a REST API.
- Never imply that data is synchronized between devices or accounts when it is stored only locally.

## 3. Design Direction and Visual Identity

Create an elegant, feminine, modern fitness experience.

The visual design should feel premium, friendly, encouraging, clean, and energetic — not childish, overly decorative, or excessively pink.

Suggested color palette:
- Primary: soft rose pink, approximately #E879A9.
- Secondary: lavender, approximately #B9A6E8.
- Accent: peach, approximately #FFC6A8.
- Background: warm off-white, approximately #FFF9FC.
- Card background: white.
- Primary text: deep plum, approximately #34243B.
- Secondary text: muted mauve-gray.
- Success: accessible green.
- Borders: very light pink-gray.

Use CSS variables or a consistent design-token system for colors, spacing, radii, shadows, and typography.

Visual guidelines:
- Use rounded cards with consistent corner radii.
- Apply subtle, soft shadows instead of heavy shadows.
- Use generous spacing and clear visual hierarchy.
- Use a modern, readable font with strong support for mobile screens.
- Keep headings, labels, buttons, icons, and spacing visually consistent.
- Use gradients sparingly for hero sections or important highlights.
- Use icons only when they improve clarity.
- Use attractive exercise photography or illustrations with consistent styling.
- Avoid clutter, excessive gradients, excessive borders, and unnecessary UI elements.

The result should look like a real fitness product designed by a professional product team.

## 4. Mobile-First and Responsive Requirements

Mobile is the primary target device. Design for a narrow mobile viewport first, then progressively enhance the layout for tablets and desktops.

Prioritize these viewport widths:
- 320–375px: small phones.
- 390–430px: common modern phones.
- 768px: tablets.
- 1024px and above: desktops.

Mandatory requirements:
- No horizontal page overflow.
- No clipped text, overlapping elements, or broken cards.
- Buttons and touch targets should generally be at least 44 × 44 CSS pixels.
- Use readable font sizes and sufficient contrast.
- Keep the main workout actions reachable with one hand.
- Make exercise instructions readable without excessive scrolling inside individual cards.
- Use fluid widths, responsive grids, and sensible maximum content widths.
- Ensure dialogs, dropdowns, and timers work correctly on touch devices.
- Avoid hover-only interactions; all important actions must work on touchscreens.
- Use responsive image aspect ratios and object-fit behavior.
- Respect mobile safe areas when using fixed bottom navigation or sticky controls.
- Test the application at mobile sizes rather than assuming desktop CSS will scale correctly.

On mobile, use a single-column workout layout and compact cards. On wider screens, introduce additional columns only when they improve usability.

## 5. Application Structure and Navigation

Build a coherent application with these primary sections:

1. Home / Dashboard.
2. Weekly Calendar.
3. Workout Session.
4. Progress / History.
5. Settings, only if needed.

Prefer a simple bottom navigation bar on mobile:
- Home.
- Workout.
- Calendar.
- Progress.

Use an appropriate desktop navigation layout on larger screens.

Navigation must work. Do not create links that lead to empty pages or buttons that do nothing.

## 6. Home Dashboard

Create a welcoming dashboard containing:

### Header
- A short, friendly greeting.
- The current date.
- A simple profile/avatar element if appropriate.
- A clean, uncluttered header.

### Today's Workout Card
Display:
- Workout name: Legs, Glutes, Calves & Abs.
- Difficulty: Beginner.
- Location: Home.
- Estimated duration: approximately 30–40 minutes.
- Number of exercises.
- A prominent "Start Workout" or "Continue Workout" button.

The primary action must navigate to the actual workout experience.

### Weekly Consistency
Display:
- A seven-day weekly strip.
- The current day clearly highlighted.
- Training days marked with a check or visual indicator.
- A weekly workout count, such as "2 of 4 workouts completed", using the actual configured weekly goal.
- A progress indicator derived from saved data.

Do not invent completed workouts or display hardcoded progress as if it were real user activity.

### Motivational Message
Show a short, supportive message that encourages consistency without shaming the user for missed sessions.

## 7. Weekly Calendar and Workout Tracking

Implement a functional weekly calendar.

Requirements:
- Show all seven days of the selected week.
- Allow navigation to previous and next weeks.
- Highlight today's date.
- Allow the user to mark a day as a completed training day.
- Display completed training days visually.
- Distinguish the current day from completed workout days.
- Show the number of completed workouts for the selected week.
- Prevent accidental duplicate counting when the same date is marked more than once.
- Allow the user to undo a completion.
- Allow the user to view workout history by date.
- Keep past weeks accessible.
- Persist calendar changes in localStorage.

A training day must not be marked completed merely because the user opened the workout page.

Only record a completed workout when the user explicitly finishes it, or when she manually marks the day as trained.

If the user completes the same workout twice on the same day, avoid double-counting the day in the weekly consistency metric. If session history is supported, store separate session records while counting distinct training dates separately.

Allow the user to configure a weekly workout goal, with a sensible beginner default such as three days per week.

Do not require the user to train every day.

## 8. Workout Session Experience

Build a fully functional workout session page.

### Workout Header
Display:
- Workout name.
- Difficulty.
- Estimated duration.
- Progress through the session.
- Completed exercises versus total exercises.
- A progress bar.

### Exercise Cards

Every exercise must have its own card containing:
- Exercise name.
- Exercise image or animated demonstration.
- Exercise order.
- Target muscle groups.
- Sets.
- Repetitions or duration.
- Rest duration.
- Clear instructions.
- Completion controls.
- An expand/collapse option for detailed instructions if useful.

Use consistent image sizes and aspect ratios.

Do not use the same generic fitness image for every exercise.

### Set Tracking

For exercises with multiple sets:
- Display each set individually.
- Provide a checkbox or button to mark each set complete.
- Show the set number, target repetitions, and completion state.
- Allow the user to undo a completed set.
- Update workout progress immediately.
- Clearly distinguish an incomplete set from a completed set.
- Avoid marking an entire exercise completed before all its required sets are complete, unless the user explicitly chooses a manual completion action.

For unilateral exercises, such as Donkey Kicks and Reverse Lunges:
- Clearly state that both legs must be trained.
- Display repetitions per leg.
- Provide a usable way to track both sides, where appropriate.

Keep these controls compact and easy to tap on mobile.

### Exercise Completion

Each exercise should have an explicit completion indicator.

When an exercise is complete:
- Update the UI immediately.
- Provide subtle visual feedback.
- Update overall workout progress.
- Preserve the completed state when the user navigates away and returns.

### Rest Timer

Implement a working rest timer:
- Use the configured rest duration for each exercise.
- Provide Start, Pause, Resume, and Reset controls.
- Show the remaining time clearly.
- Provide a skip-rest option.
- Make the timer readable on mobile.
- Prevent multiple timer instances from running simultaneously.
- Clean up intervals or timers correctly when components unmount.
- Do not assume that a timer continues accurately in the background if the browser suspends the page; calculate remaining time using timestamps when practical.

### Session Controls

Include:
- Start workout.
- Pause workout or leave the session safely.
- Resume an unfinished workout.
- Finish workout.
- Confirmation before discarding or resetting progress.

On completion:
- Display a completion screen.
- Show the actual number of exercises and sets completed.
- Record the training date.
- Update weekly progress and workout history.
- Provide an option to return to the dashboard.

## 9. Initial Workout Data

Use the following structured workout as the initial content.

### 1. Warm-up & Dynamic Mobility
- Duration: 5–7 minutes.
- March in Place: 60 seconds.
- Arm Circles: 30 seconds.
- Hip Circles: 30 seconds.
- Supported Leg Swings: 10 repetitions per leg.
- Easy Bodyweight Squats: 8 repetitions.
- Purpose: prepare the body for exercise with gentle movement.

### 2. Bodyweight Squat
- Sets: 2.
- Reps: 10–12.
- Rest: 60–90 seconds.
- Target muscles: quadriceps and glutes.
- Easier variation: Chair Squat.

### 3. Glute Bridge
- Sets: 3.
- Reps: 12–15.
- Rest: 60 seconds.
- Target muscles: glutes and hamstrings.

### 4. Donkey Kicks
- Sets: 2.
- Reps: 10–12 per leg.
- Rest: 45–60 seconds after both legs.
- Target muscles: glutes.

### 5. Supported Reverse Lunge
- Sets: 2.
- Reps: 8 per leg.
- Rest: 60–90 seconds.
- Target muscles: quadriceps and glutes.
- Easier variation: Supported Split Squat or Chair Squat.

### 6. Standing Calf Raises
- Sets: 2.
- Reps: 12–15.
- Rest: 45–60 seconds.
- Target muscles: calves.

### 7. Dead Bug
- Sets: 2.
- Reps: 8–10 per side.
- Rest: 45–60 seconds.
- Target muscles: abdominals and core.

### 8. Cool-down
- Duration: 3–5 minutes.
- Include gentle walking and comfortable quadriceps, hamstring, and glute stretches.
- Never force a stretch or continue through pain.

Store the workout and exercise information in a dedicated data module rather than scattering it throughout the components.

## 10. Exercise Images and Visual Assets

Exercise images are a core product requirement, not an optional decoration.

Each exercise must have a visual that accurately represents the named movement.

Requirements:
- Use an individual image or animation for each exercise.
- Prefer clear, instructional fitness illustrations or verified exercise demonstration assets.
- Keep the visual style consistent throughout the application.
- Use a descriptive alt attribute for accessibility.
- Use object-fit: cover or contain appropriately.
- Avoid distorted bodies, cropped movement-critical joints, or unrelated poses.
- Include loading and fallback states.
- Avoid broken image URLs.
- Do not use the TikTok thumbnail or a random image as a substitute for a verified exercise demonstration.
- Do not assume that a remote image URL exists without checking it.
- Do not embed huge base64 images directly in React components.
- Prefer locally stored assets or reliable, appropriately licensed image sources.
- If images are unavailable, use a proper local SVG illustration or a clearly designed placeholder, not a broken image icon.

For every exercise, maintain a descriptive asset reference in the workout data.

If suitable existing project assets are available, reuse them. Otherwise, create or source appropriate visuals for each movement and keep their filenames and references organized.

The visual for Bodyweight Squat must demonstrate a squat. The visual for Glute Bridge must show the person lying on the back and lifting the hips. Donkey Kicks must show the quadruped position. Dead Bug must show the person lying on the back with opposite arm and leg movements.

## 11. Animation and Microinteractions

Make the experience smooth and polished without sacrificing performance.

Use animations for:
- Page transitions where appropriate.
- Card entrances.
- Button hover and pressed states.
- Expanding exercise instructions.
- Progress bar updates.
- Set completion feedback.
- Calendar selection.
- Workout completion celebrations.
- Subtle image and card interactions.

Guidelines:
- Prefer short, smooth transitions, generally around 150–300ms.
- Use transform and opacity for performant animations.
- Keep hover effects subtle, such as a small lift or shadow change.
- Provide clear pressed states for touch devices.
- Avoid excessive bouncing, distracting effects, and unnecessary animation.
- Respect prefers-reduced-motion.
- Do not rely on hover for essential information or actions.
- Avoid layout shifts when content animates.

## 12. Accessibility and User Experience

- Use semantic headings and buttons.
- Give icon-only buttons accessible labels.
- Ensure keyboard navigation works.
- Provide visible focus indicators.
- Maintain sufficient color contrast.
- Do not use color as the only completion indicator.
- Ensure screen-reader labels describe set and exercise completion.
- Use readable language and concise instructions.
- Keep the interface encouraging and nonjudgmental.
- Include basic empty states for weeks with no workouts.
- Provide clear confirmation and feedback after important actions.

## 13. Code Quality and State Management

- Use reusable components for exercise cards, set trackers, timers, weekly calendars, progress indicators, and navigation.
- Separate workout data from rendering logic.
- Keep state changes predictable and easy to understand.
- Avoid duplicating the same workout definitions in multiple files.
- Avoid unnecessary global state management for a small application.
- Keep localStorage operations behind a small utility or persistence layer.
- Handle invalid dates and missing persisted values gracefully.
- Avoid unnecessary re-renders and expensive animation patterns.
- Do not add a backend, authentication, or a complex state library unless the existing project or a clear requirement calls for it.
- Keep dependencies minimal.
- Do not leave dead buttons, empty event handlers, placeholder routes, or TODOs for core features.

## 14. Suggested Project Organization

Adapt this structure to the existing application instead of blindly recreating it.

src/
  app/
    App.jsx
    routes.jsx
  components/
    layout/
    navigation/
    workout/
    calendar/
    progress/
    ui/
  pages/
    DashboardPage.jsx
    WorkoutPage.jsx
    CalendarPage.jsx
    ProgressPage.jsx
  data/
    workoutData.js
  hooks/
    useWorkoutSession.js
    useWorkoutHistory.js
  services/
    storageService.js
  utils/
    dateUtils.js
    workoutUtils.js
  styles/
    index.css

public/
  images/
    exercises/

Keep component names, file names, and imports consistent.

## 15. Testing and Final Verification

Before considering the task complete:

1. Install only necessary dependencies.
2. Start the development server and ensure the app launches.
3. Run the available lint and build commands.
4. Fix compilation errors, broken imports, and console errors.
5. Verify navigation across all pages.
6. Verify exercise completion and individual set tracking.
7. Verify rest timer start, pause, resume, reset, and skip.
8. Verify that data persists after refresh.
9. Verify weekly navigation, date selection, workout completion, and undo.
10. Verify that weekly counts are calculated correctly without double-counting dates.
11. Test responsive layouts at 320px, 375px, 390px, 430px, 768px, and desktop widths.
12. Check for horizontal overflow and inaccessible touch targets.
13. Verify every exercise image loads and matches its exercise.
14. Check reduced-motion behavior.
15. Confirm that the interface remains usable without hover.
16. Report any tests or browser checks that could not actually be performed.

Do not claim a test passed unless it was actually run.

## 16. Execution Instructions

Work directly in the existing repository.

First inspect the project and identify the current state. Then implement the application in logical steps, testing as you go.

Prioritize the following in order:
1. Correct and responsive application structure.
2. Functional workout and set tracking.
3. Weekly calendar and persistent workout history.
4. Correct exercise images and instructions.
5. Polished visual design and animations.
6. Accessibility, error handling, and final verification.

Make reasonable design decisions without asking unnecessary questions.

Do not stop at a design proposal. Implement the actual working application, reuse the existing stack where possible, and finish by summarizing what was built, which files were changed, which commands were tested, and any remaining limitations.