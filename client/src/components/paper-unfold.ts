// Picking a paper up off the table and opening it, and folding it back up
// to put it down again. The paper is folded in half just under its
// headline and Fig. 1, so the folded paper shows the name, the role and
// the face. Folded, it lies small and slightly askew in the middle of the
// window; opening it brings the bottom half down from behind, straightens
// it and brings it up to full size, and the crease smooths out. The
// folding pieces are throwaway copies of the rendered page; the real page
// is shown again the moment they finish.

import { spring } from "@/lib/spring";

// How big a folded paper is drawn in the middle of the window, given the
// length of its top half and its width. The table uses the same sum so a
// paper picked up there lands exactly where this one starts.
export function foldedScale(length: number, width: number) {
  return Math.min(0.8, (innerHeight * 0.72) / length, (innerWidth * 0.88) / width);
}

// The paper on screen now, so a new fold can clear one still running.
let current: (() => void) | null = null;

// "open": the folded paper opens out to the page underneath.
// "fold": the open page folds up; onFolded runs once it has, just before
// the folded copy is cleared away.
export function unfoldPaper(mode: "open" | "fold", onFolded?: () => void) {
  current?.();
  const html = document.documentElement;
  html.dataset.intro = "1";
  const paper = document.querySelector<HTMLElement>(".ks-paper");
  if (!paper) {
    delete html.dataset.intro;
    onFolded?.();
    return () => {};
  }

  const r = paper.getBoundingClientRect();
  const fold = document.createElement("div");
  fold.className = "ks-fold";
  fold.dataset.again = "1";
  fold.setAttribute("aria-hidden", "true");

  // Where it's folded: just under the headline and Fig. 1, and never above
  // the middle of the window. The bottom half is as long as the top, like
  // a real fold, and runs on past the bottom of the window.
  const topEdge = Math.max(r.top, 0);
  const keep = [...paper.querySelectorAll<HTMLElement>("main h1, .ks-photo-lead, .ks-photo-side")]
    .map((el) => el.getBoundingClientRect())
    .filter((b) => b.height > 0 && b.top < innerHeight * 2);
  const crease = Math.round(Math.max(innerHeight / 2, ...keep.map((b) => b.bottom + 18)));
  const length = crease - topEdge;
  const folded = foldedScale(length, r.width);
  // Centre the folded half in the window; it scales about the window's middle.
  const middle = innerHeight / 2;
  fold.style.setProperty("--s", String(folded));
  fold.style.setProperty("--fold", `${crease}px`);
  fold.style.setProperty("--oy", `${middle}px`);
  fold.style.setProperty("--h", `${crease + length}px`);
  fold.style.setProperty("--fy", `${folded * (middle - (topEdge + crease) / 2)}px`);

  const div = (className: string) => Object.assign(document.createElement("div"), { className });
  const copyOfPaper = () => {
    const copy = paper.cloneNode(true) as HTMLElement;
    // Fixed bars (reading progress) would pin themselves to the folding piece.
    const originals = paper.querySelectorAll("*");
    const copies = copy.querySelectorAll("*");
    originals.forEach((el, i) => getComputedStyle(el).position === "fixed" && copies[i].remove());
    copy.removeAttribute("class");
    copy.style.cssText += `;position:absolute;left:${r.left}px;top:${r.top}px;width:${r.width}px;margin:0;`;
    // Headlines and reveals wait for an observer the copy will never get.
    copy.querySelectorAll<HTMLElement>(".ks-words").forEach((w) => (w.dataset.in = "1"));
    copy.querySelectorAll<HTMLElement>("[data-reveal]").forEach((w) => (w.dataset.reveal = "in"));
    copy.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    return copy;
  };

  // Everything inside .ks-fold-y reads --th. The bottom half starts tucked
  // behind the top, so the top paints last.
  const y = div("ks-fold-y");
  for (const part of ["bottom", "top"]) {
    const piece = div(`ks-fold-piece ks-fold-${part}`);
    piece.append(copyOfPaper());
    y.append(piece);
  }
  const edges = div("ks-fold-edges");
  edges.style.left = `${r.left}px`;
  edges.style.width = `${r.width}px`;
  y.append(edges, div("ks-crease-h"));
  fold.append(y);
  document.body.append(fold);

  // Progress: th, the bottom half (0 folded, 1 flat); tf, the crease fading.
  let th = mode === "fold" ? 1 : 0;
  let tf = mode === "fold" ? 1 : 0;
  const draw = () => {
    y.style.setProperty("--th", String(th));
    fold.style.setProperty("--tf", String(tf));
  };
  draw();

  let done = false;
  const motions: { cancel: () => void }[] = [];
  const finish = () => {
    if (done) return;
    done = true;
    motions.forEach((m) => m.cancel());
    skipEvents.forEach((ev) => window.removeEventListener(ev, finish, true));
    fold.remove();
    delete html.dataset.intro;
    current = null;
  };
  current = finish;
  const skipEvents = ["wheel", "keydown", "pointerdown"];

  if (mode === "open") {
    // Lands with a little give, then the crease smooths out.
    const open = spring(0, 1, 0, { stiffness: 70, damping: 13 }, (x) => {
      th = x;
      draw();
    });
    motions.push(open);
    open.done
      .then(() => {
        const flatten = spring(0, 1, 0, { stiffness: 30, damping: 11 }, (x) => {
          tf = x;
          draw();
        });
        motions.push(flatten);
        return flatten.done;
      })
      .then(finish);
    // Once it's under way, a click, key or scroll skips to the open page.
    window.setTimeout(() => {
      if (!done) skipEvents.forEach((ev) => window.addEventListener(ev, finish, { capture: true, passive: true }));
    }, 600);
  } else {
    // The crease presses in and the bottom half folds away behind the top.
    const crease = spring(1, 0, 0, { stiffness: 60, damping: 16 }, (x) => {
      tf = x;
      draw();
    });
    const shut = spring(1, 0, 0, { stiffness: 38, damping: 12.5 }, (x) => {
      th = Math.max(x, -0.04);
      draw();
    });
    motions.push(crease, shut);
    Promise.all([crease.done, shut.done]).then(() => {
      if (done) return;
      onFolded?.();
      finish();
    });
  }
  return finish;
}
