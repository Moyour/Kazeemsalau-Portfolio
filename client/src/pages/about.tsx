import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Words } from "@/components/motion";
import CareerTimeline from "@/components/career-timeline";
import { paperFor } from "@/lib/paper";
import { FILMS, filmTitle } from "@/pages/video-reel";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Specks of light in the portrait frame. Each is left (%), delay (s), size (px).
const DUST: [number, number, number][] = [
  [14, 0, 3],
  [27, 2.4, 2],
  [41, 4.1, 3],
  [58, 1.1, 2],
  [72, 3.3, 3],
  [86, 5.2, 2],
  [22, 6.4, 2],
  [63, 7.6, 3],
];

function LivingPortrait() {
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useState(() => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches)[0];
  const wake = () => {
    video.current?.play().catch(() => {});
  };
  const sleep = () => {
    const v = video.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  return (
    <div className="ks-enchant" onMouseEnter={reduce ? undefined : wake} onMouseLeave={reduce ? undefined : sleep}>
      <img src="/videos/portrait-living.jpg" alt="Kazeem Salau" />
      {reduce ? null : (
        <video ref={video} muted loop playsInline poster="/videos/portrait-living.jpg" aria-hidden="true">
          <source src="/videos/portrait-living.webm" type="video/webm" />
          <source src="/videos/portrait-living.mp4" type="video/mp4" />
        </video>
      )}
      <span className="ks-enchant-glass" aria-hidden="true" />
      <span className="ks-enchant-dust" aria-hidden="true">
        {DUST.map(([left, delay, size]) => (
          <i key={left} style={{ left: `${left}%`, animationDelay: `${delay}s`, width: size, height: size }} />
        ))}
      </span>
    </div>
  );
}

const kicker: CSSProperties = {
  fontFamily: "var(--font-learning-text)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const boxLabel: CSSProperties = {
  ...kicker,
  borderBottom: "1px solid var(--ink)",
  paddingBottom: 9,
  marginBottom: 14,
};

const body: CSSProperties = { fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "var(--body)" };

const h2Style: CSSProperties = {
  fontFamily: "var(--font-learning-text)",
  fontWeight: 900,
  fontSize: "clamp(22px, 2.8vw, 34px)",
  lineHeight: 1,
  letterSpacing: "-0.03em",
  textTransform: "uppercase",
  margin: 0,
};

const DISCIPLINES = [
  {
    paper: "learning" as const,
    num: "01",
    title: "Learning experience design",
    lead: "Courses people finish, built around what the job asks.",
    practice: [
      "Needs analysis with SMEs and business leaders",
      "ADDIE, learning theory and adult learning principles",
      "Measurable outcomes, competencies and assessments",
      "Storyboarding and conversational scripting",
      "Blended, self-paced and instructor-led training",
    ],
    href: "/work",
    cta: "Learning case studies",
  },
  {
    paper: "product" as const,
    num: "01",
    title: "Product design",
    lead: "Apps and sites people use without being taught, from interviews to a working build.",
    practice: [
      "User research, interviews and personas",
      "Empathy maps, user flows and wireframes",
      "UI design, prototyping and design systems",
      "Marketing sites and landing pages",
      "iOS development in SwiftUI",
    ],
    href: "/products",
    cta: "App and design work",
  },
];

const CAREER = [
  {
    dates: "Jul 2022 – now",
    org: "TM Forum, UK",
    role: "Instructional Designer / Learning Designer",
    track: "Learning",
    papers: ["learning"] as const,
    points: [
      "Reworked existing courses with new methods and technology.",
      "Define outcomes, competencies, cases, assessments and capstone projects.",
      "Produce videos and assets that make complex ideas simple.",
    ],
  },
  {
    dates: "Ongoing",
    org: "GrubShelf",
    role: "Founder & product designer",
    track: "Product",
    papers: ["product"] as const,
    points: [
      "An iOS meal planner for UK households: LLM-first spec, 53-screen prototype, SwiftUI build.",
      "Brand, design system and the grubshelf.app marketing site.",
    ],
  },
  {
    dates: "Dec 2019 – Jun 2022",
    org: "Leadway Assurance",
    role: "Learning Design Manager",
    track: "Learning",
    papers: ["learning"] as const,
    points: [
      "A curriculum of 50+ courses, from needs analysis to SCORM package.",
      "Needs analysis with subject experts and business leaders, then the courses.",
    ],
  },
  {
    dates: "Dec 2019 – Jun 2022",
    org: "Leadway Assurance",
    role: "Product Designer",
    track: "Product",
    papers: ["product"] as const,
    points: ["Designed Leadway’s apps and web products, including the Leadway Health website."],
  },
  {
    dates: "Dec 2017 – Nov 2019",
    org: "Leadway Assurance",
    role: "Instructional Design Specialist",
    track: "Learning",
    papers: ["learning"] as const,
    points: [
      "Scripted conversational course dialogue so new concepts landed.",
      "Adult learning in sales, health management, insurance, business acumen and policy.",
    ],
  },
  {
    dates: "Dec 2017 – Nov 2019",
    org: "Leadway Assurance",
    role: "UI/UX Designer",
    track: "Product",
    papers: ["product"] as const,
    points: ["UI/UX design for Leadway’s digital products."],
  },
  {
    dates: "Jan – Nov 2017",
    org: "Kotivu.NG",
    role: "eLearning Developer",
    track: "Learning",
    papers: ["learning"] as const,
    points: ["Interactive client courses, from storyboard to finished build."],
  },
  {
    dates: "Apr – Dec 2016",
    org: "Workforce Group",
    role: "eLearning Developer",
    track: "Learning",
    papers: ["learning"] as const,
    points: ["Storyboards, scripts, assessments and multimedia for eLearning programmes."],
  },
  {
    dates: "Dec 2014 – Mar 2016",
    org: "Zercom Systems",
    role: "eLearning Developer",
    track: "Learning",
    papers: ["learning"] as const,
    points: ["Turned client briefs into visual concepts and presented them."],
  },
  {
    dates: "Dec 2014 – Mar 2016",
    org: "Zercom Systems",
    role: "Graphic Designer",
    track: "Design",
    papers: ["product"] as const,
    points: ["Turned client briefs into visual concepts and presented them."],
  },
];

const TRACK_COLOR: Record<string, string> = { Learning: "var(--accent)", Product: "#0A4D3E", Design: "var(--muted)" };

function VideoAbout() {
  return (
    <div>
      <section style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) clamp(40px, 6vw, 72px)" }}>
        <div style={{ ...kicker, letterSpacing: "0.22em", color: "var(--accent)", marginBottom: 14 }}>Page 6 &middot; Profile</div>
        <h1 className="ks-page-h1" style={{ ...h2Style, fontSize: "clamp(34px, 5.6vw, 74px)", lineHeight: 0.93, margin: "0 0 18px" }}>
          <Words text="Video editor." />
        </h1>
        <p style={{ fontSize: "clamp(18px, 2vw, 23px)", lineHeight: 1.4, fontStyle: "italic", color: "var(--body)", margin: "0 0 20px", maxWidth: "42ch" }}>
          I cut pictures. The reel is the channel.
        </p>
        <div style={{ ...kicker, letterSpacing: "0.18em", display: "flex", flexWrap: "wrap", gap: 14, padding: "10px 0", borderTop: "1px solid var(--ink)", borderBottom: "4px solid var(--ink)", color: "var(--muted)", marginBottom: 26 }}>
          <span className="ks-name" style={{ color: "var(--ink)" }}>Kazeem Salau</span>
          <span>&middot;</span>
          <span>Video editor</span>
          <span>&middot;</span>
          <span>London</span>
        </div>
        <div className="ks-two" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2.1fr) minmax(260px, 1fr)", gap: "clamp(20px, 2.6vw, 34px)" }}>
          <div>
            <p style={body}>I cut the channel's films: picture, captions and sound.</p>
            <p style={body}>21 films on the reel; shorts stay on YouTube.</p>
            <Link href="/video/reel" onClick={scrollToTop} style={{ ...kicker, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}>
              The reel &rarr;
            </Link>
            {/* The latest cuts, so the page shows the work rather than describing it. */}
            <div style={{ ...boxLabel, marginTop: 30 }}>Latest on the reel</div>
            <div className="va-films">
              {FILMS.slice(0, 6).map((film) => (
                <a
                  key={film.id}
                  href={`https://www.youtube.com/watch?v=${film.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <img
                    src={`/images/reel/${film.id}.jpg`}
                    alt=""
                    loading="lazy"
                    style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", border: "1px solid var(--ink)" }}
                  />
                  <span className="ks-film-title" style={{ display: "block", marginTop: 7, fontSize: 15, lineHeight: 1.3 }}>
                    {filmTitle(film.title)}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="ks-sidebar">
            <LivingPortrait />
            <div style={{ ...kicker, fontWeight: 600, letterSpacing: "0.1em", display: "flex", gap: 8, paddingTop: 7, color: "var(--muted)" }}>
              <span style={{ color: "var(--accent)" }}>Fig. 1</span>
              <span>A picture that moves</span>
            </div>
            <div style={{ border: "1px solid var(--ink)", padding: 18, marginTop: 20 }}>
              <div style={boxLabel}>Open to work</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--body)", margin: "0 0 16px" }}>Video editing. Full-time or freelance.</p>
              <Link href="/contact" onClick={scrollToTop} style={{ ...kicker, color: "var(--accent)", textDecoration: "none" }}>
                Get in touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function About() {
  const [location] = useLocation();
  useSEO("/about");
  const revealRefs = useRef<HTMLElement[]>([]);
  const [track, setTrack] = useState("All");
  // The role being pointed at, in the timeline or the list.
  const [focus, setFocus] = useState<number | null>(null);
  const paper = paperFor(location);
  const video = paper === "video";
  const product = paper === "product";
  const jobs = CAREER.filter((job) => (job.papers as readonly string[]).includes(paper));
  const tracks = [...new Set(jobs.map((job) => job.track))];

  useEffect(() => {
    document.title =
      paper === "video"
        ? "Video editor | Kazeem Salau"
        : paper === "product"
          ? "Product designer | Kazeem Salau"
          : "Learning experience designer | Kazeem Salau";
  }, [paper]);

  useEffect(() => {
    if (video) return;
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
  }, [video]);

  function addRevealRef(el: HTMLElement | null) {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }

  const education = (
    <div ref={addRevealRef} data-reveal="off" style={{ border: "1px solid var(--ink)", padding: 18, marginTop: 18 }}>
      <div style={boxLabel}>Education</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 16, lineHeight: 1.45, color: "var(--body)" }}>
        <span>B.Sc. Computer Science</span>
        {product ? (
          <span>Design Thinking, Interaction Design Foundation</span>
        ) : (
          <span>Professional Certificate in Instructional Design</span>
        )}
      </div>
    </div>
  );

  if (video) return <VideoAbout />;

  return (
    <div>
      <section style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
        <div style={{ ...kicker, letterSpacing: "0.22em", color: "var(--accent)", marginBottom: 14 }}>Page 6 &middot; Profile</div>

        <h1
          className="ks-page-h1"
          style={{
            fontFamily: "var(--font-learning-text)",
            fontWeight: 900,
            fontSize: "clamp(34px, 5.6vw, 74px)",
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            margin: "0 0 18px",
            maxWidth: "22ch",
          }}
        >
          <Words text={product ? "Product designer." : "Learning experience designer."} />
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 2vw, 23px)",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "var(--body)",
            margin: "0 0 20px",
            maxWidth: "56ch",
          }}
        >
          {product
            ? "Apps people use. From the first user interview to a working build."
            : "Twelve years designing how people learn, from needs analysis to SCORM package."}
        </p>

        <div
          style={{
            ...kicker,
            letterSpacing: "0.18em",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 14,
            padding: "10px 0",
            borderTop: "1px solid var(--ink)",
            borderBottom: "4px solid var(--ink)",
            color: "var(--muted)",
            marginBottom: 26,
          }}
        >
          <span className="ks-name" style={{ color: "var(--ink)" }}>Kazeem Salau</span>
          <span>&middot;</span>
          <span>{product ? "Product designer" : "Instructional designer"}</span>
          {product ? null : (
            <>
              <span>&middot;</span>
              <span>Learning experience designer</span>
            </>
          )}
          <span>&middot;</span>
          <span>London</span>
        </div>

        <div
          className="ks-two"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.1fr) minmax(260px, 1fr)",
            gap: "clamp(20px, 2.6vw, 34px)",
            paddingBottom: "clamp(26px, 3.4vw, 42px)",
          }}
        >
          {/* Left: intro + disciplines */}
          <div style={{ minWidth: 0 }}>
            <div className="ks-cols" style={{ columns: 2, columnGap: 34, columnRule: "1px solid var(--rule)" }}>
              {product ? (
                <>
                  <p style={body}>
                    A graphic designer with a B.Sc. in Computer Science, now researching, designing and building apps.
                  </p>
                  <p style={body}>
                    GrubShelf went from spec to a 53-screen prototype to a SwiftUI build. Mai Shara went from user interviews
                    to a full prototype.
                  </p>
                  <p style={{ ...body, margin: 0 }}>
                    At Leadway I designed the apps and websites, including Leadway Health&rsquo;s.
                  </p>
                </>
              ) : (
                <>
                  <p style={body}>
                    I started in 2014 building eLearning as a graphic designer, then spent nine years in instructional design at
                    Leadway Assurance and TM Forum, owning courses end to end.
                  </p>
                  <p style={{ ...body, margin: 0 }}>
                    I keep stakeholders, SMEs and vendors aligned, and run several projects at once to deadline.
                  </p>
                </>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 18,
                marginTop: 26,
              }}
            >
              {DISCIPLINES.filter((d) => d.paper === paper).map((d) => (
                <div
                  key={d.num}
                  ref={addRevealRef}
                  data-reveal="off"
                  style={{ border: "1px solid var(--ink)", padding: 18, display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-learning-text)",
                        fontWeight: 900,
                        fontSize: 26,
                        letterSpacing: "-0.05em",
                        color: "var(--accent)",
                        lineHeight: 1,
                      }}
                    >
                      {d.num}
                    </span>
                    <span style={{ ...h2Style, fontSize: 20 }}>{d.title}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.5, fontStyle: "italic", color: "var(--body)", margin: "0 0 14px" }}>
                    {d.lead}
                  </p>
                  <div style={{ ...boxLabel, marginBottom: 10 }}>Practice</div>
                  <ul style={{ margin: "0 0 16px", paddingLeft: 18, fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>
                    {d.practice.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <Link
                    href={d.href}
                    onClick={scrollToTop}
                    style={{
                      ...kicker,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "var(--accent)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--accent)",
                      paddingBottom: 2,
                      alignSelf: "flex-start",
                    }}
                  >
                    {d.cta} &rarr;
                  </Link>
                </div>
              ))}
            </div>

            {/* Education sits under the practice, so the two columns end together. */}
            {education}
          </div>

          {/* Right column */}
          <div className="ks-sidebar" style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <LivingPortrait />
              <div
                style={{
                  ...kicker,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  display: "flex",
                  gap: 8,
                  paddingTop: 7,
                  paddingBottom: 8,
                  color: "var(--muted)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>Fig. 2</span>
                <span>The designer at work</span>
              </div>
            </div>

            <div ref={addRevealRef} data-reveal="off" style={{ border: "1px solid var(--ink)", padding: 18 }}>
              <div style={boxLabel}>Currently open to work</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--body)", margin: "0 0 16px" }}>
                {product
                  ? "Full-time product design roles, plus select freelance."
                  : "Full-time instructional and learning experience design roles, plus select freelance."}
              </p>
              <div
                style={{
                  ...kicker,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                <Link href="/contact" onClick={scrollToTop} style={{ color: "var(--accent)", textDecoration: "none" }}>
                  Get in touch &rarr;
                </Link>
                <a
                  href="https://linkedin.com/in/kazeem-salau-164b1087"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                  LinkedIn
                </a>
                {product ? null : (
                  <a
                    href="/files/KazeemSalau-InstructionalDesign.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)", textDecoration: "none" }}
                  >
                    Download resume (PDF)
                  </a>
                )}
              </div>
            </div>

            {/* The Product page has one quote: it closes the sidebar as a pull quote
                rather than standing alone in half a row further down. */}
            {product && (
              <blockquote style={{ margin: 0, borderTop: "4px solid var(--ink)", paddingTop: 14 }}>
                <p style={{ fontFamily: "var(--font-learning-display)", fontSize: 21, lineHeight: 1.35, fontStyle: "italic", margin: "0 0 12px" }}>
                  &ldquo;Kazeem is the best Product Designer I have ever worked with in my career.&rdquo;
                </p>
                <div style={{ ...kicker, fontSize: 11, letterSpacing: "0.16em", color: "var(--muted)" }}>Damilola &middot; Senior Software Developer</div>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* Career */}
      <section id="career" style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderTop: "4px solid var(--ink)",
            paddingTop: 14,
            marginBottom: 6,
          }}
        >
          <h2 style={h2Style}><Words text="Career" /></h2>
          {/* The legend doubles as a filter: pick a track to bring its roles forward. */}
          <div className="ab-tracks" role="group" aria-label="Show roles by track">
            {[["All", "var(--ink)"], ...tracks.map((t) => [t, TRACK_COLOR[t]] as const)].map(([t, c]) => (
              <button key={t} type="button" aria-pressed={track === t} onClick={() => setTrack(t)}>
                <span style={{ background: c }} />
                {t}
              </button>
            ))}
          </div>
        </div>
        <CareerTimeline roles={jobs} colors={TRACK_COLOR} focus={focus} dimTrack={track} onFocus={setFocus} />
        <div>
          {jobs.map((job, i) => (
            <div
              id={`role-${i}`}
              onMouseEnter={() => setFocus(i)}
              onMouseLeave={() => setFocus(null)}
              data-focus={focus === i ? "1" : undefined}
              key={job.role + job.dates}
              ref={addRevealRef}
              data-reveal="off"
              className="ks-two ab-job"
              data-dim={track !== "All" && job.track !== track ? "1" : undefined}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(200px, 1fr) minmax(0, 2.2fr)",
                gap: "6px clamp(16px, 2.6vw, 34px)",
                padding: "18px 0",
                borderBottom: "1px solid var(--rule)",
                ["--track" as string]: TRACK_COLOR[job.track],
              }}
            >
              <div>
                <div style={{ ...kicker, color: TRACK_COLOR[job.track], marginBottom: 6 }}>{job.dates}</div>
                <div
                  style={{
                    fontFamily: "var(--font-learning-text)",
                    fontWeight: 900,
                    fontSize: 18,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                  }}
                >
                  {job.org}
                </div>
                <div style={{ fontSize: 15, fontStyle: "italic", color: "var(--body)", marginTop: 4 }}>{job.role}</div>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--body)",
                  minWidth: 0,
                }}
              >
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (the Product page carries its one quote in the sidebar) */}
      {!product && (
      <section
        ref={addRevealRef}
        data-reveal="off"
        style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}
      >
        <div
          style={{
            borderTop: "4px solid var(--ink)",
            paddingTop: 10,
            marginBottom: 22,
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
            <Words text="What people say" />
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(20px, 2.6vw, 34px)",
          }}
        >
          {[
            {
              quote:
                "Kazeem is a highly talented instructional designer and eLearning developer who consistently delivers exceptional results. I wholeheartedly recommend Kazeem for any project or role that requires top-notch eLearning development and instructional design skills.",
              name: "Ruby",
              role: "Global Talent Leader",
              paper: "learning",
            },
            {
              quote:
                "Kazeem is a good leader. He is a good communicator, a listener, dedicated to his work and a teacher. He is always ensuring everyone around him gets better.",
              name: "Habeeb",
              role: "Senior HR Analyst",
              paper: "learning",
            },
            {
              quote: "Kazeem is the best Product Designer I have ever worked with in my career.",
              name: "Damilola",
              role: "Senior Software Developer",
              paper: "product",
            },
          ]
            .filter((t) => t.paper === paper)
            .map((t, i, arr) => (
            <blockquote
              key={i}
              style={{
                margin: 0,
                paddingRight: i < arr.length - 1 ? "clamp(0px, 2vw, 24px)" : 0,
                borderRight: i < arr.length - 1 ? "1px solid var(--rule)" : "none",
              }}
            >
              {/* A lone quote is set large across the page, as a pull quote, rather
                  than in half a row. */}
              <p
                style={
                  arr.length === 1
                    ? { fontFamily: "var(--font-learning-display)", fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.25, fontStyle: "italic", margin: "0 0 14px" }
                    : { fontSize: 17, lineHeight: 1.55, margin: "0 0 12px" }
                }
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                style={{
                  fontFamily: "var(--font-learning-text)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase" as const,
                  color: "var(--muted)",
                }}
              >
                {t.name} &middot; {t.role}
              </div>
            </blockquote>
          ))}
        </div>
      </section>
      )}

    </div>
  );
}
