import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const SKILLS = [
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
  "Adobe Creative Suite",
  "UX design",
  "Learning theory",
  "Agile project management",
  "Figma",
  "User research",
  "Prototyping",
  "Design systems",
  "SwiftUI",
];

const STATS = [
  { value: "50+", label: "Courses in one curriculum" },
  { value: "3", label: "Apps & sites designed" },
  { value: "+20%", label: "Course completion" },
  { value: "2014", label: "Designing since" },
];

const sectionNote = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#5F5A50",
};

const ctaStyle = {
  display: "inline-block",
  fontFamily: "Archivo, sans-serif",
  fontWeight: 800,
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  padding: "14px 22px",
  textDecoration: "none",
  transition: "background 0.2s, color 0.2s",
};

function SkillsMarquee() {
  const items = SKILLS.map((s, i) => (
    <span key={i}>
      <span>{s}</span>
      <span style={{ opacity: 0.5 }}>&nbsp;&#10022;&nbsp;</span>
    </span>
  ));

  return (
    <div
      style={{
        borderTop: "1px solid #14120F",
        borderBottom: "1px solid #14120F",
        background: "#14120F",
        color: "#F4F1EA",
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

export default function Home() {
  useSEO("/");
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
                color: "#C0281B",
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
                  Learning experience designer
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  className="ks-anim"
                  style={{
                    display: "block",
                    animation: "ks-rise 0.95s 0.68s cubic-bezier(0.16, 1, 0.3, 1) both",
                    color: "#C0281B",
                  }}
                >
                  &amp; product designer
                </span>
              </span>
            </h1>
            <p
              className="ks-anim"
              style={{
                fontFamily: "Newsreader, serif",
                fontSize: "clamp(18px, 2vw, 23px)",
                lineHeight: 1.4,
                fontStyle: "italic",
                color: "#3A362F",
                margin: "0 0 20px",
                maxWidth: "52ch",
                animation: "ks-fade 0.8s 0.85s both",
              }}
            >
              Courses people finish and apps people use. From the needs analysis to the SCORM package, and from the
              first user interview to a working build.
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
                style={{ ...ctaStyle, background: "#C0281B", color: "#F4F1EA", boxShadow: "4px 4px 0 #14120F" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#14120F";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#C0281B";
                }}
              >
                Hire me for a project &rarr;
              </Link>
              <a
                href="/files/KazeemSalau-InstructionalDesign.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_cv"
                style={{ ...ctaStyle, background: "transparent", color: "#14120F", border: "2px solid #14120F", padding: "12px 20px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#14120F";
                  (e.currentTarget as HTMLElement).style.color = "#F4F1EA";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#14120F";
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
                color: "#3A362F",
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
                borderTop: "1px solid #14120F",
                borderBottom: "1px solid #14120F",
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "#5F5A50",
                marginBottom: 22,
                animation: "ks-fade 0.8s 0.95s both",
              }}
            >
              <span style={{ color: "#14120F" }}>By Kazeem Salau</span>
              <span>&middot;</span>
              <span>Learning experience designer &middot; Product designer</span>
            </div>
            <div className="ks-cols" style={{ columns: 2, columnGap: 34, columnRule: "1px solid #CFC9BB" }}>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px" }}>
                <span
                  style={{
                    float: "left",
                    fontFamily: "Archivo, sans-serif",
                    fontWeight: 900,
                    fontSize: 66,
                    lineHeight: 0.74,
                    padding: "5px 10px 0 0",
                    color: "#C0281B",
                  }}
                >
                  I
                </span>{" "}
                have built courses for blended and self-paced learning since 2014, for learners spread across the globe.
                I work the ADDIE model with subject matter experts, write the script, then produce it in Storyline 360,
                Rise and Camtasia.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px" }}>
                I define the course itself: observable, measurable learning outcomes, performance competencies,
                interactive elements, case studies, assessments, portfolio and capstone projects. Then I script the
                dialogue in conversational tones, so a new concept arrives the way a colleague would explain it.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0 }}>
                The same habits carry into product design. I started out as a graphic designer, hold a B.Sc. in Computer
                Science, and now research, design and build apps: GrubShelf, a meal planner for UK households built in
                SwiftUI, and Mai Shara, a waste pick-up app taken from user interviews to prototype.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="ks-anim" style={{ animation: "ks-fade 1s 0.6s both" }}>
              <div
                style={{
                  height: "clamp(280px, 32vw, 380px)",
                  background: "#C0281B",
                  position: "relative",
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
                }}
              >
                <span style={{ color: "#C0281B" }}>Fig. 1</span>
                <span>Kazeem Salau, photographed in London</span>
              </div>
            </div>

            {/* In this issue */}
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
                In this issue
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16 }}>
                {[
                  { label: "Learning case studies", page: "P. 2", href: "/work" },
                  { label: "The Fixer, featured course", page: "P. 3", href: "/work/the-fixer" },
                  { label: "App and design work", page: "P. 5", href: "/products" },
                  { label: "GrubShelf, featured app", page: "P. 5", href: "/design/grubshelf" },
                  { label: "About, and what people say", page: "P. 6", href: "/about" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={scrollToTop}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 14,
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
                    <span>{item.label}</span>
                    <span
                      style={{
                        fontFamily: "Archivo, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#C0281B",
                      }}
                    >
                      {item.page}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof numbers */}
      <section style={{ padding: "clamp(26px, 3.4vw, 40px) clamp(16px, 2.6vw, 30px) 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            borderTop: "4px solid #14120F",
            borderBottom: "1px solid #14120F",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "16px 14px",
                borderLeft: i > 0 ? "1px solid #CFC9BB" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(30px, 3.6vw, 44px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#C0281B",
                  marginBottom: 6,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase" as const,
                  color: "#5F5A50",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills marquee */}
      <SkillsMarquee />

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
            borderBottom: "4px solid #14120F",
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
            Featured work
          </h2>
          <span style={sectionNote}>One project from each side of the work</span>
        </div>

        <CourseCard
          addRevealRef={addRevealRef}
          num="01"
          tags={["Learning experience design", "Branching scenario"]}
          title="The Fixer"
          description="A branching special assignment: the learner is sent to close the policy knowledge gaps that are costing an agency its service delivery. Playable in full."
          href="/work/the-fixer"
          page="3"
          image="/images/the-fixer-hq.jpg"
          reverse={false}
          last={false}
          more={{ label: "All learning case studies", href: "/work" }}
        />
        <CourseCard
          addRevealRef={addRevealRef}
          num="02"
          tags={["Product design", "iOS app"]}
          title="GrubShelf"
          description="A meal planner for UK households: pick your meals, get a list split by shop, know what it costs. Taken from spec to a 53-screen prototype to a SwiftUI build."
          href="/design/grubshelf"
          page="5"
          phones={["/images/grubshelf-app/this-week.jpg", "/images/grubshelf-app/welcome.jpg", "/images/grubshelf-app/list.jpg"]}
          reverse={true}
          last={true}
          more={{ label: "All app and design work", href: "/products" }}
        />
      </section>

      {/* Opinion + How I build */}
      <section
        ref={addRevealRef}
        data-reveal="off"
        style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}
      >
        <div
          className="ks-two"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1fr) minmax(0, 2.1fr)",
            gap: "clamp(20px, 2.6vw, 34px)",
          }}
        >
          {/* Opinion */}
          <div style={{ border: "1px solid #14120F", padding: "clamp(18px, 2.4vw, 28px)" }}>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#C0281B",
                borderBottom: "1px solid #14120F",
                paddingBottom: 9,
                marginBottom: 16,
              }}
            >
              Opinion
            </div>
            <p
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(20px, 2.3vw, 29px)",
                lineHeight: 1.14,
                letterSpacing: "-0.025em",
                margin: "0 0 16px",
              }}
            >
              Training fails on the writing long before it fails on the technology. Get the words right and the
              rest is production.
            </p>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "#5F5A50",
              }}
            >
              Kazeem Salau
            </div>
          </div>

          {/* How I build a course */}
          <div style={{ minWidth: 0, border: "1px solid #14120F", padding: "clamp(18px, 2.4vw, 28px)" }}>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                borderBottom: "1px solid #14120F",
                paddingBottom: 9,
                marginBottom: 18,
              }}
            >
              How I work, courses or apps
            </div>
            <div
              className="ks-steps-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 22 }}
            >
              {[
                {
                  num: "01",
                  title: "Start with the people",
                  desc: "A needs analysis with subject matter experts, or interviews with the people who will use the app. Clear, measurable outcomes before anything gets built.",
                },
                {
                  num: "02",
                  title: "Script and prototype",
                  desc: "Storyboards and conversational scripts for courses; flows, wireframes and clickable prototypes for apps. Both get tested before they get built.",
                },
                {
                  num: "03",
                  title: "Build, ship, improve",
                  desc: "Storyline 360, Rise and Camtasia packaged for the LMS, or SwiftUI shipped to a phone. Then reviewed and improved once real people use it.",
                },
              ].map((step) => (
                <div key={step.num}>
                  <div
                    style={{
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 900,
                      fontSize: 30,
                      letterSpacing: "-0.05em",
                      color: "#C0281B",
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
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: "#3A362F", margin: 0 }}>{step.desc}</p>
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
            background: "#14120F",
            color: "#F4F1EA",
            border: "4px double #14120F",
            padding: "clamp(24px, 3.2vw, 40px)",
            textAlign: "center",
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
            Got a course or an app that needs to actually work?
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#CFC9BB",
              maxWidth: "52ch",
              margin: "0 auto 22px",
            }}
          >
            Send me a couple of lines about who it is for and what is going wrong. I will come back with what I would
            build and how long it would take, whether that is a course, an app or both.
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
              background: "#F4F1EA",
              color: "#14120F",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C0281B";
              (e.currentTarget as HTMLElement).style.color = "#F4F1EA";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#F4F1EA";
              (e.currentTarget as HTMLElement).style.color = "#14120F";
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
  phones?: string[];
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
        borderBottom: last ? "4px solid #14120F" : "1px solid #14120F",
      }}
    >
      <Link
        href={href}
        onClick={scrollToTop}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(20px, 2.6vw, 34px)",
          color: "#14120F",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            background: phones ? "#0A4D3E" : "#14120F",
            height: "clamp(220px, 24vw, 280px)",
            border: "1px solid #14120F",
            order: reverse ? 2 : undefined,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              justifyContent: "center",
              gap: 12,
              padding: phones ? "22px 16px 0" : 0,
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            {phones ? (
              phones.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  style={{
                    width: "28%",
                    height: "auto",
                    alignSelf: "flex-start",
                    borderRadius: "14px 14px 0 0",
                    border: "3px solid #14120F",
                    borderBottom: "none",
                    marginTop: i === 1 ? 0 : 22,
                    boxShadow: "0 10px 24px rgba(0,0,0,0.3)",
                  }}
                />
              ))
            ) : (
              <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            )}
          </div>
        </div>
        <div style={{ minWidth: 0, order: reverse ? 1 : undefined }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px 12px",
              alignItems: "baseline",
              fontFamily: "Archivo, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "#5F5A50",
              marginBottom: 12,
            }}
          >
            <span style={{ color: "#C0281B" }}>{num}</span>
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
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#3A362F", margin: "0 0 14px", maxWidth: "52ch" }}>{description}</p>
          <span
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              borderBottom: "1px solid #C0281B",
              paddingBottom: 3,
              color: "#C0281B",
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
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "#14120F",
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
