import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import ScormModal from "@/components/scorm-modal";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const COURSES = [
  {
    id: "bw",
    num: "01",
    tags: "Corporate &middot; Storyline 360",
    title: "Business Writing",
    description:
      "Writing that influences decisions: planning, structure, tone and editing for emails, reports, proposals and executive summaries.",
    href: "/work/business-writing",
    image: "/images/business-writing-hq.jpg",
    url: "https://codvacreatives.com/demo/Businesswriting/story_html5.html",
    kicker: "Corporate . Storyline 360",
    category: "corporate",
  },
  {
    id: "fixer",
    num: "02",
    tags: "Scenario &middot; Storyline",
    title: "The Fixer",
    description:
      "A branching assignment where the learner closes agency policy gaps under time and reputation pressure.",
    href: "/work/the-fixer",
    image: "/images/the-fixer-hq.jpg",
    url: "https://codvacreatives.com/demo/fixer/story_html5.html",
    kicker: "Scenario . Storyline, illustration",
    category: "scenario",
  },
  {
    id: "ei",
    num: "03",
    tags: "Corporate &middot; Storyline 360",
    title: "Emotional Intelligence",
    description:
      "Self-awareness, regulation and decision-making under pressure, taught through scenarios rather than definitions.",
    href: "/work/emotional-intelligence",
    image: "/images/emotional-intelligence-hq.jpg",
    url: "https://codvacreatives.com/demo/ei/story_html5.html",
    kicker: "Corporate . Storyline 360",
    category: "corporate",
  },
];

export default function Work() {
  const [filter, setFilter] = useState<"all" | "corporate" | "scenario">("all");
  const [playing, setPlaying] = useState<(typeof COURSES)[number] | null>(null);
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

  const filtered = COURSES.filter((c) => filter === "all" || c.category === filter);

  return (
    <div style={{ padding: "clamp(22px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px)" }}>
      {/* Header */}
      <div style={{ marginBottom: "clamp(22px, 3vw, 36px)" }}>
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
          Case studies &middot; Pages 2 to 4
        </div>
        <h1
          style={{
            fontFamily: "Archivo, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 5.6vw, 64px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            margin: "0 0 14px",
          }}
        >
          Demo the evidence.
        </h1>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "clamp(17px, 1.8vw, 21px)",
            lineHeight: 1.5,
            color: "#3A362F",
            maxWidth: "60ch",
            margin: 0,
          }}
        >
          Built in Articulate Storyline, packaged as SCORM, delivered through an LMS. Click through the decisions
          yourself, then read how each one was made.
        </p>
        <div style={{ height: 3, background: "#14120F", marginTop: "clamp(16px, 2vw, 24px)" }} />
      </div>

      {/* Filter chips */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "clamp(22px, 3vw, 36px)",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "Archivo, sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#5F5A50",
          }}
        >
          Sections
        </span>
        {[
          { label: "All three", value: "all" as const },
          { label: "Corporate", value: "corporate" as const },
          { label: "Scenario-based", value: "scenario" as const },
        ].map((chip) => (
          <button
            key={chip.value}
            onClick={() => setFilter(chip.value)}
            data-chip={filter === chip.value ? "on" : undefined}
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              padding: "7px 16px",
              border: "1px solid #14120F",
              background: filter === chip.value ? "#14120F" : "transparent",
              color: filter === chip.value ? "#F4F1EA" : "#14120F",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Cards — 3-column grid */}
      <div
        className="ks-work-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(16px, 2vw, 24px)",
        }}
      >
        {filtered.map((course) => (
          <div
            key={course.id}
            ref={addRevealRef}
            data-reveal="off"
            style={{
              border: "1px solid #14120F",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image */}
            <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#14120F" }}>
              <img
                src={course.image}
                alt={course.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: "clamp(14px, 1.8vw, 20px)", flex: 1, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "#5F5A50",
                  marginBottom: 10,
                }}
              >
                <span style={{ color: "#C0281B", fontWeight: 700 }}>{course.num}</span>
                {" · "}
                <span dangerouslySetInnerHTML={{ __html: course.tags }} />
              </div>
              <h3
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(20px, 2.4vw, 28px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase" as const,
                  margin: "0 0 10px",
                }}
              >
                {course.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#3A362F", margin: "0 0 18px", flex: 1 }}>
                {course.description}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link
                  href={course.href}
                  onClick={scrollToTop}
                  style={{
                    fontFamily: "Archivo, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    padding: "9px 20px",
                    background: "#14120F",
                    color: "#F4F1EA",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#C0281B";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#14120F";
                  }}
                >
                  Case study
                </Link>
                <button
                  onClick={() => setPlaying(course)}
                  style={{
                    fontFamily: "Archivo, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    padding: "9px 20px",
                    background: "transparent",
                    color: "#14120F",
                    border: "1px solid #14120F",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#14120F";
                    (e.currentTarget as HTMLElement).style.color = "#F4F1EA";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#14120F";
                  }}
                >
                  Play here &#9654;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ks-work-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {playing && (
        <ScormModal
          url={playing.url}
          title={playing.title}
          kicker={playing.kicker}
          onClose={() => setPlaying(null)}
        />
      )}
    </div>
  );
}
