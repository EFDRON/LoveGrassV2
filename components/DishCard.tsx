import Image from "next/image";
import Link from "next/link";
import { Dish, TAG_STYLES } from "@/lib/menu-data";

export function ArrowRight({ className }: { className?: string }) {
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

export function DishCard({
  dish,
  index,
  priority = false,
}: {
  dish: Dish;
  index: number;
  priority?: boolean;
}) {
  const tagStyle = TAG_STYLES[dish.tag] ?? "bg-brand-gold/90 text-brand-charcoal";

  return (
    <article
      aria-label={`${dish.title} dish card`}
      className="group flex flex-col h-full rounded-3xl border border-brand-gold/10 bg-brand-charcoal/40 shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/25 hover:shadow-brand-forest/20"
    >
      {/* ── Image ─────────────────────────────────────── */}
      <div className="relative aspect-video overflow-hidden shrink-0">
        <Image
          src={dish.image}
          alt={dish.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          quality={75}
          loading={priority ? "eager" : "lazy"}
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
        <div className="flex items-center justify-between mt-auto">
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
