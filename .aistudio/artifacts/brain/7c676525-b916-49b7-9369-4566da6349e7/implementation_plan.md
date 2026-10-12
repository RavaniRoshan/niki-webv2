# Niki Landing Page Refactoring: Hero Fluid Canvas & Asymmetric Bento Architecture

Refactor Niki's landing page into a high-grade, cohesive developer tools experience: replacing the static SVG hero backdrop with an obsidian-blended fluid ripple canvas, consolidating repetitive boxy sections into an asymmetric Bento grid with interactive preview cards, removing all audio controls and third-party library naming, and establishing strict horizontal symmetry and rhythmic vertical spacing.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were aligned via user clarifications and design guidelines:

- **Hero Fluid Canvas**: Replace the SVG topographic graphic with the user-provided sculpted fluid wave texture (`alisa-wong-Z0mwx0RgyKQ-unsplash.jpg`), styled with a dark obsidian blend (`#09090b` color-dodge / luminance mask) and subtle neon matrix highlights to preserve crisp terminal window contrast while delivering organic fluid depth.
- **Brand Purity & Zero Audio**: Excised all third-party UI library naming (e.g. Space UI, @usespaceui) across the entire codebase and UI copy. Remove all terminal audio toggles and sound buttons.
- **Surgical Slop Pruning**: Completely remove the bloated sections quoted by the user (redundant repo analyzer clone, disconnected chat/MCP mocks, raw avatar generator playground, duplicated marketing paragraphs, and noisy unverified text blocks).
- **Asymmetric Bento Grid Feature Section**: Replace the rigid, boxy feature cards with an asymmetric Bento architecture featuring marquee hero cards, live interactive code previews, container telemetry metrics, and verifiable Git diff inspection.
- **Symmetrical Layout Math**: Standardize all sections on a centered $1200\text{px}$ content boundary with equal left/right gutter padding ($24\text{px}$ mobile, $32\text{px}$ tablet, $48\text{px}$ desktop) and rhythmic $96\text{px}$–$120\text{px}$ vertical section spacing.

---

## 1. Overview & Core Concept

- **What It Delivers**: A streamlined, high-craft developer landing page for **Niki**, the hermetic multi-agent coding system built in Rust. Demonstrates real Docker sandbox isolation, automated cargo testing, and zero-leakage Git branch generation without AI marketing slop.
- **Target Audience**: Infrastructure leads, staff engineers, and systems developers seeking deterministic AI agents running in throwaway sandboxes rather than uncontained host environments.
- **Core Value**: Transforms fragmented, boxy sections into an intentional story:
  $$\text{Hero (Fluid Canvas & Terminal)} \;\longrightarrow\; \text{Asymmetric Bento Features} \;\longrightarrow\; \text{Live Architecture / Sandboxes} \;\longrightarrow\; \text{Pricing & Tiers} \;\longrightarrow\; \text{Dithered Footer}$$

---

## 2. User Experience & Visual Design

### A. Hero Section with Obsidian Fluid Wave Canvas
- **Background Canvas**: The sculpted fluid water ripple asset will be embedded as a responsive high-fidelity canvas behind the terminal window, enhanced with:
  - Deep obsidian gradient overlay (`linear-gradient(to bottom, rgba(9,9,11,0.6) 0%, rgba(9,9,11,0.95) 100%)`)
  - Radial luminous glow behind the terminal window (`rgba(16, 185, 129, 0.08)`)
  - Crisp border stroke (`border border-white/10`) and subtle top-edge ambient highlight
- **Terminal Simulator**:
  - Live animated typing: `niki run "Implement rate-limiter middleware" --hermetic`
  - Zero audio buttons or sound toggles (completely stripped out)
  - Real-time telemetry readouts: Docker container status, memory cgroup limit ($2\text{GB}$), zero-egress network enforcement, and test pass/fail output.

### B. Asymmetric Bento Grid Feature Architecture
Consolidates the previous 6+ boxy feature sections into an asymmetric Bento grid with high visual rhythm:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  MARQUEE BENTO CARD (Span 2 cols): Hermetic Docker Sandbox Orchestration               │
│  - Interactive runtime tab switcher (Rust 1.80 · Node 22 · Python 3.12 · Go 1.23)      │
│  - Live container execution simulator with real-time stdout streaming                  │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│  CARD B: Automated Rust AST Semantic Review│  CARD C: Zero-Egress Network Isolation     │
│  - Interactive before/after Git diff viewer│  - cgroup v2 RAM ceiling & packet blocking │
│  - Verified type checks & clippy validation│  - Hardware-level socket firewall         │
├───────────────────────────────────────────┴────────────────────────────────────────────┤
│  CARD D (Span 2 cols): Spec-Driven Execution & Ephemeral Workspace Lifecycle           │
│  - Interactive Markdown ADR / Spec tab                                                 │
│  - Instant container destroy & clean branch pull request generator                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### C. Layout Symmetry & Spatial Rhythm
- **Global Container Constraint**: All sections wrapped in `.container-balanced` with `max-width: 1200px; margin: 0 auto; padding: 0 24px;`.
- **Vertical Spacing Hierarchy**:
  - Hero to Bento: $96\text{px}$
  - Bento to Architecture: $112\text{px}$
  - Architecture to Pricing: $112\text{px}$
  - Pricing to Dithered Footer: $96\text{px}$
- **Anti-Slop Discipline**:
  - No static pill capsules for metadata — quiet monospace inline text separated by `·`.
  - Zero purple gradient cards or generic 1px border clichés.
  - Buttons follow the $2\times$ horizontal-to-vertical padding math (`py-2.5 px-5`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Complete excision of bloated/slop sections**
  - *Chosen Approach*: Remove the redundant manual repository analyzer clone, the disconnected MCP chat mockup, the raw avatar playground, and repetitive marketing blocks.
  - *Why*: Eliminates cognitive clutter, improves page load time and scroll coherence, and focuses the user on Niki's core capability: autonomous, hermetic coding agents.
  - *Alternatives Considered*: Hiding them in accordion tabs (rejected: still creates dead weight and noise).

- **Decision 2: Elimination of third-party library naming**
  - *Chosen Approach*: Cleanse all mentions of "Space UI", "spaceui", and "@usespaceui" across HTML, React components, and CSS. The avatar and slider primitives will be branded purely as Niki's native design system (`NikiAvatar`, `SlideToConfirm`, `HermeticChecklist`).
  - *Why*: Upholds commercial product integrity and brand professionalism.

- **Decision 3: Fluid image backdrop integration**
  - *Chosen Approach*: Host the fluid ripple texture in `/assets/img/hero-fluid-canvas.jpg`, styled with an SVG/CSS composite filter that darkens shadows to deep obsidian `#09090b` while preserving luminous specular highlights.
  - *Why*: Delivers high visual craft without washing out high-contrast code legibility in the terminal mockup.

---

## 4. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                              LANDING PAGE LAYOUT                               │
│                                                                                │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ 1. Header & Navigation (Logo · Sandboxes · Pricing · Docs · Install CLI) │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                         │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ 2. Hero Section                                                          │  │
│  │    - Headline & Value Proposition                                        │  │
│  │    - Obsidian Fluid Canvas Backdrop (/assets/img/hero-fluid-canvas.jpg)  │  │
│  │    - Terminal Window Simulator (Live Typing · Container Telemetry)       │  │
│  │    - (Zero Audio Controls)                                               │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                         │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ 3. Asymmetric Bento Feature Grid (#bento-features-mount)                 │  │
│  │    - Marquee Sandbox Runner Card (Live Runtime Selector & Logs)          │  │
│  │    - AST Semantic Review Card (Interactive Diff Inspector)               │  │
│  │    - Zero-Egress Network Isolation Card (cgroup v2 & Firewall Specs)     │  │
│  │    - Spec-Driven Execution Card (ADR Markdown to Git PR Pipeline)        │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                         │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ 4. Deployment Architecture (Local CLI · Cloud MicroVM · Enterprise VPC)  │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                         │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ 5. Membership & Pricing Tiers (Open Source · Cloud Pro · Enterprise)     │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                         │
│  ┌──────────────────────────────────────────────────────────────────────────┐  │
│  │ 6. Dithered Footer (Dot Matrix Wave · Newsletter · Legal & Status)      │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────┘
```

### Component & File Strategy
1. **Fluid Canvas Asset**: Save the uploaded image as `/assets/img/hero-fluid-canvas.jpg` and integrate into `.hero-landscape-wrap` with obsidian blending.
2. **Audio Stripping**: Remove any remaining audio references, sound triggers, or web audio hooks.
3. **Copy Cleansing**: Global audit replacing any "Space UI" or external library copy with native Niki terminology.
4. **Bento Grid Component**: Create `/components/ui/bento-features.tsx` and mount into `index.html` via `src/bento-mount.tsx`.
5. **Page Layout Harmonization**: Update `index.html` and `assets/css/main.css` to enforce symmetric margins, consistent gap tokens, and remove all marked slop sections.
