import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the Love Grass menu — traditional Ethiopian wats, tibs, vegetarian platters, and our signature 100% teff injera. Authentic flavours, Dubai-crafted.",
};

export default function MenuPage() {
  return (
    <section
      aria-label="Menu page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-block mb-3 px-4 py-1 rounded-full bg-[#2B6027]/10 text-[#2B6027] text-xs font-semibold tracking-widest uppercase">
          Our Kitchen
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2B6027] leading-tight">
          The Love Grass Menu
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-[#516A3E] text-lg">
          Every dish is crafted from recipes passed down through generations —
          cooked with heritage, served with love.
        </p>
      </div>

      {/* Placeholder grid — to be replaced with real menu items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#2B6027]/10 bg-white p-6 shadow-sm animate-pulse"
          >
            <div className="h-40 rounded-xl bg-[#2B6027]/8 mb-4" />
            <div className="h-4 w-3/4 rounded-full bg-[#2B6027]/10 mb-2" />
            <div className="h-3 w-full rounded-full bg-[#2B6027]/6" />
          </div>
        ))}
      </div>
    </section>
  );
}
