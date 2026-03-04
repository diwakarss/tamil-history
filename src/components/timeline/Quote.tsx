"use client";

import type { Quote as QuoteType, Locale, BilingualText } from "@/types/timeline";
import { getLocalizedText, isBilingualText } from "@/types/timeline";

interface QuoteProps {
  quote: QuoteType;
  locale: Locale;
}

export function Quote({ quote, locale }: QuoteProps) {
  const text = getLocalizedText(quote.text, locale);
  const source = getLocalizedText(quote.source, locale);
  const author = quote.author ? getLocalizedText(quote.author, locale) : null;
  const context = quote.context ? getLocalizedText(quote.context, locale) : null;

  // Handle translator which can be string or bilingual object
  const translator = quote.translator
    ? isBilingualText(quote.translator)
      ? (quote.translator as BilingualText)[locale]
      : quote.translator
    : null;

  // Determine if the quote text is in Tamil (for lang attribute)
  // Check if quote.text has a Tamil variant that differs from English
  const hasTamilText =
    isBilingualText(quote.text) &&
    (quote.text as BilingualText).ta !== (quote.text as BilingualText).en;
  const quoteLang = hasTamilText ? locale : undefined;

  return (
    <blockquote
      cite={source}
      lang={quoteLang}
      className={`
        my-4 pl-4 pr-4 py-3
        border-l-[3px] border-[var(--color-accent-dark)]
        bg-[rgba(218,165,32,0.04)]
        rounded-r-lg
        ${locale === "ta" ? "font-tamil" : "italic"}
      `}
    >
      <p className="text-base leading-relaxed text-[var(--color-text)]">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="mt-2 text-sm text-[var(--color-text-secondary)]">
        <span className="not-italic">— </span>
        {author && <span className="not-italic">{author}, </span>}
        <cite className="not-italic">{source}</cite>
        {translator && (
          <span className="block text-[var(--color-text-muted)] text-xs mt-1 not-italic">
            {locale === "ta" ? "மொழிபெயர்ப்பு: " : "Translated by "}
            {translator}
          </span>
        )}
        {context && (
          <span className="block text-[var(--color-text-muted)] text-xs mt-1 italic">
            {context}
          </span>
        )}
      </footer>
    </blockquote>
  );
}
