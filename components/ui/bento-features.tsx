import { useState } from "react";
import { SpaceSandboxForm } from "./space-form";

export function BentoFeaturesSection() {
  // Runtime switcher for Card 1
  const [activeRuntime, setActiveRuntime] = useState<"rust" | "node" | "python" | "go">("rust");

  // MCP tool tab for Card 3
  const [mcpClient, setMcpClient] = useState<"claude" | "cursor">("claude");

  // Spec tab for Card 4
  const [activeSpecTab, setActiveSpecTab] = useState<"adr" | "assertions" | "thresholds">("adr");

  // Rollback interactive state for Card 5
  const [isRolledBack, setIsRolledBack] = useState(false);

  const RUNTIMES = {
    rust: {
      label: "Rust 1.80+",
      image: "docker://niki-sandbox-812 (rust:1.80-alpine)",
      command: "cargo test --release --all-targets",
      output: "test result: ok. 48 passed; 0 failed; 0 ignored; 14.2ms",
      file: "src/middleware/rate_limit.rs",
      code: "pub struct RateLimiter {\n    capacity: u32,\n    refill_rate: Duration,\n}\nimpl RateLimiter {\n    pub async fn acquire(&self) -> Result<()> { ... }\n}"
    },
    node: {
      label: "Node 22",
      image: "docker://niki-sandbox-409 (node:22-alpine)",
      command: "pnpm test:e2e && pnpm lint:ast",
      output: "Test Suites: 8 passed, 8 total. Tests: 56 passed. Time: 1.12s",
      file: "src/server/auth.ts",
      code: "export async function verifyToken(req: Request) {\n  const session = await auth.validate(req);\n  if (!session) throw new UnauthorizedError();\n  return session.user;\n}"
    },
    python: {
      label: "Python 3.12",
      image: "docker://niki-sandbox-311 (python:3.12-slim)",
      command: "pytest tests/ --cov=app --cov-report=term",
      output: "tests/test_api.py ...... [100%]\n34 passed, 0 failed in 0.84s",
      file: "app/services/tokenizer.py",
      code: "class TokenizerService:\n    def __init__(self, model_name: str):\n        self.model = load_isolated_weights(model_name)\n    def encode(self, text: str) -> list[int]:\n        return self.model.tokenize(text)"
    },
    go: {
      label: "Go 1.23",
      image: "docker://niki-sandbox-955 (golang:1.23-alpine)",
      command: "go test -v -race ./... && staticcheck ./...",
      output: "PASS: TestConcurrencySafeLock (0.04s)\nok  github.com/niki/core  0.421s",
      file: "pkg/sandbox/cgroups.go",
      code: "type Controller struct {\n    MemoryLimit int64\n    CPUQuota    int64\n}\nfunc (c *Controller) Apply(pid int) error { ... }"
    }
  };

  const currentRuntime = RUNTIMES[activeRuntime];

  return (
    <section className="container-balanced mx-auto my-24 px-6 max-w-6xl font-sans" id="features">
      {/* Section Header with anti-slop typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="font-mono text-[11px] tracking-widest uppercase text-emerald-400 mb-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            HERMETIC CAPABILITIES · ZERO HOST LEAKAGE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-mono">
            Engineered for deterministic AI coding.
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-md font-mono leading-relaxed">
          Everything autonomous coding agents need to plan, compile, test, and verify — strictly contained inside throwaway Linux sandboxes.
        </p>
      </div>

      {/* Asymmetric Bento Grid (12-column responsive layout) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Card 1 (Span 7, Tall): Marquee Docker Sandbox & Runtime Switcher */}
        <div className="md:col-span-7 rounded-xl border border-white/10 bg-[#0d0d11] p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                <span>HERMETIC DOCKER ENGINE</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                CGROUP V2 ISOLATION
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-mono mb-2">
              Autonomous 4-Agent Pipeline
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Planner, Coder, Tester, and AST Reviewer run inside disposable Linux containers with strict 1024MB RAM ceilings, loopback-only networking, and read-only host mounts.
            </p>

            {/* Runtime Switcher Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.keys(RUNTIMES) as Array<keyof typeof RUNTIMES>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveRuntime(key)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                    activeRuntime === key
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {RUNTIMES[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Container Simulator Frame */}
          <div className="rounded-lg border border-white/10 bg-black/60 p-4 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px]">
              <span className="text-zinc-300 font-semibold">{currentRuntime.image}</span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ACTIVE · 0 EGRESS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <div className="text-zinc-500 text-[10px]">RESOURCE BOUNDARY</div>
                <div className="text-zinc-200 mt-0.5">cgroup 1024MB · 2 CPU</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <div className="text-zinc-500 text-[10px]">NETWORK NAMESPACE</div>
                <div className="text-emerald-400 mt-0.5">Isolated loopback only</div>
              </div>
            </div>

            <div className="rounded bg-black/90 p-2.5 text-[11px] border border-white/5">
              <div className="text-zinc-400">// {currentRuntime.file}</div>
              <pre className="text-zinc-300 text-[11px] overflow-x-auto my-1 leading-relaxed">
                {currentRuntime.code}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-emerald-400">
              <span>$ {currentRuntime.command}</span>
              <span className="font-semibold">{currentRuntime.output.split("\n")[0]}</span>
            </div>
          </div>
        </div>

        {/* Card 2 (Span 5, Tall): Benchmark Analyzer & Sandbox Launch Form */}
        <div className="md:col-span-5 rounded-xl border border-white/10 bg-[#0d0d11] p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <span>CONTAINER ANALYSIS</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                BENCHMARK SUITE
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-mono mb-2">
              Benchmark Your Repo
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              We built the analyzer for engineering leads — it tests whether your repository is agent-ready: build reproducibility, Dockerfile sanity, and test speed.
            </p>
          </div>

          {/* Embedded Interactive Recipe Launch Form */}
          <div className="mt-2">
            <SpaceSandboxForm />
          </div>
        </div>

        {/* Card 3 (Span 5): MCP Tool Connector (Claude, Cursor, Windsurf) */}
        <div className="md:col-span-5 rounded-xl border border-white/10 bg-[#0d0d11] p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs uppercase tracking-wider text-[#ff2fd6] flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <span>MODEL CONTEXT PROTOCOL</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setMcpClient("claude")}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                    mcpClient === "claude" ? "bg-white/20 text-white border-white/40" : "bg-white/5 text-zinc-400 border-white/10"
                  }`}
                >
                  Claude
                </button>
                <button
                  onClick={() => setMcpClient("cursor")}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                    mcpClient === "cursor" ? "bg-white/20 text-white border-white/40" : "bg-white/5 text-zinc-400 border-white/10"
                  }`}
                >
                  Cursor
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white font-mono mb-2">
              Plug Sandboxes into AI Tools
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Every Docker sandbox, test suite, and AST tool in Niki is one MCP connection away from Claude, Cursor, and Windsurf.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/60 p-4 font-mono text-xs space-y-2">
            <div className="text-zinc-300">
              <span className="text-zinc-500">{mcpClient === "claude" ? "Claude Desktop:" : "Cursor IDE:"}</span>{" "}
              Run unit test suite and refactor auth error handling
            </div>
            <div className="border-l-2 border-[#ff2fd6] pl-3 py-1 space-y-1 text-[11px]">
              <div className="text-zinc-500 text-[10px]">
                Used niki · exec_sandbox(image="rust:alpine", task="auth_refactor")
              </div>
              <div className="text-zinc-300">1. Spawned isolated container niki-sb-4921</div>
              <div className="text-zinc-300">2. Coder modified src/auth.rs with Result&lt;User, AuthError&gt;</div>
              <div className="text-zinc-300">3. Tester executed cargo test --test auth_tests (passed 14/14)</div>
              <div className="text-emerald-400 font-semibold pt-1">
                ✓ Created reviewable Git branch feature/auth-refactor
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 (Span 7): Spec Engine & Architecture Decision Records */}
        <div className="md:col-span-7 rounded-xl border border-white/10 bg-[#0d0d11] p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>SPEC ENGINE &amp; ADRS</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveSpecTab("adr")}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                    activeSpecTab === "adr" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-white/5 text-zinc-400 border-white/10"
                  }`}
                >
                  ADR-004.md
                </button>
                <button
                  onClick={() => setActiveSpecTab("assertions")}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                    activeSpecTab === "assertions" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-white/5 text-zinc-400 border-white/10"
                  }`}
                >
                  assertions.toml
                </button>
                <button
                  onClick={() => setActiveSpecTab("thresholds")}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                    activeSpecTab === "thresholds" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-white/5 text-zinc-400 border-white/10"
                  }`}
                >
                  benchmarks.json
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white font-mono mb-2">
              Write Specs Where You Execute
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Task briefs, test assertions, benchmark thresholds — all organized with the code they verify. Thinking, containment, and coding, united in one place.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/60 p-4 font-mono text-xs">
            {activeSpecTab === "adr" && (
              <div className="space-y-1.5">
                <div className="text-white font-semibold text-sm"># ADR 004: Leaky-Bucket Rate Limiter</div>
                <div className="text-zinc-400 text-[11px] leading-relaxed">
                  Status: <span className="text-emerald-400 font-semibold">Accepted &amp; Verified in Docker Sandbox</span>
                </div>
                <div className="text-zinc-300 text-[11px] leading-relaxed pt-1">
                  Context: Need zero-allocation concurrency throttle across multi-tenant API routes.<br />
                  Decision: Wrap atomic u64 counter in hermetic Rust crate. Unit test coverage must exceed 95% before cutting Git branch.
                </div>
              </div>
            )}
            {activeSpecTab === "assertions" && (
              <div className="space-y-1 text-[11px] text-zinc-300">
                <div className="text-zinc-500">[test_assertions.rate_limit]</div>
                <div>max_concurrency = 2500</div>
                <div>timeout_ms = 40</div>
                <div>error_policy = "Result&lt;Response, RateLimitExceeded&gt;"</div>
                <div>memory_spike_ceiling_mb = 128</div>
              </div>
            )}
            {activeSpecTab === "thresholds" && (
              <div className="space-y-1 text-[11px] text-zinc-300">
                <div className="text-zinc-500">&#123; "benchmarks": &#123;</div>
                <div className="pl-3">"p99_latency_microseconds": 12.4,</div>
                <div className="pl-3">"allocations_per_request": 0,</div>
                <div className="pl-3">"docker_shutdown_cleanliness": true</div>
                <div className="text-zinc-500">&#125; &#125;</div>
              </div>
            )}
          </div>
        </div>

        {/* Card 5 (Span 6): Copy-on-Write Rollback & AST Semantic Review */}
        <div className="md:col-span-6 rounded-xl border border-white/10 bg-[#0d0d11] p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
                <span>SNAPSHOT ROLLBACK</span>
              </div>
              <button
                onClick={() => setIsRolledBack(!isRolledBack)}
                className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
              >
                {isRolledBack ? "Reset Snapshot" : "Simulate Rollback"}
              </button>
            </div>

            <h3 className="text-xl font-bold text-white font-mono mb-2">
              Instant Snapshot Revert &amp; AST Audit
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Every step is snapshotted into copy-on-write container layers. If a unit test fails or an AST rule violates memory safety, Niki reverts immediately.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/60 p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] border-b border-white/10 pb-2">
              <span className="text-zinc-400">LAYER STATUS</span>
              <span className={isRolledBack ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {isRolledBack ? "RESTORED TO SAFE STATE (14ms)" : "MONITORING AST MUTATIONS"}
              </span>
            </div>

            {isRolledBack ? (
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded bg-emerald-500/10 border-l-2 border-emerald-400 text-emerald-300">
                  + Reverted container to layer niki-snap-7b19 · Memory safe state restored
                </div>
                <div className="text-zinc-400 text-[10px]">
                  0 corrupted files on host · 0 broken compiler artifacts
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded bg-rose-500/10 border-l-2 border-rose-400 text-rose-300">
                  - Unsafe raw pointer cast detected at line 142 (ast-grep check failed)
                </div>
                <div className="text-zinc-400 text-[10px]">
                  Click "Simulate Rollback" to trigger copy-on-write container revert
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 6 (Span 6): Preconfigured Sandbox Blueprints */}
        <div className="md:col-span-6 rounded-xl border border-white/10 bg-[#0d0d11] p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span>REPRODUCIBLE TOOLCHAINS</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                14 RECIPES READY
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-mono mb-2">
              Verified Sandbox Blueprints
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Pre-baked container environments with dependency locks, test runners, and hardened sandboxes ready for your repository.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="rounded border border-white/10 bg-black/60 p-2.5">
              <div className="text-white font-semibold text-xs">Rust Actix API</div>
              <div className="text-emerald-400 text-[10px] mt-0.5">42 tests · 2m</div>
            </div>
            <div className="rounded border border-white/10 bg-black/60 p-2.5">
              <div className="text-white font-semibold text-xs">Next.js 15 Fullstack</div>
              <div className="text-emerald-400 text-[10px] mt-0.5">28 tests · 1m</div>
            </div>
            <div className="rounded border border-white/10 bg-black/60 p-2.5">
              <div className="text-white font-semibold text-xs">Python FastAPI ML</div>
              <div className="text-emerald-400 text-[10px] mt-0.5">34 tests · 3m</div>
            </div>
            <div className="rounded border border-white/10 bg-black/60 p-2.5">
              <div className="text-white font-semibold text-xs">Go Gin Service</div>
              <div className="text-emerald-400 text-[10px] mt-0.5">19 tests · 45s</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default BentoFeaturesSection;
