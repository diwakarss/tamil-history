"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { TimelineScene } from "./TimelineScene";
import { TimelineNav, ScrollProgress } from "@/components/nav";
import type { TimelineEntry, Locale, BilingualText } from "@/types/timeline";
import { getLocalizedText } from "@/types/timeline";

interface ScenesContainerProps {
  entries: TimelineEntry[];
  heroSceneId?: string;
}

function getTitleEn(title: BilingualText | string): string {
  return typeof title === "string" ? title : title.en;
}

function getSlug(title: BilingualText | string): string {
  const text = getTitleEn(title);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ScenesContainer({
  entries,
  heroSceneId = "hero",
}: ScenesContainerProps) {
  const locale = useLocale() as Locale;

  // Show all timeline entries as scenes (chronologically ordered in timeline.json)
  const featuredEntries = useMemo(() => entries, [entries]);

  // Build navigation data for TimelineNav
  const navScenes = useMemo(() => {
    const scenes = [{ id: heroSceneId, year: "Start" }];

    for (const entry of featuredEntries) {
      scenes.push({
        id: getSlug(entry.title),
        year: getLocalizedText(entry.date.display, locale) || `${entry.date.year}`,
      });
    }

    return scenes;
  }, [featuredEntries, heroSceneId, locale]);

  // Determine variant pattern for visual variety
  const getVariant = (index: number): "fullbleed" | "split" | "split-reverse" => {
    const pattern = ["fullbleed", "split", "split-reverse", "fullbleed", "split-reverse", "split"] as const;
    return pattern[index % pattern.length];
  };

  return (
    <>
      <ScrollProgress />
      <TimelineNav scenes={navScenes} />

      {featuredEntries.map((entry, index) => {
        const prevSlug =
          index === 0 ? heroSceneId : getSlug(featuredEntries[index - 1].title);
        const nextSlug =
          index < featuredEntries.length - 1
            ? getSlug(featuredEntries[index + 1].title)
            : undefined;

        return (
          <TimelineScene
            key={entry.id}
            entry={entry}
            index={index}
            prevScene={prevSlug}
            nextScene={nextSlug}
            variant={getVariant(index)}
          />
        );
      })}
    </>
  );
}
