import { useEffect } from "react";
import { useLocation } from "react-router";
import { sendPageView } from "./analytics";

export default function Analytics() {
  const location = useLocation();

  // Kirim pageview saat route berubah
  useEffect(() => {
    sendPageView(location.pathname + location.search);
  }, [location]);

  return null; // tidak render UI
}
