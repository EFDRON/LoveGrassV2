import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
    images: [{ url: "/hero-platter.webp", width: 1200, height: 900, alt: "Love Grass Ethiopian platter" }],
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
   Hero Section — main export
------------------------------------------------------- */
export default function HomePage() {
  return (
    <>
      {/*
        ╔══════════════════════════════════════════════════════╗
        ║  HERO SECTION                                        ║
        ║  - hero-section      → brand-green gradient (CSS)    ║
        ║  - hero-mesob-overlay→ mesob-pattern.png at 7% op    ║
        ╚══════════════════════════════════════════════════════╝
      */}
      <section
        aria-label="Love Grass hero — Artisanal Injera, Ancient Heritage"
        className="hero-section hero-mesob-overlay relative min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] flex items-center pb-20 md:pb-24"
      >
        {/*
          Inner grid — all content sits above the pseudo-element layers (z-index: 0/1)
          so we lift everything to z-10.
        */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ═══════════════════════════════════════════════
                LEFT COLUMN — Narrative / Text
            ═══════════════════════════════════════════════ */}
            <div className="flex flex-col justify-center lg:pr-8 text-center lg:text-left">

              {/* Amharic / brand identity badge */}
              <div className="flex justify-center lg:justify-start mb-5">
                <div className="hero-badge" aria-label="Love Grass in Amharic — Ye'afer Tikur Seged">
                  <span className="hero-badge-dot" aria-hidden="true" />
                  {/* Amharic placeholder — will be replaced with actual ፍቅር ሳር glyph */}
                  <span lang="am" className="font-display tracking-normal normal-case text-base leading-none">
                    ፍቅር ሳር
                  </span>
                  <span className="hero-badge-dot" aria-hidden="true" />
                  <span>Love Grass</span>
                </div>
              </div>

              {/* Decorative rule */}
              <GoldDivider />

              {/* Primary H1 — the LCP text node; Playfair Display */}
              <h1 className="font-display font-bold text-brand-white leading-[1.08] tracking-tight mb-6">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                  Artisanal
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] italic text-brand-gold">
                  Injera.
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-1">
                  Ancient Heritage.
                </span>
              </h1>

              {/* Sub-description — colour: brand-gold for contrast on dark green */}
              <p className="text-brand-gold/90 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-10 font-medium">
                Experience the true taste of Ethiopia with 100&#37; pure lovegrass
                teff, traditional spices, and heritage in every bite.
              </p>

              {/* Social proof row */}
              <div
                aria-label="Customer rating"
                className="flex items-center justify-center lg:justify-start gap-3 mb-10"
              >
                {/* Stars */}
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-[#C7C466]">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/75 text-sm font-medium">
                  <strong className="text-white">4.9</strong> · 200+ reviews
                </span>
                <span aria-hidden="true" className="h-4 w-px bg-white/20" />
                <span className="text-white/60 text-sm">Dubai</span>
              </div>

              {/* CTA buttons — pill-shaped, side-by-side on sm+ */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <Link
                  href="/menu"
                  id="hero-cta-menu"
                  className="btn-hero-solid w-full sm:w-auto"
                >
                  View Our Menu
                </Link>
                <Link
                  href="/contact"
                  id="hero-cta-reserve"
                  className="btn-hero-ghost w-full sm:w-auto"
                >
                  Reserve a Table
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
                {[
                  { icon: "🌿", label: "100% Teff Injera" },
                  { icon: "🍽️", label: "Heritage Recipes" },
                  { icon: "📍", label: "Dubai, UAE" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                    <span aria-hidden="true">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                RIGHT COLUMN — Hero Platter Visual (LCP)
            ═══════════════════════════════════════════════ */}
            <div className="relative flex items-center justify-center lg:justify-end">

              {/* Decorative glow ring behind the image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[2rem] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(199,196,102,0.18) 0%, transparent 70%)",
                }}
              />

              {/* 
                Image container
                - hero-image-glow: white outer glow + depth shadow (defined in globals.css)
                - overflow-hidden: keeps the image inside rounded corners
                - aspect-ratio: avoids layout shift (CLS) before image loads
              */}
              <div className="hero-image-glow overflow-hidden w-full max-w-lg lg:max-w-none aspect-[4/3] lg:aspect-[3/4] xl:aspect-square relative">
                <Image
                  src="/hero-platter.webp"
                  alt="A traditional Love Grass Ethiopian injera platter — an array of vibrant wats, lentils, and vegetables served on hand-made teff injera"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  quality={90}
                  priority          /* LCP element — preload immediately */
                  fetchPriority="high"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Gradient overlay on the image — feathers bottom edge into the green bg */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[2rem] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(43,96,39,0.45) 0%, transparent 50%)",
                  }}
                />

                {/* Floating dish-name badge — bottom-left of the image */}
                <div
                  className="absolute bottom-5 left-5 right-5 flex items-end justify-between"
                  aria-hidden="true"
                >
                  <div className="hero-badge text-[10px] tracking-widest">
                    <span className="hero-badge-dot" />
                    Signature Platter
                  </div>
                  <div className="hero-badge text-[10px] tracking-widest">
                    <span className="hero-badge-dot" />
                    Est. 2015
                  </div>
                </div>
              </div>

              {/* Floating stat card — top-right of image, desktop only */}
              <div
                aria-label="Pure teff injera stat"
                className="hidden lg:flex absolute -top-6 -right-6 xl:-right-10 flex-col items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 shadow-xl shadow-black/20"
              >
                <span className="font-display font-bold text-white text-3xl leading-none">
                  100<span className="text-brand-gold text-lg align-top mt-1 ml-0.5">%</span>
                </span>
                <span className="text-white/70 text-xs font-medium text-center leading-tight">
                  Pure Teff<br />Injera
                </span>
              </div>

              {/* Floating badge — bottom-right, desktop only */}
              <div
                aria-label="Years of heritage"
                className="hidden lg:flex absolute -bottom-6 -right-6 xl:-right-10 items-center gap-3 bg-brand-gold/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl shadow-black/20"
              >
                <div className="w-8 h-8 rounded-full bg-brand-forest flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 fill-brand-gold" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-brand-forest text-sm leading-none">
                    Authentic Taste
                  </p>
                  <p className="text-brand-forest/70 text-xs mt-0.5">
                    Generations of heritage
                  </p>
                </div>
              </div>
            </div>
            {/* END RIGHT COLUMN */}

          </div>
        </div>

        {/* Animated scroll indicator */}
        <ScrollIndicator />

        {/* Bottom edge fade — softens the transition into the next section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(43,96,39,0.6) 100%)",
          }}
        />
      </section>

      {/* Anchor target for scroll indicator */}
      <div id="content" aria-hidden="true" />
    </>
  );
}
