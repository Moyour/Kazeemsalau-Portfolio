import { tween } from "@/lib/spring";
import type { Paper } from "@/lib/paper";

// Turning to another page of the paper. The page is one leaf, hinged at
// the spine on the left, the way a book cover opens: it lifts off the page,
// swings across in perspective, shows the plain back of the sheet once it
// passes edge-on, and throws a shadow on the page it is uncovering. A slow
// lift, an easy sweep, a soft landing.
//
// Forward, the current page turns away to reveal the new one beneath.
// Back, the new page turns over onto the stack from the left, covering the
// current one. The leaves are throwaway copies of the rendered page.

type Leaf = { el: HTMLElement; draw: (p: number) => void };

const div = (className: string) => Object.assign(document.createElement("div"), { className });

// A copy of the paper as it sits on screen right now, without the bits
// that would misbehave inside a moving piece, and without anything below
// the window, which never shows during a turn and only slows it down.
// Faces that come from the paper's own rules (the product serif, the
// learning capitals). A moving copy leaves `.ks-paper`, so those rules
// let go and the inline learning face shows through. Stamp the computed
// type on first, while the original is still on the page.
const TYPE_PROPS = ["font-family", "font-weight", "font-style", "letter-spacing", "text-transform"];
function keepsItsType(el: Element) {
  if (!(el instanceof HTMLElement)) return false;
  if (/^H[1-6]$/.test(el.tagName)) return true;
  if (el.classList.contains("ks-masthead") || el.classList.contains("ks-more-title") || el.classList.contains("ks-page-h1") || el.classList.contains("pt-title")) return true;
  return /font|text-transform/i.test(el.getAttribute("style") || "");
}
function freezeType(originals: Element[], copies: Element[]) {
  originals.forEach((el, i) => {
    const node = copies[i];
    if (!keepsItsType(el) || !(node instanceof HTMLElement)) return;
    const cs = getComputedStyle(el);
    TYPE_PROPS.forEach((p) => node.style.setProperty(p, cs.getPropertyValue(p)));
  });
}

function copyOf(paper: HTMLElement, r: DOMRect) {
  const copy = paper.cloneNode(true) as HTMLElement;
  const originals = [paper, ...paper.querySelectorAll("*")];
  const copies = [copy, ...copy.querySelectorAll("*")];
  freezeType(originals, copies);
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

// The leaf: one sheet, printed on the front and plain newsprint on the back,
// hinged at the spine so it opens like a book cover.
function buildLeaf(paper: HTMLElement, r: DOMRect): Leaf {
  const el = div("ks-leaf");
  Object.assign(el.style, { left: `${r.left}px`, width: `${r.width}px` });
  const hinge = div("ks-book-hinge");
  const front = div("ks-leaf-front");
  front.append(copyOf(paper, r));
  const back = div("ks-leaf-back");
  hinge.append(back, front);
  const shade = div("ks-leaf-shade");
  el.append(shade, hinge);

  const draw = (p: number) => {
    const t = p * p * (3 - 2 * p);
    const deg = -t * 168;
    const lift = Math.sin(Math.min(1, t * 1.05) * Math.PI);
    hinge.style.transform = `rotateY(${deg}deg) translateZ(${(lift * 48).toFixed(1)}px)`;
    const light = Math.cos((Math.abs(deg) * Math.PI) / 180);
    front.style.filter = `brightness(${(0.62 + 0.38 * Math.max(0, light)).toFixed(3)})`;
    back.style.filter = `brightness(${(0.72 + 0.2 * Math.max(0, -light)).toFixed(3)})`;
    shade.style.opacity = (0.42 * lift * (1 - t * 0.35)).toFixed(3);
    shade.style.transform = `scaleX(${(0.35 + 0.9 * (1 - t)).toFixed(3)})`;
    el.style.opacity = p > 0.86 ? Math.max(0, (1 - p) / 0.14).toFixed(3) : "1";
  };
  return { el, draw };
}

// How long one turn takes, lift to landing.
const TURN_MS = 1200;

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
  const stage = div("ks-turn");
  stage.setAttribute("aria-hidden", "true");
  const before = paper.getBoundingClientRect();

  let leaf: Leaf;
  let from: number;
  let to: number;
  if (direction === "forward") {
    // The current page lifts off the new one.
    leaf = buildLeaf(paper, before);
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
    leaf = buildLeaf(paper, after);
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
export function swapPapers(toward: Paper, go: () => void) {
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
  const from = html.dataset.paper ?? "learning";
  go();
  window.scrollTo(0, 0);
  html.dataset.swapping = "1";
  const order: Paper[] = ["learning", "product", "video"];
  const dir = order.indexOf(toward) >= order.indexOf(from as Paper) ? 1 : -1;
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
