import { useId, useMemo } from "react";
import {
  createAvatar,
  type AvatarVariant,
  type AvatarFamily,
  type AvatarEffect
} from "@usespaceui/avatars";

export const NIKI_TERMINAL_PALETTE: readonly [string, string, string, string, string] = [
  "#09090b", // Terminal obsidian
  "#10b981", // Neon emerald
  "#ff2fd6", // Neon magenta
  "#059669", // Deep matrix emerald
  "#c026d3"  // Electric fuchsia
];

export interface SpaceAvatarProps {
  /** The seed string: user name, GitHub handle, or sandbox task ID */
  name: string;
  /** Specific variant or family or 'all' for deterministic selection */
  variant?: AvatarVariant | AvatarFamily | "all";
  /** Pixel size of the square avatar */
  size?: number;
  /** Whether to clip to a full circle (default: true) */
  circle?: boolean;
  /** Exact 5 hexadecimal colors conforming to Niki terminal palette */
  colors?: readonly [string, string, string, string, string];
  /** SVG effect: 'none' | 'noise' */
  effect?: AvatarEffect;
  /** Whether to enable CSS animations */
  animate?: boolean;
  className?: string;
  title?: string;
}

/**
 * Procedural generative avatar for Niki using @usespaceui/avatars.
 * Styled in dark terminal aesthetic with neon emerald and magenta accents.
 */
export function SpaceAvatar({
  name,
  variant = "all",
  size = 48,
  circle = true,
  colors = NIKI_TERMINAL_PALETTE,
  effect = "none",
  animate = false,
  className = "",
  title
}: SpaceAvatarProps) {
  const uid = useId().replace(/:/g, "_");

  const svg = useMemo(() => {
    try {
      return createAvatar({
        name: name || "niki-agent",
        variant,
        size,
        circle,
        colors,
        effect,
        animate,
        uid
      });
    } catch (err) {
      console.warn("Failed to generate avatar SVG:", err);
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#10b981"/></svg>`;
    }
  }, [name, variant, size, circle, colors, effect, animate, uid]);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#09090b] shadow-[0_0_12px_rgba(16,185,129,0.15)] ${className}`}
      style={{ width: size, height: size }}
      title={title || `Avatar for ${name}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/**
 * Synchronous helper to generate SVG string directly
 */
export function generateNikiAvatarSvg(
  name: string,
  options?: {
    variant?: AvatarVariant | AvatarFamily | "all";
    size?: number;
    circle?: boolean;
    colors?: readonly [string, string, string, string, string];
    effect?: AvatarEffect;
    uid?: string;
  }
): string {
  try {
    return createAvatar({
      name: name || "niki",
      variant: options?.variant ?? "all",
      size: options?.size ?? 48,
      circle: options?.circle ?? true,
      colors: options?.colors ?? NIKI_TERMINAL_PALETTE,
      effect: options?.effect ?? "none",
      uid: options?.uid
    });
  } catch (e) {
    const s = options?.size ?? 48;
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#10b981"/></svg>`;
  }
}

export default SpaceAvatar;
