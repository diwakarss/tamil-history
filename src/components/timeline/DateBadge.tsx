"use client";

import { useLocale } from "next-intl";
import type { DateInfo, Locale } from "@/types/timeline";
import { getLocalizedText } from "@/types/timeline";

interface DateBadgeProps {
  date: DateInfo;
}

const CONFIDENCE_INDICATORS: Record<string, { icon: string; color: string }> = {
  VERY_HIGH: { icon: "", color: "" },
  HIGH: { icon: "", color: "" },
  MEDIUM: { icon: "○", color: "text-amber-500" },
  LOW: { icon: "◐", color: "text-orange-500" },
  CONTESTED: { icon: "⚠", color: "text-red-500" },
};

export function DateBadge({ date }: DateBadgeProps) {
  const locale = useLocale() as Locale;
  const display = getLocalizedText(date.display, locale);
  const confidence = CONFIDENCE_INDICATORS[date.confidence];

  // Format ISO date for time element
  const isoDate =
    date.year < 0 ? `${Math.abs(date.year)}-01-01` : `${date.year}-01-01`;

  return (
    <div className="inline-flex items-center gap-1.5">
      <time
        dateTime={isoDate}
        className="
          inline-flex items-center
          px-2 py-1
          bg-[var(--color-text)] text-white
          rounded text-xs font-mono font-medium
        "
      >
        {display}
      </time>
      {confidence.icon && (
        <span
          className={`text-sm ${confidence.color}`}
          aria-label={`Date confidence: ${date.confidence.toLowerCase()}`}
          title={
            date.contestedClaim?.exists
              ? getLocalizedText(date.contestedClaim.issue, locale)
              : undefined
          }
        >
          {confidence.icon}
        </span>
      )}
    </div>
  );
}
