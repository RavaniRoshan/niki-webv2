import { useState } from "react";

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  defaultChecked?: boolean;
}

export interface InteractiveChecklistProps {
  items?: ChecklistItem[];
  onChange?: (checkedIds: string[]) => void;
  className?: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  {
    id: "hermetic-egress",
    title: "Hermetic Network Isolation (--hermetic)",
    description: "Denies all outbound TCP/UDP traffic except whitelisted local endpoints.",
    defaultChecked: true
  },
  {
    id: "cgroup-limits",
    title: "cgroup v2 Memory & CPU Ceiling",
    description: "Hard caps RAM at 1024MB and throttles CPU bursts to prevent runaway host spikes.",
    defaultChecked: true
  },
  {
    id: "zero-host-leakage",
    title: "Ephemeral Read-Only Root Filesystem",
    description: "Container discards all temporary writes on agent completion.",
    defaultChecked: true
  },
  {
    id: "ast-diff-review",
    title: "Automated Rust AST Semantic Review",
    description: "Validates code diff syntax and executes cargo test before cutting PR branch.",
    defaultChecked: false
  }
];

export function InteractiveChecklist({
  items = DEFAULT_ITEMS,
  onChange,
  className = ""
}: InteractiveChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>(
    items.filter((item) => item.defaultChecked).map((item) => item.id)
  );

  const toggleItem = (id: string) => {
    const next = checkedIds.includes(id)
      ? checkedIds.filter((i) => i !== id)
      : [...checkedIds, id];
    setCheckedIds(next);
    onChange?.(next);
  };

  const completedCount = checkedIds.length;
  const totalCount = items.length;

  return (
    <div className={`space-y-3 font-mono ${className}`}>
      <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
        <span className="text-zinc-400 uppercase tracking-wider">
          Pre-flight Sandbox Verifications
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
          completedCount === totalCount ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-zinc-300"
        }`}>
          {completedCount} / {totalCount} active
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                isChecked
                  ? "bg-[#10b981]/5 border-[#10b981]/30 hover:border-[#10b981]/50"
                  : "bg-[#09090b] border-white/10 hover:border-white/20 opacity-70"
              }`}
            >
              <div
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  isChecked
                    ? "bg-[#10b981] border-[#10b981] text-black"
                    : "border-white/30 bg-transparent"
                }`}
              >
                {isChecked && (
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className={`text-xs font-medium transition-colors ${isChecked ? "text-white" : "text-zinc-400"}`}>
                  {item.title}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed font-sans">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InteractiveChecklist;
