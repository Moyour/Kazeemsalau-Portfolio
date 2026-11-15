import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { navigate } from "wouter/use-browser-location";
import { foldedScale, unfoldPaper } from "@/components/paper-unfold";
import { COVER_H, COVER_W, Cover } from "@/components/table-covers";
import { useSEO } from "@/hooks/use-seo";
import { getEdition } from "@/lib/edition";
import { warmAllFonts, whenFontsReady } from "@/lib/fonts";
import { PAPERS, type Paper } from "@/lib/paper";

// The landing: three papers lying folded on the table. Picking one up
// carries it to the middle of the window, where it gives way to that
// paper's front page. Folding a paper away brings it back to its place.

const ORDER: Paper[] = ["learning", "product", "video"];
const TAGLINE: Record<Paper, string> = {
  learning: "Courses people finish",
  product: "Apps people use",
  video: "Pictures, cut",
};
// Learning leads, and is drawn a little larger than the other two.
const WEIGHT: Record<Paper, number> = { learning: 1, product: 0.88, video: 0.88 };

// Set just before the table is shown by folding a paper away.
let arrival: { from: Paper; open?: Paper } | null = null;
export function arriveAtTable(from: Paper, open?: Paper) {
  arrival = { from, open };
}

// The paper last open in this visit, so coming back by the browser's Back
// button returns that one paper to its place too.
let lastOpen: Paper | null = null;
export function noteOpenPaper(paper: Paper) {
  lastOpen = paper;
}

const EASE = "cubic-bezier(0.6, 0.05, 0.25, 1)";

export default function Table() {
  useSEO("/");
  const [, setTick] = useState(0);
  const [opening, setOpening] = useState<Paper | null>(null);
  const sheets = useRef<Partial<Record<Paper, HTMLDivElement | null>>>({});

  // While the reader looks at the table, fetch every edition's fonts.
  useEffect(() => warmAllFonts(), []);

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
  // A clear lane between the two papers, wide enough that the pages fanning
  // out underneath still don't meet.
  const gap = stacked ? 28 : Math.round(Math.min(72, Math.max(28, innerWidth * 0.035)));
  // Three papers, their labels and the heading fit the window without scrolling.
  const weightSum = ORDER.reduce((n, p) => n + WEIGHT[p], 0);
  const s = stacked
    ? Math.min((innerWidth - 48) / COVER_W, Math.max(0.12, (innerHeight - 480) / (ORDER.length * COVER_H)))
    : Math.min(
        (Math.min(innerWidth, 1600) - 48 - gap * (ORDER.length - 1)) / (COVER_W * weightSum),
        Math.max(0.16, (innerHeight - 340) / COVER_H),
      );
  const scaleOf = (paper: Paper) => s * WEIGHT[paper];

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
      scale: String(folded / r.width),
    };
  };

  const open = (paper: Paper) => {
    if (opening) return;
    const sheet = sheets.current[paper];
    const to = toMiddle(paper);
    setOpening(paper);
    // The paper opens in its own type: its fonts load while it is carried
    // to the middle, so the page never shows a stand-in font first.
    const fonts = whenFontsReady(paper, 1500);
    if (!sheet || !to || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void fonts.then(() => navigate(PAPERS[paper].front));
      return;
    }
    Object.assign(sheet.style, { ...to, rotate: "-1.6deg", transition: `translate 0.6s ${EASE}, scale 0.6s ${EASE}, rotate 0.6s ${EASE}` });
    const lifted = new Promise((r) => window.setTimeout(r, 620));
    void Promise.all([lifted, fonts]).then(() => {
      // The cover stays on top for a moment while the page, folded, takes
      // its place underneath and starts to open.
      const r = sheet.getBoundingClientRect();
      const ghost = sheet.cloneNode(true) as HTMLElement;
      Object.assign(ghost.style, {
        position: "fixed",
        left: `${r.left + r.width / 2 - (COVER_W * scaleOf(paper)) / 2}px`,
        top: `${r.top + r.height / 2 - (COVER_H * scaleOf(paper)) / 2}px`,
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
    });
  };

  // Coming back from a paper: its cover fades in where the fold left the
  // page, then slides back to its place. Only that paper moves; the others
  // are already lying where they were and stay put.
  useLayoutEffect(() => {
    const back = arrival ?? (lastOpen ? { from: lastOpen, open: undefined } : null);
    arrival = null;
    lastOpen = null;
    if (!back) return;
    const { from, open: next } = back;
    const sheet = sheets.current[from];
    const to = toMiddle(from);
    for (const p of ORDER) {
      const other = sheets.current[p];
      if (p !== from && other) other.style.animation = "none";
    }
    if (sheet && to && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      Object.assign(sheet.style, { ...to, rotate: "-1.6deg", opacity: "0", transition: "none", animation: "none" });
      void sheet.offsetWidth;
      requestAnimationFrame(() => {
        sheet.style.transition = "opacity 0.25s ease";
        sheet.style.opacity = "1";
        window.setTimeout(() => {
          Object.assign(sheet.style, {
            translate: "",
            scale: "",
            rotate: "",
            transition: `translate 0.6s ${EASE}, scale 0.6s ${EASE}, rotate 0.6s ${EASE}`,
          });
          // Back in place: hand hover back to the stylesheet.
          window.setTimeout(() => (sheet.style.transition = ""), 650);
        }, 220);
      });
    }
    if (next) window.setTimeout(() => open(next), 1150);
    // Runs once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const e = getEdition();
  return (
    <main className="ks-table" data-opening={opening ?? undefined} data-stacked={stacked ? "1" : undefined}>
      <header className="ks-table-head">
        <div className="ks-table-kicker">
          <span className="ks-name">Kazeem Salau</span> &middot; {e.time} delivery{e.city ? ` · ${e.city}` : ""} &middot;{" "}
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </div>
        <h1 className="ks-table-title">Kazeem Salau.</h1>
        <p className="ks-table-sub">Pick a paper up. The courses play; the video paper is the reel.</p>
      </header>

      <div className="ks-table-papers" style={{ gap }}>
        {ORDER.map((paper) => (
          <div key={paper} className="ks-fp" data-leaving={opening && opening !== paper ? "1" : undefined}>
            {/* A stack of copies; the top one is the one picked up. */}
            <div className="ks-fp-stack" style={{ width: COVER_W * scaleOf(paper), height: COVER_H * scaleOf(paper) }}>
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
                  width: COVER_W * scaleOf(paper),
                  height: COVER_H * scaleOf(paper),
                  "--tilt": paper === "learning" ? "-2.2deg" : paper === "product" ? "1.8deg" : "-1.2deg",
                } as CSSProperties
              }
              onClick={() => open(paper)}
              onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), open(paper))}
            >
              <div className="ks-fp-cut">
                <div className="ks-fp-page" aria-hidden="true" style={{ transform: `scale(${scaleOf(paper)})` }}>
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

    </main>
  );
}
