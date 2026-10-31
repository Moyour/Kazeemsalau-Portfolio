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

const STRIP = ["Pick this week", "List", "Shopping mode", "Your shelf"].map((t) => GRUBSHELF_SCREENS.find((x) => x.title === t)!);

export default function CaseGrubShelf() {
  useSEO("/design/grubshelf");

  return (
    <article>
      <CaseHeader
        back={{ href: "/products", label: "All app and design work" }}
        tags={["iOS", "Product design", "AI-first workflow"]}
        title="GrubShelf: Meals Lite"
        deck="Pick your meals. Get your list. Know what it costs. A meal planner built for how African and diaspora households in the UK actually cook and shop."
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
        problem="Meal planners assume one supermarket and a fresh dinner every night. Diaspora households cook in pots and shop at two kinds of shop."
        role="Founder and product designer: the spec, the design, and the build with Claude Code."
        did="A meal planner where the shopping list builds itself from the week's meals, split by shop and priced."
        result="Built, through QA, and in founder testing with its first community. Not launched yet."
      />

      <CaseSection part="challenge">
        <p className="cs-lead">Meal planners aren&rsquo;t built for how many diaspora households eat.</p>
        <p className="cs-p">
          They assume one supermarket, recipes with exact amounts and a fresh dinner every night. Many Nigerian and diaspora
          households in the UK cook a big pot of stew or egusi and eat it over several days with different sides. They mix
          Nigerian and British food, and shop at two kinds of shop: a supermarket and an afro shop.
        </p>
        <p className="cs-p">
          The previous version of the product had been cut down to just a shopping list. Using it showed why that wasn&rsquo;t
          enough: meals are the reason a list exists, and you can&rsquo;t say what your dinners cost without them.
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
            <div key={s.step}>
              <div className="lp-step-art">
                <PopUp delay={i * 0.12} tilt={[-2, 1.5, -1, 2][i]}>
                  {[<SpecSheet />, <PrototypeSheet />, <CodeCard />, <FrictionNote />][i]}
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
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--body)", margin: 0 }}>{s.text}</p>
            </div>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection part="solution">
        <p className="cs-lead">Pick meals, and the list builds itself.</p>
        <p className="cs-p">
          The list splits by shop. You shop one shop at a time, log what it came to, cook a pot and use it up during the week.
          Each week should take about a minute of picking.
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
          provided. I removed the prompt, then wrote an App Review checklist every submission now goes through.
        </p>
        <p className="cs-p">
          Engineering-aware calls along the way: debug, staging and production environments; features behind remote-config
          flags; Premium limits on the free plan; prices read live from StoreKit; and a 460-test suite plus a UI tour that
          screenshots every screen.
        </p>
        <h3 className="cs-h3">How I&rsquo;ll know it works</h3>
        <p className="cs-p">
          The first cohort is a UK diaspora community I belong to, and the first test is simple: do 5&ndash;10 households
          recognise their own week in it?
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
            <strong style={{ color: "var(--ink)" }}>Writing it down first is the fastest route.</strong> Most changes of
            direction happened in the spec, where they cost minutes, not in code.
          </li>
          <li>
            <strong style={{ color: "var(--ink)" }}>Cutting is the design work.</strong> What we decided not to build
            (recipes, calendars, calorie tracking, AI week plans) shaped the product more than any one screen.
          </li>
          <li>
            <strong style={{ color: "var(--ink)" }}>AI raises the bar for judgement.</strong> With code cheap to produce, the
            hard part is deciding what&rsquo;s worth building.
          </li>
        </ul>
      </CaseSection>

      <CaseNext label="GrubShelf website" href="/design/grubshelf-website" hire="Hire me for a product like this" />
    </article>
  );
}
