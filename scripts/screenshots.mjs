// Visual check: screenshots at mobile + desktop widths.
import { chromium } from 'playwright'

const BASE = 'http://localhost:4173'
const browser = await chromium.launch()

for (const [name, width, height] of [
  ['home-375', 375, 812],
  ['home-1280', 1280, 900],
  ['workout-375', 375, 812],
  ['calendar-375', 375, 812],
  ['timer-390', 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  if (name.startsWith('workout') || name === 'timer-390') {
    await page.goto(`${BASE}/workout/day1`, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Start Workout' }).click()
  }
  if (name.startsWith('calendar')) {
    await page.goto(`${BASE}/calendar`, { waitUntil: 'networkidle' })
  }
  if (name === 'timer-390') {
    const squat = page.locator('article').filter({ hasText: 'Bodyweight Squat' })
    await squat.getByRole('button', { name: /Set 1 of 2/ }).click()
  }
  await page.screenshot({
    path: `/tmp/opencode/${name}.png`,
    fullPage: name === 'timer-390' ? true : false,
  })
  await page.close()
}
await browser.close()
console.log('screenshots saved')
