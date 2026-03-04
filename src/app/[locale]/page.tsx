import { setRequestLocale } from "next-intl/server";
import { Header, HeroScene } from "@/components/layout";
import { ScenesContainer } from "@/components/scene";
import timelineData from "@/../data/timeline.json";
import type { TimelineData } from "@/types/timeline";

// Cast imported JSON to typed data
const data = timelineData as unknown as TimelineData;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering for better performance
  setRequestLocale(locale);

  // Get the first scene ID for navigation
  const firstTitle = data.timeline[0]?.title;
  const firstTitleEn = typeof firstTitle === "string" ? firstTitle : firstTitle?.en || "";
  const firstEntrySlug = firstTitleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "sivagalai";

  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <HeroScene nextScene={firstEntrySlug} />
        <ScenesContainer entries={data.timeline} heroSceneId="hero" />
      </main>
    </>
  );
}
