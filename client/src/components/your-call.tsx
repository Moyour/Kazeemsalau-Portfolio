import { useState } from "react";
import { track } from "@/lib/track";

// "Your call": predict, then reveal. One decision at a time: the reader
// picks what they'd do, then sees what was done and why, in a line.
// Committing to an answer first is what makes the reason stick. The
// reveals use the case study's own reasoning; the other options are
// believable alternatives.

export type Call = {
  question: string;
  options: string[];
  // Which option was actually taken, and why, in a sentence.
  chose: number;
  why: string;
};

export default function YourCalls({ calls }: { calls: Call[] }) {
  const [at, setAt] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const call = calls[at];
  const picked = picks[at];
  const answered = picked !== undefined;
  const same = Object.entries(picks).filter(([i, p]) => calls[+i].chose === p).length;

  const pick = (i: number) => {
    setPicks((p) => ({ ...p, [at]: i }));
    track("your_call", { question: call.question, same: i === call.chose });
  };

  return (
    <div className="ks-yc">
      <div className="ks-yc-bar">
        <span className="ks-yc-kicker">Your call</span>
        <span className="ks-yc-count">
          {at + 1} / {calls.length}
          {Object.keys(picks).length > 0 && <> &middot; same as me on {same}</>}
        </span>
      </div>

      <div key={at} className="ks-yc-body">
        <p className="ks-yc-q">{call.question}</p>
        <ol className="ks-yc-options">
          {call.options.map((o, i) => (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => pick(i)}
                data-mine={answered && i === call.chose ? "1" : undefined}
                data-faded={answered && i !== call.chose && i !== picked ? "1" : undefined}
              >
                <span>{o}</span>
                {answered && i === picked && <em>you</em>}
                {answered && i === call.chose && <em>me</em>}
              </button>
            </li>
          ))}
        </ol>
        {answered && <p className="ks-yc-why">{call.why}</p>}
      </div>

      <div className="ks-yc-nav">
        <button type="button" disabled={at === 0} onClick={() => setAt(at - 1)}>
          &larr; Previous
        </button>
        {!answered ? (
          <button type="button" onClick={() => setPicks((p) => ({ ...p, [at]: -1 }))}>
            Just tell me
          </button>
        ) : (
          <button type="button" disabled={at === calls.length - 1} onClick={() => setAt(at + 1)}>
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
