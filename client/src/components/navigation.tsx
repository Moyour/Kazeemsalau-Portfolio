import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { label: "Front page", href: "/" },
  { label: "Case studies", href: "/work" },
  { label: "App development", href: "/apps" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Navigation() {
  const [location] = useLocation();
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
          background: "#C0281B",
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
          borderBottom: "1px solid #14120F",
          fontFamily: "Archivo, sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "#5F5A50",
        }}
      >
        <span>Instructional design &amp; eLearning development</span>
        <span>{dateline}</span>
        <span>Portfolio edition &middot; No. 01</span>
      </div>

      {/* Masthead */}
      <div style={{ padding: "clamp(18px, 3vw, 34px) clamp(16px, 2.6vw, 30px) 0", textAlign: "center" }}>
        <Link href="/" onClick={scrollToTop} style={{ display: "block", color: "#14120F", textDecoration: "none" }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span
              className="ks-anim"
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
            background: "#14120F",
            margin: "14px 0 0",
            transformOrigin: "left",
            animation: "ks-rule 0.9s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        />
        <div
          className="ks-anim"
          style={{
            height: 4,
            background: "#14120F",
            margin: "2px 0 0",
            transformOrigin: "left",
            animation: "ks-rule 0.9s 0.58s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        />
      </div>

      {/* Sticky nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "#F4F1EA",
          borderBottom: "1px solid #14120F",
        }}
      >
        {/* Mobile toggle */}
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
            color: "#14120F",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          className="ks-mobile-toggle"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>

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
            const isActive = link.href === "/" ? location === "/" : location.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={scrollToTop}
                className="ks-nav-link"
                style={{
                  padding: "11px 22px",
                  color: isActive ? "#F4F1EA" : "#14120F",
                  background: isActive ? "#C0281B" : "transparent",
                  borderRight: i < NAV_LINKS.length - 1 ? "1px solid #CFC9BB" : "none",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = "#C0281B";
                    (e.target as HTMLElement).style.color = "#F4F1EA";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.color = "#14120F";
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
          .ks-mobile-toggle {
            display: block !important;
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
            border-bottom: 1px solid #CFC9BB;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
