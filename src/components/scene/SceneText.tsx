"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale, BilingualText } from "@/types/timeline";

gsap.registerPlugin(ScrollTrigger);

interface SceneTextProps {
  era?: string;
  date: string;
  title: BilingualText;
  summary: BilingualText;
  quote?: {
    text: BilingualText;
    source: BilingualText;
  };
  meta?: Array<{
    label: string;
    value: string;
    small?: boolean;
  }>;
  worldContext?: BilingualText;
  centered?: boolean;
}

function getText(text: BilingualText, locale: Locale): string {
  return text[locale] || text.en;
}

export function SceneText({
  era,
  date,
  title,
  summary,
  quote,
  meta,
  worldContext,
  centered = false,
}: SceneTextProps) {
  const locale = useLocale() as Locale;
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => setRevealed(true),
    });
  }, []);

  const isTamil = locale === "ta";
  const textAlign = centered ? "text-center" : "";
  const itemsAlign = centered ? "justify-center" : "";

  return (
    <div
      ref={containerRef}
      className={`
        flex flex-col justify-center
        px-10 lg:px-20 py-10
        ${centered ? "items-center" : ""}
        ${isTamil ? "font-tamil" : ""}
      `}
    >
      {/* Era Tag */}
      {era && (
        <div
          className={`
            inline-flex items-center gap-4 mb-4
            transition-all duration-800 ease-out
            ${itemsAlign}
            ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
        >
          <div className="w-[50px] h-px bg-ink-light" />
          <span className="font-body text-xs font-semibold uppercase tracking-[3px] text-gold-dark">
            {era}
          </span>
          {centered && <div className="w-[50px] h-px bg-ink-light" />}
        </div>
      )}

      {/* Date */}
      <div
        className={`
          font-display font-normal text-ink leading-[0.9] mb-3
          transition-all duration-1000 ease-out delay-100
          ${date.length > 12 ? "text-[clamp(32px,6vw,56px)]" : "text-[clamp(56px,10vw,96px)]"}
          ${textAlign}
          ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        {date}
      </div>

      {/* Title */}
      <h2
        className={`
          font-display text-[clamp(32px,5vw,48px)] font-normal text-ink leading-[1.15] mb-5
          transition-all duration-1000 ease-out delay-200
          ${textAlign}
          ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {getText(title, locale)}
      </h2>

      {/* Summary */}
      <p
        className={`
          font-body text-[clamp(18px,2.5vw,22px)] leading-[1.7] text-ink-light
          max-w-[600px] mb-6
          transition-all duration-1000 ease-out delay-300
          ${centered ? "mx-auto" : ""}
          ${textAlign}
          ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
        `}
      >
        {getText(summary, locale)}
      </p>

      {/* Quote */}
      {quote && (
        <blockquote
          className={`
            relative pl-6 py-4 my-4
            border-l-2 border-gold
            transition-all duration-1000 ease-out delay-400
            ${revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
          `}
          lang={isTamil ? "ta" : "en"}
        >
          <p className="font-display text-[clamp(14px,1.8vw,18px)] italic leading-[1.5] text-ink">
            &ldquo;{getText(quote.text, locale)}&rdquo;
          </p>
          <cite className="block text-sm text-gold-dark mt-4 not-italic">
            — {getText(quote.source, locale)}
          </cite>
        </blockquote>
      )}

      {/* Meta */}
      {meta && meta.length > 0 && (
        <div
          className={`
            flex flex-wrap gap-4 items-stretch
            pt-4 mt-4 border-t border-gold
            transition-opacity duration-1000 ease-out delay-500
            ${revealed ? "opacity-100" : "opacity-0"}
          `}
        >
          {meta.map((item, idx) => (
            <div
              key={idx}
              className={`
                flex flex-col gap-1 pr-4
                ${idx < meta.length - 1 ? "border-r border-paper-shadow" : ""}
              `}
            >
              <span className="text-xs uppercase tracking-[2px] text-gold-dark font-semibold">
                {item.label}
              </span>
              <span
                className={`
                  text-ink leading-[1.3]
                  ${item.small ? "text-[17px] font-body" : "text-xl font-display"}
                `}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* World Context */}
      {worldContext && (
        <div
          className={`
            mt-6 p-5 bg-paper-dark border-l-[3px] border-gold
            transition-all duration-1000 ease-out delay-[600ms]
            ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
        >
          <span className="block text-[13px] uppercase tracking-[2px] text-gold-dark font-semibold mb-3">
            {isTamil ? "அதே நேரத்தில் உலகில்" : "Elsewhere in the World"}
          </span>
          <span className="italic text-[19px] text-ink-light leading-[1.6]">
            {getText(worldContext, locale)}
          </span>
        </div>
      )}
    </div>
  );
}
