/**
 * RestaurantCaptures.tsx — Server Component
 *
 * Bento-style photo gallery for the Heritage page.
 * Shows the ambiance, food, and culture of Love Grass.
 */
import Image from "next/image";

const CAPTURES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=900",
    alt: "Love Grass dining room — warm amber lighting and handcrafted Ethiopian décor",
    span: "col-span-2 row-span-2", // large
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    alt: "Signature Love Grass injera platter — a feast of stews and salads",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600",
    alt: "Chefs plating a traditional Ethiopian dish at Love Grass",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=700",
    alt: "Intimate candlelit dinner setting at Love Grass Dubai",
    span: "col-span-1 row-span-2",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=700",
    alt: "Vibrant Ethiopian spiced dishes served on teff injera",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=700",
    alt: "Ye'Bere Tibs — prime Ethiopian beef with rosemary and jalapeño",
    span: "col-span-1 row-span-1",
  },
];

export function RestaurantCaptures() {
  return (
    <section
      id="restaurant-captures"
      aria-labelledby="captures-heading"
      className="relative py-24 md:py-32 bg-texture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <p
            lang="am"
            aria-label="Restaurant experience in Amharic"
            className="mb-3 text-brand-forest text-xs font-bold tracking-[0.25em] uppercase"
          >
            ምስሎቻችን
          </p>
          <h2
            id="captures-heading"
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-brand-forest leading-tight"
          >
            Inside Love Grass
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-brand-olive text-base leading-relaxed">
            A space where Ethiopian heritage meets modern elegance — every corner
            tells a story, every meal creates a memory.
          </p>
          <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-brand-gold/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
            <span className="h-px w-12 bg-brand-gold/40" />
          </div>
        </div>

        {/* ── Bento grid — desktop ── */}
        <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-4 h-[640px]">
          {CAPTURES.map((cap) => (
            <div
              key={cap.id}
              className={`${cap.span} relative rounded-3xl overflow-hidden shadow-lg group`}
            >
              <Image
                src={cap.src}
                alt={cap.alt}
                fill
                sizes="(max-width: 1280px) 50vw, 33vw"
                quality={75}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-forest/0 group-hover:bg-brand-forest/20 transition-colors duration-300" />
              {/* Bottom scrim on hover */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* ── Mobile: 2-col grid ── */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {CAPTURES.map((cap) => (
            <div
              key={cap.id}
              className="relative aspect-square rounded-2xl overflow-hidden shadow"
            >
              <Image
                src={cap.src}
                alt={cap.alt}
                fill
                sizes="50vw"
                quality={75}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* ── Reserve CTA ── */}
        <div className="mt-14 text-center">
          <a
            href="/contact"
            className="btn-primary btn-pill inline-flex items-center gap-2 px-8 py-4 text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Reserve Your Table
          </a>
        </div>
      </div>
    </section>
  );
}
