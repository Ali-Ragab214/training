import { useState } from 'react'
import {
  ChevronDown,
  TriangleAlert,
  Info,
  Lightbulb,
  Sparkles,
  CircleCheck,
} from 'lucide-react'
import { motion } from 'motion/react'
import ExerciseImage from '../ui/ExerciseImage.jsx'
import SetTracker from './SetTracker.jsx'
import RestTimer from './RestTimer.jsx'
import UnilateralBadge from './UnilateralBadge.jsx'
import { formatRestSeconds } from '../../data/workouts.js'

/**
 * One exercise card: visual, metadata, expandable details, set tracking
 * or duration completion, and the (single) active rest timer.
 */
export default function ExerciseCard({
  exercise,
  completedSets,
  isComplete,
  onToggleSet,
  onToggleDuration,
  timerProps,
}) {
  const [detailsOpen, setDetailsOpen] = useState(false)

  const isDurationBased = exercise.trackByDuration || exercise.sets == null
  const detailsId = `exercise-details-${exercise.id}`

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`overflow-hidden rounded-xl border bg-surface shadow-soft ${
        isComplete ? 'border-success/60' : 'border-line'
      }`}
    >
      <ExerciseImage
        src={`/images/exercises/${exercise.id}.svg`}
        alt={`${exercise.name} — ${exercise.alt ?? 'illustration of proper form'}`}
        category={exercise.category}
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug">
            <span className="mr-1.5 text-ink-muted">#{exercise.order}</span>
            {exercise.name}
          </h3>
          <CompletionBadge isComplete={isComplete} />
        </div>

        <TagsRow exercise={exercise} />

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
          {isDurationBased ? (
            <span className="rounded-full bg-accent-light px-2.5 py-1 font-semibold text-[#8a5a2b]">
              {exercise.durationLabel}
            </span>
          ) : (
            <>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-[#b0406f]">
                {exercise.sets} sets × {exercise.reps}
              </span>
              {exercise.restSeconds && (
                <span className="text-xs">
                  Rest {formatRestSeconds(exercise.restSeconds)}
                </span>
              )}
            </>
          )}
        </div>

        <div className="mt-2">
          <UnilateralBadge perSideLabel={exercise.perSideLabel} />
        </div>

        {exercise.importantNote && (
          <p className="mt-3 flex gap-2 rounded-lg bg-secondary-light/40 px-3 py-2 text-sm text-[#5b4a7d]">
            <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{exercise.importantNote}</span>
          </p>
        )}
        {exercise.safetyNote && (
          <p className="mt-2 flex gap-2 rounded-lg bg-warning/10 px-3 py-2 text-sm text-[#8a5a14]">
            <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{exercise.safetyNote}</span>
          </p>
        )}

        {/* Expandable step-by-step details */}
        <button
          type="button"
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setDetailsOpen((open) => !open)}
          className="mt-3 flex min-h-[44px] w-full items-center justify-between rounded-lg px-1 text-sm font-semibold text-primary-dark"
        >
          How to do it
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <div id={detailsId} hidden={!detailsOpen} className="space-y-3">
          {detailList(exercise.instructions, 'Steps', Sparkles)}
          {detailList(exercise.commonMistakes, 'Common mistakes', TriangleAlert)}
          {exercise.easierVariation && (
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft">
                <Lightbulb size={14} aria-hidden="true" /> Easier variation
              </h4>
              <p className="mt-1 text-sm leading-relaxed">
                {exercise.easierVariation}
              </p>
            </div>
          )}
          {exercise.perSideNote && (
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft">
                <Info size={14} aria-hidden="true" /> Both sides required
              </h4>
              <p className="mt-1 text-sm leading-relaxed">
                {exercise.perSideNote}
                {exercise.restPerSideNote ? ` ${exercise.restPerSideNote}` : ''}
              </p>
            </div>
          )}
        </div>

        {/* Tracking: duration mark-complete OR per-set buttons */}
        <div className="mt-4">
          {isDurationBased ? (
            <button
              type="button"
              onClick={onToggleDuration}
              aria-pressed={isComplete}
              className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-base font-bold text-white transition-transform active:scale-[0.97] ${
                isComplete ? 'bg-success-dark' : 'bg-primary-dark hover:bg-primary-pressed'
              }`}
            >
              <CircleCheck size={20} aria-hidden="true" />
              {isComplete ? 'Completed — tap to undo' : 'Mark Complete'}
            </button>
          ) : (
            <>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {completedSets.length} of {exercise.sets} sets done · tap to
                complete / undo
              </p>
              <SetTracker
                exerciseId={exercise.id}
                totalSets={exercise.sets}
                completedSets={completedSets}
                onToggleSet={onToggleSet}
                targetLabel={exercise.reps ?? exercise.durationLabel}
              />
            </>
          )}
        </div>

        {/* One active timer slot, driven by the page */}
        {timerProps != null && (
          <div className="mt-4" data-testid={`rest-timer-${exercise.id}`}>
            <RestTimer {...timerProps} />
          </div>
        )}
      </div>
    </motion.article>
  )
}

function detailList(items, heading, Icon) {
  if (!items?.length) return null
  return (
    <div>
      <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft">
        <Icon size={14} aria-hidden="true" /> {heading}
      </h4>
      <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm leading-relaxed marker:text-ink-muted">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </div>
  )
}

function TagsRow({ exercise }) {
  const tags = [...exercise.targetMuscles, ...exercise.secondaryMuscles]
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Target muscles">
      {tags.slice(0, 4).map((muscle) => (
        <li
          key={muscle}
          className="rounded-full bg-cream-deep px-2 py-0.5 text-xs font-medium text-ink-soft"
        >
          {muscle}
        </li>
      ))}
    </ul>
  )
}

function CompletionBadge({ isComplete }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
        isComplete ? 'bg-success-bg text-success-dark' : 'bg-cream-deep text-ink-muted'
      }`}
    >
      <CircleCheck size={13} aria-hidden="true" />
      {isComplete ? 'Done' : 'Open'}
    </span>
  )
}
