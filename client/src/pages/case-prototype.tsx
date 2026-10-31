import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { PopUp } from "@/components/living-paper";
import { Screens } from "@/components/product-chapters";
import { CaseHeader, CaseNext, CaseSection, ShortVersion } from "@/components/case-kit";
import { PROJECTS, figmaEmbed } from "@/lib/projects";
import { PROTOTYPE_CASES } from "@/lib/prototype-cases";

// The case study for a project whose design lives in a Figma prototype, in
// the site's one case-study layout. The writing lives in
// lib/prototype-cases.ts.

// "The challenge: a capable system that was hard to use" → the part after
// the colon, set as the section's lead.
function leadOf(heading: string) {
  const i = heading.indexOf(":");
  if (i < 0) return null;
  const t = heading.slice(i + 1).trim();
  return t.charAt(0).toUpperCase() + t.slice(1) + ".";
}

export default function CasePrototype({ slug }: { slug: string }) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[index];
  const c = PROTOTYPE_CASES[slug];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  useSEO(p.href);
  const [loaded, setLoaded] = useState(false);
  const challengeLead = leadOf(c.challenge.heading);

  return (
    <article>
      <CaseHeader
        back={{ href: "/products", label: "All app and design work" }}
        tags={p.tags ?? []}
        title={p.title}
        deck={c.deck}
        byline={[
          "Prototyped in Figma",
          <a key="try" href="#try-it">
            Try the prototype &darr;
          </a>,
        ]}
        hero={
          p.shots ? (
            <div className="cp-shots">
              {p.shots.map((shot, i) => (
                <PopUp key={shot.src} entrance delay={i * 0.15} className={i === 0 ? "cp-shot-lead" : "cp-shot-side"}>
                  <img src={shot.src} alt={shot.alt} />
                </PopUp>
              ))}
            </div>
          ) : (
            <div className="cp-stage-frame">
              <Screens shots={[{}, {}, {}]} />
            </div>
          )
        }
      />

      <ShortVersion {...c.short} />

      <CaseSection part="challenge">
        {challengeLead && <p className="cs-lead">{challengeLead}</p>}
        <p className="cs-p">{c.overview}</p>
        {c.challenge.paras.map((t) => (
          <p key={t} className="cs-p">
            {t}
          </p>
        ))}
      </CaseSection>

      <CaseSection part="approach">
        {c.approach.paras.map((t) => (
          <p key={t} className="cs-p">
            {t}
          </p>
        ))}
        <div className="cp-points">
          {c.approach.points.map((pt, i) => (
            <PopUp key={pt.title} delay={i * 0.1}>
              <div className="cp-point">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </div>
            </PopUp>
          ))}
        </div>
      </CaseSection>

      <CaseSection part="solution">
        {c.solution.paras.map((t) => (
          <p key={t} className="cs-p">
            {t}
          </p>
        ))}
        <div className="cp-figures">
          {c.solution.shots.map((s, i) => (
            <figure key={s.src} className="cp-figure">
              <PopUp delay={0.05}>
                <img src={s.src} alt={s.alt} loading="lazy" />
              </PopUp>
              <figcaption>
                <b>Fig. {i + 1}</b> {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </CaseSection>

      <CaseSection part="tryIt" id="try-it">
        <p className="cs-p">The working prototype, embedded from Figma. Click through it here, or open it full screen.</p>
        <div className="cp-embed" data-loaded={loaded ? "1" : undefined}>
          <iframe title={`${p.title} prototype`} src={figmaEmbed(p.figma!)} loading="lazy" allowFullScreen onLoad={() => setLoaded(true)} />
          {!loaded && <span className="cp-embed-wait">Loading the prototype&hellip;</span>}
        </div>
        <a href={p.figma} target="_blank" rel="noopener noreferrer" className="cs-link">
          Open the prototype in Figma &#8599;
        </a>
      </CaseSection>

      <CaseSection part="outcome">
        <p className="cs-lead">What the work taught me.</p>
        <ul className="cs-list">
          {c.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </CaseSection>

      <CaseNext label={next.title} href={next.href} hire="Hire me for a product like this" />
    </article>
  );
}
