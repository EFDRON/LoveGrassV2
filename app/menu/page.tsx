import type { Metadata } from "next";
import { MENU_CATEGORIES } from "@/lib/menu-data";
import { MenuCategory } from "@/components/MenuCategory";

export const metadata: Metadata = {
  title: "Menu | Love Grass",
  description:
    "Browse the Love Grass menu — traditional Ethiopian wats, tibs, vegetarian platters, and our signature 100% teff injera. Authentic flavours, Dubai-crafted.",
};

export default function MenuPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-brand-green-dark to-brand-charcoal overflow-hidden pt-20 md:pt-24 pb-24">
      {/* ── Mesob pattern overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-5 bg-[url('/mesob-pattern.png')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />
      
      {/* ── Noise grain ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.035,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Title */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white text-center mb-10">
          Menu
        </h1>

        {/* Menu Categories */}
        <div className="space-y-0">
          {MENU_CATEGORIES.map((category) => (
            <MenuCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
