import { tween } from "@/lib/spring";

// Turning to another page of the paper. The page is a leaf hinged at its
// left edge, cut into narrow vertical strips that each lean a little more
// than the one before, so it curls as it turns: the outer edge lifts and
// leads, the part by the spine follows. Past edge-on each strip shows the
// plain back of the sheet, and the leaf throws a shadow on the page it is
// uncovering. It takes its time, the way a hand turns a broadsheet: a slow
// lift off the page, an easy sweep across, and a soft landing.
//
// Forward, the current page turns away to reveal the new one beneath.
// Back, the new page turns over onto the stack from the left, covering the
// current one. The leaves are throwaway copies of the rendered page.

type Leaf = { el: HTMLElement; draw: (p: number) => void };

const div = (className: string) => Object.assign(document.createElement("div"), { className });

// A copy of the paper as it sits on screen right now, without the bits
// that would misbehave inside a moving piece, and without anything below
// the window, which never shows during a turn and only slows it down.
function copyOf(paper: HTMLElement, r: DOMRect) {
  const copy = paper.cloneNode(true) as HTMLElement;
  const originals = paper.querySelectorAll("*");
  const copies = copy.querySelectorAll("*");
  const below = innerHeight + 40;
  originals.forEach((el, i) => {
    if (el.getBoundingClientRect().top > below || getComputedStyle(el).position === "fixed") copies[i].remove();
  });
  copy.removeAttribute("class");
  copy.setAttribute("aria-hidden", "true");
  copy.style.cssText += `;position:absolute;left:0;top:${r.top}px;width:${r.width}px;margin:0;`;
  copy.querySelectorAll<HTMLElement>(".ks-words").forEach((w) => (w.dataset.in = "1"));
  copy.querySelectorAll<HTMLElement>("[data-reveal]").forEach((w) => (w.dataset.reveal = "in"));
  copy.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  return copy;
}

// The leaf: strips of the page, each with a printed front and a plain back.
function buildLeaf(paper: HTMLElement, r: DOMRect, strips: number): Leaf {
  const el = div("ks-leaf");
  Object.assign(el.style, { left: `${r.left}px`, width: `${r.width}px` });
  const w = r.width / strips;
  const page = copyOf(paper, r);
  const fronts: HTMLElement[] = [];
  const backs: HTMLElement[] = [];
  for (let i = 0; i < strips; i++) {
    // A hair of overlap hides the seams between strips.
    const clip = `inset(0 ${Math.max(0, r.width - (i + 1) * w - 0.6)}px 0 ${i * w}px)`;
    const front = div("ks-leaf-front");
    front.style.clipPath = clip;
    front.style.transformOrigin = `${i * w}px 0`;
    front.append(page.cloneNode(true));
    const back = div("ks-leaf-back");
    back.style.clipPath = clip;
    back.style.transformOrigin = `${i * w}px 0`;
    fronts.push(front);
    backs.push(back);
    el.append(back, front);
  }
  const shade = div("ks-leaf-shade");
  el.append(shade);

  // How far each strip has turned, p from 0 (flat) to 1 (turned over). The
  // outer edge starts first; `lead` is how far ahead of the spine it runs.
  const lead = 0.32;
  const draw = (p: number) => {
    let x = 0;
    let z = 0;
    let lift = 0;
    for (let i = 0; i < strips; i++) {
      const across = (i + 0.5) / strips;
      const t = Math.min(1, Math.max(0, p * (1 + lead) - lead * (1 - across)));
      // Ease each strip's own turn so the curl stays round. It only needs to
      // go a little past edge-on: beyond that the leaf is out of sight
      // behind the spine, so the whole turn is spent where it can be seen.
      const a = MAX_TURN * (t * t * (3 - 2 * t));
      const deg = (a * 180) / Math.PI;
      const move = `translate3d(${x - i * w}px, 0, ${z}px) rotateY(${-deg}deg)`;
      fronts[i].style.transform = move;
      backs[i].style.transform = `${move} translateX(${w}px) rotateY(180deg)`;
      // Lit from the front: darkest edge-on, the back a little greyer.
      const light = Math.cos(a);
      fronts[i].style.filter = `brightness(${(0.72 + 0.28 * Math.max(0, light)).toFixed(3)})`;
      backs[i].style.filter = `brightness(${(0.8 + 0.2 * Math.max(0, -light)).toFixed(3)})`;
      x += w * Math.cos(a);
      z += w * Math.sin(a);
      lift = Math.max(lift, Math.sin(a));
    }
    // The leaf's shadow on the page beneath, deepest mid-turn.
    shade.style.opacity = String((0.5 * lift * (1 - p * 0.6)).toFixed(3));
    shade.style.transform = `translateX(${Math.max(0, x)}px)`;
    // Nearly over, it slips out of sight past the spine rather than vanishing.
    el.style.opacity = String(p > 0.82 ? Math.max(0, (1 - p) / 0.18).toFixed(3) : 1);
  };
  return { el, draw };
}

// How far a strip turns, in radians: just past edge-on.
const MAX_TURN = Math.PI * 0.6;

// How long one turn takes, lift to landing.
const TURN_MS = 1100;

// The paper's colours as they are now, so a copy of the old page keeps
// them while the new page (perhaps the other edition) takes over.
const PALETTE = ["--ink", "--paper", "--paper-2", "--paper-deep", "--accent", "--muted", "--body", "--rule", "--outer"];
function freezePalette(el: HTMLElement) {
  const cs = getComputedStyle(document.documentElement);
  PALETTE.forEach((v) => {
    const value = cs.getPropertyValue(v);
    if (value) el.style.setProperty(v, value);
  });
}

let busy: (() => void) | null = null;

export function turnPage(direction: "forward" | "back", go: () => void) {
  const paper = document.querySelector<HTMLElement>(".ks-paper");
  if (!paper || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    go();
    return;
  }
  busy?.();

  const html = document.documentElement;
  const strips = innerWidth < 700 ? 6 : 9;
  const stage = div("ks-turn");
  stage.setAttribute("aria-hidden", "true");
  const before = paper.getBoundingClientRect();

  let leaf: Leaf;
  let from: number;
  let to: number;
  if (direction === "forward") {
    // The current page lifts off the new one.
    leaf = buildLeaf(paper, before, strips);
    freezePalette(leaf.el);
    stage.append(leaf.el);
    document.body.append(stage);
    leaf.draw(0);
    go();
    window.scrollTo(0, 0);
    from = 0;
    to = 1;
  } else {
    // The current page stays put underneath while the new one turns back
    // over onto it from the left.
    const under = div("ks-leaf-under");
    Object.assign(under.style, { left: `${before.left}px`, width: `${before.width}px` });
    under.append(copyOf(paper, before));
    freezePalette(under);
    stage.append(under);
    document.body.append(stage);
    go();
    window.scrollTo(0, 0);
    const after = paper.getBoundingClientRect();
    leaf = buildLeaf(paper, after, strips);
    stage.append(leaf.el);
    leaf.draw(1);
    html.dataset.turning = "1";
    from = 1;
    to = 0;
  }

  // Start the clock once the new page and the leaf have painted, so the
  // turn doesn't lose its first frames to that work.
  let motion: { done: Promise<void>; cancel: () => void } | null = null;
  let raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(() => {
      motion = tween(from, to, TURN_MS, (p) => leaf.draw(p));
      motion.done.then(finish);
    });
  });
  const finish = () => {
    cancelAnimationFrame(raf);
    motion?.cancel();
    stage.remove();
    delete html.dataset.turning;
    busy = null;
  };
  busy = finish;
}

// Switching between the Learning and Product papers: the current paper is
// pulled off the desk, sliding away and tilting as it lifts, and the other
// edition, lying underneath, rises to take its place. Toward Product it
// leaves to the right; back to Learning, to the left.
const SWAP_MS = 950;
export function swapPapers(toward: "learning" | "product", go: () => void) {
  const paper = document.querySelector<HTMLElement>(".ks-paper");
  if (!paper || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    go();
    return;
  }
  busy?.();
  const html = document.documentElement;
  const before = paper.getBoundingClientRect();
  const stage = div("ks-turn ks-swap-stage");
  stage.setAttribute("aria-hidden", "true");
  const sheet = div("ks-swap-sheet");
  Object.assign(sheet.style, { left: `${before.left}px`, width: `${before.width}px` });
  sheet.append(copyOf(paper, before));
  freezePalette(sheet);
  stage.append(sheet);
  document.body.append(stage);
  go();
  window.scrollTo(0, 0);
  html.dataset.swapping = "1";
  const dir = toward === "product" ? 1 : -1;
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  let raf = 0;
  const start = performance.now() + 40;
  const step = (now: number) => {
    const t = Math.min(1, Math.max(0, (now - start) / SWAP_MS));
    const e = ease(t);
    // Lifts first, then slides off; the paper beneath settles as it's uncovered.
    sheet.style.transform = `translate3d(${dir * e * 112}vw, ${-Math.sin(Math.PI * Math.min(1, t * 1.4)) * 26}px, 0) rotate(${dir * e * 7}deg) scale(${1 + Math.sin(Math.PI * Math.min(1, t * 1.6)) * 0.025})`;
    sheet.style.boxShadow = `0 ${10 + 30 * Math.sin(Math.PI * t)}px ${20 + 50 * Math.sin(Math.PI * t)}px rgba(20, 18, 15, ${0.12 + 0.18 * Math.sin(Math.PI * t)})`;
    paper.style.transform = `scale(${0.965 + 0.035 * e})`;
    paper.style.filter = `brightness(${0.9 + 0.1 * e})`;
    if (t < 1) raf = requestAnimationFrame(step);
    else finish();
  };
  const finish = () => {
    cancelAnimationFrame(raf);
    stage.remove();
    paper.style.transform = "";
    paper.style.filter = "";
    delete html.dataset.swapping;
    busy = null;
  };
  busy = finish;
  raf = requestAnimationFrame(step);
}
