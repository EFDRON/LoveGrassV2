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
    imageAlt:
      "Misir Wat — Ethiopian spiced red lentil stew with herbs",
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
    imageAlt:
      "Ye'Bere Tibs — sautéed Ethiopian beef with rosemary and onions",
  },
] as const;

/* -------------------------------------------------------
   Tag badge colour map — keeps tag colours consistent
------------------------------------------------------- */
const TAG_STYLES: Record<string, string> = {
  Signature:    "bg-brand-gold/95 text-brand-charcoal",
  Vegan:        "bg-brand-green-main/90 text-white",
  "Chef's Pick":"bg-white/15 text-brand-gold border border-brand-gold/40",
};

/* -------------------------------------------------------
   Arrow icon — inline so zero icon-library overhead
------------------------------------------------------- */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* -------------------------------------------------------
   DishCard — one card in the featured grid
------------------------------------------------------- */
function DishCard({
  dish,
  index,
}: {
  dish: (typeof DISHES)[number];
  index: number;
}) {
  const tagStyle = TAG_STYLES[dish.tag] ?? "bg-brand-gold/90 text-brand-charcoal";

  return (
    <article
      aria-label={`${dish.title} dish card`}
      className="group flex flex-col rounded-3xl border border-brand-gold/10 bg-brand-charcoal/40 shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-brand-forest/20"
    >
      {/* ── Image ─────────────────────────────────────── */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          quality={75}
          /*
           * Only the first dish is above-the-fold on large screens;
           * the others can lazy-load without hurting LCP.
           */
          loading={index === 0 ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Tag badge — top-left */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${tagStyle}`}
          >
            {dish.tag}
          </span>
        </div>

        {/* Bottom scrim — blends image into card body */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(15,36,22,0.85) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title + Amharic */}
        <div>
          <h3 className="font-display font-bold text-xl text-brand-white leading-snug">
            {dish.title}
          </h3>
          <p
            lang="am"
            aria-label={`${dish.title} in Amharic: ${dish.amharic}`}
            className="mt-1 text-brand-gold/65 text-sm font-medium tracking-wide"
          >
            {dish.amharic}
          </p>
        </div>

        {/* Description */}
        <p className="text-brand-white/65 text-sm leading-relaxed flex-1">
          {dish.description}
        </p>

        {/* Thin gold rule */}
        <div aria-hidden="true" className="h-px bg-brand-gold/10" />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-brand-gold text-2xl leading-none">
            {dish.price}
          </span>

          <Link
            href={`/menu#${dish.id}`}
            aria-label={`Order ${dish.title}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-brand-white/70 hover:text-brand-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
          >
            Order Now
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------
   FeaturedDishes — exported section
------------------------------------------------------- */
export function FeaturedDishes() {
  return (
    <section
      id="featured-dishes"
      aria-labelledby="featured-heading"
      className="relative z-10 w-full min-h-screen py-24 md:py-32 bg-gradient-to-b from-brand-green-dark to-brand-deep-forest shadow-[0_-25px_50px_rgba(0,0,0,0.7)]"
    >
      {/* ── Mesob pattern overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-10 bg-[url('/mesob-pattern.png')] bg-repeat bg-[length:340px_340px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
          <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-brand-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
            <span className="h-px w-12 bg-brand-gold/30" />
          </div>
        </div>

        {/* Dish grid — 1 col mobile, 3 col desktop */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Featured dishes"
        >
          {DISHES.map((dish, i) => (
            <div key={dish.id} role="listitem">
              <ScrollReveal delay={0.1 + i * 0.2}>
                <TiltCard>
                  <DishCard dish={dish} index={i} />
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
