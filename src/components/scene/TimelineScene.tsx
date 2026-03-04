"use client";

import { useLocale } from "next-intl";
import { Scene } from "./Scene";
import { InkWash } from "./InkWash";
import { Artifact } from "./Artifact";
import { SceneText } from "./SceneText";
import { SceneNav } from "@/components/nav";
import type { TimelineEntry, Locale, BilingualText } from "@/types/timeline";
import { getLocalizedText } from "@/types/timeline";
import { artworkMap, worldContextMap, eraLabels } from "@/../data/artworkMap";

interface TimelineSceneProps {
  entry: TimelineEntry;
  index: number;
  prevScene?: string;
  nextScene?: string;
  variant?: "fullbleed" | "split" | "split-reverse";
}

function getSlug(title: BilingualText | string): string {
  const text = typeof title === "string" ? title : title.en;
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getArtworkPath(entry: TimelineEntry): string | null {
  const titleSlug = getSlug(entry.title);

  // Try direct match first
  if (artworkMap[titleSlug]) {
    return `/images/art/${artworkMap[titleSlug]}`;
  }

  // Try partial matches on title (before location to prioritize content-specific art)
  for (const key of Object.keys(artworkMap)) {
    if (titleSlug.includes(key) || key.includes(titleSlug)) {
      return `/images/art/${artworkMap[key]}`;
    }
  }

  // Try location-based match as fallback
  const site = entry.location?.site;
  const siteEn = site ? (typeof site === "string" ? site : site.en) : null;
  const siteSlug = siteEn ? getSlug(siteEn) : null;
  if (siteSlug && artworkMap[siteSlug]) {
    return `/images/art/${artworkMap[siteSlug]}`;
  }

  return null;
}

function ensureBilingual(text: BilingualText | string): BilingualText {
  if (typeof text === "string") {
    return { en: text, ta: text };
  }
  return text;
}

export function TimelineScene({
  entry,
  index,
  prevScene,
  nextScene,
  variant = "fullbleed",
}: TimelineSceneProps) {
  const locale = useLocale() as Locale;

  const sceneId = getSlug(entry.title);
  const artworkPath = getArtworkPath(entry);
  const dateDisplay = getLocalizedText(entry.date.display, locale) || `${entry.date.year}`;
  const eraLabel = eraLabels[entry.era]?.[locale] || entry.era;
  const worldContext = worldContextMap[sceneId];

  // Alternate ink wash positions for visual variety
  const inkWashPositions =
    index % 2 === 0
      ? (["left", "bottom"] as const)
      : (["right", "top"] as const);

  // Build meta items from key findings
  // Map confidence levels to human-readable descriptions
  const confidenceLabels: Record<string, { en: string; ta: string }> = {
    VERY_HIGH: { en: "Very High", ta: "உறுதியானது" },
    HIGH: { en: "High", ta: "நம்பகமானது" },
    MEDIUM: { en: "Moderate", ta: "மிதமானது" },
    LOW: { en: "Limited", ta: "சிறிதளவு" },
    CONTESTED: { en: "Debated", ta: "விவாதத்திற்குரியது" },
  };

  const confidenceValue = entry.date.confidence
    ? confidenceLabels[entry.date.confidence]?.[locale] || entry.date.confidence
    : locale === "ta" ? "வரலாற்று" : "Historical";

  const meta = [
    {
      label: locale === "ta" ? "நம்பகத்தன்மை" : "Confidence",
      value: confidenceValue,
    },
    ...(entry.keyFindings?.slice(0, 1).map((finding) => ({
      label: locale === "ta" ? "முக்கிய கண்டுபிடிப்பு" : "Key Finding",
      value: getLocalizedText(finding, locale),
      small: true,
    })) || []),
  ];

  return (
    <Scene id={sceneId} variant={variant}>
      {inkWashPositions.map((pos) => (
        <InkWash key={pos} position={pos} />
      ))}

      {prevScene && (
        <SceneNav
          prevScene={prevScene}
          prevLabel={locale === "ta" ? "பின்செல்" : "Back"}
        />
      )}

      {/* Visual side with artifact */}
      {artworkPath && (
        <div className="flex items-center justify-center">
          <Artifact
            src={artworkPath}
            alt={getLocalizedText(entry.title, locale)}
            parallaxSpeed={0.1}
          />
        </div>
      )}

      {/* Text content */}
      <SceneText
        era={eraLabel}
        date={dateDisplay}
        title={ensureBilingual(entry.title)}
        summary={ensureBilingual(entry.summary)}
        quote={
          entry.quote
            ? {
                text: ensureBilingual(entry.quote.text),
                source: ensureBilingual(entry.quote.source),
              }
            : undefined
        }
        meta={meta}
        worldContext={worldContext}
        centered={variant === "fullbleed" && !artworkPath}
      />

      {nextScene && (
        <SceneNav
          nextScene={nextScene}
          nextLabel={locale === "ta" ? "அடுத்தது" : "Next"}
        />
      )}
    </Scene>
  );
}
