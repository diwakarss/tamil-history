"use client";

import { useTranslations, useLocale } from "next-intl";

export function Hero() {
  const t = useTranslations("header");
  const locale = useLocale();

  const scrollToTimeline = () => {
    const timeline = document.getElementById("timeline");
    if (timeline) {
      timeline.scrollIntoView({ behavior: "smooth" });
      timeline.focus();
    }
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="
        relative
        min-h-[80vh] sm:min-h-screen
        flex flex-col items-center justify-center
        px-4 sm:px-6
        pt-16 sm:pt-20
        text-center
      "
    >
      {/* Visual title - uses p tag since h1 is in Header for semantic correctness */}
      <p
        id="hero-title"
        role="heading"
        aria-level={2}
        className={`
          text-3xl sm:text-4xl lg:text-5xl
          font-bold
          text-[var(--color-text)]
          mb-4
          ${locale === "ta" ? "font-tamil" : ""}
        `}
      >
        {t("title")}
      </p>
      <p
        className={`
          text-lg sm:text-xl
          text-[var(--color-text-secondary)]
          max-w-2xl
          mb-8
          ${locale === "ta" ? "font-tamil" : ""}
        `}
      >
        {t("subtitle")}
      </p>

      {/* Scroll CTA */}
      <button
        type="button"
        onClick={scrollToTimeline}
        aria-label={locale === "ta" ? "காலவரிசையை ஆராயுங்கள்" : "Explore Timeline"}
        className="
          flex flex-col items-center gap-2
          text-[var(--color-text-secondary)]
          hover:text-[var(--color-text)]
          transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]
          rounded-lg p-2
          min-w-[44px] min-h-[44px]
        "
      >
        <span className="text-sm">
          {locale === "ta" ? "காலவரிசையை ஆராயுங்கள்" : "Explore Timeline"}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </section>
  );
}
