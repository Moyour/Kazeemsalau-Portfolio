// Mai Shara's paper artifacts for the Living Paper case study: one for
// each step of the process. Every label comes from the case study.

export function SurveySheet() {
  return (
    <div className="lp-doc">
      <b>Survey &middot; residents &amp; offices</b>
      {["Pick-ups delayed?", "Blocked drainage?", "Odour from waste?", "Estimated bills?"].map((q) => (
        <span key={q} className="lp-tick-row">
          <i aria-hidden="true">&#10003;</i>
          {q}
        </span>
      ))}
    </div>
  );
}

export function EmpathyMap() {
  return (
    <div className="lp-empathy">
      {["Says", "Thinks", "Does", "Feels"].map((q) => (
        <span key={q}>{q}</span>
      ))}
      <b>Adeola</b>
    </div>
  );
}

export function FlowSheet() {
  return (
    <div className="lp-flows">
      {["Schedule pick-up", "Recycle", "Report"].map((f) => (
        <div key={f}>
          <span>{f}</span>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export function PrototypePhone() {
  return (
    <div className="lp-phone">
      <img src="/images/mai-shara/home.jpg" alt="" loading="lazy" />
    </div>
  );
}
