import { useSEO } from "@/hooks/use-seo";
import YourCalls from "@/components/your-call";
import { CALLS } from "@/lib/calls";
import { MAI_SHARA_SCREENS } from "@/lib/product-screens";
import { InkRing } from "@/components/news-motion";
import { Flap, PopUp } from "@/components/living-paper";
import { EmpathyMap, FlowSheet, PrototypePhone, SurveySheet } from "@/components/mai-shara-artifacts";
import { CaseHeader, CaseNext, CaseSection, PhoneHero, ScreenStrip, ShortVersion } from "@/components/case-kit";

// Mai Shara, in the site's one case-study layout.

export default function CaseMaiShara() {
  useSEO("/design/mai-shara");

  return (
    <article>
      <CaseHeader
        back={{ href: "/products", label: "All app and design work" }}
        page="3"
        tags={["Mobile app", "UX research", "UI design"]}
        title="Mai Shara"
        deck="A mobile app for managing waste disposal, at home and at work."
        byline={["UX research & UI/UX design", "Figma · Jira · Miro · Photoshop"]}
        heroStyle={{ background: "#FF8A4C", viewTransitionName: "media-mai-shara" }}
        hero={
          <PhoneHero
            label="Mai Shara screens: registration, the home dashboard and the wallet"
            srcs={["register", "home", "wallet"].map((n) => `/images/mai-shara/${n}.jpg`)}
          />
        }
      />

      <ShortVersion
        problem="Late pick-ups left residents with blocked drains, odour and estimated bills."
        role="UX research and UI/UX design, alongside a product manager, UI designers and a programme manager."
        did="An app to schedule and track pick-ups, report incidents, recycle and pay."
        result="A full prototype, from user interviews to high-fidelity screens."
      />

      <CaseSection part="challenge">
        <p className="cs-lead">Waste pick-ups were late, and residents were living with the results.</p>
        <p className="cs-p">
          Inefficient agencies meant late waste pick-ups at homes and offices. Surveys and interviews showed the daily cost:
        </p>
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
              desc: "Said blocked drains made their environment unhealthy",
            },
            {
              stat: "65%",
              desc: "Complained of odour from piled-up waste",
            },
            {
              stat: "20%",
              desc: "Complained of high, estimated service charges",
            },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--ink)", paddingTop: 14 }}>
              <InkRing value={parseInt(item.stat)} label={item.desc} color={["#C0281B", "#F0B442", "#14120F"][i]} />
            </div>
          ))}
        </div>

        <div className="lp-quotes">
          {[
            "Going for a walk in the estate feels like walking through a dump, the odour from the waste makes it so hard to breathe in fresh.",
            "Whenever it rains, the entire estate is flooded and plastic is washed up on the street from the blocked drainage.",
            "The wind acts as a catalyst in distributing the unattended dirt around the estate.",
          ].map((quote, i) => (
            <PopUp key={i} delay={i * 0.12} tilt={[-1.5, 1.2, -0.8][i]}>
              <div className="lp-note lp-quote-note">
                <b>&ldquo;{quote}&rdquo;</b>
                <span>User interview</span>
              </div>
            </PopUp>
          ))}
        </div>
        <YourCalls calls={CALLS["mai-shara"]} />
      </CaseSection>

      <CaseSection part="approach">
        <p className="cs-lead">From user interviews to a tested prototype.</p>
        <div className="lp-steps" style={{ marginBottom: 30 }}>
          {[
            {
              num: "01",
              title: "User research",
              desc: "Surveys and interviews at homes and offices, mapping pain points, demographics and behaviour.",
            },
            {
              num: "02",
              title: "Empathy and persona",
              desc: "A primary persona and empathy map, capturing the emotional weight of unreliable collection.",
            },
            {
              num: "03",
              title: "User flow and wireframes",
              desc: "Three core journeys (schedule, recycle, report), sketched as paper wireframes before Figma.",
            },
            {
              num: "04",
              title: "Prototyping",
              desc: "High-fidelity onboarding, dashboard, scheduling, wallet, tracking and reporting, tested against the persona.",
            },
          ].map((step, i) => (
            <div key={step.num}>
              <div className="lp-step-art">
                <PopUp delay={i * 0.12} tilt={[-2, 1.5, -1, 2][i]}>
                  {[<SurveySheet />, <EmpathyMap />, <FlowSheet />, <PrototypePhone />][i]}
                </PopUp>
              </div>
            <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 14 }}>
              <div
                style={{
                  fontFamily: "var(--font-learning-text)",
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 9,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-learning-text)",
                  fontWeight: 800,
                  fontSize: 15,
                  textTransform: "uppercase" as const,
                  marginBottom: 8,
                }}
              >
                {step.title}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--body)", margin: 0 }}>{step.desc}</p>
            </div>
            </div>
          ))}
        </div>
        <h3 className="cs-h3">Who it&rsquo;s for</h3>
        <PopUp tilt={-0.6}>
        <div
          style={{
            border: "1px solid var(--ink)",
            background: "var(--paper-2)",
            padding: "clamp(18px, 2.4vw, 28px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-learning-text)",
                fontWeight: 900,
                fontSize: "clamp(20px, 2.2vw, 26px)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              Adeola Olawale
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--body)" }}>
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
                color: "var(--muted)",
                margin: "14px 0 0",
              }}
            >
              &ldquo;A clean environment says a lot about your lifestyle.&rdquo;
            </p>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                marginBottom: 10,
              }}
            >
              Motivations
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--body)", marginBottom: 18 }}>
              <span>Neatness</span>
              <span>Conducive environment</span>
              <span>Value for money</span>
              <span>Healthy lifestyle</span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                marginBottom: 10,
              }}
            >
              Needs
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--body)" }}>
              <span>Proper waste management</span>
              <span>Schedule waste pick-up</span>
              <span>Monitor bills and charges</span>
              <span>Report untidy environments</span>
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-learning-text)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                marginBottom: 10,
              }}
            >
              Pain points
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--body)" }}>
              <span>Littered environment</span>
              <span>Delay in waste pick-up</span>
              <span>Increased service charge from estimated billing</span>
              <span>Constant flooding due to blocked drainage</span>
            </div>
          </div>
        </div>
        </PopUp>
      </CaseSection>

      <CaseSection part="solution">
        <p className="cs-lead">One app for scheduling, tracking, reporting and paying.</p>
        <p className="cs-p">
          Residents and businesses control their waste: schedule collection, report incidents, recycle. Lift a flap for each
          part.
        </p>
        <div className="lp-flaps" style={{ marginBottom: 30 }}>
          {[
            {
              num: "01",
              title: "Home",
              desc: "The user's address, quick actions (report, recycle, schedule), events and news.",
            },
            {
              num: "02",
              title: "Onboarding",
              desc: "A three-step intro to recycling, reporting and scheduling, before registration.",
            },
            {
              num: "03",
              title: "Schedule and track",
              desc: "Address search, driver assignment, estimated time and live pick-up confirmation.",
            },
            {
              num: "04",
              title: "Wallet",
              desc: "An in-app wallet: pay, top up by bank transfer, and see every transaction.",
            },
          ].map((card) => (
            <Flap
              key={card.num}
              label={card.title}
              front={
                <>
                  <span className="lp-flap-num">{card.num}</span>
                  <span className="lp-flap-call">{card.title}</span>
                  <span className="lp-flap-hint">Lift to read more &uarr;</span>
                </>
              }
              back={card.desc}
            />
          ))}
        </div>
      </CaseSection>

      <CaseSection part="tryIt">
        <p className="cs-lead">Walk through the app, screen by screen.</p>
        <ScreenStrip screens={MAI_SHARA_SCREENS} />
      </CaseSection>

      <CaseSection part="outcome">
        <p className="cs-lead">A fully prototyped app, built on what residents told us.</p>
        <p className="cs-p">
          Every screen answers the research: tracking for late pick-ups, incident reports for blocked drains, and a wallet
          with full history for estimated bills.
        </p>
        <a href="https://uxfol.io/p/kaspersalau/03fbae68" target="_blank" rel="noopener noreferrer" className="cs-link">
          Read the full case study on UXfolio &#8599;
        </a>
      </CaseSection>

      <CaseNext label="GrubShelf: Meals Lite" href="/design/grubshelf" hire="Hire me for a product like this" />
    </article>
  );
}
