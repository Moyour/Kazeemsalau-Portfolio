import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import ScormModal from "@/components/scorm-modal";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

interface CaseStudyProps {
  pageNum: string;
  tags: string[];
  title: string;
  tagline: string;
  playUrl: string;
  playKicker: string;
  image: string;
  imageCaption: string;
  challenge: string;
  solution: string;
  process: string;
  outcome: string;
  nextLabel: string;
  nextHref: string;
  nextPageNum: string;
  nextDirection: "Continued on" | "Back to";
}

export default function CaseStudyLayout(props: CaseStudyProps) {
  const [playing, setPlaying] = useState(false);
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

  const sections = [
    { label: "The challenge", text: props.challenge },
    { label: "The solution", text: props.solution },
    { label: "The process", text: props.process },
    { label: "The outcome", text: props.outcome },
  ];

  return (
    <div>
      <section style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
        {/* Back link */}
        <Link
          href="/work"
          onClick={scrollToTop}
          style={{
            fontFamily: "Archivo, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "#5F5A50",
            textDecoration: "none",
          }}
        >
          &larr; All case studies
        </Link>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            fontFamily: "Archivo, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "#5F5A50",
            margin: "22px 0 14px",
          }}
        >
          <span style={{ color: "#C0281B" }}>Page {props.pageNum}</span>
          {props.tags.slice(1).map((tag, i, arr) => (
            <span key={i}>
              {tag}
              {i < arr.length - 1 && <span style={{ marginLeft: 14 }}>&middot;</span>}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "Archivo, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 6.4vw, 84px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            textTransform: "uppercase" as const,
            margin: "0 0 18px",
          }}
        >
          {props.title}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(18px, 2vw, 23px)",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "#3A362F",
            maxWidth: "54ch",
            margin: "0 0 20px",
          }}
        >
          {props.tagline}
        </p>

        {/* Byline bar with play button inside */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            padding: "10px 0",
            borderTop: "1px solid #14120F",
            borderBottom: "1px solid #14120F",
            fontFamily: "Archivo, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "#5F5A50",
          }}
        >
          <span style={{ color: "#14120F" }}>By Kazeem Salau</span>
          <button
            onClick={() => setPlaying(true)}
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              padding: "14px 26px",
              background: "#C0281B",
              color: "#F4F1EA",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              boxShadow: "4px 4px 0 #14120F",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#14120F";
              (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #C0281B";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C0281B";
              (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #14120F";
            }}
          >
            &#9654; Play the full course
          </button>
        </div>

        {/* Hero image */}
        <div
          style={{
            height: "clamp(240px, 36vw, 480px)",
            background: "#14120F",
            border: "1px solid #14120F",
            marginTop: 22,
            overflow: "hidden",
          }}
        >
          <img
            src={props.image}
            alt={props.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            paddingTop: 7,
            fontFamily: "Archivo, sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "#5F5A50",
            borderBottom: "1px solid #CFC9BB",
            paddingBottom: 8,
            marginBottom: 26,
          }}
        >
          <span style={{ color: "#C0281B" }}>Fig. 1</span>
          <span>{props.imageCaption}</span>
        </div>
      </section>

      {/* Content sections */}
      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(26px, 3.4vw, 42px)" }}>
        {sections.map((section, i) => (
          <div
            key={i}
            ref={addRevealRef}
            data-reveal="off"
            style={{ marginBottom: 26 }}
          >
            <h2
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                textTransform: "uppercase" as const,
                margin: "0 0 12px",
                borderBottom: "1px solid #14120F",
                paddingBottom: 9,
              }}
            >
              {section.label}
            </h2>
            <div className="ks-cols" style={{ columns: 2, columnGap: 34, columnRule: "1px solid #CFC9BB" }}>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: "#3A362F", margin: 0 }}>{section.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer nav */}
      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(26px, 3.4vw, 42px)" }}>
        <div
          style={{
            borderTop: "4px solid #14120F",
            paddingTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#5F5A50",
                marginBottom: 10,
              }}
            >
              {props.nextDirection} page {props.nextPageNum}
            </div>
            <Link
              href={props.nextHref}
              onClick={scrollToTop}
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(26px, 3.6vw, 46px)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                textTransform: "uppercase" as const,
                color: "#14120F",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#C0281B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#14120F";
              }}
            >
              {props.nextLabel} &rarr;
            </Link>
          </div>
          <a
            href="mailto:kazeem.salau@yahoo.com"
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              padding: "14px 24px",
              background: "#C0281B",
              color: "#F4F1EA",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#14120F";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C0281B";
            }}
          >
            Get in touch
          </a>
        </div>
      </section>

      {playing && (
        <ScormModal
          url={props.playUrl}
          title={props.title}
          kicker={props.playKicker}
          onClose={() => setPlaying(false)}
        />
      )}
    </div>
  );
}
