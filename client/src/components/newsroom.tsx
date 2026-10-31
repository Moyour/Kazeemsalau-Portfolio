import { useEffect, useState } from "react";

// Reading the night edition by lamplight.

const NIGHT_KEY = "ks-night";
const NIGHT_EVENT = "ks-night-change";

function readNight() {
  try {
    return localStorage.getItem(NIGHT_KEY) === "1";
  } catch {
    return false;
  }
}

function setNight(on: boolean) {
  try {
    localStorage.setItem(NIGHT_KEY, on ? "1" : "0");
  } catch {
    /* storage unavailable: lasts for this page only */
  }
  if (on) document.documentElement.dataset.night = "1";
  else delete document.documentElement.dataset.night;
  window.dispatchEvent(new Event(NIGHT_EVENT));
}

// A lamp hanging above the paper. Click it and the room goes dark, with
// the lamp lighting the page from above; click again for the lights.
export function PendantLamp() {
  const [on, setOn] = useState(readNight);
  const [swing, setSwing] = useState(0);
  useEffect(() => {
    const sync = () => setOn(readNight());
    window.addEventListener(NIGHT_EVENT, sync);
    return () => window.removeEventListener(NIGHT_EVENT, sync);
  }, []);
  return (
    <button
      type="button"
      key={swing}
      className="ks-pendant"
      data-swing={swing ? "1" : undefined}
      aria-pressed={on}
      aria-label={on ? "Switch the lamp off" : "Switch the lamp on: night edition"}
      title={on ? "Lights on" : "Night edition"}
      onClick={() => {
        setNight(!on);
        setSwing((n) => n + 1);
      }}
    >
      <svg viewBox="0 0 44 30" width="44" height="30" aria-hidden="true">
        <line x1="22" y1="0" x2="22" y2="11" stroke="#14120F" strokeWidth="1.4" />
        <circle className="ks-pendant-bulb" cx="22" cy="24" r="4.2" />
        <path d="M13 23 L17 12 H27 L31 23 Z" fill="#14120F" />
        <rect x="12" y="22.2" width="20" height="1.6" fill="#C0281B" />
      </svg>
    </button>
  );
}

// The room goes dark around the light falling from the lamp at the top.
export function NightLamp() {
  useEffect(() => {
    if (readNight()) document.documentElement.dataset.night = "1";
  }, []);
  return <div className="ks-lamp" aria-hidden="true" />;
}
