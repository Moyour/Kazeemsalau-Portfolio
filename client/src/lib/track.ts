export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", event, { page_path: window.location.pathname, ...params });
  }
}

// Classifies outbound clicks so every email, CV and profile link is
// reported without wiring each anchor by hand.
export function trackLinkClick(e: MouseEvent) {
  const a = (e.target as Element)?.closest?.("a");
  if (!a) return;
  const href = a.getAttribute("href") || "";
  const label = a.dataset.track || a.textContent?.trim().slice(0, 60);

  if (href.startsWith("mailto:")) track("contact_email_click", { link_text: label });
  else if (href.endsWith(".pdf")) track("cv_download", { link_text: label });
  else if (href.includes("linkedin.com")) track("linkedin_click", { link_text: label });
  else if (href === "/contact") track("hire_cta_click", { link_text: label });
  else if (/^https?:\/\//.test(href)) track("outbound_click", { link_url: href, link_text: label });
}
