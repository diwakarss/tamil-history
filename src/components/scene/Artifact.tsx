"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ArtifactProps {
  src: string;
  alt: string;
  parallaxSpeed?: number;
  className?: string;
}

export function Artifact({
  src,
  alt,
  parallaxSpeed = 0.1,
  className = "",
}: ArtifactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Reveal animation
    gsap.to(image, {
      opacity: 1,
      y: 0,
      scale: 1.15,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: image,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      onStart: () => setRevealed(true),
    });

    // Parallax effect
    gsap.to(image, {
      yPercent: -20 * parallaxSpeed,
      ease: "none",
      scrollTrigger: {
        trigger: container.closest(".scene") || container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
    >
      <Image
        ref={imageRef as React.LegacyRef<HTMLImageElement>}
        src={src}
        alt={alt}
        width={800}
        height={800}
        className={`
          max-w-full max-h-[70vh] w-auto h-auto object-contain
          mix-blend-multiply
          [mask-image:radial-gradient(ellipse_70%_75%_at_center,black_40%,transparent_75%)]
          [-webkit-mask-image:radial-gradient(ellipse_70%_75%_at_center,black_40%,transparent_75%)]
          contrast-[1.2] brightness-[1.05] saturate-[0.9]
          transition-all duration-[1500ms] ease-out
          ${revealed ? "opacity-100 translate-y-0 scale-[1.15]" : "opacity-0 translate-y-[60px] scale-[1.15]"}
        `}
        priority
      />
    </div>
  );
}
