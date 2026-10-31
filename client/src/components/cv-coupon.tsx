import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { track } from "@/lib/track";

const CV = "/files/KazeemSalau-InstructionalDesign.pdf";

// "Cut out and keep": the CV as a newspaper coupon. The reader drags the
// scissors along the dotted line (they can only cut forward, near the
// line, never skip ahead); when the cut meets its start the coupon comes
// away from the page and the PDF downloads. Clicking the scissors, or
// pressing Enter on them, cuts it out for you. A plain link sits
// underneath for anyone in a hurry.

type Point = { x: number; y: number; angle: number };

// The dotted line runs clockwise from the top-left corner, inset by `pad`.
function perimeter(w: number, h: number, pad: number) {
  const W = w - pad * 2;
  const H = h - pad * 2;
  const total = 2 * (W + H);
  const at = (s: number): Point => {
    s = ((s % total) + total) % total;
    if (s < W) return { x: pad + s, y: pad, angle: 0 };
    if (s < W + H) return { x: pad + W, y: pad + s - W, angle: 90 };
    if (s < 2 * W + H) return { x: pad + W - (s - W - H), y: pad + H, angle: 180 };
    return { x: pad, y: pad + H - (s - 2 * W - H), angle: 270 };
  };
  // The distance along the line of the point on it nearest to (x, y).
  const nearest = (x: number, y: number) => {
    const cx = Math.min(Math.max(x, pad), pad + W);
    const cy = Math.min(Math.max(y, pad), pad + H);
    const sides = [
      { d: Math.abs(y - pad), s: cx - pad },
      { d: Math.abs(x - pad - W), s: W + (cy - pad) },
      { d: Math.abs(y - pad - H), s: W + H + (pad + W - cx) },
      { d: Math.abs(x - pad), s: 2 * W + H + (pad + H - cy) },
    ];
    const best = sides.reduce((a, b) => (b.d < a.d ? b : a));
    return { s: best.s, distance: best.d };
  };
  return { W, H, total, at, nearest };
}

function Scissors({ snipping }: { snipping: boolean }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" className={snipping ? "ks-snip" : undefined}>
      <g className="ks-blade-a">
        <circle cx="9" cy="12" r="5.5" fill="none" stroke="#14120F" strokeWidth="2.6" />
        <path d="M13.5 14.5 L38 21.5 L36 23.5 Z" fill="#14120F" />
      </g>
      <g className="ks-blade-b">
        <circle cx="9" cy="28" r="5.5" fill="none" stroke="#14120F" strokeWidth="2.6" />
        <path d="M13.5 25.5 L38 18.5 L36 16.5 Z" fill="#14120F" />
      </g>
      <circle cx="20" cy="20" r="1.6" fill="#C0281B" />
    </svg>
  );
}

export default function CvCoupon() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [cut, setCut] = useState(0);
  const [snipping, setSnipping] = useState(false);
  const [state, setState] = useState<"whole" | "cutting" | "free">("whole");
  const cutting = useRef(false);
  const cutThisPress = useRef(false);
  const progress = useRef(0);
  const snipTimer = useRef(0);
  const auto = useRef(0);
  const pad = 9;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(auto.current);
      clearTimeout(snipTimer.current);
    };
  }, []);

  const line = perimeter(size.w, size.h, pad);
  const tip = line.at(cut);

  const download = (how: string) => {
    const a = Object.assign(document.createElement("a"), { href: CV, download: "KazeemSalau-CV.pdf" });
    document.body.append(a);
    a.click();
    a.remove();
    track("cv_download", { link_text: `coupon_${how}` });
  };

  const advance = (to: number) => {
    progress.current = to;
    setCut(to);
    setSnipping(true);
    clearTimeout(snipTimer.current);
    snipTimer.current = window.setTimeout(() => setSnipping(false), 140);
  };

  const comeAway = (how: string) => {
    cutting.current = false;
    advance(line.total);
    setState("free");
    download(how);
  };

  // Cuts the whole way round for the reader, at a steady snip.
  const cutForMe = () => {
    if (state === "free") return;
    setState("cutting");
    const start = performance.now();
    const from = progress.current;
    const ms = Math.max(900, ((line.total - from) / line.total) * 2200);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      advance(from + (line.total - from) * t);
      if (t < 1) auto.current = requestAnimationFrame(step);
      else comeAway("auto");
    };
    auto.current = requestAnimationFrame(step);
  };

  const local = (e: ReactPointerEvent) => {
    const r = boxRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (state === "free") return;
    cancelAnimationFrame(auto.current);
    cutting.current = true;
    cutThisPress.current = false;
    setState("cutting");
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!cutting.current) return;
    const { x, y } = local(e);
    const { s, distance } = line.nearest(x, y);
    if (distance > 56) return;
    // Wrap past the start once the cut is most of the way round.
    let target = s;
    if (progress.current > line.total * 0.75 && s < line.total * 0.25) target = s + line.total;
    // Only forward, and only a short way ahead of the blades.
    if (target > progress.current && target - progress.current < 90) {
      cutThisPress.current = true;
      advance(target);
      if (target >= line.total - 4) comeAway("cut");
    }
  };
  const onUp = () => {
    if (!cutting.current) return;
    cutting.current = false;
    // Pressed without cutting: treat it as a click and finish it for them.
    if (!cutThisPress.current) cutForMe();
  };

  const kept = state === "free";

  return (
    <div className="ks-coupon-wrap" data-state={state}>
      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <span>Download my CV</span>
        <span style={{ color: "var(--accent)" }}>{kept ? "Kept ✓" : "✂ Drag the scissors"}</span>
      </div>

      <div className="ks-coupon-slot">
        <div ref={boxRef} className="ks-coupon" data-kept={kept ? "1" : undefined}>
          <div className="ks-coupon-body">
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Coupon &middot; Cut out &amp; keep
            </div>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: 30,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                margin: "8px 0 8px",
              }}
            >
              Download
              <br />
              my CV
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.45, color: "var(--body)", margin: 0 }}>
              Cut along the dotted line, or click the scissors, and it downloads. Two pages, PDF.
            </p>
            <div className="ks-coupon-foot">
              <span>Valid today. And tomorrow.</span>
              <span className="ks-coupon-bars" aria-hidden="true" />
            </div>
          </div>
          {kept && <div className="ks-coupon-stamp">Kept</div>}
        </div>

        {size.w > 0 && (
          <svg className="ks-coupon-line" width={size.w} height={size.h} aria-hidden="true">
            <rect x={pad} y={pad} width={line.W} height={line.H} fill="none" stroke="#14120F" strokeWidth="1.4" strokeDasharray="6 5" />
            <rect
              x={pad}
              y={pad}
              width={line.W}
              height={line.H}
              fill="none"
              stroke="#F4F1EA"
              strokeWidth="4"
              strokeDasharray={`${cut} ${line.total}`}
            />
            <rect
              x={pad}
              y={pad}
              width={line.W}
              height={line.H}
              fill="none"
              stroke="#14120F"
              strokeWidth="0.9"
              strokeDasharray={`${cut} ${line.total}`}
            />
          </svg>
        )}

        {size.w > 0 && !kept && (
          <button
            type="button"
            className="ks-scissors"
            aria-label="Cut out the coupon and download the CV"
            style={{ transform: `translate(${tip.x}px, ${tip.y}px) translate(-50%, -50%) rotate(${tip.angle}deg)` }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), cutForMe())}
          >
            <Scissors snipping={snipping} />
          </button>
        )}
      </div>

      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginTop: 10,
        }}
      >
        {kept ? "Check your downloads. " : "No scissors? "}
        <a href={CV} target="_blank" rel="noopener noreferrer" data-track="coupon_plain" className="ks-tap" style={{ color: "var(--accent)" }}>
          {kept ? "Open the PDF" : "Download the PDF"}
        </a>
      </div>
    </div>
  );
}
