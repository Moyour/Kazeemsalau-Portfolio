import { useState } from "react";

// Small diagrams for the learning case studies, each drawn from the case
// study's own words. A contrast sets what was happening against what was
// needed; a flow walks through how the course works, and can branch (a
// decision with several outcomes) or loop back to its start. Steps can be
// opened to read a line about them, by tap, click or keyboard.

export type Contrast = {
  kind: "contrast";
  left: { label: string; items: string[] };
  right: { label: string; items: string[] };
};

export type Flow = {
  kind: "flow";
  steps: { label: string; note: string; branches?: string[] }[];
  loop?: string;
};

export type Diagram = Contrast | Flow;

function ContrastDiagram({ d }: { d: Contrast }) {
  return (
    <div className="ld-contrast">
      {[d.left, d.right].map((side, i) => (
        <div key={side.label} className="ld-side" data-side={i}>
          <div className="ld-side-label">{side.label}</div>
          <ul>
            {side.items.map((item, j) => (
              <li key={item} style={{ animationDelay: `${(i * side.items.length + j) * 90}ms` }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <span className="ld-vs" aria-hidden="true">
        &ne;
      </span>
    </div>
  );
}

function FlowDiagram({ d }: { d: Flow }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="ld-flow">
      <ol className="ld-steps">
        {d.steps.map((s, i) => (
          <li key={s.label} className="ld-step" data-open={open === i ? "1" : undefined}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(i)}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <span>{s.label}</span>
            </button>
            {s.branches && (
              <span className="ld-branches" aria-label="Branches">
                {s.branches.map((b) => (
                  <i key={b}>{b}</i>
                ))}
              </span>
            )}
          </li>
        ))}
      </ol>
      {d.loop && (
        <div className="ld-loop" aria-hidden="true">
          <span />
          <em>{d.loop}</em>
        </div>
      )}
      <p key={open} className="ld-note" aria-live="polite">
        <b>{d.steps[open].label}.</b> {d.steps[open].note}
      </p>
    </div>
  );
}

export default function LearningDiagram({ d }: { d: Diagram }) {
  return d.kind === "contrast" ? <ContrastDiagram d={d} /> : <FlowDiagram d={d} />;
}
