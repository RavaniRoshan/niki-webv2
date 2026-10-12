import { createRoot } from "react-dom/client";
import { BentoFeaturesSection } from "@/components/ui/bento-features";

export function mountBentoFeatures() {
  const mountPoint = document.getElementById("bento-features-mount");
  if (mountPoint && !mountPoint.hasAttribute("data-bento-mounted")) {
    mountPoint.setAttribute("data-bento-mounted", "true");
    const root = createRoot(mountPoint);
    root.render(<BentoFeaturesSection />);
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountBentoFeatures);
  } else {
    mountBentoFeatures();
  }
}
