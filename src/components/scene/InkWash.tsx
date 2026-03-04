"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface InkWashProps {
  position: "top" | "bottom" | "left" | "right";
  parentRef?: React.RefObject<HTMLElement | null>;
}

export function InkWash({ position, parentRef }: InkWashProps) {
  const washRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const parent = parentRef?.current || washRef.current?.parentElement;
    if (!parent) return;

    const trigger = ScrollTrigger.create({
      trigger: parent,
      start: "top 80%",
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => trigger.kill();
  }, [parentRef]);

  const positionClasses = {
    top: "top-0 left-0 right-0 h-[40vh]",
    bottom: "bottom-0 left-0 right-0 h-[30vh]",
    left: "top-0 bottom-0 left-0 w-[30vw]",
    right: "top-0 bottom-0 right-0 w-[30vw]",
  };

  const gradients = {
    top: "linear-gradient(180deg, rgba(26, 24, 21, 0.15) 0%, rgba(26, 24, 21, 0.05) 50%, transparent 100%)",
    bottom: "linear-gradient(0deg, rgba(26, 24, 21, 0.2) 0%, rgba(26, 24, 21, 0.05) 40%, transparent 100%)",
    left: "linear-gradient(90deg, rgba(26, 24, 21, 0.12) 0%, transparent 100%)",
    right: "linear-gradient(270deg, rgba(26, 24, 21, 0.12) 0%, transparent 100%)",
  };

  return (
    <div
      ref={washRef}
      className={`
        absolute pointer-events-none
        transition-opacity duration-[1500ms] ease-out
        ${positionClasses[position]}
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      style={{ background: gradients[position] }}
      aria-hidden="true"
    />
  );
}
