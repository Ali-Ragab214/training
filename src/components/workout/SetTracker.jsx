import { Check } from 'lucide-react'

/**
 * Per-set completion buttons (Section E.4). Tap to complete, tap again
 * to undo. Each button is ≥ 44×44px and pairs color with a check icon
 * (Section G.6).
 */
export default function SetTracker({
  exerciseId,
  totalSets,
  completedSets,
  onToggleSet,
  targetLabel,
}) {
  const setButtons = Array.from({ length: totalSets }, (_, i) => i)

  return (
    <div
      role="group"
      aria-label={`Sets for ${exerciseId.replace(/-/g, ' ')}`}
      className="flex flex-wrap items-center gap-2.5"
    >
      {setButtons.map((setIndex) => {
        const isDone = completedSets.includes(setIndex)
        return (
          <button
            key={setIndex}
            type="button"
            onClick={() => onToggleSet(setIndex)}
            aria-pressed={isDone}
            aria-label={`Set ${setIndex + 1} of ${totalSets}. ${
              isDone ? 'Completed. Tap to undo.' : 'Tap to mark complete.'
            }`}
            className={`relative flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full border-2 text-sm font-bold transition-transform active:scale-[0.9] ${
              isDone
                ? 'border-success-dark bg-success-dark text-white'
                : 'border-line-strong bg-white text-ink-soft hover:border-primary-light'
            }`}
          >
            <span aria-hidden="true">{isDone ? <Check size={20} strokeWidth={3} /> : setIndex + 1}</span>
            <span className="sr-only">
              {isDone ? 'completed' : 'not completed'}
              {targetLabel ? ` · target ${targetLabel}` : ''}
            </span>
          </button>
        )
      })}
      <span className="sr-only" aria-live="polite">
        {completedSets.length} of {totalSets} sets completed.
      </span>
    </div>
  )
}
