import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Design() {
  useSEO("/design");
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
          Page 8 &middot; Product Design
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
            maxWidth: "20ch",
          }}
        >
          Visual &amp; learning design.
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
          Research, wireframes, prototypes and the decisions that shaped each product from problem to polished interface.
        </p>
        <div style={{ height: 4, background: "#14120F", marginBottom: 28 }} />

        {/* Case studies */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(18px, 2.4vw, 28px)",
            paddingBottom: "clamp(26px, 3.4vw, 42px)",
          }}
        >
          {[
            {
              num: "01",
              tags: "iOS App · Product Design · AI-first",
              title: "GrubShelf: Meals Lite",
              description:
                "A meal planner for African and diaspora households in the UK. Pick your meals, get a list split by shop, know what it costs. From LLM-first spec to a 53-screen prototype to a working iOS build.",
              role: "Founder & product designer",
              href: "/design/grubshelf",
              track: "design_list_grubshelf",
            },
            {
              num: "02",
              tags: "Mobile App · UX/UI Design",
              title: "Mai Shara",
              description:
                "A mobile app that lets residents and businesses schedule and track waste pick-up, pay for the service and report incidents. Taken from user interviews to a full prototype.",
              role: "UX research & UI/UX design",
              href: "/design/mai-shara",
              track: "design_list_maishara",
            },
          ].map((project) => (
            <Link
              key={project.num}
              href={project.href}
              onClick={scrollToTop}
              data-track={project.track}
              ref={addRevealRef as any}
              data-reveal="off"
              style={{
                border: "1px solid #14120F",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "#14120F",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #C0281B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {project.num === "01" ? (
                <div
                  style={{
                    background: "#04342C",
                    borderBottom: "1px solid #14120F",
                    height: "clamp(200px, 22vw, 260px)",
                    padding: "22px 18px 0",
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    overflow: "hidden",
                  }}
                >
                  {["list.jpg", "meal.jpg", "kitchen.jpg"].map((src, i) => (
                    <img
                      key={src}
                      src={`/images/grubshelf-meals-lite/${src}`}
                      alt=""
                      style={{
                        width: "30%",
                        height: "auto",
                        alignSelf: "flex-start",
                        borderRadius: "12px 12px 0 0",
                        marginTop: i === 1 ? 0 : 18,
                        boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    background: "#14120F",
                    color: "#F4F1EA",
                    borderBottom: "1px solid #14120F",
                    height: "clamp(200px, 22vw, 260px)",
                    padding: "clamp(18px, 2.4vw, 26px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(56px, 7vw, 88px)",
                      letterSpacing: "-0.05em",
                      lineHeight: 0.9,
                      color: "#C0281B",
                    }}
                  >
                    80%
                  </div>
                  <div style={{ fontSize: 16, lineHeight: 1.45, fontStyle: "italic", color: "#E7E3DA", marginTop: 10, maxWidth: "30ch" }}>
                    of residents interviewed said blocked drainage made their estate unhealthy.
                  </div>
                </div>
              )}
              <div style={{ padding: "clamp(16px, 2vw, 22px)", display: "flex", flexDirection: "column", flex: 1 }}>
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
                  <span style={{ color: "#C0281B", fontWeight: 700 }}>{project.num}</span>
                  {" · "}
                  {project.tags}
                </div>
                <h2
                  style={{
                    fontFamily: "Archivo, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(24px, 3vw, 36px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase" as const,
                    margin: "0 0 12px",
                  }}
                >
                  {project.title}
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "#3A362F", margin: "0 0 14px", flex: 1 }}>
                  {project.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #CFC9BB",
                    paddingTop: 12,
                  }}
                >
                  <span style={{ fontSize: 14, fontStyle: "italic", color: "#5F5A50" }}>{project.role}</span>
                  <span
                    style={{
                      fontFamily: "Archivo, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase" as const,
                      color: "#C0281B",
                      borderBottom: "1px solid #C0281B",
                      paddingBottom: 2,
                    }}
                  >
                    Read the case study &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Other design projects */}
      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(26px, 3.4vw, 42px)" }}>
        <div
          ref={addRevealRef}
          data-reveal="off"
          style={{ borderTop: "4px solid #14120F", paddingTop: 18, marginBottom: 24 }}
        >
          <h2
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(20px, 2.6vw, 32px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase" as const,
              margin: 0,
            }}
          >
            More design work
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
            marginBottom: 30,
          }}
        >
          {[
            {
              num: "03",
              tags: "Web Design &middot; Healthcare",
              title: "Leadway Health",
              description:
                "Website design for a health insurance provider, bringing complex HMO plans and benefits into a clear, accessible interface.",
              href: "https://www.figma.com/proto/OS9nngSk333zyXI6eV6CT7/Leadway-Health-Website-(June-2021)?node-id=13%3A7&scaling=scale-down&page-id=0%3A1&starting-point-node-id=13%3A7&show-proto-sidebar=1",
            },
            {
              num: "04",
              tags: "UX Design &middot; Simplification",
              title: "Householder",
              description:
                "A UX simplification project that streamlined a complex householder journey, reducing friction and making the experience more intuitive.",
              href: "https://www.figma.com/proto/CdsZGF09AIwdSKshvj6ZO8/Householder-simplification?page-id=0%3A1&node-id=24%3A935&viewport=-948%2C435%2C0.09&scaling=min-zoom&starting-point-node-id=24%3A935",
            },
            {
              num: "05",
              tags: "Product Design &middot; Insurance",
              title: "Pharmacy Benefit",
              description:
                "Product design for a pharmacy benefit management system, mapping the end-to-end experience of benefit claims and pharmacy interactions.",
              href: "https://www.figma.com/proto/hUdo1kupV2i7SOJMU9qHAG/PHARMACY-BENEFIT?node-id=4%3A8&starting-point-node-id=4%3A8",
            },
          ].map((project) => (
            <a
              key={project.num}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={addRevealRef as any}
              data-reveal="off"
              style={{
                border: "1px solid #14120F",
                display: "flex",
                flexDirection: "column",
                padding: "clamp(14px, 1.8vw, 20px)",
                textDecoration: "none",
                color: "#14120F",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #14120F";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
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
                <span style={{ color: "#C0281B", fontWeight: 700 }}>{project.num}</span>
                {" · "}
                <span dangerouslySetInnerHTML={{ __html: project.tags }} />
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
                {project.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#3A362F", margin: "0 0 14px", flex: 1 }}>
                {project.description}
              </p>
              <span
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "#C0281B",
                  borderBottom: "1px solid #C0281B",
                  paddingBottom: 2,
                  alignSelf: "flex-start",
                }}
              >
                View prototype &#8599;
              </span>
            </a>
          ))}
        </div>
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
              Also in this issue
            </div>
            <Link
              href="/work"
              onClick={scrollToTop}
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(24px, 3.4vw, 44px)",
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
              The course work &rarr;
            </Link>
          </div>
          <Link
            href="/contact"
            onClick={scrollToTop}
            style={{
              background: "#C0281B",
              color: "#F4F1EA",
              padding: "14px 24px",
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
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
            Say hello
          </Link>
        </div>
      </section>
    </div>
  );
}
