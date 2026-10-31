import { useEffect } from "react";

interface ScormModalProps {
  url: string;
  title: string;
  kicker: string;
  onClose: () => void;
}

export default function ScormModal({ url, title, kicker, onClose }: ScormModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(20, 18, 15, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 2vw, 24px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          background: "var(--paper)",
          border: "1px solid var(--ink)",
          boxShadow: "0 24px 60px rgba(20, 18, 15, 0.4)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px 16px",
            padding: "10px clamp(14px, 2vw, 22px)",
            borderBottom: "1px solid var(--ink)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(14px, 1.6vw, 18px)",
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                marginLeft: 12,
              }}
            >
              {kicker}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                padding: "7px 16px",
                border: "1px solid var(--ink)",
                color: "var(--ink)",
                textDecoration: "none",
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--ink)";
                (e.currentTarget as HTMLElement).style.color = "var(--paper)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--ink)";
              }}
            >
              Open in new tab &#8599;
            </a>
            <button
              onClick={onClose}
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                padding: "7px 16px",
                background: "var(--ink)",
                color: "var(--paper)",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--ink)";
              }}
            >
              Close &times;
            </button>
          </div>
        </div>

        {/* iframe */}
        <iframe
          src={url}
          title={title}
          allowFullScreen
          style={{
            width: "100%",
            height: "min(74vh, 700px)",
            border: 0,
            display: "block",
          }}
        />

        {/* Footer */}
        <div
          style={{
            padding: "8px clamp(14px, 2vw, 22px)",
            borderTop: "1px solid var(--rule)",
            fontFamily: "Archivo, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "var(--muted)",
            textAlign: "center",
          }}
        >
          Press escape to close &middot; If the course does not load here, open it in a new tab
        </div>
      </div>
    </div>
  );
}
