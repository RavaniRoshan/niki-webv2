import { createRoot } from "react-dom/client";
import { DitheredFooter, type FooterColumn, type FooterSocial } from "@/components/ui/dithered-footer";
import "./index.css";

const nikiColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Sandboxes", href: "/explore" },
      { label: "Cloud & Pricing", href: "/pricing" },
      { label: "Benchmarks", href: "/analyze" },
      { label: "Changelog", href: "/changelog" }
    ]
  },
  {
    title: "Tools & Integrations",
    links: [
      { label: "CLI & Daemon", href: "/extension" },
      { label: "Workflow Canvas", href: "/canvas" },
      { label: "MCP Server", href: "/mcp" },
      { label: "Account Settings", href: "/settings/account" }
    ]
  },
  {
    title: "Developers",
    links: [
      { label: "GitHub Repository", href: "https://github.com/RavaniRoshan/niki" },
      { label: "Rust Runtime", href: "https://github.com/RavaniRoshan/niki" },
      { label: "Docker Recipes", href: "/explore" },
      { label: "Benchmark Suite", href: "/analyze" }
    ]
  }
];

const nikiSocials: FooterSocial[] = [
  {
    label: "GitHub",
    href: "https://github.com/RavaniRoshan/niki",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5" />
      </svg>
    )
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }
];

export function mountDitheredFooter() {
  const mountPoints = document.querySelectorAll(".site-footer, .site-footer-mount");
  mountPoints.forEach((mountPoint) => {
    // Avoid double mounting
    if (mountPoint.hasAttribute("data-dithered-mounted")) return;
    mountPoint.setAttribute("data-dithered-mounted", "true");

    const container = document.createElement("div");
    container.className = "dithered-footer-wrapper";
    mountPoint.replaceWith(container);

    const root = createRoot(container);
    root.render(
      <DitheredFooter
        brand="Niki"
        brandHref="/"
        tagline="Hermetic multi-agent coding system built in Rust. Isolate autonomous agents inside throwaway Docker sandboxes."
        columns={nikiColumns}
        socials={nikiSocials}
        legal={[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" }
        ]}
        copyright={`© ${new Date().getFullYear()} Niki OSS · RavaniRoshan/niki`}
        status={{ label: "Sandboxes Operational", href: "/analyze" }}
        accent="#ff2fd6"
        onSubscribe={(email) => {
          return new Promise((resolve) => {
            setTimeout(resolve, 600);
          });
        }}
      />
    );
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountDitheredFooter);
  } else {
    mountDitheredFooter();
  }
}
