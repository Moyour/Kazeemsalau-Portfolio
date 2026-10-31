import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/track";

// "Plan your week": GrubShelf's core loop, playable on the page. Put
// dinners on days and the list builds itself, split by shop, with a
// running total. It runs on the app's own rules, and the first time the
// reader trips one of them the design call behind it is explained: the
// list follows the plan, pots not portions, main items only, two shops.
// It times them against the app's real target, install to a priced week
// in under three minutes. Prices are samples.

type Shop = "Supermarket" | "Afro shop";
type Item = { name: string; shop: Shop; price: number };
type Meal = { id: string; name: string; pot?: boolean; items: Item[]; staples?: string[] };

const MEALS: Meal[] = [
  {
    id: "egusi",
    name: "Egusi & pounded yam",
    pot: true,
    items: [
      { name: "Egusi seeds", shop: "Afro shop", price: 3.5 },
      { name: "Pounded yam flour", shop: "Afro shop", price: 4 },
      { name: "Spinach", shop: "Supermarket", price: 1.5 },
      { name: "Beef", shop: "Supermarket", price: 6 },
    ],
    staples: ["Palm oil", "Crayfish"],
  },
  {
    id: "stew",
    name: "Stew & rice",
    pot: true,
    items: [
      { name: "Chicken thighs", shop: "Supermarket", price: 4.5 },
      { name: "Tomatoes & peppers", shop: "Supermarket", price: 2.6 },
      { name: "Long-grain rice", shop: "Supermarket", price: 2.2 },
    ],
  },
  {
    id: "beans",
    name: "Beans & plantain",
    items: [
      { name: "Honey beans", shop: "Afro shop", price: 3 },
      { name: "Plantain", shop: "Afro shop", price: 2 },
    ],
    staples: ["Palm oil"],
  },
  {
    id: "bolognese",
    name: "Spaghetti bolognese",
    items: [
      { name: "Spaghetti", shop: "Supermarket", price: 0.8 },
      { name: "Beef mince", shop: "Supermarket", price: 3.5 },
      { name: "Tinned tomatoes", shop: "Supermarket", price: 0.9 },
    ],
  },
  {
    id: "yam",
    name: "Yam & egg sauce",
    items: [
      { name: "Yam", shop: "Afro shop", price: 4 },
      { name: "Eggs", shop: "Supermarket", price: 2.1 },
    ],
  },
  {
    id: "fish",
    name: "Fish & chips",
    items: [
      { name: "Fish fillets", shop: "Supermarket", price: 4 },
      { name: "Oven chips", shop: "Supermarket", price: 1.5 },
    ],
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const POT_DAYS = 3;

// The design calls the reader can run into, in the app's own words.
const CALLS = {
  plan: {
    title: "The list follows the plan",
    why: "Only meals actually placed on a day put items on the list, so the list only shows what's really being cooked.",
  },
  regular: {
    title: "Regulars stay off the list",
    why: "Starring a meal as a regular keeps it handy, but it doesn't add a thing to the list until it's on a day.",
  },
  pot: {
    title: "Pots, not portions",
    why: "A pot of egusi or stew is cooked once and eaten over days with different sides. It covers three days and goes on the list once.",
  },
  shops: {
    title: "Two shops, first-class",
    why: "Every item belongs to a shop, supermarket or afro shop, because that's how the households it's for actually shop.",
  },
  staples: {
    title: "Main items only",
    why: "Seasonings are skipped, and staples like palm oil and crayfish are asked about as running low instead of being added every time.",
  },
} as const;
type CallKey = keyof typeof CALLS;

const money = (n: number) => `£${n.toFixed(2)}`;

export default function GrubShelfWeek() {
  // Each day holds a meal, and whether it's the start of a pot or carries on one.
  const [week, setWeek] = useState<({ meal: string; from?: number } | null)[]>(DAYS.map(() => null));
  const [day, setDay] = useState(0);
  const [regulars, setRegulars] = useState<string[]>([]);
  const [lowStaples, setLowStaples] = useState<string[]>([]);
  const [found, setFound] = useState<CallKey[]>([]);
  const [latest, setLatest] = useState<CallKey | null>(null);
  const started = useRef<number | null>(null);
  const [finishedIn, setFinishedIn] = useState<number | null>(null);

  const discover = (key: CallKey) => {
    setLatest(key);
    setFound((f) => (f.includes(key) ? f : [...f, key]));
  };
  const begin = () => {
    if (started.current === null) started.current = performance.now();
  };

  const place = (meal: Meal) => {
    begin();
    setWeek((w) => {
      const next = [...w];
      // Clearing a pot clears all of it.
      const clear = (d: number) => {
        const cell = next[d];
        if (!cell) return;
        const start = cell.from ?? d;
        for (let i = start; i < DAYS.length && (i === start || next[i]?.from === start); i++) next[i] = null;
      };
      clear(day);
      next[day] = { meal: meal.id };
      if (meal.pot) {
        for (let i = 1; i < POT_DAYS && day + i < DAYS.length; i++) {
          clear(day + i);
          next[day + i] = { meal: meal.id, from: day };
        }
      }
      return next;
    });
    discover(meal.pot ? "pot" : "plan");
    // Move on to the next free day, after a pot's last day.
    setDay((d) => Math.min(DAYS.length - 1, d + (meal.pot ? POT_DAYS : 1)));
  };

  const clearDay = (d: number) => {
    setWeek((w) => {
      const next = [...w];
      const start = next[d]?.from ?? d;
      for (let i = start; i < DAYS.length && (i === start || next[i]?.from === start); i++) next[i] = null;
      return next;
    });
    setDay(d);
  };

  // The list: each planned meal once, however many days its pot covers.
  const planned = useMemo(() => [...new Set(week.filter((c) => c && c.from === undefined).map((c) => c!.meal))], [week]);
  const list = useMemo(() => {
    const items = new Map<string, Item>();
    for (const id of planned) for (const it of MEALS.find((m) => m.id === id)!.items) items.set(it.name, it);
    for (const s of lowStaples) items.set(s, { name: s, shop: "Afro shop", price: s === "Palm oil" ? 4.5 : 3 });
    return [...items.values()];
  }, [planned, lowStaples]);
  const staplesAsked = useMemo(
    () => [...new Set(planned.flatMap((id) => MEALS.find((m) => m.id === id)!.staples ?? []))],
    [planned],
  );
  const shops = (["Supermarket", "Afro shop"] as Shop[]).map((shop) => ({ shop, items: list.filter((i) => i.shop === shop) }));
  const total = list.reduce((s, i) => s + i.price, 0);
  const daysCovered = week.filter(Boolean).length;

  useEffect(() => {
    if (shops.every((s) => s.items.length > 0)) discover("shops");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length]);
  useEffect(() => {
    if (staplesAsked.length) discover("staples");
  }, [staplesAsked.length]);
  // A priced week: every dinner planned.
  useEffect(() => {
    if (daysCovered === DAYS.length && finishedIn === null && started.current !== null) {
      const secs = Math.round((performance.now() - started.current) / 1000);
      setFinishedIn(secs);
      track("grubshelf_week_done", { seconds: secs, calls: found.length });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysCovered]);

  const reset = () => {
    setWeek(DAYS.map(() => null));
    setDay(0);
    setLowStaples([]);
    setRegulars([]);
    setFinishedIn(null);
    setLatest(null);
    started.current = null;
  };

  return (
    <div className="ks-gw">
      <div className="ks-gw-plan">
        <div className="ks-gw-label">
          <span>This week &middot; dinners</span>
          <span>Pick a day, then a meal</span>
        </div>
        <div className="ks-gw-days" role="listbox" aria-label="Days of the week">
          {DAYS.map((d, i) => {
            const cell = week[i];
            const meal = cell && MEALS.find((m) => m.id === cell.meal);
            return (
              <button
                key={d}
                type="button"
                role="option"
                aria-selected={day === i}
                className="ks-gw-day"
                data-pot={cell?.from !== undefined ? "1" : undefined}
                data-filled={cell ? "1" : undefined}
                onClick={() => (cell && day === i ? clearDay(i) : setDay(i))}
                title={cell && day === i ? "Click again to clear" : undefined}
              >
                <b>{d}</b>
                <span>{meal ? (cell!.from !== undefined ? `${meal.name.split(" ")[0]} pot` : meal.name) : "—"}</span>
              </button>
            );
          })}
        </div>

        <div className="ks-gw-meals">
          {MEALS.map((m) => {
            const per = m.items.reduce((s, i) => s + i.price, 0) / (m.pot ? POT_DAYS * 2 : 2);
            const starred = regulars.includes(m.id);
            return (
              <div key={m.id} className="ks-gw-meal">
                <button type="button" className="ks-gw-meal-add" onClick={() => place(m)}>
                  <b>{m.name}</b>
                  <span>
                    {m.pot ? "Pot · 3 days · " : ""}~{money(per)} a plate
                  </span>
                </button>
                <button
                  type="button"
                  className="ks-gw-star"
                  aria-pressed={starred}
                  aria-label={`${starred ? "Unstar" : "Star"} ${m.name} as a regular`}
                  onClick={() => {
                    begin();
                    setRegulars((r) => (starred ? r.filter((x) => x !== m.id) : [...r, m.id]));
                    discover("regular");
                  }}
                >
                  {starred ? "★" : "☆"}
                </button>
              </div>
            );
          })}
        </div>

        {/* The design call the reader just ran into. */}
        <div className="ks-gw-call" data-on={latest ? "1" : undefined}>
          {latest ? (
            <div key={latest}>
              <div className="ks-gw-call-head">
                <span>Design call</span>
                <span>
                  {found.length} of {Object.keys(CALLS).length} found
                </span>
              </div>
              <b>{CALLS[latest].title}.</b> {CALLS[latest].why}
            </div>
          ) : (
            <span>Plan a few dinners and the app&rsquo;s design calls will show up here as you run into them.</span>
          )}
        </div>
      </div>

      <div className="ks-gw-list">
        <div className="ks-gw-label">
          <span>Your list</span>
          <span>{money(total)}</span>
        </div>
        {list.length === 0 && !staplesAsked.length ? (
          <p className="ks-gw-empty">Nothing yet. The list builds itself from what&rsquo;s on the week.</p>
        ) : (
          shops.map(({ shop, items }) =>
            items.length ? (
              <div key={shop} className="ks-gw-shop">
                <div className="ks-gw-shop-head">
                  <span>{shop}</span>
                  <span>{money(items.reduce((s, i) => s + i.price, 0))}</span>
                </div>
                {items.map((it) => (
                  <div key={it.name} className="ks-gw-item">
                    <span>{it.name}</span>
                    <span>{money(it.price)}</span>
                  </div>
                ))}
              </div>
            ) : null,
          )
        )}
        {staplesAsked.length > 0 && (
          <div className="ks-gw-low">
            <span>Running low?</span>
            {staplesAsked.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={lowStaples.includes(s)}
                onClick={() => setLowStaples((l) => (l.includes(s) ? l.filter((x) => x !== s) : [...l, s]))}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {finishedIn !== null && (
          <div className="ks-gw-done" role="status">
            <b>Week priced in {finishedIn < 60 ? `${finishedIn}s` : `${Math.floor(finishedIn / 60)}m ${finishedIn % 60}s`}.</b>{" "}
            The app&rsquo;s target is install to a priced week in under three minutes.
            <button type="button" onClick={reset}>
              Plan another week
            </button>
          </div>
        )}
        <div className="ks-gw-small">Sample prices.</div>
      </div>
    </div>
  );
}
