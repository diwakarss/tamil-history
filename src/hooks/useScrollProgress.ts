"use client";

import { useState, useEffect, useCallback } from "react";
import type { EraType } from "@/types/timeline";

interface ScrollProgress {
  progress: number;
  currentEra: EraType | null;
}

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState(0);
  const [currentEra, setCurrentEra] = useState<EraType | null>(null);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const maxScroll = scrollHeight - clientHeight;
    const newProgress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    setProgress(Math.min(100, Math.max(0, newProgress)));

    // Find current era based on visible era markers
    const eraMarkers = document.querySelectorAll<HTMLElement>("[data-era]");
    let foundEra: EraType | null = null;

    eraMarkers.forEach((marker) => {
      const rect = marker.getBoundingClientRect();
      // Era is current if its top is at or above the center of viewport
      if (rect.top <= window.innerHeight / 2) {
        foundEra = marker.dataset.era as EraType;
      }
    });

    setCurrentEra(foundEra);
  }, []);

  useEffect(() => {
    // Initial calculation
    handleScroll();

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  return { progress, currentEra };
}
