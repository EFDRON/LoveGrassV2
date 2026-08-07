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
        
        {/* Modern Menu Navigation Tabs */}
        <div className="flex flex-col items-center justify-center mb-16 relative z-20">
          {/* Hidden H1 for SEO since we are replacing the giant text with tabs */}
          <h1 className="sr-only">Love Grass Menu</h1>
          
          <nav 
            className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-2 md:pb-2 md:flex-wrap md:justify-center md:gap-2 md:bg-black/20 md:backdrop-blur-xl md:border md:border-brand-white/10 md:rounded-full md:shadow-[0_8px_30px_rgb(0,0,0,0.4)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Menu Categories"
          >
            {MENU_CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="shrink-0 group flex items-center md:gap-3 px-3.5 py-1.5 md:px-6 md:py-2.5 rounded-full font-medium transition-all duration-300 bg-black/30 md:bg-transparent border border-brand-white/10 md:border-transparent hover:bg-brand-gold hover:border-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <span className="text-brand-white/80 group-hover:text-brand-charcoal transition-colors text-xs sm:text-[13px] md:text-base whitespace-nowrap">
                  {category.name}
                </span>
                <span 
                  className="hidden md:inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold/70 group-hover:text-brand-charcoal/70 transition-colors" 
                  lang="am"
                >
                  {category.amharic}
                </span>
              </a>
            ))}
          </nav>
        </div>

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
