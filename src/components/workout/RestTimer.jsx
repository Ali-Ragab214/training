import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react'

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * Rest countdown timer (Section E.4). Only one instance is ever mounted
 * because the parent owns the "active timer exercise" slot.
 */
export default function RestTimer({
  remaining,
  duration,
  isRunning,
  onPause,
  onResume,
  onReset,
  onSkip,
  label = 'Rest',
}) {
  const done = isActiveDone(remaining, duration)
  const ratio = duration > 0 ? remaining / duration : 0
  const timerId = 'rest-timer-display'

  return (
    <div
      className="rounded-xl border border-line bg-cream-deep/70 px-3 py-3"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {done ? 'Rest finished' : label}
        </span>
        <time
          id={timerId}
          className="font-mono text-2xl font-bold tabular-nums text-primary-dark"
        >
          {formatClock(remaining)}
        </time>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-secondary transition-[width] duration-200 ease-linear"
          style={{ width: `${Math.round(ratio * 100)}%` }}
        />
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {isRunning ? (
          <TimerButton onClick={onPause} label="Pause rest timer" icon={Pause}>
            Pause
          </TimerButton>
        ) : (
          <TimerButton
            onClick={onResume}
            label="Resume rest timer"
            icon={Play}
            disabled={remaining <= 0 || done}
          >
            Resume
          </TimerButton>
        )}
        <TimerButton onClick={onReset} label="Reset rest timer" icon={RotateCcw}>
          Reset
        </TimerButton>
        <TimerButton onClick={onSkip} label="Skip rest timer" icon={SkipForward}>
          Skip
        </TimerButton>
      </div>
    </div>
  )
}

function isActiveDone(remaining, duration) {
  return duration > 0 && remaining <= 0
}

function TimerButton({ onClick, label, icon: Icon, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line-strong bg-white px-3.5 text-sm font-semibold text-ink shadow-soft transition-transform active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-primary-light"
    >
      <Icon size={15} aria-hidden="true" />
      {children}
    </button>
  )
}
