// Date helpers — all dates are LOCAL dates serialized as YYYY-MM-DD.

export function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayISO() {
  return toISODate(new Date())
}

export function parseISODate(iso) {
  // Parse a YYYY-MM-DD string as a local date (avoids UTC off-by-one).
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function isValidISODate(iso) {
  return (
    typeof iso === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(iso) &&
    !Number.isNaN(parseISODate(iso).getTime())
  )
}

/** Monday-based start of the week containing `date`. */
export function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay() // 0 = Sunday … 6 = Saturday
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Array of 7 local dates (Mon–Sun) for the week containing `date`,
 * shifted by `weekOffset` weeks (0 = current week).
 */
export function getWeekDates(date, weekOffset = 0) {
  const start = startOfWeek(date)
  start.setDate(start.getDate() + weekOffset * 7)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

export function formatPrettyDate(iso) {
  return parseISODate(iso).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

export function formatShortDate(iso) {
  return parseISODate(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export function formatTodayGreeting() {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

/** Time ago in words, coarse (minutes/hours/days). */
export function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.round(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  return formatShortDate(toISODate(new Date(timestamp)))
}
