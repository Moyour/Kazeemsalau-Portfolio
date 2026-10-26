import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneCarousel, { type Screen } from "@/components/phone-carousel";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Halftone dots over a warm paper tint: what a photo looks like on newsprint.
const halftone: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundColor: "rgba(226, 216, 192, 0.55)",
  backgroundImage: "radial-gradient(circle, rgba(20, 18, 15, 0.62) 1.1px, transparent 1.7px)",
  backgroundSize: "5px 5px",
  mixBlendMode: "multiply",
};

/* ── NewsPhoto ────────────────────────────────────────────────
   Starts as a grey halftone print. As it scrolls into view the ink
   bleeds outward from the centre into full colour and the picture
   settles from a slight zoom, like a newspaper photo coming to life. */
export function NewsPhoto({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 88%", end: "top 30%", scrub: 0.6 },
      });
      tl.fromTo(".ks-np-print", { filter: "grayscale(1) contrast(1.35) brightness(1.05)", scale: 1.14 }, { filter: "grayscale(0) contrast(1) brightness(1)", scale: 1, ease: "none" }, 0)
        .fromTo(".ks-np-dots", { clipPath: "circle(150% at 50% 55%)" }, { clipPath: "circle(0% at 50% 55%)", ease: "power2.in" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      <div className="ks-np-print" style={{ position: "absolute", inset: 0, willChange: "transform, filter" }}>
        {children}
      </div>
      <div className="ks-np-dots" style={halftone} aria-hidden="true" />
    </div>
  );
}

/* ── LivingPhones ─────────────────────────────────────────────
   Three phones rise out of the page as it scrolls in, then keep
   flicking through real app screens like the moving photographs
   in a wizard's newspaper. */
export function LivingPhones({ reels, bg }: { reels: string[][]; bg: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || prefersReducedMotion()) return;
    const id = setInterval(() => setTick((t) => t + 1), 650);
    return () => clearInterval(id);
  }, [visible]);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ks-lp-phone",
        { yPercent: 70, rotateX: 38, rotateZ: (i: number) => [-7, 0, 7][i % 3], opacity: 0.2 },
        {
          yPercent: 0,
          rotateX: 0,
          rotateZ: (i: number) => [-3, 0, 3][i % 3],
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 92%", end: "top 35%", scrub: 0.8 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      style={{
        position: "absolute",
        inset: 0,
        background: bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "4%",
        padding: "7% 5% 0",
        perspective: 900,
      }}
    >
      {reels.map((reel, i) => {
        // Each phone changes every third beat, offset by one beat from its
        // neighbour, so the three never flick over at the same moment.
        const current = reel[Math.floor((tick + i) / 3) % reel.length];
        return (
          <div
            key={i}
            className="ks-lp-phone"
            style={{
              width: "28%",
              marginTop: i === 1 ? 0 : "6%",
              aspectRatio: "390 / 844",
              background: "#14120F",
              borderRadius: 18,
              padding: 3,
              boxShadow: "0 22px 40px -12px rgba(0,0,0,0.5)",
              transformOrigin: "50% 100%",
              position: "relative",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 15, overflow: "hidden", background: "#FFF" }}>
              {reel.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    opacity: src === current ? 1 : 0,
                    transform: src === current ? "none" : "translateY(6%) scale(1.04)",
                    transition: "opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── PhoneStory ───────────────────────────────────────────────
   A pinned, scroll-driven tour. The phone holds the centre of the
   screen while each scroll step deals the next app screen on top,
   the caption is re-typeset beside it and a giant headline drifts
   behind like a page being printed. */
export function PhoneStory({
  screens,
  name,
  kicker,
  headline,
  accent,
}: {
  screens: Screen[];
  name: string;
  kicker: string;
  headline: string;
  accent: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".ks-ps-screen");
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          // Screen i is fully dealt at progress i / (n - 1); switch the caption
          // as each new screen passes halfway onto the phone.
          onUpdate: (self) => setIndex(Math.round(self.progress * (screens.length - 1))),
        },
      });
      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.fromTo(card, { yPercent: 110, rotate: 6, scale: 1.05 }, { yPercent: 0, rotate: 0, scale: 1, duration: 1 }, i - 1);
        tl.to(cards[i - 1], { scale: 0.88, filter: "brightness(0.55)", yPercent: -4, duration: 1 }, i - 1);
      });
      tl.fromTo(".ks-ps-phone", { rotateY: -16, rotateX: 6 }, { rotateY: 16, rotateX: -4, ease: "none", duration: screens.length - 1 }, 0);
      tl.fromTo(".ks-ps-bigword", { xPercent: 8 }, { xPercent: -38, ease: "none", duration: screens.length - 1 }, 0);
      tl.fromTo(".ks-ps-rule", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: screens.length - 1 }, 0);
    }, root);
    return () => ctx.revert();
  }, [reduced, screens.length]);

  if (reduced) return <PhoneCarousel screens={screens} name={name} accent={accent} />;

  const current = screens[index];

  return (
    <div ref={root} style={{ position: "relative", height: `${screens.length * 70 + 40}vh`, ["--ks-ps-accent" as string]: accent }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          alignItems: "center",
          gap: "clamp(16px, 4vw, 64px)",
          padding: "0 clamp(16px, 4vw, 56px)",
        }}
        className="ks-ps-stage"
      >
        {/* Giant headline drifting behind, like type on the press */}
        <div
          aria-hidden="true"
          className="ks-ps-bigword"
          style={{
            position: "absolute",
            left: 0,
            bottom: "4vh",
            whiteSpace: "nowrap",
            fontFamily: "Archivo, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(90px, 17vw, 260px)",
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(20, 18, 15, 0.14)",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          {headline}
        </div>

        {/* Caption column */}
        <div style={{ position: "relative", display: "flex", gap: 20, maxWidth: 520, zIndex: 1 }} className="ks-ps-copy">
          <div style={{ width: 4, background: "#CFC9BB", position: "relative", flexShrink: 0, minHeight: 220 }}>
            <div className="ks-ps-rule" style={{ position: "absolute", inset: 0, background: accent, transformOrigin: "top" }} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#5F5A50",
                marginBottom: 14,
              }}
            >
              {kicker} &middot; <span style={{ color: accent }}>{String(index + 1).padStart(2, "0")}</span> / {String(screens.length).padStart(2, "0")}
            </div>
            <div key={index} className="ks-ps-caption">
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(30px, 4.4vw, 58px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {current.title.split(" ").map((w, i, all) => (
                  <span key={i}>
                    <span className="ks-ps-w" style={{ animationDelay: `${i * 55}ms` }}>
                      {w}
                    </span>
                    {i < all.length - 1 ? " " : ""}
                  </span>
                ))}
              </div>
              <p className="ks-ps-p" style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.5, color: "#3A362F", margin: 0, maxWidth: "36ch" }}>
                {current.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div style={{ perspective: 1400, zIndex: 1 }}>
          <div
            className="ks-ps-phone"
            style={{
              width: "clamp(200px, 24vw, 300px)",
              aspectRatio: "390 / 844",
              background: "#14120F",
              borderRadius: 40,
              padding: 9,
              boxShadow: `18px 22px 0 ${accent}, 0 40px 80px -30px rgba(0,0,0,0.6)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: "#FFF" }}>
              {screens.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={`${name}: ${s.title}`}
                  className="ks-ps-screen"
                  loading={i < 2 ? "eager" : "lazy"}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    transformOrigin: "50% 0%",
                    boxShadow: "0 -12px 30px rgba(0,0,0,0.25)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .ks-ps-w { display: inline-block; animation: ks-word 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; opacity: 0; transform: translateY(18px); filter: blur(10px); }
        .ks-ps-p { animation: ks-fade 0.5s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (max-width: 760px) {
          .ks-ps-stage { grid-template-columns: 1fr !important; grid-template-rows: auto auto; align-content: center; justify-items: center; text-align: left; }
          .ks-ps-copy { order: 2; max-width: 92vw !important; }
          .ks-ps-copy > div:first-child { min-height: 120px !important; }
          .ks-ps-stage { gap: 36px !important; }
          .ks-ps-phone { width: min(46vw, 200px) !important; border-radius: 30px !important; padding: 7px !important; box-shadow: 10px 12px 0 var(--ks-ps-accent), 0 30px 60px -30px rgba(0,0,0,0.6) !important; }
          .ks-ps-phone > div { border-radius: 24px !important; }
        }
      `}</style>
    </div>
  );
}

/* ── ScrollingSite ────────────────────────────────────────────
   A browser window pinned on screen; scrolling the article scrolls
   the website inside it from top to bottom. */
export function ScrollingSite({ src, url, height = 300 }: { src: string; url: string; height?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const img = root.current!.querySelector<HTMLImageElement>(".ks-ss-img")!;
      const frame = root.current!.querySelector<HTMLElement>(".ks-ss-frame")!;
      const run = () => {
        gsap.fromTo(
          img,
          { y: 0 },
          {
            y: () => -(img.offsetHeight - frame.offsetHeight),
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true },
          }
        );
        gsap.fromTo(".ks-ss-window", { rotateX: 18, scale: 0.9 }, { rotateX: 0, scale: 1, ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top 80%", end: "top top", scrub: 0.6 } });
      };
      if (img.complete) run();
      else img.addEventListener("load", () => { run(); ScrollTrigger.refresh(); }, { once: true });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} style={{ position: "relative", height: `${height}vh` }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1600, padding: "0 clamp(12px, 3vw, 40px)" }}>
        <div className="ks-ss-window" style={{ width: "min(1100px, 100%)", border: "1px solid #14120F", background: "#14120F", boxShadow: "0 40px 80px -40px rgba(0,0,0,0.6)", transformOrigin: "50% 100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px" }}>
            {["#C0281B", "#F0B442", "#2AB88A"].map((c) => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ marginLeft: 10, fontFamily: "Archivo, sans-serif", fontSize: 11, color: "#9C968C", letterSpacing: "0.06em" }}>{url}</span>
          </div>
          <div className="ks-ss-frame" style={{ height: "min(68vh, 620px)", overflow: "hidden", background: "#FFF" }}>
            <img className="ks-ss-img" src={src} alt={`${url}, the full page`} style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── InkRing ──────────────────────────────────────────────────
   A research figure whose ring is inked in as it scrolls past. */
export function InkRing({ value, label, color }: { value: number; label: string; color: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(prefersReducedMotion() ? value : 0);
  const r = 52;
  const c = 2 * Math.PI * r;

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 40%", scrub: 0.6 } })
        .fromTo(".ks-ir-arc", { strokeDashoffset: c }, { strokeDashoffset: c * (1 - value / 100), ease: "none" }, 0)
        .to(counter, { v: value, ease: "none", onUpdate: () => setShown(Math.round(counter.v)) }, 0)
        .fromTo(".ks-ir-svg", { rotate: -120, scale: 0.8 }, { rotate: -90, scale: 1, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, [value, c]);

  return (
    <div ref={root} style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 124, height: 124, flexShrink: 0 }}>
        <svg className="ks-ir-svg" viewBox="0 0 124 124" width="124" height="124" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
          <circle cx="62" cy="62" r={r} fill="none" stroke="#E2DCCF" strokeWidth="12" />
          <circle className="ks-ir-arc" cx="62" cy="62" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="butt" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 30, letterSpacing: "-0.04em" }}>
          {shown}%
        </div>
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.45, color: "#3A362F" }}>{label}</div>
    </div>
  );
}

/* ── LiveSite ─────────────────────────────────────────────────
   A thumbnail of a whole website that slowly reads itself,
   scrolling top to bottom and back, for as long as it's on screen. */
export function LiveSite({ src }: { src: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#FFF" }}>
      <img
        src={src}
        alt=""
        loading="lazy"
        className="ks-live-site"
        style={{ width: "100%", display: "block" }}
      />
      <style>{`
        .ks-live-site { animation: ks-autoscroll 26s ease-in-out infinite alternate; }
        @keyframes ks-autoscroll {
          0%, 6% { transform: translateY(0); }
          94%, 100% { transform: translateY(calc(-100% + 280px)); }
        }
        @media (prefers-reduced-motion: reduce) { .ks-live-site { animation: none; } }
      `}</style>
    </div>
  );
}

// Splits screens into interleaved reels, one per phone.
export function toReels(srcs: string[], phones = 3) {
  return Array.from({ length: phones }, (_, p) => srcs.filter((_, i) => i % phones === p));
}
