"use client";

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
      {/* Previous button */}
      {prevScene && (
        <button
          onClick={() => scrollToScene(prevScene)}
          className="
            absolute top-24 left-1/2 -translate-x-1/2 z-[100]
            flex flex-col-reverse items-center gap-2
            bg-transparent border-none cursor-pointer
            text-ink-light font-body text-[13px] tracking-[2px] uppercase
            opacity-60 hover:opacity-100
            transition-all duration-300
            hover:-translate-y-1
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper
          "
          aria-label={`Go to previous section: ${prevLabel}`}
        >
          <span>{prevLabel}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 h-7 stroke-gold stroke-[1.5]"
          >
            <path
              d="M12 19V5M5 12l7-7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Next button */}
      {nextScene && (
        <button
          onClick={() => scrollToScene(nextScene)}
          className="
            absolute bottom-10 left-1/2 -translate-x-1/2 z-[100]
            flex flex-col items-center gap-2
            bg-transparent border-none cursor-pointer
            text-ink-light font-body text-[13px] tracking-[2px] uppercase
            opacity-70 hover:opacity-100
            transition-all duration-300
            hover:translate-y-1
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-paper
          "
          aria-label={`Go to next section: ${nextLabel}`}
        >
          <span>{nextLabel}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8 stroke-gold stroke-[1.5]"
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
