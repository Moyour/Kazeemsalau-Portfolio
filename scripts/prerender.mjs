import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { join, extname } from "node:path";

const DIST = join(process.cwd(), "client", "dist");
const PORT = 4173;

const ROUTES = [
  "/",
  "/work",
  "/work/business-writing",
  "/work/the-fixer",
  "/work/emotional-intelligence",
  "/about",
  "/apps",
  "/design",
  "/contact",
];

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "text/xml",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
};

// Simple static file server (SPA fallback to index.html)
function startServer() {
  const fallback = readFileSync(join(DIST, "index.html"));

  const server = createServer((req, res) => {
    const url = req.url.split("?")[0];
    let filePath = join(DIST, url);

    const candidates = [filePath];
    if (!extname(filePath)) {
      candidates.push(join(filePath, "index.html"));
      candidates.push(filePath + ".html");
    }

    for (const candidate of candidates) {
      if (existsSync(candidate) && !candidate.endsWith(DIST)) {
        try {
          const data = readFileSync(candidate);
          const ext = extname(candidate);
          res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
          res.end(data);
          return;
        } catch {
          // fall through
        }
      }
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fallback);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

// Fallback: copy index.html to each route directory so serve resolves
// /about → about/index.html (SPA behavior without the -s flag)
function copyFallback() {
  console.log("Puppeteer unavailable — copying index.html to route directories as fallback.");
  const src = join(DIST, "index.html");
  for (const route of ROUTES) {
    if (route === "/") continue;
    const dir = join(DIST, route);
    mkdirSync(dir, { recursive: true });
    copyFileSync(src, join(dir, "index.html"));
  }
  console.log(`Copied index.html to ${ROUTES.length - 1} route directories.`);
}

async function prerender() {
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    copyFallback();
    return;
  }

  console.log("Starting prerender...");
  const server = await startServer();

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch (err) {
    console.warn("Could not launch browser:", err.message);
    server.close();
    copyFallback();
    return;
  }

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    console.log(`  Rendering ${route}`);

    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    const html = await page.content();

    let outPath;
    if (route === "/") {
      outPath = join(DIST, "index.html");
    } else {
      const dir = join(DIST, route);
      mkdirSync(dir, { recursive: true });
      outPath = join(dir, "index.html");
    }

    writeFileSync(outPath, html);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`Prerendered ${ROUTES.length} routes.`);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
