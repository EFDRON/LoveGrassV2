import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Heritage",
  description:
    "The story behind Love Grass — a journey through Ethiopian culinary traditions, the culture of injera, and the centuries-old art of teff cultivation.",
};

export default function HeritagePage() {
  return (
    <section
      aria-label="Heritage page"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-block mb-3 px-4 py-1 rounded-full bg-[#2B6027]/10 text-[#2B6027] text-xs font-semibold tracking-widest uppercase">
          Our Story
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2B6027] leading-tight">
          Rooted in Heritage
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-[#516A3E] text-lg">
          From the ancient highlands of Ethiopia to the streets of Dubai — a
          story of culture, community, and the love of food.
        </p>
      </div>

      {/* Placeholder content blocks */}
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#2B6027]/10 bg-white p-8 shadow-sm"
          >
            <div className="h-5 w-1/3 rounded-full bg-[#2B6027]/15 mb-4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-full  rounded-full bg-[#2B6027]/8  animate-pulse" />
              <div className="h-3 w-5/6  rounded-full bg-[#2B6027]/8  animate-pulse" />
              <div className="h-3 w-4/5  rounded-full bg-[#2B6027]/8  animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
