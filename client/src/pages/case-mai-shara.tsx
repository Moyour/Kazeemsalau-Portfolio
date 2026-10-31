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
        tags={["Mobile app", "UX research", "UI design"]}
        title="Mai Shara"
        deck="A mobile application that solves problems associated with waste management, enabling users to manage waste disposal in both residential and corporate environments."
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
        problem="Late waste pick-ups left residents with blocked drains, bad odour and estimated bills."
        role="UX research and UI/UX design, with a product manager, UI designers and a programme manager."
        did="A mobile app to schedule and track pick-ups, report incidents, recycle and pay for the service."
        result="A fully prototyped mobile app, taken from user interviews to high-fidelity screens."
      />

      <CaseSection part="challenge">
        <p className="cs-lead">Waste pick-ups were late, and residents were living with the results.</p>
        <p className="cs-p">
          Due to the inefficiency of the waste management agencies, there was a delay in the pick-up of waste in both
          residential and corporate environments. Surveys and interviews showed what that meant day to day:
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
              desc: "Surveys and interviews across residential and corporate environments to map waste management pain points, demographics and behavioural patterns.",
            },
            {
              num: "02",
              title: "Empathy and persona",
              desc: "Synthesised findings into a primary persona and empathy map, surfacing the emotional weight of living with unreliable waste collection.",
            },
            {
              num: "03",
              title: "User flow and wireframes",
              desc: "Mapped three core journeys (schedule pick-up, recycle and report), then sketched low-fidelity wireframes on paper before moving to Figma.",
            },
            {
              num: "04",
              title: "Prototyping",
              desc: "High-fidelity screens covering onboarding, home dashboard, scheduling, wallet, location tracking and incident reporting, all tested against the persona.",
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
                  fontFamily: "Archivo, sans-serif",
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
                  fontFamily: "Archivo, sans-serif",
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
                fontFamily: "Archivo, sans-serif",
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
                fontFamily: "Archivo, sans-serif",
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
                fontFamily: "Archivo, sans-serif",
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
                fontFamily: "Archivo, sans-serif",
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
          Mai Shara gives residents and businesses control over their waste disposal, from scheduling collection to reporting
          incidents and recycling. Lift a flap to read about each part.
        </p>
        <div className="lp-flaps" style={{ marginBottom: 30 }}>
          {[
            {
              num: "01",
              title: "Home",
              desc: "Dashboard showing the user's address, quick actions for reporting incidents, recycling and scheduling pick-ups, upcoming events and news.",
            },
            {
              num: "02",
              title: "Onboarding",
              desc: "Three-step introduction explaining the recycling mission, incident reporting and waste scheduling, setting expectations before registration.",
            },
            {
              num: "03",
              title: "Schedule and track",
              desc: "Location-based scheduling with address search, driver assignment, estimated duration and real-time pick-up confirmation.",
            },
            {
              num: "04",
              title: "Wallet",
              desc: "In-app wallet for service payments, fund management with bank transfers, and transaction history for full billing transparency.",
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
          Every screen traces back to the research: scheduling and tracking for the late pick-ups, incident reports for the
          blocked drains, and a wallet with a full history for the estimated bills.
        </p>
        <a href="https://uxfol.io/p/kaspersalau/03fbae68" target="_blank" rel="noopener noreferrer" className="cs-link">
          Read the full case study on UXfolio &#8599;
        </a>
      </CaseSection>

      <CaseNext label="GrubShelf: Meals Lite" href="/design/grubshelf" hire="Hire me for a product like this" />
    </article>
  );
}
