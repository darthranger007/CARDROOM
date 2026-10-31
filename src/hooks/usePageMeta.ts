import { useEffect } from "react";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../config/site";

type PageMeta = {
  title: string;
  description?: string;
  path?: string;
};

export function usePageMeta({ title, description = SITE_DESCRIPTION, path = "" }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", new URL(path, SITE_URL).href, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = new URL(path, SITE_URL).href;

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path]);
}

export function landingTitle() {
  return `Free Business Card Maker — Design & Export PDF | ${SITE_NAME}`;
}
