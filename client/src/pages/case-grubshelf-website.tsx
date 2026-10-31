import type { CSSProperties } from "react";
import { useSEO } from "@/hooks/use-seo";
import YourCalls from "@/components/your-call";
import { CALLS } from "@/lib/calls";
import { ScrollingSite } from "@/components/news-motion";
import { PopUp } from "@/components/living-paper";
import { CaseHeader, CaseNext, CaseSection, HeroFigure, ShortVersion } from "@/components/case-kit";

// The GrubShelf website, in the site's one case-study layout.

const body: CSSProperties = { fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", color: "var(--body)" };

function Figure({ num, caption }: { num: string; caption: string }) {
  return (
    <div className="cs-figcap">
      <b>Fig. {num}</b> {caption}
    </div>
  );
}

export default function CaseGrubShelfWebsite() {
  useSEO("/design/grubshelf-website");

  return (
    <article>
      <CaseHeader
        back={{ href: "/products", label: "All app and design work" }}
        tags={["Marketing website", "Design & build"]}
        title="GrubShelf website"
        deck="Plan smarter. Waste less. One page with one job: get people on the waiting list."
        byline={[
          "Design, copy and build",
          <a key="site" href="https://grubshelf.app" target="_blank" rel="noopener noreferrer">
            grubshelf.app &#8599;
          </a>,
        ]}
        heroStyle={{ viewTransitionName: "media-grubshelf-website" }}
        hero={<HeroFigure src="/images/grubshelf-web/hero.jpg" alt="The grubshelf.app landing page: Plan smarter. Waste less." caption="The top of grubshelf.app" />}
      />

      <ShortVersion
        problem="GrubShelf needed somewhere to send people before the app was ready."
        role="Design, copy and build, as part of the GrubShelf brand and design system."
        did="One page that opens on a problem people already feel, and ends every section on the waiting list."
        result="Live at grubshelf.app, collecting waiting-list sign-ups."
      />

      <CaseSection part="challenge">
        <p className="cs-lead">Explain the idea before the visitor leaves.</p>
        <p className="cs-p">
          GrubShelf needed somewhere to send people before the app was ready. The site had one job: explain the idea quickly
          enough that a visitor joins the waiting list before they leave.
        </p>
        <YourCalls calls={CALLS["grubshelf-website"]} />
      </CaseSection>

      <CaseSection part="approach">
        <p className="cs-lead">Lead with the problem, not the feature list.</p>
        <p className="cs-p">
          It opens on the problem people already feel. &ldquo;You bought basil. Again.&rdquo; Each section names a familiar
          kitchen moment, then shows how the app quietly fixes it, and every section ends on the same single action: join the
          waiting list.
        </p>
        <p className="cs-p">
          It is light on purpose: a short cookie notice with an &ldquo;only essentials&rdquo; option, a light and dark theme,
          and a layout that works the same on a phone as on a laptop.
        </p>
      </CaseSection>

      <CaseSection part="solution">
        <p className="cs-lead">Show, don&rsquo;t tell.</p>
        <div
          className="ks-two"
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(240px, 0.8fr)", gap: "clamp(24px, 3vw, 44px)", alignItems: "start" }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{ ...body, marginBottom: 20 }}>
              The receipt demo does the selling. Instead of describing receipt scanning, it shows a till receipt turning
              into a dated, counted pantry, so the idea lands in a couple of seconds.
            </p>
            <div>
              <PopUp>
              <div style={{ border: "1px solid var(--ink)", background: "#FFFFFF" }}>
                <img
                  src="/images/grubshelf-web/receipt.jpg"
                  alt="Receipt demo: a till receipt turning into pantry items with expiry dates"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              </PopUp>
              <Figure num="2" caption="Your receipt does the typing" />
            </div>
          </div>
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <PopUp delay={0.15} tilt={-1.5}>
            <div
              style={{
                width: "min(240px, 70vw)",
                aspectRatio: "390 / 844",
                background: "var(--ink)",
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
            </PopUp>
            <div style={{ alignSelf: "stretch", marginTop: 14 }}>
              <Figure num="3" caption="The same page on a phone" />
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseSection part="tryIt">
        <p className="cs-lead">Scroll the whole page.</p>
        <div className="cs-tour">
          <ScrollingSite src="/images/grubshelf-web/full.jpg" url="grubshelf.app" height={160} />
        </div>
        <a href="https://grubshelf.app" target="_blank" rel="noopener noreferrer" className="cs-link">
          Visit grubshelf.app &#8599;
        </a>
      </CaseSection>

      <CaseSection part="outcome">
        <p className="cs-lead">Live at grubshelf.app, collecting waiting-list sign-ups ahead of the app.</p>
        <p className="cs-p">
          It shares the app&rsquo;s brand and design system, so the first thing people see of GrubShelf already looks and
          sounds like the product they will use.
        </p>
      </CaseSection>

      <CaseNext label="Leadway Health" href="/design/leadway-health" hire="Hire me for a site like this" />
    </article>
  );
}
