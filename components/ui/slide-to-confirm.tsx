import { useState, useRef, type PointerEvent } from "react";

export interface SlideToConfirmProps {
  onConfirm: () => void | Promise<void>;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
  className?: string;
  accentColor?: string;
}

/**
 * Slide to Confirm component.
 * Provides fluid swipe-to-execute physics with terminal aesthetics and neon glow.
 */
export function SlideToConfirm({
  onConfirm,
  label = "Slide to Launch Sandbox",
  confirmedLabel = "Sandbox Initialized",
  disabled = false,
  className = "",
  accentColor = "#10b981"
}: SlideToConfirmProps) {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || isConfirmed || isLoading) return;
    setIsDragging(true);
    startXRef.current = e.clientX - (trackRef.current ? progress * (trackRef.current.clientWidth - 48) : 0);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current || isConfirmed || isLoading) return;
    const trackWidth = trackRef.current.clientWidth - 48; // thumb is 48px wide
    if (trackWidth <= 0) return;

    const currentX = e.clientX - startXRef.current;
    const clampedProgress = Math.min(Math.max(currentX / trackWidth, 0), 1);
    setProgress(clampedProgress);

    if (clampedProgress >= 0.96) {
      triggerConfirm();
    }
  };

  const handlePointerUp = () => {
    if (!isDragging || isConfirmed || isLoading) return;
    setIsDragging(false);
    if (progress < 0.96) {
      setProgress(0); // Snap back if unconfirmed
    }
  };

  const triggerConfirm = async () => {
    setIsDragging(false);
    setProgress(1);
    setIsLoading(true);
    try {
      await onConfirm();
      setIsConfirmed(true);
    } catch {
      setProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsConfirmed(false);
    setProgress(0);
    setIsLoading(false);
  };

  return (
    <div
      ref={trackRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative h-12 w-full overflow-hidden rounded-lg border border-white/15 bg-[#09090b] select-none ${
        disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
      } ${className}`}
    >
      {/* Fill progress track */}
      <div
        className="absolute top-0 bottom-0 left-0 transition-all duration-75"
        style={{
          width: `${Math.max(progress * 100, 0)}%`,
          background: isConfirmed
            ? "linear-gradient(90deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.6) 100%)"
            : "linear-gradient(90deg, rgba(255,47,214,0.15) 0%, rgba(16,185,129,0.35) 100%)"
        }}
      />

      {/* Label in center */}
      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-wider text-zinc-400 pointer-events-none">
        {isLoading ? (
          <span className="flex items-center gap-2 text-white">
            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Provisioning Docker Sandbox...
          </span>
        ) : isConfirmed ? (
          <span className="flex items-center gap-2 text-emerald-400 font-semibold">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {confirmedLabel}
          </span>
        ) : (
          <span className="transition-opacity" style={{ opacity: 1 - progress * 1.2 }}>
            {label}
          </span>
        )}
      </div>

      {/* Sliding Thumb button */}
      {!isConfirmed && (
        <div
          onPointerDown={handlePointerDown}
          className={`absolute top-1 bottom-1 flex w-10 items-center justify-center rounded-md border border-white/20 bg-gradient-to-b from-[#1c1c24] to-[#111116] text-white shadow-lg transition-transform ${
            isDragging ? "scale-105 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "hover:border-white/40"
          }`}
          style={{
            left: "4px",
            transform: `translateX(${progress * ((trackRef.current?.clientWidth || 280) - 48)}px)`
          }}
        >
          <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      )}

      {/* Reset button once confirmed */}
      {isConfirmed && (
        <button
          type="button"
          onClick={reset}
          className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase text-zinc-400 hover:text-white underline cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default SlideToConfirm;
