import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { editionName, getEdition } from "@/lib/edition";
import { PAPERS, paperFor, type Paper } from "@/lib/paper";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// `paper` fixes which paper this is; otherwise it follows the route.
export default function Navigation({ paper: fixed }: { paper?: Paper } = {}) {
  const [location] = useLocation();
  const paper = fixed ?? paperFor(location);
  const NAV_LINKS = PAPERS[paper].sections;
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const dateline = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 3,
          background: "var(--accent)",
          transform: `scaleX(${progress})`,
          transformOrigin: "left",
          zIndex: 60,
          pointerEvents: "none",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 20px",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px clamp(16px, 2.6vw, 30px)",
          borderBottom: "1px solid var(--ink)",
          fontFamily: "Archivo, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "var(--muted)",
        }}
      >
        <span>{PAPERS[paper].disciplines}</span>
        <span>{dateline}</span>
        <span>
          {editionName()} &middot; No. {String(getEdition().copy).padStart(2, "0")}
        </span>
      </div>

      {/* Masthead */}
      <div style={{ padding: "clamp(18px, 3vw, 34px) clamp(16px, 2.6vw, 30px) 0", textAlign: "center" }}>
        <Link href="/" data-section="" aria-label="Kazeem Salau: back to the table" style={{ display: "block", color: "var(--ink)", textDecoration: "none" }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span
              className="ks-anim ks-masthead"
              style={{
                display: "block",
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(38px, 9.4vw, 132px)",
                lineHeight: 0.86,
                letterSpacing: "-0.045em",
                textTransform: "uppercase" as const,
                animation: "ks-rise 1s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            >
              Kazeem Salau
            </span>
          </span>
        </Link>
        <div
          className="ks-anim"
          style={{
            height: 1,
            background: "var(--ink)",
            margin: "14px 0 0",
            transformOrigin: "left",
            animation: "ks-rule 0.9s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        />
        <div
          className="ks-anim"
          style={{
            height: 4,
            background: "var(--ink)",
            margin: "2px 0 0",
            transformOrigin: "left",
            animation: "ks-rule 0.9s 0.58s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        />
        {/* Which paper this is, and the way to the other one */}
      </div>

      {/* Sticky nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "var(--paper)",
          borderBottom: "1px solid var(--ink)",
        }}
      >
        {/* Mobile toggle */}
        <div className="ks-mobile-bar" style={{ display: "none" }}>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            display: "none",
            width: "100%",
            padding: "11px 22px",
            fontFamily: "Archivo, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--ink)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          className="ks-mobile-toggle"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
        <Link
          href="/contact"
          onClick={scrollToTop}
          data-track="nav_hire_mobile"
          style={{
            flexShrink: 0,
            padding: "11px 22px",
            fontFamily: "Archivo, sans-serif",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            background: "var(--accent)",
            color: "var(--paper)",
            textDecoration: "none",
          }}
        >
          Hire
        </Link>
        </div>

        <div
          className={`ks-nav-links ${mobileOpen ? "ks-nav-open" : ""}`}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
            justifyContent: "center",
            fontFamily: "Archivo, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
          }}
        >
          {NAV_LINKS.map((link, i) => {
            const isActive =
              i === 0 ? location === link.href : (link.match ?? [link.href]).some((m) => location.startsWith(m));
            const isCta = link.href === "/contact";
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={scrollToTop}
                className="ks-nav-link"
                style={{
                  padding: "11px 22px",
                  color: isActive || isCta ? "var(--paper)" : "var(--ink)",
                  background: isActive ? "var(--accent)" : isCta ? "var(--ink)" : "transparent",
                  fontWeight: isCta ? 800 : undefined,
                  borderRight: i < NAV_LINKS.length - 1 ? "1px solid var(--rule)" : "none",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = "var(--accent)";
                    (e.target as HTMLElement).style.color = "var(--paper)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = isCta ? "var(--ink)" : "transparent";
                    (e.target as HTMLElement).style.color = isCta ? "var(--paper)" : "var(--ink)";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <style>{`
        @media (max-width: 700px) {
          .ks-mobile-bar {
            display: flex !important;
          }
          .ks-mobile-toggle {
            display: block !important;
            text-align: left;
          }
          .ks-nav-links {
            display: none !important;
            flex-direction: column;
          }
          .ks-nav-links.ks-nav-open {
            display: flex !important;
          }
          .ks-nav-link {
            border-right: none !important;
            border-bottom: 1px solid var(--rule);
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
