import { GA_MEASUREMENT_ID } from "../config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pagePath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base && path.startsWith(base)) {
    return path.slice(base.length) || "/";
  }
  return path || "/";
}

export function trackPageView(pathname: string, search = "") {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;

  const page_path = pagePath(pathname) + search;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
