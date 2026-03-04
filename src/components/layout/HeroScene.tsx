"use client";

import { useLocale, useTranslations } from "next-intl";
import { Scene, InkWash } from "@/components/scene";
import { SceneNav } from "@/components/nav";

interface HeroSceneProps {
  nextScene?: string;
}

export function HeroScene({ nextScene }: HeroSceneProps) {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isTamil = locale === "ta";

  return (
    <Scene id="hero" variant="hero">
      <InkWash position="top" />
      <InkWash position="bottom" />

      {/* Main title */}
      <h1
        className="
          font-display
          text-[clamp(48px,14vw,120px)]
          font-normal text-ink
          leading-[0.95]
          mb-4
          opacity-0 animate-ink-reveal
          [animation-delay:0.5s]
        "
      >
        {t("title")}
      </h1>

      {/* Tamil subtitle - only show in English mode for bilingual effect */}
      {!isTamil && (
        <p
          className="
            font-tamil
            text-[clamp(24px,6vw,48px)]
            text-gold-dark
            mb-10
            opacity-0 animate-ink-reveal
            [animation-delay:0.8s]
          "
        >
          தமிழ் நாகரிகம்
        </p>
      )}

      {/* Subtitle description */}
      <p
        className="
          font-body
          text-[clamp(18px,2.5vw,24px)]
          leading-[1.8]
          text-ink-light
          max-w-[650px]
          mb-16 px-4
          text-center
          opacity-0 animate-ink-reveal
          [animation-delay:1.1s]
        "
      >
        {t("subtitle")}
      </p>

      {/* Begin Journey button */}
      {nextScene && (
        <SceneNav
          nextScene={nextScene}
          nextLabel={isTamil ? "பயணத்தைத் தொடங்கு" : "Begin Journey"}
        />
      )}
    </Scene>
  );
}
