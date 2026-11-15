import { useSEO } from "@/hooks/use-seo";
import YourCalls from "@/components/your-call";
import { CALLS } from "@/lib/calls";
import { GRUBSHELF_SCREENS } from "@/lib/product-screens";
import { CountUp } from "@/components/motion";
import GrubShelfWeek from "@/components/grubshelf-week";
import { Flap, PopUp } from "@/components/living-paper";
import { CodeCard, FrictionNote, ProblemEvidence, PrototypeSheet, SpecSheet } from "@/components/grubshelf-artifacts";
import { CaseHeader, CaseNext, CaseSection, PhoneHero, ScreenStrip, ShortVersion } from "@/components/case-kit";

// GrubShelf: Meals Lite, in the site's one case-study layout.

const facts = [
  { num: "53", label: "Screens mocked up before build" },
  { num: "51", label: "Common meals with steps in our own words" },
  { num: "460", label: "Unit tests" },
  { num: "1", label: "App Store rejection, fixed and turned into a checklist" },
];

const decisions = [
  {
    call: "The list follows the plan",
    why: "Only meals placed on a day add items. A “regular” meal doesn’t, so the list shows only what’s cooked this week.",
  },
  {
    call: "Main items only, no quantities",
    why: "A meal lists its 2–5 main items. Seasonings are skipped; staples like palm oil and crayfish are tracked as “running low”.",
  },
  {
    call: "Pots, not portions",
    why: "Diaspora households batch-cook stew or egusi and eat it over days. A pot is “still got some” or “finished”: nobody counts portions, so the app doesn’t ask.",
  },
  {
    call: "Never plan for the user",
    why: "Onboarding picks go to Meals, not the week; leftovers are added only when the user says. A wrong guess costs more trust than an empty state.",
  },
  {
    call: "Two shops, first-class",
    why: "Every item belongs to a shop (supermarket or afro shop), and shopping mode goes one shop at a time, as the launch audience shops.",
  },
  {
    call: "Import runs on the phone",
    why: "Shared TikTok or Instagram recipes are matched on-device against ~150 dishes: no AI cost per use. AI for unknown dishes is parked as a possible Premium extra.",
  },
];

const metrics = [
  { metric: "Week-4 retention (first community cohort)", target: "The number that matters" },
  { metric: "Install → a priced week", target: "Under 3 minutes" },
  { metric: "Weeks with a list built from meals", target: "3 of the first 4" },
  { metric: "Shop totals logged per household", target: "2 or more a month" },
  { metric: "Pot check-ins answered", target: "Low = too many prompts" },
];

const STRIP = ["Pick this week", "List", "Shopping mode", "Your shelf"].map((t) => GRUBSHELF_SCREENS.find((x) => x.title === t)!);

export default function CaseGrubShelf() {
  useSEO("/design/grubshelf");

  return (
    <article>
      <CaseHeader
        back={{ href: "/products", label: "All app and design work" }}
        page="2"
        tags={["iOS", "Product design", "AI-first workflow"]}
        title="GrubShelf: Meals Lite"
        deck="Pick your meals. Get your list. Know what it costs. A meal planner for how African and diaspora households in the UK cook and shop."
        byline={["Founder & product designer", "2026", <span key="s" className="cs-accent">Status: built, in founder testing</span>]}
        heroStyle={{ background: "#04342C", viewTransitionName: "media-grubshelf" }}
        hero={
          <PhoneHero
            label="GrubShelf screens: the shopping list split by shop, a jollof rice meal priced per plate, and the kitchen"
            srcs={["list", "meal", "kitchen"].map((n) => `/images/grubshelf-meals-lite/${n}.jpg`)}
          />
        }
      />

      <ShortVersion
        problem="Meal planners assume one supermarket and fresh dinners nightly. Diaspora households cook in pots and use two kinds of shop."
        role="Founder and product designer: spec, design, and the build with Claude Code."
        did="A planner whose shopping list builds itself from the week's meals, split by shop and priced."
        result="Built, through QA, and in founder testing with its first community. Not launched yet."
      />

      <CaseSection part="challenge">
        <p className="cs-lead">Meal planners aren&rsquo;t built for how many diaspora households eat.</p>
        <p className="cs-p">
          They assume one supermarket, exact recipes and a fresh dinner nightly. Many Nigerian and diaspora households in the
          UK cook a pot of stew or egusi and eat it over days with different sides, mix Nigerian and British food, and shop at
          a supermarket and an afro shop.
        </p>
        <p className="cs-p">
          An earlier version was just a shopping list. Using it showed why that fell short: meals are why a list exists, and
          without them you can&rsquo;t cost your dinners.
        </p>
        <p className="cs-p">
          <strong style={{ color: "var(--ink)" }}>The rule I set:</strong> meals exist only to feed the list and give it a
          price. If a feature doesn&rsquo;t do one of those, it&rsquo;s out.
        </p>
        <ProblemEvidence />
        <YourCalls calls={CALLS["grubshelf"]} />
      </CaseSection>

      <CaseSection part="approach">
        <p className="cs-lead">LLM first, then prototype, then build.</p>
        <div className="lp-steps">
          {[
            {
              step: "Spec with an LLM",
              text: "Before any screen, I used Claude to write and stress-test the PRD: principles, journey, edge cases (non-pot leftovers, afro-shop prices with no receipt, a Saturday week end) and what we wouldn’t build.",
            },
            {
              step: "Prototype in code",
              text: "A 53-screen interactive mockup, not static frames. Every screen is mocked up before it’s built and updated to match what shipped, so the mockup stays the source of truth.",
            },
            {
              step: "Build with Claude Code",
              text: "Claude Code wrote most of the SwiftUI and Supabase code. I owned product decisions, design and every review, testing each build on a real iPhone against a separate staging backend.",
            },
            {
              step: "Cut friction as I go",
              text: "Each test pass ended in a friction list. Glass styles became solid cards because glass was harder to read. Every option comes with a recommended default.",
            },
          ].map((s, i) => (
            <div key={s.step}>
              <div className="lp-step-art">
                <PopUp delay={i * 0.12} tilt={[-2, 1.5, -1, 2][i]}>
                  {[<SpecSheet />, <PrototypeSheet />, <CodeCard />, <FrictionNote />][i]}
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
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-learning-text)",
                  fontWeight: 800,
                  fontSize: 15,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {s.step}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--body)", margin: 0 }}>{s.text}</p>
            </div>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection part="solution">
        <p className="cs-lead">Pick meals, and the list builds itself.</p>
        <p className="cs-p">
          The list splits by shop. Shop one at a time, log the total, cook a pot and use it up. Planning a week takes about a
          minute.
        </p>
        <ScreenStrip screens={STRIP} />
        <h3 className="cs-h3">Six decisions, and why</h3>
        <p className="cs-p">Lift a flap to read why.</p>
        <div className="lp-flaps">
          {decisions.map((d, i) => (
            <Flap
              key={d.call}
              label={d.call}
              front={
                <>
                  <span className="lp-flap-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lp-flap-call">{d.call}</span>
                  <span className="lp-flap-hint">Lift to read why &uarr;</span>
                </>
              }
              back={d.why}
            />
          ))}
        </div>
      </CaseSection>

      <CaseSection part="tryIt">
        <p className="cs-lead">Plan a week.</p>
        <p className="cs-p">The app&rsquo;s core loop, on the page: put dinners on days and watch the list build itself.</p>
        <div className="ks-try">
          <GrubShelfWeek />
        </div>
        <a href="https://grubshelf.app" target="_blank" rel="noopener noreferrer" className="cs-link" data-track="grubshelf_site">
          grubshelf.app &#8599;
        </a>
      </CaseSection>

      <CaseSection part="outcome">
        <p className="cs-lead">Built and in founder testing. It hasn&rsquo;t launched, so these are the build&rsquo;s numbers, not results.</p>
        <div className="cs-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <b>
                <CountUp value={f.num} />
              </b>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
        <h3 className="cs-h3">Through App Review</h3>
        <p className="cs-p">
          Apple rejected the first version under guideline 4.0: after Sign in with Apple, it asked for a name Apple had already
          supplied. I removed the prompt and wrote an App Review checklist for every submission.
        </p>
        <p className="cs-p">
          Engineering calls along the way: debug, staging and production environments; remote-config feature flags; Premium
          limits on the free plan; live StoreKit prices; a 460-test suite and a UI tour that screenshots every screen.
        </p>
        <h3 className="cs-h3">How I&rsquo;ll know it works</h3>
        <p className="cs-p">
          The first cohort is a UK diaspora community I belong to. The test: do 5&ndash;10 households recognise their own
          week in it?
        </p>
        <div className="lp-cards">
          {metrics.map((m, i) => (
            <PopUp key={m.metric} delay={i * 0.08}>
              <div className="lp-target">
                <span>{m.metric}</span>
                <b>{m.target}</b>
              </div>
            </PopUp>
          ))}
        </div>
        <h3 className="cs-h3">What I learned</h3>
        <ul className="cs-list">
          <li>
            <strong style={{ color: "var(--ink)" }}>Writing it down first is fastest.</strong> Most changes of direction
            happened in the spec, costing minutes, not code.
          </li>
          <li>
            <strong style={{ color: "var(--ink)" }}>Cutting is the design work.</strong> What we left out (recipes,
            calendars, calorie tracking, AI week plans) shaped it more than any screen.
          </li>
          <li>
            <strong style={{ color: "var(--ink)" }}>AI raises the bar for judgement.</strong> With code cheap, the hard
            part is deciding what&rsquo;s worth building.
          </li>
        </ul>
      </CaseSection>

      <CaseNext label="GrubShelf website" href="/design/grubshelf-website" hire="Hire me for a product like this" />
    </article>
  );
}
