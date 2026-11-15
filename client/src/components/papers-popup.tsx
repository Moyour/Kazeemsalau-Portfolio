import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { paperFor } from "@/lib/paper";

// A small card in the corner. It puts this paper back on the table. It
// slides in shortly after a page opens, folds to a tab while the reader
// scrolls, and can be put away until wanted.

export default function PapersPopup() {
  const [location] = useLocation();
  const [shown, setShown] = useState(false);
  const [tucked, setTucked] = useState(false);
  const paper = paperFor(location);

  // Slide in a moment after each page opens.
  useEffect(() => {
    setShown(false);
    const t = window.setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, [location]);

  // While reading down the page it folds to a small tab, out of the way;
  // scrolling back up pops the card out again.
  const [reading, setReading] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Small wheel steps add up before they count as a direction.
      if (Math.abs(y - last) < 8 && y >= 120) return;
      setReading(y > 320 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (location === "/") return null;

  return (
    <aside className="pp" data-shown={shown ? "1" : undefined} data-tucked={tucked ? "1" : undefined} aria-label="Today's papers">
      {tucked || reading ? (
        <button
          type="button"
          className="pp-tab"
          onClick={() => {
            setTucked(false);
            setReading(false);
          }}
          aria-label="Show today's papers"
        >
          <span className="pp-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      ) : (
        <>
          <Link href="/" data-section="" className="pp-card pp-swap">
            <span className="pp-icon" aria-hidden="true">
              <i data-paper={paper} />
              <i />
            </span>
            <span className="pp-text">
              <b>Put this paper back</b>
            </span>
            <span className="pp-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <button type="button" className="pp-close" onClick={() => setTucked(true)} aria-label="Tuck this away">
            &times;
          </button>
        </>
      )}
    </aside>
  );
}
