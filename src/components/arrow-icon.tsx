/**
 * Right-pointing arrow, drawn centered in its 16×16 box so it can rotate in
 * place (e.g. `-rotate-45` turns it to point up-right). Inherits
 * `currentColor`; decorative, so always pair it with a text label.
 */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`size-3.5 ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
