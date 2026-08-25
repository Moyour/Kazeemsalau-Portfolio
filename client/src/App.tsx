import { useEffect, useRef } from "react";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Work from "@/pages/work";
import CaseBusinessWriting from "@/pages/case-business-writing";
import CaseTheFixer from "@/pages/case-the-fixer";
import CaseEmotionalIntelligence from "@/pages/case-emotional-intelligence";
import Apps from "@/pages/apps";
import Contact from "@/pages/contact";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

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
        background: "#C0281B",
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
  return (
    <div
      style={{
        fontFamily: "Newsreader, Georgia, serif",
        color: "#14120F",
        background: "#E8E4D9",
        minHeight: "100vh",
        padding: "clamp(0px, 2.2vw, 28px)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          background: "#F4F1EA",
          border: "1px solid #14120F",
          boxShadow: "0 18px 44px rgba(20, 18, 15, 0.13)",
        }}
      >
        <Navigation />
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/work" component={Work} />
            <Route path="/work/business-writing" component={CaseBusinessWriting} />
            <Route path="/work/the-fixer" component={CaseTheFixer} />
            <Route path="/work/emotional-intelligence" component={CaseEmotionalIntelligence} />
            <Route path="/about" component={About} />
            <Route path="/apps" component={Apps} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Router />
    </>
  );
}
