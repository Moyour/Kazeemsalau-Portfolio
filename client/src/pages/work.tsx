import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import ScormModal from "@/components/scorm-modal";
import { useSEO } from "@/hooks/use-seo";
import { Words } from "@/components/motion";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const COURSES = [
  {
    id: "bdo",
    page: "2",
    tags: "Scenario &middot; SCORM",
    title: "Before Day One",
    description:
      "A new starter's first week, from Tuesday night's offer to clocking out on Day One.",
    href: "/work/before-day-one",
    image: "/images/before-day-one.jpg",
    url: "/courses/before-day-one/index.html",
    kicker: "Scenario . Custom build, SCORM",
    category: "scenario",
  },
  {
    id: "bw",
    page: "3",
    tags: "Corporate &middot; Storyline 360",
    title: "Business Writing",
    description:
      "Writing that drives decisions: planning, structure, tone and editing for emails, reports and proposals.",
    href: "/work/business-writing",
    image: "/images/business-writing-frame.jpg",
    url: "https://codvacreatives.com/demo/Businesswriting/story_html5.html",
    kicker: "Corporate . Storyline 360",
    category: "corporate",
  },
  {
    id: "fixer",
    page: "4",
    tags: "Scenario &middot; Storyline",
    title: "The Fixer",
    description:
      "A branching assignment: close an agency's policy gaps under time and reputation pressure.",
    href: "/work/the-fixer",
    image: "/images/the-fixer-frame.jpg",
    url: "https://codvacreatives.com/demo/fixer/story_html5.html",
    kicker: "Scenario . Storyline, illustration",
    category: "scenario",
  },
  {
    id: "ei",
    page: "5",
    tags: "Corporate &middot; Storyline 360",
    title: "Emotional Intelligence",
    description:
      "Self-awareness and decisions under pressure, taught through scenarios, not definitions.",
    href: "/work/emotional-intelligence",
    image: "/images/emotional-intelligence-frame.jpg",
    url: "https://codvacreatives.com/demo/ei/story_html5.html",
    kicker: "Corporate . Storyline 360",
    category: "corporate",
  },
];

export default function Work() {
  useSEO("/work");
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
            fontFamily: "var(--font-learning-text)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--accent)",
            marginBottom: 14,
          }}
        >
          Case studies &middot; Pages 2 to 5
        </div>
        <h1
          className="ks-page-h1"
          style={{
            fontFamily: "var(--font-learning-text)",
            fontWeight: 900,
            fontSize: "clamp(32px, 5.6vw, 64px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            margin: "0 0 14px",
          }}
        >
          <Words text="eLearning courses & SCORM demos." />
        </h1>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "clamp(17px, 1.8vw, 21px)",
            lineHeight: 1.5,
            color: "var(--body)",
            maxWidth: "60ch",
            margin: 0,
          }}
        >
          SCORM courses, delivered through an LMS. Play the decisions yourself, then read how each was made.
        </p>
        <div style={{ height: 4, background: "var(--ink)", marginTop: "clamp(16px, 2vw, 24px)" }} />
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
            fontFamily: "var(--font-learning-text)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--muted)",
          }}
        >
          Sections
        </span>
        {[
          { label: "All four", value: "all" as const },
          { label: "Corporate", value: "corporate" as const },
          { label: "Scenario-based", value: "scenario" as const },
        ].map((chip) => (
          <button
            key={chip.value}
            onClick={() => setFilter(chip.value)}
            data-chip={filter === chip.value ? "on" : undefined}
            style={{
              fontFamily: "var(--font-learning-text)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              padding: "9px 16px",
              border: "1px solid var(--ink)",
              background: filter === chip.value ? "var(--ink)" : "transparent",
              color: filter === chip.value ? "var(--paper)" : "var(--ink)",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (filter !== chip.value) {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--paper)";
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== chip.value) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)";
                (e.currentTarget as HTMLElement).style.color = "var(--ink)";
              }
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Cards: two by two, so four courses (or a section's two) fill their rows. */}
      <div
        className="ks-work-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "clamp(16px, 2vw, 24px)",
        }}
      >
        {filtered.map((course) => (
          <div
            key={course.id}
            ref={addRevealRef}
            data-reveal="off"
            style={{
              border: "1px solid var(--ink)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image */}
            <div
              style={{ height: 220, overflow: "hidden", background: "var(--ink)", viewTransitionName: `media-${course.href.split("/").pop()}` }}
            >
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
                  fontFamily: "var(--font-learning-text)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "var(--muted)",
                  marginBottom: 10,
                }}
              >
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>Page {course.page}</span>
                {" · "}
                <span dangerouslySetInnerHTML={{ __html: course.tags }} />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-learning-text)",
                  fontWeight: 900,
                  fontSize: "clamp(20px, 2.4vw, 28px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase" as const,
                  margin: "0 0 10px",
                }}
              >
                {course.title}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--body)", margin: "0 0 18px", flex: 1 }}>
                {course.description}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link
                  href={course.href}
                  onClick={scrollToTop}
                  style={{
                    fontFamily: "var(--font-learning-text)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    padding: "9px 20px",
                    background: "var(--ink)",
                    color: "var(--paper)",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--ink)";
                  }}
                >
                  Case study
                </Link>
                <button
                  onClick={() => setPlaying(course)}
                  style={{
                    fontFamily: "var(--font-learning-text)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    padding: "9px 20px",
                    background: "transparent",
                    color: "var(--ink)",
                    border: "1px solid var(--ink)",
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
