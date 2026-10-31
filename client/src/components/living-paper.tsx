import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// The Living Paper: the work doesn't stay printed on the page. Artifacts
// lie flat, printed, until the reader reaches them, then stand up off the
// paper like a pop-up book, throwing a shadow and leaving a crease where
// they fold; scrolling back lays them down again. Section numbers are
// die-cut so the work shows through them, and flaps lift to reveal what's
// underneath. Scroll is time: everything is tied to where the reader is,
// so it plays backwards too. With reduced motion everything simply stands.

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// One loop for every pop-up and folio on the page, run on scroll and resize.
type Watched = { el: HTMLElement; update: (rect: DOMRect, vh: number) => void };
const watched = new Set<Watched>();
let queued = false;
function tick() {
  queued = false;
  const vh = innerHeight;
  watched.forEach((w) => {
    const rect = w.el.getBoundingClientRect();
    // Off screen by a margin: leave it as it is.
    if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) return;
    w.update(rect, vh);
  });
}
function queue() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(tick);
  }
}
function watch(w: Watched) {
  if (watched.size === 0) {
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
  }
  watched.add(w);
  queue();
  return () => {
    watched.delete(w);
    if (watched.size === 0) {
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
    }
  };
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/* ── PopUp ─────────────────────────────────────────────────────
   An artifact hinged at its foot. It stands up as it comes into the
   lower part of the window and lies back down as it leaves the top.
   `delay` staggers a group (0–0.6); `entrance` stands it up once, on
   arrival, for things already in view when the page opens. */
export function PopUp({
  children,
  delay = 0,
  entrance = false,
  tilt = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  entrance?: boolean;
  tilt?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    if (entrance) {
      el.style.setProperty("--pop", "0");
      const t = window.setTimeout(() => {
        el.dataset.ease = "1";
        el.style.setProperty("--pop", "1");
      }, 120 + delay * 900);
      return () => clearTimeout(t);
    }
    return watch({
      el,
      update: (r, vh) => {
        // Rises over the lower 45% of the window; lies back down in the top 12%.
        const up = clamp((vh - r.top) / (vh * 0.45) - delay);
        const down = clamp(r.bottom / (vh * 0.12));
        el.style.setProperty("--pop", ease(Math.min(up / (1 - delay || 1), down)).toFixed(3));
      },
    });
  }, [delay, entrance]);

  return (
    <div ref={ref} className={`lp-pop${className ? ` ${className}` : ""}`} style={{ ...style, ["--tilt" as string]: `${tilt}deg` }}>
      <div className="lp-pop-sheet">{children}</div>
      <span className="lp-pop-shadow" aria-hidden="true" />
    </div>
  );
}

/* ── Folio ─────────────────────────────────────────────────────
   A section number cut out of the page, the cut edge catching a little
   shadow. `color` is the solid ink of the layer showing through. */
export function Folio({ num, color }: { num: string; color?: string }) {
  return (
    <span className="lp-folio" style={color ? ({ "--folio": color } as CSSProperties) : undefined} aria-label={`Section ${num}`}>
      {num}
    </span>
  );
}

/* ── Flap ──────────────────────────────────────────────────────
   Lift-the-flap: the front is printed on a flap hinged at its top; lift
   it (click, tap, Enter) to read what's underneath. Hovering lifts the
   corner a little, so it's clear it opens. */
export function Flap({ front, back, label }: { front: ReactNode; back: ReactNode; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lp-flap" data-open={open ? "1" : undefined}>
      <div className="lp-flap-under">{back}</div>
      <button
        type="button"
        className="lp-flap-top"
        aria-expanded={open}
        aria-label={open ? `Lower the flap: ${label}` : `Lift the flap: ${label}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="lp-flap-face">{front}</span>
        <span className="lp-flap-back" aria-hidden="true" />
      </button>
    </div>
  );
}

/* ── InkCheck ──────────────────────────────────────────────────
   A checklist item that ticks itself off in ink as it's reached. */
export function InkCheck({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const [on, setOn] = useState(reduced());
  useEffect(() => {
    const el = ref.current;
    if (!el || on) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { rootMargin: "0px 0px -30% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [on]);
  return (
    <li ref={ref} className="lp-check" data-on={on ? "1" : undefined}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" />
        <path d="M6 12.5l4 4L18.5 7" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
