// The career at a glance: a ruler from the first role to now, each role a
// bar in its track's colour, so the long run of learning design and the
// product work alongside it read in one look. Bars are linked to the role
// rows below: pointing at either lights up the other, and choosing a bar
// jumps to its role. Roles without a start date sit as a dot at "now".

type Role = { dates: string; org: string; role: string; track: string };

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const NOW = new Date().getFullYear() + new Date().getMonth() / 12;

// "Dec 2019 – Jun 2022", "Jan – Nov 2017", "Jul 2022 – now" → [from, to] in years.
function span(dates: string): [number, number] | null {
  const [a, b] = dates.split(/\s*[–-]\s*/);
  if (!b) return null;
  const end = /now/i.test(b) ? NOW : parse(b);
  const startYear = /\d{4}/.test(a) ? undefined : end && Math.floor(end);
  const start = parse(a, startYear);
  return start !== null && end !== null ? [start, end + (/now/i.test(b) ? 0 : 1 / 12)] : null;
}
function parse(s: string, year?: number | null): number | null {
  const m = MONTHS.indexOf(s.trim().slice(0, 3).toLowerCase());
  const y = s.match(/\d{4}/)?.[0];
  const yr = y ? Number(y) : year;
  if (m < 0 || !yr) return null;
  return yr + m / 12;
}

export default function CareerTimeline({
  roles,
  colors,
  focus,
  dimTrack,
  onFocus,
}: {
  roles: Role[];
  colors: Record<string, string>;
  focus: number | null;
  dimTrack: string;
  onFocus: (i: number | null) => void;
}) {
  const spans = roles.map((r) => span(r.dates));
  const first = Math.floor(Math.min(...spans.filter(Boolean).map((s) => s![0])));
  const last = Math.ceil(NOW);
  const x = (t: number) => ((t - first) / (last - first)) * 100;
  const years = Array.from({ length: last - first + 1 }, (_, i) => first + i);

  return (
    <div className="ct" aria-label="Career timeline">
      <div className="ct-rows">
        {roles.map((r, i) => {
          const s = spans[i];
          const dim = dimTrack !== "All" && r.track !== dimTrack;
          const style = s
            ? { left: `${x(s[0])}%`, width: `${Math.max(1.2, x(s[1]) - x(s[0]))}%` }
            : { left: `calc(${x(NOW)}% - 7px)`, width: "14px" };
          return (
            <button
              key={r.org + r.dates}
              type="button"
              className="ct-bar"
              data-dot={s ? undefined : "1"}
              data-focus={focus === i ? "1" : undefined}
              data-dim={dim ? "1" : undefined}
              style={{ ...style, background: colors[r.track], animationDelay: `${i * 70}ms` }}
              onMouseEnter={() => onFocus(i)}
              onMouseLeave={() => onFocus(null)}
              onFocus={() => onFocus(i)}
              onBlur={() => onFocus(null)}
              onClick={() => document.getElementById(`role-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
              aria-label={`${r.org}, ${r.role}, ${r.dates}`}
            >
              <span>{r.org}</span>
            </button>
          );
        })}
      </div>
      <div className="ct-ruler" aria-hidden="true">
        {years.map((y) => (
          <span key={y} style={{ left: `${x(y)}%` }}>
            {y % 2 === 0 || y === last ? y : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
