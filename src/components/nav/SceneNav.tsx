"use client";

import { useEffect, useRef, useState } from "react";

interface SceneNavProps {
  prevScene?: string;
  nextScene?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export function SceneNav({
  prevScene,
  nextScene,
  prevLabel = "Back",
  nextLabel = "Next",
}: SceneNavProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  const scrollToScene = (targetId: string) => {
    const target = document.querySelector(`[data-scene="${targetId}"]`);
    if (target) {
      document.documentElement.style.scrollSnapType = "none";
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        document.documentElement.style.scrollSnapType = "y proximity";
      }, 800);
    }
  };

  return (
    <>
      {/* Invisible marker to track scene visibility */}
      <div ref={markerRef} className="absolute inset-0 pointer-events-none" />

      {/* Previous button - fixed to viewport top */}
      {prevScene && isVisible && (
        <button
          onClick={() => scrollToScene(prevScene)}
          className="
            fixed top-20 left-1/2 -translate-x-1/2 z-[100]
            flex flex-col-reverse items-center gap-1
            bg-paper/90 backdrop-blur-sm px-4 py-2 rounded-full
            border border-ink/10
            cursor-pointer
            text-ink-light font-body text-[12px] tracking-[2px] uppercase
            opacity-80 hover:opacity-100
            transition-all duration-300
            hover:-translate-y-0.5
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper
          "
          aria-label={`Go to previous section: ${prevLabel}`}
        >
          <span>{prevLabel}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 stroke-gold stroke-[1.5]"
          >
            <path
              d="M12 19V5M5 12l7-7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Next button - fixed to viewport bottom */}
      {nextScene && isVisible && (
        <button
          onClick={() => scrollToScene(nextScene)}
          className="
            fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
            flex flex-col items-center gap-1
            bg-paper/90 backdrop-blur-sm px-4 py-2 rounded-full
            border border-ink/10
            cursor-pointer
            text-ink-light font-body text-[12px] tracking-[2px] uppercase
            opacity-80 hover:opacity-100
            transition-all duration-300
            hover:translate-y-0.5
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper
          "
          aria-label={`Go to next section: ${nextLabel}`}
        >
          <span>{nextLabel}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 stroke-gold stroke-[1.5]"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}
