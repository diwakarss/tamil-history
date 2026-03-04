"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineNavProps {
  scenes: Array<{
    id: string;
    year: string;
  }>;
}

export function TimelineNav({ scenes }: TimelineNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    scenes.forEach((scene, index) => {
      const element = document.querySelector(`[data-scene="${scene.id}"]`);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scenes]);

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
    <nav
      className="
        fixed right-10 top-1/2 -translate-y-1/2 z-[500]
        flex flex-col items-center gap-0
        max-lg:hidden
      "
      aria-label="Timeline navigation"
    >
      {scenes.map((scene, index) => (
        <div key={scene.id} className="flex flex-col items-center">
          {/* Dot */}
          <button
            onClick={() => scrollToScene(scene.id)}
            className={`
              relative w-3.5 h-3.5 rounded-full
              border-2 cursor-pointer
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper
              ${
                index === activeIndex
                  ? "bg-gold border-gold scale-[1.3]"
                  : "bg-paper border-paper-shadow hover:border-gold hover:scale-[1.2]"
              }
            `}
            aria-label={`Go to ${scene.year}`}
            aria-current={index === activeIndex ? "step" : undefined}
          >
            {/* Year tooltip */}
            <span
              className={`
                absolute right-6 top-1/2 -translate-y-1/2
                font-display text-xs text-ink-light whitespace-nowrap
                pointer-events-none
                transition-opacity duration-300
                ${index === activeIndex ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
              `}
            >
              {scene.year}
            </span>
          </button>

          {/* Segment line (except after last) */}
          {index < scenes.length - 1 && (
            <div
              className={`
                w-0.5 h-[60px]
                transition-colors duration-300
                ${index < activeIndex ? "bg-gold" : "bg-paper-shadow"}
              `}
            />
          )}
        </div>
      ))}
    </nav>
  );
}
