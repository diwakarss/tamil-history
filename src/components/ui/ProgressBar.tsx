"use client";

import type { EraType } from "@/types/timeline";

const ERA_COLORS: Record<EraType, string> = {
  PRE_SANGAM: "var(--era-pre-sangam)",
  SANGAM: "var(--era-sangam)",
  POST_SANGAM: "var(--era-post-sangam)",
  PALLAVA: "var(--era-pallava)",
  CHOLA: "var(--era-chola)",
  PANDYA_REVIVAL: "var(--era-pandya-revival)",
  NAYAK: "var(--era-nayak)",
  COLONIAL: "var(--era-colonial)",
  MODERN: "var(--era-modern)",
};

interface ProgressBarProps {
  progress: number;
  currentEra?: EraType | null;
}

export function ProgressBar({ progress, currentEra }: ProgressBarProps) {
  const backgroundColor = currentEra
    ? ERA_COLORS[currentEra]
    : "var(--color-accent)";

  // Round to nearest 10 for screen reader updates
  const roundedProgress = Math.round(progress / 10) * 10;

  return (
    <div
      role="progressbar"
      aria-valuenow={roundedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${roundedProgress}% of timeline viewed`}
      className="progress-bar fixed top-0 left-0 z-[60] h-[3px] motion-reduce:transition-none"
      style={{
        width: `${progress}%`,
        backgroundColor,
        transition: "background-color 300ms ease",
        willChange: "width",
      }}
    />
  );
}
