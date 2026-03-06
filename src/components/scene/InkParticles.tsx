"use client";

import { useState, useEffect } from "react";

interface InkParticlesProps {
  /** Number of particles to render */
  count?: number;
  /** Base color - defaults to ink color */
  color?: string;
  /** Minimum opacity for particles */
  minOpacity?: number;
  /** Maximum opacity for particles */
  maxOpacity?: number;
}

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  startY: number;
}

export function InkParticles({
  count = 25,
  color = "rgba(26, 24, 21,",
  minOpacity = 0.15,
  maxOpacity = 0.35,
}: InkParticlesProps) {
  // Generate particles only on client to avoid hydration mismatch
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 8 + 3,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
        opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
        drift: (Math.random() - 0.5) * 30,
        startY: Math.random() * 100,
      }))
    );
  }, [count, minOpacity, maxOpacity]);

  return (
    <>
      {/* Global keyframes - only rendered once */}
      <style>
        {`
          @keyframes ink-particle-rise {
            0% {
              transform: translateY(0) translateX(0) scale(1);
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            100% {
              transform: translateY(-120vh) translateX(var(--particle-drift)) scale(0.5);
              opacity: 0;
            }
          }
        `}
      </style>

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        aria-hidden="true"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              bottom: `${particle.startY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: `${color} ${particle.opacity})`,
              animation: `ink-particle-rise ${particle.duration}s linear ${particle.delay}s infinite`,
              // @ts-expect-error CSS custom property
              "--particle-drift": `${particle.drift}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}
