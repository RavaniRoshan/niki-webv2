import { createRoot } from "react-dom/client";
import { SpaceSandboxForm } from "@/components/ui/space-form";

export function mountSpaceForm() {
  // 1. Mount into landing page analyzer section
  const sectionMount = document.getElementById("space-form-section-mount");
  if (sectionMount && !sectionMount.hasAttribute("data-form-mounted")) {
    sectionMount.setAttribute("data-form-mounted", "true");
    const root = createRoot(sectionMount);
    root.render(
      <SpaceSandboxForm
        onSuccess={() => {
          console.log("Sandbox launch completed successfully");
        }}
      />
    );
  }

  // 2. Mount into recipe submission modal
  const modalMount = document.getElementById("space-form-modal-mount");
  if (modalMount && !modalMount.hasAttribute("data-form-mounted")) {
    modalMount.setAttribute("data-form-mounted", "true");
    const root = createRoot(modalMount);
    root.render(
      <SpaceSandboxForm
        onSuccess={() => {
          const modal = document.getElementById("submitModal");
          if (modal) {
            setTimeout(() => {
              modal.classList.remove("is-active");
            }, 1200);
          }
        }}
      />
    );
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountSpaceForm);
  } else {
    mountSpaceForm();
  }
}
