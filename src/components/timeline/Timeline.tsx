"use client";

import { useMemo } from "react";
import type { TimelineEntry, Era, EraType } from "@/types/timeline";
import { EraMarker } from "./EraMarker";
import { TimelineEntry as TimelineEntryComponent } from "./TimelineEntry";

interface TimelineProps {
  entries: TimelineEntry[];
  eras: Record<EraType, Era>;
}

interface GroupedEntries {
  eraKey: EraType;
  era: Era;
  entries: TimelineEntry[];
}

export function Timeline({ entries, eras }: TimelineProps) {
  // Group entries by era, maintaining chronological order
  const groupedEntries = useMemo(() => {
    const groups: GroupedEntries[] = [];
    const eraMap = new Map<EraType, TimelineEntry[]>();

    // First pass: group by era
    entries.forEach((entry) => {
      const existing = eraMap.get(entry.era);
      if (existing) {
        existing.push(entry);
      } else {
        eraMap.set(entry.era, [entry]);
      }
    });

    // Second pass: create ordered groups based on first entry date
    const eraOrder = Array.from(eraMap.keys()).sort((a, b) => {
      const aFirst = eraMap.get(a)?.[0]?.date.year ?? 0;
      const bFirst = eraMap.get(b)?.[0]?.date.year ?? 0;
      return aFirst - bFirst;
    });

    eraOrder.forEach((eraKey) => {
      const eraEntries = eraMap.get(eraKey);
      const era = eras[eraKey];
      if (eraEntries && era) {
        groups.push({
          eraKey,
          era,
          entries: eraEntries,
        });
      }
    });

    return groups;
  }, [entries, eras]);

  let globalIndex = 0;

  return (
    <main
      id="timeline"
      role="main"
      aria-label="Tamil History Timeline"
      tabIndex={-1}
      className="
        relative
        max-w-[960px] mx-auto
        px-4 sm:px-6 lg:px-8
        pt-20 sm:pt-24
        pb-16
      "
    >
      {/* Vertical spine - centered on desktop, left-aligned on mobile */}
      <div
        className="
          absolute
          left-6 sm:left-6 lg:left-1/2
          top-24 bottom-16
          w-0.5
          bg-[var(--color-border)]
          lg:-translate-x-1/2
        "
        aria-hidden="true"
      />

      {groupedEntries.map(({ eraKey, era, entries: eraEntries }) => (
        <div key={eraKey} className="relative">
          <EraMarker era={era} eraKey={eraKey} entryCount={eraEntries.length} />

          <div className="relative mt-6 space-y-6 pl-10 sm:pl-12 lg:pl-0">
            {eraEntries.map((entry) => {
              const position = globalIndex % 2 === 0 ? "left" : "right";
              const currentIndex = globalIndex;
              globalIndex++;

              return (
                <div
                  key={entry.id}
                  className={`
                    relative
                    lg:w-[calc(50%-24px)]
                    ${position === "left" ? "lg:mr-auto" : "lg:ml-auto"}
                  `}
                >
                  {/* Connector dot on spine */}
                  <div
                    className={`
                      absolute
                      left-[-34px] sm:left-[-42px]
                      lg:left-auto
                      ${position === "left" ? "lg:right-[-36px]" : "lg:left-[-36px]"}
                      top-6
                      w-3 h-3 rounded-full
                      border-2 border-white
                      shadow-sm
                    `}
                    style={{ backgroundColor: era.color }}
                    aria-hidden="true"
                  />

                  <TimelineEntryComponent
                    entry={entry}
                    position={position}
                    index={currentIndex}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
