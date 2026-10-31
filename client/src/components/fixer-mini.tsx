import { useState } from "react";
import { track } from "@/lib/track";

// "Your assignment": a three-decision taste of The Fixer, played on the
// page before the case study is read. It works the way the course does:
// the reader is handed a case, makes calls, and the consequences arrive
// later rather than straight away. At the end the feedback explains the
// reasoning behind each call instead of marking it right or wrong, and
// the branches not taken can be opened. Written for this page in the
// course's style; it isn't the course's own content.

type Choice = {
  label: string;
  // Stamped on the case file when chosen.
  stamp: string;
  // What it does to the agency, revealed only at the end.
  trust: number;
  risk: number;
  load: number;
  why: string;
};

type Step = { scene: string; speaker?: string; line?: string; ask: string; choices: Choice[] };

const STEPS: Step[] = [
  {
    scene: "Monday, 9:12. The front counter.",
    speaker: "Mrs Adeyemi",
    line: "I sent my renewal three weeks ago. Your letter says it's late and now my support stops on Friday. I did everything you asked.",
    ask: "How do you open?",
    choices: [
      {
        label: "Explain the policy: late renewals go to the back of the queue.",
        stamp: "Quoted policy",
        trust: -2,
        risk: 0,
        load: 1,
        why: "Accurate, and it lands as a wall. Opening with the rule tells her the rule matters more than her case, so she stops giving you information and starts building a complaint.",
      },
      {
        label: "Acknowledge it, and ask to see what she sent and when.",
        stamp: "Listened first",
        trust: 2,
        risk: -1,
        load: 0,
        why: "You haven't promised anything, but you've started finding out whose delay this is. That's the fact the policy turns on, and you only get it if she keeps talking.",
      },
      {
        label: "Tell her not to worry, you'll sort it, and take the file.",
        stamp: "Promised a fix",
        trust: 1,
        risk: 2,
        load: 1,
        why: "It calms the room and commits the agency to an outcome you don't know you can deliver yet. The promise becomes the thing she remembers if it falls through.",
      },
    ],
  },
  {
    scene: "Monday, 9:20. The file.",
    line: "Her renewal was received 19 days ago and sat unopened in the post room for 16 of them. The proof of address is missing. Policy allows a late renewal within 14 days if the delay was the agency's.",
    ask: "What do you do with the file?",
    choices: [
      {
        label: "Reject it until the proof of address arrives.",
        stamp: "Rejected",
        trust: -2,
        risk: -1,
        load: 1,
        why: "By the letter it's incomplete. But the lateness is ours, so a rejection now moves our mistake onto her, and her support stops while the paperwork catches up.",
      },
      {
        label: "Accept it as on time, note the post-room delay, and give her 14 days for the document.",
        stamp: "Accepted, noted",
        trust: 2,
        risk: 0,
        load: 0,
        why: "This is the discretion the policy was written for: the delay was the agency's, it's recorded, and the missing document has a deadline. Judgement, with a paper trail.",
      },
      {
        label: "Quietly change the received date so it isn't late.",
        stamp: "Date changed",
        trust: 1,
        risk: 3,
        load: 0,
        why: "She's happy today. The record is now wrong, and the next audit finds a renewal processed against a date that didn't happen. The right outcome, reached the wrong way.",
      },
    ],
  },
  {
    scene: "Friday, 4:45. Your report.",
    line: "Hers is the fourth late renewal this month that started in the post room.",
    ask: "What do you change?",
    choices: [
      {
        label: "Email everyone a reminder of the late-renewal policy.",
        stamp: "Sent a reminder",
        trust: 0,
        risk: 0,
        load: 1,
        why: "Everyone already knows the policy. The cases go wrong at the counter, under pressure, so a reminder changes what people know and not what they do.",
      },
      {
        label: "Add one question to the counter script: whose delay is this?",
        stamp: "Changed the script",
        trust: 1,
        risk: -2,
        load: -1,
        why: "It puts the deciding fact in front of the person deciding, at the moment they decide. Small, cheap, and it's where the judgement actually happens.",
      },
      {
        label: "Leave it. Four cases is bad luck.",
        stamp: "Left it",
        trust: -1,
        risk: 1,
        load: 1,
        why: "Four from one cause is a pattern. Left alone, each one reaches someone's counter as a fresh crisis, and the team pays for it in time and complaints.",
      },
    ],
  },
];

const METERS = [
  { key: "trust", label: "Client trust", good: "up" },
  { key: "risk", label: "Risk to the agency", good: "down" },
  { key: "load", label: "Load on the team", good: "down" },
] as const;

export default function FixerMini({ onPlay }: { onPlay: () => void }) {
  const [picks, setPicks] = useState<number[]>([]);
  const [peek, setPeek] = useState<Record<string, boolean>>({});
  const step = picks.length;
  const done = step === STEPS.length;

  const choose = (i: number) => {
    const next = [...picks, i];
    setPicks(next);
    if (next.length === STEPS.length) track("fixer_mini_done", { path: next.join("") });
  };

  const total = (key: "trust" | "risk" | "load") => picks.reduce((sum, p, s) => sum + STEPS[s].choices[p][key], 0);

  return (
    <div className="ks-fx" aria-live="polite">
      <div className="ks-fx-head">
        <span>Your assignment &middot; Case file 07</span>
        <span>
          {done ? "Closed" : `Decision ${step + 1} of ${STEPS.length}`}
        </span>
      </div>

      {/* The case file: every call so far, stamped. */}
      <div className="ks-fx-file">
        {STEPS.map((s, i) => (
          <div key={i} className="ks-fx-slot" data-state={i < step ? "done" : i === step ? "now" : "next"}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {i < step && <b className="ks-fx-stamp">{s.choices[picks[i]].stamp}</b>}
          </div>
        ))}
      </div>

      {!done ? (
        <div key={step} className="ks-fx-scene">
          <div className="ks-fx-when">{STEPS[step].scene}</div>
          {STEPS[step].line && (
            <blockquote className="ks-fx-line" data-speaker={STEPS[step].speaker ? "1" : undefined}>
              {STEPS[step].speaker && <cite>{STEPS[step].speaker}</cite>}
              {STEPS[step].line}
            </blockquote>
          )}
          <div className="ks-fx-ask">{STEPS[step].ask}</div>
          <div className="ks-fx-choices">
            {STEPS[step].choices.map((c, i) => (
              <button key={i} type="button" className="ks-fx-choice" onClick={() => choose(i)}>
                <span>{String.fromCharCode(65 + i)}</span>
                {c.label}
              </button>
            ))}
          </div>
          <p className="ks-fx-note">There&rsquo;s no score yet. Like the course, the consequences arrive later.</p>
        </div>
      ) : (
        <div className="ks-fx-scene">
          <div className="ks-fx-when">Two weeks later.</div>
          <div className="ks-fx-meters">
            {METERS.map((m) => {
              const v = total(m.key);
              const better = m.good === "up" ? v > 0 : v < 0;
              const worse = m.good === "up" ? v < 0 : v > 0;
              return (
                <div key={m.key} className="ks-fx-meter" data-tone={better ? "good" : worse ? "bad" : "flat"}>
                  <div className="ks-fx-meter-label">{m.label}</div>
                  <div className="ks-fx-meter-track">
                    <span style={{ width: `${Math.min(100, 50 + v * 9)}%` }} />
                  </div>
                  <div className="ks-fx-meter-word">{better ? "Better" : worse ? "Worse" : "No change"}</div>
                </div>
              );
            })}
          </div>

          <div className="ks-fx-why">
            {STEPS.map((s, i) => (
              <div key={i} className="ks-fx-why-item">
                <div className="ks-fx-why-ask">
                  {String(i + 1).padStart(2, "0")} &middot; {s.ask}
                </div>
                <p>
                  <b>You: {s.choices[picks[i]].stamp}.</b> {s.choices[picks[i]].why}
                </p>
                <div className="ks-fx-others">
                  {s.choices.map((c, j) =>
                    j === picks[i] ? null : (
                      <button
                        key={j}
                        type="button"
                        aria-expanded={!!peek[`${i}${j}`]}
                        onClick={() => setPeek((p) => ({ ...p, [`${i}${j}`]: !p[`${i}${j}`] }))}
                      >
                        {peek[`${i}${j}`] ? "−" : "+"} If you&rsquo;d {c.stamp.toLowerCase()}
                      </button>
                    ),
                  )}
                </div>
                {s.choices.map((c, j) =>
                  peek[`${i}${j}`] ? (
                    <p key={j} className="ks-fx-other-why">
                      <b>{c.stamp}:</b> {c.why}
                    </p>
                  ) : null,
                )}
              </div>
            ))}
          </div>

          <div className="ks-fx-end">
            <p>
              That&rsquo;s the course in miniature: judgement under pressure, consequences that arrive late, and feedback
              that explains the reasoning.
            </p>
            <div className="ks-fx-actions">
              <button type="button" className="ks-fx-btn" data-primary="1" onClick={onPlay}>
                &#9654; Play the full course
              </button>
              <button
                type="button"
                className="ks-fx-btn"
                onClick={() => {
                  setPicks([]);
                  setPeek({});
                }}
              >
                Take the case again
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="ks-fx-small">A short taste written for this page, in the course&rsquo;s style.</div>
    </div>
  );
}
