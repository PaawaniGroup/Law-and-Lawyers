import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  num: string;
  label: string;
  tone?: "paper" | "paper-2" | "night";
  tight?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

/**
 * A page section with its marginalia: a small mono label in the left margin ("§ 01 — The Firm")
 * above a 1px brass rule, like a note beside a legal brief. Sections alternate paper / paper-2.
 */
export function Section({
  id,
  num,
  label,
  tone = "paper",
  tight = false,
  className = "",
  contentClassName = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={["section", tone === "paper-2" ? "tone-2" : tone === "night" ? "night" : "", tight ? "tight" : "", className].filter(Boolean).join(" ")}
    >
      <div className="wrap grid12">
        <div className="marg col-span-12 lg:col-span-2">
          <h2 id={`${id}-label`} className="label">
            § {num} — {label}
          </h2>
        </div>
        <div className={`col-span-12 lg:col-span-10 ${contentClassName}`}>{children}</div>
      </div>
    </section>
  );
}
