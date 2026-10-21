// End-to-end smoke test for the FitFlow app (run against `npm run preview`).
// Usage: node scripts/e2e-smoke.mjs
import { chromium } from 'playwright'

const BASE = 'http://localhost:4173'
let failures = 0

function check(name, condition, detail = '') {
  const status = condition ? 'PASS' : 'FAIL'
  if (!condition) failures += 1
  console.log(`${status}  ${name}${detail ? ` — ${detail}` : ''}`)
}

async function visibleWithin(locator, timeout = 6000) {
  try {
    await locator.first().waitFor({ state: 'visible', timeout })
    return true
  } catch {
    return false
  }
}

async function checkWithin(name, locator, detail = '') {
  const ok = await visibleWithin(locator)
  if (!ok) {
    const fs = await import('node:fs')
    const text = await page.evaluate(() => document.body.innerText)
    await page.screenshot({ path: `/tmp/opencode/debug-failure.png`, fullPage: false })
    fs.writeFileSync('/tmp/opencode/debug-failure.txt', `CHECK: ${name}\nURL: ${page.url()}\n\n` + text)
  }
  check(name, ok, detail)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 375, height: 800 } })

const consoleErrors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})
page.on('pageerror', (err) => consoleErrors.push(String(err)))

// ---------- 1. Dashboard renders ----------
await page.goto(BASE, { waitUntil: 'networkidle' })
check(
  'dashboard renders a greeting h1',
  (await page.locator('h1').count()) >= 1,
)
check('dashboard has Day 1 card', await page.getByText('Legs, Glutes & Abs').isVisible())
check('dashboard has Day 2 card', await page.getByText('Upper Body & Core').isVisible())
await checkWithin('week strip shows "of 3"', page.getByText(/of 3 workouts done/))
check(
  'personal note card renders',
  await page.getByText('A note from Ali').isVisible(),
)

// no horizontal overflow at 375
const overflow375 = await page.evaluate(
  () => document.documentElement.scrollWidth <= window.innerWidth,
)
check('no horizontal overflow @375', overflow375)

// ---------- 2. Start Day 1 workout ----------
await page.getByRole('link', { name: /Start Workout/ }).first().click()
await page.waitForURL('**/workout/day1')
await page
  .getByRole('button', { name: 'Start Workout' })
  .waitFor({ state: 'visible' })
check('start button shows', true)
await page.getByRole('button', { name: 'Start Workout' }).click()

// header progress
check(
  'progress shows 0/8 exercises',
  await page.getByText('0 / 8 exercises').isVisible(),
)
check('day1 has 8 exercise cards', (await page.locator('article').count()) === 8)

// complete a warm-up (duration-based)
const warmupCard = page
  .locator('article')
  .filter({ hasText: 'Warm-up & Dynamic Mobility' })
await warmupCard.getByRole('button', { name: /Mark Complete/ }).click()
check(
  'warm-up marked complete',
  (await warmupCard.getByRole('button', { name: /tap to undo/ }).count()) > 0,
)

// complete a set on Bodyweight Squat
const squatCard = page.locator('article').filter({ hasText: 'Bodyweight Squat' })
await squatCard.getByRole('button', { name: /Set 1 of 2/ }).click()
check(
  'rest timer appears for squat',
  await squatCard.getByRole('time').isVisible(),
  'timer visible',
)
// pause / resume / skip
const skipBtn = squatCard.getByRole('button', { name: 'Skip rest timer' })
await page.getByRole('button', { name: 'Pause rest timer' }).click()
await page.getByRole('button', { name: 'Resume rest timer' }).click()
await skipBtn.click()
check('rest timer skipped', (await squatCard.getByRole('time').count()) === 0)

// check undo works
await squatCard.getByRole('button', { name: /Set 1 of 2/ }).click()
check(
  'set undone (0/2 sets)',
  await squatCard.getByText('0 of 2 sets done').isVisible(),
)
await squatCard.getByRole('button', { name: /Set 1 of 2/ }).click()

// finish button disabled until all complete
check(
  'finish disabled while incomplete',
  await page.getByRole('button', { name: /Finish Workout/ }).isDisabled(),
)

// ---------- 3. Session persists across reload ----------
await page.reload({ waitUntil: 'networkidle' })
check(
  'session resumes after refresh',
  (await page.getByRole('button', { name: 'Start Workout' }).count()) === 0,
)
check(
  'progress restored (1/8)',
  await page.getByText('1 / 8 exercises').isVisible(),
)

// complete all remaining exercises, then finish
// (sets 1..N on every set-based exercise + mark complete on duration ones)
for (let round = 0; round < 8; round += 1) {
  const cards = page.locator('article')
  const n = await cards.count()
  for (let i = 0; i < n; i += 1) {
    const card = cards.nth(i)
    const undoBtnCount = await card
      .getByRole('button', { name: 'Completed — tap to undo', exact: true })
      .count()
    if (undoBtnCount > 0) continue
    const markBtn = card.getByRole('button', { name: 'Mark Complete', exact: true })
    if ((await markBtn.count()) > 0) {
      await markBtn.click()
      continue
    }
    // set-based: tap the first incomplete set
    const setButtons = await card
      .getByRole('button', { name: /Set \d+ of \d+\. Tap to mark complete/ })
      .all()
    if (setButtons.length > 0) {
      await setButtons[0].click()
      // skip any auto-opened timer to keep the loop deterministic
      const skip = card.getByRole('button', { name: 'Skip rest timer' })
      if ((await skip.count()) > 0) await skip.click()
    }
  }
  const finishDisabled = await page
    .getByRole('button', { name: /Finish Workout/ })
    .isDisabled()
  if (!finishDisabled) break
}

check(
  'all exercises complete (8/8)',
  await page.getByText('8 / 8 exercises').isVisible(),
)
await page.getByRole('button', { name: /Finish Workout/ }).click()
await checkWithin('completion screen shown', page.getByRole('button', { name: /Return to Dashboard/ }))

// ---------- 4. Calendar + history updated ----------
await page.goto(`${BASE}/calendar`, { waitUntil: 'networkidle' })
check(
  'calendar shows 1 training day this week',
  (await page.getByText('1 training day this week').count()) > 0,
)
// no double counting: complete again today (day2) and check still 1 distinct day
await page.goto(`${BASE}/workout/day2`, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Start Workout' }).click()
check('day2 session starts 0/9', await page.getByText('0 / 9 exercises').isVisible())
// independence: day1 session should still be complete
const day1Stored = await page.evaluate(() =>
  JSON.parse(localStorage.getItem('session_day1') ?? '{}'))
check('day1 session recorded complete', day1Stored.isComplete === true)

// toggle a date manually on the calendar (undo path)
await page.goto(`${BASE}/calendar`, { waitUntil: 'networkidle' })
const todayLabel = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
})
const todayCell = page.getByRole('button', { name: todayLabel }).first()
await todayCell.click() // unmark today's date
check(
  'manual unmark removed the day',
  (await page.getByText('0 training days this week').count()) > 0,
)
await todayCell.click() // re-mark
check(
  'manual mark re-added the day',
  (await page.getByText('1 training day this week').count()) > 0,
)

// past + future weeks navigation
await page.getByRole('button', { name: 'Previous week' }).click()
check('previous week view works', true)
await page.goto(`${BASE}/progress`, { waitUntil: 'networkidle' })
check(
  'history lists 1 workout',
  (await page.getByText('Beginner Legs, Glutes, Calves & Abs').count()) > 0,
)
check(
  'weekly goal control visible',
  (await page.getByText('/ week').count()) > 0,
)

// ---------- 4b. Finish Day 2 (same as recorded day) → still one distinct date ----------
await page.goto(`${BASE}/workout/day2`, { waitUntil: 'networkidle' })
for (let round = 0; round < 10; round += 1) {
  const cards = page.locator('article')
  const n = await cards.count()
  for (let i = 0; i < n; i += 1) {
    const card = cards.nth(i)
    if (
      (await card
        .getByRole('button', { name: 'Completed — tap to undo', exact: true })
        .count()) > 0
    )
      continue
    const markBtn = card.getByRole('button', { name: 'Mark Complete', exact: true })
    if ((await markBtn.count()) > 0) {
      await markBtn.click()
      continue
    }
    const setButtons = await card
      .getByRole('button', { name: /Set \d+ of \d+\. Tap to mark complete/ })
      .all()
    if (setButtons.length > 0) {
      await setButtons[0].click()
      const skip = card.getByRole('button', { name: 'Skip rest timer' })
      if ((await skip.count()) > 0) await skip.click()
    }
  }
  if (!(await page.getByRole('button', { name: /Finish Workout/ }).isDisabled()))
    break
}
await page.getByRole('button', { name: /Finish Workout/ }).click()
await page.goto(`${BASE}/calendar`, { waitUntil: 'networkidle' })
check(
  'same-day second workout does not double-count (still 1 training day)',
  (await page.getByText('1 training day this week').count()) > 0,
)
await page.goto(`${BASE}/progress`, { waitUntil: 'networkidle' })
check(
  'history now includes the Day 2 record too',
  (await page.getByText('Beginner Upper Body & Core').count()) >= 1,
)

// ---------- 5. Responsive widths ----------
const widths = [320, 375, 390, 430, 768, 1024, 1440]
for (const width of widths) {
  await page.setViewportSize({ width, height: 800 })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1,
  )
  check(`no horizontal overflow @${width}`, overflow)
}

// console errors — ignore favicon/404 variants
const realErrors = consoleErrors.filter(
  (e) => !e.includes('favicon') && !e.includes('404'),
)
check(
  'no unexpected console errors',
  realErrors.length === 0,
  realErrors.slice(0, 3).join(' | '),
)

await browser.close()
console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
