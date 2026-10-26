import { useEffect, useRef, useState, type CSSProperties } from "react";

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

// Splits a headline into words that rise out of a blur, one every 60ms,
// the first time it scrolls into view. The text stays in the DOM for SEO.
export function Words({ text, style }: { text: string; style?: CSSProperties }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const words = text.split(" ");

  return (
    <span ref={ref} className="ks-words" data-in={inView ? "1" : "0"} style={style}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="ks-word" style={{ "--i": i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts the number inside a stat like "50+" or "+20%" up from zero once it
// is on screen, keeping any prefix and suffix as they are.
export function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const parsed = value.match(/^(\D*)(\d+)(\D*)$/);
  // A bare year like "2014" reads oddly counting up from zero, so leave it.
  const isYear = !!parsed && !parsed[1] && !parsed[3] && Number(parsed[2]) > 1900;
  const match = isYear ? null : parsed;
  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(match ? 0 : target);

  useEffect(() => {
    if (!inView || !match) return;
    if (reduceMotion()) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} aria-label={value} style={{ fontVariantNumeric: "tabular-nums" }}>
      {match[1]}
      {inView ? n : 0}
      {match[3]}
    </span>
  );
}
