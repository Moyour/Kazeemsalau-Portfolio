import type { ReactNode } from "react";
import { Link } from "wouter";
import { LivingPhones, LiveSite, toReels } from "@/components/news-motion";
import { GRUBSHELF_SCREENS, MAI_SHARA_SCREENS } from "@/lib/product-screens";
import { PROJECTS } from "@/lib/projects";

// The six product design projects as thumbnails. Every card opens the
// project's own case study. Prototype projects show frames captured from
// their Figma prototypes.

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Up to three screens on one stage: a large one with two smaller ones laid
// over its corner. A slot without a src is a placeholder.
type Shot = { src?: string; alt?: string };
export function Screens({ shots }: { shots: Shot[] }) {
  return (
    <div className="ch-shots">
      {shots.slice(0, 3).map((shot, i) => (
        <figure key={i} className="ch-shot" data-slot={i}>
          {shot.src ? (
            <img src={shot.src} alt={shot.alt ?? ""} loading="lazy" />
          ) : (
            <figcaption>
              <b>{String(i + 1).padStart(2, "0")}</b>
              Screen coming
              <span>from Figma</span>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

const THUMBS: Record<string, ReactNode> = {
  "mai-shara": (
    <span className="ch-stage-phones" style={{ background: "#FF8A4C" }}>
      <LivingPhones reels={toReels(MAI_SHARA_SCREENS.map((x) => x.src))} bg="#FF8A4C" />
    </span>
  ),
  grubshelf: (
    <span className="ch-stage-phones" style={{ background: "#0A4D3E" }}>
      <LivingPhones reels={toReels(GRUBSHELF_SCREENS.map((x) => x.src))} bg="#0A4D3E" />
    </span>
  ),
  "grubshelf-website": (
    <span className="ch-stage-site">
      <LiveSite src="/images/grubshelf-web/full.jpg" />
    </span>
  ),
};

export default function ProductThumbnails() {
  return (
    <div className="pt-grid">
      {PROJECTS.map((p) => (
        <Link key={p.slug} href={p.href} onClick={scrollToTop} className="pt-card">
          <span className="pt-thumb">{THUMBS[p.slug] ?? <Screens shots={p.shots ?? [{}, {}, {}]} />}</span>
          <span className="pt-title">{p.title}</span>
          <span className="pt-line">{p.blurb}</span>
          <span className="pt-cta">Read the case study &rarr;</span>
        </Link>
      ))}
    </div>
  );
}
