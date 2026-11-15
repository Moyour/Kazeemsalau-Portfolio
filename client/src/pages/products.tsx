import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Words } from "@/components/motion";
import ProductThumbnails from "@/components/product-chapters";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const kicker = {
  fontFamily: "var(--font-learning-text)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "var(--muted)",
};

const h2Style = {
  fontFamily: "var(--font-learning-text)",
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
  color: "var(--body)",
  margin: "0 0 20px",
  maxWidth: "48ch",
};

const linkCta = {
  fontFamily: "var(--font-learning-text)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--accent)",
  borderBottom: "1px solid var(--accent)",
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
      <section className="ks-mag-head" style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) 0" }}>
        <div style={{ ...kicker, fontSize: 11, letterSpacing: "0.22em", color: "var(--accent)", marginBottom: 14 }}>
          Pages 2 to 4 &middot; App and design
        </div>
        <h1
          className="ks-page-h1"
          style={{
            fontFamily: "var(--font-learning-text)",
            fontWeight: 900,
            fontSize: "clamp(34px, 5.6vw, 74px)",
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            textTransform: "uppercase" as const,
            margin: "0 0 18px",
            maxWidth: "20ch",
          }}
        >
          <Words text="Products, designed & built." />
        </h1>
        <p style={{ ...standfirst, maxWidth: "56ch" }}>
          Same instinct as a good course: watch what people do, then remove what stands in their way.
        </p>

        <div style={{ height: 4, background: "var(--ink)", marginBottom: 28 }} />
      </section>

      {/* The six projects. */}
      <section style={sectionPad}>
        <ProductThumbnails />
      </section>

      {/* CTA */}
      <section style={{ padding: "0 clamp(16px, 2.6vw, 30px) clamp(30px, 4vw, 52px)" }}>
        <div
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "clamp(22px, 3vw, 36px)",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: "40ch" }}>
            <div style={{ fontFamily: "var(--font-learning-text)", fontWeight: 900, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 8 }}>
              Got a product that needs designing?
            </div>
            <div style={{ fontSize: 16, color: "var(--rule)", lineHeight: 1.5 }}>From first interviews to a build people can tap through.</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/contact" onClick={scrollToTop} data-track="products_footer_hire" className="ks-action">
              Hire me for a project &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
