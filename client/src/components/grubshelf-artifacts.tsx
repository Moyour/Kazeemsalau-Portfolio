import { PopUp, InkCheck } from "@/components/living-paper";

// GrubShelf's paper artifacts for the Living Paper case study: things you'd
// find on the designer's table, each standing up off the page as the
// section that needs it arrives. Every detail comes from the case study.

// 01 The problem: the evidence on the table.
export function ProblemEvidence() {
  return (
    <div className="lp-table">
      <PopUp delay={0} tilt={-3} className="lp-table-receipt">
        <div className="lp-receipt">
          <b>One week, two shops</b>
          <div className="lp-receipt-shop">Supermarket</div>
          <div><span>Chicken thighs</span><span>4.50</span></div>
          <div><span>Spinach</span><span>1.50</span></div>
          <div><span>Rice</span><span>2.20</span></div>
          <div className="lp-receipt-shop">Afro shop</div>
          <div><span>Egusi seeds</span><span>3.50</span></div>
          <div><span>Pounded yam</span><span>4.00</span></div>
          <div><span>Palm oil</span><span>4.50</span></div>
          <div className="lp-receipt-total"><span>Planners see</span><span>one shop</span></div>
          <small>Sample prices</small>
        </div>
      </PopUp>
      <PopUp delay={0.15} tilt={2.5}>
        <div className="lp-note">
          <b>Pot of egusi</b>
          <span>Mon &middot; Tue &middot; Wed</span>
          <em>Cooked once. Eaten over days, with different sides.</em>
        </div>
      </PopUp>
      <PopUp delay={0.3} tilt={-1.5}>
        <div className="lp-card">
          <span className="lp-card-kicker">The rule I set</span>
          <b>Meals exist only to feed the list and give it a price.</b>
          <span>If a feature doesn&rsquo;t do one of those, it&rsquo;s out.</span>
        </div>
      </PopUp>
    </div>
  );
}

// 02 How I worked: one artifact over each step.
export function SpecSheet() {
  return (
    <div className="lp-doc">
      <b>PRD &middot; Meals Lite</b>
      <span className="lp-doc-h">Principles</span>
      <i style={{ width: "92%" }} />
      <i style={{ width: "78%" }} />
      <span className="lp-doc-h">Edge cases</span>
      <i style={{ width: "86%" }} />
      <i style={{ width: "64%" }} />
      <span className="lp-doc-h">Won&rsquo;t build</span>
      <s>Recipes</s>
      <s>Calendars</s>
      <s>Calorie counting</s>
    </div>
  );
}

export function PrototypeSheet() {
  const screens = ["choose-meal.jpg", "add-meal.jpg", "cook-pot.jpg", "day-v3.jpg", "dark-shop.jpg", "account.jpg"];
  return (
    <div className="lp-proto">
      <b>53 screens</b>
      <div>
        {screens.map((s) => (
          <img key={s} src={`/images/grubshelf-screens/${s}`} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export function CodeCard() {
  return (
    <pre className="lp-code" aria-hidden="true">
      <span className="k">struct</span> WeekView: <span className="t">View</span> {"{"}
      {"\n  "}
      <span className="k">var</span> body: <span className="k">some</span> <span className="t">View</span> {"{"}
      {"\n    "}PlanList(week)
      {"\n      "}.shops(.split)
      {"\n  }"}
      {"\n}"}
    </pre>
  );
}

export function FrictionNote() {
  return (
    <div className="lp-note lp-note-list">
      <b>Friction list</b>
      <s>Glass cards, hard to read</s>
      <span>&rarr; solid cards</span>
      <span>&rarr; a default on every choice</span>
    </div>
  );
}

// 05 Shipping: the checklist written after the rejection.
export function ReviewChecklist() {
  return (
    <PopUp>
      <div className="lp-checklist">
        <div className="lp-checklist-head">
          <b>App Review checklist</b>
          <span className="lp-stamp">After 4.0</span>
        </div>
        <ul>
          <InkCheck>Never re-ask for what Sign in with Apple gives you</InkCheck>
          <InkCheck>Never hard-code prices</InkCheck>
          <InkCheck>Never advertise unbuilt features on the paywall</InkCheck>
          <InkCheck>Feature freeze: one stable build, one final submission</InkCheck>
        </ul>
      </div>
    </PopUp>
  );
}
