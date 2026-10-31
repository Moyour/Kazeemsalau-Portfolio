// After `vite build`: give every page its own HTML, so crawlers and link
// previews see the right title, description, canonical and social card
// without running the app. Also writes the sitemap and the 404 page.
// Everything comes from client/src/lib/seo-pages.json, the same data the
// app uses. No browser needed, so it behaves the same on every host.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const DIST = join(process.cwd(), "client", "dist");
const { base, pages } = JSON.parse(readFileSync(join(process.cwd(), "client", "src", "lib", "seo-pages.json"), "utf8"));
const template = readFileSync(join(DIST, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const urlOf = (route) => (route === "/" ? `${base}/` : `${base}${route}`);

// Replace one tag's content attribute, matched by its name or property.
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`Missing <meta ${attr}="${key}"> in index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function trail(route) {
  const chain = [];
  for (let r = route; r; r = pages[r].parent) chain.unshift(r);
  return chain;
}

function structuredData(route, p) {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: trail(route).map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: pages[r].name,
        item: urlOf(r),
      })),
    },
  ];
  const page = {
    "@type": route === "/about" ? "ProfilePage" : route === "/contact" ? "ContactPage" : "WebPage",
    "@id": `${urlOf(route)}#page`,
    url: urlOf(route),
    name: p.title,
    description: p.description,
    isPartOf: { "@id": `${base}/#website` },
    primaryImageOfPage: `${base}${p.image}`,
  };
  if (route === "/about") page.mainEntity = { "@id": `${base}/#person` };
  if (p.type === "article") {
    page.mainEntity = {
      "@type": "CreativeWork",
      name: p.name,
      headline: p.name,
      description: p.description,
      image: `${base}${p.image}`,
      url: urlOf(route),
      author: { "@id": `${base}/#person` },
      creator: { "@id": `${base}/#person` },
    };
  }
  graph.push(page);
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

// For readers and crawlers without JavaScript: the page's heading and
// summary, and links to every page.
function fallback(route, p) {
  const links = Object.entries(pages)
    .map(([r, q]) => `<li><a href="${r}">${esc(q.name)}</a></li>`)
    .join("");
  return `<noscript><main><h1>${esc(p.name === "Home" ? "Kazeem Salau" : p.name)}</h1><p>${esc(p.description)}</p><nav><ul>${links}</ul></nav></main></noscript>`;
}

function pageHtml(route, p) {
  let html = template;
  const url = urlOf(route);
  const image = `${base}${p.image}`;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "name", "description", p.description);
  html = setMeta(html, "property", "og:type", p.type === "article" ? "article" : p.type === "profile" ? "profile" : "website");
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", p.title);
  html = setMeta(html, "property", "og:description", p.description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:image:alt", p.imageAlt);
  html = setMeta(html, "name", "twitter:title", p.title);
  html = setMeta(html, "name", "twitter:description", p.description);
  html = setMeta(html, "name", "twitter:image", image);
  html = setMeta(html, "name", "twitter:image:alt", p.imageAlt);
  html = html.replace("</head>", `    ${structuredData(route, p)}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${fallback(route, p)}`);
  return html;
}

for (const [route, p] of Object.entries(pages)) {
  const dir = route === "/" ? DIST : join(DIST, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), pageHtml(route, p));
}

// Unknown addresses: the app's own "not found" page, kept out of the index.
let notFound = template
  .replace(/<title>[^<]*<\/title>/, "<title>Page not found | Kazeem Salau</title>")
  .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex" />')
  .replace(/\s*<link rel="canonical" href="[^"]*" \/>/, "");
writeFileSync(join(DIST, "404.html"), notFound);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages)
  .map((r) => `  <url>\n    <loc>${urlOf(r)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

console.log(`SEO pages: wrote ${Object.keys(pages).length} pages, 404.html and sitemap.xml.`);
