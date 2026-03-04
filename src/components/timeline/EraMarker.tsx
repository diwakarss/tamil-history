"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Era, EraType, Locale } from "@/types/timeline";

interface EraMarkerProps {
  era: Era;
  eraKey: EraType;
  entryCount: number;
}

export function EraMarker({ era, eraKey, entryCount }: EraMarkerProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("eras");
  const announcerRef = useRef<HTMLDivElement>(null);
  const hasAnnounced = useRef(false);

  const name = t(eraKey);

  // Format date range
  const formatYear = (year: number) => {
    if (locale === "ta") {
      return year < 0 ? `கி.மு. ${Math.abs(year)}` : `கி.பி. ${year}`;
    }
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  const dateRange = `${formatYear(era.start)} – ${formatYear(era.end)}`;

  // Entry count label
  const entriesLabel =
    locale === "ta"
      ? `${entryCount} நிகழ்வுகள்`
      : `${entryCount} ${entryCount === 1 ? "entry" : "entries"}`;

  // Announce era when it becomes sticky (enters viewport top)
  useEffect(() => {
    const section = document.querySelector(`[data-era="${eraKey}"]`);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the section is at the top of the viewport and sticky
          if (entry.isIntersecting && entry.boundingClientRect.top <= 80) {
            if (!hasAnnounced.current && announcerRef.current) {
              const announcement =
                locale === "ta"
                  ? `${name} காலகட்டத்தில் நுழைகிறோம், ${dateRange}`
                  : `Entering ${name} era, ${dateRange}`;
              announcerRef.current.textContent = announcement;
              hasAnnounced.current = true;
            }
          } else {
            hasAnnounced.current = false;
          }
        });
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: [0, 1],
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [eraKey, name, dateRange, locale]);

  return (
    <>
      {/* Live region for era change announcements */}
      <div
        ref={announcerRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <section
        data-era={eraKey}
        aria-labelledby={`era-${eraKey}`}
        className="
          sticky top-14 sm:top-16 z-40
          w-full h-[60px] sm:h-[70px] lg:h-20
          flex items-center
          pl-4 pr-4 sm:pl-6 sm:pr-6
          border-l-4
          transition-shadow duration-200
        "
        style={{
          borderLeftColor: era.color,
          background: `linear-gradient(to right, ${era.color}15, transparent)`,
        }}
      >
        <div className="flex-1">
          <h2
            id={`era-${eraKey}`}
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--color-text)]"
          >
            {name}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            <time>{dateRange}</time>
          </p>
        </div>
        <span
          className="
            text-xs px-2 py-1 rounded-full
            bg-[var(--color-border)] text-[var(--color-text-secondary)]
          "
        >
          {entriesLabel}
        </span>
      </section>
    </>
  );
}
