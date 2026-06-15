declare const gtag: (...args: unknown[]) => void;

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || typeof gtag === "undefined") return;
  gtag("event", eventName, params);
}
