import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedDishes } from "@/components/FeaturedDishes";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { CurtainHero } from "@/components/animations/CurtainHero";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";

/* -------------------------------------------------------
   Per-page SEO metadata
------------------------------------------------------- */
export const metadata: Metadata = {
  title: "Love Grass | Authentic Ethiopian Cuisine in Dubai",
  description:
    "Experience the true taste of Ethiopia at Love Grass Dubai — 100% pure lovegrass teff injera, hand-blended traditional spices, and heritage in every bite.",
  openGraph: {
    title: "Love Grass | Authentic Ethiopian Cuisine in Dubai",
    description:
      "Experience the true taste of Ethiopia — 100% pure lovegrass teff injera, traditional spices, and heritage in every bite.",
    images: [
      {
        url: "/hero-platter.webp",
        width: 1200,
        height: 900,
        alt: "Love Grass Ethiopian platter",
      },
    ],
  },
};

/* -------------------------------------------------------
   Small decorative divider used between badge and headline
------------------------------------------------------- */
function GoldDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3 mb-6">
      <span className="h-px w-8 bg-[#C7C466]/50" />
      <svg
        viewBox="0 0 12 12"
        className="w-2 h-2 fill-[#C7C466]/70"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="6" />
      </svg>
      <span className="h-px flex-1 bg-[#C7C466]/30" />
    </div>
  );
}

/* -------------------------------------------------------
   Animated scroll-down chevron
------------------------------------------------------- */
function ScrollIndicator() {
  return (
    <a
      href="#content"
      aria-label="Scroll to content"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 hero-scroll-indicator"
    >
      <span className="text-white/40 text-[10px] font-medium tracking-widest uppercase">
        Scroll
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-white/50"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </a>
  );
}

/* -------------------------------------------------------
   Hero Data
------------------------------------------------------- */
const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    imageSrc: "/hero-platter.webp",
    kickerAmharic: "ፍቅር ሳር",
    kickerEnglish: "Love Grass",
    headlinePart1: "Artisanal",
    headlinePart2: "Injera.",
    headlinePart3: "Ancient Heritage.",
    subtext:
      "Experience the true taste of Ethiopia with 100% pure lovegrass teff, traditional spices, and heritage in every bite.",
    tags: [
      { icon: "🌿", label: "100% Teff Injera" },
      { icon: "🍽️", label: "Heritage Recipes" },
      { icon: "📍", label: "Dubai, UAE" },
    ],
    imageAlt: "A traditional Love Grass Ethiopian injera platter",
    imageBadge: "Signature Platter",
  },
  {
    id: 2,
    imageSrc:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1000&auto=format&fit=crop",
    kickerAmharic: "ልዩ ቅመሞች",
    kickerEnglish: "Authentic Spices",
    headlinePart1: "Vibrant",
    headlinePart2: "Flavors.",
    headlinePart3: "Bold Aromas.",
    subtext:
      "Our spices are hand-blended and sourced directly from Ethiopian markets to bring you uncompromising authenticity.",
    tags: [
      { icon: "🌶️", label: "Rich Berbere" },
      { icon: "✨", label: "Direct Sourcing" },
      { icon: "🔥", label: "Bold Taste" },
    ],
    imageAlt: "Vibrant Ethiopian spices",
    imageBadge: "Freshly Ground",
  },
  {
    id: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    kickerAmharic: "ውብ ድባብ",
    kickerEnglish: "Warm Ambiance",
    headlinePart1: "Cozy",
    headlinePart2: "Evenings.",
    headlinePart3: "True Hospitality.",
    subtext:
      "Dine in an atmosphere inspired by Ethiopian tradition. Warm lights, authentic decor, and welcoming smiles await.",
    tags: [
      { icon: "🕯️", label: "Warm Lighting" },
      { icon: "🛖", label: "Traditional Decor" },
      { icon: "❤️", label: "Family Friendly" },
    ],
    imageAlt: "Cozy dining atmosphere",
    imageBadge: "Authentic Vibes",
  },
];

/* -------------------------------------------------------
   Hero Section — main export
------------------------------------------------------- */
export default function HomePage() {
  return (
    <>
      <section
        aria-label="Love Grass hero — Artisanal Injera, Ancient Heritage"
        className="hero-section hero-mesob-overlay sticky top-0 h-screen w-full z-0"
      >
        <CurtainHero>
          <HeroCarousel slides={HERO_SLIDES} />

          {/* Bottom edge fade — softens the transition into the next section */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(5, 75, 5, 0.6) 100%)",
            }}
          />
        </CurtainHero>
      </section>

      {/* Anchor target for scroll indicator */}
      <div id="content" aria-hidden="true" />

      {/* ════════════════════════════════════════════════
          SECTION 2 — Featured Heritage Dishes
          bg-brand-charcoal, 3-col grid, Unsplash images
      ════════════════════════════════════════════════ */}
      <FeaturedDishes />

      {/* ════════════════════════════════════════════════
          SECTION 3 — Voices of Our Guests (CSS marquee)
          charcoal→deep-forest gradient + mesob overlay
      ════════════════════════════════════════════════ */}
      <ReviewsMarquee />

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <Footer />
    </>
  );
}
