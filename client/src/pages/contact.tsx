import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { paperFor } from "@/lib/paper";
import { useSEO } from "@/hooks/use-seo";
import { track } from "@/lib/track";
import ContactForm from "@/components/contact-form";
import { Words } from "@/components/motion";

const EMAIL = "kazeem.salau@yahoo.com";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const btnStyle = {
  fontFamily: "var(--font-learning-text)",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  padding: "12px 20px",
  textDecoration: "none",
};

const boxLabelStyle = {
  fontFamily: "var(--font-learning-text)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  borderBottom: "1px solid var(--ink)",
  paddingBottom: 9,
};

export default function Contact() {
  const [location] = useLocation();
  const paper = paperFor(location);
  const video = paper === "video";
  const product = paper === "product";
  useSEO("/contact");
  useEffect(() => {
    if (video) document.title = "Hire a video editor | Kazeem Salau";
    if (product) document.title = "Hire a product designer | Kazeem Salau";
  }, [video, product]);
  const revealRefs = useRef<HTMLElement[]>([]);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy my email address:", EMAIL);
    }
    track("contact_email_copy");
  }

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
          fontFamily: "var(--font-learning-text)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "var(--accent)",
          marginBottom: 14,
        }}
      >
        Page 7 &middot; Classifieds
      </div>

      {/* Title */}
      <h1
        className="ks-page-h1"
        style={{
          fontFamily: "var(--font-learning-text)",
          fontWeight: 900,
          fontSize: "clamp(34px, 6vw, 72px)",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          margin: "0 0 14px",
        }}
      >
        <Words text={video ? "Hire a video editor" : product ? "Hire a product designer" : "Hire a learning experience designer"} />
      </h1>
      <p
        style={{
          fontStyle: "italic",
          fontSize: "clamp(17px, 1.8vw, 21px)",
          lineHeight: 1.5,
          color: "var(--body)",
          maxWidth: "60ch",
          margin: "0 0 clamp(22px, 3vw, 36px)",
        }}
      >
        Tell me what you need. I read everything and usually reply the same day.
      </p>
      <div style={{ height: 4, background: "var(--ink)", marginBottom: "clamp(22px, 3vw, 36px)" }} />

      {/* Two column */}
      <div
        className="ks-two"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.1fr) minmax(260px, 1fr)",
          gap: "clamp(24px, 3vw, 40px)",
        }}
      >
        {/* Left: Form + email */}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ border: "1px solid var(--ink)", padding: "clamp(18px, 2.4vw, 28px)", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={boxLabelStyle}>Send a message</div>
            <ContactForm
              fallbackEmail={EMAIL}
              reasons={
                video
                  ? ["I need a film cut", "I'm hiring for a role", "Something else"]
                  : product
                    ? ["I need an app or site designed", "I'm hiring for a role", "Something else"]
                    : ["I need a course built", "I'm hiring for a role", "Something else"]
              }
              prompt={video ? "About the film" : product ? "About the app" : "Who is it for, and what is going wrong?"}
            />
          </div>

        </div>

        {/* Right column */}
        <div className="ks-sidebar" style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Direct lines */}
          <div style={{ border: "1px solid var(--ink)", padding: "16px 18px" }}>
            <div
              style={{
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                paddingBottom: 10,
                marginBottom: 12,
                borderBottom: "1px solid var(--ink)",
              }}
            >
              Direct lines
            </div>
            {/* Email first, as buttons; then the other ways to reach me. */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry")}`}
                data-track="contact_email_button"
                style={{ ...btnStyle, background: "var(--accent)", color: "var(--paper)", boxShadow: "4px 4px 0 var(--ink)" }}
              >
                Email me
              </a>
              <button onClick={copyEmail} style={{ ...btnStyle, background: "transparent", color: "var(--ink)", border: "2px solid var(--ink)", cursor: "pointer" }}>
                {copied ? "Copied \u2713" : "Copy email address"}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
              }}
            >
              <a
                href="https://linkedin.com/in/kazeem-salau-164b1087"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@Moyoursalau"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                YouTube
              </a>
              {product ? (
                <a
                  href="https://grubshelf.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                  grubshelf.app &#8599;
                </a>
              ) : null}
              {paper === "learning" ? (
                <a href="/files/KazeemSalau-InstructionalDesign.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
                  Download resume (PDF)
                </a>
              ) : null}
            </div>
          </div>

          {/* Right now */}
          <div
            ref={addRevealRef}
            data-reveal="off"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#9C968C",
                marginBottom: 12,
              }}
            >
              Right now
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 10px", color: "var(--rule)" }}>
              {video
                ? "Video editing. Full-time or freelance."
                : product
                  ? "Product design. Full-time or freelance."
                  : "Instructional and learning experience design. Full-time or freelance."}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.5, margin: 0, fontStyle: "italic", color: "#9C968C" }}>
              London-based; teams anywhere.
            </p>
          </div>

          {/* Have a look first */}
          <div
            ref={addRevealRef}
            data-reveal="off"
            style={{ border: "1px solid var(--ink)", padding: "16px 18px" }}
          >
            <div
              style={{
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                paddingBottom: 10,
                marginBottom: 12,
                borderBottom: "1px solid var(--ink)",
              }}
            >
              Have a look first
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--body)", margin: "0 0 12px" }}>
              {video ? "The films are on the reel." : product ? "The apps have clickable screens." : "The courses are playable in full."}
            </p>
            <Link
              className="ks-tap"
              href={video ? "/video/reel" : product ? "/products" : "/work"}
              onClick={scrollToTop}
              style={{
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: "var(--accent)",
                textDecoration: "none",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: 3,
              }}
            >
              {video ? "The reel" : product ? "App and design" : "The case studies"} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
