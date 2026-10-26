import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const kicker: CSSProperties = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const boxLabel: CSSProperties = {
  ...kicker,
  borderBottom: "1px solid #14120F",
  paddingBottom: 9,
  marginBottom: 14,
};

const body: CSSProperties = { fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" };

const h2Style: CSSProperties = {
  fontFamily: "Archivo, sans-serif",
  fontWeight: 900,
  fontSize: "clamp(22px, 2.8vw, 34px)",
  lineHeight: 1,
  letterSpacing: "-0.03em",
  textTransform: "uppercase",
  margin: 0,
};

const DISCIPLINES = [
  {
    num: "01",
    title: "Learning experience design",
    lead: "Courses people finish, built around what the job actually asks of them.",
    practice: [
      "Learning needs analysis with SMEs and business leaders",
      "ADDIE, learning theory and adult learning principles",
      "Measurable outcomes, competencies and assessments",
      "Storyboarding and conversational scripting",
      "Blended, self-paced and instructor-led training",
    ],
    tools: "Articulate 360 · Storyline 360 · Rise · Camtasia · Adobe Captivate · Vyond · Synthesia · Colossyan · Moodle · SCORM",
    href: "/work",
    cta: "Learning case studies",
  },
  {
    num: "02",
    title: "Product design",
    lead: "Apps and sites people can use without being taught, taken from interviews to a working build.",
    practice: [
      "User research, interviews and personas",
      "Empathy maps, user flows and wireframes",
      "UI design, prototyping and design systems",
      "Marketing sites and landing pages",
      "iOS development in SwiftUI",
    ],
    tools: "Figma · Miro · Jira · Adobe Creative Suite · Photoshop · SwiftUI · Generative AI",
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
    points: [
      "Reworked existing courses and recommended new methods and technology, widening how they could be delivered.",
      "Define outcomes, competencies, case studies, assessments, portfolio and capstone projects.",
      "Produce the videos and learning assets that make complex ideas simple.",
    ],
  },
  {
    dates: "Ongoing",
    org: "GrubShelf",
    role: "Founder & product designer",
    track: "Product",
    points: [
      "Designed and built an iOS meal planner for UK households, from an LLM-first spec to a 53-screen prototype to a SwiftUI build.",
      "Brand, design system and the grubshelf.app marketing site.",
    ],
  },
  {
    dates: "Dec 2019 – Jun 2022",
    org: "Leadway Assurance",
    role: "Learning Design Manager",
    track: "Learning",
    points: [
      "Designed and delivered a curriculum of 50+ courses: engagement up 25%, completion up 20%.",
      "Learning needs analysis with SMEs and business leaders, lifting employee satisfaction by 40% while cutting training costs.",
      "Designed instructional graphics and interfaces, and ran several projects at once to deadline.",
    ],
  },
  {
    dates: "Dec 2017 – Nov 2019",
    org: "Leadway Assurance",
    role: "Instructional Design Specialist",
    track: "Learning",
    points: [
      "Scripted course dialogue in a conversational tone so new concepts landed.",
      "Ran adult learning programmes in sales, health management, insurance, business acumen and policy, improving job performance by 15%.",
    ],
  },
  {
    dates: "Jan – Nov 2017",
    org: "Kotivu.NG",
    role: "eLearning Developer",
    track: "Learning",
    points: ["Built interactive courses that raised engagement and retention by 20% and productivity by 15%."],
  },
  {
    dates: "Apr – Dec 2016",
    org: "Workforce Group",
    role: "eLearning Developer",
    track: "Learning",
    points: ["Storyboards, scripts, assessments and multimedia for eLearning programmes."],
  },
  {
    dates: "Dec 2014 – Mar 2016",
    org: "Zercom Systems",
    role: "Graphic Designer / eLearning Developer",
    track: "Design",
    points: ["Turned client briefs into visual concepts and presented them to clients and the team."],
  },
];

const TRACK_COLOR: Record<string, string> = { Learning: "#C0281B", Product: "#0A4D3E", Design: "#5F5A50" };

export default function About() {
  useSEO("/about");
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
    <div>
      <section style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
        <div style={{ ...kicker, letterSpacing: "0.22em", color: "#C0281B", marginBottom: 14 }}>Page 6 &middot; Profile</div>

        <h1
          style={{
            fontFamily: "Archivo, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(34px, 5.6vw, 74px)",
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            margin: "0 0 18px",
            maxWidth: "22ch",
          }}
        >
          Learning experience designer &amp; product designer.
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 2vw, 23px)",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "#3A362F",
            margin: "0 0 20px",
            maxWidth: "56ch",
          }}
        >
          Twelve years designing how people learn, and the apps they use. Same method either way: start with the people,
          test before building, improve once it is live.
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
            borderTop: "1px solid #14120F",
            borderBottom: "4px solid #14120F",
            color: "#5F5A50",
            marginBottom: 26,
          }}
        >
          <span style={{ color: "#14120F" }}>Kazeem Salau</span>
          <span>&middot;</span>
          <span>Learning experience designer</span>
          <span>&middot;</span>
          <span>Product designer</span>
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
            <div className="ks-cols" style={{ columns: 2, columnGap: 34, columnRule: "1px solid #CFC9BB" }}>
              <p style={body}>
                I started in 2014 as a graphic designer building eLearning, and grew into instructional design: nine years
                at Leadway Assurance and TM Forum defining courses end to end, from the learning needs analysis to the
                SCORM package.
              </p>
              <p style={body}>
                Alongside that I design and build products. GrubShelf, an iOS meal planner I founded, went from spec to a
                53-screen prototype to a SwiftUI build. Mai Shara, a waste pick-up app, went from user interviews to a full
                prototype.
              </p>
              <p style={body}>
                The two feed each other. Courses taught me to write plainly and test with real people; product work taught
                me flows, prototypes and design systems, which make my courses easier to use.
              </p>
              <p style={{ ...body, margin: 0 }}>
                I build the relationships that make projects work, with stakeholders, SMEs and vendors, and carry several
                projects at once to deadline.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 18,
                marginTop: 26,
              }}
            >
              {DISCIPLINES.map((d) => (
                <div
                  key={d.num}
                  ref={addRevealRef}
                  data-reveal="off"
                  style={{ border: "1px solid #14120F", padding: 18, display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "Archivo, sans-serif",
                        fontWeight: 900,
                        fontSize: 26,
                        letterSpacing: "-0.05em",
                        color: "#C0281B",
                        lineHeight: 1,
                      }}
                    >
                      {d.num}
                    </span>
                    <span style={{ ...h2Style, fontSize: 20 }}>{d.title}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.5, fontStyle: "italic", color: "#3A362F", margin: "0 0 14px" }}>
                    {d.lead}
                  </p>
                  <div style={{ ...boxLabel, marginBottom: 10 }}>Practice</div>
                  <ul style={{ margin: "0 0 16px", paddingLeft: 18, fontSize: 15, lineHeight: 1.6, color: "#3A362F" }}>
                    {d.practice.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div style={{ ...boxLabel, marginBottom: 10 }}>Tools</div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#3A362F", margin: "0 0 16px", flex: 1 }}>{d.tools}</p>
                  <Link
                    href={d.href}
                    onClick={scrollToTop}
                    style={{
                      ...kicker,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "#C0281B",
                      textDecoration: "none",
                      borderBottom: "1px solid #C0281B",
                      paddingBottom: 2,
                      alignSelf: "flex-start",
                    }}
                  >
                    {d.cta} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div
                style={{
                  height: "clamp(280px, 32vw, 360px)",
                  background: "#C0281B",
                  overflow: "hidden",
                  border: "1px solid #14120F",
                }}
              >
                <img
                  src="/images/portrait.png"
                  alt="Kazeem Salau"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div
                style={{
                  ...kicker,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  display: "flex",
                  gap: 8,
                  paddingTop: 7,
                  paddingBottom: 8,
                  color: "#5F5A50",
                  borderBottom: "1px solid #CFC9BB",
                }}
              >
                <span style={{ color: "#C0281B" }}>Fig. 2</span>
                <span>The designer at work</span>
              </div>
            </div>

            <div ref={addRevealRef} data-reveal="off" style={{ border: "1px solid #14120F", padding: 18 }}>
              <div style={boxLabel}>Currently open to work</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "#3A362F", margin: "0 0 16px" }}>
                Full-time instructional design, learning experience and product design roles, plus select freelance
                projects.
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
                <Link href="/contact" onClick={scrollToTop} style={{ color: "#C0281B", textDecoration: "none" }}>
                  Get in touch &rarr;
                </Link>
                <a
                  href="https://linkedin.com/in/kazeem-salau-164b1087"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C0281B", textDecoration: "none" }}
                >
                  LinkedIn
                </a>
                <a
                  href="/files/KazeemSalau-InstructionalDesign.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C0281B", textDecoration: "none" }}
                >
                  Download resume (PDF)
                </a>
              </div>
            </div>

            <div ref={addRevealRef} data-reveal="off" style={{ border: "1px solid #14120F", padding: 18 }}>
              <div style={boxLabel}>Education</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 16, lineHeight: 1.45, color: "#3A362F" }}>
                <span>B.Sc. Computer Science</span>
                <span>Professional Certificate in Instructional Design</span>
                <span>Design Thinking, Interaction Design Foundation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderTop: "4px solid #14120F",
            paddingTop: 14,
            marginBottom: 6,
          }}
        >
          <h2 style={h2Style}>Career</h2>
          <div style={{ ...kicker, display: "flex", gap: 16, color: "#5F5A50" }}>
            {Object.entries(TRACK_COLOR).map(([t, c]) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          {CAREER.map((job) => (
            <div
              key={job.role + job.dates}
              ref={addRevealRef}
              data-reveal="off"
              className="ks-two"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(200px, 1fr) minmax(0, 2.2fr)",
                gap: "6px clamp(16px, 2.6vw, 34px)",
                padding: "18px 0",
                borderBottom: "1px solid #CFC9BB",
              }}
            >
              <div>
                <div style={{ ...kicker, color: TRACK_COLOR[job.track], marginBottom: 6 }}>{job.dates}</div>
                <div
                  style={{
                    fontFamily: "Archivo, sans-serif",
                    fontWeight: 900,
                    fontSize: 18,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                  }}
                >
                  {job.org}
                </div>
                <div style={{ fontSize: 15, fontStyle: "italic", color: "#3A362F", marginTop: 4 }}>{job.role}</div>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#3A362F",
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
    </div>
  );
}
