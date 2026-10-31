import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Words, CountUp } from "@/components/motion";
import { NewsPhoto, LivingPhones, toReels } from "@/components/news-motion";
import { GRUBSHELF_SCREENS } from "@/lib/product-screens";
import CvCoupon from "@/components/cv-coupon";
import { PAPERS, type Paper } from "@/lib/paper";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Flagged "New" on the skills ticker.
const NEW_SKILLS = new Set(["SwiftUI"]);

type Step = { num: string; title: string; desc: string };

// What each paper's front page carries. The layout is shared; the stories
// are split between the two disciplines.
export const EDITIONS: Record<
  Paper,
  {
    headline: [string, string];
    standfirst: string;
    role: string;
    // The lead story; the first paragraph opens with a drop cap.
    story: string[];
    issue: { label: string; page: string; href: string }[];
    stats: { value: string; label: string }[];
    skills: string[];
    featuredNote: string;
    featured: Omit<Parameters<typeof CourseCard>[0], "addRevealRef" | "reverse" | "last">;
    // Set in the hero under the story.
    pull: { quote: string; by: string };
    // Two more stories run under the featured one.
    more: { title: string; line: string; href: string; image: string; page: string; phones?: boolean }[];
    howLabel: string;
    steps: Step[];
    cta: string;
  }
> = {
  learning: {
    headline: ["Learning experience", "designer"],
    standfirst: "Courses people finish. From the needs analysis to the SCORM package.",
    role: "Instructional designer & learning experience designer",
    story: [
      "I have been an instructional designer since 2014, building courses for blended and self-paced learning for learners spread across the globe. I work the ADDIE model with subject matter experts, write the script, then produce it in Storyline 360, Rise and Camtasia.",
      "I define the course itself: observable, measurable learning outcomes, performance competencies, interactive elements, case studies, assessments, portfolio and capstone projects. Then I script the dialogue in conversational tones, so a new concept arrives the way a colleague would explain it.",
    ],
    issue: [
      { label: "Learning case studies", page: "P. 2", href: "/work" },
      { label: "The Fixer, featured course", page: "P. 3", href: "/work/the-fixer" },
      { label: "About, and what people say", page: "P. 6", href: "/about" },
    ],
    stats: [
      { value: "50+", label: "Courses in one curriculum" },
      { value: "+20%", label: "Course completion" },
      { value: "2014", label: "Designing since" },
    ],
    skills: [
      "Articulate Storyline 360",
      "Articulate Rise",
      "Camtasia",
      "ADDIE model",
      "Storyboarding",
      "Instructional writing",
      "Assessment creation",
      "Adobe Captivate",
      "Blended learning",
      "LMS & Moodle",
      "Synthesia",
      "Vyond",
      "Learning theory",
      "Agile project management",
    ],
    featuredNote: "Playable in full",
    featured: {
      num: "01",
      tags: ["Learning experience design", "Branching scenario"],
      title: "The Fixer",
      description:
        "A branching special assignment: the learner is sent to close the policy knowledge gaps that are costing an agency its service delivery. Playable in full.",
      href: "/work/the-fixer",
      page: "3",
      image: "/images/the-fixer-hq.jpg",
      more: { label: "All learning case studies", href: "/work" },
    },
    pull: {
      quote: "Training fails on the writing long before it fails on the technology.",
      by: "Kazeem Salau \u00b7 Opinion",
    },
    more: [
      {
        title: "Business Writing",
        line: "Writing that gets read, and gets acted on.",
        href: "/work/business-writing",
        image: "/images/business-writing-hq.jpg",
        page: "2",
      },
      {
        title: "Emotional Intelligence",
        line: "Noticing the trigger before it changes the decision.",
        href: "/work/emotional-intelligence",
        // Unsplash photo by Memento Media (Unsplash Licence).
        image: "/images/emotional-intelligence-meeting.jpg",
        page: "4",
      },
    ],
    howLabel: "How I build a course",
    steps: [
      {
        num: "01",
        title: "Start with the people",
        desc: "A needs analysis with subject matter experts. Clear, measurable outcomes before anything gets built.",
      },
      {
        num: "02",
        title: "Script and storyboard",
        desc: "Storyboards and conversational scripts, tested before they get built.",
      },
      {
        num: "03",
        title: "Build, ship, improve",
        desc: "Storyline 360, Rise and Camtasia packaged for the LMS. Then reviewed and improved once real learners use it.",
      },
    ],
    cta: "Got a course that needs to actually work?",
  },
  product: {
    headline: ["Product", "designer"],
    standfirst: "Apps people use. From the first user interview to a working build.",
    role: "Product designer",
    story: [
      "I started out as a graphic designer, hold a B.Sc. in Computer Science, and now research, design and build apps: GrubShelf, a meal planner for UK households built in SwiftUI, and Mai Shara, a waste pick-up app taken from user interviews to prototype.",
      "The method is the one I use for courses: start with the people, test before building, improve once it is live.",
    ],
    issue: [
      { label: "App and design work", page: "P. 2", href: "/products" },
      { label: "GrubShelf, featured app", page: "P. 3", href: "/design/grubshelf" },
      { label: "Mai Shara, from interviews to prototype", page: "P. 4", href: "/design/mai-shara" },
      { label: "About, and what people say", page: "P. 6", href: "/about" },
    ],
    stats: [
      { value: "6", label: "Product design projects" },
      { value: "2", label: "Mobile apps, research to build" },
      { value: "2", label: "Websites, health and food" },
    ],
    skills: [
      "UX design",
      "Figma",
      "User research",
      "Prototyping",
      "Design systems",
      "SwiftUI",
      "Adobe Creative Suite",
      "Agile project management",
    ],
    featuredNote: "From spec to a SwiftUI build",
    featured: {
      num: "01",
      tags: ["Product design", "iOS app"],
      title: "GrubShelf",
      description:
        "A meal planner for UK households: pick your meals, get a list split by shop, know what it costs. Taken from spec to a working SwiftUI build.",
      href: "/design/grubshelf",
      page: "3",
      phones: toReels(GRUBSHELF_SCREENS.map((x) => x.src)),
      more: { label: "All app and design work", href: "/products" },
    },
    pull: {
      quote: "Kazeem is the best Product Designer I have ever worked with in my career.",
      by: "Damilola \u00b7 Senior Software Developer",
    },
    more: [
      {
        title: "Mai Shara",
        line: "Scheduling and tracking waste pick-ups, from user interviews to prototype.",
        href: "/design/mai-shara",
        // The app's own screens on its orange, as on its case study.
        phones: true,
        image: "",
        page: "4",
      },
      {
        title: "The GrubShelf website",
        line: "One job: the waiting list. The receipt demo does the selling.",
        href: "/design/grubshelf-website",
        image: "/images/grubshelf-web/full.jpg",
        page: "5",
      },
    ],
    howLabel: "How I build an app",
    steps: [
      {
        num: "01",
        title: "Start with the people",
        desc: "Interviews with the people who will use the app. Clear, measurable outcomes before anything gets built.",
      },
      {
        num: "02",
        title: "Flows and prototypes",
        desc: "Flows, wireframes and clickable prototypes, tested before they get built.",
      },
      {
        num: "03",
        title: "Build, ship, improve",
        desc: "SwiftUI shipped to a phone. Then reviewed and improved once real people use it.",
      },
    ],
    cta: "Got an app that needs to actually work?",
  },
};

const sectionNote = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "var(--muted)",
};

export const ctaStyle = {
  display: "inline-block",
  fontFamily: "Archivo, sans-serif",
  fontWeight: 800,
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  padding: "14px 22px",
  textDecoration: "none",
};

export function SkillsMarquee({ skills }: { skills: string[] }) {
  // Read like the markets page: every skill trading up, the newest flagged.
  const items = [
    <span key="m" style={{ color: "#9C968C" }}>
      Skills market &middot; Close
    </span>,
    ...skills.map((s, i) => (
      <span key={i}>
        <span>{s}</span>
        {NEW_SKILLS.has(s) ? (
          <span style={{ color: "var(--paper)", background: "var(--accent)", padding: "1px 5px", marginLeft: 7 }}>New</span>
        ) : (
          <span style={{ color: "#9C968C", marginLeft: 7 }}>&#9650;</span>
        )}
      </span>
    )),
  ];

  return (
    <div
      style={{
        borderTop: "1px solid var(--ink)",
        borderBottom: "1px solid var(--ink)",
        background: "var(--ink)",
        color: "var(--paper)",
        overflow: "hidden",
        padding: "11px 0",
        margin: "clamp(26px, 3.4vw, 40px) 0 0",
      }}
    >
      <div
        className="ks-anim"
        style={{
          display: "flex",
          width: "max-content",
          animation: "ks-marquee 46s linear infinite",
          fontFamily: "Archivo, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        <div style={{ display: "flex", gap: "0 28px", paddingRight: 28 }}>{items}</div>
        <div style={{ display: "flex", gap: "0 28px", paddingRight: 28 }} aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}

// Fig. 1, the portrait. On phones it runs straight under the headline, as
// the lead story's photo, so the folded paper shows name, roles and face;
// on wider screens it heads the sidebar.
function Portrait({ className }: { className: string }) {
  return (
    <div className={`ks-anim ${className}`} style={{ animation: "ks-fade 1s 0.6s both" }}>
      <div style={{ height: "clamp(280px, 32vw, 380px)", background: "var(--accent)", border: "1px solid var(--ink)", overflow: "hidden" }}>
        <img
          src="/images/portrait.png"
          alt="Kazeem Salau"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          paddingTop: 7,
          fontFamily: "Archivo, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "var(--muted)",
          borderBottom: "1px solid var(--rule)",
          paddingBottom: 8,
        }}
      >
        <span style={{ color: "var(--accent)" }}>Fig. 1</span>
        <span>Kazeem Salau, photographed in London</span>
      </div>
    </div>
  );
}

export function LearningFront() {
  return <FrontPage paper="learning" />;
}

// A paper's front page. `preview` is the copy lying folded on the table:
// it leaves the page title alone.
export function FrontPage({ paper, preview = false }: { paper: Paper; preview?: boolean }) {
  const e = EDITIONS[paper];
  useSEO(preview ? "" : PAPERS[paper].front);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function addRevealRef(el: HTMLElement | null) {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }

  return (
    <div>
      {/* Hero section */}
      <section style={{ padding: "clamp(22px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
        <div
          className="ks-two"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.1fr) minmax(260px, 1fr)",
            gap: "clamp(24px, 3vw, 40px)",
          }}
        >
          {/* Left column */}
          <div style={{ minWidth: 0 }}>
            <div
              className="ks-anim"
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: "var(--accent)",
                marginBottom: 14,
                animation: "ks-fade 0.7s 0.5s both",
              }}
            >
              The lead story
            </div>
            <h1
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(38px, 6.6vw, 86px)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                textTransform: "uppercase" as const,
                margin: "0 0 18px",
              }}
            >
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  className="ks-anim"
                  style={{ display: "block", animation: "ks-rise 0.95s 0.58s cubic-bezier(0.16, 1, 0.3, 1) both" }}
                >
                  {e.headline[0]}
                </span>
              </span>
              {/* Keeps the words apart for readers that see text, not layout. */}{" "}
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  className="ks-anim"
                  style={{
                    display: "block",
                    animation: "ks-rise 0.95s 0.68s cubic-bezier(0.16, 1, 0.3, 1) both",
                    color: "var(--accent)",
                  }}
                >
                  {e.headline[1]}
                </span>
              </span>
            </h1>
            <Portrait className="ks-photo-lead" />
            <p
              className="ks-anim"
              style={{
                fontFamily: "Newsreader, serif",
                fontSize: "clamp(18px, 2vw, 23px)",
                lineHeight: 1.4,
                fontStyle: "italic",
                color: "var(--body)",
                margin: "0 0 20px",
                maxWidth: "52ch",
                animation: "ks-fade 0.8s 0.85s both",
              }}
            >
              {e.standfirst}
            </p>
            <div
              className="ks-anim"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
                animation: "ks-fade 0.8s 0.9s both",
              }}
            >
              <Link
                href="/contact"
                onClick={scrollToTop}
                data-track="hero_hire"
                className="ks-press"
                style={{ ...ctaStyle, background: "var(--accent)", color: "var(--paper)", boxShadow: "4px 4px 0 var(--ink)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                }}
              >
                Hire me for a project &rarr;
              </Link>
              <a
                href="/files/KazeemSalau-InstructionalDesign.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_cv"
                className="ks-press"
                style={{ ...ctaStyle, background: "transparent", color: "var(--ink)", border: "2px solid var(--ink)", padding: "12px 20px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--ink)";
                  (e.currentTarget as HTMLElement).style.color = "var(--paper)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                }}
              >
                Download CV (PDF)
              </a>
            </div>
            <div
              className="ks-anim"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "var(--body)",
                marginBottom: 22,
                animation: "ks-fade 0.8s 0.92s both",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2E7D32", flexShrink: 0 }} />
              Available now for full-time roles &amp; freelance &middot; London / remote
            </div>
            <div
              className="ks-anim"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderTop: "1px solid var(--ink)",
                borderBottom: "1px solid var(--ink)",
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                marginBottom: 22,
                animation: "ks-fade 0.8s 0.95s both",
              }}
            >
              <span style={{ color: "var(--ink)" }}>By Kazeem Salau</span>
              <span>&middot;</span>
              <span>{e.role}</span>
            </div>
            <div className="ks-cols" style={{ columns: 2, columnGap: 34, columnRule: "1px solid var(--rule)" }}>
              {e.story.map((para, i) => (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.6, margin: i < e.story.length - 1 ? "0 0 14px" : 0 }}>
                  {i === 0 ? (
                    <>
                      <span
                        style={{
                          float: "left",
                          fontFamily: "Archivo, sans-serif",
                          fontWeight: 900,
                          fontSize: 66,
                          lineHeight: 0.74,
                          padding: "5px 10px 0 0",
                          color: "var(--accent)",
                        }}
                      >
                        {para[0]}
                      </span>
                      {para.slice(1)}
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>

            {/* The numbers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${e.stats.length}, minmax(0, 1fr))`,
                marginTop: 26,
                borderTop: "4px solid var(--ink)",
                borderBottom: "1px solid var(--ink)",
              }}
            >
              {e.stats.map((s, i) => (
                <div key={s.label} style={{ padding: "14px 12px", borderLeft: i > 0 ? "1px solid var(--rule)" : "none" }}>
                  <div
                    style={{
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(28px, 3.2vw, 40px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: "var(--accent)",
                      marginBottom: 6,
                    }}
                  >
                    <CountUp value={s.value} />
                  </div>
                  <div style={sectionNote}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className="ks-pull">
              <p>&ldquo;{e.pull.quote}&rdquo;</p>
              <cite>{e.pull.by}</cite>
            </blockquote>
          </div>

          {/* Right column */}
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
            <Portrait className="ks-photo-side" />

            {/* In this issue */}
            <div
              ref={addRevealRef}
              data-reveal="off"
              style={{ border: "1px solid var(--ink)", padding: "16px 18px" }}
            >
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  paddingBottom: 10,
                  marginBottom: 12,
                  borderBottom: "1px solid var(--ink)",
                }}
              >
                In this issue
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16 }}>
                {e.issue.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-section=""
                    className="ks-pencil"
                    onClick={scrollToTop}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 14,
                      color: "var(--ink)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                    }}
                  >
                    <span>{item.label}</span>
                    <span
                      style={{
                        fontFamily: "Archivo, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--accent)",
                      }}
                    >
                      {item.page}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <CvCoupon />
          </div>
        </div>
      </section>

      {/* Skills marquee */}
      <SkillsMarquee skills={e.skills} />

      {/* Featured work: one project per discipline */}
      <section style={{ padding: "clamp(26px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}>
        <div
          ref={addRevealRef}
          data-reveal="off"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "4px solid var(--ink)",
            paddingBottom: 10,
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(22px, 2.8vw, 34px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase" as const,
              margin: 0,
            }}
          >
            <Words text="Featured work" />
          </h2>
          <span style={sectionNote}>{e.featuredNote}</span>
        </div>

        <CourseCard addRevealRef={addRevealRef} {...e.featured} reverse={false} last={true} />

        <div className="ks-more">
          {e.more.map((m) => (
            <Link key={m.href} href={m.href} onClick={scrollToTop} className="ks-more-story">
              <span className="ks-more-img">
                <img src={m.image} alt="" loading="lazy" />
              </span>
              <span className="ks-more-text">
                <span className="ks-more-kicker">Also inside &middot; page {m.page}</span>
                <span className="ks-more-title">{m.title}</span>
                <span className="ks-more-line">{m.line}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How I build */}
      <section
        ref={addRevealRef}
        data-reveal="off"
        style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}
      >
        <div
          className="ks-two"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(20px, 2.6vw, 34px)",
          }}
        >
          {/* How I build a course */}
          <div style={{ minWidth: 0, border: "1px solid var(--ink)", padding: "clamp(18px, 2.4vw, 28px)" }}>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                borderBottom: "1px solid var(--ink)",
                paddingBottom: 9,
                marginBottom: 18,
              }}
            >
              {e.howLabel}
            </div>
            <div
              className="ks-steps-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 22 }}
            >
              {e.steps.map((step) => (
                <div key={step.num}>
                  <div
                    style={{
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 900,
                      fontSize: 30,
                      letterSpacing: "-0.05em",
                      color: "var(--accent)",
                      lineHeight: 1,
                      marginBottom: 9,
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 800,
                      fontSize: 15,
                      letterSpacing: "-0.01em",
                      textTransform: "uppercase" as const,
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--body)", margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}>
        <div
          ref={addRevealRef}
          data-reveal="off"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            border: "4px double var(--ink)",
            padding: "clamp(24px, 3.2vw, 40px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#9C968C",
              marginBottom: 14,
            }}
          >
            Classified &middot; Available for work
          </div>
          <h2
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(26px, 4.2vw, 54px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              margin: "0 0 14px",
            }}
          >
            <Words text={e.cta} />
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--rule)",
              maxWidth: "52ch",
              margin: "0 auto 22px",
            }}
          >
            Send me a couple of lines about who it is for and what is going wrong. I will come back with what I would
            build and how long it would take.
          </p>
          <Link
            href="/contact"
            onClick={scrollToTop}
            style={{
              display: "inline-block",
              fontFamily: "Archivo, sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              padding: "16px 30px",
              background: "var(--paper)",
              color: "var(--ink)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--paper)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--paper)";
              (e.currentTarget as HTMLElement).style.color = "var(--ink)";
            }}
          >
            Let&rsquo;s have a chat &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

function CourseCard({
  addRevealRef,
  num,
  tags,
  title,
  description,
  href,
  page,
  image,
  phones,
  reverse,
  last,
  more,
}: {
  addRevealRef: (el: HTMLElement | null) => void;
  num: string;
  tags: string[];
  title: string;
  description: string;
  href: string;
  page: string;
  image?: string;
  phones?: string[][];
  reverse: boolean;
  last: boolean;
  more?: { label: string; href: string };
}) {
  return (
    <div
      ref={addRevealRef}
      data-reveal="off"
      style={{
        paddingBottom: 26,
        marginBottom: last ? 0 : 26,
        borderBottom: last ? "4px solid var(--ink)" : "1px solid var(--ink)",
      }}
    >
      <Link
        href={href}
        onClick={scrollToTop}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(20px, 2.6vw, 34px)",
          color: "var(--ink)",
          textDecoration: "none",
        }}
      >
        <div
          className="ks-lift"
          style={{
            viewTransitionName: `media-${href.split("/").pop()}`,
            position: "relative",
            overflow: "hidden",
            background: phones ? "#0A4D3E" : "var(--ink)",
            height: "clamp(220px, 24vw, 280px)",
            border: "1px solid var(--ink)",
            order: reverse ? 2 : undefined,
          }}
        >
          <NewsPhoto style={{ position: "absolute", inset: 0 }}>
            {phones ? (
              <LivingPhones reels={phones} bg="#0A4D3E" />
            ) : (
              <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            )}
          </NewsPhoto>
        </div>
        <div style={{ minWidth: 0, order: reverse ? 1 : undefined }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px 12px",
              alignItems: "baseline",
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--muted)",
              marginBottom: 12,
            }}
          >
            <span style={{ color: "var(--accent)" }}>{num}</span>
            <span>{tags[0]}</span>
            <span>&middot;</span>
            <span>{tags[1]}</span>
          </div>
          <h3
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(24px, 2.9vw, 36px)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              textTransform: "uppercase" as const,
              margin: "0 0 12px",
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--body)", margin: "0 0 14px", maxWidth: "52ch" }}>{description}</p>
          <span
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              borderBottom: "1px solid var(--accent)",
              paddingBottom: 3,
              color: "var(--accent)",
            }}
          >
            Continued on page {page} &rarr;
          </span>
        </div>
      </Link>
      {more && (
        <div style={{ display: "flex", justifyContent: reverse ? "flex-start" : "flex-end", marginTop: 16 }}>
          <Link
            href={more.href}
            onClick={scrollToTop}
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            {more.label} &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
