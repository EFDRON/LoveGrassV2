/**
 * FeaturedDishes — Server Component
 *
 * Renders the "Taste the Heritage" dish grid section.
 * No client JS. All data is static — swap for a CMS/API fetch when ready.
 */
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { DishCard, ArrowRight } from "@/components/DishCard";
import { MobileDishCarousel } from "@/components/MobileDishCarousel";

/* -------------------------------------------------------
   Dish data — replace with CMS/API data as needed
------------------------------------------------------- */
const DISHES = [
  {
    id: "doro-wat",
    title: "Doro Wat",
    amharic: "ዶሮ ወጥ",
    tag: "Signature",
    description:
      "Our crown jewel — tender chicken slow-braised in a rich berbere spice blend, perfumed with black cumin and clarified niter kibbeh. Served atop hand-made 100% teff injera.",
    price: "AED 85",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600",
    imageAlt:
      "Doro Wat — rich Ethiopian chicken stew in dark berbere sauce on injera",
  },
  {
    id: "misir-wat",
    title: "Misir Wat",
    amharic: "ምሥር ወጥ",
    tag: "Vegan",
    description:
      "A deeply aromatic red lentil stew, slow-simmered with our house berbere blend and finished with a swirl of spiced clarified butter. Wholly plant-based and utterly satisfying.",
    price: "AED 55",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Misir Wat — Ethiopian spiced red lentil stew with herbs",
  },
  {
    id: "yebere-tibs",
    title: "Ye'Bere Tibs",
    amharic: "የበሬ ጥብስ",
    tag: "Chef's Pick",
    description:
      "Prime cuts of beef sautéed over high heat with rosemary, jalapeño, and caramelised onions. A robust, aromatic dish carrying the bold character of the Ethiopian highlands.",
    price: "AED 95",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Ye'Bere Tibs — sautéed Ethiopian beef with rosemary and onions",
  },
] as const;

/* -------------------------------------------------------
   FeaturedDishes — exported section
------------------------------------------------------- */
export function FeaturedDishes() {
  return (
    <section
      id="featured-dishes"
      aria-labelledby="featured-heading"
      className="relative z-10 w-full min-h-screen py-24 md:py-32 bg-gradient-to-b from-brand-green-dark to-brand-deep-forest shadow-[0_-40px_80px_rgba(0,0,0,0.7)]"
    >
      {/* ── Mesob pattern overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-10 bg-[url('/mesob-pattern.jpg')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          {/* Amharic kicker */}
          <p
            lang="am"
            aria-label="Our Special Dishes in Amharic"
            className="mb-3 text-brand-gold text-sm font-semibold tracking-[0.2em] uppercase"
          >
            የእኛ ልዩ ምግቦች
          </p>

          {/* Main heading */}
          <ScrollReveal>
            <h2
              id="featured-heading"
              className="font-display font-bold text-brand-white text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight"
            >
              Taste the Heritage
            </h2>
          </ScrollReveal>

          {/* Sub-copy */}
          <p className="mt-5 max-w-xl mx-auto text-brand-white/50 text-base leading-relaxed">
            Every dish is a chapter from centuries of Ethiopian culinary
            tradition — cooked with care, served with pride.
          </p>

          {/* Gold rule accent */}
          <div
            aria-hidden="true"
            className="mt-8 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-brand-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
            <span className="h-px w-12 bg-brand-gold/30" />
          </div>
        </div>

        {/* Mobile Carousel (Embla) */}
        <MobileDishCarousel dishes={DISHES as any} />

        {/* Desktop Grid (Hidden on Mobile) */}
        <div
          className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Featured dishes"
        >
          {DISHES.map((dish, i) => (
            <div key={dish.id} role="listitem">
              <ScrollReveal delay={0.1 + i * 0.2}>
                <TiltCard>
                  <DishCard dish={dish as any} index={i} />
                </TiltCard>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Full menu CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            id="featured-view-all-cta"
            className="btn-outline-gold-dark inline-flex items-center gap-2"
          >
            Explore the Full Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
