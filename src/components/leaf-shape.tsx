/**
 * The brand's leaf: a lens with its tips at the bottom-left and top-right,
 * the shape cut out of the Arrowleaf mark. A bold shape for compositions.
 * Decorative; colored with `currentColor`.
 */
export function LeafShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden className={className}>
      <path d="M0 100C0 44.8 44.8 0 100 0c0 55.2-44.8 100-100 100Z" />
    </svg>
  );
}
