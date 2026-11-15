import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// The Wire: a newsroom teleprinter in the paper's sidebar. A dispatch feeds
// out of the machine and types itself, letter by letter, under the reader's
// own clock. Tear it off and the next one prints; left alone, a new one
// prints every so often while it's on screen. Every dispatch is a fact
// from the case studies, with a link to the story.

export type Dispatch = { desk: string; text: string; href: string; link?: string };

const TYPE_MS = 26;
const NEXT_MS = 9000;

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clock() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function TheWire({ dispatches }: { dispatches: Dispatch[] }) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [tearing, setTearing] = useState(false);
  const [time, setTime] = useState(clock);
  const [onScreen, setOnScreen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const still = useRef(reduced());

  const d = dispatches[index];
  const done = typed >= d.text.length;

  // Only work while the machine is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setOnScreen(en.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type the dispatch out.
  useEffect(() => {
    if (still.current) {
      setTyped(d.text.length);
      return;
    }
    if (!onScreen || tearing || done) return;
    const t = window.setTimeout(() => setTyped((n) => n + 1), d.text[typed] === " " ? TYPE_MS * 2 : TYPE_MS);
    return () => clearTimeout(t);
  }, [typed, onScreen, tearing, done, d.text]);

  // Left alone, the next dispatch comes through.
  useEffect(() => {
    if (!onScreen || !done || tearing || still.current) return;
    const t = window.setTimeout(tear, NEXT_MS);
    return () => clearTimeout(t);
  });

  function tear() {
    if (tearing) return;
    if (still.current) {
      setIndex((i) => (i + 1) % dispatches.length);
      setTime(clock());
      return;
    }
    setTearing(true);
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % dispatches.length);
      setTyped(0);
      setTime(clock());
      setTearing(false);
    }, 650);
  }

  return (
    <section ref={root} className="wire" aria-label="The Wire: latest dispatches">
      <header className="wire-head">
        <span className="wire-live" aria-hidden="true" />
        The Wire
        <span className="wire-meta">Live &middot; {time}</span>
      </header>
      <div className="wire-machine" aria-hidden="true">
        <span className="wire-slit" />
      </div>
      <div className="wire-feed">
        <article key={index} className="wire-sheet" data-tearing={tearing ? "1" : undefined} aria-live="polite">
          <p className="wire-desk">
            {d.desk} &middot; {time}
          </p>
          <p className="wire-text">
            <span className="wire-sr">{d.text}</span>
            <span aria-hidden="true">
              {d.text.slice(0, typed)}
              {!done && <i className="wire-caret" />}
            </span>
          </p>
          <Link href={d.href} className="wire-link" data-shown={done ? "1" : undefined} tabIndex={done ? 0 : -1}>
            {d.link ?? "Read the story"} &rarr;
          </Link>
          <span className="wire-edge" aria-hidden="true" />
        </article>
      </div>
      <div className="wire-foot">
        <button type="button" className="wire-tear" onClick={tear}>
          <span aria-hidden="true">&#9986;</span> Tear off
        </button>
        <span className="wire-count">
          {index + 1} / {dispatches.length}
        </span>
      </div>
    </section>
  );
}
