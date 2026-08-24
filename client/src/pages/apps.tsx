import { useEffect, useRef } from "react";
import { Link } from "wouter";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Apps() {
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
          Page 5 &middot; Technology
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
          The side project that shipped.
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
          Same instinct as a good course: watch what people actually do, then take away everything standing between them
          and it.
        </p>
        <div style={{ height: 4, background: "#14120F", marginBottom: 28 }} />

        {/* Two column */}
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
              <span style={{ color: "#C0281B" }}>01</span>
              <span>iOS &middot; SwiftUI</span>
              <span>&middot;</span>
              <span>On the App Store</span>
            </div>
            <h2
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(28px, 4.2vw, 54px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                textTransform: "uppercase" as const,
                margin: "0 0 14px",
              }}
            >
              GrubShelf
            </h2>
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
              Your kitchen, sorted. The list on the fridge follows you to the store.
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
                  G
                </span>
                rubShelf is a grocery app for households. It keeps track of what is in your pantry, warns you before food
                expires, and builds a shopping list that already knows what you have at home.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" }}>
                After you shop, everything you bought moves into the pantry in one tap and the spend goes against your
                budget. No second inventory to keep up to date.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "#3A362F" }}>
                The household is the point. Everyone shares the same lists and the same shelves in real time, so nobody
                comes home with a second bag of rice and nobody finds the yoghurt a week too late.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: "#3A362F" }}>
                Four tabs carry the whole thing: Home for what needs attention today, Pantry for the inventory, Shop for
                the lists, Expense for the budget and the waste it saves.
              </p>
            </div>
          </div>

          {/* Right: image + card */}
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div
                style={{
                  border: "1px solid #14120F",
                  background: "#04342C",
                }}
              >
                <img
                  src="/images/grubshelf-og.jpg"
                  alt="GrubShelf: your kitchen, sorted"
                  style={{ width: "100%", height: "auto", display: "block" }}
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
                <span>The product, as it introduces itself</span>
              </div>
            </div>

            {/* App card */}
            <div style={{ border: "1px solid #14120F", padding: 16, display: "flex", gap: 16, alignItems: "center" }}>
              <img
                src="/images/grubshelf-icon.png"
                alt="GrubShelf app icon"
                style={{ width: 60, height: 60, borderRadius: 14, display: "block", flex: "0 0 auto" }}
              />
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    fontFamily: "Archivo, sans-serif",
                    fontWeight: 900,
                    fontSize: 18,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  GrubShelf
                </div>
                <div style={{ fontSize: 15, color: "#3A362F", lineHeight: 1.45 }}>
                  Free on iOS. Built in SwiftUI for iOS 17 and up.
                </div>
                <a
                  href="https://grubshelf.app"
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
                    alignSelf: "flex-start",
                    textDecoration: "none",
                  }}
                >
                  grubshelf.app &#8599;
                </a>
              </div>
            </div>

            {/* What I did on it */}
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
                What I did on it
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 16, color: "#3A362F" }}>
                <span>Product design, end to end</span>
                <span>Brand, logo and design system</span>
                <span>SwiftUI build</span>
                <span>Marketing site and App Store listing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inside the app + Tech details */}
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
            Inside the app
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
              title: "Home",
              desc: "One card tells you what needs attention today: what is expiring, what is running low, whether it is time to shop.",
            },
            {
              num: "02",
              title: "Pantry",
              desc: "Your inventory, filterable, with each item moving through active, low, expiring and expired. Scan, search or add by hand.",
            },
            {
              num: "03",
              title: "Shop",
              desc: "Shared lists with duplicate warnings, suggestions from what you usually buy, and one tap to move a finished shop into the pantry.",
            },
            {
              num: "04",
              title: "Expense",
              desc: "Weekly and monthly budgets, spending trends, and what the food you threw away actually cost you.",
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

        {/* Tech details */}
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
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#5F5A50",
                marginBottom: 10,
              }}
            >
              Built with
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: "#3A362F" }}>
              SwiftUI &middot; iOS 17+ &middot; real-time household sync &middot; barcode scanning &middot; App Store subscriptions
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
              Design side
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: "#3A362F" }}>
              Its own design system: colour and type tokens, spacing scale, component library, and the marketing site that goes with it
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
              Where it lives
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
              }}
            >
              <a href="https://grubshelf.app" target="_blank" rel="noopener noreferrer" style={{ color: "#C0281B", textDecoration: "none" }}>
                grubshelf.app &#8599;
              </a>
              <a href="mailto:kazeem.salau@yahoo.com" style={{ color: "#C0281B", textDecoration: "none" }}>
                Ask me about it
              </a>
            </div>
          </div>
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
