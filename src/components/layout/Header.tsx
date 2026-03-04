"use client";

import { useTranslations, useLocale } from "next-intl";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();

  return (
    <header
      role="banner"
      className="
        fixed top-0 left-0 right-0 z-[1000]
        flex items-center justify-between
        px-6 lg:px-12 py-6
        bg-gradient-to-b from-paper via-paper/95 to-transparent
      "
    >
      {/* Skip link for accessibility */}
      <a
        href="#hero"
        className="
          sr-only focus:not-sr-only
          focus:absolute focus:top-2 focus:left-2
          focus:z-[100] focus:px-4 focus:py-2
          focus:bg-ink focus:text-paper
          focus:rounded-md focus:outline-none
        "
      >
        {t("skipToTimeline", { defaultValue: "Skip to content" })}
      </a>

      {/* Logo */}
      <div className="font-display text-sm font-normal tracking-[4px] uppercase text-ink-light">
        {locale === "ta" ? "தமிழ் வரலாறு" : "Tamil History"}
      </div>

      {/* Language toggle */}
      <LanguageToggle />
    </header>
  );
}
