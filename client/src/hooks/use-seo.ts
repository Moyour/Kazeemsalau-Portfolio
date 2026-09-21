import { useEffect } from "react";
import { useLocation } from "wouter";
import { seoData, type SEOData } from "@/lib/seo-data";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function setMetaTag(
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

export function useSEO(path?: string) {
  const [location] = useLocation();
  const route = path ?? location;

  useEffect(() => {
    const data: SEOData | undefined = seoData[route];
    if (!data) return;

    document.title = data.title;

    setMetaTag("name", "description", data.description);
    setMetaTag("name", "title", data.title);

    setMetaTag("property", "og:title", data.title);
    setMetaTag("property", "og:description", data.description);
    setMetaTag("property", "og:url", data.url);
    if (data.image) {
      setMetaTag("property", "og:image", data.image);
      setMetaTag("property", "og:image:secure_url", data.image);
    }
    if (data.imageAlt) {
      setMetaTag("property", "og:image:alt", data.imageAlt);
    }

    setMetaTag("property", "twitter:title", data.title);
    setMetaTag("property", "twitter:description", data.description);
    setMetaTag("property", "twitter:url", data.url);
    if (data.image) {
      setMetaTag("property", "twitter:image", data.image);
    }

    setCanonical(data.url);

    // GA4 page_view on route change
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_title: data.title,
        page_location: data.url,
      });
    }
  }, [route]);
}
