export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="10"
      viewBox="0 0 28 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 5H27M23 1l4 4-4 4" />
    </svg>
  );
}
