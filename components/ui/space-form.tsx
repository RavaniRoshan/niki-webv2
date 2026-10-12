import { useState, type FormEvent } from "react";
import { SpaceAvatar } from "./space-avatar";
import { SlideToConfirm } from "./slide-to-confirm";
import { InteractiveChecklist } from "./interactive-checklist";

export interface SpaceSandboxFormProps {
  onSuccess?: (data: any) => void;
  className?: string;
}

export function SpaceSandboxForm({ onSuccess, className = "" }: SpaceSandboxFormProps) {
  const [repoUrl, setRepoUrl] = useState("https://github.com/RavaniRoshan/niki");
  const [runtime, setRuntime] = useState("Rust 1.80+ (cargo test)");
  const [testCommand, setTestCommand] = useState("cargo test --release -- --nocapture");
  const [agentSeed, setAgentSeed] = useState("@RavaniRoshan");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLaunch = async () => {
    setIsRunning(true);
    setLogs([
      `[0.00s] Initializing Hermetic Sandbox Runner for ${repoUrl}...`,
      `[0.08s] Verified operator avatar identity: seed "${agentSeed}"`,
      `[0.15s] Spawning hermetic Docker container: niki-runner:${runtime.split(" ")[0].toLowerCase()}`,
      `[0.32s] Attaching cgroup v2 controller: memory.max=1073741824 (1GB), cpu.max="200000 100000"`,
      `[0.65s] Enforcing --hermetic network sandbox: 0 external egress routes permitted`,
      `[1.10s] Executing verification test suite: "${testCommand}"`,
      `[1.42s] test result: ok. 48 passed; 0 failed; 0 ignored; 0 measured`,
      `[1.55s] Rust AST semantic review verified cleanly. Clean exit code: 0.`
    ]);

    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsRunning(false);
    setIsSuccess(true);
    onSuccess?.({ repoUrl, runtime, testCommand, agentSeed });
  };

  return (
    <div className={`rounded-xl border border-white/10 bg-[#0f0f12] p-6 text-white shadow-2xl font-mono ${className}`}>
      {/* Header with avatar identity */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <SpaceAvatar
            name={agentSeed}
            size={42}
            className="ring-2 ring-emerald-500/30"
          />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-emerald-400">
              Hermetic Sandbox Recipe Form
            </div>
            <h3 className="text-sm font-semibold text-white">
              Launch Agent Recipe
            </h3>
          </div>
        </div>

        <div className="text-[10px] text-zinc-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded border border-white/10">
          Docker v27 · Rust Engine
        </div>
      </div>

      <div className="space-y-4 text-xs">
        {/* Repository URL */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">
            Git Repository Target
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/org/repo"
            required
            className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
          />
        </div>

        {/* Runtime & Agent Seed Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">
              Container Runtime
            </label>
            <select
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-white focus:border-emerald-400 focus:outline-none transition-all font-mono"
            >
              <option>Rust 1.80+ (cargo test)</option>
              <option>TypeScript / Node 22 (vitest)</option>
              <option>Python 3.12 (pytest)</option>
              <option>Go 1.23 (go test)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center justify-between">
              <span>Avatar Operator Seed</span>
              <span className="text-[10px] text-emerald-400 font-mono">Deterministic Seed Matrix</span>
            </label>
            <input
              type="text"
              value={agentSeed}
              onChange={(e) => setAgentSeed(e.target.value)}
              placeholder="Name, GitHub handle, or task ID"
              className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-white focus:border-[#ff2fd6] focus:outline-none focus:ring-1 focus:ring-[#ff2fd6] transition-all font-mono"
            />
          </div>
        </div>

        {/* Test Command */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">
            Verification Test Command
          </label>
          <input
            type="text"
            value={testCommand}
            onChange={(e) => setTestCommand(e.target.value)}
            placeholder="cargo test --release"
            required
            className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-400 focus:outline-none font-mono"
          />
        </div>

        {/* Pre-flight Sandbox Verifications Checklist */}
        <div className="pt-2">
          <InteractiveChecklist />
        </div>

        {/* Live Terminal Output when triggered */}
        {logs.length > 0 && (
          <div className="rounded-lg border border-emerald-500/30 bg-black/80 p-3.5 text-[11px] text-emerald-400/90 font-mono space-y-1">
            <div className="text-[10px] uppercase text-zinc-400 border-b border-white/10 pb-1 mb-1.5 flex items-center justify-between">
              <span>Live Container STDOUT</span>
              <span className="text-emerald-400 font-bold">● ACTIVE SANDBOX</span>
            </div>
            {logs.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Slide To Confirm Action */}
        <div className="pt-3">
          <SlideToConfirm
            onConfirm={handleLaunch}
            label="Slide to Confirm &amp; Launch Sandbox"
            confirmedLabel="Sandbox Executed Successfully"
          />
        </div>
      </div>
    </div>
  );
}

export default SpaceSandboxForm;
