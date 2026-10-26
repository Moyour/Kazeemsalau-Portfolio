import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import PhoneCarousel from "@/components/phone-carousel";
import { MAI_SHARA_SCREENS } from "@/lib/product-screens";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function CaseMaiShara() {
  useSEO("/design/mai-shara");
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
        <Link
          href="/products"
          onClick={scrollToTop}
          style={{
            display: "inline-block",
            fontFamily: "Archivo, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "#5F5A50",
            textDecoration: "none",
            marginBottom: 22,
          }}
        >
          &larr; App and design
        </Link>

        <div
          className="ks-two"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.1fr) minmax(280px, 1fr)",
            gap: "clamp(20px, 3vw, 40px)",
            paddingBottom: "clamp(20px, 2.6vw, 32px)",
          }}
        >
          {/* Left: description */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "baseline",
                fontFamily: "Archivo, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "#5F5A50",
                marginBottom: 14,
              }}
            >
              <span style={{ color: "#C0281B" }}>Case study</span>
              <span>Mobile App &middot; UX/UI Design</span>
            </div>
            <h1
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(36px, 6.4vw, 84px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                textTransform: "uppercase" as const,
                margin: "0 0 14px",
              }}
            >
              Mai Shara
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 1.8vw, 21px)",
                lineHeight: 1.45,
                fontStyle: "italic",
                color: "#3A362F",
                margin: "0 0 22px",
                maxWidth: "48ch",
              }}
            >
              A mobile application that solves problems associated with waste management, enabling users to manage waste
              disposal in both residential and corporate environments.
            </p>

            <div style={{ maxWidth: "60ch" }}>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" }}>
                <span
                  style={{
                    float: "left",
                    fontFamily: "Archivo, sans-serif",
                    fontWeight: 900,
                    fontSize: 60,
                    lineHeight: 0.74,
                    padding: "5px 10px 0 0",
                    color: "#C0281B",
                  }}
                >
                  D
                </span>
                ue to the inefficiency of the waste management agencies, there has been a delay in the pickup of waste in
                both residential and corporate environments. Residents complained about blocked drainage, terrible odour from
                piled waste, and inflated service charges from estimated billing.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" }}>
                The solution was to create a mobile application that enables users to schedule and monitor waste pick-up. Mai
                Shara gives residents and businesses control over their waste disposal, from scheduling collection to
                reporting incidents and recycling.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: "#3A362F" }}>
                I led the UX research and UI/UX design, working alongside a product manager, UI designers and a programme
                manager to take the concept from user interviews through to a fully prototyped mobile application.
              </p>
            </div>
          </div>

          {/* Right: info boxes */}
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Portfolio link */}
            <div style={{ border: "1px solid #14120F", padding: 18 }}>
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
                View the full case study
              </div>
              <a
                href="https://uxfol.io/p/kaspersalau/03fbae68"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "#C0281B",
                  borderBottom: "1px solid #C0281B",
                  paddingBottom: 2,
                  textDecoration: "none",
                }}
              >
                UXfolio case study &#8599;
              </a>
            </div>

            {/* Role */}
            <div style={{ border: "1px solid #14120F", padding: 18 }}>
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
                Role
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 16, color: "#3A362F" }}>
                <span>UX Research</span>
                <span>UI/UX Design</span>
              </div>
            </div>

            {/* Collaboration */}
            <div style={{ border: "1px solid #14120F", padding: 18 }}>
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
                Collaboration
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 16, color: "#3A362F" }}>
                <span>Product Manager</span>
                <span>UI Designers</span>
                <span>Programme Manager</span>
              </div>
            </div>

            {/* Tools */}
            <div style={{ border: "1px solid #14120F", padding: 18 }}>
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
                Tools
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.7, color: "#3A362F" }}>
                Figma &middot; Jira &middot; Miro &middot; Photoshop
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Research findings */}
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
            User research
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 22,
            marginBottom: 30,
          }}
        >
          {[
            {
              stat: "80%",
              desc: "Complained about not living in a healthy environment due to blocked drainage",
            },
            {
              stat: "65%",
              desc: "Complained about terrible odour from the pile of waste",
            },
            {
              stat: "20%",
              desc: "Complained about high service charge due to estimated bill from the waste management handler",
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={addRevealRef}
              data-reveal="off"
              style={{ borderTop: "1px solid #14120F", paddingTop: 14 }}
            >
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 36,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#C0281B",
                  lineHeight: 1,
                  marginBottom: 9,
                }}
              >
                {item.stat}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#3A362F", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Empathy quotes */}
        <div
          ref={addRevealRef}
          data-reveal="off"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(20px, 2.6vw, 34px)",
            marginBottom: 30,
          }}
        >
          {[
            "Going for a walk in the estate feels like walking through a dump, the odour from the waste makes it so hard to breathe in fresh.",
            "Whenever it rains, the entire estate is flooded and plastic is washed up on the street from the blocked drainage.",
            "The wind acts as a catalyst in distributing the unattended dirt around the estate.",
          ].map((quote, i, arr) => (
            <blockquote
              key={i}
              style={{
                margin: 0,
                paddingRight: i < arr.length - 1 ? "clamp(0px, 2vw, 24px)" : 0,
                borderRight: i < arr.length - 1 ? "1px solid #CFC9BB" : "none",
              }}
            >
              <p style={{ fontSize: 17, lineHeight: 1.55, margin: "0 0 12px", fontStyle: "italic" }}>
                &ldquo;{quote}&rdquo;
              </p>
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
                User interview
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Persona */}
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
            Persona
          </h2>
        </div>
        <div
          ref={addRevealRef}
          data-reveal="off"
          style={{
            border: "1px solid #14120F",
            padding: "clamp(18px, 2.4vw, 28px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(20px, 2.2vw, 26px)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              Adeola Olawale
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "#3A362F" }}>
              <span><strong>Age:</strong> 25</span>
              <span><strong>Location:</strong> Ikeja</span>
              <span><strong>Job:</strong> Travel Vlogger</span>
              <span><strong>Education:</strong> Mass Communication</span>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.55,
                fontStyle: "italic",
                color: "#5F5A50",
                margin: "14px 0 0",
              }}
            >
              &ldquo;A clean environment says a lot about your lifestyle.&rdquo;
            </p>
          </div>
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
              Motivations
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "#3A362F", marginBottom: 18 }}>
              <span>Neatness</span>
              <span>Conducive environment</span>
              <span>Value for money</span>
              <span>Healthy lifestyle</span>
            </div>
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
              Needs
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "#3A362F" }}>
              <span>Proper waste management</span>
              <span>Schedule waste pick-up</span>
              <span>Monitor bills and charges</span>
              <span>Report untidy environments</span>
            </div>
          </div>
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
              Pain points
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "#3A362F" }}>
              <span>Littered environment</span>
              <span>Delay in waste pick-up</span>
              <span>Increased service charge from estimated billing</span>
              <span>Constant flooding due to blocked drainage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
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
            The process
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 22,
            marginBottom: 30,
          }}
        >
          {[
            {
              num: "01",
              title: "User Research",
              desc: "Surveys and interviews across residential and corporate environments to map waste management pain points, demographics and behavioural patterns.",
            },
            {
              num: "02",
              title: "Empathy & Persona",
              desc: "Synthesised findings into a primary persona and empathy map, surfacing the emotional weight of living with unreliable waste collection.",
            },
            {
              num: "03",
              title: "User Flow & Wireframes",
              desc: "Mapped three core journeys — schedule pick-up, recycle, and report — then sketched low-fidelity wireframes on paper before moving to Figma.",
            },
            {
              num: "04",
              title: "Prototyping",
              desc: "High-fidelity screens covering onboarding, home dashboard, scheduling, wallet, location tracking and incident reporting, all tested against the persona.",
            },
          ].map((step) => (
            <div
              key={step.num}
              ref={addRevealRef}
              data-reveal="off"
              style={{ borderTop: "1px solid #14120F", paddingTop: 14 }}
            >
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
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
      </section>

      {/* Key screens */}
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
            Key screens
          </h2>
        </div>
        <div ref={addRevealRef} data-reveal="off" style={{ marginBottom: 30 }}>
          <PhoneCarousel screens={MAI_SHARA_SCREENS} name="Mai Shara" accent="#FF8A4C" />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 22,
            marginBottom: 30,
          }}
        >
          {[
            {
              num: "01",
              title: "Home",
              desc: "Dashboard showing the user's address, quick actions for reporting incidents, recycling and scheduling pick-ups, upcoming events and news.",
            },
            {
              num: "02",
              title: "Onboarding",
              desc: "Three-step introduction explaining the recycling mission, incident reporting and waste scheduling — setting expectations before registration.",
            },
            {
              num: "03",
              title: "Schedule & Track",
              desc: "Location-based scheduling with address search, driver assignment, estimated duration and real-time pick-up confirmation.",
            },
            {
              num: "04",
              title: "Wallet",
              desc: "In-app wallet for service payments, fund management with bank transfers, and transaction history for full billing transparency.",
            },
          ].map((card) => (
            <div
              key={card.num}
              ref={addRevealRef}
              data-reveal="off"
              style={{ borderTop: "1px solid #14120F", paddingTop: 14 }}
            >
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#C0281B",
                  lineHeight: 1,
                  marginBottom: 9,
                }}
              >
                {card.num}
              </div>
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  textTransform: "uppercase" as const,
                  marginBottom: 8,
                }}
              >
                {card.title}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#3A362F", margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next case study */}
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
              Next case study
            </div>
            <Link
              href="/design/grubshelf"
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
              GrubShelf: Meals Lite &rarr;
            </Link>
          </div>
          <Link
            href="/products"
            onClick={scrollToTop}
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              padding: "12px 22px",
              border: "2px solid #14120F",
              color: "#14120F",
              textDecoration: "none",
            }}
          >
            All app and design
          </Link>
        </div>
      </section>
    </div>
  );
}
