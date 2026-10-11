# Niki — Hermetic Multi-Agent Coding System Website Transformation

Transform the multi-page web platform from the inspirational bookmarking tool ("Stash") into the official product marketing, demonstration, and commercialization platform for **Niki** (`https://github.com/RavaniRoshan/niki`) — a hermetic multi-agent coding system built in Rust where isolated AI agents plan, code, test, and review within Docker sandboxes, producing clean, reviewable Git branches.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and aesthetic choices were confirmed via Phase 1 clarifying questions and govern this plan:

- **Confirmed Decision 1 (Brand & Style)**: Brand name is **Niki** with a dark terminal engineering aesthetic, Rust-inspired precision, high-contrast dark surfaces (`#09090b`), and clean pixel accents.
- **Confirmed Decision 2 (Route Adaptation)**: Adapt all existing multi-page routes and features to Niki's capabilities:
  - `/` (Homepage): Multi-agent architecture, Docker sandbox isolation, terminal execution mock, live Git branch generation.
  - `/explore`: Sandbox & Recipe Gallery (explore containerized agent environments, toolchains, and preconfigured tasks).
  - `/sandbox/[slug]` (mapped from `/website/[slug]`): Detailed sandbox container specifications, Dockerfiles, and test harnesses.
  - `/pricing`: Open-source core + Cloud Sandbox compute tiers (Community Free, Cloud Developer $19/mo, Team Infrastructure $49/seat/mo) plus compute add-ons and feature comparison matrix.
  - `/extension` / `/cli`: Niki CLI (`cargo install niki-cli`) and IDE extension / background daemon landing.
  - `/analyze`: Repo Sandbox Readiness Analyzer & Benchmark Suite.
  - `/canvas` / `/workflows`: Multi-Agent Visual Orchestration Canvas (connecting Planner, Coder, Test Suite, and Reviewer nodes).
  - `/mcp`: Model Context Protocol integration (connecting Claude, Cursor, and Windsurf to Niki's isolated execution sandboxes).
  - `/changelog`: Release log tracking Niki Rust runtime, Docker sandbox driver, and Git engine updates.
  - `/login`, `/upgrade`, `/settings/account`, `/terms`, `/privacy`, `/404`: Rebranded for Niki Cloud.
- **Confirmed Decision 3 (Commercialization Model)**: Open-source core (self-hosted Rust CLI & local Docker engine) with managed Cloud sandbox compute subscriptions and enterprise team controls.

---

## 1. Overview & Core Concept

### What It Does
Niki solves the critical reliability and safety problem of autonomous AI coding agents: letting agents modify live files or run unconstrained commands on developer machines causes broken states and security risks. Niki isolates autonomous agents inside disposable, hermetic Docker sandboxes. The agents independently **Plan** $\rightarrow$ **Code** $\rightarrow$ **Test** (run linters, unit tests, and builds) $\rightarrow$ **Review** (AST and security analysis), and only output a clean, verified **Git branch with PR documentation**.

### Target Audience
Software engineering teams, AI engineers, open-source maintainers, and developer infrastructure leads who want autonomous coding capabilities without giving agents raw access to production environments or host machines.

### Key Value Proposition
- **Hermetic Isolation**: Agents run inside zero-trust Docker containers with strict cgroup limits and optional network egress bans.
- **Deterministic Verification**: Code is tested and built inside the container before any Git commit is generated.
- **Rust Performance**: Fast daemon startup ($<15\text{ms}$) with minimal system overhead.
- **Reviewable Git Branches**: Developers receive pull requests and diffs they can inspect, test, and merge like human contributions.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Developer Discovery Flow (`/`)**:
   - Hero headline: *"Autonomous coding agents that test their own work inside sandboxes."*
   - Interactive terminal window mockup demonstrating live multi-agent execution:
     `niki run "Implement rate limiter middleware with unit tests" --hermetic`
     $\rightarrow$ Container spawned $\rightarrow$ Planner analyzes AST $\rightarrow$ Coder writes Rust/TypeScript $\rightarrow$ Test harness runs `cargo test` / `vitest` $\rightarrow$ Reviewer checks diff $\rightarrow$ Git branch `feature/rate-limiter` created.
   - Visual breakdown of the 4-stage pipeline (Plan, Code, Test, Review).
2. **Environment & Recipe Exploration (`/explore`)**:
   - Filter sandboxes by language/runtime (Rust, TypeScript/Node, Python, Go), test framework, and isolation tier.
   - Shuffle button to discover popular agent tasks (e.g. refactoring, CVE remediation, test generation).
3. **Repository Analyzer & Benchmark (`/analyze`)**:
   - Developers paste their GitHub repo URL to analyze container buildability, test runner speed, and agent readiness score.
   - Detailed logs show detected toolchains and container specifications.
4. **Agent Orchestration Canvas (`/canvas`)**:
   - Interactive visual board showing how Niki coordinates the Planner node, Coder node, Test harness node, and Reviewer node with data flows and branch outputs.
5. **MCP Integration (`/mcp`)**:
   - Connect Claude Desktop, Cursor, or IDE agents directly to Niki's Docker execution engine through standard MCP tools (`niki_plan`, `niki_exec_sandbox`, `niki_test`, `niki_create_branch`).
6. **Pricing & Membership (`/pricing`)**:
   - Toggle between Monthly and Annual billing (-17% discount).
   - Clear comparison between Community Open-Source (free forever local CLI), Cloud Developer ($19/mo), and Team Infrastructure ($49/seat/mo).
   - Storage/Compute add-ons for additional sandbox CPU hours.

### Visual Identity & Theme
- **Dominant Canvas (60%)**: Deep obsidian black (`#09090b`) canvas with subtle geometric gridlines.
- **Structural Surfaces (30%)**: Window mockups, code frames, and cards in `#0f0f12` and `#18181b` with 1px hairline borders (`rgba(255,255,255,0.1)`).
- **Accent Budget (10%)**: Terminal emerald (`#05f190`) for verified states and passing tests; Rust amber (`#f59e0b`) for active compilation; vivid magenta (`#ff2fd6`) for Niki's pixel branding and primary CTAs.
- **Typography**:
  - Headings: `Pixel Square` (Silkscreen / Pixelify Sans) for feature titles and plan names.
  - Technical Data & Code: `Geist Mono` with `tabular-nums` for logs, terminal commands, and benchmarks.
  - Body Prose: `Geist Sans` for legible high-density explanations.
- **Anti-Slop Discipline**:
  - No floating pill badges or static capsule sandwiches on cards.
  - Unboxed metadata separated by clean `·` or `/` typographic markers.
  - Real, working event handlers for tabs, search, filters, copy buttons, modal dialogs, and pricing calculations.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale |
| :--- | :--- | :--- |
| **Brand Mark** | Pixel-stepped "N" logo mark in square pixels | Replaces the legacy "S" with authentic Niki branding while maintaining the sharp pixel-art signature. |
| **Multi-Page Architecture** | Preserve Vite MPA routing and all 16 routes | Retains full SEO, clean URLs, deep linking (`/pricing`, `/mcp`, `/analyze`), and fast client interactions without heavy framework dependencies. |
| **Pricing Structure** | Free Open-Source Core + Cloud Sandbox compute tiers | Matches standard developer infrastructure models (e.g. Supabase, Docker, Modal), appealing to open-source users while monetizing compute and team collaboration. |
| **Terminal & Sandbox Demos** | Interactive script-driven simulators | Provides instant responsive feedback for sandbox commands, test passes, and diff previews without requiring real Docker runtime in client browsers. |

---

## 4. Technical Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Niki Web Application Architecture               │
└────────────────────────────────────────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼──────────────────────────────┐
    ▼                               ▼                              ▼
┌────────────────────────┐    ┌─────────────────────────┐   ┌────────────────────────┐
│ Public Product Pages   │    │ Interactive Tools       │   │ Platform & Developer   │
├────────────────────────┤    ├─────────────────────────┤   ├────────────────────────┤
│ • / (Homepage)         │    │ • /explore (Sandboxes)  │   │ • /cli (CLI & Daemon)  │
│ • /pricing (Tiers)     │    │ • /analyze (Benchmarks) │   │ • /mcp (AI Connector)  │
│ • /changelog (Updates) │    │ • /canvas (Workflows)   │   │ • /settings/account    │
│ • /terms & /privacy    │    │ • /sandbox/:slug        │   │ • /login & /upgrade    │
└────────────────────────┘    └─────────────────────────┘   └────────────────────────┘
    │                               │                              │
    └───────────────────────────────┼──────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Shared Frontend Engine (/assets)                                       │
├────────────────────────────────────────────────────────────────────────┤
│ • /assets/css/style.css: Design tokens, pixel typography, terminal UIs │
│ • /assets/js/main.js: Interactive simulator, ⌘K search, modals, tabs   │
│ • /assets/img/hero-landscape.svg: Topographic digital computing grid   │
│ • vite.config.ts: Multi-page router with dynamic slug rewrites         │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & Page Mapping

1. **`metadata.json` & `index.html`**:
   - Update metadata to Niki (name, description, OpenGraph tags, canonical links).
2. **`/index.html` (Homepage)**:
   - Transform all 23 sections to Niki:
     - Header: Niki logo ("N" pixel mark), Explore, Pricing, Tools dropdown (CLI, Analyzer, Canvas, MCP), GitHub repo button (`https://github.com/RavaniRoshan/niki`), Log In.
     - Hero: "Autonomous coding agents that test their own work inside sandboxes." + Terminal runner mock + landscape visual.
     - Problem Statement: "Traditional coding agents destroy working codebases. Time to isolate them."
     - Workspace/Architecture Mock: Isolated Docker containers, AST analyzer, cargo test runner, Git branch output.
     - Feature Walkthroughs: Hermetic Sandboxes, Test Verification, AST Code Review, Git Pull Requests.
     - Terminal Wall: 14 sandbox recipes (Rust Actix, TypeScript Next.js, Python PyTorch, Go Gin, etc.).
     - Natural Search (⌘K): Query agent tasks and sandbox history.
     - Analyzer: Live test runner benchmark simulation.
     - MCP Integration: Connect Claude and Cursor to Niki Docker runner.
     - Testimonials: Authentic feedback from platform engineers and tech leads.
     - Pricing Teaser: Free OSS, Cloud Dev $19, Team $49.
     - FAQ & Footer: Comprehensive documentation and links to GitHub repository.
3. **`/explore/index.html`**:
   - Browse prebuilt sandbox recipes and automated agent tasks with runtime filters (Rust, TS, Python, Go) and shuffle button.
4. **`/website/neu-team/index.html` $\rightarrow$ `/sandbox/rust-actix/index.html`**:
   - Container specification, Dockerfile preview, test suite configuration, and memory constraints.
5. **`/pricing/index.html`**:
   - SoftwareApplication JSON-LD schema with Niki tiers.
   - Monthly / Yearly billing toggle (-17%).
   - Free Community ($0), Cloud Developer ($19/mo), Team Infrastructure ($49/seat/mo).
   - Storage/Compute add-ons (+50h, +200h, +500h sandbox hours).
   - Complete technical comparison matrix.
6. **`/extension/index.html` $\rightarrow$ `/cli/index.html`**:
   - Niki CLI installation (`cargo install niki-cli`, `brew install niki`), background daemon, and IDE companion.
7. **`/analyze/index.html` & `/analyze/buttermax-net/index.html`**:
   - Repository Docker compatibility and agent testability benchmark suite.
8. **`/canvas/index.html`**:
   - Multi-agent visual workflow canvas with live node linking (Planner $\rightarrow$ Coder $\rightarrow$ Tester $\rightarrow$ Reviewer).
9. **`/mcp/index.html`**:
   - Detailed Model Context Protocol connection for Claude Desktop and Cursor with tool schemas.
10. **`/changelog/index.html`**:
    - 24 release entries tracking Niki's Rust engine, Docker sandbox isolation, and Git rebase tools.
11. **`/login/index.html` & `/upgrade/index.html`**:
    - Rebranded checkout and authentication for Niki Cloud.
12. **`/settings/account/index.html`**:
    - Manage MCP daemon tokens and cloud runner concurrency.
13. **`/terms/index.html`, `/privacy/index.html`, `/404.html`**:
    - Updated for code execution safety, sandbox telemetry, and 404 terminal missing screen.
14. **`vite.config.ts`**:
    - Update route handlers and inputs to support both canonical paths and backwards-compatible redirects.

---

## 5. Verification & Testing Plan

1. **Compilation Check**: Run `compile_applet` to verify zero build errors across all multi-page HTML and asset files.
2. **Linting Check**: Run `lint_applet` (`tsc --noEmit`) to confirm valid TypeScript configuration.
3. **Interactive Validation**:
   - Verify header dropdown, mobile menu drawer, and ⌘K search palette.
   - Verify pricing toggle switches between monthly and yearly rates with -17% discount calculation.
   - Verify testimonial carousel advances and pauses on hover.
   - Verify copy buttons copy MCP URLs and CLI install commands with toast notifications.
   - Verify all links lead to valid internal files or the external GitHub repository (`https://github.com/RavaniRoshan/niki`).
