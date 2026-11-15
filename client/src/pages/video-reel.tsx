import { useSEO } from "@/hooks/use-seo";
import { Words } from "@/components/motion";

const CHANNEL = "https://www.youtube.com/@Moyoursalau";

// The words stay as published. Only the name is set in capitals.
export function filmTitle(title: string) {
  let cap = true;
  let out = "";
  for (const ch of title.toLowerCase()) {
    if (cap && /\p{L}/u.test(ch)) {
      out += ch.toUpperCase();
      cap = false;
    } else {
      out += ch;
      if (/\p{N}/u.test(ch)) cap = false;
    }
    if (".?!".includes(ch)) cap = true;
  }
  out = out.replace(/\bi\b/g, "I").replace(/\b(moyoursalau|kazeem salau)\b/gi, (name) => name.toUpperCase());
  for (const name of PROPER) out = out.replace(new RegExp(`\\b${name}\\b`, "gi"), name);
  return out;
}

// Names, acronyms and book titles keep their capitals.
const PROPER = ["AI", "ADDIE", "Kobe Bryant", "Japanese", "Steal Like an Artist", "Building a Second Brain", "Second Brain", "Atomic Habits", "Ikigai"];

// Longer films on the channel, newest first. Titles are the ones published
// on YouTube. Shorts stay on the channel.
export const FILMS: { id: string; title: string }[] = [
  { id: "tANWyt2mUdw", title: "I Built a Mobile App With No Dev Background (Here's How AI Made It Possible)" },
  { id: "SLc-Thmbdzc", title: "hobbies vs productivity" },
  { id: "8lbBV1Cxycc", title: "HOBBIES VS MONETISATION" },
  { id: "qV2v5js3NUs", title: "how I have been trying to stay engaged and curious even after finding the solution to a problem.." },
  { id: "sXJsl8LE9U8", title: "Solution to loosing interest." },
  { id: "DqS27GE3ocY", title: "Buying Back Your time." },
  { id: "ouyKo7c6QDk", title: "Productivity: Multitasking Vs Switching Task" },
  { id: "JXcmVTzS6Tc", title: "The Art of Execution: Brining Ideas to Life" },
  { id: "JRp6bCESpME", title: "CREATE POWERFUL PRESENTATIONS SLIDES WITH AI" },
  { id: "fYb8WI9faec", title: "What is Instructional Design ?  The Skill Behind Great Learning Experiences" },
  { id: "-Nxi0cdIcSc", title: "The Easy Way to Create AMAZING Art Without Spending Years Practicing | Moyoursalau" },
  { id: "reqvuBzluIU", title: "Why Every CREATIVE Person Needs Steal Like An Artist - [Book Review]" },
  { id: "cYufuagtzZw", title: "How to Build a Growth Mindset by Learning from the Best [Kobe Bryant POWERFUL Insights On Purpose]" },
  { id: "_51hFdFnWGk", title: "How to Unlock Ultimate Productivity - The ADDIE Model" },
  { id: "CHFDjEID8YQ", title: "How to Prioritize Yourself and Set Boundaries Without Feeling Guilty" },
  { id: "QaiNXC87QOw", title: "10 Tiny Daily Habits To Boost Productivity" },
  { id: "JJ-8-QE95OA", title: "How to Capture & Organize Brilliant Ideas – Building a Second Brain Summary" },
  { id: "Oh83slABLzk", title: "How to Stay Organized and Creative: Building a Second Brain Review" },
  { id: "thtTWdV2bjM", title: "5 Self-Help Book Lessons to Transform Your Life Today" },
  { id: "UZ7eY09IPJQ", title: "Unlocking Ikigai: The Japanese Secret to Happiness and Longevity" },
  { id: "00mCQkv6FFQ", title: "Transform Your Life with Atomic Habits | Book Review and Key Insights" },
];

export default function VideoReel() {
  useSEO("/video/reel");
  return (
    <article className="ks-mag-head" style={{ padding: "clamp(24px, 3.4vw, 42px) clamp(16px, 2.6vw, 30px) clamp(40px, 6vw, 72px)" }}>
      <div
        style={{
          fontFamily: "var(--font-learning-text)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 14,
        }}
      >
        Page 2 · The reel
      </div>
      <h1 className="ks-page-h1" style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.95, margin: "0 0 16px" }}>
        <Words text="The reel." />
      </h1>
      <p style={{ fontStyle: "italic", fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.45, maxWidth: "42ch", margin: "0 0 22px" }}>
        21 films. Short ones stay on YouTube.
      </p>
      <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="cs-play">
        Watch on YouTube <span aria-hidden="true">↗</span>
      </a>
      {/* The newest film leads, two columns by two rows: the grid then fills
          evenly at four, three or two columns, with no film left alone. */}
      <div
        className="rl-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
          marginTop: 32,
        }}
      >
        {FILMS.map((film, i) => (
          <a
            id={`film-${film.id}`}
            key={film.id}
            className="rl-film"
            data-lead={i === 0 ? "1" : undefined}
            href={`https://www.youtube.com/watch?v=${film.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <img
              src={`/images/reel/${film.id}.jpg`}
              alt=""
              loading={i < 5 ? "eager" : "lazy"}
              // React 18 knows this attribute only in lower case.
              {...{ fetchpriority: i === 0 ? "high" : undefined }}
              decoding="async"
              style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", border: "1px solid var(--ink)" }}
            />
            <span
              className="ks-film-title"
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 22,
                lineHeight: 1.2,
              }}
            >
              {filmTitle(film.title)}
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
