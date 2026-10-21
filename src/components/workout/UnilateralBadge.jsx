/**
 * "Per leg" / "Per arm" / "Per side" badge for unilateral exercises
 * (Section E.4). Always pairs the label with an icon so color is not
 * the only indicator.
 */
export default function UnilateralBadge({ perSideLabel }) {
  if (!perSideLabel) return null
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary-light/60 px-2.5 py-1 text-xs font-semibold text-[#5b4a7d]">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M8 3v18M16 3v18M8 12h8" strokeLinecap="round" />
      </svg>
      {perSideLabel} · train both sides
    </span>
  )
}
