import pages from "./seo-pages.json";

// Every page's title, description and social card. The same file feeds the
// build (scripts/seo-pages.mjs), which writes each page's own HTML head so
// crawlers and link previews see the right page without running the app.

export const BASE_URL = pages.base;

export interface SEOData {
  name: string;
  parent: string | null;
  type: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
}

export const seoData: Record<string, SEOData> = Object.fromEntries(
  Object.entries(pages.pages).map(([route, p]) => [
    route,
    { ...p, url: route === "/" ? `${BASE_URL}/` : `${BASE_URL}${route}`, image: `${BASE_URL}${p.image}` },
  ]),
);
