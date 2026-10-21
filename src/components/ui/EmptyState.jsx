/**
 * Friendly empty-state panel (Section J: "Empty states are handled").
 */
export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-cream-deep/60 p-6 text-center">
      {Icon && (
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-muted shadow-soft">
          <Icon size={22} aria-hidden="true" />
        </span>
      )}
      <h3 className="mt-3 font-bold text-ink">{title}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm leading-relaxed text-ink-soft">
        {message}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
