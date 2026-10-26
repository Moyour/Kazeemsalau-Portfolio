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
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#5F5A50",
};

const body: CSSProperties = { fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" };

const sectionPad: CSSProperties = { padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" };

const linkCta: CSSProperties = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#C0281B",
  borderBottom: "1px solid #C0281B",
  paddingBottom: 2,
  textDecoration: "none",
};

const h2Style: CSSProperties = {
  fontFamily: "Archivo, sans-serif",
  fontWeight: 900,
  fontSize: "clamp(20px, 2.6vw, 32px)",
  lineHeight: 1,
  letterSpacing: "-0.03em",
  textTransform: "uppercase",
  margin: 0,
};

function Figure({ num, caption }: { num: string; caption: string }) {
  return (
    <div
      style={{
        ...kicker,
        fontWeight: 600,
        letterSpacing: "0.1em",
        display: "flex",
        gap: 8,
        paddingTop: 7,
        paddingBottom: 8,
        borderBottom: "1px solid #CFC9BB",
      }}
    >
      <span style={{ color: "#C0281B" }}>Fig. {num}</span>
      <span>{caption}</span>
    </div>
  );
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ borderTop: "4px solid #14120F", paddingTop: 14, marginBottom: 18, display: "flex", gap: 14, alignItems: "baseline" }}>
      <span style={{ ...kicker, color: "#C0281B" }}>{num}</span>
      <h2 style={h2Style}>{title}</h2>
    </div>
  );
}

export default function CaseGrubShelfWebsite() {
  useSEO("/design/grubshelf-website");
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
      {/* Header */}
      <section style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
        <Link href="/products" onClick={scrollToTop} style={{ ...kicker, textDecoration: "none" }}>
          &larr; All app and design work
        </Link>
        <div style={{ ...kicker, display: "flex", flexWrap: "wrap", gap: 14, margin: "22px 0 14px" }}>
          <span style={{ color: "#C0281B" }}>Marketing website</span>
          <span>Design &amp; build</span>
          <span>&middot;</span>
          <span>grubshelf.app</span>
        </div>
        <h1
          style={{
            fontFamily: "Archivo, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 6.4vw, 84px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            margin: "0 0 18px",
          }}
        >
          GrubShelf website
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 2vw, 23px)",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "#3A362F",
            maxWidth: "54ch",
            margin: "0 0 22px",
          }}
        >
          Plan smarter. Waste less. One page with one job: get people on the waiting list.
        </p>

        <div ref={addRevealRef} data-reveal="off" style={{ marginBottom: "clamp(30px, 4vw, 48px)" }}>
          <a
            href="https://grubshelf.app"
            target="_blank"
            rel="noopener noreferrer"
            data-track="grubshelf_web_hero"
            style={{ display: "block", border: "1px solid #14120F", background: "#14120F", textDecoration: "none" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px" }}>
              {["#C0281B", "#F0B442", "#2AB88A"].map((c) => (
                <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
              ))}
              <span style={{ marginLeft: 10, fontFamily: "Archivo, sans-serif", fontSize: 11, color: "#9C968C", letterSpacing: "0.06em" }}>
                grubshelf.app
              </span>
            </div>
            <img
              src="/images/grubshelf-web/hero.jpg"
              alt="The grubshelf.app home page: Plan smarter. Waste less."
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </a>
          <Figure num="1" caption="The landing page at desktop width" />
        </div>
      </section>

      {/* 01 The brief */}
      <section style={sectionPad}>
        <SectionHead num="01" title="The brief" />
        <div
          className="ks-two"
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(240px, 0.8fr)", gap: "clamp(24px, 3vw, 44px)", alignItems: "start" }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={body}>
              GrubShelf needed somewhere to send people before the app was ready. The site had one job: explain the idea
              quickly enough that a visitor joins the waiting list before they leave.
            </p>
            <p style={body}>
              It opens on the problem people already feel rather than the feature list. “You bought basil. Again.” Each
              section names a familiar kitchen moment, then shows how the app quietly fixes it, and every section ends on
              the same single action: join the waiting list.
            </p>
            <p style={body}>
              It is light on purpose: a short cookie notice with an “only essentials” option, a light and dark theme, and a
              layout that works the same on a phone as on a laptop.
            </p>
          </div>
          <div style={{ border: "1px solid #14120F", padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Goal", "Waiting-list sign-ups"],
              ["My role", "Design, copy and build"],
              ["Part of", "The GrubShelf brand and design system"],
              ["Live at", "grubshelf.app"],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ ...kicker, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 Show, don't tell */}
      <section style={sectionPad}>
        <SectionHead num="02" title="Show, don’t tell" />
        <div
          className="ks-two"
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(240px, 0.8fr)", gap: "clamp(24px, 3vw, 44px)", alignItems: "start" }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{ ...body, marginBottom: 20 }}>
              The receipt demo does the selling. Instead of describing receipt scanning, it shows a till receipt turning
              into a dated, counted pantry, so the idea lands in a couple of seconds.
            </p>
            <div ref={addRevealRef} data-reveal="off">
              <div style={{ border: "1px solid #14120F", background: "#FFFFFF" }}>
                <img
                  src="/images/grubshelf-web/receipt.jpg"
                  alt="Receipt demo: a till receipt turning into pantry items with expiry dates"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <Figure num="2" caption="Your receipt does the typing" />
            </div>
          </div>
          <div ref={addRevealRef} data-reveal="off" style={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "min(240px, 70vw)",
                aspectRatio: "390 / 844",
                background: "#14120F",
                borderRadius: 36,
                padding: 8,
                boxShadow: "10px 10px 0 #2AB88A",
              }}
            >
              <img
                src="/images/grubshelf-web/mobile.jpg"
                alt="grubshelf.app on a phone"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", borderRadius: 28, display: "block" }}
              />
            </div>
            <div style={{ alignSelf: "stretch", marginTop: 14 }}>
              <Figure num="3" caption="The same page on a phone" />
            </div>
          </div>
        </div>
      </section>

      {/* Next */}
      <section style={sectionPad}>
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
            <div style={{ ...kicker, marginBottom: 10 }}>Next</div>
            <Link
              href="/design/mai-shara"
              onClick={scrollToTop}
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(26px, 3.6vw, 46px)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
                color: "#14120F",
                textDecoration: "none",
              }}
            >
              Mai Shara &rarr;
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href="https://grubshelf.app" target="_blank" rel="noopener noreferrer" style={linkCta}>
              Visit grubshelf.app &#8599;
            </a>
            <Link
              href="/contact"
              onClick={scrollToTop}
              data-track="grubshelf_web_hire"
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "14px 24px",
                background: "#C0281B",
                color: "#F4F1EA",
                textDecoration: "none",
              }}
            >
              Hire me for a site like this
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
