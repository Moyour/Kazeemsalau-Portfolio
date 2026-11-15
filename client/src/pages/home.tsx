import { useEffect, useRef } from "react";
import TheWire, { type Dispatch } from "@/components/the-wire";
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
    // Dispatches for The Wire, the teleprinter on the front page.
    wire: Dispatch[];
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
      "An instructional designer since 2014, building blended and self-paced courses for learners around the world. I work ADDIE with subject matter experts, write the script, and build in Storyline 360, Rise and Camtasia.",
      "I set measurable outcomes, competencies, interactions, cases and assessments, then script the dialogue so each new idea lands the way a colleague would explain it.",
    ],
    wire: [
      {
        desk: "Leadway Assurance",
        text: "A curriculum of 50+ courses across sales, health, insurance and policy.",
        href: "/about#career",
        link: "See the career",
      },
      {
        desk: "The Fixer",
        text: "Learners finish the course, then replay it for the branches they missed.",
        href: "/work/the-fixer",
      },
      {
        desk: "Emotional Intelligence",
        text: "Managers hear the course's vocabulary in team conversations.",
        href: "/work/emotional-intelligence",
      },
      {
        desk: "Business Writing",
        text: "Plan, structure, edit: a Storyline 360 course for wordy, vague writing.",
        href: "/work/business-writing",
      },
      {
        desk: "TM Forum, London",
        text: "Existing courses reworked with new methods and technology.",
        href: "/about#career",
        link: "See the career",
      },
    ],
    issue: [
      { label: "Before Day One, featured course", page: "P. 2", href: "/work/before-day-one" },
      { label: "Business Writing, The Fixer, Emotional Intelligence", page: "P. 3–5", href: "/work" },
      { label: "About, and what people say", page: "P. 6", href: "/about" },
    ],
    stats: [
      { value: "50+", label: "Courses in one curriculum" },
      { value: "4", label: "Courses you can play" },
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
      tags: ["Learning experience design", "Scenario"],
      title: "Before Day One",
      description:
        "A new starter's first week, from Tuesday night's offer to clocking out on Day One. Playable in full.",
      href: "/work/before-day-one",
      page: "2",
      image: "/images/before-day-one.jpg",
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
        image: "/images/business-writing-frame.jpg",
        page: "3",
      },
      {
        title: "The Fixer",
        line: "A branching assignment under time and reputation pressure.",
        href: "/work/the-fixer",
        image: "/images/the-fixer-frame.jpg",
        page: "4",
      },
      {
        title: "Emotional Intelligence",
        line: "Noticing the trigger before it changes the decision.",
        href: "/work/emotional-intelligence",
        image: "/images/emotional-intelligence-frame.jpg",
        page: "5",
      },
    ],
    howLabel: "",
    steps: [],
    cta: "Got a course that needs to work?",
  },
  product: {
    headline: ["Product", "designer"],
    standfirst: "Apps people use. From the first user interview to a working build.",
    role: "Product designer",
    story: [
      "A graphic designer with a B.Sc. in Computer Science, now researching, designing and building apps: GrubShelf, a SwiftUI meal planner for UK households, and Mai Shara, a waste pick-up app taken from interviews to prototype.",
      "Start with people. Test before building. Improve once live.",
    ],
    wire: [
      {
        desk: "GrubShelf",
        text: "Meal planner in founder testing, backed by 460 tests.",
        href: "/design/grubshelf",
      },
      {
        desk: "GrubShelf",
        text: "53 screens mocked up before the build; the mockup stays the source of truth.",
        href: "/design/grubshelf",
      },
      {
        desk: "Mai Shara",
        text: "Waste pick-up app, from user interviews to full prototype.",
        href: "/design/mai-shara",
      },
      {
        desk: "Leadway Health",
        text: "A new HMO's first website, prototyped: plans, providers and resources one click away.",
        href: "/design/leadway-health",
      },
      {
        desk: "Householder",
        text: "Home insurance, prototyped: buyers choose what to insure, room by room.",
        href: "/design/householder",
      },
    ],
    issue: [
      { label: "GrubShelf, featured app", page: "P. 2", href: "/design/grubshelf" },
      { label: "Mai Shara, from interviews to prototype", page: "P. 3", href: "/design/mai-shara" },
      { label: "The GrubShelf website", page: "P. 4", href: "/design/grubshelf-website" },
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
        "A meal planner for UK households: pick meals, get a list split by shop, see the cost. Spec to working SwiftUI build.",
      href: "/design/grubshelf",
      page: "2",
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
        line: "Waste pick-ups, scheduled and tracked. Interviews to prototype.",
        href: "/design/mai-shara",
        // The app's own screens on its orange, as on its case study.
        phones: true,
        image: "",
        page: "3",
      },
      {
        title: "The GrubShelf website",
        line: "One job: the waiting list. The receipt demo does the selling.",
        href: "/design/grubshelf-website",
        image: "/images/grubshelf-web/tile.jpg",
        page: "4",
      },
    ],
    howLabel: "How I build an app",
    steps: [
      {
        num: "01",
        title: "Start with the people",
        desc: "Interview the people who'll use it. Set measurable outcomes first.",
      },
      {
        num: "02",
        title: "Flows and prototypes",
        desc: "Flows, wireframes and clickable prototypes, tested before build.",
      },
      {
        num: "03",
        title: "Build, ship, improve",
        desc: "Shipped in SwiftUI, then improved with real use.",
      },
    ],
    cta: "Got an app that needs to work?",
  },
  video: {
    headline: ["Video", "editor"],
    standfirst: "The reel is on YouTube.",
    role: "Video editor",
    story: ["I cut pictures.", "The reel is the channel."],
    wire: [
      {
        desk: "The reel",
        text: "21 films, on YouTube, at @Moyoursalau.",
        href: "/video/reel",
        link: "Open the reel",
      },
      {
        desk: "The cut",
        text: "Picture, captions and sound.",
        href: "/video/reel",
        link: "See the films",
      },
    ],
    issue: [
      { label: "The reel, on YouTube", page: "P. 2", href: "/video/reel" },
      { label: "About", page: "P. 6", href: "/about" },
    ],
    stats: [],
    skills: ["Camtasia", "YouTube", "Picture edit", "Captions", "Sound"],
    featuredNote: "On the channel",
    featured: {
      num: "01",
      tags: ["Picture", "YouTube"],
      title: "The reel",
      description: "Edited pieces, on the channel.",
      href: "/video/reel",
      page: "2",
      image: "/images/reel/tANWyt2mUdw.jpg",
      more: { label: "The reel", href: "/video/reel" },
    },
    pull: {
      quote: "Cut it so the idea arrives before the explanation.",
      by: "Kazeem Salau",
    },
    more: [
      {
        title: "Hobbies vs productivity",
        line: "A film on the channel.",
        href: "/video/reel#film-SLc-Thmbdzc",
        image: "/images/reel/SLc-Thmbdzc.jpg",
        page: "2",
      },
      {
        title: "Buying back your time",
        line: "A film on the channel.",
        href: "/video/reel#film-DqS27GE3ocY",
        image: "/images/reel/DqS27GE3ocY.jpg",
        page: "2",
      },
    ],
    howLabel: "",
    steps: [],
    cta: "Got a film that needs cutting?",
  },
};

const sectionNote = {
  fontFamily: "var(--font-learning-text)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "var(--muted)",
};

export const ctaStyle = {
  display: "inline-block",
  fontWeight: 700,
  fontSize: 15,
  letterSpacing: "0.01em",
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
          fontFamily: "var(--font-learning-text)",
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

export function LearningFront() {
  return <FrontPage paper="learning" />;
}

export function VideoFront() {
  return <FrontPage paper="video" />;
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
          className="ks-two ks-lead"
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
                fontFamily: "var(--font-learning-text)",
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
                fontFamily: "var(--font-learning-text)",
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
            <p
              className="ks-anim ks-stand"
              style={{
                fontFamily: "var(--font-learning-text)",
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
                className="ks-action"
                style={ctaStyle}
              >
                Hire me for a project &rarr;
              </Link>
              {paper === "learning" && <a
                href="/files/KazeemSalau-InstructionalDesign.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_cv"
                className="ks-action"
                style={ctaStyle}
              >
                Download CV (PDF)
              </a>}
            </div>
            <div
              className="ks-anim"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "var(--body)",
                marginBottom: 22,
                animation: "ks-fade 0.8s 0.92s both",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6A6A6A", flexShrink: 0 }} />
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
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                marginBottom: 22,
                animation: "ks-fade 0.8s 0.95s both",
              }}
            >
              <span style={{ color: "var(--ink)" }}>By <span className="ks-name">Kazeem Salau</span></span>
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
                          fontFamily: "var(--font-learning-text)",
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
            {e.stats.length > 0 && <div
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
                      fontFamily: "var(--font-learning-text)",
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
            </div>}

            {/* Pull quote */}
            <blockquote className="ks-pull">
              <p>&ldquo;{e.pull.quote}&rdquo;</p>
              <cite>{e.pull.by.split(/(Kazeem Salau)/).map((part) => part === "Kazeem Salau" ? <span key={part} className="ks-name">{part}</span> : part)}</cite>
            </blockquote>
          </div>

          {/* Right column */}
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
            <TheWire dispatches={e.wire} />

            {/* In this issue */}
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
                        fontFamily: "var(--font-learning-text)",
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

            {paper === "learning" && <CvCoupon />}
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
              fontFamily: "var(--font-learning-text)",
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
            <Link key={m.title} href={m.href} onClick={scrollToTop} className="ks-more-story">
              <span className="ks-more-img">
                <img src={m.image} alt="" loading="lazy" />
              </span>
              <span className="ks-more-text">
                <span className="ks-more-kicker">{/^\d/.test(m.page) ? `Also inside · page ${m.page}` : m.page}</span>
                <span className="ks-more-title">{m.title}</span>
                <span className="ks-more-line">{m.line}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How I build. The learning front already says this in the lead story. */}
      {e.steps.length > 0 && (
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
                fontFamily: "var(--font-learning-text)",
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
                      fontFamily: "var(--font-learning-text)",
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
                      fontFamily: "var(--font-learning-text)",
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
      )}

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
              fontFamily: "var(--font-learning-text)",
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
              fontFamily: "var(--font-learning-text)",
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
            {paper === "video"
              ? "Send a couple of lines about the film."
              : "Tell me who it's for and what's going wrong. I'll reply with what I'd build and how long it takes."}
          </p>
          <Link
            href="/contact"
            onClick={scrollToTop}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-learning-text)",
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
              fontFamily: "var(--font-learning-text)",
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
              fontFamily: "var(--font-learning-text)",
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
              fontFamily: "var(--font-learning-text)",
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
              fontFamily: "var(--font-learning-text)",
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
