import { useEffect, useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Switch, Route, Redirect, useLocation } from "wouter";
import { navigate } from "wouter/use-browser-location";
import NotFound from "@/pages/not-found";
import { LearningFront } from "@/pages/home";
import ProductFront from "@/pages/product-front";
import Table, { arriveAtTable } from "@/pages/table";
import About from "@/pages/about";
import Work from "@/pages/work";
import CaseBusinessWriting from "@/pages/case-business-writing";
import CaseTheFixer from "@/pages/case-the-fixer";
import CaseEmotionalIntelligence from "@/pages/case-emotional-intelligence";
import Products from "@/pages/products";
import CaseGrubShelf from "@/pages/case-grubshelf";
import CaseMaiShara from "@/pages/case-mai-shara";
import CaseGrubShelfWebsite from "@/pages/case-grubshelf-website";
import CasePrototype from "@/pages/case-prototype";
import Contact from "@/pages/contact";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { NightLamp, PendantLamp } from "@/components/newsroom";
import { trackLinkClick } from "@/lib/track";
import { unfoldPaper } from "@/components/paper-unfold";
import { ownPaper, paperFor, sectionIndex } from "@/lib/paper";
import { swapPapers, turnPage } from "@/components/page-turn";
import PapersPopup from "@/components/papers-popup";

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    let x = 0, y = 0, cx = 0, cy = 0, big = false, raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = "1";
      const t = (e.target as Element)?.closest?.("a,button");
      if (!!t !== big) {
        big = !!t;
        dot.style.width = big ? "46px" : "16px";
        dot.style.height = big ? "46px" : "16px";
      }
    };

    const onLeave = () => { dot.style.opacity = "0"; };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "var(--accent)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "multiply",
        opacity: 0,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.25s, width 0.25s, height 0.25s",
      }}
    />
  );
}

function Router() {
  const [location] = useLocation();
  // Which paper is open, so the page prints on that paper's colours. The
  // table sits outside both.
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (location === "/") delete html.dataset.paper;
    else html.dataset.paper = paperFor(location);
    // GrubShelf's pages wear the app's own colour.
    if (location.startsWith("/design/grubshelf")) html.dataset.brand = "grubshelf";
    else delete html.dataset.brand;
  }, [location]);
  // The landing is the table the two papers lie on, outside any paper.
  if (location === "/") return <Table />;
  return (
    <div
      style={{
        fontFamily: "Newsreader, Georgia, serif",
        color: "var(--ink)",
        background: "var(--outer)",
        minHeight: "100vh",
        padding: "clamp(0px, 2.2vw, 28px)",
        // Room above the paper for the lamp to hang in.
        paddingTop: 32,
        position: "relative",
      }}
    >
      <PendantLamp />
      <PapersPopup />
      <div
        className="ks-paper"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          background: "var(--paper)",
          border: "1px solid var(--ink)",
          boxShadow: "0 18px 44px rgba(20, 18, 15, 0.13)",
        }}
      >
        <Navigation />
        <main>
          <Switch>
            <Route path="/learning" component={LearningFront} />
            <Route path="/product" component={ProductFront} />
            <Route path="/work" component={Work} />
            <Route path="/work/business-writing" component={CaseBusinessWriting} />
            <Route path="/work/the-fixer" component={CaseTheFixer} />
            <Route path="/work/emotional-intelligence" component={CaseEmotionalIntelligence} />
            <Route path="/about" component={About} />
            <Route path="/products" component={Products} />
            <Route path="/apps"><Redirect to="/design/grubshelf" replace /></Route>
            <Route path="/design"><Redirect to="/products" replace /></Route>
            <Route path="/design/grubshelf" component={CaseGrubShelf} />
            <Route path="/design/mai-shara" component={CaseMaiShara} />
            <Route path="/design/grubshelf-website" component={CaseGrubShelfWebsite} />
            <Route path="/design/grubshelf/screens"><Redirect to="/design/grubshelf" replace /></Route>
            <Route path="/design/leadway-health">{() => <CasePrototype slug="leadway-health" />}</Route>
            <Route path="/design/householder">{() => <CasePrototype slug="householder" />}</Route>
            <Route path="/design/pharmacy-benefit">{() => <CasePrototype slug="pharmacy-benefit" />}</Route>
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <div className="ks-thirty" aria-label="End">&mdash; 30 &mdash;</div>
        <Footer />
      </div>
    </div>
  );
}

// Internal link clicks change page with some motion. Section links (the
// top bar and the front page's index) and opening a product turn the page
// like a newspaper: forward through the sections turns it over, backward
// turns it back. Other links run through the View Transitions API, where a
// card's image grows into the next page's hero. Modified clicks and
// reduced-motion users get a normal jump.
function animatePageChange(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const a = (e.target as Element)?.closest?.("a");
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname.match(/\.\w+$/)) return;
  const section = !!(a.closest("nav") || a.hasAttribute("data-section"));

  // The masthead folds the paper up and puts it back on the table; Swap
  // does too, then picks up the other paper.
  if (url.pathname === "/" && section) {
    e.preventDefault();
    e.stopPropagation();
    const from = paperFor(location.pathname);
    const swap = a.dataset.swap === "learning" || a.dataset.swap === "product" ? a.dataset.swap : undefined;
    window.scrollTo(0, 0);
    unfoldPaper("fold", () => {
      arriveAtTable(from, swap);
      flushSync(() => navigate("/"));
    });
    return;
  }

  if (url.pathname === location.pathname) return;
  const go = () => flushSync(() => navigate(url.pathname + url.search + url.hash));

  // Over to the other paper: the one on the desk is pulled away.
  const toPaper = ownPaper(url.pathname);
  if (toPaper && toPaper !== paperFor(location.pathname)) {
    e.preventDefault();
    e.stopPropagation();
    swapPapers(toPaper, go);
    return;
  }

  if (section || /^\/(products|design)/.test(url.pathname)) {
    e.preventDefault();
    e.stopPropagation();
    // Positions within the paper being read.
    const paper = ownPaper(url.pathname) ?? paperFor(location.pathname);
    const from = sectionIndex(location.pathname, paper);
    const to = sectionIndex(url.pathname, paper);
    // Into a product from its section counts as further into the paper.
    const forward = section ? to >= from : to > from || url.pathname.startsWith("/design");
    turnPage(forward ? "forward" : "back", go);
    return;
  }

  if (!document.startViewTransition) return;
  e.preventDefault();
  e.stopPropagation();
  document.startViewTransition(() => {
    go();
    window.scrollTo(0, 0);
  });
}

export default function App() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      trackLinkClick(e);
      animatePageChange(e);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <CustomCursor />
      <NightLamp />
      <Router />
    </>
  );
}
