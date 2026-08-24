import { Link } from "wouter";

export default function NotFound() {
  return (
    <div style={{ padding: "clamp(40px, 6vw, 80px) clamp(16px, 2.6vw, 30px)", textAlign: "center" }}>
      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(60px, 14vw, 160px)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          color: "#CFC9BB",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(20px, 3vw, 32px)",
          margin: "16px 0 12px",
        }}
      >
        Page not found
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: "#3A362F", marginBottom: 24 }}>
        This page does not exist. Try the front page instead.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "Archivo, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          padding: "10px 24px",
          background: "#14120F",
          color: "#F4F1EA",
          textDecoration: "none",
        }}
      >
        Front page &rarr;
      </Link>
    </div>
  );
}
