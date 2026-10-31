import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { navigate } from "wouter/use-browser-location";
import { foldedScale, unfoldPaper } from "@/components/paper-unfold";
import { COVER_H, COVER_W, Cover } from "@/components/table-covers";
import { useSEO } from "@/hooks/use-seo";
import { getEdition } from "@/lib/edition";
import { PAPERS, type Paper } from "@/lib/paper";

// The landing: two papers lying folded on the table, the Learning Edition
// and the Product Edition, each with its own front. Picking one up carries it to the middle of the window, where it
// gives way to that paper's front page, folded, which opens out. Folding a
// paper away (the masthead, or Swap) brings it back: it lands in the
// middle and slides back to its place, and Swap then picks up the other.

const ORDER: Paper[] = ["learning", "product"];
const TAGLINE: Record<Paper, string> = {
  learning: "Courses people finish",
  product: "Apps people use",
};

// Set just before the table is shown by folding a paper away.
let arrival: { from: Paper; open?: Paper } | null = null;
export function arriveAtTable(from: Paper, open?: Paper) {
  arrival = { from, open };
}

const EASE = "cubic-bezier(0.6, 0.05, 0.25, 1)";

export default function Table() {
  useSEO("/");
  const [, setTick] = useState(0);
  const [opening, setOpening] = useState<Paper | null>(null);
  const sheets = useRef<Partial<Record<Paper, HTMLDivElement | null>>>({});

  // The table never scrolls; the page does once a paper is open.
  useEffect(() => {
    document.documentElement.dataset.table = "1";
    window.scrollTo(0, 0);
    return () => {
      delete document.documentElement.dataset.table;
    };
  }, []);

  useEffect(() => {
    const onResize = () => setTick((t) => t + 1);
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, []);

  // Side by side where there's room; one above the other on a phone.
  const stacked = innerWidth < 640;
  // Both papers, their labels and the heading fit the window without scrolling.
  // Room left after the heading and the labels under the papers.
  const s = stacked
    ? Math.min((innerWidth - 48) / COVER_W, Math.max(0.12, (innerHeight - 420) / (2 * COVER_H)))
    : Math.min(
        (Math.min(innerWidth, 1300) - 32 - Math.min(64, innerWidth * 0.05)) / 2 / COVER_W,
        Math.max(0.2, (innerHeight - 360) / COVER_H),
      );

  // Where a paper lying in its slot goes to be picked up: the middle of the
  // window, as wide as the opening fold draws the folded page.
  const toMiddle = (paper: Paper) => {
    const sheet = sheets.current[paper];
    if (!sheet) return null;
    const r = sheet.getBoundingClientRect();
    const pad = Math.min(28, Math.max(0, innerWidth * 0.022));
    const W = Math.min(1180, innerWidth - 2 * pad);
    const folded = W * foldedScale((W * COVER_H) / COVER_W, W);
    return {
      translate: `${innerWidth / 2 - (r.left + r.width / 2)}px ${innerHeight / 2 - (r.top + r.height / 2)}px`,
      scale: String(folded / (COVER_W * s)),
    };
  };

  const open = (paper: Paper) => {
    if (opening) return;
    const sheet = sheets.current[paper];
    const to = toMiddle(paper);
    setOpening(paper);
    if (!sheet || !to || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigate(PAPERS[paper].front);
      return;
    }
    Object.assign(sheet.style, { ...to, rotate: "-1.6deg", transition: `translate 0.6s ${EASE}, scale 0.6s ${EASE}, rotate 0.6s ${EASE}` });
    window.setTimeout(() => {
      // The cover stays on top for a moment while the page, folded, takes
      // its place underneath and starts to open.
      const r = sheet.getBoundingClientRect();
      const ghost = sheet.cloneNode(true) as HTMLElement;
      Object.assign(ghost.style, {
        position: "fixed",
        left: `${r.left + r.width / 2 - (COVER_W * s) / 2}px`,
        top: `${r.top + r.height / 2 - (COVER_H * s) / 2}px`,
        translate: "",
        zIndex: "9999",
        pointerEvents: "none",
        transition: "opacity 0.35s ease",
        animation: "none",
      });
      document.body.append(ghost);
      flushSync(() => navigate(PAPERS[paper].front));
      window.scrollTo(0, 0);
      unfoldPaper("open");
      requestAnimationFrame(() => (ghost.style.opacity = "0"));
      window.setTimeout(() => ghost.remove(), 400);
    }, 620);
  };

  // Coming back from a paper: its cover fades in where the fold left the
  // page, then slides back to its place while the other slides in.
  useLayoutEffect(() => {
    if (!arrival) return;
    const { from, open: next } = arrival;
    arrival = null;
    const sheet = sheets.current[from];
    const to = toMiddle(from);
    const other = sheets.current[from === "learning" ? "product" : "learning"];
    if (sheet && to) {
      Object.assign(sheet.style, { ...to, rotate: "-1.6deg", opacity: "0", transition: "none", animation: "none" });
      if (other) Object.assign(other.style, { translate: "0 110vh", transition: "none", animation: "none" });
      void sheet.offsetWidth;
      requestAnimationFrame(() => {
        sheet.style.transition = "opacity 0.25s ease";
        sheet.style.opacity = "1";
        window.setTimeout(() => {
          for (const el of [sheet, other]) {
            if (!el) continue;
            Object.assign(el.style, {
              translate: "",
              scale: "",
              rotate: "",
              transition: `translate 0.7s ${EASE}, scale 0.7s ${EASE}, rotate 0.7s ${EASE}`,
            });
          }
        }, 220);
      });
    }
    if (next) window.setTimeout(() => open(next), 1150);
    // Runs once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const e = getEdition();
  return (
    <div className="ks-table" data-opening={opening ?? undefined} data-stacked={stacked ? "1" : undefined}>
      <header className="ks-table-head">
        <div className="ks-table-kicker">
          Kazeem Salau &middot; {e.time} delivery{e.city ? ` · ${e.city}` : ""} &middot;{" "}
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </div>
        <h1 className="ks-table-title">Two papers today.</h1>
        <p className="ks-table-sub">Pick one up.</p>
      </header>

      <div className="ks-table-papers">
        {ORDER.map((paper) => (
          <div key={paper} className="ks-fp" data-leaving={opening && opening !== paper ? "1" : undefined}>
            {/* A stack of copies; the top one is the one picked up. */}
            <div className="ks-fp-stack" style={{ width: COVER_W * s, height: COVER_H * s }}>
              <span className="ks-fp-under ks-fp-under-2" aria-hidden="true" />
              <span className="ks-fp-under ks-fp-under-1" aria-hidden="true" />
            <div
              ref={(el) => (sheets.current[paper] = el)}
              className="ks-fp-sheet"
              data-paper={paper}
              role="button"
              tabIndex={0}
              aria-label={`Pick up the ${PAPERS[paper].name}`}
              style={
                {
                  width: COVER_W * s,
                  height: COVER_H * s,
                  "--tilt": paper === "learning" ? "-2.2deg" : "1.8deg",
                } as CSSProperties
              }
              onClick={() => open(paper)}
              onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), open(paper))}
            >
              <div className="ks-fp-cut">
                <div className="ks-fp-page" aria-hidden="true" style={{ transform: `scale(${s})` }}>
                  <Cover paper={paper} />
                </div>
              </div>
              <span className="ks-fp-edges" aria-hidden="true" />
            </div>
            </div>
            <div className="ks-fp-label">
              <b>{PAPERS[paper].name}</b>
              <i>{TAGLINE[paper]}</i>
              <span>Pick it up &rarr;</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
