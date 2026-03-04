"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("navigation");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("scrollToTop")}
      tabIndex={visible ? 0 : -1}
      className={`
        fixed bottom-6 right-6 z-30
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-[var(--color-text)] text-white
        shadow-lg
        transition-all duration-200
        hover:scale-110 hover:shadow-xl
        active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2
        ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
