import type { Paper } from "@/lib/paper";

// The eight fonts, by who uses them: each edition's pair, and the cover
// page's. The files are served from this site (see src/fonts.css). The
// browser only fetches a font once something on screen asks for it, so
// left alone an edition's fonts would start downloading only when it
// opened, and the page would show a stand-in font first. Instead, every
// face is fetched in the background while the reader is on the table, and
// a paper isn't opened until its own faces are in.

type Scope = Paper | "cover";

const FACES: Record<Scope, string[]> = {
  // The whole site shares the Learning pair for now (see index.css).
  cover: [],
  learning: [
    "400 1em 'Libre Baskerville'",
    "700 1em 'Libre Baskerville'",
    "italic 400 1em 'Libre Baskerville'",
    "400 1em 'IBM Plex Serif'",
    "500 1em 'IBM Plex Serif'",
    "600 1em 'IBM Plex Serif'",
    "700 1em 'IBM Plex Serif'",
    "italic 400 1em 'IBM Plex Serif'",
    "italic 500 1em 'IBM Plex Serif'",
    "italic 600 1em 'IBM Plex Serif'",
  ],
  product: [],
  video: [],
};

const facesOf = (scope: Scope) => (FACES[scope].length ? FACES[scope] : FACES.learning);

const supported = () => typeof document !== "undefined" && "fonts" in document;

function load(scope: Scope): Promise<void> {
  if (!supported()) return Promise.resolve();
  return Promise.all(facesOf(scope).map((f) => document.fonts.load(f))).then(
    () => undefined,
    () => undefined,
  );
}

// True when every face this scope uses is already loaded.
export function fontsReady(scope: Scope): boolean {
  return !supported() || facesOf(scope).every((f) => document.fonts.check(f));
}

// Resolves once the scope's faces are in, or after `maxWait` ms, whichever
// comes first: a slow connection gets the stand-in font rather than a
// paper that never opens.
export function whenFontsReady(scope: Scope, maxWait: number): Promise<void> {
  if (fontsReady(scope)) return Promise.resolve();
  return Promise.race([load(scope), new Promise<void>((r) => window.setTimeout(r, maxWait))]);
}

// Fetch every face once the first screen has drawn, so whichever paper is
// picked up next already has its type. The browser caches them for the
// rest of the visit; nothing is fetched twice.
let warmed = false;
export function warmAllFonts() {
  if (warmed || !supported()) return;
  warmed = true;
  const go = () => {
    for (const scope of Object.keys(FACES) as Scope[]) void load(scope);
  };
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(go, { timeout: 1500 });
  else setTimeout(go, 300);
}
