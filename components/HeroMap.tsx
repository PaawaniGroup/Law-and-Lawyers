import { heroMap as m } from "@/lib/hero-map-data";

/**
 * Cadastral survey drawing. A schematic, not a real survey: the plot numbers are decorative.
 * The curving double line is a quiet reference to the Upper Ganga Canal at Roorkee.
 * Draws itself once with CSS only (no hydration needed), then stays still.
 */
export function HeroMap() {
  return (
    <svg
      viewBox={m.viewBox}
      className="cadastre block h-auto w-full"
      role="img"
      aria-label="Schematic survey drawing of land parcels crossed by a canal"
    >
      {m.frame.map((d, i) => (
        <path key={i} className="frame" pathLength={1} d={d} />
      ))}
      <path className="frame" pathLength={1} d={m.strip.line} />
      {m.parcels.map((p, i) => (
        <path
          key={i}
          className="parcel"
          pathLength={1}
          d={p.d}
          style={{ "--d": p.delay } as React.CSSProperties}
        />
      ))}
      <path className="canal-clear" d={m.canal.clear} />
      <path className="canal" pathLength={1} d={m.canal.a} />
      <path className="canal" pathLength={1} d={m.canal.b} />
      {m.canal.ticks.map((d, i) => (
        <path key={i} className="canal-tick" pathLength={1} d={d} />
      ))}
      {m.pegs.map(([x, y], i) => (
        <circle key={i} className="peg" cx={x} cy={y} r="2.6" />
      ))}
      {m.labels.map((l, i) => (
        <text key={i} className="plot" x={l.x} y={l.y}>
          {l.t}
        </text>
      ))}
      <text className="plot" style={{ textAnchor: "start" }} x={m.strip.textX} y={m.strip.textY}>
        {m.strip.text}
      </text>
      <path className="north" pathLength={1} d={m.north.d} />
      <text className="plot" x={m.north.labelX} y={m.north.labelY}>
        N
      </text>
    </svg>
  );
}
