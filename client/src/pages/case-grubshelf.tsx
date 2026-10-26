import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import PhoneCarousel from "@/components/phone-carousel";
import { GRUBSHELF_SCREENS } from "@/lib/product-screens";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const MOCKUP_URL = "https://claude.ai/artifact/7BjbMhy6GniK1G1538wQsh";

const kicker: CSSProperties = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#5F5A50",
};

const body: CSSProperties = { fontSize: 17, lineHeight: 1.6, color: "#3A362F", margin: "0 0 14px" };

const sectionPad: CSSProperties = { padding: "0 clamp(16px, 2.6vw, 30px) clamp(26px, 3.4vw, 42px)" };

const facts = [
  { num: "53", label: "Screens mocked up before build" },
  { num: "51", label: "Common meals with steps in our own words" },
  { num: "460", label: "Unit tests" },
  { num: "1", label: "App Store rejection, fixed and turned into a checklist" },
];

const decisions = [
  {
    call: "The list follows the plan",
    why: "Only meals actually placed on a day put items on the list. Picking a meal as a “regular” doesn’t put it on the list, so the list only shows what’s really being cooked this week.",
  },
  {
    call: "Main items only, no quantities",
    why: "A meal lists its 2–5 main items. Seasonings are skipped, and soup staples like palm oil and crayfish are tracked as “running low” instead of being added every time.",
  },
  {
    call: "Pots, not portions",
    why: "Diaspora households batch-cook a pot of stew or egusi and eat it over days with different sides. A pot is “still got some” or “finished”. Nobody counts portions in real life, so the app doesn’t ask them to.",
  },
  {
    call: "Never plan for the user",
    why: "Meals picked during onboarding go to Meals, not onto the week. Leftovers are only added when the user says so. Guessing wrong costs more trust than an empty state.",
  },
  {
    call: "Two shops, first-class",
    why: "Every list item belongs to a shop (supermarket or afro shop), and shopping mode walks through one shop at a time. That’s how the launch audience actually shops.",
  },
  {
    call: "Import runs on the phone",
    why: "Sharing a TikTok or Instagram recipe into the app uses on-device matching against ~150 known dishes, so there’s no AI cost per use. AI suggestions for unknown dishes are parked as a possible Premium extra.",
  },
];

const metrics = [
  { metric: "Week-4 retention (first community cohort)", target: "The number that matters" },
  { metric: "Install → a priced week", target: "Under 3 minutes" },
  { metric: "Weeks with a list built from meals", target: "3 of the first 4" },
  { metric: "Shop totals logged per household", target: "2 or more a month" },
  { metric: "Pot check-ins answered", target: "Low = too many prompts" },
];

function SectionHead({ num, title, addRef }: { num: string; title: string; addRef: (el: HTMLElement | null) => void }) {
  return (
    <div ref={addRef} data-reveal="off" style={{ borderTop: "4px solid #14120F", paddingTop: 18, marginBottom: 20 }}>
      <div style={{ ...kicker, color: "#C0281B", marginBottom: 8 }}>{num}</div>
      <h2
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(20px, 2.6vw, 32px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function Cols({ children }: { children: ReactNode }) {
  return (
    <div className="ks-cols" style={{ columns: 2, columnGap: 34, columnRule: "1px solid #CFC9BB" }}>
      {children}
    </div>
  );
}

export default function CaseGrubShelf() {
  useSEO("/design/grubshelf");
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
        <Link href="/products" onClick={scrollToTop} style={{ ...kicker, letterSpacing: "0.18em", textDecoration: "none" }}>
          &larr; App and design
        </Link>

        <div
          style={{
            ...kicker,
            letterSpacing: "0.18em",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            margin: "22px 0 14px",
          }}
        >
          <span style={{ color: "#C0281B" }}>Case study</span>
          <span>iOS</span>
          <span>&middot;</span>
          <span>Product design</span>
          <span>&middot;</span>
          <span>AI-first workflow</span>
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
          GrubShelf: Meals Lite
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 2vw, 23px)",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "#3A362F",
            maxWidth: "56ch",
            margin: "0 0 20px",
          }}
        >
          Pick your meals. Get your list. Know what it costs. A meal planner built for how African and diaspora households
          in the UK actually cook and shop.
        </p>

        <div
          style={{
            ...kicker,
            letterSpacing: "0.18em",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            padding: "10px 0",
            borderTop: "1px solid #14120F",
            borderBottom: "1px solid #14120F",
          }}
        >
          <span style={{ color: "#14120F" }}>By Kazeem Salau</span>
          <span>Role: founder &amp; product designer</span>
          <span>2026</span>
          <span style={{ color: "#C0281B" }}>Status: built, in founder testing</span>
        </div>

        {/* Hero screens */}
        <div
          style={{
            background: "#04342C",
            border: "1px solid #14120F",
            marginTop: 22,
            padding: "clamp(18px, 3vw, 36px) clamp(12px, 2vw, 28px) 0",
            display: "flex",
            justifyContent: "center",
            gap: "clamp(10px, 2vw, 26px)",
            overflow: "hidden",
          }}
        >
          {["list.jpg", "meal.jpg", "kitchen.jpg"].map((src, i) => (
            <img
              key={src}
              src={`/images/grubshelf-meals-lite/${src}`}
              alt=""
              style={{
                width: "clamp(96px, 24%, 260px)",
                height: "auto",
                display: "block",
                borderRadius: "18px 18px 0 0",
                marginTop: i === 1 ? 0 : "clamp(14px, 3vw, 40px)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              }}
            />
          ))}
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
            borderBottom: "1px solid #CFC9BB",
            marginBottom: 26,
          }}
        >
          <span style={{ color: "#C0281B" }}>Fig. 1</span>
          <span>The list, a meal and the kitchen, from the working build</span>
        </div>

        {/* Facts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 22,
            marginBottom: "clamp(26px, 3.4vw, 42px)",
          }}
        >
          {facts.map((f) => (
            <div key={f.label} ref={addRevealRef} data-reveal="off" style={{ borderTop: "1px solid #14120F", paddingTop: 12 }}>
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(34px, 4vw, 48px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "#C0281B",
                  marginBottom: 6,
                }}
              >
                {f.num}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.45, color: "#3A362F" }}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 01 Problem */}
      <section style={sectionPad}>
        <SectionHead num="01" title="The problem" addRef={addRevealRef} />
        <Cols>
          <p style={body}>
            Meal planners assume one supermarket, recipes with exact amounts and a fresh dinner every night. That isn&rsquo;t
            how many Nigerian and diaspora households in the UK eat. They cook a big pot of stew or egusi and eat it over
            several days with different sides. They eat three meals a day, mix Nigerian and British food, and shop at two
            kinds of shop: a supermarket and an afro shop.
          </p>
          <p style={body}>
            The previous version of the product had been cut down to just a shopping list. Using it showed why that
            wasn&rsquo;t enough: meals are the reason a list exists, and you can&rsquo;t say what your dinners cost without
            them. So meals came back, but lightly: no recipes to follow, no calendar, no calorie counting.
          </p>
          <p style={{ ...body, margin: 0 }}>
            <strong style={{ color: "#14120F" }}>The rule I set:</strong> meals exist only to feed the list and give it a
            price. If a feature doesn&rsquo;t do one of those, it&rsquo;s out.
          </p>
        </Cols>
      </section>

      {/* 02 Process */}
      <section style={sectionPad}>
        <SectionHead num="02" title="How I worked: LLM first, then prototype, then build" addRef={addRevealRef} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 22,
          }}
        >
          {[
            {
              step: "Spec with an LLM",
              text: "Before any screen, I used Claude to write and stress-test the PRD: principles, the user journey, edge cases (leftovers that aren’t pots, afro-shop prices with no receipt, a week that ends on Saturday) and a written list of what we would not build.",
            },
            {
              step: "Prototype in code",
              text: "I built the mockup as a 53-screen interactive design file, not static frames. My rule: every new screen is mocked up before it’s built, and the mockup is updated to match what shipped, so it stays the source of truth.",
            },
            {
              step: "Build with Claude Code",
              text: "Claude Code wrote most of the SwiftUI and Supabase code. I owned the product decisions, the design and the review of every change, and I tested each build on a real iPhone against a staging backend, kept separate from production.",
            },
            {
              step: "Cut friction as I go",
              text: "Each test pass ended in a friction list with fixes. The UI moved from glass-and-outline styles to solid cards because the glass looked nice but was harder to read. Every option shown to the user comes with a recommended default.",
            },
          ].map((s, i) => (
            <div key={s.step} ref={addRevealRef} data-reveal="off" style={{ borderTop: "1px solid #14120F", paddingTop: 14 }}>
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
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {s.step}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#3A362F", margin: 0 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 Screens */}
      <section style={sectionPad}>
        <SectionHead num="03" title="The core loop" addRef={addRevealRef} />
        <p style={{ ...body, maxWidth: "62ch" }}>
          Pick meals &rarr; the list builds itself, split by shop &rarr; shop one shop at a time &rarr; log what it came
          to &rarr; cook a pot &rarr; use it up during the week. Each week should take about a minute of picking.
        </p>
        <div ref={addRevealRef} data-reveal="off" style={{ marginTop: 18 }}>
          <PhoneCarousel screens={GRUBSHELF_SCREENS} name="GrubShelf" accent="#0A4D3E" />
        </div>
      </section>

      {/* 04 Decisions */}
      <section style={sectionPad}>
        <SectionHead num="04" title="Key decisions, and why" addRef={addRevealRef} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 0,
            border: "1px solid #14120F",
          }}
        >
          {decisions.map((d) => (
            <div
              key={d.call}
              ref={addRevealRef}
              data-reveal="off"
              style={{ padding: "clamp(14px, 1.8vw, 20px)", borderRight: "1px solid #CFC9BB", borderBottom: "1px solid #CFC9BB" }}
            >
              <div
                style={{
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {d.call}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#3A362F", margin: 0 }}>{d.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 Shipping */}
      <section style={sectionPad}>
        <SectionHead num="05" title="Staying in it through QA and release" addRef={addRevealRef} />
        <Cols>
          <p style={body}>
            Apple rejected the first version under guideline 4.0. After Sign in with Apple, it asked for a name that Apple
            had already provided. I removed the prompt, then wrote an App Review checklist that every submission now goes
            through: never re-ask for what Sign in with Apple gives you, never hard-code prices, and never advertise
            unbuilt features on the paywall.
          </p>
          <p style={body}>
            Before release I called a feature freeze. The rules: no new features until the pre-release list is done, one
            stable build for testing, and one final submission with the subscriptions sorted first. Risky clean-up happens on
            a separate branch.
          </p>
          <p style={{ ...body, margin: 0 }}>
            Engineering-aware calls along the way: debug, staging and production environments; features behind
            remote-config flags; Premium limits on the free plan (15 meals, 2 household members); prices read live from
            StoreKit; and a 460-test suite plus a UI tour that screenshots every screen.
          </p>
        </Cols>
      </section>

      {/* 06 Measure */}
      <section style={sectionPad}>
        <SectionHead num="06" title="How I'll know it works" addRef={addRevealRef} />
        <p style={{ ...body, maxWidth: "62ch" }}>
          Meals Lite hasn&rsquo;t launched yet, so these are targets, not results. The first cohort is a UK diaspora
          community I belong to, and the first test is simple: do 5&ndash;10 households recognise their own week in it?
        </p>
        <div ref={addRevealRef} data-reveal="off" style={{ borderTop: "1px solid #14120F" }}>
          {metrics.map((m) => (
            <div
              key={m.metric}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "4px 20px",
                padding: "11px 0",
                borderBottom: "1px solid #CFC9BB",
              }}
            >
              <span style={{ fontSize: 16, color: "#14120F" }}>{m.metric}</span>
              <span style={{ ...kicker, letterSpacing: "0.12em", color: "#C0281B", alignSelf: "center" }}>{m.target}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 07 Learned */}
      <section style={sectionPad}>
        <SectionHead num="07" title="What I learned" addRef={addRevealRef} />
        <Cols>
          <p style={body}>
            <strong style={{ color: "#14120F" }}>Writing it down first is the fastest route.</strong> Working through the spec and its
            edge cases with an LLM meant most of the changes of direction happened in a document, where they cost
            minutes, not in code.
          </p>
          <p style={body}>
            <strong style={{ color: "#14120F" }}>Cutting is the design work.</strong> The list of things we decided not to
            build (recipes, calendars, calorie tracking, AI week plans, budgets) shaped the product more than any one
            screen.
          </p>
          <p style={{ ...body, margin: 0 }}>
            <strong style={{ color: "#14120F" }}>AI raises the bar for judgement, not lowers it.</strong> With code cheap to
            produce, the hard part is deciding what&rsquo;s worth building and noticing when a working feature still
            gets in the user&rsquo;s way.
          </p>
        </Cols>
      </section>

      {/* Next case study */}
      <section style={sectionPad}>
        <div style={{ borderTop: "4px solid #14120F", paddingTop: 16 }}>
          <div style={{ ...kicker, marginBottom: 10 }}>Next case study</div>
          <Link
            href="/design/mai-shara"
            onClick={scrollToTop}
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(24px, 3.4vw, 44px)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
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
            Mai Shara &rarr;
          </Link>
        </div>
      </section>

      {/* Footer links */}
      <section style={sectionPad}>
        <div
          style={{
            borderTop: "4px solid #14120F",
            paddingTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
          }}
        >
          <a
            href={MOCKUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="grubshelf_mockup"
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
            Open the 53-screen mockup &#8599;
          </a>
          <a
            href="https://grubshelf.app"
            target="_blank"
            rel="noopener noreferrer"
            data-track="grubshelf_site"
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "12px 22px",
              border: "2px solid #14120F",
              color: "#14120F",
              textDecoration: "none",
            }}
          >
            grubshelf.app &#8599;
          </a>
          <Link
            href="/contact"
            onClick={scrollToTop}
            data-track="grubshelf_contact"
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "12px 22px",
              border: "2px solid #14120F",
              color: "#14120F",
              textDecoration: "none",
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
