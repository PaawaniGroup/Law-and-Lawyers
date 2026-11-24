import { emblems, type EmblemName } from "@/lib/emblems";

/** Large law-themed line drawing. Decorative: hidden from assistive technology. */
export function Emblem({ name, size = 240, className = "" }: { name: EmblemName; size?: number; className?: string }) {
  const e = emblems[name];
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={`emblem ${className}`}
      style={{ maxWidth: "100%", height: "auto" }}
      aria-hidden="true"
      focusable="false"
    >
      {e.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
      {e.accent?.map((d, i) => (
        <path key={`a${i}`} d={d} className="tape" />
      ))}
    </svg>
  );
}
