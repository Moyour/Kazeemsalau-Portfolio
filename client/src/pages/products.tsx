import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const MORE_WORK = [
  {
    num: "04",
    tags: "Web design · Healthcare",
    title: "Leadway Health",
    description:
      "Website design for a health insurance provider, bringing complex HMO plans and benefits into a clear, accessible interface.",
    href: "https://www.figma.com/proto/OS9nngSk333zyXI6eV6CT7/Leadway-Health-Website-(June-2021)?node-id=13%3A7&scaling=scale-down&page-id=0%3A1&starting-point-node-id=13%3A7&show-proto-sidebar=1",
  },
  {
    num: "05",
    tags: "UX design · Simplification",
    title: "Householder",
    description:
      "A UX simplification project that streamlined a complex householder journey, reducing friction and making the experience more intuitive.",
    href: "https://www.figma.com/proto/CdsZGF09AIwdSKshvj6ZO8/Householder-simplification?page-id=0%3A1&node-id=24%3A935&viewport=-948%2C435%2C0.09&scaling=min-zoom&starting-point-node-id=24%3A935",
  },
  {
    num: "06",
    tags: "Product design · Insurance",
    title: "Pharmacy Benefit",
    description:
      "Product design for a pharmacy benefit management system, mapping the end-to-end experience of benefit claims and pharmacy interactions.",
    href: "https://www.figma.com/proto/hUdo1kupV2i7SOJMU9qHAG/PHARMACY-BENEFIT?node-id=4%3A8&starting-point-node-id=4%3A8",
  },
];

const PRODUCTS = [
  {
    num: "01",
    href: "/design/grubshelf",
    title: "GrubShelf app",
    tags: "iOS app · Product & UI design",
    description: "A meal planner for African and diaspora households in the UK. Pick your meals, get a list split by shop, know what it costs.",
    bg: "#0A4D3E",
    phones: ["/images/grubshelf-app/this-week.jpg", "/images/grubshelf-app/welcome.jpg", "/images/grubshelf-app/list.jpg"],
  },
  {
    num: "02",
    href: "/design/grubshelf-website",
    title: "GrubShelf website",
    tags: "Marketing site · Design & build",
    description: "The landing page for GrubShelf, built to do one thing: get people onto the waiting list.",
    bg: "#E9EFEA",
    image: "/images/grubshelf-web/hero.jpg",
  },
  {
    num: "03",
    href: "/design/mai-shara",
    title: "Mai Shara",
    tags: "Mobile app · UX research & UI",
    description: "Schedule and track waste pick-up, pay for it and report problems. Taken from user interviews to a full prototype.",
    bg: "#FF8A4C",
    phones: ["/images/mai-shara/register.jpg", "/images/mai-shara/home.jpg", "/images/mai-shara/wallet.jpg"],
  },
];

const kicker = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#5F5A50",
};

const h2Style = {
  fontFamily: "Archivo, sans-serif",
  fontWeight: 900,
  fontSize: "clamp(28px, 4.2vw, 54px)",
  lineHeight: 0.98,
  letterSpacing: "-0.035em",
  textTransform: "uppercase" as const,
  margin: "0 0 14px",
};

const standfirst = {
  fontSize: "clamp(17px, 1.8vw, 21px)",
  lineHeight: 1.45,
  fontStyle: "italic",
  color: "#3A362F",
  margin: "0 0 20px",
  maxWidth: "48ch",
};

const linkCta = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#C0281B",
  borderBottom: "1px solid #C0281B",
  paddingBottom: 2,
  textDecoration: "none",
  alignSelf: "flex-start",
};

const sectionPad = { padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)", scrollMarginTop: 60 };

export default function Products() {
  useSEO("/products");
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
        <div style={{ ...kicker, fontSize: 10, letterSpacing: "0.22em", color: "#C0281B", marginBottom: 14 }}>
          Page 5 &middot; App and design
        </div>
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
          Products, designed &amp; built.
        </h1>
        <p style={{ ...standfirst, maxWidth: "56ch" }}>
          Same instinct as a good course: watch what people actually do, then take away everything standing between them
          and it.
        </p>

        <div style={{ height: 4, background: "#14120F", marginBottom: 28 }} />
      </section>

      {/* Product thumbnails */}
      <section style={sectionPad}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "clamp(18px, 2.4vw, 28px)" }}>
          {PRODUCTS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              onClick={scrollToTop}
              data-track={`products_card_${p.num}`}
              ref={addRevealRef as any}
              data-reveal="off"
              style={{
                border: "1px solid #14120F",
                display: "flex",
                flexDirection: "column",
                color: "#14120F",
                textDecoration: "none",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #C0281B";
                (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <div
                style={{
                  background: p.bg,
                  borderBottom: "1px solid #14120F",
                  height: "clamp(220px, 24vw, 280px)",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  padding: p.phones ? "22px 16px 0" : 0,
                }}
              >
                {p.phones ? (
                  p.phones.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      style={{
                        width: "31%",
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
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                  />
                )}
              </div>
              <div style={{ padding: "clamp(16px, 2vw, 22px)", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <span style={kicker}>
                  <span style={{ color: "#C0281B" }}>{p.num}</span> &middot; {p.tags}
                </span>
                <h2 style={{ ...h2Style, fontSize: "clamp(24px, 2.8vw, 34px)", margin: 0 }}>{p.title}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "#3A362F", margin: 0, flex: 1 }}>{p.description}</p>
                <span style={{ ...linkCta, marginTop: 6 }}>Open the project &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* More design work */}
      <section style={sectionPad}>
        <div style={{ borderTop: "4px solid #14120F", paddingTop: 14, marginBottom: 20 }}>
          <h2 style={{ ...h2Style, fontSize: "clamp(20px, 2.6vw, 32px)", margin: 0 }}>More design work</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(16px, 2vw, 24px)" }}>
          {MORE_WORK.map((p) => (
            <a
              key={p.num}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={addRevealRef as any}
              data-reveal="off"
              style={{
                border: "1px solid #14120F",
                padding: "clamp(14px, 1.8vw, 20px)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                color: "#14120F",
                textDecoration: "none",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #14120F";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <span style={kicker}>
                <span style={{ color: "#C0281B" }}>{p.num}</span> &middot; {p.tags}
              </span>
              <span style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: "-0.03em", textTransform: "uppercase" as const, lineHeight: 1 }}>
                {p.title}
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.55, color: "#3A362F", flex: 1 }}>{p.description}</span>
              <span style={linkCta}>Open the Figma prototype &#8599;</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}>
        <div
          style={{
            background: "#14120F",
            color: "#F4F1EA",
            padding: "clamp(22px, 3vw, 36px)",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: "40ch" }}>
            <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 8 }}>
              Got a product that needs designing?
            </div>
            <div style={{ fontSize: 16, color: "#CFC9BB", lineHeight: 1.5 }}>From the first interviews to a build people can tap through.</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link
              href="/contact"
              onClick={scrollToTop}
              data-track="products_footer_hire"
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                padding: "14px 22px",
                background: "#C0281B",
                color: "#F4F1EA",
                textDecoration: "none",
              }}
            >
              Hire me &rarr;
            </Link>
            <a
              href="/files/KazeemSalau-InstructionalDesign.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-track="products_footer_cv"
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                padding: "12px 20px",
                border: "2px solid #F4F1EA",
                color: "#F4F1EA",
                textDecoration: "none",
              }}
            >
              Download CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
