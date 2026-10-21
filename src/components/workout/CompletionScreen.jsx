import { motion } from 'motion/react'
import { CalendarCheck, PartyPopper, Home, Repeat, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../ui/ProgressBar.jsx'
import { formatPrettyDate } from '../../utils/dateUtils.js'

/**
 * Shown after "Finish Workout": celebration summary, recorded date,
 * and options to return home or start again.
 */
export default function CompletionScreen({ record, onStartAgain }) {
  const navigate = useNavigate()
  const pct =
    record.exercisesTotal > 0
      ? record.exercisesCompleted / record.exercisesTotal
      : 0

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 130, damping: 20 }}
      aria-label="Workout complete"
      className="rounded-2xl border border-primary/30 bg-white p-6 text-center shadow-card"
    >
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-card">
        <PartyPopper size={30} aria-hidden="true" />
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary shadow">
          <Heart size={14} className="fill-primary" />
        </span>
      </div>
      <h2 className="mt-3 text-2xl font-extrabold text-ink">You did it, my love! 💖🎉</h2>
      <p className="mt-1 text-sm font-medium text-primary-dark">
        So proud of you, Sara!
      </p>
      <p className="mt-0.5 text-xs text-ink-soft">
        {record.workoutName} · recorded on {formatPrettyDate(record.date)}
      </p>

      {/* Romantic note after workout */}
      <div className="mt-4 rounded-xl border border-primary/20 bg-gradient-to-br from-pink-50 via-white to-purple-50 p-3.5 text-left">
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary-dark">
          <Heart size={14} className="fill-primary" />
          <span>A message from Ali</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-soft italic">
          &ldquo;Look at you finishing today’s session! Seeing your strength and commitment inspires me every day. Rest well, hydrate, and know that I love you more than words can say. 💍✨&rdquo;
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-left">
        <div className="rounded-xl bg-cream-deep p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Exercises
          </dt>
          <dd className="mt-1 text-xl font-extrabold text-ink">
            {record.exercisesCompleted}/{record.exercisesTotal}
          </dd>
        </div>
        <div className="rounded-xl bg-cream-deep p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Sets
          </dt>
          <dd className="mt-1 text-xl font-extrabold text-ink">
            {record.setsCompleted}/{record.setsTotal}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <ProgressBar
          ratio={pct}
          height={10}
          label="Workout completion"
        />
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-ink-soft">
        <CalendarCheck size={16} aria-hidden="true" />
        Added to your weekly calendar and history.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary-dark text-base font-bold text-white transition-transform hover:bg-primary-pressed active:scale-[0.97]"
        >
          <Home size={18} aria-hidden="true" /> Return to Dashboard
        </button>
        <button
          type="button"
          onClick={onStartAgain}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-primary text-base font-bold text-primary-dark transition-transform hover:bg-primary/5 active:scale-[0.97]"
        >
          <Repeat size={18} aria-hidden="true" /> Start New Workout
        </button>
      </div>
    </motion.section>
  )
}
