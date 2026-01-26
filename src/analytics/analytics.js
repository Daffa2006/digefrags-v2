import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Inisialisasi GA sekali di root
export function initGA() {
  if (!MEASUREMENT_ID) {
    console.warn("VITE_GA_MEASUREMENT_ID not set");
    return;
  }
  ReactGA.initialize(MEASUREMENT_ID);
}

// Pageview setiap route change
export function sendPageView(path) {
  if (!MEASUREMENT_ID) return;
  ReactGA.send({ hitType: "pageview", page: path });
}

// Event custom
export function trackEvent(name, params = {}) {
  if (!MEASUREMENT_ID) return;
  ReactGA.event({
    category: params.category || "engagement",
    action: name,
    label: params.label,
    value: params.value,
    ...params,
  });
}
