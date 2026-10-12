import { useState } from "react";
import { SpaceAvatar } from "./space-avatar";
import type { AvatarVariant } from "@usespaceui/avatars";

interface ContributorItem {
  name: string;
  seed: string;
  seedType: "username" | "github" | "task_id";
  role: string;
  action: string;
  timestamp: string;
  status: "verified" | "executing" | "merged";
  metric: string;
  variant?: AvatarVariant;
}

const DEFAULT_ACTIVITIES: ContributorItem[] = [
  {
    name: "Roshan Ravani",
    seed: "@RavaniRoshan",
    seedType: "github",
    role: "Core Author · Niki Engine",
    action: "Merged native Rust AST diff review engine into cargo release pipeline",
    timestamp: "8m ago",
    status: "merged",
    metric: "1,248 crates tested",
    variant: "singularity"
  },
  {
    name: "Diego Alvarez",
    seed: "Diego",
    seedType: "username",
    role: "VP Engineering · Enterprise",
    action: "Enforced hermetic network egress denial across multi-agent Docker pods",
    timestamp: "24m ago",
    status: "verified",
    metric: "0 bytes host leakage",
    variant: "glitch"
  },
  {
    name: "task-actix-runner-42",
    seed: "task-actix-runner-42",
    seedType: "task_id",
    role: "Ephemeral Sandbox · Task ID",
    action: "Synthesized Actix Web 4.9 REST endpoints with isolated postgres testcontainers",
    timestamp: "42m ago",
    status: "executing",
    metric: "cgroup 512MB RAM",
    variant: "invader"
  },
  {
    name: "Pritam Sen",
    seed: "@pritamsen-infra",
    seedType: "github",
    role: "Staff Infrastructure",
    action: "Orchestrated 4 concurrent agent sub-tasks: Plan → Code → Test → AST Review",
    timestamp: "1h ago",
    status: "verified",
    metric: "100% tests passed",
    variant: "bot"
  },
  {
    name: "task-sandbox-cgroup-88",
    seed: "task-sandbox-cgroup-88",
    seedType: "task_id",
    role: "Ephemeral Sandbox · Task ID",
    action: "Executed cargo test --release inside isolated Alpine Linux container",
    timestamp: "2h ago",
    status: "verified",
    metric: "1.4s compile time",
    variant: "titan"
  },
  {
    name: "Sebastian Vance",
    seed: "Sebastian",
    seedType: "username",
    role: "Principal DevOps Lead",
    action: "Configured zero-retention MCP daemon bridge for Anthropic Claude and Cursor IDE",
    timestamp: "3h ago",
    status: "merged",
    metric: "Unix socket auth",
    variant: "solar-flare"
  }
];

export function ContributorActivitySection() {
  const [filter, setFilter] = useState<"all" | "github" | "task_id" | "username">("all");
  const [customSeed, setCustomSeed] = useState("agent-task-99");
  const [customVariant, setCustomVariant] = useState<AvatarVariant>("glitch");

  const filteredItems = filter === "all"
    ? DEFAULT_ACTIVITIES
    : DEFAULT_ACTIVITIES.filter((item) => item.seedType === filter);

  const getSeedBadge = (type: "username" | "github" | "task_id") => {
    switch (type) {
      case "github":
        return { label: "GITHUB HANDLE", color: "text-[#ff2fd6] border-[#ff2fd6]/30 bg-[#ff2fd6]/10" };
      case "task_id":
        return { label: "SANDBOX TASK ID", color: "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10" };
      case "username":
        return { label: "USER NAME", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" };
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Filter and stats row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#10b981]">
            Live Contributor &amp; Sandbox Pipeline
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-[#09090b] p-1 font-mono text-xs">
          {(["all", "github", "task_id", "username"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded px-2.5 py-1 uppercase transition-colors ${
                filter === tab
                  ? "bg-white/15 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab === "all" ? "All Seeds" : tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const badge = getSeedBadge(item.seedType);
          return (
            <div
              key={item.seed}
              className="group relative flex flex-col justify-between rounded-lg border border-white/10 bg-[#0f0f12] p-4 transition-all hover:border-[#10b981]/50 hover:bg-[#141419]"
            >
              <div className="flex items-start gap-3.5">
                <SpaceAvatar
                  name={item.seed}
                  variant={item.variant ?? "all"}
                  size={46}
                  className="ring-1 ring-white/15 transition-transform group-hover:scale-105"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="truncate font-mono text-sm font-semibold text-white">
                      {item.name}
                    </h4>
                    <span className="shrink-0 font-mono text-[11px] text-zinc-500">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="truncate text-xs text-zinc-400">
                    {item.role}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={`inline-block rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${badge.color}`}
                    >
                      {badge.label}: {item.seed}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 border-t border-white/5 pt-3">
                <p className="text-xs leading-relaxed text-zinc-300">
                  {item.action}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item.metric}
                  </span>
                  <span className="uppercase text-zinc-500">
                    {item.variant || "procedural"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Procedural Avatar Sandbox Playground */}
      <div className="rounded-lg border border-white/10 bg-gradient-to-r from-[#09090b] via-[#0f0f12] to-[#09090b] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <SpaceAvatar
              name={customSeed}
              variant={customVariant}
              size={56}
              className="ring-2 ring-[#ff2fd6]/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#ff2fd6]">
                  Live Procedural Operator Generator
                </span>
              </div>
              <h4 className="font-mono text-sm font-medium text-white">
                Seed: <span className="text-emerald-400 font-semibold">{customSeed || "(empty)"}</span>
              </h4>
              <p className="text-xs text-zinc-400">
                Rendered with dark terminal matrix &amp; neon emerald / magenta palette
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={customSeed}
                onChange={(e) => setCustomSeed(e.target.value)}
                placeholder="Type name, handle, or task ID..."
                className="h-9 w-52 rounded border border-white/15 bg-black/60 px-3 font-mono text-xs text-white placeholder-zinc-500 focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981]"
              />
            </div>

            <select
              value={customVariant}
              onChange={(e) => setCustomVariant(e.target.value as AvatarVariant)}
              className="h-9 rounded border border-white/15 bg-black/60 px-3 font-mono text-xs text-white focus:border-[#ff2fd6] focus:outline-none"
            >
              <option value="glitch">glitch</option>
              <option value="invader">invader</option>
              <option value="bot">bot</option>
              <option value="singularity">singularity</option>
              <option value="solar-flare">solar-flare</option>
              <option value="titan">titan</option>
              <option value="lumina">lumina</option>
              <option value="critter">critter</option>
              <option value="pebble">pebble</option>
            </select>

            <button
              onClick={() => {
                const samples = ["@RavaniRoshan", "Diego", "task-sandbox-cgroup-88", "task-actix-runner-42", "@rust-lang", "task-hermetic-ast-01", "Sebastian"];
                const nextSeed = samples[(samples.indexOf(customSeed) + 1) % samples.length] || "@RavaniRoshan";
                setCustomSeed(nextSeed);
              }}
              className="h-9 rounded border border-white/10 bg-white/10 px-3 font-mono text-xs text-white hover:bg-white/20 active:scale-95 transition-all"
            >
              Randomize Seed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributorActivitySection;
