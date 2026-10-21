import { useState } from 'react'
import { Activity } from 'lucide-react'

/**
 * Exercise visual with loading skeleton and graceful fallback
 * (Section H.5). The container has a fixed aspect ratio so image
 * loading never shifts layout.
 */
export default function ExerciseImage({ src, alt, category }) {
  const [state, setState] = useState('loading')

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-deep">
      {state === 'loading' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-line"
        />
      )}

      {src && (
        <img
          src={src}
          alt={state === 'error' ? '' : alt}
          loading="lazy"
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            state === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}

      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 to-secondary/20 p-4 text-center">
          <Activity size={28} className="text-primary-dark" aria-hidden="true" />
          <span className="line-clamp-2 text-sm font-semibold text-ink">{alt}</span>
          {category && (
            <span className="text-xs uppercase tracking-wide text-ink-soft">
              {category}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
