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
  return <Router />;
}
