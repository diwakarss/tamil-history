"use client";

import { useRef, useCallback } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import type { Locale } from "@/types/timeline";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const announcerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(
    (newLocale: Locale) => {
      if (newLocale !== locale) {
        // Save preference
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("preferred-locale", newLocale);
        }
        // Update document lang
        document.documentElement.lang = newLocale;

        // Announce language change to screen readers
        if (announcerRef.current) {
          announcerRef.current.textContent =
            newLocale === "ta"
              ? "மொழி தமிழுக்கு மாற்றப்பட்டது"
              : "Language changed to English";
        }

        // Navigate to new locale
        router.replace(pathname, { locale: newLocale });
      }
    },
    [locale, pathname, router]
  );

  // Handle keyboard navigation for radiogroup
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const targetLocale = locale === "en" ? "ta" : "en";

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        handleToggle(targetLocale);
      }
    },
    [locale, handleToggle]
  );

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div
        ref={announcerRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <div
        role="radiogroup"
        aria-label="Language selection"
        onKeyDown={handleKeyDown}
        className="flex"
      >
        <button
          type="button"
          role="radio"
          aria-checked={locale === "en"}
          aria-label="English"
          tabIndex={locale === "en" ? 0 : -1}
          onClick={() => handleToggle("en")}
          className={`
            px-4 py-2 border border-ink-light border-r-0
            font-body text-sm
            transition-all duration-300 min-w-[48px] min-h-[44px]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper
            ${
              locale === "en"
                ? "bg-ink text-paper"
                : "bg-transparent text-ink-light hover:bg-ink/5"
            }
          `}
        >
          EN
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={locale === "ta"}
          aria-label="தமிழ் (Tamil)"
          tabIndex={locale === "ta" ? 0 : -1}
          onClick={() => handleToggle("ta")}
          className={`
            px-4 py-2 border border-ink-light
            font-tamil text-sm
            transition-all duration-300 min-w-[56px] min-h-[44px]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper
            ${
              locale === "ta"
                ? "bg-ink text-paper"
                : "bg-transparent text-ink-light hover:bg-ink/5"
            }
          `}
        >
          தமிழ்
        </button>
      </div>
    </>
  );
}
