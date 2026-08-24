import { useEffect, useRef } from "react";

export default function About() {
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
    <section style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
      {/* Label */}
      <div
        style={{
          fontFamily: "Archivo, sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: "#C0281B",
          marginBottom: 14,
        }}
      >
        Page 6 &middot; Profile
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(34px, 5.6vw, 74px)",
          lineHeight: 0.93,
          letterSpacing: "-0.04em",
          textTransform: "uppercase" as const,
          margin: "0 0 18px",
          maxWidth: "22ch",
        }}
      >
        The guy who builds it.
      </h1>

      {/* Byline */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 14,
          padding: "10px 0",
          borderTop: "1px solid #14120F",
          borderBottom: "4px solid #14120F",
          fontFamily: "Archivo, sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: "#5F5A50",
          marginBottom: 26,
        }}
      >
        <span style={{ color: "#14120F" }}>Kazeem Salau</span>
        <span>&middot;</span>
        <span>Instructional designer &amp; eLearning developer</span>
        <span>&middot;</span>
        <span>London</span>
      </div>

      {/* Two column */}
      <div
        className="ks-two"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.1fr) minmax(260px, 1fr)",
          gap: "clamp(20px, 2.6vw, 34px)",
          paddingBottom: "clamp(26px, 3.4vw, 42px)",
        }}
      >
        {/* Left column: body text */}
        <div style={{ minWidth: 0 }}>
          <div className="ks-cols" style={{ columns: 2, columnGap: 34, columnRule: "1px solid #CFC9BB" }}>
            <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" }}>
              I define the whole course: measurable learning outcomes, performance competencies, interactive elements,
              case studies, assessments, portfolio and capstone projects.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" }}>
              Nine years designing learning across insurance, telecoms and consulting. A curriculum of more than 50
              courses that lifted engagement 25% and completion 20%. Learning needs analysis with subject matter experts
              and business leaders. Adult learning programmes in sales, health management, insurance, business acumen and
              policy.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" }}>
              I build the relationships that make projects work, with stakeholders, subject matter experts and vendors,
              and carry several projects at once to deadline. I am also the person who says when the method or the
              technology needs to change rather than the content.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: "#3A362F" }}>
              B.Sc. Computer Science. Professional Certificate in Instructional Design. Design Thinking with the
              Interaction Design Foundation.
            </p>
          </div>

          {/* Tools + Practice — single box */}
          <div
            ref={addRevealRef}
            data-reveal="off"
            style={{
              border: "1px solid #14120F",
              padding: 18,
              marginTop: 24,
            }}
          >
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                borderBottom: "1px solid #14120F",
                paddingBottom: 9,
                marginBottom: 14,
              }}
            >
              Tools of the trade
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: "#3A362F" }}>
              Articulate 360 &middot; Storyline 360 &middot; Rise &middot; Camtasia &middot; Adobe Captivate &middot;
              Synthesia &middot; Colossayan &middot; Vyond &middot; Moodle &middot; Adobe Creative Suite &middot;
              Generative AI
            </div>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                borderBottom: "1px solid #14120F",
                paddingBottom: 9,
                margin: "20px 0 14px",
              }}
            >
              Practice
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: "#3A362F" }}>
              ADDIE model &middot; storyboarding &middot; instructional writing &middot; assessment creation &middot;
              blended learning &middot; instructor-led training &middot; learning theory &middot; UX design &middot; SME
              collaboration &middot; agile project management &middot; SharePoint
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Portrait */}
          <div>
            <div
              style={{
                height: "clamp(280px, 32vw, 360px)",
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
              <span style={{ color: "#C0281B" }}>Fig. 2</span>
              <span>The designer at work</span>
            </div>
          </div>

          {/* Currently open to work */}
          <div
            ref={addRevealRef}
            data-reveal="off"
            style={{
              border: "1px solid #14120F",
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                borderBottom: "1px solid #14120F",
                paddingBottom: 9,
                marginBottom: 14,
              }}
            >
              Currently open to work
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#3A362F", margin: "0 0 16px" }}>
              Full-time instructional design and learning experience roles, plus select freelance projects.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
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
                href="/files/KazeemSalau-InstructionalDesign.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C0281B", textDecoration: "none" }}
              >
                Download resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
