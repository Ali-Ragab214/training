/**
 * Reusable animated progress bar (Section G.7).
 * `ratio` and `total`/`value` are both accepted; clamp to [0, 1].
 */
export default function ProgressBar({ value, total, ratio, label, height = 8 }) {
  const raw =
    ratio != null ? ratio : total > 0 ? Math.min(value, total) / total : 0
  const pct = Math.round(Math.min(1, Math.max(0, raw)) * 100)

  return (
    <div
      className="w-full overflow-hidden rounded-full bg-line"
      style={{ height }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
    >
      <div
        className="progress-fill h-full rounded-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
