// Every reader gets their own edition of the paper: named for the time of
// day on their clock and the city their timezone is in, numbered by how
// many times they've picked it up, and marked as the recruiter's edition
// when they arrive from LinkedIn. Worked out once per page load, in the
// browser only.

export type Edition = {
  // "Morning", "Afternoon", "Evening" or "Late night" on the reader's clock.
  time: string;
  // The reader's city from their timezone, e.g. "London"; "" if unknown.
  city: string;
  // This reader's visit count, counted once per browser session.
  copy: number;
  recruiter: boolean;
};

function timeOfDay(hour: number) {
  if (hour >= 23 || hour < 5) return "Late night";
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function cityFromTimezone() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const place = zone.split("/").pop() ?? "";
    // "Etc/UTC" and friends aren't places.
    if (!place || /^(UTC|GMT|Etc)/i.test(zone)) return "";
    return place.replace(/_/g, " ");
  } catch {
    return "";
  }
}

function countVisit() {
  try {
    let copy = Number(localStorage.getItem("ks-copies")) || 0;
    if (!sessionStorage.getItem("ks-copy-counted")) {
      copy += 1;
      localStorage.setItem("ks-copies", String(copy));
      sessionStorage.setItem("ks-copy-counted", "1");
    }
    return Math.max(copy, 1);
  } catch {
    return 1; // storage unavailable: everyone's first copy
  }
}

function fromLinkedIn() {
  // Links shared on LinkedIn can carry ?utm_source=linkedin, which survives
  // where the referrer is stripped.
  const tagged = /linkedin/i.test(new URLSearchParams(location.search).get("utm_source") ?? "");
  try {
    if (tagged || /linkedin\./i.test(document.referrer)) sessionStorage.setItem("ks-recruiter", "1");
    return sessionStorage.getItem("ks-recruiter") === "1";
  } catch {
    return tagged || /linkedin\./i.test(document.referrer);
  }
}

let cached: Edition | null = null;
export function getEdition(): Edition {
  if (cached) return cached;
  if (typeof window === "undefined") return { time: "Morning", city: "", copy: 1, recruiter: false };
  cached = {
    time: timeOfDay(new Date().getHours()),
    city: cityFromTimezone(),
    copy: countVisit(),
    recruiter: fromLinkedIn(),
  };
  return cached;
}

export function ordinal(n: number) {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
}

// The edition's name for the top of the front page, e.g.
// "London morning edition" or "Recruiter's edition".
export function editionName(e = getEdition()) {
  if (e.recruiter) return "Recruiter's edition";
  const time = e.city ? e.time.toLowerCase() : e.time;
  return `${e.city ? `${e.city} ` : ""}${time} edition`;
}
