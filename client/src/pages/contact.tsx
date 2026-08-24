import { useEffect, useRef } from "react";
import { Link } from "wouter";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Contact() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.setAttribute("data-reveal", "in");
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function addRevealRef(el: HTMLElement | null) {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }

  return (
    <div style={{ padding: "clamp(22px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px)" }}>
      {/* Label */}
      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "#C0281B",
          marginBottom: 14,
        }}
      >
        Page 7 &middot; Classifieds
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(34px, 6vw, 72px)",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          margin: "0 0 14px",
        }}
      >
        Say hello
      </h1>
      <p
        style={{
          fontStyle: "italic",
          fontSize: "clamp(17px, 1.8vw, 21px)",
          lineHeight: 1.5,
          color: "#3A362F",
          maxWidth: "60ch",
          margin: "0 0 clamp(22px, 3vw, 36px)",
        }}
      >
        Email is the quickest way to reach me. I read everything and I usually reply the same day.
      </p>
      <div style={{ height: 3, background: "#14120F", marginBottom: "clamp(22px, 3vw, 36px)" }} />

      {/* Two column */}
      <div
        className="ks-two"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.1fr) minmax(260px, 1fr)",
          gap: "clamp(24px, 3vw, 40px)",
        }}
      >
        {/* Left: Write to me */}
        <div style={{ minWidth: 0 }}>
          <div style={{ border: "1px solid #14120F", padding: "clamp(18px, 2.4vw, 28px)", display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                borderBottom: "1px solid #14120F",
                paddingBottom: 9,
              }}
            >
              Write to me
            </div>
            <a
              href="mailto:kazeem.salau@yahoo.com"
              style={{
                display: "block",
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(22px, 3.6vw, 42px)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
                color: "#14120F",
                textDecoration: "none",
                marginBottom: 18,
                wordBreak: "break-all",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#C0281B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#14120F";
              }}
            >
              kazeem.salau@yahoo.com
            </a>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "#3A362F", margin: "0 0 18px" }}>
              A line or two is plenty to start. Who is it for, and what is going wrong? If a course is not the right
              fix, I will tell you that too, and we can work out what is.
            </p>
          </div>
        </div>

        {/* Right column */}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Direct lines */}
          <div style={{ border: "1px solid #14120F", padding: "16px 18px" }}>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                paddingBottom: 10,
                marginBottom: 12,
                borderBottom: "1px solid #14120F",
              }}
            >
              Direct lines
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
              }}
            >
              <a href="mailto:kazeem.salau@yahoo.com" style={{ color: "#C0281B", textDecoration: "none" }}>
                kazeem.salau@yahoo.com
              </a>
              <a
                href="https://linkedin.com/in/kazeem-salau-164b1087"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C0281B", textDecoration: "none" }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@moyoursalau"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C0281B", textDecoration: "none" }}
              >
                YouTube
              </a>
              <a
                href="https://grubshelf.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C0281B", textDecoration: "none" }}
              >
                grubshelf.app &#8599;
              </a>
              <a href="/files/KazeemSalau-InstructionalDesign.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#C0281B", textDecoration: "none" }}>
                Download resume (PDF)
              </a>
            </div>
          </div>

          {/* Right now */}
          <div
            ref={addRevealRef}
            data-reveal="off"
            style={{
              background: "#14120F",
              color: "#F4F1EA",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#9C968C",
                marginBottom: 12,
              }}
            >
              Right now
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 10px", color: "#CFC9BB" }}>
              I am happy to take on full-time instructional design and learning experience roles, and freelance work
              alongside them.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.5, margin: 0, fontStyle: "italic", color: "#9C968C" }}>
              In London, happy to work with teams anywhere.
            </p>
          </div>

          {/* Have a look first */}
          <div
            ref={addRevealRef}
            data-reveal="off"
            style={{ border: "1px solid #14120F", padding: "16px 18px" }}
          >
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                paddingBottom: 10,
                marginBottom: 12,
                borderBottom: "1px solid #14120F",
              }}
            >
              Have a look first
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#3A362F", margin: "0 0 12px" }}>
              All three courses here are playable in full, so you can see how I build before you write. It is the
              fastest way to tell whether we would get on.
            </p>
            <Link
              href="/work"
              onClick={scrollToTop}
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: "#C0281B",
                textDecoration: "none",
              }}
            >
              The case studies &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
