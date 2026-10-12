import { createRoot } from "react-dom/client";
import { ContributorActivitySection } from "@/components/ui/contributor-activity";
import { generateNikiAvatarSvg, NIKI_TERMINAL_PALETTE } from "@/components/ui/space-avatar";
import type { AvatarVariant } from "@usespaceui/avatars";

const TESTIMONIAL_AVATARS: Record<string, { seed: string; variant: AvatarVariant; name: string }> = {
  "01 / 04": { seed: "Diego", variant: "glitch", name: "Diego" },
  "02 / 04": { seed: "@pritamsen-infra", variant: "bot", name: "Pritam" },
  "03 / 04": { seed: "@RavaniRoshan", variant: "singularity", name: "Roshan Ravani" },
  "04 / 04": { seed: "task-sandbox-cgroup-88", variant: "invader", name: "Sebastian" }
};

export function mountSpaceAvatars() {
  // 1. Mount Contributor Activity Section
  const mountContainer = document.getElementById("contributor-activity-mount");
  if (mountContainer && !mountContainer.hasAttribute("data-avatar-mounted")) {
    mountContainer.setAttribute("data-avatar-mounted", "true");
    const root = createRoot(mountContainer);
    root.render(<ContributorActivitySection />);
  }

  // 2. Enhance Testimonial Carousel Avatar
  const testimonialCarousel = document.querySelector(".testimonial-box");
  if (testimonialCarousel) {
    const avatarEl = testimonialCarousel.querySelector(".testimonial-avatar") as HTMLElement | null;
    const counterEl = testimonialCarousel.querySelector(".testimonial-counter") as HTMLElement | null;

    const updateAvatar = () => {
      if (!avatarEl) return;
      const counterText = counterEl?.textContent?.trim() || "01 / 04";
      const config = TESTIMONIAL_AVATARS[counterText] || { seed: "Diego", variant: "glitch", name: "Diego" };

      const svgString = generateNikiAvatarSvg(config.seed, {
        variant: config.variant,
        size: 44,
        circle: true,
        colors: NIKI_TERMINAL_PALETTE
      });

      avatarEl.innerHTML = svgString;
      avatarEl.style.display = "inline-flex";
      avatarEl.style.alignItems = "center";
      avatarEl.style.justifyContent = "center";
      avatarEl.style.padding = "0";
      avatarEl.style.overflow = "hidden";
      avatarEl.style.borderRadius = "9999px";
      avatarEl.style.border = "1px solid rgba(255, 47, 214, 0.35)";
      avatarEl.style.background = "#09090b";
      avatarEl.setAttribute("title", `Procedural avatar: seed "${config.seed}" (${config.variant})`);
    };

    // Initial render
    updateAvatar();

    // Listen to quote navigation clicks and custom event
    avatarEl?.addEventListener("update-avatar", (e: any) => {
      const detail = e.detail;
      if (detail && detail.seed) {
        const svgString = generateNikiAvatarSvg(detail.seed, {
          variant: detail.variant || "glitch",
          size: 44,
          circle: true,
          colors: NIKI_TERMINAL_PALETTE
        });
        if (avatarEl) {
          avatarEl.innerHTML = svgString;
          avatarEl.setAttribute("title", `Procedural avatar: seed "${detail.seed}" (${detail.variant})`);
        }
      } else {
        updateAvatar();
      }
    });

    const prevBtn = testimonialCarousel.querySelector(".prev-quote-btn");
    const nextBtn = testimonialCarousel.querySelector(".next-quote-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => setTimeout(updateAvatar, 50));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => setTimeout(updateAvatar, 50));
    }

    // Observer in case of timer auto-advance
    if (counterEl) {
      const observer = new MutationObserver(() => updateAvatar());
      observer.observe(counterEl, { childList: true, characterData: true, subtree: true });
    }
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountSpaceAvatars);
  } else {
    mountSpaceAvatars();
  }
}
