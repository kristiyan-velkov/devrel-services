export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M8 16 L16 8 L24 16 L16 24 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="16" r="2.1" fill="currentColor" />
      <circle cx="16" cy="8" r="2.1" fill="currentColor" />
      <circle cx="24" cy="16" r="2.1" fill="currentColor" />
      <circle cx="16" cy="24" r="2.1" fill="currentColor" />
    </svg>
  );
}
