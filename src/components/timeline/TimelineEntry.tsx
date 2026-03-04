"use client";

import { useLocale, useTranslations } from "next-intl";
import type { TimelineEntry as TimelineEntryType, Locale } from "@/types/timeline";
import { getLocalizedText } from "@/types/timeline";
import { DateBadge } from "./DateBadge";
import { Quote } from "./Quote";
import { SourcesList } from "./SourcesList";
import { useInView } from "@/hooks";

interface TimelineEntryProps {
  entry: TimelineEntryType;
  position: "left" | "right";
  index: number;
}

export function TimelineEntry({ entry, position, index }: TimelineEntryProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("types");
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const title = getLocalizedText(entry.title, locale);
  const summary = getLocalizedText(entry.summary, locale);
  const typeLabel = t(entry.type, { defaultValue: entry.type });

  // Stagger delay for animation (max 250ms)
  const staggerDelay = Math.min(index * 50, 250);

  return (
    <article
      ref={ref}
      aria-labelledby={`entry-${entry.id}`}
      className={`
        relative
        w-full max-w-[440px]
        mb-8 sm:mb-12
        ${
          position === "left"
            ? "lg:mr-auto lg:pr-8"
            : "lg:ml-auto lg:pl-8"
        }
        transition-all duration-500 ease-out
        ${
          inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"
        }
      `}
      style={{
        transitionDelay: inView ? `${staggerDelay}ms` : "0ms",
      }}
    >
      {/* Connector line to spine - visible on desktop */}
      <div
        className={`
          hidden lg:block
          absolute top-6 w-8 h-px
          border-t border-dashed border-[var(--color-border)]
          ${position === "left" ? "right-0" : "left-0"}
        `}
      />

      {/* Card */}
      <div
        className="
          bg-white rounded-xl p-4 sm:p-6
          shadow-[var(--shadow-card)]
          hover:shadow-[var(--shadow-card-hover)]
          hover:-translate-y-0.5
          transition-all duration-200
          focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]
        "
      >
        {/* Header: Date + Type */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <DateBadge date={entry.date} />
          <span className="text-xs px-2 py-1 rounded bg-[var(--color-border)] text-[var(--color-text-muted)]">
            {typeLabel}
          </span>
        </div>

        {/* Title */}
        <h3
          id={`entry-${entry.id}`}
          className={`
            text-lg sm:text-xl font-semibold mb-2
            text-[var(--color-text)]
            ${locale === "ta" ? "font-tamil" : ""}
          `}
        >
          {title}
        </h3>

        {/* Summary */}
        <p
          className={`
            text-sm sm:text-base text-[var(--color-text-secondary)]
            leading-relaxed mb-4
            ${locale === "ta" ? "font-tamil" : ""}
          `}
        >
          {summary}
        </p>

        {/* Key Findings */}
        {entry.keyFindings && entry.keyFindings.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[var(--color-text)] mb-2">
              {locale === "ta" ? "முக்கிய கண்டுபிடிப்புகள்" : "Key Findings"}
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {entry.keyFindings.map((finding, idx) => (
                <li
                  key={idx}
                  className={`
                    text-sm text-[var(--color-text-secondary)]
                    ${locale === "ta" ? "font-tamil" : ""}
                  `}
                >
                  {getLocalizedText(finding, locale)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quote */}
        {entry.quote && <Quote quote={entry.quote} locale={locale} />}

        {/* Sources */}
        <SourcesList sources={entry.sources} entryId={entry.id} />
      </div>
    </article>
  );
}
