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

// The figure, shown whole. Counting up from zero made "50+" read as "4+"
// on the way past.
export function CountUp({ value }: { value: string; duration?: number }) {
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>;
}
