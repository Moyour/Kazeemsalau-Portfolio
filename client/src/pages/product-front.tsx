import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { CountUp, Words } from "@/components/motion";
import { LivingPhones, toReels } from "@/components/news-motion";
import CvCoupon from "@/components/cv-coupon";
import { GRUBSHELF_SCREENS, MAI_SHARA_SCREENS } from "@/lib/product-screens";
import { EDITIONS, SkillsMarquee } from "@/pages/home";

// The Product Edition's front page. Where the Learning paper is a
// broadsheet in columns, this one is laid out like a magazine: a cover
// that runs edge to edge, uneven columns with a wide margin for the pull
// quote, the portrait and the index, the story set wide in one column,
// and the other stories in an uneven grid.

const e = EDITIONS.product;
const reels = toReels(GRUBSHELF_SCREENS.map((x) => x.src));
const maiSharaReels = toReels(MAI_SHARA_SCREENS.map((x) => x.src));
// The feature shows the shipped app (Meals Lite), so it doesn't repeat the cover.
const featureReels = [["list", "shopping"], ["meal", "pot"], ["kitchen", "meals"]].map((r) =>
  r.map((n) => `/images/grubshelf-meals-lite/${n}.jpg`),
);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function ProductFront() {
  useSEO("/product");

  // Blocks fade up as they scroll in, as on the other pages.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".ks-mag [data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && en.target.setAttribute("data-reveal", "in")),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const [lead, second] = e.more;

  return (
    <div className="ks-mag">
      {/* The cover: edge to edge, the app running across it. */}
      <section className="ks-mag-cover">
        <div className="ks-mag-cover-art" aria-hidden="true">
          <LivingPhones reels={reels} bg="transparent" still />
        </div>
        <div className="ks-mag-cover-text">
          <div className="ks-mag-kicker">Cover story &middot; Product edition</div>
          <h1>
            Product{" "}
            <br />
            designer.
          </h1>
          <p>{e.standfirst}</p>
        </div>
      </section>

      <div className="ks-mag-actions">
        <Link href="/contact" onClick={scrollToTop} data-track="hero_hire" className="ks-mag-btn" data-primary="1">
          Hire me for a project &rarr;
        </Link>
        <span className="ks-mag-available">
          <i /> Available now for full-time roles &amp; freelance &middot; London / remote
        </span>
      </div>

      {/* Uneven columns: a wide margin, then the story set wide. */}
      <section className="ks-mag-spread">
        <aside className="ks-mag-margin">
          <figure className="ks-mag-portrait">
            <div className="ks-mag-photo">
              <img src="/images/portrait.png" alt="Kazeem Salau" />
            </div>
            <figcaption>The designer, photographed in London</figcaption>
          </figure>

          <blockquote className="ks-mag-pull">
            <p>&ldquo;{e.pull.quote}&rdquo;</p>
            <cite>{e.pull.by}</cite>
          </blockquote>

          <nav className="ks-mag-index" aria-label="In this issue">
            <div className="ks-mag-kicker">In this issue</div>
            {e.issue.map((item) => (
              <Link key={item.href} href={item.href} data-section="" onClick={scrollToTop}>
                <span>{item.label}</span>
                <b>{item.page.replace("P. ", "")}</b>
              </Link>
            ))}
          </nav>

          <CvCoupon />
        </aside>

        <article className="ks-mag-story">
          <div className="ks-mag-byline">
            By Kazeem Salau &middot; <span>{e.role}</span>
          </div>
          {e.story.map((para, i) => (
            <p key={i} className={i === 0 ? "ks-mag-lede" : undefined}>
              {para}
            </p>
          ))}

          <div className="ks-mag-stats">
            {e.stats.map((s) => (
              <div key={s.label}>
                <b>
                  <CountUp value={s.value} />
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* The feature: GrubShelf, set across the story column. */}
          <Link href={e.featured.href} onClick={scrollToTop} className="ks-mag-feature" data-reveal="off">
            <span className="ks-mag-feature-art">
              <LivingPhones reels={featureReels} bg="var(--paper-deep)" />
            </span>
            <span className="ks-mag-kicker">Feature &middot; page {e.featured.page}</span>
            <span className="ks-mag-feature-title">{e.featured.title}</span>
            <span className="ks-mag-feature-line">{e.featured.description}</span>
            <span className="ks-mag-more-link">Read the feature &rarr;</span>
          </Link>
        </article>
      </section>

      <SkillsMarquee skills={e.skills} />

      {/* More in this issue: an uneven grid, one story leading. */}
      <section className="ks-mag-more">
        <div className="ks-mag-section-head" data-reveal="off">
          <h2>
            <Words text="More in this issue" />
          </h2>
          <Link href="/products" onClick={scrollToTop} className="ks-mag-more-link">
            All app and design work &rarr;
          </Link>
        </div>
        <div className="ks-mag-more-grid">
          {[lead, second].map((m, i) => (
            <Link key={m.href} href={m.href} onClick={scrollToTop} className="ks-mag-tile" data-big={i === 0 ? "1" : undefined}>
              <span className="ks-mag-tile-art">
                {m.phones ? (
                  <span className="ch-stage-phones" style={{ background: "#FF8A4C" }}>
                    <LivingPhones reels={maiSharaReels} bg="#FF8A4C" still />
                  </span>
                ) : (
                  <img src={m.image} alt="" loading="lazy" />
                )}
              </span>
              <span className="ks-mag-kicker">Page {m.page}</span>
              <span className="ks-mag-tile-title">{m.title}</span>
              <span className="ks-mag-tile-line">{m.line}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How I build an app: three steps, big numerals, no boxes. */}
      <section className="ks-mag-how" data-reveal="off">
        <div className="ks-mag-kicker">{e.howLabel}</div>
        <div className="ks-mag-steps">
          {e.steps.map((step) => (
            <div key={step.num}>
              <b>{step.num}</b>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ks-mag-cta" data-reveal="off">
        <div className="ks-mag-kicker">Classified &middot; Available for work</div>
        <h2>
          <Words text={e.cta} />
        </h2>
        <p>
          Send me a couple of lines about who it is for and what is going wrong. I will come back with what I would build
          and how long it would take.
        </p>
        <Link href="/contact" onClick={scrollToTop} className="ks-mag-btn" data-light="1">
          Let&rsquo;s have a chat &rarr;
        </Link>
      </section>
    </div>
  );
}
