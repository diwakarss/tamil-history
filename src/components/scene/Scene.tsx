"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SceneProps {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: "hero" | "fullbleed" | "split" | "split-reverse";
  onEnter?: () => void;
  onLeave?: () => void;
}

export function Scene({
  id,
  children,
  className = "",
  variant = "fullbleed",
  onEnter,
  onLeave,
}: SceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const trigger = ScrollTrigger.create({
      trigger: scene,
      start: "top center",
      end: "bottom center",
      onEnter: () => onEnter?.(),
      onEnterBack: () => onEnter?.(),
      onLeave: () => onLeave?.(),
      onLeaveBack: () => onLeave?.(),
    });

    return () => trigger.kill();
  }, [onEnter, onLeave]);

  const variantClasses = {
    hero: "flex flex-col items-center justify-center text-center px-10 py-24",
    fullbleed: "grid grid-cols-1 lg:grid-cols-2 items-center px-10 py-20 gap-10",
    split: "grid grid-cols-1 lg:grid-cols-2 items-center px-10 py-20 gap-10",
    "split-reverse": "grid grid-cols-1 lg:grid-cols-2 items-center px-10 py-20 gap-10 lg:direction-rtl",
  };

  return (
    <section
      ref={sceneRef}
      id={id}
      data-scene={id}
      className={`scene relative min-h-screen overflow-y-auto snap-start ${variantClasses[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
