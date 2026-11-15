// The site is three papers: the Learning Edition (courses), the Product
// Edition (apps and design), and the Video Edition (the reel). Each route
// belongs to one of them; About and Contact are shared, and take the
// edition the reader came from.

export type Paper = "learning" | "product" | "video";

export const PAPERS: Record<
  Paper,
  {
    name: string;
    front: string;
    // Sections in the order they appear in the top bar, front page first.
    sections: { label: string; href: string; match?: string[] }[];
    // The line above the masthead.
    disciplines: string;
  }
> = {
  learning: {
    name: "Learning Edition",
    front: "/learning",
    sections: [
      { label: "Front page", href: "/learning" },
      { label: "Learning case studies", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Hire", href: "/contact" },
    ],
    disciplines: "Learning experience design",
  },
  product: {
    name: "Product Edition",
    front: "/product",
    sections: [
      { label: "Front page", href: "/product" },
      { label: "App and design", href: "/products", match: ["/products", "/design"] },
      { label: "About", href: "/about" },
      { label: "Hire", href: "/contact" },
    ],
    disciplines: "Product design",
  },
  video: {
    name: "Video Edition",
    front: "/video",
    sections: [
      { label: "Front page", href: "/video" },
      { label: "The reel", href: "/video/reel" },
      { label: "About", href: "/about" },
      { label: "Hire", href: "/contact" },
    ],
    disciplines: "Video editing",
  },
};

const KEY = "ks-paper";

// The paper a route belongs to, or null for shared pages and the table.
export function ownPaper(path: string): Paper | null {
  if (path === "/learning" || path.startsWith("/work")) return "learning";
  if (path === "/product" || path.startsWith("/products") || path.startsWith("/design")) return "product";
  if (path === "/video" || path.startsWith("/video/")) return "video";
  return null;
}

// The paper being read on this route: its own, or for a shared page the
// last one the reader had open (Learning if they came straight here).
export function paperFor(path: string): Paper {
  const own = ownPaper(path);
  if (own) {
    try {
      sessionStorage.setItem(KEY, own);
    } catch {
      /* storage unavailable: shared pages fall back to Learning */
    }
    return own;
  }
  try {
    const saved = sessionStorage.getItem(KEY);
    return saved === "product" || saved === "video" ? saved : "learning";
  } catch {
    return "learning";
  }
}

// Where a route sits in its paper's sections, for turning forward or back.
export function sectionIndex(path: string, paper: Paper) {
  const sections = PAPERS[paper].sections;
  const i = sections.findIndex((s, n) =>
    n === 0 ? path === s.href : (s.match ?? [s.href]).some((m) => path.startsWith(m)),
  );
  return i < 0 ? 0 : i;
}
