"use client";

import { animate } from "framer-motion/dom/mini";
import { inView } from "framer-motion/dom";
import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Entrance effects, built on Framer Motion's lightweight DOM functions (`inView` + `animate`,
 * a few KB) rather than the full React component runtime. Slow and deliberate: 900ms,
 * cubic-bezier(.2,.7,.1,1). Each section uses at most ONE of these.
 *
 * The hidden starting state is inline on the server-rendered element, so there is no flash.
 * Reduced motion is honoured in CSS (see globals.css): under prefers-reduced-motion every
 * [data-reveal] element is forced to its final state, with no JavaScript involved.
 */
const EASE: [number, number, number, number] = [0.2, 0.7, 0.1, 1];
const DURATION = 0.9;

type Frames = Record<string, [string, string]>;

/** Plays `frames` once, the first time the element scrolls into view, then keeps the final state. */
function useRevealOnView<T extends HTMLElement>(frames: Frames, delay: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let played = false;
    let stop: (() => void) | undefined;

    const play = () => {
      if (played) return;
      played = true;
      stop?.();
      const controls = animate(el, frames, { duration: DURATION, ease: EASE, delay });
      const settle = () => {
        for (const [prop, [, to]] of Object.entries(frames)) el.style.setProperty(toKebab(prop), to);
      };
      controls.finished.then(settle, settle);
    };

    stop = inView(el, play, { margin: "0px 0px -12% 0px" });
    return () => stop?.();
    // `frames` is a constant per call site; re-running would restart the observer needlessly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return ref;
}

const toKebab = (s: string) => s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

const RULE_FRAMES: Frames = { transform: ["scaleX(0)", "scaleX(1)"] };
const LINE_FRAMES: Frames = { transform: ["translateY(108%)", "translateY(0%)"] };
const WIPE_FRAMES: Frames = { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] };

/** A hairline that draws from left to right. */
export function RevealRule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const ref = useRevealOnView<HTMLSpanElement>(RULE_FRAMES, delay);
  const style: CSSProperties = {
    display: "block",
    height: 1,
    background: "var(--rule)",
    transformOrigin: "left center",
    transform: "scaleX(0)",
  };
  return <span ref={ref} aria-hidden="true" data-reveal className={className} style={style} />;
}

function RevealLine({ text, delay }: { text: string; delay: number }) {
  const ref = useRevealOnView<HTMLSpanElement>(LINE_FRAMES, delay);
  return (
    <span className="mask-line">
      <span ref={ref} data-reveal style={{ display: "block", animation: "none", transform: "translateY(108%)" }}>
        {text}
      </span>
    </span>
  );
}

/** A heading whose lines rise one by one from behind a mask. */
export function RevealLines({
  lines,
  tag: Tag = "h2",
  className = "",
  id,
}: {
  lines: string[];
  tag?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          <RevealLine text={line} delay={i * 0.11} />
          {i < lines.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/** An image or block revealed by a clip-path wipe. */
export function Wipe({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRevealOnView<HTMLDivElement>(WIPE_FRAMES, delay);
  return (
    <div ref={ref} data-reveal className={className} style={{ clipPath: "inset(0 0 100% 0)" }}>
      {children}
    </div>
  );
}
