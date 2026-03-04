"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Source, Locale } from "@/types/timeline";
import { getLocalizedText } from "@/types/timeline";

interface SourcesListProps {
  sources: Source[];
  entryId: number;
}

const TYPE_BADGES: Record<string, { bg: string; label: string }> = {
  critical: { bg: "bg-red-100 text-red-700", label: "Critical" },
  reference: { bg: "bg-blue-100 text-blue-700", label: "Ref" },
  official: { bg: "bg-green-100 text-green-700", label: "Official" },
  academic: { bg: "bg-purple-100 text-purple-700", label: "Academic" },
  news: { bg: "bg-gray-100 text-gray-700", label: "News" },
  digital: { bg: "bg-cyan-100 text-cyan-700", label: "Digital" },
};

export function SourcesList({ sources, entryId }: SourcesListProps) {
  const [expanded, setExpanded] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const listRef = useRef<HTMLUListElement>(null);

  // Focus first link when expanded
  useEffect(() => {
    if (expanded && listRef.current) {
      const firstLink = listRef.current.querySelector("a");
      if (firstLink) {
        // Small delay to allow animation
        setTimeout(() => firstLink.focus(), 200);
      }
    }
  }, [expanded]);

  if (sources.length === 0) return null;

  const sourcesLabel = t("sources");

  return (
    <div className="mt-4">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`sources-${entryId}`}
        onClick={() => setExpanded(!expanded)}
        className="
          flex items-center gap-1
          text-sm text-[var(--color-text-secondary)]
          hover:text-[var(--color-text)]
          transition-colors
          min-h-[44px]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:rounded
        "
      >
        <span
          className="text-xs transition-transform duration-200 motion-reduce:transition-none"
          style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          ▸
        </span>
        {sourcesLabel} ({sources.length})
      </button>

      <ul
        ref={listRef}
        id={`sources-${entryId}`}
        role="list"
        className={`
          mt-2 space-y-2 overflow-hidden transition-all duration-200 motion-reduce:transition-none
          ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {sources.map((source, idx) => {
          const title = getLocalizedText(source.title, locale);
          const typeBadge = TYPE_BADGES[source.type] || TYPE_BADGES.reference;

          return (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`
                  text-[10px] px-1.5 py-0.5 rounded font-medium
                  ${typeBadge.bg}
                `}
              >
                {typeBadge.label}
              </span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-sm text-[var(--color-link)]
                  hover:text-[var(--color-link-hover)] hover:underline
                  transition-colors
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:rounded
                "
              >
                {title}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
