import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { GRUBSHELF_MOCKUP } from "@/lib/grubshelf-mockup";
import { track } from "@/lib/track";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const ALL = GRUBSHELF_MOCKUP.flatMap((g) => g.screens.map((s) => ({ ...s, group: g.title })));

const kicker: CSSProperties = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#5F5A50",
};

const navButton: CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: "1px solid #F4F1EA",
  background: "transparent",
  color: "#F4F1EA",
  fontSize: 20,
  cursor: "pointer",
  flexShrink: 0,
};

function Viewer({ index, onClose, onGo }: { index: number; onClose: () => void; onGo: (i: number) => void }) {
  const screen = ALL[index];
  const touchX = useRef<number | null>(null);
  const go = useCallback((d: number) => onGo((index + d + ALL.length) % ALL.length), [index, onGo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${screen.title}, screen ${index + 1} of ${ALL.length}`}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(20, 18, 15, 0.94)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 3vw, 28px)", maxHeight: "calc(100vh - 110px)" }}>
        <button type="button" aria-label="Previous screen" onClick={(e) => { e.stopPropagation(); go(-1); }} style={navButton} className="ks-viewer-nav">
          &larr;
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#14120F",
            borderRadius: 34,
            padding: 8,
            border: "1px solid #3A362F",
            maxHeight: "calc(100vh - 110px)",
            overflowY: screen.tall ? "auto" : "hidden",
          }}
        >
          <img
            src={screen.src}
            alt={screen.title}
            style={{
              display: "block",
              width: screen.tall ? "min(340px, 78vw)" : "auto",
              height: screen.tall ? "auto" : "min(calc(100vh - 130px), 736px)",
              maxWidth: "78vw",
              borderRadius: 26,
            }}
          />
        </div>
        <button type="button" aria-label="Next screen" onClick={(e) => { e.stopPropagation(); go(1); }} style={navButton} className="ks-viewer-nav">
          &rarr;
        </button>
      </div>
      <div onClick={(e) => e.stopPropagation()} style={{ textAlign: "center", color: "#F4F1EA" }}>
        <div style={{ ...kicker, color: "#9C968C", marginBottom: 4 }}>
          {screen.group} &middot; {index + 1} / {ALL.length}
        </div>
        <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 800, fontSize: 16 }}>{screen.title}</div>
      </div>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{ ...navButton, position: "absolute", top: 16, right: 16, width: 44, height: 44 }}
      >
        &times;
      </button>
      <style>{`@media (max-width: 600px){.ks-viewer-nav{display:none}}`}</style>
    </div>
  );
}

export default function CaseGrubShelfScreens() {
  useSEO("/design/grubshelf/screens");
  const [open, setOpen] = useState<number | null>(null);

  let counter = 0;

  return (
    <div>
      <section style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
        <Link href="/design/grubshelf" onClick={scrollToTop} style={{ ...kicker, textDecoration: "none" }}>
          &larr; GrubShelf case study
        </Link>
        <div style={{ ...kicker, display: "flex", flexWrap: "wrap", gap: 14, margin: "22px 0 14px" }}>
          <span style={{ color: "#C0281B" }}>Product design</span>
          <span>iOS app</span>
          <span>&middot;</span>
          <span>{ALL.length} screens</span>
        </div>
        <h1
          style={{
            fontFamily: "Archivo, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(34px, 5.6vw, 74px)",
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            margin: "0 0 18px",
          }}
        >
          GrubShelf, every screen
        </h1>
        <p style={{ fontSize: "clamp(18px, 2vw, 23px)", lineHeight: 1.4, fontStyle: "italic", color: "#3A362F", maxWidth: "56ch", margin: "0 0 20px" }}>
          The full mockup the app was built from, grouped by flow. Tap any screen to see it full size.
        </p>
        <div style={{ height: 4, background: "#14120F", marginBottom: 28 }} />
      </section>

      {GRUBSHELF_MOCKUP.map((group, gi) => (
        <section key={group.title} style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 48px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", alignItems: "baseline", borderTop: gi ? "1px solid #14120F" : "none", paddingTop: gi ? 18 : 0, marginBottom: 16 }}>
            <h2
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(20px, 2.4vw, 28px)",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              <span style={{ color: "#C0281B", marginRight: 10 }}>{String(gi + 1).padStart(2, "0")}</span>
              {group.title}
            </h2>
            <span style={{ fontSize: 15, fontStyle: "italic", color: "#5F5A50" }}>
              {group.description} {group.screens.length} screens.
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "clamp(12px, 1.6vw, 20px)" }}>
            {group.screens.map((s) => {
              const i = counter++;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => {
                    setOpen(i);
                    track("mockup_screen_open", { screen: s.title });
                  }}
                  style={{ border: "none", background: "none", padding: 0, cursor: "zoom-in", textAlign: "left", fontFamily: "inherit", display: "flex", flexDirection: "column", alignSelf: "start" }}
                >
                  <span
                    style={{
                      display: "block",
                      aspectRatio: "390 / 844",
                      overflow: "hidden",
                      borderRadius: 16,
                      border: "1px solid #14120F",
                      background: "#FFFFFF",
                    }}
                  >
                    <img
                      src={s.src}
                      alt={s.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                    />
                  </span>
                  <span style={{ display: "block", fontSize: 14, lineHeight: 1.35, color: "#3A362F", marginTop: 8 }}>{s.title}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}>
        <div style={{ borderTop: "4px solid #14120F", paddingTop: 16, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/design/grubshelf"
            onClick={scrollToTop}
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(22px, 3vw, 36px)",
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
              color: "#14120F",
              textDecoration: "none",
            }}
          >
            &larr; Back to the case study
          </Link>
          <Link
            href="/contact"
            onClick={scrollToTop}
            data-track="mockup_hire"
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "14px 24px",
              background: "#C0281B",
              color: "#F4F1EA",
              textDecoration: "none",
            }}
          >
            Hire me for an app like this
          </Link>
        </div>
      </section>

      {open !== null && <Viewer index={open} onClose={() => setOpen(null)} onGo={setOpen} />}
    </div>
  );
}
