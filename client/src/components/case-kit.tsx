import type { CSSProperties, ReactNode } from "react";
import { Link } from "wouter";
import { Words } from "@/components/motion";
import { Folio, PopUp } from "@/components/living-paper";

// Every case study on the site is set the same way, so a reader learns the
// layout once: the header and hero, the short version, five numbered
// sections (the challenge, the approach, the solution, try it, the
// outcome), then the next story. Headings take the paper's own type: block
// capitals in the Learning Edition, serif in the Product Edition.

export const PARTS = {
  challenge: { num: "01", title: "The challenge" },
  approach: { num: "02", title: "The approach" },
  solution: { num: "03", title: "The solution" },
  tryIt: { num: "04", title: "Try it" },
  outcome: { num: "05", title: "The outcome" },
} as const;

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function CaseHeader({
  back,
  tags,
  title,
  deck,
  byline,
  hero,
  heroStyle,
}: {
  back: { href: string; label: string };
  tags: string[];
  title: string;
  deck: string;
  byline: ReactNode[];
  hero: ReactNode;
  heroStyle?: CSSProperties;
}) {
  return (
    <header className="cs-head">
      <Link href={back.href} onClick={toTop} className="cs-back">
        &larr; {back.label}
      </Link>
      <div className="cs-kicker">
        <span className="cs-accent">Case study</span>
        {tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <h1 className="cs-h1">
        <Words text={title} />
      </h1>
      <p className="cs-deck">{deck}</p>
      <div className="cs-byline">
        <span className="cs-ink">By Kazeem Salau</span>
        {byline.map((b, i) => (
          <span key={i}>{b}</span>
        ))}
      </div>
      <div className="cs-hero ks-mag-bleed" style={heroStyle}>
        {hero}
      </div>
    </header>
  );
}

// Three phone screens standing in the hero, the middle one tallest.
export function PhoneHero({ srcs, label }: { srcs: string[]; label: string }) {
  return (
    <div className="cs-phones" role="img" aria-label={label}>
      {srcs.map((src, i) => (
        <PopUp key={src} entrance delay={[0.15, 0, 0.3][i]} className={i === 1 ? "cs-phone cs-phone-mid" : "cs-phone"}>
          <img src={src} alt="" />
        </PopUp>
      ))}
    </div>
  );
}

// A picture in the hero with its figure line.
export function HeroFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="cs-hero-fig">
      <img src={src} alt={alt} />
      <figcaption className="cs-figcap">
        <b>Fig. 1</b> {caption}
      </figcaption>
    </figure>
  );
}

// The whole case study in four lines, for anyone skimming.
export function ShortVersion({ problem, role, did, result }: { problem: string; role: string; did: string; result: string }) {
  return (
    <aside className="cs-short" aria-label="The short version">
      <p className="cs-short-title">The short version</p>
      <dl>
        {[
          ["The problem", problem],
          ["My role", role],
          ["What I did", did],
          ["The result", result],
        ].map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function CaseSection({ part, id, children }: { part: keyof typeof PARTS; id?: string; children: ReactNode }) {
  const { num, title } = PARTS[part];
  return (
    <section id={id} className="ks-mag-sec cs-sec">
      <div className="cs-sec-head">
        <Folio num={num} />
        <h2 className="cs-h2">{title}</h2>
      </div>
      <div className="cs-sec-body">{children}</div>
    </section>
  );
}

// Phone screens side by side, each with its name and a line about it.
export function ScreenStrip({ screens }: { screens: { src: string; title: string; caption: string }[] }) {
  return (
    <div className="cs-screens">
      {screens.map((s, i) => (
        <figure key={s.src}>
          <PopUp delay={i * 0.08}>
            <img src={s.src} alt={`${s.title} screen`} loading="lazy" />
          </PopUp>
          <figcaption>
            <b>{s.title}</b> {s.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function CaseNext({ label, href, hire }: { label: string; href: string; hire: string }) {
  return (
    <section className="cs-next">
      <div>
        <p className="cs-next-kicker">Next case study</p>
        <Link href={href} onClick={toTop} className="cs-next-link">
          {label} &rarr;
        </Link>
      </div>
      <div className="cs-next-actions">
        <a href="/files/KazeemSalau-InstructionalDesign.pdf" target="_blank" rel="noopener noreferrer" className="cs-btn" data-track="case_footer_cv">
          Download CV
        </a>
        <Link href="/contact" onClick={toTop} className="cs-btn cs-btn-solid" data-track="case_footer_hire">
          {hire}
        </Link>
      </div>
    </section>
  );
}
