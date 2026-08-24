export default function Footer() {
  const linkStyle = { color: "#E7E3DA", textDecoration: "none" } as const;
  const hover = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
  };
  const unhover = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.color = "#E7E3DA";
  };

  return (
    <footer
      style={{
        borderTop: "4px solid #14120F",
        background: "#14120F",
        color: "#E7E3DA",
      }}
    >
      <div
        style={{
          padding: "clamp(20px, 2.6vw, 30px) clamp(16px, 2.6vw, 30px)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px 32px",
          fontFamily: "Archivo, sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase" as const,
        }}
      >
        <span style={{ color: "#9C968C" }}>&copy; 2026 Kazeem Salau &middot; Printed in London</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <a href="mailto:kazeem.salau@yahoo.com" style={linkStyle} onMouseEnter={hover} onMouseLeave={unhover}>
            Email
          </a>
          <a
            href="https://linkedin.com/in/kazeem-salau-164b1087"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            LinkedIn
          </a>
          <a
            href="https://www.youtube.com/@moyoursalau"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            YouTube
          </a>
          <a
            href="https://grubshelf.app"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            GrubShelf &#8599;
          </a>
          <a
            href="/files/KazeemSalau-InstructionalDesign.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            Resume PDF
          </a>
        </div>
      </div>
    </footer>
  );
}
