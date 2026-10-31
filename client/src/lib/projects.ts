// The six product design projects, in the order they appear on App and
// design. `blurb` is the two-line card description; keep them all about
// the same length. Prototype projects carry their Figma link for the case
// study's embedded prototype.

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  href: string;
  // Prototype-only projects: a Figma prototype instead of screenshots.
  figma?: string;
  // Tags shown on the case study, and the one-line summary it opens with.
  tags?: string[];
  summary?: string;
  // Frames captured from the prototype, the lead one first.
  shots?: { src: string; alt: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "mai-shara",
    title: "Mai Shara",
    blurb: "Schedule, track and pay for waste pick-ups, and report problems on the street.",
    href: "/design/mai-shara",
  },
  {
    slug: "grubshelf",
    title: "GrubShelf",
    blurb: "A meal planner that builds your shopping list, split by shop, and prices the week.",
    href: "/design/grubshelf",
  },
  {
    slug: "grubshelf-website",
    title: "GrubShelf website",
    blurb: "A one-page site with one job: turning curious visitors into waiting-list sign-ups.",
    href: "/design/grubshelf-website",
  },
  {
    slug: "leadway-health",
    title: "Leadway Health",
    blurb: "A website for a Health Maintenance Organisation: its plans, services and providers.",
    href: "/design/leadway-health",
    figma:
      "https://www.figma.com/proto/OS9nngSk333zyXI6eV6CT7/Leadway-Health-Website-(June-2021)?node-id=13%3A7&scaling=scale-down&page-id=0%3A1&starting-point-node-id=13%3A7&show-proto-sidebar=1",
    tags: ["Web design", "Healthcare", "2021"],
    summary:
      "A website for a Health Maintenance Organisation (HMO), presenting the information and services of a healthcare organisation, its plans and benefits, in a clear, accessible interface.",
    shots: [
      { src: "/images/leadway-health/home.jpg", alt: "Leadway Health home page: The Smarter Choice is Here" },
      { src: "/images/leadway-health/resources.jpg", alt: "The Resources page" },
      { src: "/images/leadway-health/case-studies.jpg", alt: "Resources, featured case studies" },
    ],
  },
  {
    slug: "householder",
    title: "Householder",
    blurb: "Home insurance you build yourself, by choosing the things in your home to cover.",
    href: "/design/householder",
    figma:
      "https://www.figma.com/proto/CdsZGF09AIwdSKshvj6ZO8/Householder-simplification?page-id=0%3A1&node-id=24%3A935&viewport=-948%2C435%2C0.09&scaling=min-zoom&starting-point-node-id=24%3A935",
    tags: ["UX design", "Insurance"],
    summary:
      "A home insurance product that makes buying cover personal: customers choose the items in their home they want to insure, rather than paying for generic cover without thinking about what they own.",
    shots: [
      { src: "/images/householder/choose-items.jpg", alt: "Choosing the items in the living room to insure" },
      { src: "/images/householder/choose-rooms.jpg", alt: "Choosing which rooms to cover" },
      { src: "/images/householder/location.jpg", alt: "Where are you located?" },
    ],
  },
  {
    slug: "pharmacy-benefit",
    title: "Pharmacy Benefit",
    blurb: "The back office of an HMO: members, pharmacies, schedules and day-to-day admin.",
    href: "/design/pharmacy-benefit",
    figma: "https://www.figma.com/proto/hUdo1kupV2i7SOJMU9qHAG/PHARMACY-BENEFIT?node-id=4%3A8&starting-point-node-id=4%3A8",
    tags: ["Product design", "Healthcare admin"],
    summary:
      "An application for the back-end management and administration of an HMO: managing patients and members, the pharmacies in its network, and the administrative workflows behind its healthcare services.",
    shots: [
      { src: "/images/pharmacy-benefit/dashboard.jpg", alt: "The admin dashboard: members, pharmacies, schedules and new entries" },
      { src: "/images/pharmacy-benefit/pharmacies.jpg", alt: "The list of pharmacies" },
      { src: "/images/pharmacy-benefit/pharmacy-detail.jpg", alt: "A pharmacy's record and its enrolees" },
    ],
  },
];

// A Figma prototype as an embeddable player.
// Scaled down so the whole frame fits the player rather than being cropped.
export const figmaEmbed = (url: string) => {
  const u = new URL(url);
  u.searchParams.set("scaling", "scale-down");
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(u.toString())}`;
};
