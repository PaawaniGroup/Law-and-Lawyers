import { Fragment } from "react";

/**
 * Line-by-line heading reveal behind a mask, in pure CSS so that it never waits on JavaScript.
 * Used for above-the-fold headings (home hero, page titles).
 */
export function MaskLines({
  lines,
  tag: Tag = "h1",
  className = "",
  id,
}: {
  lines: string[];
  tag?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          <span className="mask-line">
            <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
          </span>
          {i < lines.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
