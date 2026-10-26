import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

export type Screen = { src: string; title: string; caption: string };

const arrowStyle = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "1px solid #14120F",
  background: "#F4F1EA",
  color: "#14120F",
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export default function PhoneCarousel({
  screens,
  name,
  accent = "#C0281B",
}: {
  screens: Screen[];
  name: string;
  accent?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const seen = useRef(false);
  // Where a button-triggered scroll is heading, so rapid clicks keep counting
  // from the destination instead of the half-scrolled position.
  const pending = useRef<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (pending.current === i) pending.current = null;
      setIndex((prev) => {
        if (i !== prev && !seen.current) {
          seen.current = true;
          track("carousel_interact", { carousel: name });
        }
        return i;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [name]);

  function go(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const next = (i + screens.length) % screens.length;
    pending.current = next;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }

  const current = screens[index] ?? screens[0];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} screens`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go((pending.current ?? index) + 1);
        if (e.key === "ArrowLeft") go((pending.current ?? index) - 1);
      }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 22px)" }}>
        <button type="button" aria-label="Previous screen" onClick={() => go((pending.current ?? index) - 1)} style={arrowStyle}>
          &larr;
        </button>

        {/* Phone */}
        <div
          style={{
            width: "clamp(220px, 62vw, 280px)",
            aspectRatio: "390 / 844",
            background: "#14120F",
            borderRadius: 40,
            padding: 9,
            boxShadow: `10px 10px 0 ${accent}`,
            flexShrink: 0,
          }}
        >
          <div
            ref={trackRef}
            tabIndex={0}
            aria-live="polite"
            className="ks-carousel-track"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 32,
              overflowX: "auto",
              overflowY: "hidden",
              display: "flex",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              outline: "none",
            }}
          >
            {screens.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={`${name}: ${s.title}`}
                loading={i < 2 ? "eager" : "lazy"}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  flex: "0 0 100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  scrollSnapAlign: "start",
                  display: "block",
                  userSelect: "none",
                }}
              />
            ))}
          </div>
        </div>

        <button type="button" aria-label="Next screen" onClick={() => go((pending.current ?? index) + 1)} style={arrowStyle}>
          &rarr;
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show ${s.title}`}
            aria-current={i === index}
            onClick={() => go(i)}
            style={{
              width: i === index ? 22 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === index ? accent : "#CFC9BB",
              transition: "width 0.2s, background 0.2s",
            }}
          />
        ))}
      </div>

      {/* Caption */}
      <div style={{ textAlign: "center", maxWidth: 340, minHeight: 66 }}>
        <div
          style={{
            fontFamily: "Archivo, sans-serif",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            marginBottom: 6,
          }}
        >
          <span style={{ color: accent }}>
            {String(index + 1).padStart(2, "0")}/{String(screens.length).padStart(2, "0")}
          </span>{" "}
          &middot; {current.title}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: "#3A362F", margin: 0 }}>{current.caption}</p>
      </div>

      <style>{`.ks-carousel-track::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
