import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Link } from "wouter";
import { track } from "@/lib/track";

// The puzzles page: a small crossword whose answers are Kazeem's tools and
// methods. Typing moves on through the word, arrows move around the grid,
// clicking a square twice turns between across and down, and a word inks
// in once it's right. Solving it stamps the grid and offers the contact
// page; Reveal is there for anyone short of time.

type Dir = "across" | "down";
type Clue = { n: number; dir: Dir; row: number; col: number; answer: string; clue: string };

const CLUES: Clue[] = [
  { n: 1, dir: "down", row: 0, col: 0, answer: "FIGMA", clue: "Where his app screens are drawn before a line of code (5)" },
  { n: 2, dir: "across", row: 2, col: 3, answer: "SCORM", clue: "The package a finished course ships in, so any LMS can play it (5)" },
  { n: 2, dir: "down", row: 2, col: 3, answer: "SWIFT", clue: "GrubShelf is written in it, with UI on the end (5)" },
  { n: 3, dir: "down", row: 2, col: 7, answer: "MOODLE", clue: "Open-source learning platform he has built courses for (6)" },
  { n: 4, dir: "across", row: 4, col: 0, answer: "ADDIE", clue: "Analyse, design, develop, implement, evaluate (5)" },
  { n: 5, dir: "across", row: 6, col: 7, answer: "LMS", clue: "Where courses live, for short (3)" },
];
const ROWS = 8;
const COLS = 10;

const key = (r: number, c: number) => `${r},${c}`;
const cellsOf = (c: Clue) =>
  [...c.answer].map((_, i) => (c.dir === "across" ? key(c.row, c.col + i) : key(c.row + i, c.col)));

const kicker: CSSProperties = {
  fontFamily: "Archivo, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

export default function Crossword() {
  // The right letter for every white square, and each square's number.
  const { solution, numbers } = useMemo(() => {
    const solution = new Map<string, string>();
    const numbers = new Map<string, number>();
    for (const c of CLUES) {
      cellsOf(c).forEach((k, i) => solution.set(k, c.answer[i]));
      numbers.set(key(c.row, c.col), c.n);
    }
    return { solution, numbers };
  }, []);

  const [letters, setLetters] = useState<Record<string, string>>({});
  const [active, setActive] = useState<{ cell: string; dir: Dir }>({ cell: key(2, 3), dir: "across" });
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});
  // Set while we move the focus ourselves, so onFocus keeps our direction.
  const moving = useRef(false);

  const clueAt = (cell: string, dir: Dir) => CLUES.find((c) => c.dir === dir && cellsOf(c).includes(cell));
  const activeClue = clueAt(active.cell, active.dir) ?? clueAt(active.cell, active.dir === "across" ? "down" : "across");
  const activeCells = new Set(activeClue ? cellsOf(activeClue) : []);
  const isRight = (c: Clue) => cellsOf(c).every((k) => letters[k] === solution.get(k));
  const solved = CLUES.every(isRight);

  const focus = (cell: string, dir: Dir) => {
    setActive({ cell, dir: clueAt(cell, dir) ? dir : dir === "across" ? "down" : "across" });
    moving.current = true;
    inputs.current[cell]?.focus();
    moving.current = false;
  };

  const step = (cell: string, dir: Dir, by: number) => {
    const [r, c] = cell.split(",").map(Number);
    let nr = r;
    let nc = c;
    // Jump over black squares to the next white one in that direction.
    for (let i = 0; i < Math.max(ROWS, COLS); i++) {
      if (dir === "across") nc += by;
      else nr += by;
      if (nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS) return null;
      if (solution.has(key(nr, nc))) return key(nr, nc);
    }
    return null;
  };

  const write = (cell: string, ch: string) => {
    const next = { ...letters, [cell]: ch };
    setLetters(next);
    setChecked(false);
    if (CLUES.every((c) => cellsOf(c).every((k) => next[k] === solution.get(k)))) {
      track("crossword_solved", { revealed });
    }
  };

  const onKey = (cell: string) => (e: KeyboardEvent<HTMLInputElement>) => {
    const arrows: Record<string, [Dir, number]> = {
      ArrowRight: ["across", 1],
      ArrowLeft: ["across", -1],
      ArrowDown: ["down", 1],
      ArrowUp: ["down", -1],
    };
    if (arrows[e.key]) {
      e.preventDefault();
      const [dir, by] = arrows[e.key];
      const to = step(cell, dir, by);
      if (to) focus(to, dir);
      return;
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      if (letters[cell]) return write(cell, "");
      const back = activeCells.has(step(cell, active.dir, -1) ?? "") ? step(cell, active.dir, -1) : null;
      if (back) {
        write(back, "");
        focus(back, active.dir);
      }
      return;
    }
    if (/^[a-z]$/i.test(e.key) && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      write(cell, e.key.toUpperCase());
      const to = step(cell, active.dir, 1);
      if (to && activeCells.has(to)) focus(to, active.dir);
    }
  };

  const reveal = () => {
    setLetters(Object.fromEntries(solution));
    setRevealed(true);
    track("crossword_revealed");
  };

  const cell = "clamp(26px, 7.4vw, 42px)";

  return (
    <div className="ks-xw" data-solved={solved ? "1" : undefined}>
      <div className="ks-xw-grid-wrap">
        <div
          className="ks-xw-grid"
          role="grid"
          aria-label="Crossword"
          style={{ gridTemplateColumns: `repeat(${COLS}, ${cell})`, gridTemplateRows: `repeat(${ROWS}, ${cell})` }}
        >
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const r = Math.floor(i / COLS);
            const c = i % COLS;
            const k = key(r, c);
            if (!solution.has(k)) return <span key={k} className="ks-xw-void" />;
            const wrong = checked && letters[k] && letters[k] !== solution.get(k);
            const inked = CLUES.some((cl) => cellsOf(cl).includes(k) && isRight(cl));
            return (
              <label
                key={k}
                className="ks-xw-cell"
                data-active={k === active.cell ? "1" : undefined}
                data-word={activeCells.has(k) ? "1" : undefined}
                data-inked={inked ? "1" : undefined}
                data-wrong={wrong ? "1" : undefined}
                onMouseDown={(e) => {
                  // A second click on the same square turns the direction.
                  if (k === active.cell) {
                    e.preventDefault();
                    focus(k, active.dir === "across" ? "down" : "across");
                  }
                }}
              >
                {numbers.has(k) && <span className="ks-xw-num">{numbers.get(k)}</span>}
                <input
                  ref={(el) => (inputs.current[k] = el)}
                  value={letters[k] ?? ""}
                  onChange={(e) => {
                    // Phones type through onChange rather than keydown.
                    const ch = e.target.value.slice(-1).toUpperCase();
                    if (!/^[A-Z]?$/.test(ch)) return;
                    write(k, ch);
                    const to = ch ? step(k, active.dir, 1) : null;
                    if (to && activeCells.has(to)) focus(to, active.dir);
                  }}
                  onKeyDown={onKey(k)}
                  onFocus={() =>
                    !moving.current &&
                    k !== active.cell &&
                    setActive({ cell: k, dir: clueAt(k, active.dir) ? active.dir : active.dir === "across" ? "down" : "across" })
                  }
                  maxLength={2}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  aria-label={`Row ${r + 1}, column ${c + 1}`}
                />
              </label>
            );
          })}
        </div>
        {solved && (
          <div className="ks-xw-stamp" aria-hidden="true">
            {revealed ? "Revealed" : "Solved"}
          </div>
        )}
      </div>

      <div className="ks-xw-side">
        {(["across", "down"] as Dir[]).map((dir) => (
          <div key={dir} style={{ marginBottom: 16 }}>
            <div style={{ ...kicker, borderBottom: "1px solid var(--ink)", paddingBottom: 7, marginBottom: 8 }}>{dir}</div>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {CLUES.filter((c) => c.dir === dir).map((c) => (
                <li key={`${c.n}${dir}`}>
                  <button
                    type="button"
                    className="ks-xw-clue"
                    data-active={activeClue === c ? "1" : undefined}
                    data-done={isRight(c) ? "1" : undefined}
                    onClick={() => focus(key(c.row, c.col), dir)}
                  >
                    <b>{c.n}</b> {c.clue}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}

        {solved ? (
          <div className="ks-xw-done" role="status">
            <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
              {revealed ? "Answers in tomorrow’s edition." : "Puzzle solved."}
            </div>
            <p style={{ margin: "6px 0 10px", fontSize: 15, lineHeight: 1.5, color: "var(--body)" }}>
              {revealed
                ? "No shame in peeking. The setter is still available for hire."
                : "You know the tools as well as he does. The setter is available for hire."}
            </p>
            <Link href="/contact" className="ks-xw-btn" data-primary="1" style={{ textDecoration: "none" }}>
              Hire the setter &rarr;
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" className="ks-xw-btn" onClick={() => setChecked(true)}>
              Check
            </button>
            <button type="button" className="ks-xw-btn" onClick={reveal}>
              Reveal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
